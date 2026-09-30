import Link from "next/link";
import Image from "next/image";
import type { Supplier } from "@/data/suppliers";
import { supplierImage } from "@/lib/supplierImage";
import { IconCheck, IconMapPin, IconStar } from "./Icons";

export default function SupplierCard({ supplier }: { supplier: Supplier }) {
  const hasReviews = supplier.reviews > 0;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10">
      <Link
        href={`/marketplace/${encodeURIComponent(supplier.slug)}`}
        className="relative block h-40 w-full overflow-hidden bg-[#f1efeb]"
      >
        <Image
          src={supplierImage(supplier.category, supplier.slug)}
          alt=""
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain"
        />
        {supplier.verified && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-accent-700 shadow-sm">
            <IconCheck className="h-3 w-3" />
            Verified
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-ink shadow-sm">
          {supplier.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/marketplace/${encodeURIComponent(supplier.slug)}`}>
          <h3 className="text-base font-semibold text-ink hover:text-accent-700">
            {supplier.name}
          </h3>
        </Link>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
          <IconMapPin className="h-3.5 w-3.5" />
          {supplier.city}, {supplier.region}
          {supplier.since && (
            <>
              <span className="text-slate-300">&middot;</span>
              since {supplier.since}
            </>
          )}
        </div>
        <div className="mt-2 flex items-center gap-1 text-xs text-slate-600">
          {hasReviews ? (
            <>
              <IconStar className="h-3.5 w-3.5 text-amber-400" />
              <span className="font-semibold text-ink">{supplier.rating.toFixed(1)}</span>
              <span className="text-slate-400">({supplier.reviews} reviews)</span>
            </>
          ) : (
            <span className="text-slate-400">New to GarmentBazaar</span>
          )}
        </div>

        {supplier.specialties.length > 0 && (
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
        )}

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
          <span>{supplier.moq ? `MOQ from ${supplier.moq}` : "Contact for MOQ"}</span>
          <span>
            {supplier.leadTimeDays ? `${supplier.leadTimeDays}d lead time` : "Contact for lead time"}
          </span>
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
