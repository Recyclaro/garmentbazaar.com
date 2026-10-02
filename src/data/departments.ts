import type { CollectionCategory } from "@/data/collections";

// Department colours and sample photos, in the style of the product sheet.
// Each band colour holds white text at 4.5:1 or better, except Kidswear,
// which uses dark text on yellow.
export interface Department {
  name: CollectionCategory;
  /** URL slug for /wholesale/<slug>. */
  slug: string;
  /** Page title and H1 for the department landing page. */
  seoTitle: string;
  /** Meta description and intro for the landing page. */
  seoDescription: string;
  label: string;
  band: string;
  text: string;
  photos: { file: string; label: string }[];
}

export const departments: Department[] = [
  {
    name: "Menswear",
    slug: "menswear",
    seoTitle: "Wholesale Menswear",
    seoDescription:
      "Wholesale menswear for retailers: shirts, polos, jeans, jackets and suits direct from brands. Price per piece up front, small MOQs.",
    label: "Men's wear",
    band: "bg-[#16335e]",
    text: "text-white",
    photos: [
      { file: "men-polo", label: "Polo shirts" },
      { file: "men-shirt", label: "Shirts" },
      { file: "men-jeans", label: "Jeans" },
      { file: "men-jacket", label: "Jackets" },
    ],
  },
  {
    name: "Womenswear",
    slug: "womenswear",
    seoTitle: "Wholesale Womenswear",
    seoDescription:
      "Wholesale womenswear for boutiques and stores: dresses, tops, co-ords, blazers and denim direct from brands, at brand-set MOQs.",
    label: "Women's wear",
    band: "bg-[#b0164f]",
    text: "text-white",
    photos: [
      { file: "women-dress", label: "Dresses" },
      { file: "women-top", label: "Tops" },
      { file: "women-coord", label: "Co-ords" },
      { file: "women-jacket", label: "Blazers" },
    ],
  },
  {
    name: "Kidswear",
    slug: "kidswear",
    seoTitle: "Wholesale Kidswear",
    seoDescription:
      "Wholesale kidswear for retailers: boys and girls tees, dresses, ethnic sets and winter wear, direct from brands with small MOQs.",
    label: "Kids' wear",
    band: "bg-[#f4c430]",
    text: "text-ink",
    photos: [
      { file: "kids-boys-tee", label: "Boys tees" },
      { file: "kids-girls-dress", label: "Girls dresses" },
      { file: "kids-boys-ethnic", label: "Kids ethnic" },
      { file: "kids-winter", label: "Winter wear" },
    ],
  },
  {
    name: "Ethnic & Occasion",
    slug: "ethnic-wear",
    seoTitle: "Wholesale Ethnic Wear",
    seoDescription:
      "Wholesale ethnic wear for retailers: kurtis, sarees, lehengas, anarkalis and sherwanis direct from brands. See price per piece before you order.",
    label: "Ethnic & occasion",
    band: "bg-[#b91c1c]",
    text: "text-white",
    photos: [
      { file: "ethnic-lehenga", label: "Lehengas" },
      { file: "ethnic-sherwani", label: "Sherwanis" },
      { file: "ethnic-anarkali", label: "Anarkalis" },
      { file: "ethnic-saree", label: "Sarees" },
    ],
  },
  {
    name: "Activewear",
    slug: "activewear",
    seoTitle: "Wholesale Activewear",
    seoDescription:
      "Wholesale activewear and sportswear for stores: yoga sets, gym tees, tracksuits and team jerseys direct from brands.",
    label: "Activewear & sports",
    band: "bg-[#1d4ed8]",
    text: "text-white",
    photos: [
      { file: "active-yoga", label: "Yoga wear" },
      { file: "active-gym", label: "Gym wear" },
      { file: "active-tracksuit", label: "Tracksuits" },
      { file: "active-running", label: "Running" },
    ],
  },
  {
    name: "Footwear",
    slug: "footwear",
    seoTitle: "Wholesale Footwear",
    seoDescription:
      "Wholesale footwear for retailers: sneakers, sports shoes, formal shoes, heels, sandals and boots direct from brands at small MOQs.",
    label: "Footwear",
    band: "bg-[#0f766e]",
    text: "text-white",
    photos: [
      { file: "shoes-sports", label: "Sports shoes" },
      { file: "shoes-formal", label: "Formal shoes" },
      { file: "shoes-heels", label: "Heels" },
      { file: "shoes-boots", label: "Boots" },
    ],
  },
  {
    name: "Bags & Luggage",
    slug: "bags-luggage",
    seoTitle: "Wholesale Bags & Luggage",
    seoDescription:
      "Wholesale bags for retailers: handbags, backpacks, totes, duffels and cabin luggage direct from brands.",
    label: "Bags & luggage",
    band: "bg-[#6d28d9]",
    text: "text-white",
    photos: [
      { file: "bag-handbag", label: "Handbags" },
      { file: "bag-backpack", label: "Backpacks" },
      { file: "bag-tote", label: "Totes" },
      { file: "bag-luggage", label: "Luggage" },
    ],
  },
  {
    name: "Accessories",
    slug: "accessories",
    seoTitle: "Wholesale Fashion Accessories",
    seoDescription:
      "Wholesale fashion accessories: watches, sunglasses, belts, caps, scarves and jewellery for retailers, direct from brands.",
    label: "Accessories",
    band: "bg-[#7c4a1e]",
    text: "text-white",
    photos: [
      { file: "acc-watch", label: "Watches" },
      { file: "acc-sunglasses", label: "Sunglasses" },
      { file: "acc-scarf", label: "Scarves" },
      { file: "acc-jewellery", label: "Jewellery" },
    ],
  },
  {
    name: "Innerwear & Sleepwear",
    slug: "innerwear-sleepwear",
    seoTitle: "Wholesale Innerwear & Sleepwear",
    seoDescription:
      "Wholesale innerwear and sleepwear for stores: night suits, pyjama sets, camisoles, briefs and shapewear direct from brands.",
    label: "Innerwear & sleepwear",
    band: "bg-[#be185d]",
    text: "text-white",
    photos: [
      { file: "inner-sleepwear", label: "Sleepwear" },
      { file: "women-nightwear", label: "Nightwear" },
      { file: "inner-vests", label: "Camisoles" },
      { file: "inner-briefs", label: "Briefs" },
    ],
  },
  {
    name: "Maternity & Plus Size",
    slug: "maternity-plus-size",
    seoTitle: "Wholesale Maternity & Plus Size",
    seoDescription:
      "Wholesale maternity and plus size clothing for retailers: maternity dresses, nursing wear and plus size tops and denim.",
    label: "Maternity & plus size",
    band: "bg-[#9d174d]",
    text: "text-white",
    photos: [
      { file: "maternity-dress", label: "Maternity" },
      { file: "plus-dress", label: "Plus dresses" },
      { file: "maternity-nursing", label: "Nursing" },
      { file: "plus-top", label: "Plus tops" },
    ],
  },
  {
    name: "Uniforms & Workwear",
    slug: "uniforms-workwear",
    seoTitle: "Wholesale Uniforms & Workwear",
    seoDescription:
      "Bulk uniforms and workwear: corporate polos, school uniforms, chef coats, scrubs and safety vests made to order by brands.",
    label: "Uniforms & workwear",
    band: "bg-[#1e3a8a]",
    text: "text-white",
    photos: [
      { file: "uniform-corporate", label: "Corporate" },
      { file: "uniform-hospitality", label: "Hospitality" },
      { file: "uniform-healthcare", label: "Healthcare" },
      { file: "uniform-industrial", label: "Industrial" },
    ],
  },
  {
    name: "Home & Lifestyle",
    slug: "home-textiles",
    seoTitle: "Wholesale Home Textiles",
    seoDescription:
      "Wholesale home textiles for retailers: bed linen, bath towels, cushion covers, curtains and robes direct from brands.",
    label: "Lifestyle & home textiles",
    band: "bg-[#4338ca]",
    text: "text-white",
    photos: [
      { file: "home-bedlinen", label: "Bed linen" },
      { file: "home-towels", label: "Towels" },
      { file: "home-cushions", label: "Cushions" },
      { file: "home-robes", label: "Robes" },
    ],
  },
];

export function departmentBySlug(slug: string): Department | undefined {
  return departments.find((d) => d.slug === slug);
}

export function departmentHref(name: string): string {
  const d = departments.find((x) => x.name === name);
  return d ? `/wholesale/${d.slug}` : `/collections?category=${encodeURIComponent(name)}`;
}
