import Link from "next/link";
import type { Collection } from "@/data/collections";
import { collectionSwatch } from "@/lib/collectionSwatch";
import { formatPaise } from "@/lib/currency";
import { IconArrowRight } from "./Icons";

export default function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-md">
      <Link
        href={`/collections/${encodeURIComponent(collection.slug)}`}
        className="relative block h-40 w-full"
        style={collectionSwatch(collection.category, collection.slug)}
      >
        <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-ink shadow-sm">
          {collection.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/collections/${encodeURIComponent(collection.slug)}`}>
          <h3 className="text-base font-semibold text-ink hover:text-rose-700">
            {collection.name}
          </h3>
        </Link>
        <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-rose-600">
          {collection.brandName}
        </p>
        <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-slate-500">
          {collection.description}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
          <span className="font-semibold text-ink">
            {formatPaise(collection.pricePaise)}
            <span className="font-normal text-slate-400"> / unit</span>
          </span>
          <span className="text-xs text-slate-500">MOQ {collection.moq}</span>
        </div>

        <Link
          href={`/collections/${encodeURIComponent(collection.slug)}`}
          className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
        >
          View & Order
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
