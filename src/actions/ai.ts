"use server";

import { z } from "zod";
import { listApprovedCollections, collectionRowToCollection } from "@/lib/db";
import { aiEnabled, allowAiCall } from "@/lib/claude";
import { aiFind, rulesFind, type FindResult } from "@/lib/finder";
import { aiMessages, rulesMessages, type WaResult } from "@/lib/whatsapp";
import { waLanguages, waOccasions } from "@/lib/aiOptions";

const live = () => listApprovedCollections().map(collectionRowToCollection);

// ---- Ask & find ------------------------------------------------------------

export interface FindState {
  query?: string;
  result?: FindResult;
  message?: string;
}

export async function findCollections(_prev: FindState | undefined, formData: FormData): Promise<FindState> {
  const query = String(formData.get("q") ?? "").trim().slice(0, 200);
  if (query.length < 2) return { message: "Tell us what you're looking for, e.g. cotton kurtis under ₹500." };
  const catalogue = live();
  if (catalogue.length === 0) return { query, message: "No collections are live right now. Please try again soon." };

  let result: FindResult | null = null;
  if (aiEnabled() && (await allowAiCall("find", 20))) result = await aiFind(query, catalogue);
  result ??= rulesFind(query, catalogue);
  return { query, result };
}

// ---- WhatsApp message writer -------------------------------------------------

const keys = <T extends Record<string, string>>(o: T) => Object.keys(o) as [keyof T & string, ...(keyof T & string)[]];

const WaSchema = z.object({
  shopName: z.string().trim().max(60).default(""),
  town: z.string().trim().max(60).default(""),
  language: z.enum(keys(waLanguages)),
  occasion: z.enum(keys(waOccasions)),
});

export interface WaState {
  result?: WaResult;
  message?: string;
}

export async function writeWhatsApp(_prev: WaState | undefined, formData: FormData): Promise<WaState> {
  const parsed = WaSchema.safeParse({
    shopName: formData.get("shopName") ?? "",
    town: formData.get("town") ?? "",
    language: formData.get("language"),
    occasion: formData.get("occasion"),
  });
  if (!parsed.success) return { message: "Please choose a language and an occasion." };

  const bySlug = new Map(live().map((c) => [c.slug, c]));
  const items = [0, 1, 2]
    .map((i) => {
      const c = bySlug.get(String(formData.get(`item${i}`) ?? ""));
      const price = Number(String(formData.get(`price${i}`) ?? "").replace(/[^0-9]/g, ""));
      return c ? { collection: c, sellPrice: price > 0 && price < 1000000 ? price : null } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .filter((x, i, arr) => arr.findIndex((y) => y.collection.slug === x.collection.slug) === i);
  if (items.length === 0) return { message: "Pick at least one collection to write about." };

  const input = { ...parsed.data, items };
  let result: WaResult | null = null;
  if (aiEnabled() && (await allowAiCall("whatsapp", 10))) result = await aiMessages(input);
  result ??= rulesMessages(input);
  return { result };
}
