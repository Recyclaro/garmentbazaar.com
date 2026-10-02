import CardRail from "@/components/CardRail";
import Link from "next/link";
import { verifySession } from "@/lib/dal";
import {
  listRfqsFromUser,
  listOrdersByRetailer,
  listApprovedCollections,
  collectionRowToCollection,
} from "@/lib/db";
import { formatPaise } from "@/lib/currency";
import { priceBands } from "@/lib/priceBands";
import CollectionCard from "@/components/CollectionCard";
import { EmptyState, OrderList, SectionHead, StatTile } from "@/components/DashUI";
import { IconArrowRight, IconCart, IconFactory, IconSearch } from "@/components/Icons";

function when(iso: string) {
  return new Date(iso.replace(" ", "T") + "Z").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

export default async function BuyerDashboardPage() {
  const session = await verifySession();
  const isRetailer = session.role === "retailer";
  const rfqs = listRfqsFromUser(session.userId);
  const orders = isRetailer ? listOrdersByRetailer(session.userId) : [];

  // Order stats. Spend counts paid orders only.
  const paid = orders.filter((o) => o.status === "paid");
  const spent = paid.reduce((n, o) => n + o.total_amount_paise, 0);
  const pieces = orders
    .filter((o) => o.status !== "cancelled" && o.status !== "failed")
    .reduce((n, o) => n + o.quantity, 0);
  const brands = new Set(orders.map((o) => o.brand_name)).size;
  const awaiting = orders.filter((o) => o.status === "created").length;

  // Picks: same departments they already buy, minus what they've ordered;
  // newest listings with photos when there's no history yet.
  const ordered = new Set(orders.map((o) => o.collection_slug));
  const likes = new Set(orders.map((o) => o.collection_category));
  const live = isRetailer
    ? listApprovedCollections()
        .map(collectionRowToCollection)
        .filter((c) => c.imagePath && !ordered.has(c.slug))
    : [];
  const matched = live.filter((c) => likes.has(c.category));
  const picks = (matched.length >= 4 ? matched : [...matched, ...live.filter((c) => !likes.has(c.category))]).slice(0, 4);

  const actions = [
    { label: "Shop all", href: "/collections", icon: IconCart, cls: "bg-[#b0164f] text-white" },
    { label: "Under ₹500", href: "/collections?price=under-500", icon: IconSearch, cls: "bg-[#f4c430] text-ink" },
    { label: "Smallest MOQ", href: "/collections?sort=moq-asc", icon: IconCart, cls: "bg-[#0f766e] text-white" },
    { label: "Find suppliers", href: "/marketplace", icon: IconFactory, cls: "bg-[#16335e] text-white" },
  ];

  return (
    <div className="space-y-10">
      {/* Quick actions */}
      <div className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-1 sm:mx-0 sm:grid sm:grid-cols-4 sm:px-0">
        {(isRetailer ? actions : actions.slice(3)).map((a) => (
          <Link
            key={a.label}
            href={a.href}
            className={`flex min-w-[9.5rem] shrink-0 items-center justify-between gap-3 rounded-2xl px-4 py-4 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-lg ${a.cls}`}
          >
            <span className="flex items-center gap-2">
              <a.icon className="h-5 w-5" />
              {a.label}
            </span>
            <IconArrowRight className="h-4 w-4" />
          </Link>
        ))}
      </div>

      {isRetailer && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatTile label="Orders placed" value={orders.length} tone="bg-[#b0164f]" />
            <StatTile label="Pieces ordered" value={pieces.toLocaleString("en-IN")} tone="bg-[#f4c430]" />
            <StatTile
              label="Paid so far"
              value={formatPaise(spent)}
              hint={awaiting ? `${awaiting} awaiting payment` : undefined}
              tone="bg-[#0f766e]"
            />
            <StatTile label="Brands you buy from" value={brands} tone="bg-[#16335e]" />
          </div>

          {/* Orders */}
          <section>
            <SectionHead
              title="Your orders"
              action={
                orders.length > 0 ? (
                  <span className="text-sm text-slate-500">{orders.length} total</span>
                ) : undefined
              }
            />
            {orders.length === 0 ? (
              <EmptyState
                title="No orders yet"
                body="Pick a collection, order at the brand's MOQ, and it will show up here for easy reordering."
                cta="Start buying"
                href="/collections"
              />
            ) : (
              <OrderList orders={orders} who="brand" reorder />
            )}
          </section>

          {/* Picks */}
          {picks.length > 0 && (
            <section>
              <SectionHead
                title={matched.length ? "Picked for your store" : "Fresh for your store"}
                action={
                  <Link
                    href="/collections"
                    className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-rose-700 hover:text-rose-600"
                  >
                    See all
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                }
              />
              <CardRail>
                {picks.map((c) => (
                  <CollectionCard key={c.slug} collection={c} />
                ))}
              </CardRail>
            </section>
          )}

          {/* Budget */}
          <section>
            <SectionHead title="Shop by budget" />
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {priceBands.map((b, i) => (
                <Link
                  key={b.key}
                  href={`/collections?price=${b.key}`}
                  className={`rounded-2xl px-4 py-5 text-base font-semibold transition hover:-translate-y-0.5 hover:shadow-lg ${
                    ["bg-[#f4c430] text-ink", "bg-[#b0164f] text-white", "bg-[#0f766e] text-white", "bg-[#16335e] text-white"][i]
                  }`}
                >
                  <span className="block text-xs font-medium opacity-80">Per piece</span>
                  {b.label}
                </Link>
              ))}
            </div>
          </section>

          {/* GB Credit */}
          <div className="flex flex-col gap-4 rounded-3xl bg-ink p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-300">
                GB Credit
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white">
                  Coming soon
                </span>
              </p>
              <p className="mt-2 font-serif text-2xl font-semibold text-white">
                Stock up today. Pay after it sells.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-ink transition hover:bg-amber-200"
            >
              Notify me
            </Link>
          </div>
        </>
      )}

      {/* Quote requests */}
      <section>
        <SectionHead title="Quote requests" />
        {rfqs.length === 0 ? (
          <EmptyState
            title="No quote requests yet"
            body="Need private label or bulk production? Ask manufacturers for a quote."
            cta="Browse suppliers"
            href="/marketplace"
          />
        ) : (
          <ul className="mt-4 space-y-3">
            {rfqs.map((r) => (
              <li key={r.id} className="rounded-2xl bg-white p-4 ring-1 ring-slate-200 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-ink">
                    {r.supplier_name ?? "General inquiry"}
                  </p>
                  <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold capitalize text-slate-600">
                    {r.status}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">{r.message}</p>
                <p className="mt-2 text-xs text-slate-500">Sent {when(r.created_at)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
