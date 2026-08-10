"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/dal";
import {
  createCollection as dbCreateCollection,
  updateCollection as dbUpdateCollection,
  deleteCollection as dbDeleteCollection,
  getCollectionBySlug,
} from "@/lib/db";
import { collectionCategories, type CollectionCategory } from "@/data/collections";

const CollectionSchema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  description: z.string().trim().min(10, "Add a short description (10+ characters)."),
  category: z.enum(collectionCategories as [CollectionCategory, ...CollectionCategory[]], {
    message: "Select a category.",
  }),
  price: z.coerce.number().positive("Price must be a positive number."),
  moq: z.coerce.number().int().positive("MOQ must be a positive number."),
});

export interface CollectionFormState {
  errors?: Record<string, string[]>;
  message?: string;
}

function parseCollectionFormData(formData: FormData) {
  return CollectionSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    category: formData.get("category"),
    price: formData.get("price"),
    moq: formData.get("moq"),
  });
}

export async function createCollectionAction(
  _prevState: CollectionFormState | undefined,
  formData: FormData,
): Promise<CollectionFormState | undefined> {
  const session = await requireRole("brand");

  const validated = parseCollectionFormData(formData);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const slug = dbCreateCollection(session.userId, {
    name: validated.data.name,
    description: validated.data.description,
    category: validated.data.category,
    pricePaise: Math.round(validated.data.price * 100),
    moq: validated.data.moq,
  });

  revalidatePath("/collections");
  revalidatePath("/dashboard/brand");
  redirect(`/dashboard/brand?created=${encodeURIComponent(slug)}`);
}

export async function updateCollectionAction(
  slug: string,
  _prevState: CollectionFormState | undefined,
  formData: FormData,
): Promise<CollectionFormState | undefined> {
  const session = await requireRole("brand");

  const existing = getCollectionBySlug(slug);
  if (!existing || existing.owner_user_id !== session.userId) {
    return { message: "You don't have permission to edit this listing." };
  }

  const validated = parseCollectionFormData(formData);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  dbUpdateCollection(existing.id, session.userId, {
    name: validated.data.name,
    description: validated.data.description,
    category: validated.data.category,
    pricePaise: Math.round(validated.data.price * 100),
    moq: validated.data.moq,
  });

  revalidatePath("/collections");
  revalidatePath("/dashboard/brand");
  redirect("/dashboard/brand?updated=1");
}

export async function deleteCollectionAction(slug: string) {
  const session = await requireRole("brand");
  const existing = getCollectionBySlug(slug);
  if (existing && existing.owner_user_id === session.userId) {
    dbDeleteCollection(existing.id, session.userId);
    revalidatePath("/collections");
    revalidatePath("/dashboard/brand");
  }
}
