import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { formatPaise } from "@/lib/currency";
import type { OrderWithCollection, OrderWithRetailer } from "@/lib/db";
import { IconArrowRight } from "./Icons";

export const orderStatus: Record<string, { label: string; cls: string }> = {
  paid: { label: "Paid", cls: "bg-green-50 text-green-700 ring-green-200" },
  created: { label: "Placed", cls: "bg-amber-50 text-amber-800 ring-amber-200" },
  failed: { label: "Payment failed", cls: "bg-red-50 text-red-700 ring-red-200" },
  cancelled: { label: "Cancelled", cls: "bg-slate-100 text-slate-600 ring-slate-200" },
};

export const listingStatus: Record<string, { label: string; cls: string }> = {
  approved: { label: "Live", cls: "bg-green-50 text-green-700 ring-green-200" },
  pending: { label: "In review", cls: "bg-amber-50 text-amber-800 ring-amber-200" },
  rejected: { label: "Rejected", cls: "bg-red-50 text-red-700 ring-red-200" },
};

export function Pill({ s }: { s: { label: string; cls: string } }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${s.cls}`}
    >
      {s.label}
    </span>
  );
}

export function StatTile({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string | number;
  hint?: string;
  tone: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200 sm:p-5">
      <span className={`block h-1.5 w-8 rounded-full ${tone}`} />
      <p className="mt-3 text-xs font-medium text-slate-500 sm:text-sm">{label}</p>
      <p className="mt-1 font-serif text-2xl font-semibold text-ink sm:text-3xl">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

export function SectionHead({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="font-serif text-2xl font-semibold text-ink">{title}</h2>
      {action}
    </div>
  );
}

export function EmptyState({
  title,
  body,
  cta,
  href,
}: {
  title: string;
  body: string;
  cta?: string;
  href?: string;
}) {
  return (
    <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <p className="text-base font-semibold text-ink">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">{body}</p>
      {cta && href && (
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {cta}
          <IconArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

function Thumb({ src, alt }: { src: string | null; alt: string }) {
  return (
    <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-[#f1efeb]">
      {src && (
        <Image src={src} alt={alt} fill unoptimized sizes="56px" className="object-contain" />
      )}
    </div>
  );
}

function when(iso: string) {
  return new Date(iso.replace(" ", "T") + "Z").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Orders as cards on phones and a table from md up. `who` decides whether
// the counterparty column shows the brand (retailer view) or the buyer
// (brand view); `reorder` adds a reorder link to each row.
export function OrderList({
  orders,
  who,
  reorder = false,
}: {
  orders: (OrderWithCollection | OrderWithRetailer)[];
  who: "brand" | "retailer";
  reorder?: boolean;
}) {
  const party = (o: OrderWithCollection | OrderWithRetailer) =>
    who === "brand"
      ? o.brand_name
      : "retailer_name" in o
        ? o.retailer_company || o.retailer_name
        : "";

  return (
    <>
      <ul className="mt-4 space-y-3 md:hidden">
        {orders.map((o) => (
          <li key={o.id} className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
            <div className="flex gap-3">
              <Thumb src={o.collection_image} alt={o.collection_name} />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate font-semibold text-ink">{o.collection_name}</p>
                  <Pill s={orderStatus[o.status] ?? orderStatus.created} />
                </div>
                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {party(o)} · {when(o.created_at)}
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  {o.quantity} pcs ·{" "}
                  <span className="font-semibold text-ink">
                    {formatPaise(o.total_amount_paise)}
                  </span>
                </p>
              </div>
            </div>
            {reorder && (
              <Link
                href={`/collections/${encodeURIComponent(o.collection_slug)}`}
                className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-rose-50 py-2.5 text-sm font-semibold text-rose-700"
              >
                Reorder
                <IconArrowRight className="h-4 w-4" />
              </Link>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-4 hidden overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Collection</th>
              <th className="px-4 py-3">{who === "brand" ? "Brand" : "Retailer"}</th>
              <th className="px-4 py-3">Pieces</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              {reorder && <th className="px-4 py-3" />}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Thumb src={o.collection_image} alt={o.collection_name} />
                    <span className="font-medium text-ink">{o.collection_name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">{party(o)}</td>
                <td className="px-4 py-3 text-slate-600">{o.quantity}</td>
                <td className="px-4 py-3 font-semibold text-ink">
                  {formatPaise(o.total_amount_paise)}
                </td>
                <td className="px-4 py-3">
                  <Pill s={orderStatus[o.status] ?? orderStatus.created} />
                </td>
                <td className="px-4 py-3 text-slate-500">{when(o.created_at)}</td>
                {reorder && (
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/collections/${encodeURIComponent(o.collection_slug)}`}
                      className="inline-flex items-center gap-1 font-semibold text-rose-700 hover:text-rose-600"
                    >
                      Reorder
                      <IconArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
