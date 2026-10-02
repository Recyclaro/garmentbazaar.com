"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { createUser, getUserByEmail, type Role } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";
import { createSession, deleteSession } from "@/lib/session";

const SignupSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  role: z.enum(["brand", "manufacturer", "retailer"], {
    message: "Select an account type.",
  }),
  companyName: z.string().trim().min(1, "Business name is required."),
  // Indian mobile, used for WhatsApp updates. +91, spaces and dashes allowed.
  phone: z
    .string()
    .transform((v) => v.replace(/[\s-]/g, "").replace(/^(\+?91)(?=\d{10}$)/, ""))
    .pipe(z.string().regex(/^[6-9]\d{9}$/, "Enter a 10-digit mobile number.")),
  city: z.string().trim().min(2, "Enter your city or town.").max(60),
});

export interface AuthFormState {
  errors?: Record<string, string[]>;
  message?: string;
}

export async function signup(
  _prevState: AuthFormState | undefined,
  formData: FormData,
): Promise<AuthFormState | undefined> {
  const validated = SignupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
    companyName: formData.get("companyName"),
    phone: formData.get("phone") ?? "",
    city: formData.get("city") ?? "",
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { name, email, password, role, companyName, phone, city } = validated.data;

  if (getUserByEmail(email)) {
    return { message: "An account with that email already exists." };
  }

  const passwordHash = await hashPassword(password);
  const userId = createUser({
    name,
    email,
    passwordHash,
    role: role as Role,
    companyName,
    phone,
    city,
  });

  await createSession({ userId, role: role as Role, name });
  redirect("/onboarding");
}

const LoginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export async function login(
  _prevState: AuthFormState | undefined,
  formData: FormData,
): Promise<AuthFormState | undefined> {
  const validated = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { email, password } = validated.data;
  const user = getUserByEmail(email);
  if (!user) {
    return { message: "Invalid email or password." };
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    return { message: "Invalid email or password." };
  }

  await createSession({ userId: user.id, role: user.role, name: user.name });
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
