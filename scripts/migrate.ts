/**
 * Deploy-time database setup. Runs automatically as part of `npm run build`
 * (see package.json's "build" script) so a non-technical founder never has
 * to run a database command by hand.
 *
 * - No DATABASE_URL (e.g. this sandbox, or a contributor's machine before
 *   they've set up a database): skip with a warning. The rest of the build
 *   still succeeds, since not every environment needs a live database.
 * - DATABASE_URL set: apply any SQL migration files under /drizzle that
 *   haven't run yet (drizzle tracks this itself in a `__drizzle_migrations`
 *   table it creates), then seed baseline data on an empty database.
 */
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { eq, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { users, suppliers } from "../src/lib/schema";
import {
  seedSuppliers,
  importedRealSuppliers,
  surplusSuppliers,
  tirupurManufacturers,
  type Supplier,
} from "../src/data/suppliers";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.warn(
      "[migrate] DATABASE_URL is not set — skipping database migration/seed. " +
        "Set it in your hosting provider's environment variables before going live.",
    );
    return;
  }

  const db = drizzle(new Pool({ connectionString: url }));

  console.log("[migrate] Applying schema migrations...");
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("[migrate] Schema is up to date.");

  const [{ count: supplierCount }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(suppliers);

  if (supplierCount === 0) {
    console.log("[migrate] Seeding supplier directory...");
    const rows = (
      [
        ...seedSuppliers.map((s) => ({ s, status: "approved" as const })),
        // Approved so they're visible on the marketplace, but each keeps
        // verified: false — no listing here has actually been vetted, so no
        // "Verified" badge is shown for any of them.
        ...importedRealSuppliers.map((s) => ({ s, status: "approved" as const })),
        ...surplusSuppliers.map((s) => ({ s, status: "approved" as const })),
        ...tirupurManufacturers.map((s) => ({ s, status: "approved" as const })),
      ] satisfies { s: Supplier; status: "approved" }[]
    ).map(({ s, status }) => ({
      slug: s.slug,
      ownerUserId: null,
      name: s.name,
      city: s.city,
      region: s.region,
      category: s.category,
      specialties: JSON.stringify(s.specialties),
      moq: s.moq,
      leadTimeDays: s.leadTimeDays,
      rating: s.rating,
      reviews: s.reviews,
      certifications: JSON.stringify(s.certifications),
      since: s.since,
      verified: s.verified,
      status,
    }));

    // Insert in batches — a single statement with 100+ value rows is fine for
    // Postgres, but chunking keeps any one request comfortably small over HTTP.
    const batchSize = 50;
    for (let i = 0; i < rows.length; i += batchSize) {
      await db.insert(suppliers).values(rows.slice(i, i + batchSize));
    }
    console.log(`[migrate] Seeded ${rows.length} suppliers.`);
  } else {
    console.log(`[migrate] Suppliers table already has ${supplierCount} rows — skipping seed.`);
  }

  const [existingAdmin] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.role, "admin"))
    .limit(1);

  if (!existingAdmin) {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const isProd = process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";

    if (isProd && (!password || password === "changeme123")) {
      throw new Error(
        "[migrate] Refusing to create the admin account with a missing or default " +
          "password in production. Set ADMIN_EMAIL and a real ADMIN_PASSWORD in your " +
          "hosting provider's environment variables, then redeploy.",
      );
    }

    const finalEmail = email || "admin@garmentbazaar.com";
    const finalPassword = password || "changeme123";
    const passwordHash = bcrypt.hashSync(finalPassword, 10);
    await db.insert(users).values({
      name: "GarmentBazaar Admin",
      email: finalEmail,
      passwordHash,
      role: "admin",
      companyName: "GarmentBazaar",
    });
    console.log(`[migrate] Created admin account (${finalEmail}).`);
  } else {
    console.log("[migrate] Admin account already exists — skipping.");
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
