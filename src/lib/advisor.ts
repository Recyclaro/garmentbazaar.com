import "server-only";
import type { Collection, CollectionCategory } from "@/data/collections";

// Stock advisor: turns a shop's profile (region, town tier, shop type,
// season, budget) into a buying plan built only from live, approved
// collections. Claude writes the plan when ANTHROPIC_API_KEY is set; the
// built-in rules below are the fallback. Either way every pick is checked
// against the catalogue and every rupee figure is recomputed here from the
// listed price and quantity, so the page never shows invented numbers.

import {
  regions,
  seasons,
  shopTypes,
  type Region,
  type Season,
  type ShopType,
} from "./advisorOptions";

export { regions, seasons, shopTypes };
export type { Region, Season, ShopType };

export interface AdvisorInput {
  town: string;
  region: Region;
  tier: 2 | 3 | 4;
  shopType: ShopType;
  season: Season;
  budgetRupees: number;
  notes: string;
}

export interface PlanPick {
  slug: string;
  name: string;
  brandName: string;
  category: CollectionCategory;
  imagePath: string | null;
  pricePaise: number;
  moq: number;
  units: number;
  totalPaise: number;
  why: string;
}

export interface StockPlan {
  engine: "ai" | "rules";
  summary: string;
  split: { category: string; percent: number; why: string }[];
  picks: PlanPick[];
  tips: string[];
  totalPaise: number;
  budgetPaise: number;
}

/** Season that fits today's date in India, used as the form default. */
export function currentSeason(now = new Date()): Season {
  const month = Number(
    new Intl.DateTimeFormat("en-IN", { month: "numeric", timeZone: "Asia/Kolkata" }).format(now),
  );
  if (month === 10 || month === 11) return "festive";
  if (month === 12 || month <= 2) return "winter";
  if (month <= 5) return "summer";
  if (month === 6) return "school";
  return "monsoon";
}

