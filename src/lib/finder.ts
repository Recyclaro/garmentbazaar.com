import "server-only";
import type { Collection, CollectionCategory } from "@/data/collections";
import { aiEnabled, callClaudeTool, clip } from "./claude";

// "Ask & find": a shop owner describes what they need in their own words
// (English, Hindi or Hinglish) and gets matching collections from the live
// catalogue. Claude reads the request when ANTHROPIC_API_KEY is set; the
// keyword rules below are the fallback. Results are always real listings.

export interface FindResult {
  engine: "ai" | "rules";
  reply: string;
  matches: { collection: Collection; why: string }[];
  filters: { maxPricePaise: number | null; maxMoq: number | null; categories: string[] };
}

const categoryWords: [RegExp, CollectionCategory][] = [
  [/kurt|saree|sari|lehenga|anarkali|sherwani|ethnic|festive|wedding|shaadi|dupatta|salwar|suit/i, "Ethnic & Occasion"],
  [/kid|child|bach|baby|infant|boys|girls|school/i, "Kidswear"],
  [/\bmen|gents|shirt|trouser|chino|polo|blazer|mard/i, "Menswear"],
  [/women|ladies|ladies|top|dress|co-?ord|skirt|aurat|mahila/i, "Womenswear"],
  [/shoe|footwear|sandal|chappal|slipper|sneaker|heel|boot|juti|jooti|joote/i, "Footwear"],
  [/bag|luggage|backpack|tote|purse|wallet/i, "Bags & Luggage"],
  [/watch|belt|sunglass|jewel|scarf|cap|accessor/i, "Accessories"],
  [/inner|bra|brief|vest|night|sleep|lingerie|baniyan/i, "Innerwear & Sleepwear"],
  [/gym|sport|track|yoga|active|running/i, "Activewear"],
  [/plus size|maternity|pregnan|xxl/i, "Maternity & Plus Size"],
  [/uniform|workwear|apron|corporate/i, "Uniforms & Workwear"],
  [/bedsheet|towel|curtain|cushion|home|bed linen|chadar/i, "Home & Lifestyle"],
];

const stop = new Set(
  "a an the for in of to and or with under below above less than more my shop need want show me some please chahiye ke ki ka se mein liye wale wali sasta saste cheap small low moq pieces piece rs inr budget".split(" "),
);

function parsePrice(q: string): number | null {
  const m = q.match(/(?:under|below|less than|upto|up to|within|tak|se kam|<)\s*(?:rs\.?|₹|inr)?\s*([\d,]+)/i)
    ?? q.match(/(?:rs\.?|₹|inr)\s*([\d,]+)\s*(?:tak|ke andar|se kam|or less|max)/i);
  if (!m) return /sasta|saste|cheap|budget|low price/i.test(q) ? 50000 : null;
  const n = Number(m[1].replace(/,/g, ""));
  return n > 0 ? n * 100 : null;
}

function parseMoq(q: string): number | null {
  const m = q.match(/moq\s*(?:under|below|upto|up to|<|of|tak)?\s*(\d+)/i) ?? q.match(/(\d+)\s*(?:pcs|pieces)\s*(?:moq|minimum)/i);
  if (m) return Number(m[1]);
  return /small moq|low moq|kam moq|chhota order|small order|few pieces/i.test(q) ? 20 : null;
}

export function rulesFind(query: string, catalogue: Collection[]): FindResult {
  const maxPricePaise = parsePrice(query);
  const maxMoq = parseMoq(query);
  const categories = [...new Set(categoryWords.filter(([re]) => re.test(query)).map(([, c]) => c))];
  const words = query
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stop.has(w) && !/^\d+$/.test(w))
    .map((w) => w.replace(/(es|s)$/, ""));

  const scored = catalogue
    .filter((c) => (maxPricePaise ? c.pricePaise <= maxPricePaise : true))
    .filter((c) => (maxMoq ? c.moq <= maxMoq : true))
    .map((c) => {
      const text = `${c.name} ${c.description} ${c.category} ${c.brandName}`.toLowerCase();
      let s = categories.includes(c.category) ? 3 : 0;
      for (const w of words) if (text.includes(w)) s += 2;
      return { c, s };
    })
    .filter((x) => x.s > 0 || (categories.length === 0 && words.length === 0))
    .sort((a, b) => b.s - a.s || a.c.pricePaise - b.c.pricePaise)
    .slice(0, 8);

  const bits: string[] = [];
  if (categories.length) bits.push(categories.join(", "));
  if (maxPricePaise) bits.push(`up to ₹${(maxPricePaise / 100).toLocaleString("en-IN")} a piece`);
  if (maxMoq) bits.push(`MOQ up to ${maxMoq}`);
  return {
    engine: "rules",
    reply: scored.length
      ? `Showing ${scored.length} collection${scored.length === 1 ? "" : "s"}${bits.length ? ` for ${bits.join(" · ")}` : ""}.`
      : "Nothing matched exactly. Try fewer words, a higher price or a department name.",
    matches: scored.map(({ c }) => ({
      collection: c,
      why: `₹${Math.round(c.pricePaise / 100)} a piece, MOQ ${c.moq}.`,
    })),
    filters: { maxPricePaise, maxMoq, categories },
  };
}

