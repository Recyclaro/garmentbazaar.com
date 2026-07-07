import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/session";

const protectedPrefixes = ["/dashboard"];
const authRoutes = ["/login", "/signup"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p));
  const isAuthRoute = authRoutes.includes(pathname);

  const cookie = request.cookies.get("gb_session")?.value;
  const session = await decrypt(cookie);

  if (isProtected && !session?.userId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
