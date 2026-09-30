import type { CollectionCategory } from "@/data/collections";

// Department colours and sample photos, in the style of the product sheet.
// Each band colour holds white text at 4.5:1 or better, except Kidswear,
// which uses dark text on yellow.
export interface Department {
  name: CollectionCategory;
  label: string;
  band: string;
  text: string;
  photos: { file: string; label: string }[];
}

export const departments: Department[] = [
  {
    name: "Menswear",
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
