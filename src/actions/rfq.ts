"use server";

import { z } from "zod";
import { createRfq, getSupplierBySlug, getUserById } from "@/lib/db";
import { getOptionalSession } from "@/lib/dal";
import { sendRfqNotificationEmail } from "@/lib/email";

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

  const supplier = supplierSlug ? await getSupplierBySlug(supplierSlug) : undefined;
  const session = await getOptionalSession();

  await createRfq({
    supplierId: supplier?.id ?? null,
    fromUserId: session?.userId ?? null,
    name,
    email,
    company,
    role,
    message,
  });

  // Only listings with a real registered owner (self-service submissions,
  // not the bulk-imported directory entries) have anyone to notify.
  if (supplier?.owner_user_id) {
    const owner = await getUserById(supplier.owner_user_id);
    if (owner) {
      await sendRfqNotificationEmail({
        to: owner.email,
        supplierName: supplier.name,
        fromName: name,
        fromCompany: company,
        fromEmail: email,
        message,
      });
    }
  }

  return { success: true };
}
