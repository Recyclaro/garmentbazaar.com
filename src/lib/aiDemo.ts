import "server-only";
import type { Collection } from "@/data/collections";
import type { Season } from "./advisorOptions";
import { seasons } from "./advisorOptions";
import { rulesFind } from "./finder";
import { rulesPlan } from "./advisor";
import { rulesMessages } from "./whatsapp";

// Example runs of the three tools for the home page demo. They are built
// from the live catalogue on each request with the built-in rules (no API
// call), so every product, price and MOQ shown is real.

export interface DemoItem {
  slug: string;
  name: string;
  brand: string;
  pricePaise: number;
  moq: number;
  imagePath: string | null;
}

export interface AiDemoData {
  ask: { query: string; reply: string; items: DemoItem[] } | null;
  plan: {
    prompt: string;
    split: { category: string; percent: number }[];
    picks: (DemoItem & { units: number; totalPaise: number })[];
    totalPaise: number;
    budgetPaise: number;
    styles: number;
  } | null;
  wa: { prompt: string; text: string } | null;
}

const item = (c: Collection): DemoItem => ({
  slug: c.slug,
  name: c.name,
  brand: c.brandName,
  pricePaise: c.pricePaise,
  moq: c.moq,
  imagePath: c.imagePath,
});

export function buildAiDemo(catalogue: Collection[], season: Season): AiDemoData {
  if (catalogue.length === 0) return { ask: null, plan: null, wa: null };

  const query = "Ladies kurti 1500 ke andar, chhota MOQ";
  const found = rulesFind(query, catalogue);
  const ask = found.matches.length
    ? { query, reply: found.reply, items: found.matches.slice(0, 3).map((m) => item(m.collection)) }
    : null;

  const p = rulesPlan(
    { town: "Bareilly", region: "north", tier: 3, shopType: "family", season, budgetRupees: 100000, notes: "" },
    catalogue,
  );
  const bySlug = new Map(catalogue.map((c) => [c.slug, c]));
  const plan = p.picks.length
    ? {
        prompt: `Family store · Bareilly, Tier 3 · ${seasons[season].split(" (")[0]} · ₹1,00,000`,
        split: p.split.slice(0, 5).map((s) => ({ category: s.category, percent: s.percent })),
        picks: p.picks.slice(0, 3).map((x) => ({ ...item(bySlug.get(x.slug)!), units: x.units, totalPaise: x.totalPaise })),
        totalPaise: p.totalPaise,
        budgetPaise: p.budgetPaise,
        styles: p.picks.length,
      }
    : null;

  const waItems = (ask?.items ?? []).slice(0, 2).map((d) => bySlug.get(d.slug)!).filter(Boolean);
  const wa = waItems.length
    ? {
        prompt: `${waItems.map((c) => c.name).join(" + ")} · Hinglish · Festive`,
        text: rulesMessages({
          shopName: "Sharma Fashion",
          town: "Bareilly",
          language: "hinglish",
          occasion: "festive",
          // Example shop prices: about 1.8x wholesale, rounded to a ₹..99 price.
          items: waItems.map((c) => ({ collection: c, sellPrice: Math.ceil((c.pricePaise * 1.8) / 10000) * 100 - 1 })),
        }).messages[0].text,
      }
    : null;

  return { ask, plan, wa };
}
