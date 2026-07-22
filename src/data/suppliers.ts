export type Category =
  | "Knitwear"
  | "Wovens"
  | "Denim"
  | "Activewear"
  | "Ethnic Wear"
  | "Accessories"
  | "Fabric & Textiles"
  | "Surplus & Overstock";

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
  "Surplus & Overstock",
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
 * supplied by the site owner. Seeded as "approved" (see src/lib/db.ts) so
 * they're visible on the public marketplace, but each keeps
 * `verified: false` — no listing here has actually been vetted, so no
 * "Verified" badge is shown for any of them. MOQ, lead time,
 * certifications, and ratings are deliberately left blank rather than
 * invented, since that data wasn't part of the source directory — the UI
 * shows "Contact for details" for anything left unset.
 */
export const importedRealSuppliers: Supplier[] = [
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

/**
 * Real surplus/export-surplus garment dealers, supplied by the site owner
 * from a "trusted surplus suppliers" reference sheet. Seeded as "approved"
 * (see src/lib/db.ts) so they're visible on the marketplace, with
 * `verified: false` since none of these have actually been vetted by
 * GarmentBazaar. Specialties are carried over from the source sheet where
 * it named them; MOQ, lead time, and ratings weren't part of the source so
 * they're left blank rather than invented.
 */
export const surplusSuppliers: Supplier[] = [
  { slug: "jumpcuts", name: "JumpCuts", city: "Pollachi", region: "Tamil Nadu", category: "Surplus & Overstock", specialties: ["Men's wear", "T-shirts", "Jeans", "Branded Trousers", "Formal & Casual Shirts"], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "export-surplus-clothing", name: "Export Surplus Clothing", city: "Tiruppur", region: "Tamil Nadu", category: "Surplus & Overstock", specialties: ["Branded surplus garments for men, women & kids"], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "paapi-creations", name: "PaaPi Creations", city: "Tirupur", region: "Tamil Nadu", category: "Surplus & Overstock", specialties: ["Export surplus T-shirts", "Polo T-shirts", "Hoodies", "Sweatshirts"], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "jaipur-export-surplus", name: "Jaipur Export Surplus", city: "Jaipur", region: "Rajasthan", category: "Surplus & Overstock", specialties: ["Branded & exclusive readymade garments"], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "tirupur-garment", name: "Tirupur Garment", city: "Tirupur", region: "Tamil Nadu", category: "Surplus & Overstock", specialties: ["T-shirts", "Jeans", "Trousers", "Polo", "Shirts"], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "rack37-innotech", name: "Rack37 Innotech Pvt Ltd", city: "Delhi", region: "Delhi NCR", category: "Surplus & Overstock", specialties: ["Mixed garment lots", "Men's & women's wear", "Kids wear", "Accessories"], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "shaaraa-clothing", name: "Shaaraa Clothing", city: "Tirupur", region: "Tamil Nadu", category: "Surplus & Overstock", specialties: ["Cotton knitted girls' inner garments", "Kids' wear"], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "kushwaha-group-of-company", name: "Kushwaha Group Of Company", city: "Ludhiana", region: "Punjab", category: "Surplus & Overstock", specialties: ["Men's & women's wear"], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "magic-touch", name: "Magic Touch", city: "Chennai", region: "Tamil Nadu", category: "Surplus & Overstock", specialties: ["Crop tops", "Bodycon dresses", "Jeans", "Cargo", "Sportswear"], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "shah-fashion", name: "Shah Fashion", city: "Bangalore", region: "Karnataka", category: "Surplus & Overstock", specialties: ["Men's wear", "Ladies' wear", "Kids' wear"], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
];

/**
 * Real Tirupur-based knitwear/apparel manufacturers, supplied by the site
 * owner from a Tirupur manufacturing directory (Google-Maps-style listing
 * data). Seeded as "approved" (see src/lib/db.ts) so they're visible on the
 * marketplace, with `verified: false` since none of these have actually
 * been vetted by GarmentBazaar. The source data didn't reliably break out
 * per-company specialties, MOQ, lead time, or ratings, so those are left
 * blank rather than invented. A handful of entries from the source sheet
 * were dropped: duplicates, listings with no real company name (a bare
 * "Garment Manufacturer" row), a site marked "under maintenance", a
 * physical market location rather than a business, and an Amazon storefront
 * redirect rather than a standalone manufacturer.
 */
export const tirupurManufacturers: Supplier[] = [
  { slug: "eastman-exports", name: "Eastman Exports", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "akr-industries", name: "AKR Industries Pvt Ltd", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "tirupur-knitwears-exports", name: "Tirupur Knitwears Exports", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "skl-exports", name: "S.K.L. Exports", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "checkers-fashion-india", name: "Checkers Fashion India", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "jjp-clothing", name: "J&JP Clothing Company", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "cr-garments", name: "C R Garments", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "tee-tops-t-shirts", name: "Tee Tops-T Shirts", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "varthagam-international", name: "Varthagam International", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "esplandea-international", name: "Esplandea International", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bs-apparel", name: "B S Apparel", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "srg-apparels", name: "SRG Apparels Limited", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "majestic-exports", name: "Majestic Exports", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "ajna-clothings", name: "Ajna Clothings", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "garment-mantra", name: "Garment Mantra", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "km-knitwear", name: "KM Knitwear Private Ltd", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "pivotaal-branding-solutions", name: "Pivotaal Branding Solutions", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "ss-fashions", name: "SS Fashions", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "mouriya-clothing", name: "Mouriya Clothing Company", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "essa-garments", name: "Essa Garments Pvt. Ltd", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "vogue-sourcing", name: "Vogue Sourcing", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "noble-clothing-company", name: "Noble Clothing Company", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "teemee-clothings", name: "Teemee Clothings", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "blue-knot-apparels", name: "Blue Knot Apparels", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "well-knit-industries", name: "Well Knit Industries", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "ar-apparel", name: "AR Apparel", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "le-shark-global", name: "Le Shark Global LLP", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "rajasri-export", name: "Rajasri Export", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "ss-enterprises", name: "S.S Enterprises", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "tom-hiddle", name: "Tom Hiddle", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "polestar-garments", name: "PoleStar Garments", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "stellar-clothing-company", name: "Stellar Clothing Company", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "taiwan-garments", name: "Taiwan Garments", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "tirupur-clothing", name: "Tirupur Clothing", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "thugger-clothing-company", name: "Thugger Clothing Company", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "ahill-apparel-exports", name: "Ahill Apparel Exports", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "esa-clothing-company", name: "Esa Clothing Company", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "grasim-apparel", name: "Grasim Apparel", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "unisource-trend-india", name: "Unisource Trend India", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "vishnu-clothing-company", name: "Vishnu Clothing Company", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "shakthi-knitting", name: "Shakthi Knitting", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "sri-sabari-tex", name: "Sri Sabari Tex", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "am-garments", name: "A.M. Garments", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "srinithi-garments", name: "Srinithi Garments", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "anton-india", name: "Anton India", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "ss-clothing-company", name: "S.S Clothing Company", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "cbc-fashions-asia", name: "CBC Fashions Asia Pvt Ltd", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "stem-apparels", name: "Stem Apparels", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "money-apparels", name: "Money Apparels", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "karpagam-garments", name: "Karpagam Garments", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "alpha-garments", name: "Alpha Garments", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "navakar-clothing", name: "Navakar Clothing Pvt Ltd", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "cs-garments", name: "C S Garments", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "karman-clothing", name: "Karman Clothing", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "happy-tex", name: "Happy Tex", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "vanavil-knits-fabs", name: "Vanavil Knits Fabs", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "karthik-exports", name: "Karthik Exports", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "texcraft", name: "Texcraft", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "royalpark-apparels", name: "RoyalPark Apparels", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "expoknits-international", name: "Expoknits International", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "cotton-fab-creation", name: "Cotton Fab Creation", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "ams-garments", name: "AMS Garments", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "supreme-fashions-india", name: "Supreme Fashions India", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "j-tex", name: "J Tex", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "lakshan-garments", name: "Lakshan Garments", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "spencer-apparel", name: "Spencer Apparel Inc.", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "kr-creation", name: "KR Creation", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "bestitch-knits", name: "Bestitch Knits", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "skymoon-apparel", name: "Skymoon Apparel", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "victorian-group", name: "Victorian Group Of Companies", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "zeemax-impex", name: "Zeemax Impex", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "kc-apparels", name: "KC Apparels", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "skystreet-fashion", name: "Skystreet Fashion", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "lango-garments", name: "Lango Garments", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "rr-impex", name: "R.R. Impex", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "nda-apparels", name: "NDA Apparels", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "eefil-sourcing", name: "Eefil Sourcing", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "om-sakthi-garments", name: "Om Sakthi Garments", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "emef-clothing-company", name: "EMEF Clothing Company", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "gunja-textiles", name: "Gunja Textiles", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "five-elements-international", name: "Five Elements International", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "joy-kidswear", name: "Joy Kidswear", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "ins-clothing-company", name: "INS Clothing Company", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "velona-textiles", name: "Velona Textiles", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "universe-sourcing", name: "Universe Sourcing", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "sms-knits", name: "SMS Knits", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "khqs-international", name: "KHQS International", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "live-apparel", name: "Live Apparel", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "cresst-creations", name: "Cresst Creations Inc", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "heaven-looms", name: "Heaven Looms", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "texpro-apparel", name: "Texpro Apparel", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
  { slug: "ss-clothing-mills", name: "SS Clothing Mills", city: "Tirupur", region: "Tamil Nadu", category: "Knitwear", specialties: [], moq: null, leadTimeDays: null, rating: 0, reviews: 0, certifications: [], since: null, verified: false },
];
