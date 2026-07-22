import {
  pgTable,
  serial,
  text,
  integer,
  real,
  boolean,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

// Role/status values are enforced with Postgres CHECK constraints (see the
// matching SQL in scripts/migrate.mjs) rather than pg enums, so adding a new
// role or status later is a one-line change instead of an enum migration.

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull(), // 'brand' | 'manufacturer' | 'retailer' | 'admin'
  companyName: text("company_name"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const suppliers = pgTable(
  "suppliers",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    ownerUserId: integer("owner_user_id").references(() => users.id),
    name: text("name").notNull(),
    city: text("city").notNull(),
    region: text("region").notNull(),
    category: text("category").notNull(),
    specialties: text("specialties").notNull(), // JSON string
    moq: integer("moq"),
    leadTimeDays: integer("lead_time_days"),
    rating: real("rating").notNull().default(0),
    reviews: integer("reviews").notNull().default(0),
    certifications: text("certifications").notNull(), // JSON string
    since: integer("since"),
    verified: boolean("verified").notNull().default(false),
    status: text("status").notNull().default("approved"), // 'pending' | 'approved' | 'rejected'
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("suppliers_status_idx").on(table.status),
    index("suppliers_owner_idx").on(table.ownerUserId),
  ],
);

export const rfqs = pgTable(
  "rfqs",
  {
    id: serial("id").primaryKey(),
    supplierId: integer("supplier_id").references(() => suppliers.id),
    fromUserId: integer("from_user_id").references(() => users.id),
    name: text("name").notNull(),
    email: text("email").notNull(),
    company: text("company").notNull(),
    role: text("role").notNull(),
    message: text("message").notNull(),
    status: text("status").notNull().default("new"), // 'new' | 'contacted' | 'closed'
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("rfqs_supplier_idx").on(table.supplierId)],
);
