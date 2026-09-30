import Image from "next/image";
import Link from "next/link";
import type { Department } from "@/data/departments";
import { IconArrowRight } from "./Icons";

// One department as a colour band with four product photos, like the
// product sheet. The whole card links to collections filtered to it.
export default function DeptBand({ dept }: { dept: Department }) {
  const href = `/collections?category=${encodeURIComponent(dept.name)}`;
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10">
      <Link
        href={href}
        className={`flex items-center justify-between px-5 py-3.5 ${dept.band} ${dept.text}`}
      >
        <span className="font-serif text-xl font-semibold uppercase tracking-wide">
          {dept.label}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold">
          View all
          <IconArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
        </span>
      </Link>
      <div className="grid grid-cols-4 gap-2 p-3">
        {dept.photos.map((p) => (
          <Link key={p.file} href={href} className="block">
            <div className="relative h-28 overflow-hidden rounded-xl bg-[#f1efeb] sm:h-32">
              <Image
                src={`/images/products/${p.file}.jpg`}
                alt={p.label}
                fill
                unoptimized
                sizes="(min-width: 1024px) 8vw, 22vw"
                className="object-contain transition duration-300 hover:scale-105"
              />
            </div>
            <p className="mt-1.5 truncate text-center text-[11px] font-medium text-slate-600">
              {p.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
