import "server-only";
import type { Collection } from "@/data/collections";
import { aiEnabled, callClaudeTool, clip } from "./claude";
import { waLanguages, waOccasions, type WaLanguage, type WaOccasion } from "./aiOptions";

// WhatsApp message writer: turns collections a shop has stocked into
// ready-to-send customer messages in the shop owner's language. Claude
// writes them when ANTHROPIC_API_KEY is set; otherwise simple templates in
// English or Hinglish.

export interface WaInput {
  shopName: string;
  town: string;
  language: WaLanguage;
  occasion: WaOccasion;
  items: { collection: Collection; sellPrice: number | null }[];
}

export interface WaResult {
  engine: "ai" | "rules";
  messages: { label: string; text: string }[];
  note?: string;
}

function itemLine(i: WaInput["items"][number]) {
  const price = i.sellPrice ? ` – ₹${i.sellPrice.toLocaleString("en-IN")}` : "";
  return `• ${i.collection.name}${price}`;
}

export function rulesMessages(input: WaInput): WaResult {
  const shop = input.shopName || "our shop";
  const where = input.town ? ` in ${input.town}` : "";
  const list = input.items.map(itemLine).join("\n");
  const hinglish = input.language === "hinglish";
  const opener: Record<WaOccasion, [string, string]> = {
    new: ["New stock has arrived at", "Naya stock aa gaya hai"],
    festive: ["Our festive collection is here at", "Tyohar ke liye nayi collection aa gayi hai"],
    wedding: ["Wedding season picks are now in at", "Shaadi season ki nayi collection aa gayi hai"],
    school: ["Ready for school reopening at", "School ke liye sab taiyaar hai"],
    restock: ["Your favourites are back in stock at", "Aapke pasandeeda styles wapas aa gaye hain"],
  };
  const [en, hi] = opener[input.occasion];
  const messages = hinglish
    ? [
        {
          label: "Broadcast",
          text: `Namaste 🙏\n${hi} – ${shop}${where}!\n\n${list}\n\nLimited pieces hain, jaldi aaiye ya photo ke liye reply kijiye. 😊`,
        },
        {
          label: "Short status",
          text: `✨ ${hi}! ${input.items.map((i) => i.collection.name).join(", ")}. ${shop}${where} – aaj hi dekhiye!`,
        },
      ]
    : [
        {
          label: "Broadcast",
          text: `Hello 🙏\n${en} ${shop}${where}!\n\n${list}\n\nLimited pieces. Visit us or reply to this message for photos and sizes. 😊`,
        },
        {
          label: "Short status",
          text: `✨ ${en} ${shop}${where}: ${input.items.map((i) => i.collection.name).join(", ")}. Drop in today!`,
        },
      ];
  return {
    engine: "rules",
    messages,
    note:
      input.language !== "english" && input.language !== "hinglish"
        ? `${waLanguages[input.language]} needs the AI writer, so this draft is in English.`
        : undefined,
  };
}

const waTool = {
  name: "write_messages",
  description: "Return the WhatsApp messages for the shop owner to send to customers.",
  input_schema: {
    type: "object",
    properties: {
      messages: {
        type: "array",
        description: "Exactly 3 messages.",
        items: {
          type: "object",
          properties: {
            label: { type: "string", description: "Broadcast, Short status, or Personal follow-up" },
            text: { type: "string" },
          },
          required: ["label", "text"],
        },
      },
    },
    required: ["messages"],
  },
};

export async function aiMessages(input: WaInput): Promise<WaResult | null> {
  if (!aiEnabled()) return null;
  const items = input.items
    .map(
      (i) =>
        `- ${i.collection.name} (${i.collection.category}): ${i.collection.description.slice(0, 160)}${i.sellPrice ? ` | shop's selling price ₹${i.sellPrice}` : " | no price given"}`,
    )
    .join("\n");
  const raw = await callClaudeTool<{ messages?: unknown }>({
    system: `You write WhatsApp messages that a small clothing shop owner in India sends to their own customers. Write naturally in the requested language and script, the way a friendly local shopkeeper talks. Keep each message short and easy to read on a phone, with a few emojis at most.
Rules:
- Mention only the products given. Use a price only if the shop owner gave one, exactly as given.
- Do not invent discounts, offers, stock counts, delivery, brand claims or the wholesale source. Do not mention GarmentBazaar.
- Return 3 messages: "Broadcast" (4-7 lines, lists the products), "Short status" (1-2 lines for WhatsApp Status), "Personal follow-up" (2-3 lines to send one regular customer, starting with a greeting and a blank for their name like "[Name] ji").`,
    user: `Shop: ${input.shopName || "not given"}${input.town ? `, ${input.town}` : ""}
Language: ${waLanguages[input.language]}
Occasion: ${waOccasions[input.occasion]}
Products:
${items}`,
    tool: waTool,
    maxTokens: 1500,
    timeoutMs: 30000,
  });
  if (!raw || !Array.isArray(raw.messages)) return null;
  const messages = raw.messages
    .slice(0, 3)
    .map((m) => m as { label?: unknown; text?: unknown })
    .map((m) => ({ label: clip(m.label, 40) || "Message", text: clip(m.text, 1200) }))
    .filter((m) => m.text);
  return messages.length ? { engine: "ai", messages } : null;
}
