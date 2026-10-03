"use server";

import { z } from "zod";
import { listApprovedCollections, collectionRowToCollection } from "@/lib/db";
import { aiEnabled, allowAiCall } from "@/lib/claude";
import {
  aiPlan,
  regions,
  rulesPlan,
  seasons,
  shopTypes,
  type AdvisorInput,
  type StockPlan,
} from "@/lib/advisor";

const keys = <T extends Record<string, string>>(o: T) => Object.keys(o) as [keyof T & string, ...(keyof T & string)[]];

const AdvisorSchema = z.object({
  town: z.string().trim().max(60).default(""),
  region: z.enum(keys(regions)),
  tier: z.coerce.number().int().min(2).max(4),
  shopType: z.enum(keys(shopTypes)),
  season: z.enum(keys(seasons)),
  budgetRupees: z.coerce
    .number()
    .int()
    .min(10000, "Enter a budget of at least ₹10,000.")
    .max(5000000, "Enter a budget up to ₹50,00,000."),
  notes: z.string().trim().max(240).default(""),
});

export interface AdvisorState {
  errors?: Record<string, string[]>;
  message?: string;
  plan?: StockPlan;
  aiFallback?: boolean;
}

export async function getStockPlan(
  _prev: AdvisorState | undefined,
  formData: FormData,
): Promise<AdvisorState> {
  const parsed = AdvisorSchema.safeParse({
    town: formData.get("town") ?? "",
    region: formData.get("region"),
    tier: formData.get("tier"),
    shopType: formData.get("shopType"),
    season: formData.get("season"),
    budgetRupees: String(formData.get("budget") ?? "").replace(/[^0-9]/g, ""),
    notes: formData.get("notes") ?? "",
  });
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }
  const input = parsed.data as AdvisorInput;

  const catalogue = listApprovedCollections().map(collectionRowToCollection);
  if (catalogue.length === 0) {
    return { message: "No collections are live right now. Please try again soon." };
  }

  let plan: StockPlan | null = null;
  let aiFallback = false;
  if (aiEnabled()) {
    if (await allowAiCall("advisor", 6)) plan = await aiPlan(input, catalogue);
    aiFallback = plan === null;
  }
  plan ??= rulesPlan(input, catalogue);

  if (plan.picks.length === 0) {
    return {
      message: "No collections fit that budget yet. Try a higher budget or a different shop type.",
    };
  }
  return { plan, aiFallback };
}
