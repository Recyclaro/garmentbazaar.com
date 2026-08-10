import { requireRole } from "@/lib/dal";
import { listPendingSuppliers, listPendingCollections, listAllRfqs, listAllOrders } from "@/lib/db";
import {
  approveListingAction,
  rejectListingAction,
  approveCollectionAction,
  rejectCollectionAction,
} from "@/actions/moderation";
import { formatPaise } from "@/lib/currency";

const orderStatusStyles: Record<string, string> = {
  paid: "bg-green-50 text-green-700",
  created: "bg-amber-50 text-amber-700",
  failed: "bg-red-50 text-red-700",
  cancelled: "bg-slate-100 text-slate-500",
};

export default async function AdminDashboardPage() {
  await requireRole("admin");
  const pending = listPendingSuppliers();
  const pendingCollections = listPendingCollections();
  const rfqs = listAllRfqs();
  const orders = listAllOrders();

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
          Pending collections ({pendingCollections.length})
        </h2>
        {pendingCollections.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            Nothing waiting for review.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {pendingCollections.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <h3 className="font-semibold text-ink">{c.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{c.category}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {formatPaise(c.price_paise)}/unit &middot; MOQ {c.moq}
                </p>
                <div className="mt-4 flex gap-2">
                  <form action={approveCollectionAction.bind(null, c.id)}>
                    <button
                      type="submit"
                      className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
                    >
                      Approve
                    </button>
                  </form>
                  <form action={rejectCollectionAction.bind(null, c.id)}>
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
          All orders ({orders.length})
        </h2>
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
                  <th className="px-4 py-3">Retailer</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Placed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td className="px-4 py-3 font-medium text-ink">
                      {o.collection_name}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{o.retailer_email}</td>
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
