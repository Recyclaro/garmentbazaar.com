// Demo photos for supplier cards, picked by category. Every image is cropped
// from GarmentBazaar's own product sheet (public/images/products). A
// supplier's slug picks one image from its category's set, so the same
// supplier always shows the same photo while neighbours vary.

const byCategory: Record<string, string[]> = {
  "Fabric & Textiles": [
    "fabric-cotton",
    "fabric-denim",
    "fabric-knit",
    "fabric-synthetic",
    "fabric-linen",
    "fabric-sustainable",
    "organic-cotton",
  ],
  Knitwear: [
    "men-polo",
    "men-active",
    "men-hoodie",
    "kids-tee",
    "fabric-knit",
    "promo-apparel",
    "women-active",
  ],
  "Surplus & Overstock": ["surplus", "bulk-orders", "upcycled"],
  Denim: ["fabric-denim", "men-jeans", "women-jumpsuit"],
  "Ethnic Wear": ["men-kurta", "women-kurti", "women-lehenga"],
  Activewear: ["women-active", "men-active", "sports-shoes"],
  Accessories: ["scarf", "backpack", "handbag"],
  Wovens: ["men-shirt", "fabric-linen", "uniform-corporate"],
};

const fallback = ["fabric-cotton", "men-shirt", "fabric-knit", "bulk-orders"];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function supplierImage(category: string, slug: string): string {
  const set = byCategory[category] ?? fallback;
  return `/images/products/${set[hash(slug) % set.length]}.jpg`;
}