export function aiEnabled(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

// ---------------------------------------------------------------------------
// Built-in rules
// ---------------------------------------------------------------------------

type Weights = Partial<Record<CollectionCategory, number>>;

const shopWeights: Record<ShopType, Weights> = {
  family: {
    Womenswear: 18, Menswear: 18, Kidswear: 16, "Ethnic & Occasion": 16,
    "Innerwear & Sleepwear": 10, Footwear: 8, Activewear: 6, Accessories: 4, "Home & Lifestyle": 4,
  },
  women: {
    Womenswear: 40, "Ethnic & Occasion": 30, "Maternity & Plus Size": 10,
    Accessories: 10, "Bags & Luggage": 6, "Innerwear & Sleepwear": 4,
  },
  ethnic: { "Ethnic & Occasion": 65, Womenswear: 10, Accessories: 10, Footwear: 8, "Bags & Luggage": 7 },
  men: { Menswear: 60, "Ethnic & Occasion": 12, Activewear: 10, Footwear: 10, Accessories: 8 },
  kids: { Kidswear: 75, Footwear: 10, "Bags & Luggage": 8, "Innerwear & Sleepwear": 7 },
  footwear: { Footwear: 55, Accessories: 20, "Bags & Luggage": 25 },
  online: { Womenswear: 30, "Ethnic & Occasion": 25, Menswear: 15, Accessories: 15, "Bags & Luggage": 15 },
};

const seasonBoost: Record<Season, { categories: Weights; words: RegExp }> = {
  festive: {
    categories: { "Ethnic & Occasion": 1.6, Accessories: 1.2, Kidswear: 1.1 },
    words: /festive|silk|saree|lehenga|anarkali|sherwani|kurta|embroider|zari|occasion/i,
  },
  wedding: {
    categories: { "Ethnic & Occasion": 1.8, Footwear: 1.2, Accessories: 1.2, "Bags & Luggage": 1.1 },
    words: /wedding|bridal|silk|lehenga|sherwani|saree|embroider|festive|suit/i,
  },
  winter: {
    categories: { Menswear: 1.2, Womenswear: 1.1, Kidswear: 1.1, "Innerwear & Sleepwear": 1.2 },
    words: /winter|wool|jacket|hoodie|sweat|thermal|fleece|knit|shawl|cardigan|boot/i,
  },
  summer: {
    categories: { Womenswear: 1.1, Activewear: 1.1 },
    words: /cotton|linen|summer|breathable|light|tee|t-shirt|shorts|sandal|cool/i,
  },
  monsoon: {
    categories: { Footwear: 1.1, Activewear: 1.1 },
    words: /rain|quick-dry|quick dry|monsoon|synthetic|waterproof|sandal|slipper/i,
  },
  school: {
    categories: { Kidswear: 1.7, "Bags & Luggage": 1.3, Footwear: 1.2, "Uniforms & Workwear": 1.2 },
    words: /school|kids|boys|girls|backpack|uniform|tee|shoe/i,
  },
};

// A comfortable wholesale price per piece for each town tier; listings above
// it are not excluded, only ranked lower.
const tierCeilingPaise: Record<2 | 3 | 4, number> = { 2: 250000, 3: 120000, 4: 70000 };

const seasonShort: Record<Season, string> = {
  festive: "the festive season",
  wedding: "the wedding season",
  winter: "winter",
  summer: "summer",
  monsoon: "the monsoon",
  school: "school reopening",
};

function rupees(paise: number) {
  return "₹" + Math.round(paise / 100).toLocaleString("en-IN");
}

export function rulesPlan(input: AdvisorInput, catalogue: Collection[]): StockPlan {
  const budgetPaise = input.budgetRupees * 100;
  const boost = seasonBoost[input.season];
  const isColdRegion = input.region === "north" || input.region === "northeast" || input.region === "central";

  // 1. Budget split by category.
  const weights: Record<string, number> = {};
  for (const [cat, w] of Object.entries(shopWeights[input.shopType])) {
    const avail = catalogue.some((c) => c.category === cat);
    if (!avail) continue;
    const seasonal = boost.categories[cat as CollectionCategory] ?? 1;
    weights[cat] = (w ?? 0) * seasonal;
  }
  const weightSum = Object.values(weights).reduce((a, b) => a + b, 0) || 1;
  const split = Object.entries(weights)
    .map(([category, w]) => ({ category, percent: Math.round((w / weightSum) * 100) }))
    .filter((s) => s.percent >= 3)
    .sort((a, b) => b.percent - a.percent);

  // 2. Score every listing for this shop.
  const ceiling = tierCeilingPaise[input.tier];
  const score = (c: Collection) => {
    let s = weights[c.category] ?? 0;
    if (s === 0) return 0;
    const text = `${c.name} ${c.description}`;
    if (boost.words.test(text)) s *= 1.6;
    if (input.season === "winter" && !isColdRegion && /wool|thermal|fleece/i.test(text)) s *= 0.6;
    if (c.pricePaise > ceiling) s *= 0.45;
    if (c.moq * c.pricePaise > budgetPaise * 0.35) s *= 0.5;
    return s;
  };

  // 3. Fill each category's share with its best listings at their MOQ,
  // then spend what's left on the next best lines.
  const ranked = catalogue.map((c) => ({ c, s: score(c) })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s);
  const picked = new Map<string, Collection>();
  let spent = 0;
  for (const part of split) {
    let room = (budgetPaise * part.percent) / 100;
    for (const { c } of ranked) {
      if (c.category !== part.category || picked.has(c.slug)) continue;
      const cost = c.moq * c.pricePaise;
      if (cost <= room && spent + cost <= budgetPaise) {
        picked.set(c.slug, c);
        room -= cost;
        spent += cost;
      }
    }
  }
  for (const { c } of ranked) {
    if (picked.size >= 12) break;
    const cost = c.moq * c.pricePaise;
    if (!picked.has(c.slug) && spent + cost <= budgetPaise) {
      picked.set(c.slug, c);
      spent += cost;
    }
  }

  const picks: PlanPick[] = [...picked.values()].slice(0, 12).map((c) => {
    const reasons: string[] = [];
    if (boost.words.test(`${c.name} ${c.description}`)) reasons.push(`suits ${seasonShort[input.season]}`);
    if (c.pricePaise <= ceiling) reasons.push(`priced for Tier ${input.tier} shoppers at ${rupees(c.pricePaise)} a piece`);
    reasons.push(`low-risk test at the ${c.moq}-piece MOQ`);
    const why = reasons.join(", ");
    return toPick(c, c.moq, why.charAt(0).toUpperCase() + why.slice(1) + ".");
  });
  const totalPaise = picks.reduce((a, p) => a + p.totalPaise, 0);

  return {
    engine: "rules",
    summary: `A starter mix for a ${shopTypes[input.shopType].toLowerCase()} in ${input.town || regions[input.region]} for ${seasonShort[input.season]}. Each line is bought at its MOQ so you can test several styles, then reorder the ones that sell.`,
    split: split.map((s) => ({ ...s, why: "" })),
    picks,
    tips: [
      "Put the new lines at the front of the shop and share photos with regular customers on WhatsApp.",
      "Note which styles and sizes sell in the first two weeks, then reorder only those.",
      totalPaise < budgetPaise * 0.8
        ? `Keep the remaining ${rupees(budgetPaise - totalPaise)} for quick reorders of the winners.`
        : "Keep a small part of next month's budget free for reorders.",
    ],
    totalPaise,
    budgetPaise,
  };
}

function toPick(c: Collection, units: number, why: string): PlanPick {
  return {
    slug: c.slug,
    name: c.name,
    brandName: c.brandName,
    category: c.category,
    imagePath: c.imagePath,
    pricePaise: c.pricePaise,
    moq: c.moq,
    units,
    totalPaise: units * c.pricePaise,
    why,
  };
}

// ---------------------------------------------------------------------------
// Claude
// ---------------------------------------------------------------------------

const planTool = {
  name: "submit_stock_plan",
  description: "Submit the buying plan for this shop. Use only slugs from the catalogue.",
  input_schema: {
    type: "object",
    properties: {
      summary: {
        type: "string",
        description: "2-3 plain-English sentences for the shop owner explaining the thinking behind the mix.",
      },
      split: {
        type: "array",
        description: "How the budget is split across catalogue categories. Percents add up to about 100.",
        items: {
          type: "object",
          properties: {
            category: { type: "string" },
            percent: { type: "number" },
            why: { type: "string", description: "One short sentence." },
          },
          required: ["category", "percent", "why"],
        },
      },
      picks: {
        type: "array",
        description: "4 to 12 collections to order.",
        items: {
          type: "object",
          properties: {
            slug: { type: "string" },
            units: { type: "integer", description: "Pieces to order. At least the MOQ." },
            why: {
              type: "string",
              description: "One sentence on why this style suits this shop, town, region and season.",
            },
          },
          required: ["slug", "units", "why"],
        },
      },
      tips: {
        type: "array",
        items: { type: "string" },
        description: "2 to 4 short, practical tips for selling this stock.",
      },
    },
    required: ["summary", "split", "picks", "tips"],
  },
} as const;

interface ToolPlan {
  summary?: unknown;
  split?: unknown;
  picks?: unknown;
  tips?: unknown;
}

export async function aiPlan(input: AdvisorInput, catalogue: Collection[]): Promise<StockPlan | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  const budgetPaise = input.budgetRupees * 100;

  const lines = catalogue
    .map(
      (c) =>
        `${c.slug} | ${c.name} | ${c.brandName} | ${c.category} | ₹${Math.round(c.pricePaise / 100)}/piece | MOQ ${c.moq} | ${c.description.slice(0, 160)}`,
    )
    .join("\n");

  const system = `You are the stock advisor for GarmentBazaar, a B2B wholesale fashion marketplace where shop owners in Tier 2, 3 and 4 Indian towns buy branded stock direct from brands.

Build a practical buying plan for one shop from the catalogue provided. Rules:
- Use only slugs that appear in the catalogue. Never invent products, brands, prices, statistics or trends.
- Order at least the MOQ of each pick. Prefer ordering exactly the MOQ for new styles so the shop can test several, and order more only for safe basics.
- The total of units x price must not exceed the budget. Aim to use 75-95% of it and leave some room for reorders.
- Match the season, region climate, local occasions, town tier price sensitivity and the shop's customers. Explain reasons in plain English a small-town shop owner understands; a short Hinglish phrase is fine.
- Your reasoning comes from season, region, shop type and price fit, not from sales data. Do not claim to know what is trending or selling.
- Do not mention credit, delivery times or discounts.`;

  const user = `Shop profile
- Town: ${input.town || "not given"} (${regions[input.region]}, Tier ${input.tier})
- Shop type: ${shopTypes[input.shopType]}
- Season to buy for: ${seasons[input.season]}
- Budget: ₹${input.budgetRupees.toLocaleString("en-IN")}
- Owner's notes: ${input.notes || "none"}

Catalogue (slug | name | brand | category | wholesale price | MOQ | description)
${lines}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45000);
  try {
    const res = await fetch(`${process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com"}/v1/messages`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5",
        max_tokens: 3000,
        system,
        tools: [planTool],
        tool_choice: { type: "tool", name: planTool.name },
        messages: [{ role: "user", content: user }],
      }),
    });
    if (!res.ok) {
      console.error("[advisor] Claude API error", res.status, (await res.text()).slice(0, 300));
      return null;
    }
    const data = (await res.json()) as { content?: { type: string; name?: string; input?: ToolPlan }[] };
    const block = data.content?.find((b) => b.type === "tool_use" && b.name === planTool.name);
    if (!block?.input) return null;
    return checkPlan(block.input, catalogue, budgetPaise);
  } catch (err) {
    console.error("[advisor] Claude request failed", err instanceof Error ? err.message : err);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Keep only picks that exist, respect MOQ and fit the budget; recompute
// every amount from the catalogue.
function checkPlan(raw: ToolPlan, catalogue: Collection[], budgetPaise: number): StockPlan | null {
  const bySlug = new Map(catalogue.map((c) => [c.slug, c]));
  const picks: PlanPick[] = [];
  let spent = 0;
  for (const p of Array.isArray(raw.picks) ? raw.picks.slice(0, 12) : []) {
    const item = p as { slug?: unknown; units?: unknown; why?: unknown };
    const c = typeof item.slug === "string" ? bySlug.get(item.slug) : undefined;
    if (!c || picks.some((x) => x.slug === c.slug)) continue;
    // Asked-for quantity if it fits, otherwise just the MOQ, otherwise skip.
    const room = budgetPaise - spent;
    const asked = Math.max(c.moq, Math.round(Number(item.units) || c.moq));
    const units = asked * c.pricePaise <= room ? asked : c.moq;
    if (units * c.pricePaise > room) continue;
    spent += units * c.pricePaise;
    picks.push(toPick(c, units, str(item.why, 240)));
  }
  if (picks.length < 2) return null;

  const split = (Array.isArray(raw.split) ? raw.split : [])
    .map((s) => s as { category?: unknown; percent?: unknown; why?: unknown })
    .map((s) => ({
      category: str(s.category, 40),
      percent: Math.max(0, Math.min(100, Math.round(Number(s.percent) || 0))),
      why: str(s.why, 200),
    }))
    .filter((s) => s.category && s.percent > 0)
    .slice(0, 8);

  return {
    engine: "ai",
    summary: str(raw.summary, 600),
    split,
    picks,
    tips: (Array.isArray(raw.tips) ? raw.tips : []).map((t) => str(t, 220)).filter(Boolean).slice(0, 4),
    totalPaise: spent,
    budgetPaise,
  };
}
