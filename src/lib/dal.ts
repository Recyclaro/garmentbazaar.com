import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getSession } from "./session";
import { getUserById, type Role } from "./db";

export const verifySession = cache(async () => {
  const session = await getSession();
  if (!session?.userId) {
    redirect("/login");
  }
  return session;
});

export const getOptionalSession = cache(async () => {
  return getSession();
});

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  if (!session?.userId) return null;
  const user = getUserById(session.userId);
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    companyName: user.company_name,
  };
});

export async function requireRole(role: Role) {
  const session = await verifySession();
  if (session.role !== role) {
    redirect("/dashboard");
  }
  return session;
}
