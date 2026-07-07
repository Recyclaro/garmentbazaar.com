import Link from "next/link";
import type { Supplier } from "@/data/suppliers";
import { categorySwatch } from "@/lib/categorySwatch";
import { IconCheck, IconMapPin, IconStar } from "./Icons";

export default function SupplierCard({ supplier }: { supplier: Supplier }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-md">
      <div className="relative h-32 w-full" style={categorySwatch(supplier.category)}>
        {supplier.verified && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-accent-700 shadow-sm">
            <IconCheck className="h-3 w-3" />
            Verified
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-ink shadow-sm">
          {supplier.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-ink">{supplier.name}</h3>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
          <IconMapPin className="h-3.5 w-3.5" />
          {supplier.city}, {supplier.region}
          <span className="text-slate-300">&middot;</span>
          since {supplier.since}
        </div>
        <div className="mt-2 flex items-center gap-1 text-xs text-slate-600">
          <IconStar className="h-3.5 w-3.5 text-amber-400" />
          <span className="font-semibold text-ink">{supplier.rating.toFixed(1)}</span>
          <span className="text-slate-400">({supplier.reviews} reviews)</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {supplier.specialties.map((s) => (
            <span
              key={s}
              className="rounded-full bg-accent-50 px-2.5 py-1 text-[11px] font-medium text-accent-700"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
          <span>MOQ from {supplier.moq}</span>
          <span>{supplier.leadTimeDays}d lead time</span>
        </div>

        <Link
          href={`/contact?supplier=${encodeURIComponent(supplier.slug)}`}
          className="mt-4 inline-flex items-center justify-center rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-700"
        >
          Request a Quote
        </Link>
      </div>
    </div>
  );
}
