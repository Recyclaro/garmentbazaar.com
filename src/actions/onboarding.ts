"use server";

import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { saveOnboarding, type OnboardingAnswers } from "@/lib/db";
import { collectionCategories } from "@/data/collections";
import { categories as supplierCategories } from "@/data/suppliers";
import { storeTypes, budgets, moqs, channels } from "@/data/onboarding";

// Keep only values from the known lists, so the stored JSON stays clean.
function pick(form: FormData, key: string, allowed: readonly string[]): string[] {
  return form
    .getAll(key)
    .map(String)
    .filter((v) => allowed.includes(v))
    .slice(0, 12);
}

function one(form: FormData, key: string, allowed: readonly string[]): string | undefined {
  const v = String(form.get(key) ?? "");
  return allowed.includes(v) ? v : undefined;
}

export async function completeOnboarding(formData: FormData) {
  const session = await verifySession();
  const answers: OnboardingAnswers = {};

  if (session.role === "retailer") {
    answers.storeType = one(formData, "storeType", storeTypes);
    answers.departments = pick(formData, "departments", collectionCategories);
    answers.budget = one(formData, "budget", budgets);
  } else if (session.role === "brand") {
    answers.departments = pick(formData, "departments", collectionCategories);
    answers.moq = one(formData, "moq", moqs);
    answers.channels = pick(formData, "channels", channels);
  } else if (session.role === "manufacturer") {
    answers.makes = pick(formData, "makes", supplierCategories);
    answers.moq = one(formData, "moq", moqs);
  }

  saveOnboarding(session.userId, answers);

  if (session.role === "brand") redirect("/dashboard/brand/new?welcome=1");
  if (session.role === "manufacturer") redirect("/dashboard/manufacturer/new?welcome=1");
  redirect("/dashboard/buyer?welcome=1");
}

export async function skipOnboarding() {
  const session = await verifySession();
  saveOnboarding(session.userId, {});
  redirect("/dashboard");
}
