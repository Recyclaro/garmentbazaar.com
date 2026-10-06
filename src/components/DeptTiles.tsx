import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import { departments } from "@/data/departments";

// Compact "shop by department" row: swipeable on phones, a grid on desktop.
export default function DeptTiles() {
  return (
    <section aria-label="Shop by department" className="border-b border-slate-200 bg-white py-8 sm:py-10">
      <Container>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-xl font-semibold text-ink sm:text-2xl">Shop by department</h2>
          <Link href="/collections" className="text-sm font-semibold text-rose-700 hover:text-rose-600">
            All collections
          </Link>
        </div>
        <ul className="-mx-6 mt-5 flex snap-x gap-3 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-6 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0">
          {departments.map((d) => (
            <li key={d.slug} className="w-24 shrink-0 snap-start sm:w-auto">
              <Link href={`/wholesale/${d.slug}`} className="group block text-center">
                <span className="relative block aspect-square overflow-hidden rounded-2xl bg-[#f1efeb] ring-1 ring-slate-200 transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-slate-900/10 group-hover:ring-slate-300">
                  <span className={`absolute inset-x-0 bottom-0 h-1.5 ${d.band}`} />
                  <Image
                    src={`/images/products/${d.photos[0].file}.jpg`}
                    alt={`${d.seoTitle} for retail shops`}
                    fill
                    unoptimized
                    sizes="(min-width: 640px) 15vw, 96px"
                    className="object-contain p-2 transition duration-300 group-hover:scale-105"
                  />
                </span>
                <span className="mt-2 block text-xs font-semibold leading-4 text-ink sm:text-sm">{d.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
