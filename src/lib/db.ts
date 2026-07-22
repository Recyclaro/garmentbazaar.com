import "server-only";
import { Pool } from "pg";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq, and, desc, asc } from "drizzle-orm";
import { users, suppliers, rfqs } from "./schema";
import type { Category, Region, Supplier } from "@/data/suppliers";

export type Role = "brand" | "manufacturer" | "retailer" | "admin";
export type ListingStatus = "pending" | "approved" | "rejected";
export type RfqStatus = "new" | "contacted" | "closed";

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
  verified: number; // 0 | 1 — kept as 0/1 (not boolean) so callers written
  // against the old SQLite-backed shape don't need to change.
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

declare global {
  var __gbDb: NodePgDatabase | undefined;
}

// Standard `pg` over TCP — works identically against any Postgres,
// including a plain local database (used for local development, since
// Neon's own HTTP-only driver can't talk to a non-Neon Postgres server).
// In production, point DATABASE_URL at Neon's *pooled* connection string
// (the one with "-pooler" in the hostname, shown in the Neon dashboard) —
// it's backed by PgBouncer, which is what keeps a small `max` pool per
// serverless instance from exhausting Postgres's real connection limit
// once many instances are running at once.
function getDb(): NodePgDatabase {
  if (!global.__gbDb) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        "DATABASE_URL is not set. Add it in your Vercel project's Environment " +
          "Variables (or .env.local for local development) — see .env.example.",
      );
    }
    global.__gbDb = drizzle(new Pool({ connectionString: url, max: 5 }));
  }
  return global.__gbDb;
}

function toRowUser(row: typeof users.$inferSelect): UserRow {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    password_hash: row.passwordHash,
    role: row.role as Role,
    company_name: row.companyName,
    created_at: row.createdAt.toISOString(),
  };
}

function toRowSupplier(row: typeof suppliers.$inferSelect): SupplierRow {
  return {
    id: row.id,
    slug: row.slug,
    owner_user_id: row.ownerUserId,
    name: row.name,
    city: row.city,
    region: row.region as Region,
    category: row.category as Category,
    specialties: row.specialties,
    moq: row.moq,
    lead_time_days: row.leadTimeDays,
    rating: row.rating,
    reviews: row.reviews,
    certifications: row.certifications,
    since: row.since,
    verified: row.verified ? 1 : 0,
    status: row.status as ListingStatus,
    created_at: row.createdAt.toISOString(),
  };
}

function toRowRfq(row: typeof rfqs.$inferSelect): RfqRow {
  return {
    id: row.id,
    supplier_id: row.supplierId,
    from_user_id: row.fromUserId,
    name: row.name,
    email: row.email,
    company: row.company,
    role: row.role,
    message: row.message,
    status: row.status as RfqStatus,
    created_at: row.createdAt.toISOString(),
  };
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
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

export async function getUserByEmail(email: string): Promise<UserRow | undefined> {
  const rows = await getDb()
    .select()
    .from(users)
    .where(eq(users.email, email.toLowerCase()))
    .limit(1);
  return rows[0] ? toRowUser(rows[0]) : undefined;
}

export async function getUserById(id: number): Promise<UserRow | undefined> {
  const rows = await getDb().select().from(users).where(eq(users.id, id)).limit(1);
  return rows[0] ? toRowUser(rows[0]) : undefined;
}

export async function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  companyName: string;
}): Promise<number> {
  const rows = await getDb()
    .insert(users)
    .values({
      name: input.name,
      email: input.email.toLowerCase(),
      passwordHash: input.passwordHash,
      role: input.role,
      companyName: input.companyName,
    })
    .returning({ id: users.id });
  return rows[0].id;
}

// --- Suppliers ---

export async function listApprovedSuppliers(): Promise<SupplierRow[]> {
  const rows = await getDb()
    .select()
    .from(suppliers)
    .where(eq(suppliers.status, "approved"))
    .orderBy(desc(suppliers.rating));
  return rows.map(toRowSupplier);
}

export async function getSupplierBySlug(slug: string): Promise<SupplierRow | undefined> {
  const rows = await getDb()
    .select()
    .from(suppliers)
    .where(eq(suppliers.slug, slug))
    .limit(1);
  return rows[0] ? toRowSupplier(rows[0]) : undefined;
}

