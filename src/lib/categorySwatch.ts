import type { Category } from "@/data/suppliers";

// Real product photos can't be fetched or uploaded in this environment, so
// each category gets a few gradient/pattern variants instead of one fixed
// swatch. A supplier's slug is hashed to deterministically pick a variant,
// which gives cards visual variety without pretending a photo is real.
function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

const variantsByCategory: Record<Category, React.CSSProperties[]> = {
  Knitwear: [
    {
      background:
        "repeating-linear-gradient(120deg, #0f766e 0px, #0f766e 16px, #134e4a 16px, #134e4a 32px, #f4d9b0 32px, #f4d9b0 48px, #be123c 48px, #be123c 64px)",
    },
    {
      background:
        "repeating-linear-gradient(60deg, #115e59 0px, #115e59 14px, #f4d9b0 14px, #f4d9b0 28px, #9f1239 28px, #9f1239 42px)",
    },
    {
      background: "linear-gradient(135deg, #134e4a 0%, #0f766e 45%, #f4d9b0 100%)",
    },
  ],
  Denim: [
    { background: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 55%, #818cf8 100%)" },
    { background: "linear-gradient(115deg, #312e81 0%, #6366f1 60%, #c7d2fe 100%)" },
    {
      background:
        "repeating-linear-gradient(100deg, #1e1b4b 0px, #1e1b4b 10px, #4338ca 10px, #4338ca 20px)",
    },
  ],
  Wovens: [
    {
      background:
        "repeating-linear-gradient(115deg, #fde8d2 0px, #fde8d2 16px, #f4a988 16px, #f4a988 32px, #c96a4d 32px, #c96a4d 48px)",
    },
    {
      background:
        "repeating-linear-gradient(70deg, #fbe3c8 0px, #fbe3c8 12px, #e08e6a 12px, #e08e6a 24px, #a85338 24px, #a85338 36px)",
    },
    { background: "linear-gradient(135deg, #f4a988 0%, #c96a4d 60%, #7c3a2a 100%)" },
  ],
  Activewear: [
    { background: "linear-gradient(135deg, #0f172a 0%, #334155 55%, #64748b 100%)" },
    { background: "linear-gradient(115deg, #020617 0%, #1e293b 50%, #475569 100%)" },
    {
      background:
        "repeating-linear-gradient(135deg, #0f172a 0px, #0f172a 18px, #334155 18px, #334155 36px)",
    },
  ],
  "Ethnic Wear": [
    {
      background:
        "repeating-linear-gradient(120deg, #7c2d12 0px, #7c2d12 16px, #b45309 16px, #b45309 32px, #fde68a 32px, #fde68a 48px)",
    },
    {
      background:
        "repeating-linear-gradient(65deg, #7c2d12 0px, #7c2d12 12px, #dc7c1a 12px, #dc7c1a 24px, #fde68a 24px, #fde68a 36px)",
    },
    { background: "linear-gradient(135deg, #7c2d12 0%, #b45309 55%, #fde68a 100%)" },
  ],
  Accessories: [
    { background: "linear-gradient(135deg, #134e4a 0%, #0d9488 55%, #5eead4 100%)" },
    { background: "linear-gradient(115deg, #042f2e 0%, #0f766e 60%, #99f6e4 100%)" },
    {
      background:
        "repeating-linear-gradient(100deg, #134e4a 0px, #134e4a 14px, #0d9488 14px, #0d9488 28px)",
    },
  ],
  "Fabric & Textiles": [
    { background: "linear-gradient(135deg, #581c87 0%, #9333ea 55%, #d8b4fe 100%)" },
    { background: "linear-gradient(115deg, #3b0764 0%, #7e22ce 55%, #e9d5ff 100%)" },
    {
      background:
        "repeating-linear-gradient(110deg, #581c87 0px, #581c87 14px, #9333ea 14px, #9333ea 28px, #d8b4fe 28px, #d8b4fe 42px)",
    },
  ],
  "Surplus & Overstock": [
    { background: "linear-gradient(135deg, #7c2d12 0%, #ea580c 55%, #fed7aa 100%)" },
    {
      background:
        "repeating-linear-gradient(115deg, #9a3412 0px, #9a3412 14px, #ea580c 14px, #ea580c 28px, #fed7aa 28px, #fed7aa 42px)",
    },
    { background: "linear-gradient(115deg, #431407 0%, #c2410c 60%, #ffedd5 100%)" },
  ],
};

export function categorySwatch(category: Category, seed?: string): React.CSSProperties {
  const variants = variantsByCategory[category];
  if (!variants) return { background: "#e2e8f0" };
  if (!seed) return variants[0];
  return variants[hashSeed(seed) % variants.length];
}
