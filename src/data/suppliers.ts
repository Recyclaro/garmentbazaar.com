export type Category =
  | "Knitwear"
  | "Wovens"
  | "Denim"
  | "Activewear"
  | "Ethnic Wear"
  | "Accessories"
  | "Fabric & Textiles";

export type Region =
  | "Tamil Nadu"
  | "Punjab"
  | "Gujarat"
  | "Karnataka"
  | "Rajasthan"
  | "West Bengal"
  | "Delhi NCR"
  | "Uttar Pradesh"
  | "Maharashtra"
  | "Chhattisgarh"
  | "Haryana";

export type Certification = "GOTS" | "OEKO-TEX" | "WRAP" | "ISO 9001" | "Sedex";

export interface Supplier {
  slug: string;
  name: string;
  city: string;
  region: Region;
  category: Category;
  specialties: string[];
  moq: number | null;
  leadTimeDays: number | null;
  rating: number;
  reviews: number;
  certifications: Certification[];
  since: number | null;
  verified: boolean;
}

export const categories: Category[] = [
  "Knitwear",
  "Wovens",
  "Denim",
  "Activewear",
  "Ethnic Wear",
  "Accessories",
  "Fabric & Textiles",
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
  "Maharashtra",
  "Chhattisgarh",
  "Haryana",
];

export const certifications: Certification[] = [
  "GOTS",
  "OEKO-TEX",
  "WRAP",
  "ISO 9001",
  "Sedex",
];

/**
 * Seed data loaded into the database on first run (see src/lib/db.ts).
 * Once seeded, the database is the source of truth — editing this array
 * afterwards has no effect on an existing app.db.
 */
export const seedSuppliers: Supplier[] = [
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

/**
 * Real companies imported from a fabric/textile manufacturer directory
 * supplied by the site owner. These are seeded with status "pending" (see
 * src/lib/db.ts) — they do NOT appear on the public marketplace until an
 * admin reviews and approves them from /dashboard/admin. MOQ, lead time,
 * certifications, and ratings are deliberately left blank rather than
 * invented, since that data wasn't part of the source directory — the UI
 * shows "Contact for details" for anything left unset.
 */
export const pendingRealSuppliers: Supplier[] = [
  { slug: "beekalene-fabrics", name: "Beekalene Fabrics Private Ltd", city: "Mumbai", region: "Maharashtra", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bellflower-trading", name: "Bellflower Trading Co Pvt Ltd", city: "Dombivli", region: "Maharashtra", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bella-casa-fashion", name: "Bella Casa Fashion & Retail Ltd", city: "Jaipur", region: "Rajasthan", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "best-knitting-mills", name: "Best Knitting Mills Pvt Ltd", city: "Bhiwandi", region: "Maharashtra", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "best-processors", name: "Best Processors Private Limited", city: "Surat", region: "Gujarat", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "best-textiles-limited", name: "Best Textiles Limited", city: "New Delhi", region: "Delhi NCR", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bhagwati-arts", name: "Bhagwati Arts", city: "Mumbai", region: "Maharashtra", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bhagwati-impex", name: "Bhagwati Impex", city: "Jaipur", region: "Rajasthan", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bhagwati-knitfab", name: "Bhagwati Knitfab", city: "Halvad", region: "Gujarat", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bhagwati-tex-fab", name: "Bhagwati Tex Fab", city: "Surat", region: "Gujarat", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bhagwati-textiles", name: "Bhagwati Textiles", city: "Jaipur", region: "Rajasthan", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bhagyashri-creation", name: "Bhagyashri Creation", city: "Pune", region: "Maharashtra", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bhairav-poly-fab", name: "Bhairav Poly Fab", city: "Surat", region: "Gujarat", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bhakti-creation", name: "Bhakti Creation", city: "Surat", region: "Gujarat", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bhakti-fashion", name: "Bhakti Fashion", city: "Surat", region: "Gujarat", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bhakti-industries", name: "Bhakti Industries", city: "Mumbai", region: "Maharashtra", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bhakti-textiles", name: "Bhakti Textiles", city: "Surat", region: "Gujarat", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "sri-bhandari-impex", name: "Sri Bhandari Impex", city: "Tirupur", region: "Tamil Nadu", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bhandari-textiles", name: "Bhandari Textiles", city: "Surat", region: "Gujarat", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bharat-textile-sizing", name: "Bharat Textile & Sizing Co.", city: "Mumbai", region: "Maharashtra", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bhargav-textiled", name: "Bhargav Textiled", city: "Surat", region: "Gujarat", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bhavani-industries", name: "Bhavani Industries", city: "Bengaluru", region: "Karnataka", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bhavika-textiles", name: "Bhavika Textiles", city: "Surat", region: "Gujarat", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bhavna-fabrics", name: "Bhavna Fabrics", city: "Ghaziabad", region: "Uttar Pradesh", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bhavya-textiles", name: "Bhavya Textiles", city: "Surat", region: "Gujarat", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bhilosa-industries", name: "Bhilosa Industries Pvt. Ltd", city: "Silvassa", region: "Gujarat", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bhoomi-fashion", name: "Bhoomi Fashion Pvt. Ltd.", city: "Surat", region: "Gujarat", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bhowmik-dyeing", name: "Bhowmik Dyeing and Bleaching Private Limited", city: "Khamar", region: "West Bengal", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bijal-textiles", name: "Bijal Textiles", city: "Ahmedabad", region: "Gujarat", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bina-udyog", name: "Bina Udyog", city: "Kolkata", region: "West Bengal", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bindal-silk-mills", name: "Bindal Silk Mills Pvt Ltd", city: "Surat", region: "Gujarat", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bindiya-traders", name: "Bindiya Traders", city: "Jamnagar", region: "Gujarat", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "binit-dyes-chemical", name: "Binit Dyes & Chemical Pvt Ltd", city: "Ahmedabad", region: "Gujarat", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bir-horizons", name: "Bir Horizons", city: "Greater Noida", region: "Uttar Pradesh", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "birdy-exports", name: "Birdy Exports Private Limited", city: "Bengaluru", region: "Karnataka", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bks-textiles", name: "BKS Textiles Private Ltd", city: "Palladam, Tirupur", region: "Tamil Nadu", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bliss-impex", name: "Bliss Impex", city: "Gurugram", region: "Delhi NCR", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "sharadha-terry-products", name: "Sharadha Terry Products Ltd.", city: "Mettupalayam", region: "Tamil Nadu", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bobby-printers", name: "Bobby Printers", city: "Jalandhar", region: "Punjab", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bodycare-creations", name: "Bodycare Creations Limited", city: "Noida", region: "Delhi NCR", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "borana-filaments", name: "Borana Filaments Pvt. Ltd.", city: "Surat", region: "Gujarat", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "brahmani-exports", name: "Brahmani Exports", city: "Surat", region: "Gujarat", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "brahmani-silk-mill", name: "Brahmani Silk Mill", city: "Surat", region: "Gujarat", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "brightflexi-international", name: "Brightflexi International Pvt. Ltd", city: "Mangalore", region: "Karnataka", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "brij-and-co", name: "Brij & Co", city: "Delhi", region: "Delhi NCR", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bsbr-knit-fab", name: "Bsbr Knit Fab", city: "Panipat", region: "Haryana", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "cp-fabrics", name: "C.P. Fabrics", city: "Raipur", region: "Chhattisgarh", category: "Fabric & Textiles", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
];
