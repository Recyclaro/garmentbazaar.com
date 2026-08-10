import type { CollectionCategory } from "@/data/collections";
import { hashSeed, svgUrl } from "./textureUtils";

// Same approach as categorySwatch.ts (gradient + layered SVG texture, no
// real photos available in this environment), with its own warmer,
// retail-facing palette so the collections/retailer side of the site reads
// as related to but distinct from the industrial supplier marketplace.
const textures: Record<CollectionCategory, { svg: string; size: number }> = {
  // Soft scallop/petal curves.
  Womenswear: {
    size: 26,
    svg: `<svg xmlns='http://www.w3.org/2000/svg' width='26' height='26'>
      <path d='M0 13a13 13 0 0 1 26 0' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='1.5'/>
    </svg>`,
  },
  // Classic pinstripe.
  Menswear: {
    size: 14,
    svg: `<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14'>
      <line x1='2' y1='0' x2='2' y2='14' stroke='rgba(255,255,255,0.25)' stroke-width='1.4'/>
    </svg>`,
  },
  // Playful polka dots.
  Kidswear: {
    size: 20,
    svg: `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'>
      <circle cx='5' cy='5' r='2.4' fill='rgba(255,255,255,0.32)'/>
      <circle cx='15' cy='15' r='2.4' fill='rgba(255,255,255,0.22)'/>
    </svg>`,
  },
  // Lace/stitch crosshatch.
  Footwear: {
    size: 16,
    svg: `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'>
      <path d='M0 4 L16 4 M0 12 L16 12 M4 0 L4 16 M12 0 L12 16' stroke='rgba(255,255,255,0.18)' stroke-width='1'/>
    </svg>`,
  },
  // Small faceted studs.
  Accessories: {
    size: 18,
    svg: `<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18'>
      <path d='M9 3 L13 9 L9 15 L5 9 Z' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='1.3'/>
    </svg>`,
  },
  // Linen weave.
  "Home & Lifestyle": {
    size: 12,
    svg: `<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12'>
      <path d='M0 6 H12 M6 0 V12' stroke='rgba(255,255,255,0.2)' stroke-width='1'/>
    </svg>`,
  },
  // Soft bokeh dots.
  "Beauty & Personal Care": {
    size: 22,
    svg: `<svg xmlns='http://www.w3.org/2000/svg' width='22' height='22'>
      <circle cx='6' cy='6' r='3' fill='rgba(255,255,255,0.2)'/>
      <circle cx='16' cy='14' r='2' fill='rgba(255,255,255,0.28)'/>
    </svg>`,
  },
};

const variantsByCategory: Record<CollectionCategory, string[]> = {
  Womenswear: [
    "linear-gradient(135deg, #9f1239 0%, #e11d48 55%, #fda4af 100%)",
    "linear-gradient(115deg, #831843 0%, #be123c 55%, #fecdd3 100%)",
    "linear-gradient(135deg, #be123c 0%, #fb7185 60%, #ffe4e6 100%)",
  ],
  Menswear: [
    "linear-gradient(135deg, #1e293b 0%, #475569 55%, #94a3b8 100%)",
    "linear-gradient(115deg, #0f172a 0%, #334155 60%, #cbd5e1 100%)",
    "linear-gradient(135deg, #292524 0%, #57534e 55%, #a8a29e 100%)",
  ],
  Kidswear: [
    "linear-gradient(135deg, #ea580c 0%, #fb923c 55%, #fed7aa 100%)",
    "linear-gradient(115deg, #0d9488 0%, #2dd4bf 55%, #99f6e4 100%)",
    "linear-gradient(135deg, #ca8a04 0%, #facc15 55%, #fef08a 100%)",
  ],
  Footwear: [
    "linear-gradient(135deg, #431407 0%, #9a3412 55%, #fdba74 100%)",
    "linear-gradient(115deg, #292524 0%, #78716c 55%, #d6d3d1 100%)",
    "linear-gradient(135deg, #78350f 0%, #b45309 55%, #fde68a 100%)",
  ],
  Accessories: [
    "linear-gradient(135deg, #713f12 0%, #ca8a04 55%, #fef08a 100%)",
    "linear-gradient(115deg, #422006 0%, #a16207 55%, #fde68a 100%)",
    "linear-gradient(135deg, #581c87 0%, #a855f7 55%, #e9d5ff 100%)",
  ],
  "Home & Lifestyle": [
    "linear-gradient(135deg, #365314 0%, #65a30d 55%, #d9f99d 100%)",
    "linear-gradient(115deg, #422006 0%, #92400e 55%, #fde68a 100%)",
    "linear-gradient(135deg, #134e4a 0%, #14b8a6 55%, #99f6e4 100%)",
  ],
  "Beauty & Personal Care": [
    "linear-gradient(135deg, #86198f 0%, #d946ef 55%, #f5d0fe 100%)",
    "linear-gradient(115deg, #9d174d 0%, #f472b6 55%, #fbcfe8 100%)",
    "linear-gradient(135deg, #4c1d95 0%, #a78bfa 55%, #ede9fe 100%)",
  ],
};

export function collectionSwatch(
  category: CollectionCategory,
  seed?: string,
): React.CSSProperties {
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
