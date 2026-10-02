import { isAgentRequest } from "@/lib/agentAuth";
import { getDb, listApprovedCollections } from "@/lib/db";
import { guides } from "@/content/generated";

// Aggregate numbers for the marketing agent's reports and posts. Counts and
// public listing details only: no names, emails or phone numbers.
export const dynamic = "force-dynamic";

function count(sql: string, ...args: (string | number)[]): number {
  const row = getDb().prepare(sql).get(...args) as { n: number | null };
  return Number(row?.n ?? 0);
}

export async function GET(request: Request) {
  if (!isAgentRequest(request)) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const week = "datetime('now', '-7 days')";
  const roles = ["retailer", "brand", "manufacturer"] as const;
  const users = Object.fromEntries(
    roles.map((r) => [
      r,
      {
        total: count("SELECT COUNT(*) n FROM users WHERE role = ?", r),
        last7d: count(`SELECT COUNT(*) n FROM users WHERE role = ? AND created_at >= ${week}`, r),
        onboarded: count("SELECT COUNT(*) n FROM users WHERE role = ? AND onboarding IS NOT NULL", r),
      },
    ]),
  );

  const live = listApprovedCollections();
  const byDepartment: Record<string, number> = {};
  for (const c of live) byDepartment[c.category] = (byDepartment[c.category] ?? 0) + 1;

  const body = {
    generatedAt: new Date().toISOString(),
    users,
    collections: {
      live: live.length,
      pending: count("SELECT COUNT(*) n FROM collections WHERE status = 'pending'"),
      fromBrands: count("SELECT COUNT(*) n FROM collections WHERE status = 'approved' AND owner_user_id IS NOT NULL"),
      addedLast7d: count(`SELECT COUNT(*) n FROM collections WHERE created_at >= ${week}`),
      byDepartment,
    },
    suppliers: {
      live: count("SELECT COUNT(*) n FROM suppliers WHERE status = 'approved'"),
      pending: count("SELECT COUNT(*) n FROM suppliers WHERE status = 'pending'"),
    },
    orders: {
      total: count("SELECT COUNT(*) n FROM orders"),
      last7d: count(`SELECT COUNT(*) n FROM orders WHERE created_at >= ${week}`),
      paid: count("SELECT COUNT(*) n FROM orders WHERE status = 'paid'"),
      paidValueRupees: Math.round(
        count("SELECT SUM(total_amount_paise) n FROM orders WHERE status = 'paid'") / 100,
      ),
      paidValueLast7dRupees: Math.round(
        count(`SELECT SUM(total_amount_paise) n FROM orders WHERE status = 'paid' AND created_at >= ${week}`) / 100,
      ),
    },
    rfqs: {
      total: count("SELECT COUNT(*) n FROM rfqs"),
      last7d: count(`SELECT COUNT(*) n FROM rfqs WHERE created_at >= ${week}`),
    },
    guides: { published: guides.length, slugs: guides.map((g) => g.slug) },
    newestCollections: live.slice(0, 12).map((c) => ({
      slug: c.slug,
      name: c.name,
      brand: c.brand_name,
      category: c.category,
      priceRupees: c.price_paise / 100,
      moq: c.moq,
      image: c.image_path,
      url: `https://garmentbazaar.com/collections/${c.slug}`,
    })),
  };

  return Response.json(body, { headers: { "Cache-Control": "no-store" } });
}
