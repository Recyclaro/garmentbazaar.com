export type Category =
  | "Knitwear"
  | "Wovens"
  | "Denim"
  | "Activewear"
  | "Ethnic Wear"
  | "Accessories";

export type Region =
  | "Tamil Nadu"
  | "Punjab"
  | "Gujarat"
  | "Karnataka"
  | "Rajasthan"
  | "West Bengal"
  | "Delhi NCR"
  | "Uttar Pradesh";

export type Certification = "GOTS" | "OEKO-TEX" | "WRAP" | "ISO 9001" | "Sedex";

export interface Supplier {
  slug: string;
  name: string;
  city: string;
  region: Region;
  category: Category;
  specialties: string[];
  moq: number;
  leadTimeDays: number;
  rating: number;
  reviews: number;
  certifications: Certification[];
  since: number;
  verified: boolean;
}

export const categories: Category[] = [
  "Knitwear",
  "Wovens",
  "Denim",
  "Activewear",
  "Ethnic Wear",
  "Accessories",
];

export const regions: Region[] = [
  "Tamil Nadu",
  "Punjab",
  "Gujarat",
  "Karnataka",
  "Rajasthan",
  "West Bengal",
  "Delhi NCR",
  "Uttar Pradesh",
];

export const certifications: Certification[] = [
  "GOTS",
  "OEKO-TEX",
  "WRAP",
  "ISO 9001",
  "Sedex",
];

export const suppliers: Supplier[] = [
  {
    slug: "shree-textile-mills",
    name: "Shree Textile Mills",
    city: "Tiruppur",
    region: "Tamil Nadu",
    category: "Knitwear",
    specialties: ["Jersey", "French Terry", "Fleece"],
    moq: 300,
    leadTimeDays: 18,
    rating: 4.8,
    reviews: 142,
    certifications: ["GOTS", "OEKO-TEX"],
    since: 2005,
    verified: true,
  },
  {
    slug: "bluepeak-denim-works",
    name: "Bluepeak Denim Works",
    city: "Ludhiana",
    region: "Punjab",
    category: "Denim",
    specialties: ["Selvedge Denim", "Stretch Denim"],
    moq: 500,
    leadTimeDays: 25,
    rating: 4.6,
    reviews: 98,
    certifications: ["WRAP"],
    since: 1998,
    verified: true,
  },
  {
    slug: "coastal-wovens-co",
    name: "Coastal Wovens Co.",
    city: "Surat",
    region: "Gujarat",
    category: "Wovens",
    specialties: ["Poplin", "Chambray", "Twill"],
    moq: 400,
    leadTimeDays: 20,
    rating: 4.7,
    reviews: 115,
    certifications: ["ISO 9001", "OEKO-TEX"],
    since: 2010,
    verified: true,
  },
  {
    slug: "vantage-activewear",
    name: "Vantage Activewear",
    city: "Bengaluru",
    region: "Karnataka",
    category: "Activewear",
    specialties: ["Compression Wear", "Moisture-Wicking"],
    moq: 250,
    leadTimeDays: 15,
    rating: 4.9,
    reviews: 176,
    certifications: ["GOTS", "Sedex"],
    since: 2014,
    verified: true,
  },
  {
    slug: "sunrise-ethnic-crafts",
    name: "Sunrise Ethnic Crafts",
    city: "Jaipur",
    region: "Rajasthan",
    category: "Ethnic Wear",
    specialties: ["Block Print", "Embroidery"],
    moq: 150,
    leadTimeDays: 22,
    rating: 4.5,
    reviews: 67,
    certifications: ["Sedex"],
    since: 2001,
    verified: false,
  },
  {
    slug: "rosewood-accessories",
    name: "Rosewood Accessories",
    city: "Kolkata",
    region: "West Bengal",
    category: "Accessories",
    specialties: ["Belts", "Bags", "Leather Goods"],
    moq: 200,
    leadTimeDays: 12,
    rating: 4.4,
    reviews: 54,
    certifications: ["ISO 9001"],
    since: 2008,
    verified: false,
  },
  {
    slug: "northgate-knits",
    name: "Northgate Knits",
    city: "Tiruppur",
    region: "Tamil Nadu",
    category: "Knitwear",
    specialties: ["Ribbed Knit", "Interlock"],
    moq: 350,
    leadTimeDays: 19,
    rating: 4.6,
    reviews: 89,
    certifications: ["OEKO-TEX"],
    since: 2012,
    verified: true,
  },
  {
    slug: "meridian-textiles",
    name: "Meridian Textiles",
    city: "Ahmedabad",
    region: "Gujarat",
    category: "Wovens",
    specialties: ["Yarn Dye", "Finishing"],
    moq: 600,
    leadTimeDays: 28,
    rating: 4.3,
    reviews: 41,
    certifications: ["WRAP", "ISO 9001"],
    since: 1995,
    verified: false,
  },
  {
    slug: "silverline-garments",
    name: "Silverline Garments",
    city: "Noida",
    region: "Delhi NCR",
    category: "Activewear",
    specialties: ["Performance Fabric", "Seamless Knit"],
    moq: 300,
    leadTimeDays: 16,
    rating: 4.7,
    reviews: 103,
    certifications: ["GOTS"],
    since: 2016,
    verified: true,
  },
  {
    slug: "highline-denim-co",
    name: "Highline Denim Co.",
    city: "Ludhiana",
    region: "Punjab",
    category: "Denim",
    specialties: ["Raw Denim", "Washed Denim"],
    moq: 450,
    leadTimeDays: 24,
    rating: 4.5,
    reviews: 72,
    certifications: ["OEKO-TEX", "Sedex"],
    since: 2003,
    verified: true,
  },
  {
    slug: "ganga-apparel-exports",
    name: "Ganga Apparel Exports",
    city: "Kanpur",
    region: "Uttar Pradesh",
    category: "Ethnic Wear",
    specialties: ["Kurta Sets", "Handloom"],
    moq: 200,
    leadTimeDays: 21,
    rating: 4.2,
    reviews: 38,
    certifications: ["ISO 9001"],
    since: 1990,
    verified: false,
  },
  {
    slug: "coral-bay-accessories",
    name: "Coral Bay Accessories",
    city: "Chennai",
    region: "Tamil Nadu",
    category: "Accessories",
    specialties: ["Caps", "Scarves", "Bags"],
    moq: 250,
    leadTimeDays: 14,
    rating: 4.8,
    reviews: 121,
    certifications: ["GOTS", "OEKO-TEX"],
    since: 2011,
    verified: true,
  },
];
