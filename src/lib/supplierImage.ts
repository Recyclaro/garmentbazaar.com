// Demo photos for supplier cards, picked by category. Every image is cropped
// from GarmentBazaar's own product sheet (public/images/products). A
// supplier's slug picks one image from its category's set, so the same
// supplier always shows the same photo while neighbours vary.

const byCategory: Record<string, string[]> = {
  "Fabric & Textiles": [
    "fabric-cotton",
    "fabric-denim",
    "fabric-linen",
    "fabric-knit",
    "fabric-synthetic",
    "fabric-sustainable",
    "eco-organic",
    "eco-bamboo",
  ],
  Knitwear: [
    "men-tshirt",
    "men-polo",
    "men-sweatshirt",
    "men-hoodie",
    "active-gym",
    "kids-boys-tee",
    "season-layering",
    "fabric-knit",
  ],
  "Surplus & Overstock": ["season-knits", "eco-recycled", "eco-upcycled", "home-throws"],
  Denim: ["fabric-denim", "men-jeans", "women-jeans", "kids-boys-jeans"],
  "Ethnic Wear": ["ethnic-men", "ethnic-kurti", "ethnic-anarkali", "ethnic-festive"],
  Activewear: ["active-tracksuit", "active-running", "active-yoga", "active-kids"],
  Accessories: ["acc-scarf", "bag-backpack", "acc-belt", "acc-cap"],
  Wovens: ["men-shirt", "fabric-linen", "uniform-corporate", "women-shirt"],
};

const fallback = ["fabric-cotton", "men-shirt", "fabric-knit", "season-knits"];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function supplierImage(category: string, slug: string): string {
  const set = byCategory[category] ?? fallback;
  return `/images/products/${set[hash(slug) % set.length]}.jpg`;
}