const findTool = {
  name: "show_matches",
  description: "Show the shop owner the best matching collections.",
  input_schema: {
    type: "object",
    properties: {
      reply: {
        type: "string",
        description:
          "1-2 short sentences to the shop owner in the same language style they used (English, Hindi or Hinglish), summarising what you found or suggesting a better search.",
      },
      maxPriceRupees: { type: ["number", "null"], description: "Price ceiling per piece the user asked for, if any." },
      maxMoq: { type: ["number", "null"], description: "MOQ ceiling the user asked for, if any." },
      categories: { type: "array", items: { type: "string" }, description: "Catalogue categories that fit the request." },
      matches: {
        type: "array",
        description: "Up to 8 best matches, best first. Only slugs from the catalogue.",
        items: {
          type: "object",
          properties: {
            slug: { type: "string" },
            why: { type: "string", description: "One short sentence on why it fits the request." },
          },
          required: ["slug", "why"],
        },
      },
    },
    required: ["reply", "matches", "categories"],
  },
};

interface ToolFind {
  reply?: unknown;
  maxPriceRupees?: unknown;
  maxMoq?: unknown;
  categories?: unknown;
  matches?: unknown;
}

export async function aiFind(query: string, catalogue: Collection[]): Promise<FindResult | null> {
  if (!aiEnabled()) return null;
  const lines = catalogue
    .map((c) => `${c.slug} | ${c.name} | ${c.brandName} | ${c.category} | ₹${Math.round(c.pricePaise / 100)}/piece | MOQ ${c.moq} | ${c.description.slice(0, 140)}`)
    .join("\n");
  const raw = await callClaudeTool<ToolFind>({
    system: `You help shop owners from Tier 2, 3 and 4 Indian towns find wholesale collections on GarmentBazaar. They may write in English, Hindi (Devanagari or Roman) or Hinglish, with spelling mistakes. Understand what they want (product, customer, occasion, season, price per piece, MOQ) and pick the best matches from the catalogue only. Respect any price or MOQ limit they give. Never invent products, prices, stock levels or trends. If nothing fits well, return the closest few and say so honestly.`,
    user: `Request: ${query}\n\nCatalogue (slug | name | brand | category | wholesale price | MOQ | description)\n${lines}`,
    tool: findTool,
    maxTokens: 1500,
    timeoutMs: 25000,
  });
  if (!raw) return null;

  const bySlug = new Map(catalogue.map((c) => [c.slug, c]));
  const maxPrice = Number(raw.maxPriceRupees) > 0 ? Math.round(Number(raw.maxPriceRupees) * 100) : null;
  const maxMoq = Number(raw.maxMoq) > 0 ? Math.round(Number(raw.maxMoq)) : null;
  const seen = new Set<string>();
  const matches: FindResult["matches"] = [];
  for (const m of Array.isArray(raw.matches) ? raw.matches.slice(0, 8) : []) {
    const item = m as { slug?: unknown; why?: unknown };
    const c = typeof item.slug === "string" ? bySlug.get(item.slug) : undefined;
    if (!c || seen.has(c.slug)) continue;
    // Hold the AI to the limits it read from the request.
    if (maxPrice && c.pricePaise > maxPrice) continue;
    if (maxMoq && c.moq > maxMoq) continue;
    seen.add(c.slug);
    matches.push({ collection: c, why: clip(item.why, 200) });
  }
  return {
    engine: "ai",
    reply: clip(raw.reply, 300),
    matches,
    filters: {
      maxPricePaise: maxPrice,
      maxMoq,
      categories: (Array.isArray(raw.categories) ? raw.categories : []).map((x) => clip(x, 40)).filter(Boolean).slice(0, 4),
    },
  };
}
