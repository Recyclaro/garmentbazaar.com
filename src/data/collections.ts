export type CollectionCategory =
  | "Womenswear"
  | "Menswear"
  | "Kidswear"
  | "Ethnic & Occasion"
  | "Activewear"
  | "Innerwear & Sleepwear"
  | "Maternity & Plus Size"
  | "Footwear"
  | "Bags & Luggage"
  | "Accessories"
  | "Uniforms & Workwear"
  | "Home & Lifestyle"
  | "Beauty & Personal Care";

export const collectionCategories: CollectionCategory[] = [
  "Womenswear",
  "Menswear",
  "Kidswear",
  "Ethnic & Occasion",
  "Activewear",
  "Innerwear & Sleepwear",
  "Maternity & Plus Size",
  "Footwear",
  "Bags & Luggage",
  "Accessories",
  "Uniforms & Workwear",
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
 * Photos are cropped from GarmentBazaar's own product sheet
 * (public/images/products); replace a file there to upgrade a photo.
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
      "Breathable linen-cotton kurta sets in five wash-friendly colourways, cut for easy retail sizing from S to XXL.",
    category: "Ethnic & Occasion",
    pricePaise: 145000,
    moq: 25,
    imagePath: "/images/products/ethnic-kurti.jpg",
  },
  {
    slug: "handblock-cotton-dupatta-edit",
    brandName: "Meridian Threads",
    name: "Handblock Cotton Stole Edit",
    description:
      "Hand block-printed cotton stoles in traditional motifs, finished with hand-rolled edges.",
    category: "Accessories",
    pricePaise: 38000,
    moq: 50,
    imagePath: "/images/products/acc-scarf.jpg",
  },
  {
    slug: "everyday-oxford-shirts",
    brandName: "Northline Basics",
    name: "Everyday Oxford Shirts",
    description:
      "Easy-iron cotton Oxford shirts in sky blue and white, regular fit, sizes S to XXL.",
    category: "Menswear",
    pricePaise: 62000,
    moq: 30,
    imagePath: "/images/products/men-shirt.jpg",
  },
  {
    slug: "junior-explorer-playwear",
    brandName: "Pebble Lane Kids",
    name: "Junior Explorer Tees",
    description:
      "Soft cotton graphic tees for boys aged 2 to 10, printed with playful dinosaur artwork.",
    category: "Kidswear",
    pricePaise: 26000,
    moq: 40,
    imagePath: "/images/products/kids-boys-tee.jpg",
  },
  {
    slug: "organic-cotton-bedlinen-set",
    brandName: "Solstice Living",
    name: "Printed Cotton Bedlinen Set",
    description:
      "Floral-print cotton bedsheet and pillow cover sets in queen and king sizes.",
    category: "Home & Lifestyle",
    pricePaise: 165000,
    moq: 15,
    imagePath: "/images/products/home-bedlinen.jpg",
  },
  {
    slug: "botanical-bath-essentials-kit",
    brandName: "Solstice Living",
    name: "Botanical Bath Essentials Kit",
    description:
      "Gift-ready bath kits with body wash, scrub and a cotton pouch, for lifestyle stores.",
    category: "Beauty & Personal Care",
    pricePaise: 54000,
    moq: 30,
    imagePath: null,
  },
  {
    slug: "canvas-slip-on-sneakers",
    brandName: "Stride & Co",
    name: "Everyday White Sneakers",
    description:
      "Clean white lace-up sneakers with a cushioned sole, sizes 6 to 11.",
    category: "Footwear",
    pricePaise: 95000,
    moq: 18,
    imagePath: "/images/products/shoes-casual.jpg",
  },
  {
    slug: "handcrafted-leather-sandals",
    brandName: "Stride & Co",
    name: "Handcrafted Leather Sandals",
    description:
      "Tan leather cross-strap sandals with a moulded footbed.",
    category: "Footwear",
    pricePaise: 72000,
    moq: 20,
    imagePath: "/images/products/shoes-sandals.jpg",
  },
  {
    slug: "festive-chanderi-saree-collection",
    brandName: "Aara Studio",
    name: "Festive Silk-Blend Sarees",
    description:
      "Silk-blend sarees with woven borders in blush and rose, with blouse piece.",
    category: "Ethnic & Occasion",
    pricePaise: 210000,
    moq: 12,
    imagePath: "/images/products/ethnic-saree.jpg",
  },
  {
    slug: "rainy-day-raincoat-set",
    brandName: "Pebble Lane Kids",
    name: "Rainy Day Raincoats",
    description:
      "Hooded waterproof raincoats in sunshine yellow, taped seams, ages 4 to 14.",
    category: "Kidswear",
    pricePaise: 58000,
    moq: 25,
    imagePath: "/images/products/season-rain.jpg",
  },
  {
    slug: "harbour-pique-polos",
    brandName: "Northline Basics",
    name: "Harbour Piqué Polos",
    description:
      "Cotton piqué polos in eight core colours with a clean placket, packed in size ratios.",
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
    name: "Festive Kurta Sets",
    description:
      "Embroidered straight-cut kurta and churidar sets for the festive and wedding season.",
    category: "Ethnic & Occasion",
    pricePaise: 96000,
    moq: 20,
    imagePath: "/images/products/ethnic-men.jpg",
  },
  {
    slug: "weekend-utility-jackets",
    brandName: "Indigo Row",
    name: "Weekend Bomber Jackets",
    description:
      "Lightweight twill bomber jackets in olive with rib trims, sizes S to XXL.",
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
      "Poly-viscose two-piece suits in navy and charcoal, sizes 36 to 46.",
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
      "Heavyweight brushed-fleece pullover hoodies in bottle green, grey and navy.",
    category: "Menswear",
    pricePaise: 79000,
    moq: 30,
    imagePath: "/images/products/men-hoodie.jpg",
  },
  {
    slug: "corporate-oxford-uniform-shirts",
    brandName: "Crestline Formal",
    name: "Corporate Uniform Polos",
    description:
      "Navy uniform polos with logo embroidery for offices, retail staff and events.",
    category: "Uniforms & Workwear",
    pricePaise: 38000,
    moq: 100,
    imagePath: "/images/products/uniform-corporate.jpg",
  },
  {
    slug: "tailored-co-ord-sets",
    brandName: "Meridian Threads",
    name: "Tailored Co-ord Sets",
    description:
      "Blazer and trouser co-ord sets in orchid and plum, fully lined, sizes XS to XL.",
    category: "Womenswear",
    pricePaise: 185000,
    moq: 20,
    imagePath: "/images/products/women-coord.jpg",
  },
  {
    slug: "floral-day-dresses",
    brandName: "Meridian Threads",
    name: "Belted Shirt Dresses",
    description:
      "Belted midi shirt dresses in rose pink, with roll-up sleeves, sizes XS to XL.",
    category: "Womenswear",
    pricePaise: 88000,
    moq: 25,
    imagePath: "/images/products/women-dress.jpg",
  },
  {
    slug: "heritage-lehenga-sets",
    brandName: "Aara Studio",
    name: "Heritage Lehenga Sets",
    description:
      "Embroidered lehenga, blouse and dupatta sets for festive and bridal-party retail.",
    category: "Ethnic & Occasion",
    pricePaise: 520000,
    moq: 6,
    imagePath: "/images/products/ethnic-lehenga.jpg",
  },
  {
    slug: "studio-activewear-sets",
    brandName: "Pulse Active",
    name: "Studio Yoga Sets",
    description:
      "Four-way stretch sports bra and high-rise legging sets with moisture-wicking fabric.",
    category: "Activewear",
    pricePaise: 98000,
    moq: 24,
    imagePath: "/images/products/active-yoga.jpg",
  },
  {
    slug: "utility-denim-jumpsuits",
    brandName: "Indigo Row",
    name: "Women's Everyday Denim",
    description:
      "High-rise straight-leg jeans in a light wash, sizes 24 to 36.",
    category: "Womenswear",
    pricePaise: 92000,
    moq: 24,
    imagePath: "/images/products/women-jeans.jpg",
  },
  {
    slug: "party-frill-dresses",
    brandName: "Pebble Lane Kids",
    name: "Party Frill Dresses",
    description:
      "Tiered cotton-blend party dresses for girls aged 2 to 10, in blush pink.",
    category: "Kidswear",
    pricePaise: 54000,
    moq: 30,
    imagePath: "/images/products/kids-girls-dress.jpg",
  },
  {
    slug: "little-festive-kurta-sets",
    brandName: "Pebble Lane Kids",
    name: "Little Festive Kurta Sets",
    description:
      "Cotton-silk kurta pyjama sets for boys aged 1 to 12, in gold and cream.",
    category: "Kidswear",
    pricePaise: 48000,
    moq: 30,
    imagePath: "/images/products/kids-boys-ethnic.jpg",
  },
  {
    slug: "kids-hooded-puffers",
    brandName: "Pebble Lane Kids",
    name: "Kids Hooded Puffers",
    description:
      "Quilted hooded puffer jackets with a soft lining for winter, ages 2 to 12.",
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
      "Shirts, pinafores, trousers and ties made to school specifications for bulk orders.",
    category: "Uniforms & Workwear",
    pricePaise: 36000,
    moq: 200,
    imagePath: "/images/products/kids-school.jpg",
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
    imagePath: "/images/products/shoes-formal.jpg",
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
    imagePath: "/images/products/shoes-sports.jpg",
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
    imagePath: "/images/products/shoes-boots.jpg",
  },
  {
    slug: "commuter-laptop-backpacks",
    brandName: "Carryall Goods",
    name: "Commuter Backpacks",
    description:
      "Water-resistant backpacks with a padded 15-inch laptop sleeve.",
    category: "Bags & Luggage",
    pricePaise: 98000,
    moq: 20,
    imagePath: "/images/products/bag-backpack.jpg",
  },
  {
    slug: "structured-leather-handbags",
    brandName: "Carryall Goods",
    name: "Structured Handbags",
    description:
      "Structured top-handle bags in blush, tan and black.",
    category: "Bags & Luggage",
    pricePaise: 86000,
    moq: 20,
    imagePath: "/images/products/bag-handbag.jpg",
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
    imagePath: "/images/products/acc-watch.jpg",
  },
  {
    slug: "cabin-hardshell-luggage",
    brandName: "Carryall Goods",
    name: "Cabin Hardshell Luggage",
    description:
      "Polycarbonate cabin trolleys with 360-degree wheels and a TSA lock.",
    category: "Bags & Luggage",
    pricePaise: 265000,
    moq: 10,
    imagePath: "/images/products/bag-luggage.jpg",
  },
  {
    slug: "organic-crew-tees",
    brandName: "Northline Basics",
    name: "Organic Crew Tees",
    description:
      "Organic cotton crew-neck tees in teal, white and black, 180 GSM.",
    category: "Menswear",
    pricePaise: 28000,
    moq: 50,
    imagePath: "/images/products/men-tshirt.jpg",
  },
  {
    slug: "stretch-cotton-chinos",
    brandName: "Indigo Row",
    name: "Stretch Cotton Chinos",
    description:
      "Slim-fit stretch chinos in khaki and olive, sizes 28 to 40.",
    category: "Menswear",
    pricePaise: 82000,
    moq: 30,
    imagePath: "/images/products/men-chinos.jpg",
  },
  {
    slug: "tropical-print-shirts",
    brandName: "Northline Basics",
    name: "Tropical Print Shirts",
    description:
      "Short-sleeve camp-collar shirts in summer prints, soft viscose.",
    category: "Menswear",
    pricePaise: 64000,
    moq: 30,
    imagePath: "/images/products/season-summer.jpg",
  },
  {
    slug: "mens-quilted-puffers",
    brandName: "Indigo Row",
    name: "Men's Quilted Puffers",
    description:
      "Navy quilted puffer jackets with a stand collar for winter stock.",
    category: "Menswear",
    pricePaise: 185000,
    moq: 15,
    imagePath: "/images/products/season-winter.jpg",
  },
  {
    slug: "printed-button-down-blouses",
    brandName: "Meridian Threads",
    name: "Printed Button-Down Blouses",
    description:
      "Relaxed floral blouses in rayon crepe, sizes XS to XXL.",
    category: "Womenswear",
    pricePaise: 56000,
    moq: 30,
    imagePath: "/images/products/women-top.jpg",
  },
  {
    slug: "tailored-womens-blazers",
    brandName: "Crestline Formal",
    name: "Tailored Women's Blazers",
    description:
      "Single-button blazers in camel and black for workwear ranges.",
    category: "Womenswear",
    pricePaise: 145000,
    moq: 15,
    imagePath: "/images/products/women-jacket.jpg",
  },
  {
    slug: "ankle-cotton-leggings",
    brandName: "Pulse Active",
    name: "Ankle-Length Leggings",
    description:
      "Cotton-lycra leggings in 12 colours, sizes S to 4XL.",
    category: "Womenswear",
    pricePaise: 24000,
    moq: 60,
    imagePath: "/images/products/women-leggings.jpg",
  },
  {
    slug: "pleated-midi-skirts",
    brandName: "Meridian Threads",
    name: "Pleated Midi Skirts",
    description:
      "Sunray-pleated midi skirts in blush with an elastic waist.",
    category: "Womenswear",
    pricePaise: 52000,
    moq: 30,
    imagePath: "/images/products/women-skirt.jpg",
  },
  {
    slug: "womens-longline-puffers",
    brandName: "Meridian Threads",
    name: "Women's Hooded Puffers",
    description:
      "Burgundy hooded puffer jackets with a quilted finish.",
    category: "Womenswear",
    pricePaise: 175000,
    moq: 15,
    imagePath: "/images/products/women-winter.jpg",
  },
  {
    slug: "girls-everyday-tops",
    brandName: "Pebble Lane Kids",
    name: "Girls Everyday Tops",
    description:
      "Soft cotton tops in pastel pink for girls aged 4 to 12.",
    category: "Kidswear",
    pricePaise: 22000,
    moq: 40,
    imagePath: "/images/products/kids-girls-top.jpg",
  },
  {
    slug: "organic-infant-rompers",
    brandName: "Little Sprout",
    name: "Organic Infant Rompers",
    description:
      "Organic cotton footed rompers with bear appliqué, 0 to 24 months.",
    category: "Kidswear",
    pricePaise: 32000,
    moq: 40,
    imagePath: "/images/products/kids-infant.jpg",
  },
  {
    slug: "kids-character-backpacks",
    brandName: "Little Sprout",
    name: "Kids Character Backpacks",
    description:
      "Lightweight school backpacks with padded straps, for ages 3 to 8.",
    category: "Kidswear",
    pricePaise: 34000,
    moq: 30,
    imagePath: "/images/products/kids-accessories.jpg",
  },
  {
    slug: "wedding-sherwanis",
    brandName: "Aara Studio",
    name: "Wedding Sherwanis",
    description:
      "Embroidered navy sherwanis with churidar, for groom and wedding-party retail.",
    category: "Ethnic & Occasion",
    pricePaise: 480000,
    moq: 6,
    imagePath: "/images/products/ethnic-sherwani.jpg",
  },
  {
    slug: "anarkali-suit-sets",
    brandName: "Aara Studio",
    name: "Anarkali Suit Sets",
    description:
      "Flared anarkali kurtas with dupatta in coral and peach prints.",
    category: "Ethnic & Occasion",
    pricePaise: 145000,
    moq: 15,
    imagePath: "/images/products/ethnic-anarkali.jpg",
  },
  {
    slug: "printed-festive-sets",
    brandName: "Meridian Threads",
    name: "Printed Festive Sets",
    description:
      "Mustard printed kurta, palazzo and dupatta sets for the festive season.",
    category: "Ethnic & Occasion",
    pricePaise: 118000,
    moq: 20,
    imagePath: "/images/products/ethnic-festive.jpg",
  },
  {
    slug: "indo-western-jackets",
    brandName: "Crestline Formal",
    name: "Indo-Western Jackets",
    description:
      "Textured ivory bandhgala-style jackets to layer over kurtas or shirts.",
    category: "Ethnic & Occasion",
    pricePaise: 165000,
    moq: 12,
    imagePath: "/images/products/ethnic-indowestern.jpg",
  },
  {
    slug: "performance-gym-tees",
    brandName: "Pulse Active",
    name: "Performance Gym Tees",
    description:
      "Quick-dry training tees in charcoal and navy, sizes S to XXL.",
    category: "Activewear",
    pricePaise: 32000,
    moq: 50,
    imagePath: "/images/products/active-gym.jpg",
  },
  {
    slug: "zip-up-tracksuits",
    brandName: "Pulse Active",
    name: "Zip-Up Tracksuits",
    description:
      "Two-piece polyknit tracksuits in pink and navy with contrast piping.",
    category: "Activewear",
    pricePaise: 128000,
    moq: 20,
    imagePath: "/images/products/active-tracksuit.jpg",
  },
  {
    slug: "running-windbreakers",
    brandName: "Pulse Active",
    name: "Running Windbreakers",
    description:
      "Lightweight cobalt running jackets with reflective trims.",
    category: "Activewear",
    pricePaise: 98000,
    moq: 20,
    imagePath: "/images/products/active-running.jpg",
  },
  {
    slug: "custom-team-jerseys",
    brandName: "Pulse Active",
    name: "Custom Team Jerseys",
    description:
      "Sublimated team jerseys with your club name and numbers, for bulk orders.",
    category: "Activewear",
    pricePaise: 45000,
    moq: 50,
    imagePath: "/images/products/active-team.jpg",
  },
  {
    slug: "kids-sports-hoodies",
    brandName: "Pulse Active",
    name: "Kids Sports Hoodies",
    description:
      "Zip-through sports hoodies for school teams, ages 6 to 14.",
    category: "Activewear",
    pricePaise: 52000,
    moq: 30,
    imagePath: "/images/products/active-kids.jpg",
  },
  {
    slug: "cotton-camisoles-vests",
    brandName: "Everyday Soft",
    name: "Cotton Camisoles",
    description:
      "Rib-knit cotton camisoles and vests in white and skin tones, packs of three.",
    category: "Innerwear & Sleepwear",
    pricePaise: 36000,
    moq: 50,
    imagePath: "/images/products/inner-vests.jpg",
  },
  {
    slug: "brief-trunk-packs",
    brandName: "Everyday Soft",
    name: "Brief and Trunk Packs",
    description:
      "Cotton-elastane briefs and trunks in grey marl, packs of three.",
    category: "Innerwear & Sleepwear",
    pricePaise: 42000,
    moq: 50,
    imagePath: "/images/products/inner-briefs.jpg",
  },
  {
    slug: "printed-night-suits",
    brandName: "Everyday Soft",
    name: "Printed Night Suits",
    description:
      "Floral cotton night suits with piping, sizes S to XXL.",
    category: "Innerwear & Sleepwear",
    pricePaise: 58000,
    moq: 30,
    imagePath: "/images/products/inner-sleepwear.jpg",
  },
  {
    slug: "satin-pyjama-sets",
    brandName: "Everyday Soft",
    name: "Satin Pyjama Sets",
    description:
      "Button-down satin pyjama sets in blush pink.",
    category: "Innerwear & Sleepwear",
    pricePaise: 78000,
    moq: 25,
    imagePath: "/images/products/women-nightwear.jpg",
  },
  {
    slug: "seamless-shapewear",
    brandName: "Everyday Soft",
    name: "Seamless Shapewear",
    description:
      "Seamless shaping bodysuits in black and nude.",
    category: "Innerwear & Sleepwear",
    pricePaise: 62000,
    moq: 30,
    imagePath: "/images/products/inner-shapewear.jpg",
  },
  {
    slug: "maternity-wrap-dresses",
    brandName: "Bloom & Belly",
    name: "Maternity Wrap Dresses",
    description:
      "Stretch-jersey wrap dresses that grow with the bump, sizes S to XL.",
    category: "Maternity & Plus Size",
    pricePaise: 82000,
    moq: 20,
    imagePath: "/images/products/maternity-dress.jpg",
  },
  {
    slug: "nursing-shirt-dresses",
    brandName: "Bloom & Belly",
    name: "Nursing Shirt Dresses",
    description:
      "Chambray button-front dresses with discreet nursing access.",
    category: "Maternity & Plus Size",
    pricePaise: 76000,
    moq: 20,
    imagePath: "/images/products/maternity-nursing.jpg",
  },
  {
    slug: "maternity-support-leggings",
    brandName: "Bloom & Belly",
    name: "Maternity Leggings",
    description:
      "Over-bump support leggings in black, sizes S to XXL.",
    category: "Maternity & Plus Size",
    pricePaise: 38000,
    moq: 30,
    imagePath: "/images/products/maternity-leggings.jpg",
  },
  {
    slug: "plus-size-tunic-dresses",
    brandName: "Fuller Fit",
    name: "Plus Size Tunic Dresses",
    description:
      "Flowy tunic dresses in black crepe, sizes XL to 5XL.",
    category: "Maternity & Plus Size",
    pricePaise: 72000,
    moq: 20,
    imagePath: "/images/products/plus-dress.jpg",
  },
  {
    slug: "plus-size-printed-tops",
    brandName: "Fuller Fit",
    name: "Plus Size Printed Tops",
    description:
      "Polka-dot wrap tops with flutter sleeves, sizes XL to 5XL.",
    category: "Maternity & Plus Size",
    pricePaise: 48000,
    moq: 25,
    imagePath: "/images/products/plus-top.jpg",
  },
  {
    slug: "plus-size-stretch-denim",
    brandName: "Fuller Fit",
    name: "Plus Size Stretch Denim",
    description:
      "High-rise stretch jeans in mid-wash, sizes 34 to 44.",
    category: "Maternity & Plus Size",
    pricePaise: 96000,
    moq: 20,
    imagePath: "/images/products/plus-jeans.jpg",
  },
  {
    slug: "stiletto-pumps",
    brandName: "Stride & Co",
    name: "Classic Stiletto Pumps",
    description:
      "Pointed-toe patent pumps in black with a 9 cm heel.",
    category: "Footwear",
    pricePaise: 110000,
    moq: 15,
    imagePath: "/images/products/shoes-heels.jpg",
  },
  {
    slug: "kids-velcro-sneakers",
    brandName: "Stride & Co",
    name: "Kids Velcro Sneakers",
    description:
      "Easy-on velcro sneakers for kids, sizes 8C to 5.",
    category: "Footwear",
    pricePaise: 62000,
    moq: 20,
    imagePath: "/images/products/shoes-kids.jpg",
  },
  {
    slug: "leather-tote-bags",
    brandName: "Carryall Goods",
    name: "Leather Tote Bags",
    description:
      "Roomy tan tote bags with an inner zip pocket.",
    category: "Bags & Luggage",
    pricePaise: 115000,
    moq: 15,
    imagePath: "/images/products/bag-tote.jpg",
  },
  {
    slug: "weekender-duffels",
    brandName: "Carryall Goods",
    name: "Weekender Duffels",
    description:
      "Black duffel bags with a shoe compartment and shoulder strap.",
    category: "Bags & Luggage",
    pricePaise: 98000,
    moq: 15,
    imagePath: "/images/products/bag-duffel.jpg",
  },
  {
    slug: "laptop-messenger-bags",
    brandName: "Carryall Goods",
    name: "Laptop Messenger Bags",
    description:
      "Structured laptop bags with padded 15.6-inch sleeve.",
    category: "Bags & Luggage",
    pricePaise: 88000,
    moq: 20,
    imagePath: "/images/products/bag-laptop.jpg",
  },
  {
    slug: "upcycled-fabric-totes",
    brandName: "Second Loop",
    name: "Upcycled Fabric Totes",
    description:
      "Tote bags made from post-production fabric waste, each one unique.",
    category: "Bags & Luggage",
    pricePaise: 42000,
    moq: 30,
    imagePath: "/images/products/eco-upcycled.jpg",
  },
  {
    slug: "classic-aviator-sunglasses",
    brandName: "Carryall Goods",
    name: "Classic Sunglasses",
    description:
      "UV400 wayfarer and aviator sunglasses in black frames.",
    category: "Accessories",
    pricePaise: 36000,
    moq: 30,
    imagePath: "/images/products/acc-sunglasses.jpg",
  },
  {
    slug: "leather-belts",
    brandName: "Carryall Goods",
    name: "Leather Belts",
    description:
      "Genuine leather belts with brushed-steel buckles, sizes 30 to 44.",
    category: "Accessories",
    pricePaise: 34000,
    moq: 30,
    imagePath: "/images/products/acc-belt.jpg",
  },
  {
    slug: "embroidered-caps",
    brandName: "Northline Basics",
    name: "Embroidered Caps",
    description:
      "Cotton twill caps with an adjustable strap; custom logos available.",
    category: "Accessories",
    pricePaise: 18000,
    moq: 50,
    imagePath: "/images/products/acc-cap.jpg",
  },
  {
    slug: "temple-jewellery-sets",
    brandName: "Aara Studio",
    name: "Temple Jewellery Sets",
    description:
      "Gold-tone temple jewellery earrings and necklace sets for festive retail.",
    category: "Accessories",
    pricePaise: 78000,
    moq: 20,
    imagePath: "/images/products/acc-jewellery.jpg",
  },
  {
    slug: "cotton-bath-towels",
    brandName: "Solstice Living",
    name: "Cotton Bath Towels",
    description:
      "500 GSM combed-cotton bath towels in white and grey.",
    category: "Home & Lifestyle",
    pricePaise: 45000,
    moq: 30,
    imagePath: "/images/products/home-towels.jpg",
  },
  {
    slug: "embroidered-cushion-covers",
    brandName: "Solstice Living",
    name: "Embroidered Cushion Covers",
    description:
      "Cotton cushion covers with hand embroidery, 16 x 16 inch.",
    category: "Home & Lifestyle",
    pricePaise: 26000,
    moq: 50,
    imagePath: "/images/products/home-cushions.jpg",
  },
  {
    slug: "linen-blend-curtains",
    brandName: "Solstice Living",
    name: "Linen-Blend Curtains",
    description:
      "Light-filtering linen-blend curtains in taupe, 7 ft and 9 ft.",
    category: "Home & Lifestyle",
    pricePaise: 98000,
    moq: 20,
    imagePath: "/images/products/home-curtains.jpg",
  },
  {
    slug: "waffle-bathrobes",
    brandName: "Solstice Living",
    name: "Waffle Bathrobes",
    description:
      "Cotton waffle-weave bathrobes for homes, spas and hotels.",
    category: "Home & Lifestyle",
    pricePaise: 115000,
    moq: 15,
    imagePath: "/images/products/home-robes.jpg",
  },
  {
    slug: "chef-hospitality-uniforms",
    brandName: "Crestline Formal",
    name: "Chef and Hospitality Uniforms",
    description:
      "Double-breasted chef coats and service wear for hotels and restaurants.",
    category: "Uniforms & Workwear",
    pricePaise: 72000,
    moq: 50,
    imagePath: "/images/products/uniform-hospitality.jpg",
  },
  {
    slug: "healthcare-scrubs",
    brandName: "Crestline Formal",
    name: "Healthcare Scrubs",
    description:
      "Poly-cotton scrub sets in royal blue for hospitals and clinics.",
    category: "Uniforms & Workwear",
    pricePaise: 64000,
    moq: 50,
    imagePath: "/images/products/uniform-healthcare.jpg",
  },
  {
    slug: "hi-vis-safety-vests",
    brandName: "Crestline Formal",
    name: "Hi-Vis Safety Vests",
    description:
      "Reflective safety vests for construction, logistics and industrial sites.",
    category: "Uniforms & Workwear",
    pricePaise: 18000,
    moq: 100,
    imagePath: "/images/products/uniform-industrial.jpg",
  },
  {
    slug: "canvas-work-aprons",
    brandName: "Crestline Formal",
    name: "Canvas Work Aprons",
    description:
      "Heavy canvas bib aprons with pockets for cafés and workshops.",
    category: "Uniforms & Workwear",
    pricePaise: 22000,
    moq: 50,
    imagePath: "/images/products/uniform-apron.jpg",
  },
];
