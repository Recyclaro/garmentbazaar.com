import Link from "next/link";
import { requireRole } from "@/lib/dal";
import { listSuppliersByOwner, listRfqsForSupplierOwner } from "@/lib/db";
import { IconArrowRight, IconCheck } from "@/components/Icons";

const statusStyles: Record<string, string> = {
  approved: "bg-green-50 text-green-700",
  pending: "bg-amber-50 text-amber-700",
  rejected: "bg-red-50 text-red-700",
};

export default async function ManufacturerDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string; updated?: string }>;
}) {
  const session = await requireRole("manufacturer");
  const { created, updated } = await searchParams;
  const listings = await listSuppliersByOwner(session.userId);
  const rfqs = await listRfqsForSupplierOwner(session.userId);

  return (
    <div className="space-y-10">
      {(created || updated) && (
        <div className="flex items-center gap-2 rounded-lg bg-accent-50 px-4 py-3 text-sm text-accent-700">
          <IconCheck className="h-4 w-4" />
          {created
            ? "Listing submitted — it will appear on the marketplace once approved."
            : "Listing updated — changes are pending re-review."}
        </div>
      )}

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">Your listings</h2>
          <Link
            href="/dashboard/manufacturer/new"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-700"
          >
            New listing
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {listings.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            You haven&apos;t listed a factory yet.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {listings.map((l) => (
              <div
                key={l.id}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-ink">{l.name}</h3>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${statusStyles[l.status]}`}
                  >
                    {l.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  {l.city}, {l.region} &middot; {l.category}
                </p>
                <Link
                  href={`/dashboard/manufacturer/${l.slug}/edit`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-700 hover:text-accent-600"
                >
                  Edit listing
                  <IconArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-ink">Quote requests received</h2>
        {rfqs.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            No quote requests yet.
          </p>
        ) : (
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">From</th>
                  <th className="px-4 py-3">Listing</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rfqs.map((r) => (
                  <tr key={r.id}>
                    <td className="px-4 py-3">
                      <p className="font-medium text-ink">{r.name}</p>
                      <p className="text-xs text-slate-500">
                        {r.company} &middot; {r.email}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {r.supplier_name}
                    </td>
                    <td className="max-w-xs px-4 py-3 text-slate-600">
                      {r.message}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {new Date(r.created_at).toLocaleDateString()}
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
