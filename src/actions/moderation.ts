"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/dal";
import { setListingStatus, setCollectionStatus } from "@/lib/db";

export async function approveListingAction(id: number) {
  await requireRole("admin");
  setListingStatus(id, "approved");
  revalidatePath("/marketplace");
  revalidatePath("/dashboard/admin");
}

export async function rejectListingAction(id: number) {
  await requireRole("admin");
  setListingStatus(id, "rejected");
  revalidatePath("/marketplace");
  revalidatePath("/dashboard/admin");
}

export async function approveCollectionAction(id: number) {
  await requireRole("admin");
  setCollectionStatus(id, "approved");
  revalidatePath("/collections");
  revalidatePath("/dashboard/admin");
}

export async function rejectCollectionAction(id: number) {
  await requireRole("admin");
  setCollectionStatus(id, "rejected");
  revalidatePath("/collections");
  revalidatePath("/dashboard/admin");
}