export async function listSuppliersByOwner(ownerUserId: number): Promise<SupplierRow[]> {
  const rows = await getDb()
    .select()
    .from(suppliers)
    .where(eq(suppliers.ownerUserId, ownerUserId))
    .orderBy(desc(suppliers.createdAt));
  return rows.map(toRowSupplier);
}

export async function listPendingSuppliers(): Promise<SupplierRow[]> {
  const rows = await getDb()
    .select()
    .from(suppliers)
    .where(eq(suppliers.status, "pending"))
    .orderBy(asc(suppliers.createdAt));
  return rows.map(toRowSupplier);
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

export async function createListing(
  ownerUserId: number,
  input: ListingInput,
): Promise<string> {
  let slug = slugify(input.name);
  if (await getSupplierBySlug(slug)) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }
  await getDb().insert(suppliers).values({
    slug,
    ownerUserId,
    name: input.name,
    city: input.city,
    region: input.region,
    category: input.category,
    specialties: JSON.stringify(input.specialties),
    moq: input.moq,
    leadTimeDays: input.leadTimeDays,
    rating: 0,
    reviews: 0,
    certifications: JSON.stringify(input.certifications),
    since: input.since,
    verified: false,
    status: "pending",
  });
  return slug;
}

export async function updateListing(
  id: number,
  ownerUserId: number,
  input: ListingInput,
): Promise<boolean> {
  const result = await getDb()
    .update(suppliers)
    .set({
      name: input.name,
      city: input.city,
      region: input.region,
      category: input.category,
      specialties: JSON.stringify(input.specialties),
      moq: input.moq,
      leadTimeDays: input.leadTimeDays,
      certifications: JSON.stringify(input.certifications),
      since: input.since,
      status: "pending",
      verified: false,
    })
    .where(and(eq(suppliers.id, id), eq(suppliers.ownerUserId, ownerUserId)))
    .returning({ id: suppliers.id });
  return result.length > 0;
}

export async function deleteListing(id: number, ownerUserId: number): Promise<boolean> {
  const result = await getDb()
    .delete(suppliers)
    .where(and(eq(suppliers.id, id), eq(suppliers.ownerUserId, ownerUserId)))
    .returning({ id: suppliers.id });
  return result.length > 0;
}

export async function setListingStatus(id: number, status: ListingStatus): Promise<void> {
  await getDb()
    .update(suppliers)
    .set({ status, verified: status === "approved" })
    .where(eq(suppliers.id, id));
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

export async function createRfq(input: RfqInput): Promise<number> {
  const rows = await getDb()
    .insert(rfqs)
    .values({
      supplierId: input.supplierId,
      fromUserId: input.fromUserId,
      name: input.name,
      email: input.email,
      company: input.company,
      role: input.role,
      message: input.message,
    })
    .returning({ id: rfqs.id });
  return rows[0].id;
}

export async function listRfqsForSupplierOwner(
  ownerUserId: number,
): Promise<(RfqRow & { supplier_name: string | null })[]> {
  const rows = await getDb()
    .select({ rfq: rfqs, supplierName: suppliers.name })
    .from(rfqs)
    .innerJoin(suppliers, eq(suppliers.id, rfqs.supplierId))
    .where(eq(suppliers.ownerUserId, ownerUserId))
    .orderBy(desc(rfqs.createdAt));
  return rows.map((r) => ({ ...toRowRfq(r.rfq), supplier_name: r.supplierName }));
}

export async function listRfqsFromUser(
  fromUserId: number,
): Promise<(RfqRow & { supplier_name: string | null })[]> {
  const rows = await getDb()
    .select({ rfq: rfqs, supplierName: suppliers.name })
    .from(rfqs)
    .leftJoin(suppliers, eq(suppliers.id, rfqs.supplierId))
    .where(eq(rfqs.fromUserId, fromUserId))
    .orderBy(desc(rfqs.createdAt));
  return rows.map((r) => ({ ...toRowRfq(r.rfq), supplier_name: r.supplierName ?? null }));
}

export async function listAllRfqs(): Promise<
  (RfqRow & { supplier_name: string | null })[]
> {
  const rows = await getDb()
    .select({ rfq: rfqs, supplierName: suppliers.name })
    .from(rfqs)
    .leftJoin(suppliers, eq(suppliers.id, rfqs.supplierId))
    .orderBy(desc(rfqs.createdAt));
  return rows.map((r) => ({ ...toRowRfq(r.rfq), supplier_name: r.supplierName ?? null }));
}
