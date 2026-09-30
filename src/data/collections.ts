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
  imagePath: string | null;
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
    imagePath: "/images/products/women-kurti.jpg",
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
    imagePath: "/images/products/scarf.jpg",
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
    imagePath: "/images/products/men-shirt.jpg",
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
    imagePath: "/images/products/kids-tee.jpg",
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
    imagePath: "/images/products/fabric-linen.jpg",
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
    imagePath: null,
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
    imagePath: "/images/products/sneakers.jpg",
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
    imagePath: "/images/products/sandals.jpg",
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
    imagePath: "/images/products/women-saree.jpg",
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
    imagePath: "/images/products/rainwear.jpg",
  },
  {
    slug: "harbour-pique-polos",
    brandName: "Northline Basics",
    name: "Harbour Piqué Polos",
    description:
      "Cotton piqué polos in eight core colours with a clean embroidered placket, packed in size ratios.",
    category: "Menswear",
    pricePaise: 42000,
    moq: 40,
    imagePath: "/images/products/men-polo.jpg",
  },
  {
    slug: "straight-fit-rigid-denim",
    brandName: "Indigo Row",
    name: "Straight-Fit Rigid Denim",
    description:
      "Mid-rise straight jeans in a classic mid-wash, 12 oz cotton denim, sizes 28 to 40.",
    category: "Menswear",
    pricePaise: 89000,
    moq: 30,
    imagePath: "/images/products/men-jeans.jpg",
  },
  {
    slug: "festive-cotton-kurtas",
    brandName: "Aara Studio",
    name: "Festive Cotton Kurtas",
    description:
      "Straight-cut cotton kurtas with self-textured weave for festive and wedding season stock.",
    category: "Menswear",
    pricePaise: 76000,
    moq: 25,
    imagePath: "/images/products/men-kurta.jpg",
  },
  {
    slug: "weekend-utility-jackets",
    brandName: "Indigo Row",
    name: "Weekend Utility Jackets",
    description:
      "Lightweight cotton-twill utility jackets in olive and navy for transitional weather.",
    category: "Menswear",
    pricePaise: 135000,
    moq: 20,
    imagePath: "/images/products/men-jacket.jpg",
  },
  {
    slug: "tailored-two-piece-suits",
    brandName: "Crestline Formal",
    name: "Tailored Two-Piece Suits",
    description:
      "Poly-viscose two-piece suits in navy and charcoal, half-canvas construction, sizes 36 to 46.",
    category: "Menswear",
    pricePaise: 420000,
    moq: 10,
    imagePath: "/images/products/men-suit.jpg",
  },
  {
    slug: "brushed-fleece-hoodies",
    brandName: "Northline Basics",
    name: "Brushed Fleece Hoodies",
    description:
      "Heavyweight brushed-fleece pullover hoodies in heather grey, black and navy.",
    category: "Menswear",
    pricePaise: 79000,
    moq: 30,
    imagePath: "/images/products/men-hoodie.jpg",
  },
  {
    slug: "corporate-oxford-uniform-shirts",
    brandName: "Crestline Formal",
    name: "Corporate Uniform Shirts",
    description:
      "Easy-iron Oxford shirts for office and front-desk uniforms, logo embroidery available.",
    category: "Menswear",
    pricePaise: 52000,
    moq: 100,
    imagePath: "/images/products/uniform-corporate.jpg",
  },
  {
    slug: "tailored-co-ord-sets",
    brandName: "Meridian Threads",
    name: "Tailored Co-ord Sets",
    description:
      "Blazer and trouser co-ord sets in dusty rose and sage, fully lined, sizes XS to XL.",
    category: "Womenswear",
    pricePaise: 185000,
    moq: 20,
    imagePath: "/images/products/women-coord.jpg",
  },
  {
    slug: "floral-day-dresses",
    brandName: "Meridian Threads",
    name: "Floral Day Dresses",
    description:
      "Printed viscose day dresses with adjustable straps, in four seasonal floral prints.",
    category: "Womenswear",
    pricePaise: 68000,
    moq: 30,
    imagePath: "/images/products/women-dress.jpg",
  },
  {
    slug: "heritage-lehenga-sets",
    brandName: "Aara Studio",
    name: "Heritage Lehenga Sets",
    description:
      "Embroidered lehenga, blouse and dupatta sets for festive and bridal-party retail.",
    category: "Womenswear",
    pricePaise: 520000,
    moq: 6,
    imagePath: "/images/products/women-lehenga.jpg",
  },
  {
    slug: "studio-activewear-sets",
    brandName: "Pulse Active",
    name: "Studio Activewear Sets",
    description:
      "Four-way stretch sports bra and high-rise legging sets with moisture-wicking fabric.",
    category: "Womenswear",
    pricePaise: 98000,
    moq: 24,
    imagePath: "/images/products/women-active.jpg",
  },
  {
    slug: "utility-denim-jumpsuits",
    brandName: "Indigo Row",
    name: "Utility Denim Jumpsuits",
    description:
      "Soft-wash denim jumpsuits with a tie waist and patch pockets, sizes XS to XL.",
    category: "Womenswear",
    pricePaise: 149000,
    moq: 15,
    imagePath: "/images/products/women-jumpsuit.jpg",
  },
  {
    slug: "party-frill-dresses",
    brandName: "Pebble Lane Kids",
    name: "Party Frill Dresses",
    description:
      "Tiered cotton-blend party dresses for girls aged 2 to 10, in blush and lilac.",
    category: "Kidswear",
    pricePaise: 54000,
    moq: 30,
    imagePath: "/images/products/kids-dress.jpg",
  },
  {
    slug: "little-festive-kurta-sets",
    brandName: "Pebble Lane Kids",
    name: "Little Festive Kurta Sets",
    description:
      "Cotton kurta pyjama sets for boys aged 1 to 12, in bottle green and mustard.",
    category: "Kidswear",
    pricePaise: 48000,
    moq: 30,
    imagePath: "/images/products/kids-ethnic-boys.jpg",
  },
  {
    slug: "kids-hooded-puffers",
    brandName: "Pebble Lane Kids",
    name: "Kids Hooded Puffers",
    description:
      "Quilted hooded puffer jackets with a soft lining for winter stock, ages 2 to 12.",
    category: "Kidswear",
    pricePaise: 112000,
    moq: 20,
    imagePath: "/images/products/kids-winter.jpg",
  },
  {
    slug: "school-uniform-programme",
    brandName: "Crestline Formal",
    name: "School Uniform Programme",
    description:
      "Shirts, trousers, skirts and ties made to school specifications for bulk orders.",
    category: "Kidswear",
    pricePaise: 36000,
    moq: 200,
    imagePath: "/images/products/kids-uniform.jpg",
  },
  {
    slug: "oxford-leather-formals",
    brandName: "Stride & Co",
    name: "Oxford Leather Formals",
    description:
      "Full-grain leather Oxford shoes with a cushioned insole, sizes 6 to 11.",
    category: "Footwear",
    pricePaise: 165000,
    moq: 12,
    imagePath: "/images/products/formal-shoes.jpg",
  },
  {
    slug: "everyday-running-shoes",
    brandName: "Stride & Co",
    name: "Everyday Running Shoes",
    description:
      "Lightweight mesh running shoes with an EVA sole for sports and athleisure stores.",
    category: "Footwear",
    pricePaise: 119000,
    moq: 18,
    imagePath: "/images/products/sports-shoes.jpg",
  },
  {
    slug: "lace-up-leather-boots",
    brandName: "Stride & Co",
    name: "Lace-Up Leather Boots",
    description:
      "Brown leather lace-up boots with a lug sole, for winter and outdoor ranges.",
    category: "Footwear",
    pricePaise: 210000,
    moq: 12,
    imagePath: "/images/products/boots.jpg",
  },
  {
    slug: "commuter-laptop-backpacks",
    brandName: "Carryall Goods",
    name: "Commuter Laptop Backpacks",
    description:
      "Water-resistant backpacks with a padded 15-inch laptop sleeve and USB port.",
    category: "Accessories",
    pricePaise: 98000,
    moq: 20,
    imagePath: "/images/products/backpack.jpg",
  },
  {
    slug: "structured-leather-handbags",
    brandName: "Carryall Goods",
    name: "Structured Handbags",
    description:
      "Structured faux-leather top-handle bags in blush, tan and black.",
    category: "Accessories",
    pricePaise: 86000,
    moq: 20,
    imagePath: "/images/products/handbag.jpg",
  },
  {
    slug: "classic-analog-watches",
    brandName: "Carryall Goods",
    name: "Classic Analog Watches",
    description:
      "Minimal analog watches with leather straps and a rose-gold case.",
    category: "Accessories",
    pricePaise: 145000,
    moq: 15,
    imagePath: "/images/products/watch.jpg",
  },
  {
    slug: "cabin-hardshell-luggage",
    brandName: "Carryall Goods",
    name: "Cabin Hardshell Luggage",
    description:
      "Polycarbonate cabin trolleys with 360-degree wheels and a TSA lock.",
    category: "Accessories",
    pricePaise: 265000,
    moq: 10,
    imagePath: "/images/products/luggage.jpg",
  },
];
