import "server-only";
import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import bcrypt from "bcryptjs";
import {
  seedSuppliers,
  importedRealSuppliers,
  surplusSuppliers,
  tirupurManufacturers,
  type Category,
  type Region,
  type Supplier,
} from "@/data/suppliers";
import { seedCollections, type CollectionCategory } from "@/data/collections";

export type Role = "brand" | "manufacturer" | "retailer" | "admin";
export type ListingStatus = "pending" | "approved" | "rejected";
export type RfqStatus = "new" | "contacted" | "closed";
export type OrderStatus = "created" | "paid" | "failed" | "cancelled";

export interface UserRow {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: Role;
  company_name: string | null;
  created_at: string;
}

export interface SupplierRow {
  id: number;
  slug: string;
  owner_user_id: number | null;
  name: string;
  city: string;
  region: Region;
  category: Category;
  specialties: string; // JSON string
  moq: number | null;
  lead_time_days: number | null;
  rating: number;
  reviews: number;
  certifications: string; // JSON string
  since: number | null;
  verified: number; // 0 | 1
  status: ListingStatus;
  created_at: string;
}

export interface RfqRow {
  id: number;
  supplier_id: number | null;
  from_user_id: number | null;
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
  status: RfqStatus;
  created_at: string;
}

export interface CollectionRow {
  id: number;
  slug: string;
  owner_user_id: number | null;
  brand_name: string;
  name: string;
  description: string;
  category: CollectionCategory;
  price_paise: number;
  moq: number;
  image_path: string | null;
  status: ListingStatus;
  created_at: string;
}

export interface OrderRow {
  id: number;
  collection_id: number;
  retailer_user_id: number;
  quantity: number;
  unit_price_paise: number;
  total_amount_paise: number;
  status: OrderStatus;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  created_at: string;
}

declare global {
  var __gbDb: DatabaseSync | undefined;
}

function openDatabase(): DatabaseSync {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const db = new DatabaseSync(path.join(dataDir, "app.db"));
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('brand','manufacturer','retailer','admin')),
      company_name TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS suppliers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      owner_user_id INTEGER REFERENCES users(id),
      name TEXT NOT NULL,
      city TEXT NOT NULL,
      region TEXT NOT NULL,
      category TEXT NOT NULL,
      specialties TEXT NOT NULL,
      moq INTEGER,
      lead_time_days INTEGER,
      rating REAL NOT NULL DEFAULT 0,
      reviews INTEGER NOT NULL DEFAULT 0,
      certifications TEXT NOT NULL,
      since INTEGER,
      verified INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('pending','approved','rejected')),
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS rfqs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      supplier_id INTEGER REFERENCES suppliers(id),
      from_user_id INTEGER REFERENCES users(id),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT NOT NULL,
      role TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','closed')),
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS collections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      owner_user_id INTEGER REFERENCES users(id),
      brand_name TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      price_paise INTEGER NOT NULL,
      moq INTEGER NOT NULL,
      image_path TEXT,
      status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      collection_id INTEGER NOT NULL REFERENCES collections(id),
      retailer_user_id INTEGER NOT NULL REFERENCES users(id),
      quantity INTEGER NOT NULL,
      unit_price_paise INTEGER NOT NULL,
      total_amount_paise INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'created' CHECK (status IN ('created','paid','failed','cancelled')),
      razorpay_order_id TEXT,
      razorpay_payment_id TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  seedIfEmpty(db);
  return db;
}

