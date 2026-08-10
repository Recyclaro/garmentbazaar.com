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
  name: string;
  description: string;
  category: CollectionCategory;
  pricePaise: number;
  moq: number;
}
