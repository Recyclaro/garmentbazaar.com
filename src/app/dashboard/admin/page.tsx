import { requireRole } from "@/lib/dal";
import { listPendingSuppliers, listAllRfqs } from "@/lib/db";
import { approveListingAction, rejectListingAction } from "@/actions/moderation";

export default async function AdminDashboardPage() {
  await requireRole("admin");
  const pending = listPendingSuppliers();
  const rfqs = listAllRfqs();

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-lg font-semibold text-ink">
          Pending listings ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            Nothing waiting for review.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {pending.map((l) => (
              <div
                key={l.id}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <h3 className="font-semibold text-ink">{l.name}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {l.city}, {l.region} &middot; {l.category}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {l.moq ? `MOQ ${l.moq}` : "MOQ not provided"} &middot;{" "}
                  {l.lead_time_days ? `${l.lead_time_days}d lead time` : "lead time not provided"}
                </p>
                <div className="mt-4 flex gap-2">
                  <form action={approveListingAction.bind(null, l.id)}>
                    <button
                      type="submit"
                      className="rounded-full bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-700"
                    >
                      Approve
                    </button>
                  </form>
                  <form action={rejectListingAction.bind(null, l.id)}>
                    <button
                      type="submit"
                      className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-slate-50"
                    >
                      Reject
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-ink">
          All quote requests ({rfqs.length})
        </h2>
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
                  <th className="px-4 py-3">Supplier</th>
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
                      {r.supplier_name ?? "General inquiry"}
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
