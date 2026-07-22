"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/dal";
import { setListingStatus } from "@/lib/db";

export async function approveListingAction(id: number) {
  await requireRole("admin");
  await setListingStatus(id, "approved");
  revalidatePath("/marketplace");
  revalidatePath("/dashboard/admin");
}

export async function rejectListingAction(id: number) {
  await requireRole("admin");
  await setListingStatus(id, "rejected");
  revalidatePath("/marketplace");
  revalidatePath("/dashboard/admin");
}
