import type { Category } from "@/data/suppliers";
import { hashSeed, svgUrl } from "./textureUtils";

// Real product photos can't be fetched or uploaded in this environment, so
// each category gets a gradient plus a subtle SVG weave/knit/grain pattern
// layered on top — evoking the actual fabric type instead of a flat color
// swatch. A supplier's slug is hashed to deterministically pick a color
// variant, which gives cards visual variety without pretending a photo is
// real.

// Each texture is a small repeating SVG tile. Strokes/fills use a
// translucent white so they read as a highlight/weave on top of whichever
// gradient variant is chosen, whatever the category's base color.
const textures: Record<Category, { svg: string; size: number }> = {
  // Rib-knit: soft vertical wave, like stockinette columns.
  Knitwear: {
    size: 20,
    svg: `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'>
      <path d='M0 10 Q5 2 10 10 T20 10' stroke='rgba(255,255,255,0.3)' stroke-width='1.6' fill='none'/>
      <path d='M0 20 Q5 12 10 20 T20 20' stroke='rgba(255,255,255,0.18)' stroke-width='1.6' fill='none'/>
    </svg>`,
  },
  // Twill weave: short offset diagonal dashes.
  Denim: {
    size: 16,
    svg: `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'>
      <path d='M0 16 L16 0' stroke='rgba(255,255,255,0.22)' stroke-width='2.5'/>
      <path d='M-4 4 L4 -4' stroke='rgba(255,255,255,0.22)' stroke-width='2.5'/>
      <path d='M12 20 L20 12' stroke='rgba(255,255,255,0.22)' stroke-width='2.5'/>
    </svg>`,
  },
  // Plain weave: alternating basket squares.
  Wovens: {
    size: 22,
    svg: `<svg xmlns='http://www.w3.org/2000/svg' width='22' height='22'>
      <rect width='11' height='11' fill='rgba(255,255,255,0.16)'/>
      <rect x='11' y='11' width='11' height='11' fill='rgba(255,255,255,0.16)'/>
    </svg>`,
  },
  // Performance mesh: fine dot grid.
  Activewear: {
    size: 14,
    svg: `<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14'>
      <circle cx='7' cy='7' r='1.4' fill='rgba(255,255,255,0.28)'/>
    </svg>`,
  },
  // Block-print motif: repeating diamond outline.
  "Ethnic Wear": {
    size: 28,
    svg: `<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28'>
      <path d='M14 3 L25 14 L14 25 L3 14 Z' fill='none' stroke='rgba(255,255,255,0.28)' stroke-width='1.5'/>
    </svg>`,
  },
  // Leather/canvas grain: irregular fine dots.
  Accessories: {
    size: 16,
    svg: `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'>
      <circle cx='2' cy='3' r='0.7' fill='rgba(255,255,255,0.3)'/>
      <circle cx='9' cy='7' r='0.5' fill='rgba(255,255,255,0.2)'/>
      <circle cx='13' cy='2' r='0.6' fill='rgba(255,255,255,0.25)'/>
      <circle cx='5' cy='12' r='0.6' fill='rgba(255,255,255,0.22)'/>
      <circle cx='12' cy='13' r='0.5' fill='rgba(255,255,255,0.18)'/>
    </svg>`,
  },
  // Close-up thread crosshatch.
  "Fabric & Textiles": {
    size: 13,
    svg: `<svg xmlns='http://www.w3.org/2000/svg' width='13' height='13'>
      <path d='M0 0 L13 13 M13 0 L0 13' stroke='rgba(255,255,255,0.22)' stroke-width='1.2'/>
    </svg>`,
  },
  // Clearance tag holes.
  "Surplus & Overstock": {
    size: 20,
    svg: `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'>
      <circle cx='10' cy='10' r='2.2' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='1.2'/>
    </svg>`,
  },
};

