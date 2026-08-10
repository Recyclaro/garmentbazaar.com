import Link from "next/link";
import { requireRole } from "@/lib/dal";
import { listCollectionsByOwner, listOrdersForCollectionOwner } from "@/lib/db";
import { formatPaise } from "@/lib/currency";
import { IconArrowRight, IconCheck } from "@/components/Icons";

const statusStyles: Record<string, string> = {
  approved: "bg-green-50 text-green-700",
  pending: "bg-amber-50 text-amber-700",
  rejected: "bg-red-50 text-red-700",
};

const orderStatusStyles: Record<string, string> = {
  paid: "bg-green-50 text-green-700",
  created: "bg-amber-50 text-amber-700",
  failed: "bg-red-50 text-red-700",
  cancelled: "bg-slate-100 text-slate-500",
};

export default async function BrandDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string; updated?: string }>;
}) {
  const session = await requireRole("brand");
  const { created, updated } = await searchParams;
  const collections = listCollectionsByOwner(session.userId);
  const orders = listOrdersForCollectionOwner(session.userId);

  return (
    <div className="space-y-10">
      {(created || updated) && (
        <div className="flex items-center gap-2 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <IconCheck className="h-4 w-4" />
          {created
            ? "Collection submitted — it will appear once approved."
            : "Collection updated — changes are pending re-review."}
        </div>
      )}

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">Your collections</h2>
          <Link
            href="/dashboard/brand/new"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
          >
            New collection
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-2 text-sm text-slate-500">
          Sourcing from manufacturers instead?{" "}
          <Link href="/dashboard/buyer" className="font-semibold text-rose-700 hover:text-rose-600">
            View your quote requests
          </Link>
          .
        </p>

        {collections.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            You haven&apos;t listed a collection yet.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {collections.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-ink">{c.name}</h3>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${statusStyles[c.status]}`}
                  >
                    {c.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  {c.category} &middot; {formatPaise(c.price_paise)}/unit &middot; MOQ{" "}
                  {c.moq}
                </p>
                <Link
                  href={`/dashboard/brand/${c.slug}/edit`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-rose-700 hover:text-rose-600"
                >
                  Edit collection
                  <IconArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-ink">Orders received</h2>
        {orders.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            No orders yet.
          </p>
        ) : (
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Collection</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td className="px-4 py-3 font-medium text-ink">
                      {o.collection_name}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{o.quantity}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatPaise(o.total_amount_paise)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${orderStatusStyles[o.status]}`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {new Date(o.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
