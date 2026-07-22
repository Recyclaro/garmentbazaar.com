import type { Config } from "drizzle-kit";

// Only used by `drizzle-kit generate` (offline — reads schema.ts, needs no
// database connection) when a developer changes src/lib/schema.ts and wants
// a new SQL migration file. Never run against a live database directly;
// scripts/migrate.mjs applies the generated files at deploy time.
export default {
  schema: "./src/lib/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
} satisfies Config;
