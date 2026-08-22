import "server-only";
import path from "node:path";
import fs from "node:fs/promises";
import crypto from "node:crypto";

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/**
 * Saves a brand-uploaded product photo to /public/uploads/collections so
 * Next.js serves it directly, and returns the public path to store in the
 * database. Validates type/size server-side — never trust the browser's
 * <input accept> alone, it's just a UI hint.
 */
export type SaveImageResult =
  | { path: string; error?: undefined }
  | { path?: undefined; error: string }
  | { path?: undefined; error?: undefined }; // no file provided — nothing to do, not an error

export async function saveCollectionImage(file: File | null): Promise<SaveImageResult> {
  if (!file || !(file instanceof File) || file.size === 0) {
    return {};
  }
  if (file.size > MAX_BYTES) {
    return { error: "Image must be smaller than 5MB." };
  }
  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return { error: "Image must be a JPEG, PNG, or WebP file." };
  }

  const dir = path.join(process.cwd(), "public", "uploads", "collections");
  await fs.mkdir(dir, { recursive: true });

  const filename = `${Date.now().toString(36)}-${crypto.randomBytes(6).toString("hex")}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(dir, filename), buffer);

  return { path: `/uploads/collections/${filename}` };
}
