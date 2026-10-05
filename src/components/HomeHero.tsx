import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import { formatPaise } from "@/lib/currency";
import {
  IconArrowRight,
  IconCheck,
  IconSearch,
  IconShieldCheck,
  IconStorefront,
  IconTarget,
} from "./Icons";

export interface HeroListing {
  slug: string;
  name: string;
  brandName: string;
  pricePaise: number;
  moq: number;
  imagePath: string;
}

const popular = [
  { label: "Kurtis", href: "/collections?q=kurti" },
  { label: "Kidswear", href: "/wholesale/kidswear" },
  { label: "Menswear", href: "/wholesale/menswear" },
  { label: "Sarees", href: "/collections?q=saree" },
  { label: "Footwear", href: "/wholesale/footwear" },
];

// Home page hero: search first, then real listings from the catalogue so a
// shop owner sees actual wholesale prices and MOQs before scrolling.
export default function HomeHero({
  collections,
  brands,
  minMoq,
  minPrice,
  listings,
  aiOn,
}: {
  collections: number;
  brands: number;
  minMoq: number | null;
  minPrice: number | null;
  listings: HeroListing[];
  aiOn: boolean;
}) {
  const cards = listings.slice(0, 4);
  const tilt = ["lg:-rotate-2", "lg:rotate-2 lg:translate-y-8", "lg:rotate-1", "lg:-rotate-1 lg:translate-y-8"];

  const trust = [
    { icon: IconTarget, title: "Price before signup", sub: "Wholesale price per piece on every listing" },
    {
      icon: IconStorefront,
      title: minMoq !== null ? `MOQs from ${minMoq} pieces` : "Small MOQs",
      sub: "Each brand sets its own minimum",
    },
    { icon: IconShieldCheck, title: "Reviewed brands", sub: "Every listing checked before it goes live" },
    { icon: IconCheck, title: "Free to join", sub: "For retailers, brands and manufacturers" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#12264a] text-white">
      {/* Soft colour glows and a dot texture behind everything. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[#b0164f]/35 blur-3xl" />
        <div className="absolute -bottom-48 right-[-10rem] h-[34rem] w-[34rem] rounded-full bg-amber-400/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 pb-12 pt-10 sm:pt-16 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-20 lg:pt-20">
          <div className="lg:col-span-6">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 py-1.5 pl-1.5 pr-4 text-xs font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15 sm:text-sm"
            >
              <span className="rounded-full bg-amber-300 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink">
                Live
              </span>
              {collections} collections from {brands} reviewed brands
              <IconArrowRight className="h-3.5 w-3.5" />
            </Link>

            <h1 className="mt-6">
              <span className="block font-sans text-sm font-bold uppercase tracking-[0.16em] text-amber-200 sm:text-base">
                Wholesale clothing for retailers
              </span>
              <span className="text-balance mt-3 block font-serif text-[2.75rem] font-semibold leading-[1.02] tracking-tight sm:text-7xl">
                Stock what sells.
                <br />
                <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-orange-300 bg-clip-text text-transparent">
                  Skip the mandi.
                </span>
              </span>
            </h1>
            <p className="text-balance mt-5 max-w-xl text-lg leading-8 text-white/80">
              India&apos;s wholesale buying platform for shops in Tier 2, 3 and 4
              towns. Order branded stock straight from the brands, from anywhere
              in India.
            </p>

            <form action="/ask" method="get" role="search" className="mt-8 max-w-xl">
              <label htmlFor="hero-q" className="sr-only">
                Search wholesale collections
              </label>
              <div className="flex items-center gap-2 rounded-full bg-white p-1.5 shadow-2xl shadow-black/30 ring-1 ring-white/20">
                <IconSearch className="ml-3 h-5 w-5 shrink-0 text-slate-400" />
                <input
                  id="hero-q"
                  name="q"
                  type="search"
                  maxLength={200}
                  placeholder={aiOn ? "Try: cotton kurtis under ₹500 for summer" : "Search kurtis, kids tees, sarees…"}
                  className="min-w-0 flex-1 bg-transparent py-2.5 text-base text-ink placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#b0164f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c81d5c] sm:px-6"
                >
                  Search
                </button>
              </div>
            </form>
            <Link
              href="#ai-tools"
              className="mt-3 inline-flex items-center gap-2 text-sm text-white/80 transition hover:text-amber-200"
            >
              <span className="rounded-full bg-gradient-to-r from-amber-300 to-orange-300 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink">
                New
              </span>
              {aiOn
                ? "AI search in Hindi or English, a stock advisor and a WhatsApp writer"
                : "Free stock advisor, smart search and WhatsApp writer"}
              <IconArrowRight className="h-3.5 w-3.5" />
            </Link>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-white/60">Popular:</span>
              {popular.map((p) => (
                <Link
                  key={p.label}
                  href={p.href}
                  className="rounded-full border border-white/20 px-3 py-1 text-white/90 transition hover:border-amber-300 hover:text-amber-200"
                >
                  {p.label}
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/collections"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-7 py-3.5 text-base font-semibold text-ink shadow-sm transition hover:bg-amber-200"
              >
                Start buying
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/signup?role=retailer"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Create free shop account
              </Link>
            </div>
          </div>

          {/* Real listings, so the first screen shows actual prices and MOQs. */}
          {cards.length >= 2 && (
            <div className="relative lg:col-span-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:px-4">
                {cards.map((c, i) => (
                  <Link
                    key={c.slug}
                    href={`/collections/${encodeURIComponent(c.slug)}`}
                    className={`group overflow-hidden rounded-2xl bg-white text-ink shadow-2xl shadow-black/30 transition duration-300 hover:rotate-0 hover:scale-[1.02] ${tilt[i]} ${i >= 2 ? "hidden sm:block" : ""}`}
                  >
                    <div className="relative h-40 bg-[#f1efeb] sm:h-48">
                      <Image
                        src={c.imagePath}
                        alt={c.name}
                        fill
                        unoptimized
                        priority={i < 2}
                        sizes="(min-width: 1024px) 22vw, 45vw"
                        className={c.imagePath.startsWith("/images/products/") ? "object-contain" : "object-cover"}
                      />
                      <span className="absolute left-2 top-2 rounded-full bg-success-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                        MOQ {c.moq}
                      </span>
                    </div>
                    <div className="p-3 sm:p-4">
                      <p className="truncate text-sm font-semibold">{c.name}</p>
                      <p className="truncate text-[11px] font-medium uppercase tracking-wide text-rose-600">
                        {c.brandName}
                      </p>
                      <p className="mt-1.5 font-serif text-lg font-semibold leading-none">
                        {formatPaise(c.pricePaise)}
                        <span className="font-sans text-xs font-medium text-slate-500"> /piece</span>
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              {minPrice !== null && (
                <div className="mt-6 flex justify-center lg:mt-14">
                  <Link
                    href="/collections?sort=price-asc"
                    className="rotate-[-2deg] whitespace-nowrap rounded-2xl bg-amber-300 px-5 py-2.5 text-ink shadow-xl shadow-black/30 transition hover:rotate-0"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wide">Wholesale from </span>
                    <span className="font-serif text-2xl font-semibold">{formatPaise(minPrice)}</span>
                    <span className="text-xs font-medium"> /piece</span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>

      {/* Trust strip */}
      <div className="relative border-t border-white/10 bg-black/15">
        <Container>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-5 py-6 lg:grid-cols-4">
            {trust.map((t) => (
              <li key={t.title} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-300">
                  <t.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{t.title}</span>
                  <span className="hidden text-xs leading-5 text-white/60 sm:block">{t.sub}</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
