"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/dal";
import {
  createListing as dbCreateListing,
  updateListing as dbUpdateListing,
  deleteListing as dbDeleteListing,
  getSupplierBySlug,
} from "@/lib/db";
import {
  categories,
  regions,
  certifications,
  type Category,
  type Region,
  type Certification,
} from "@/data/suppliers";

const ListingSchema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  city: z.string().trim().min(1, "City is required."),
  region: z.enum(regions as [Region, ...Region[]], {
    message: "Select a region.",
  }),
  category: z.enum(categories as [Category, ...Category[]], {
    message: "Select a category.",
  }),
  specialties: z
    .string()
    .trim()
    .min(1, "List at least one specialty.")
    .transform((v) => v.split(",").map((s) => s.trim()).filter(Boolean)),
  moq: z.coerce.number().int().positive("MOQ must be a positive number."),
  leadTimeDays: z.coerce
    .number()
    .int()
    .positive("Lead time must be a positive number."),
  certifications: z
    .array(z.enum(certifications as [Certification, ...Certification[]]))
    .optional(),
  since: z.coerce
    .number()
    .int()
    .min(1900, "Enter a valid year.")
    .max(new Date().getFullYear(), "Year can't be in the future."),
});

export interface ListingFormState {
  errors?: Record<string, string[]>;
  message?: string;
}

function parseListingFormData(formData: FormData) {
  return ListingSchema.safeParse({
    name: formData.get("name"),
    city: formData.get("city"),
    region: formData.get("region"),
    category: formData.get("category"),
    specialties: formData.get("specialties"),
    moq: formData.get("moq"),
    leadTimeDays: formData.get("leadTimeDays"),
    certifications: formData.getAll("certifications"),
    since: formData.get("since"),
  });
}

export async function createListingAction(
  _prevState: ListingFormState | undefined,
  formData: FormData,
): Promise<ListingFormState | undefined> {
  const session = await requireRole("manufacturer");

  const validated = parseListingFormData(formData);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const slug = dbCreateListing(session.userId, {
    ...validated.data,
    certifications: validated.data.certifications ?? [],
  });

  revalidatePath("/marketplace");
  revalidatePath("/dashboard/manufacturer");
  redirect(`/dashboard/manufacturer?created=${encodeURIComponent(slug)}`);
}

export async function updateListingAction(
  slug: string,
  _prevState: ListingFormState | undefined,
  formData: FormData,
): Promise<ListingFormState | undefined> {
  const session = await requireRole("manufacturer");

  const existing = getSupplierBySlug(slug);
  if (!existing || existing.owner_user_id !== session.userId) {
    return { message: "You don't have permission to edit this listing." };
  }

  const validated = parseListingFormData(formData);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  dbUpdateListing(existing.id, session.userId, {
    ...validated.data,
    certifications: validated.data.certifications ?? [],
  });

  revalidatePath("/marketplace");
  revalidatePath("/dashboard/manufacturer");
  redirect("/dashboard/manufacturer?updated=1");
}

export async function deleteListingAction(slug: string) {
  const session = await requireRole("manufacturer");
  const existing = getSupplierBySlug(slug);
  if (existing && existing.owner_user_id === session.userId) {
    dbDeleteListing(existing.id, session.userId);
    revalidatePath("/marketplace");
    revalidatePath("/dashboard/manufacturer");
  }
}
