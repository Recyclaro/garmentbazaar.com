import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { Role } from "./db";

const DEV_FALLBACK_SECRET = "dev-only-insecure-secret-change-me";

if (!process.env.SESSION_SECRET) {
  console.warn(
    "[session] SESSION_SECRET is not set — using an insecure development fallback. Set SESSION_SECRET in your environment before deploying.",
  );
}

const encodedKey = new TextEncoder().encode(
  process.env.SESSION_SECRET || DEV_FALLBACK_SECRET,
);

export interface SessionPayload {
  userId: number;
  role: Role;
  name: string;
  [key: string]: unknown;
}

const COOKIE_NAME = "gb_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(
  session: string | undefined,
): Promise<SessionPayload | null> {
  if (!session) return null;
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export async function createSession(payload: SessionPayload): Promise<void> {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const session = await encrypt(payload);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  return decrypt(session);
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
