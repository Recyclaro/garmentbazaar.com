import "server-only";
import { headers } from "next/headers";

// Shared Claude (Anthropic API) client for the AI tools. Every tool asks for
// one forced tool call, so replies come back as structured JSON that the
// caller validates. Returns null on any failure so callers can fall back to
// their built-in rules.

export function aiEnabled(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

export interface ClaudeTool {
  name: string;
  description: string;
  input_schema: Record<string, unknown>;
}

export async function callClaudeTool<T>(opts: {
  system: string;
  user: string;
  tool: ClaudeTool;
  maxTokens?: number;
  timeoutMs?: number;
}): Promise<T | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), opts.timeoutMs ?? 45000);
  try {
    const res = await fetch(`${process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com"}/v1/messages`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5",
        max_tokens: opts.maxTokens ?? 2000,
        system: opts.system,
        tools: [opts.tool],
        tool_choice: { type: "tool", name: opts.tool.name },
        messages: [{ role: "user", content: opts.user }],
      }),
    });
    if (!res.ok) {
      console.error(`[ai:${opts.tool.name}] API error`, res.status, (await res.text()).slice(0, 300));
      return null;
    }
    const data = (await res.json()) as { content?: { type: string; name?: string; input?: T }[] };
    const block = data.content?.find((b) => b.type === "tool_use" && b.name === opts.tool.name);
    return block?.input ?? null;
  } catch (err) {
    console.error(`[ai:${opts.tool.name}] request failed`, err instanceof Error ? err.message : err);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// In-memory limits so public forms can't run up the bill: a few AI calls
// per visitor per hour for each tool, and one daily cap for the whole site
// (ADVISOR_DAILY_LIMIT, default 300). Over a limit, tools use their rules.
const perVisitor = new Map<string, number[]>();
let day = "";
let dayCount = 0;
const HOUR = 60 * 60 * 1000;

export async function allowAiCall(tool: string, perHour: number): Promise<boolean> {
  if (!aiEnabled()) return false;
  const today = new Date().toISOString().slice(0, 10);
  if (today !== day) {
    day = today;
    dayCount = 0;
    perVisitor.clear();
  }
  const cap = Number(process.env.ADVISOR_DAILY_LIMIT) || 300;
  if (dayCount >= cap) return false;
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  const k = `${tool}:${ip}`;
  const now = Date.now();
  const recent = (perVisitor.get(k) ?? []).filter((t) => now - t < HOUR);
  if (recent.length >= perHour) return false;
  recent.push(now);
  perVisitor.set(k, recent);
  dayCount += 1;
  return true;
}

export const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
