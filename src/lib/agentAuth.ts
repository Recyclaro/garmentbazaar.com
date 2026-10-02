import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";

// The marketing agent calls /api/agent/* with "Authorization: Bearer <token>".
// Only the SHA-256 of the token lives in the code; the token itself is kept
// in the scheduled task's settings. To rotate: generate a new token and
// replace this hash.
const TOKEN_SHA256 = "a6da1e6e36e4623c15e660b0f8a1b2e46be107cf6476e4f9f78a5e721828a578";

export function isAgentRequest(request: Request): boolean {
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!token) return false;
  const got = createHash("sha256").update(token).digest();
  const want = Buffer.from(TOKEN_SHA256, "hex");
  return got.length === want.length && timingSafeEqual(got, want);
}
