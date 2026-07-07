import Link from "next/link";
import { verifySession } from "@/lib/dal";
import { listRfqsFromUser } from "@/lib/db";
import { IconArrowRight } from "@/components/Icons";

export default async function BuyerDashboardPage() {
  const session = await verifySession();
  const rfqs = listRfqsFromUser(session.userId);

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-ink">
            Find your next supplier
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Browse vetted manufacturers and request quotes directly.
          </p>
        </div>
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1.5 rounded-full bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-700"
        >
          Browse marketplace
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-ink">Your quote requests</h2>
        {rfqs.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            You haven&apos;t requested any quotes yet.
          </p>
        ) : (
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Supplier</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Sent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rfqs.map((r) => (
                  <tr key={r.id}>
                    <td className="px-4 py-3 font-medium text-ink">
                      {r.supplier_name ?? "General inquiry"}
                    </td>
                    <td className="max-w-xs px-4 py-3 text-slate-600">
                      {r.message}
                    </td>
                    <td className="px-4 py-3 capitalize text-slate-600">
                      {r.status}
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