const variantsByCategory: Record<Category, string[]> = {
  Knitwear: [
    "repeating-linear-gradient(120deg, #0f766e 0px, #0f766e 16px, #134e4a 16px, #134e4a 32px, #f4d9b0 32px, #f4d9b0 48px, #be123c 48px, #be123c 64px)",
    "repeating-linear-gradient(60deg, #115e59 0px, #115e59 14px, #f4d9b0 14px, #f4d9b0 28px, #9f1239 28px, #9f1239 42px)",
    "linear-gradient(135deg, #134e4a 0%, #0f766e 45%, #f4d9b0 100%)",
  ],
  Denim: [
    "linear-gradient(135deg, #1e1b4b 0%, #4338ca 55%, #818cf8 100%)",
    "linear-gradient(115deg, #312e81 0%, #6366f1 60%, #c7d2fe 100%)",
    "repeating-linear-gradient(100deg, #1e1b4b 0px, #1e1b4b 10px, #4338ca 10px, #4338ca 20px)",
  ],
  Wovens: [
    "repeating-linear-gradient(115deg, #fde8d2 0px, #fde8d2 16px, #f4a988 16px, #f4a988 32px, #c96a4d 32px, #c96a4d 48px)",
    "repeating-linear-gradient(70deg, #fbe3c8 0px, #fbe3c8 12px, #e08e6a 12px, #e08e6a 24px, #a85338 24px, #a85338 36px)",
    "linear-gradient(135deg, #f4a988 0%, #c96a4d 60%, #7c3a2a 100%)",
  ],
  Activewear: [
    "linear-gradient(135deg, #0f172a 0%, #334155 55%, #64748b 100%)",
    "linear-gradient(115deg, #020617 0%, #1e293b 50%, #475569 100%)",
    "repeating-linear-gradient(135deg, #0f172a 0px, #0f172a 18px, #334155 18px, #334155 36px)",
  ],
  "Ethnic Wear": [
    "repeating-linear-gradient(120deg, #7c2d12 0px, #7c2d12 16px, #b45309 16px, #b45309 32px, #fde68a 32px, #fde68a 48px)",
    "repeating-linear-gradient(65deg, #7c2d12 0px, #7c2d12 12px, #dc7c1a 12px, #dc7c1a 24px, #fde68a 24px, #fde68a 36px)",
    "linear-gradient(135deg, #7c2d12 0%, #b45309 55%, #fde68a 100%)",
  ],
  Accessories: [
    "linear-gradient(135deg, #134e4a 0%, #0d9488 55%, #5eead4 100%)",
    "linear-gradient(115deg, #042f2e 0%, #0f766e 60%, #99f6e4 100%)",
    "repeating-linear-gradient(100deg, #134e4a 0px, #134e4a 14px, #0d9488 14px, #0d9488 28px)",
  ],
  "Fabric & Textiles": [
    "linear-gradient(135deg, #581c87 0%, #9333ea 55%, #d8b4fe 100%)",
    "linear-gradient(115deg, #3b0764 0%, #7e22ce 55%, #e9d5ff 100%)",
    "repeating-linear-gradient(110deg, #581c87 0px, #581c87 14px, #9333ea 14px, #9333ea 28px, #d8b4fe 28px, #d8b4fe 42px)",
  ],
  "Surplus & Overstock": [
    "linear-gradient(135deg, #7c2d12 0%, #ea580c 55%, #fed7aa 100%)",
    "repeating-linear-gradient(115deg, #9a3412 0px, #9a3412 14px, #ea580c 14px, #ea580c 28px, #fed7aa 28px, #fed7aa 42px)",
    "linear-gradient(115deg, #431407 0%, #c2410c 60%, #ffedd5 100%)",
  ],
};

export function categorySwatch(category: Category, seed?: string): React.CSSProperties {
  const variants = variantsByCategory[category];
  if (!variants) return { background: "#e2e8f0" };

  const gradient = seed ? variants[hashSeed(seed) % variants.length] : variants[0];
  const texture = textures[category];

  return {
    backgroundImage: `${svgUrl(texture.svg)}, ${gradient}`,
    backgroundSize: `${texture.size}px ${texture.size}px, cover`,
    backgroundRepeat: "repeat, no-repeat",
  };
}