function seedIfEmpty(db: DatabaseSync) {
  const supplierCount = db
    .prepare("SELECT COUNT(*) as count FROM suppliers")
    .get() as { count: number };

  if (supplierCount.count === 0) {
    const insert = db.prepare(`
      INSERT INTO suppliers
        (slug, owner_user_id, name, city, region, category, specialties, moq, lead_time_days, rating, reviews, certifications, since, verified, status)
      VALUES (?, NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const seedRow = (s: Supplier, status: ListingStatus) =>
      insert.run(
        s.slug,
        s.name,
        s.city,
        s.region,
        s.category,
        JSON.stringify(s.specialties),
        s.moq,
        s.leadTimeDays,
        s.rating,
        s.reviews,
        JSON.stringify(s.certifications),
        s.since,
        s.verified ? 1 : 0,
        status,
      );
    for (const s of seedSuppliers) seedRow(s, "approved");
    // Approved so they're visible on the marketplace, but each keeps
    // verified: false (see suppliers.ts) — no "Verified" badge is shown
    // since these companies haven't actually been vetted by anyone.
    for (const s of importedRealSuppliers) seedRow(s, "approved");
    for (const s of surplusSuppliers) seedRow(s, "approved");
    for (const s of tirupurManufacturers) seedRow(s, "approved");
  }

  const collectionCount = db
    .prepare("SELECT COUNT(*) as count FROM collections")
    .get() as { count: number };

  if (collectionCount.count === 0) {
    const insertCollection = db.prepare(`
      INSERT INTO collections
        (slug, owner_user_id, brand_name, name, description, category, price_paise, moq, status)
      VALUES (?, NULL, ?, ?, ?, ?, ?, ?, 'approved')
    `);
    // Original demo listings (see seedCollections in data/collections.ts) so
    // /collections isn't empty before real brands sign up — no owner, so
    // they can't be edited from any dashboard, same as the demo suppliers.
    for (const c of seedCollections) {
      insertCollection.run(
        c.slug,
        c.brandName,
        c.name,
        c.description,
        c.category,
        c.pricePaise,
        c.moq,
      );
    }
  }

  const adminCount = db
    .prepare("SELECT COUNT(*) as count FROM users WHERE role = 'admin'")
    .get() as { count: number };

  if (adminCount.count === 0) {
    const email = process.env.ADMIN_EMAIL || "admin@garmentbazaar.com";
    const password = process.env.ADMIN_PASSWORD || "changeme123";
    const passwordHash = bcrypt.hashSync(password, 10);
    db.prepare(
      `INSERT INTO users (name, email, password_hash, role, company_name) VALUES (?, ?, ?, 'admin', ?)`,
    ).run("GarmentBazaar Admin", email, passwordHash, "GarmentBazaar");
  }
}

export function getDb(): DatabaseSync {
  if (!global.__gbDb) {
    global.__gbDb = openDatabase();
  }
  return global.__gbDb;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function collectionRowToCollection(row: CollectionRow) {
  return {
    slug: row.slug,
    brandName: row.brand_name,
    name: row.name,
    description: row.description,
    category: row.category,
    pricePaise: row.price_paise,
    moq: row.moq,
    imagePath: row.image_path,
  };
}

export function supplierRowToSupplier(row: SupplierRow): Supplier {
  return {
    slug: row.slug,
    name: row.name,
    city: row.city,
    region: row.region,
    category: row.category,
    specialties: JSON.parse(row.specialties),
    moq: row.moq,
    leadTimeDays: row.lead_time_days,
    rating: row.rating,
    reviews: row.reviews,
    certifications: JSON.parse(row.certifications),
    since: row.since,
    verified: row.verified === 1,
  };
}

// --- Users ---

export function getUserByEmail(email: string): UserRow | undefined {
  return getDb()
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email.toLowerCase()) as UserRow | undefined;
}

export function getUserById(id: number): UserRow | undefined {
  return getDb().prepare("SELECT * FROM users WHERE id = ?").get(id) as
    | UserRow
    | undefined;
}

export function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  companyName: string;
}): number {
  const result = getDb()
    .prepare(
      `INSERT INTO users (name, email, password_hash, role, company_name) VALUES (?, ?, ?, ?, ?)`,
    )
    .run(
      input.name,
      input.email.toLowerCase(),
      input.passwordHash,
      input.role,
      input.companyName,
    );
  return Number(result.lastInsertRowid);
}

// --- Suppliers ---

export function listApprovedSuppliers(): SupplierRow[] {
  return getDb()
    .prepare("SELECT * FROM suppliers WHERE status = 'approved' ORDER BY rating DESC")
    .all() as unknown as SupplierRow[];
}

export function getSupplierBySlug(slug: string): SupplierRow | undefined {
  return getDb().prepare("SELECT * FROM suppliers WHERE slug = ?").get(slug) as
    | SupplierRow
    | undefined;
}

export function listSuppliersByOwner(ownerUserId: number): SupplierRow[] {
  return getDb()
    .prepare("SELECT * FROM suppliers WHERE owner_user_id = ? ORDER BY created_at DESC")
    .all(ownerUserId) as unknown as SupplierRow[];
}

export function listPendingSuppliers(): SupplierRow[] {
  return getDb()
    .prepare("SELECT * FROM suppliers WHERE status = 'pending' ORDER BY created_at ASC")
    .all() as unknown as SupplierRow[];
}

export interface ListingInput {
  name: string;
  city: string;
  region: Region;
  category: Category;
  specialties: string[];
  moq: number;
  leadTimeDays: number;
  certifications: string[];
  since: number;
}

export function createListing(ownerUserId: number, input: ListingInput): string {
  const db = getDb();
  let slug = slugify(input.name);
  if (getSupplierBySlug(slug)) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }
  db.prepare(
    `INSERT INTO suppliers
      (slug, owner_user_id, name, city, region, category, specialties, moq, lead_time_days, rating, reviews, certifications, since, verified, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, ?, ?, 0, 'pending')`,
  ).run(
    slug,
    ownerUserId,
    input.name,
    input.city,
    input.region,
    input.category,
    JSON.stringify(input.specialties),
    input.moq,
    input.leadTimeDays,
    JSON.stringify(input.certifications),
    input.since,
  );
  return slug;
}

export function updateListing(
  id: number,
  ownerUserId: number,
  input: ListingInput,
): boolean {
  const result = getDb()
    .prepare(
      `UPDATE suppliers SET
        name = ?, city = ?, region = ?, category = ?, specialties = ?,
        moq = ?, lead_time_days = ?, certifications = ?, since = ?, status = 'pending', verified = 0
       WHERE id = ? AND owner_user_id = ?`,
    )
    .run(
      input.name,
      input.city,
      input.region,
      input.category,
      JSON.stringify(input.specialties),
      input.moq,
      input.leadTimeDays,
      JSON.stringify(input.certifications),
      input.since,
      id,
      ownerUserId,
    );
  return result.changes > 0;
}

export function deleteListing(id: number, ownerUserId: number): boolean {
  const result = getDb()
    .prepare("DELETE FROM suppliers WHERE id = ? AND owner_user_id = ?")
    .run(id, ownerUserId);
  return result.changes > 0;
}

export function setListingStatus(id: number, status: ListingStatus): void {
  getDb()
    .prepare(
      "UPDATE suppliers SET status = ?, verified = ? WHERE id = ?",
    )
    .run(status, status === "approved" ? 1 : 0, id);
}

// --- RFQs ---

export interface RfqInput {
  supplierId: number | null;
  fromUserId: number | null;
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
}

export function createRfq(input: RfqInput): number {
  const result = getDb()
    .prepare(
      `INSERT INTO rfqs (supplier_id, from_user_id, name, email, company, role, message)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      input.supplierId,
      input.fromUserId,
      input.name,
      input.email,
      input.company,
      input.role,
      input.message,
    );
  return Number(result.lastInsertRowid);
}

export function listRfqsForSupplierOwner(ownerUserId: number): (RfqRow & {
  supplier_name: string | null;
})[] {
  return getDb()
    .prepare(
      `SELECT rfqs.*, suppliers.name as supplier_name
       FROM rfqs
       JOIN suppliers ON suppliers.id = rfqs.supplier_id
       WHERE suppliers.owner_user_id = ?
       ORDER BY rfqs.created_at DESC`,
    )
    .all(ownerUserId) as unknown as (RfqRow & { supplier_name: string | null })[];
}

export function listRfqsFromUser(fromUserId: number): (RfqRow & {
  supplier_name: string | null;
})[] {
  return getDb()
    .prepare(
      `SELECT rfqs.*, suppliers.name as supplier_name
       FROM rfqs
       LEFT JOIN suppliers ON suppliers.id = rfqs.supplier_id
       WHERE rfqs.from_user_id = ?
       ORDER BY rfqs.created_at DESC`,
    )
    .all(fromUserId) as unknown as (RfqRow & { supplier_name: string | null })[];
}

export function listAllRfqs(): (RfqRow & { supplier_name: string | null })[] {
  return getDb()
    .prepare(
      `SELECT rfqs.*, suppliers.name as supplier_name
       FROM rfqs
       LEFT JOIN suppliers ON suppliers.id = rfqs.supplier_id
       ORDER BY rfqs.created_at DESC`,
    )
    .all() as unknown as (RfqRow & { supplier_name: string | null })[];
}

// --- Collections ---

export interface CollectionInput {
  name: string;
  description: string;
  category: CollectionCategory;
  pricePaise: number;
  moq: number;
  imagePath?: string | null;
}

export function listApprovedCollections(): CollectionRow[] {
  return getDb()
    .prepare("SELECT * FROM collections WHERE status = 'approved' ORDER BY created_at DESC")
    .all() as unknown as CollectionRow[];
}

export function getCollectionBySlug(slug: string): CollectionRow | undefined {
  return getDb().prepare("SELECT * FROM collections WHERE slug = ?").get(slug) as
    | CollectionRow
    | undefined;
}

export function listCollectionsByOwner(ownerUserId: number): CollectionRow[] {
  return getDb()
    .prepare("SELECT * FROM collections WHERE owner_user_id = ? ORDER BY created_at DESC")
    .all(ownerUserId) as unknown as CollectionRow[];
}

export function listPendingCollections(): CollectionRow[] {
  return getDb()
    .prepare("SELECT * FROM collections WHERE status = 'pending' ORDER BY created_at ASC")
    .all() as unknown as CollectionRow[];
}

export function createCollection(ownerUserId: number, input: CollectionInput): string {
  const db = getDb();
  const owner = getUserById(ownerUserId);
  const brandName = owner?.company_name || owner?.name || "Unnamed Brand";

  let slug = slugify(input.name);
  if (getCollectionBySlug(slug)) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }
  db.prepare(
    `INSERT INTO collections
      (slug, owner_user_id, brand_name, name, description, category, price_paise, moq, image_path, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
  ).run(
    slug,
    ownerUserId,
    brandName,
    input.name,
    input.description,
    input.category,
    input.pricePaise,
    input.moq,
    input.imagePath ?? null,
  );
  return slug;
}

export function updateCollection(
  id: number,
  ownerUserId: number,
  input: CollectionInput,
): boolean {
  const result = getDb()
    .prepare(
      `UPDATE collections SET
        name = ?, description = ?, category = ?, price_paise = ?, moq = ?,
        image_path = COALESCE(?, image_path), status = 'pending'
       WHERE id = ? AND owner_user_id = ?`,
    )
    .run(
      input.name,
      input.description,
      input.category,
      input.pricePaise,
      input.moq,
      input.imagePath ?? null,
      id,
      ownerUserId,
    );
  return result.changes > 0;
}

export function deleteCollection(id: number, ownerUserId: number): boolean {
  const result = getDb()
    .prepare("DELETE FROM collections WHERE id = ? AND owner_user_id = ?")
    .run(id, ownerUserId);
  return result.changes > 0;
}

export function setCollectionStatus(id: number, status: ListingStatus): void {
  getDb().prepare("UPDATE collections SET status = ? WHERE id = ?").run(status, id);
}

// --- Orders ---

export interface OrderInput {
  collectionId: number;
  retailerUserId: number;
  quantity: number;
  unitPricePaise: number;
  totalAmountPaise: number;
  razorpayOrderId: string;
}

export function createOrder(input: OrderInput): number {
  const result = getDb()
    .prepare(
      `INSERT INTO orders
        (collection_id, retailer_user_id, quantity, unit_price_paise, total_amount_paise, status, razorpay_order_id)
       VALUES (?, ?, ?, ?, ?, 'created', ?)`,
    )
    .run(
      input.collectionId,
      input.retailerUserId,
      input.quantity,
      input.unitPricePaise,
      input.totalAmountPaise,
      input.razorpayOrderId,
    );
  return Number(result.lastInsertRowid);
}

export function getOrderById(id: number): OrderRow | undefined {
  return getDb().prepare("SELECT * FROM orders WHERE id = ?").get(id) as
    | OrderRow
    | undefined;
}

export function setOrderPaymentResult(
  id: number,
  status: OrderStatus,
  razorpayPaymentId: string | null,
): void {
  getDb()
    .prepare("UPDATE orders SET status = ?, razorpay_payment_id = ? WHERE id = ?")
    .run(status, razorpayPaymentId, id);
}

export function listOrdersForCollectionOwner(
  ownerUserId: number,
): (OrderRow & { collection_name: string })[] {
  return getDb()
    .prepare(
      `SELECT orders.*, collections.name as collection_name
       FROM orders
       JOIN collections ON collections.id = orders.collection_id
       WHERE collections.owner_user_id = ?
       ORDER BY orders.created_at DESC`,
    )
    .all(ownerUserId) as unknown as (OrderRow & { collection_name: string })[];
}

export function listOrdersByRetailer(
  retailerUserId: number,
): (OrderRow & { collection_name: string })[] {
  return getDb()
    .prepare(
      `SELECT orders.*, collections.name as collection_name
       FROM orders
       JOIN collections ON collections.id = orders.collection_id
       WHERE orders.retailer_user_id = ?
       ORDER BY orders.created_at DESC`,
    )
    .all(retailerUserId) as unknown as (OrderRow & { collection_name: string })[];
}

export function listAllOrders(): (OrderRow & {
  collection_name: string;
  retailer_email: string;
})[] {
  return getDb()
    .prepare(
      `SELECT orders.*, collections.name as collection_name, users.email as retailer_email
       FROM orders
       JOIN collections ON collections.id = orders.collection_id
       JOIN users ON users.id = orders.retailer_user_id
       ORDER BY orders.created_at DESC`,
    )
    .all() as unknown as (OrderRow & { collection_name: string; retailer_email: string })[];
}
