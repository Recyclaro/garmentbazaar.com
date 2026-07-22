"use server";

import { z } from "zod";
import { createRfq, getSupplierBySlug } from "@/lib/db";
import { getOptionalSession } from "@/lib/dal";

const RfqSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  email: z.string().trim().email("Enter a valid email address."),
  company: z.string().trim().min(1, "Company is required."),
  role: z.string().trim().min(1, "Select an option."),
  message: z.string().trim().min(1, "Please add a short message."),
  supplierSlug: z.string().trim().optional(),
});

export interface RfqFormState {
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
}

export async function submitRfq(
  _prevState: RfqFormState | undefined,
  formData: FormData,
): Promise<RfqFormState> {
  const validated = RfqSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    role: formData.get("role"),
    message: formData.get("message"),
    supplierSlug: formData.get("supplierSlug") || undefined,
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { name, email, company, role, message, supplierSlug } = validated.data;

  const supplier = supplierSlug ? getSupplierBySlug(supplierSlug) : undefined;
  const session = await getOptionalSession();

  createRfq({
    supplierId: supplier?.id ?? null,
    fromUserId: session?.userId ?? null,
    name,
    email,
    company,
    role,
    message,
  });

  return { success: true };
}
