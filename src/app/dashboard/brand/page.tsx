import Image from "next/image";
import Link from "next/link";
import { requireRole } from "@/lib/dal";
import { listCollectionsByOwner, listOrdersForCollectionOwner } from "@/lib/db";
import { formatPaise } from "@/lib/currency";
import {
  EmptyState,
  OrderList,
  Pill,
  SectionHead,
  StatTile,
  listingStatus,
} from "@/components/DashUI";
import {
  IconArrowRight,
  IconCheck,
  IconFactory,
  IconStorefront,
  IconUpload,
} from "@/components/Icons";

export default async function BrandDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string; updated?: string }>;
}) {
  const session = await requireRole("brand");
  const { created, updated } = await searchParams;
  const collections = listCollectionsByOwner(session.userId);
  const orders = listOrdersForCollectionOwner(session.userId);

  const live = collections.filter((c) => c.status === "approved").length;
  const inReview = collections.filter((c) => c.status === "pending").length;
  const active = orders.filter((o) => o.status !== "cancelled" && o.status !== "failed");
  const pieces = active.reduce((n, o) => n + o.quantity, 0);
  const revenue = orders
    .filter((o) => o.status === "paid")
    .reduce((n, o) => n + o.total_amount_paise, 0);
  const awaiting = orders.filter((o) => o.status === "created").length;
  const retailers = new Set(orders.map((o) => o.retailer_user_id)).size;

  // Best sellers by pieces ordered.
  const byCollection = new Map<string, { name: string; pieces: number; orders: number }>();
  for (const o of active) {
    const row = byCollection.get(o.collection_slug) ?? { name: o.collection_name, pieces: 0, orders: 0 };
    row.pieces += o.quantity;
    row.orders += 1;
    byCollection.set(o.collection_slug, row);
  }
  const best = [...byCollection.values()].sort((a, b) => b.pieces - a.pieces).slice(0, 5);
  const topPieces = best[0]?.pieces ?? 1;
  const ordersBySlug = (slug: string) => byCollection.get(slug)?.orders ?? 0;

  // Nudges based on the brand's own listings.
  const noPhoto = collections.filter((c) => !c.image_path);
  const rejected = collections.filter((c) => c.status === "rejected");

  const actions = [
    { label: "New collection", href: "/dashboard/brand/new", icon: IconUpload, cls: "bg-accent-600 text-white" },
    { label: "See the shop", href: "/collections", icon: IconStorefront, cls: "bg-[#b0164f] text-white" },
    { label: "Find manufacturers", href: "/marketplace", icon: IconFactory, cls: "bg-[#0f766e] text-white" },
    { label: "Quote requests", href: "/dashboard/buyer", icon: IconCheck, cls: "bg-[#16335e] text-white" },
  ];

  return (
    <div className="space-y-10">
      {(created || updated) && (
        <div className="flex items-center gap-2 rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-800 ring-1 ring-green-200">
          <IconCheck className="h-4 w-4 shrink-0" />
          {created
            ? "Collection submitted. It goes live once our team approves it."
            : "Collection updated. Changes go live after a quick re-review."}
        </div>
      )}

      {/* Quick actions */}
      <div className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-1 sm:mx-0 sm:grid sm:grid-cols-4 sm:px-0">
        {actions.map((a) => (
          <Link
            key={a.label}
            href={a.href}
            className={`flex min-w-[10rem] shrink-0 items-center justify-between gap-3 rounded-2xl px-4 py-4 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-lg ${a.cls}`}
          >
            <span className="flex items-center gap-2">
              <a.icon className="h-5 w-5" />
              {a.label}
            </span>
            <IconArrowRight className="h-4 w-4" />
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile
          label="Live collections"
          value={live}
          hint={inReview ? `${inReview} in review` : undefined}
          tone="bg-accent-600"
        />
        <StatTile
          label="Orders received"
          value={orders.length}
          hint={`${pieces.toLocaleString("en-IN")} pieces`}
          tone="bg-[#b0164f]"
        />
        <StatTile
          label="Paid revenue"
          value={formatPaise(revenue)}
          hint={awaiting ? `${awaiting} awaiting payment` : undefined}
          tone="bg-[#0f766e]"
        />
        <StatTile label="Retailers buying" value={retailers} tone="bg-[#f4c430]" />
      </div>

      {/* Nudges */}
      {(noPhoto.length > 0 || rejected.length > 0 || collections.length === 0) && (
        <div className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200">
          <p className="text-sm font-semibold text-amber-900">Grow your sales</p>
          <ul className="mt-2 space-y-2 text-sm text-amber-900">
            {collections.length === 0 && (
              <li>
                List your first collection so retailers can find you.{" "}
                <Link href="/dashboard/brand/new" className="font-semibold underline">
                  Add one
                </Link>
              </li>
            )}
            {noPhoto.slice(0, 3).map((c) => (
              <li key={`p-${c.id}`}>
                Add a product photo to <span className="font-semibold">{c.name}</span>.
                Listings with photos are easier to buy.{" "}
                <Link href={`/dashboard/brand/${c.slug}/edit`} className="font-semibold underline">
                  Edit
                </Link>
              </li>
            ))}
            {rejected.slice(0, 3).map((c) => (
              <li key={`r-${c.id}`}>
                <span className="font-semibold">{c.name}</span> wasn&apos;t approved. Update it
                and resubmit.{" "}
                <Link href={`/dashboard/brand/${c.slug}/edit`} className="font-semibold underline">
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Orders */}
      <section>
        <SectionHead
          title="Orders from retailers"
          action={
            orders.length > 0 ? (
              <span className="text-sm text-slate-500">{orders.length} total</span>
            ) : undefined
          }
        />
        {orders.length === 0 ? (
          <EmptyState
            title="No orders yet"
            body="Once a retailer orders one of your live collections, it shows up here with their details."
            cta="See your listings in the shop"
            href="/collections"
          />
        ) : (
          <OrderList orders={orders} who="retailer" />
        )}
      </section>

      {/* Best sellers */}
      {best.length > 0 && (
        <section>
          <SectionHead title="Best sellers" />
          <ol className="mt-4 space-y-3 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            {best.map((b, i) => (
              <li key={b.name}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="truncate font-medium text-ink">
                    {i + 1}. {b.name}
                  </span>
                  <span className="shrink-0 text-slate-500">
                    {b.pieces.toLocaleString("en-IN")} pcs · {b.orders} order{b.orders === 1 ? "" : "s"}
                  </span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-accent-600"
                    style={{ width: `${Math.max(6, (b.pieces / topPieces) * 100)}%` }}
                  />
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Collections */}
      <section>
        <SectionHead
          title="Your collections"
          action={
            <Link
              href="/dashboard/brand/new"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              + New
            </Link>
          }
        />
        {collections.length === 0 ? (
          <EmptyState
            title="No collections yet"
            body="Add photos, price per piece and your MOQ. Our team reviews it, then retailers can order."
            cta="List your first collection"
            href="/dashboard/brand/new"
          />
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((c) => (
              <div
                key={c.id}
                className="flex overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 sm:flex-col"
              >
                <div className="relative h-auto w-28 shrink-0 bg-[#f1efeb] sm:h-40 sm:w-full">
                  {c.image_path ? (
                    <Image
                      src={c.image_path}
                      alt={c.name}
                      fill
                      unoptimized
                      sizes="(min-width: 640px) 30vw, 112px"
                      className={c.image_path.startsWith("/images/products/") ? "object-contain" : "object-cover"}
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center px-2 text-center text-xs text-slate-500">
                      No photo
                    </span>
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="truncate font-semibold text-ink">{c.name}</h3>
                    <Pill s={listingStatus[c.status] ?? listingStatus.pending} />
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    {c.category} · {formatPaise(c.price_paise)}/pc · MOQ {c.moq}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {ordersBySlug(c.slug)} order{ordersBySlug(c.slug) === 1 ? "" : "s"}
                  </p>
                  <div className="mt-auto flex gap-4 pt-3 text-sm font-semibold">
                    <Link
                      href={`/dashboard/brand/${c.slug}/edit`}
                      className="text-accent-700 hover:text-accent-600"
                    >
                      Edit
                    </Link>
                    {c.status === "approved" && (
                      <Link
                        href={`/collections/${encodeURIComponent(c.slug)}`}
                        className="text-rose-700 hover:text-rose-600"
                      >
                        View live
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
