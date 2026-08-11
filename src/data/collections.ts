export type CollectionCategory =
  | "Womenswear"
  | "Menswear"
  | "Kidswear"
  | "Footwear"
  | "Accessories"
  | "Home & Lifestyle"
  | "Beauty & Personal Care";

export const collectionCategories: CollectionCategory[] = [
  "Womenswear",
  "Menswear",
  "Kidswear",
  "Footwear",
  "Accessories",
  "Home & Lifestyle",
  "Beauty & Personal Care",
];

export interface Collection {
  slug: string;
  brandName: string;
  name: string;
  description: string;
  category: CollectionCategory;
  pricePaise: number;
  moq: number;
}

/**
 * Original demo listings so /collections isn't empty before real brands
 * sign up and list their own — every name, brand, and description here is
 * invented for this demo, not sourced from any real company's catalogue.
 * Seeded with no owner_user_id (see db.ts), so they're public but can't be
 * edited from any dashboard — same pattern as the fictional seedSuppliers
 * in suppliers.ts.
 */
export const seedCollections: Collection[] = [
  {
    slug: "coastal-linen-kurta-set",
    brandName: "Meridian Threads",
    name: "Coastal Linen Kurta Set",
    description:
      "Breathable linen-cotton kurta sets in five wash-friendly colorways, cut for easy retail sizing from S to XXL.",
    category: "Womenswear",
    pricePaise: 145000,
    moq: 25,
  },
  {
    slug: "handblock-cotton-dupatta-edit",
    brandName: "Meridian Threads",
    name: "Handblock Cotton Dupatta Edit",
    description:
      "Hand block-printed cotton dupattas in traditional motifs, finished with hand-rolled edges.",
    category: "Accessories",
    pricePaise: 38000,
    moq: 50,
  },
  {
    slug: "everyday-oxford-shirts",
    brandName: "Northline Basics",
    name: "Everyday Oxford Shirts",
    description:
      "Wrinkle-resistant cotton-blend oxford shirts in six core colors, built for high sell-through on everyday racks.",
    category: "Menswear",
    pricePaise: 65000,
    moq: 40,
  },
  {
    slug: "junior-explorer-playwear",
    brandName: "Northline Basics",
    name: "Junior Explorer Playwear",
    description:
      "Durable cotton playwear sets for ages 2-10, with reinforced knees and stretch waistbands for active kids.",
    category: "Kidswear",
    pricePaise: 42000,
    moq: 60,
  },
  {
    slug: "organic-cotton-bedlinen-set",
    brandName: "Solstice Living",
    name: "Organic Cotton Bedlinen Set",
    description:
      "Organic cotton bed linen sets in muted earth tones — fitted sheet, flat sheet, and two pillowcases.",
    category: "Home & Lifestyle",
    pricePaise: 120000,
    moq: 15,
  },
  {
    slug: "botanical-bath-essentials-kit",
    brandName: "Solstice Living",
    name: "Botanical Bath Essentials Kit",
    description:
      "Plant-based bath kits with a bar soap, body scrub, and body oil, packaged in recyclable kraft cartons.",
    category: "Beauty & Personal Care",
    pricePaise: 34000,
    moq: 30,
  },
  {
    slug: "canvas-slip-on-sneakers",
    brandName: "Stride & Co",
    name: "Canvas Slip-On Sneakers",
    description:
      "Lightweight canvas slip-ons with a rubber sole, offered in four colorways sized 6-11 (men's UK).",
    category: "Footwear",
    pricePaise: 89000,
    moq: 20,
  },
  {
    slug: "handcrafted-leather-sandals",
    brandName: "Stride & Co",
    name: "Handcrafted Leather Sandals",
    description:
      "Vegetable-tanned leather sandals made in small batches, with an adjustable buckle strap.",
    category: "Footwear",
    pricePaise: 110000,
    moq: 15,
  },
  {
    slug: "festive-chanderi-saree-collection",
    brandName: "Aara Studio",
    name: "Festive Chanderi Saree Collection",
    description:
      "Lightweight Chanderi sarees with zari borders, curated for the festive and wedding season.",
    category: "Womenswear",
    pricePaise: 220000,
    moq: 12,
  },
  {
    slug: "rainy-day-raincoat-set",
    brandName: "Pebble Lane Kids",
    name: "Rainy Day Raincoat Set",
    description:
      "Waterproof raincoats with bag covers for kids, reflective strips for visibility, sizes 3-12 years.",
    category: "Kidswear",
    pricePaise: 56000,
    moq: 35,
  },
];
