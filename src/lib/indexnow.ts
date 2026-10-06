import fs from "node:fs";
import path from "node:path";
import sitemap from "@/app/sitemap";

// IndexNow tells Bing, Yandex, Seznam and Naver about new or changed pages
// straight away, instead of waiting for them to recrawl the sitemap.
// The key is public by design: search engines check it by fetching
// https://garmentbazaar.com/<key>.txt (in /public).
const KEY = "faaf1ed5f497e36dbaa72a3efb08e0c0";
const HOST = "garmentbazaar.com";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const SENT_FILE = path.join(process.cwd(), "data", "indexnow-sent.json");

type Sent = Record<string, string>; // url -> lastModified we last reported

function readSent(): Sent {
  try {
    return JSON.parse(fs.readFileSync(SENT_FILE, "utf8")) as Sent;
  } catch {
    return {};
  }
}

/**
 * Report pages that are new, or whose lastModified changed, since the last
 * successful ping. Pages without a real lastModified (built "now" on every
 * request) are reported once, when they first appear.
 */
export async function pingIndexNow(): Promise<void> {
  const sent = readSent();
  const entries = sitemap();
  const fresh: string[] = [];
  const next: Sent = { ...sent };
  const nowIso = new Date().toISOString().slice(0, 10);

  for (const e of entries) {
    const mod = e.lastModified ? new Date(e.lastModified).toISOString().slice(0, 10) : "";
    // Same-day stamps are the "now" placeholder, not a real edit date.
    const stamp = mod && mod !== nowIso ? mod : sent[e.url] ?? "seen";
    if (sent[e.url] !== stamp) {
      fresh.push(e.url);
      next[e.url] = stamp;
    }
  }
  if (fresh.length === 0) return;

  for (let i = 0; i < fresh.length; i += 10000) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `https://${HOST}/${KEY}.txt`,
        urlList: fresh.slice(i, i + 10000),
      }),
      signal: AbortSignal.timeout(20000),
    });
    // 200 = accepted, 202 = accepted pending key check.
    if (res.status !== 200 && res.status !== 202) {
      console.warn(`[indexnow] ping failed: HTTP ${res.status}`);
      return;
    }
  }
  fs.mkdirSync(path.dirname(SENT_FILE), { recursive: true });
  fs.writeFileSync(SENT_FILE, JSON.stringify(next));
  console.log(`[indexnow] reported ${fresh.length} URL${fresh.length === 1 ? "" : "s"}`);
}
