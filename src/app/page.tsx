import CardRail from "@/components/CardRail";
import MobileBuyBar, { MobileBarSpacer } from "@/components/MobileBuyBar";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import CollectionCard from "@/components/CollectionCard";
import DeptBand from "@/components/DeptBand";
import DeptMarquee from "@/components/DeptMarquee";
import MarginCalculator from "@/components/MarginCalculator";
import StockPlanner from "@/components/StockPlanner";
import RetailerHowItWorks from "@/components/RetailerHowItWorks";
import DirectAdvantage from "@/components/DirectAdvantage";
import { departments } from "@/data/departments";
import { priceBands, inBand } from "@/lib/priceBands";
import { formatPaise } from "@/lib/currency";
import { listApprovedCollections, collectionRowToCollection } from "@/lib/db";
import {
  IconArrowRight,
  IconCheck,
  IconStorefront,
} from "@/components/Icons";

// Live counts, prices and fresh listings all come from the database.
export const dynamic = "force-dynamic";

const img = (file: string) => `/images/products/${file}.jpg`;


// One photo and colour per budget band.
const bandLook: Record<string, { photo: string; bg: string; text: string; sub: string }> = {
  "under-500": { photo: "men-tshirt", bg: "bg-[#f4c430]", text: "text-ink", sub: "text-ink/70" },
  "500-1000": { photo: "women-dress", bg: "bg-[#b0164f]", text: "text-white", sub: "text-rose-100" },
  "1000-2000": { photo: "shoes-sports", bg: "bg-[#0f766e]", text: "text-white", sub: "text-teal-100" },
  "2000-plus": { photo: "ethnic-lehenga", bg: "bg-[#16335e]", text: "text-white", sub: "text-sky-100" },
};

const stores = [
  {
    title: "Boutiques",
    desc: "Fresh, mixed-brand assortments in small quantities.",
    photo: "ethnic-anarkali",
  },
  {
    title: "Multi-brand stores",
    desc: "Fill every department from one place, one login.",
    photo: "men-jacket",
  },
  {
    title: "Retail chains",
    desc: "Larger runs and uniform programmes direct from brands.",
    photo: "uniform-corporate",
  },
  {
    title: "Online sellers",
    desc: "Real product photos on every listing to check before you buy.",
    photo: "bag-handbag",
  },
];


export default function Home() {
  const all = listApprovedCollections().map(collectionRowToCollection);
  const fresh = all.filter((c) => c.imagePath).slice(0, 8);
  const brands = new Set(all.map((c) => c.brandName)).size;
  const minMoq = all.length ? Math.min(...all.map((c) => c.moq)) : null;
  const minPrice = all.length ? Math.min(...all.map((c) => c.pricePaise)) : null;
  const median = (xs: number[]) => {
    const v = [...xs].sort((x, y) => x - y);
    return v.length ? v[Math.floor((v.length - 1) / 2)] : 0;
  };
  const plannerBands = priceBands.map((b) => {
    const inside = all.filter((c) => inBand(c.pricePaise, b));
    return {
      key: b.key,
      label: b.label,
      count: inside.length,
      medianOrder: median(inside.map((c) => c.pricePaise * c.moq)),
      medianMoq: median(inside.map((c) => c.moq)),
    };
  });
  const bands = priceBands.map((b) => ({
    ...b,
    count: all.filter((c) => inBand(c.pricePaise, b)).length,
    look: bandLook[b.key],
  }));

  return (
    <>
      {/* Hero */}
      <section className="bg-background pt-6 sm:pt-8">
        <Container>
          <div
            className="relative overflow-hidden rounded-[2rem] bg-[#16335e] px-6 py-12 sm:px-12 sm:py-16"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.09) 1.5px, transparent 1.5px)",
              backgroundSize: "22px 22px",
            }}
          >
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
                  For boutiques, stores &amp; online sellers
                </p>
                <h1 className="text-balance mt-5 font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-7xl">
                  Stock what sells.
                  <br />
                  <span className="text-amber-300">Skip the mandi.</span>
                </h1>
                <p className="text-balance mt-6 max-w-xl text-lg leading-8 text-white/85">
                  Order branded fashion straight from the brands. Wholesale
                  price per piece up front, small MOQs, and every order in one
                  dashboard.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/collections"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-7 py-3.5 text-base font-semibold text-ink shadow-sm transition hover:bg-amber-200"
                  >
                    Start buying
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/collections?price=under-500"
                    className="inline-flex items-center justify-center rounded-full border border-white/50 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
                  >
                    Shop under ₹500
                  </Link>
                </div>
                <Link
                  href="#how-it-works"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 underline-offset-4 hover:underline"
                >
                  See how it works and how you earn more
                  <IconArrowRight className="h-4 w-4 rotate-90" />
                </Link>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {[
                    `${all.length} collections live`,
                    `${brands} brands`,
                    minMoq !== null ? `MOQs from ${minMoq} pieces` : null,
                  ]
                    .filter(Boolean)
                    .map((t) => (
                      <li
                        key={t}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-sm text-white"
                      >
                        <IconCheck className="h-3.5 w-3.5 text-amber-300" />
                        {t}
                      </li>
                    ))}
                </ul>
              </div>

              <div className="relative lg:col-span-6">
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { file: "hero-men", alt: "Men's wear", pad: "" },
                    { file: "hero-women", alt: "Women's wear", pad: "pt-10" },
                    { file: "hero-kids", alt: "Kids' wear", pad: "pt-20" },
                  ].map((h) => (
                    <div key={h.file} className={h.pad}>
                      <div className="relative h-64 overflow-hidden rounded-2xl bg-white shadow-xl shadow-black/25 sm:h-80">
                        <Image
                          src={img(h.file)}
                          alt={h.alt}
                          fill
                          unoptimized
                          priority
                          sizes="(min-width: 1024px) 15vw, 30vw"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {minPrice !== null && (
                  <Link
                    href="/collections?sort=price-asc"
                    className="absolute -bottom-5 left-2 rotate-[-4deg] rounded-2xl bg-amber-300 px-5 py-3 text-ink shadow-xl shadow-black/25 transition hover:rotate-0 sm:-left-6"
                  >
                    <p className="text-[11px] font-bold uppercase tracking-wide">
                      Wholesale from
                    </p>
                    <p className="font-serif text-3xl font-semibold leading-none">
                      {formatPaise(minPrice)}
                      <span className="text-sm font-sans font-medium"> /piece</span>
                    </p>
                  </Link>
                )}
                <div className="absolute -top-4 right-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-ink shadow-xl shadow-black/25 sm:-right-4">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success-600">
                    <IconCheck className="h-3 w-3 text-white" />
                  </span>
                  Direct from brands
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Department ribbon */}
      <div className="mt-10">
        <DeptMarquee />
      </div>

      {/* How it works for retailers */}
      <RetailerHowItWorks collections={all.length} departments={departments.length} />

      {/* Why direct pays */}
      <DirectAdvantage />

      {/* Shop by budget */}
      <section className="bg-background py-20 sm:py-24">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b0164f]">
                Wholesale price per piece
              </p>
              <h2 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                Shop by budget
              </h2>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bands.map((b) => (
              <Link
                key={b.key}
                href={`/collections?price=${b.key}`}
                className={`group relative flex h-72 overflow-hidden rounded-3xl ${b.look.bg} p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/15`}
              >
                <div className="relative z-10 flex flex-col">
                  <p className={`text-sm font-semibold ${b.look.sub}`}>
                    {b.count} collection{b.count === 1 ? "" : "s"}
                  </p>
                  <p
                    className={`mt-1 font-serif text-3xl font-semibold leading-tight ${b.look.text}`}
                  >
                    {b.label}
                  </p>
                  <span
                    className={`mt-auto inline-flex items-center gap-1.5 text-sm font-semibold ${b.look.text}`}
                  >
                    Shop now
                    <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 h-44 w-32 overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/20 transition duration-300 group-hover:scale-105">
                  <Image
                    src={img(b.look.photo)}
                    alt=""
                    fill
                    unoptimized
                    sizes="128px"
                    className="object-contain"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Just dropped */}
      {fresh.length > 0 && (
        <section className="bg-white py-20 sm:py-24">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b0164f]">
                  Latest listings
                </p>
                <h2 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                  Just dropped
                </h2>
              </div>
              <Link
                href="/collections"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-rose-700 hover:text-rose-600"
              >
                See all {all.length}
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <CardRail>
              {fresh.map((c) => (
                <CollectionCard key={c.slug} collection={c} />
              ))}
            </CardRail>
          </Container>
        </section>
      )}

      {/* Departments */}
      <section id="catalogue" className="bg-background py-20 sm:py-24">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Fill every shelf
            </h2>
            <Link
              href="/collections"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent-700 hover:text-accent-600"
            >
              All departments
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {departments.map((d) => (
              <DeptBand key={d.name} dept={d} />
            ))}
          </div>
        </Container>
      </section>

      {/* Profit & planning toolkit */}
      <section id="planner" className="scroll-mt-24 bg-white py-20 sm:py-24">
        <Container>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0f766e]">
            Free retailer tools
          </p>
          <h2 className="text-balance mt-2 max-w-2xl font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Plan smarter. Earn more per piece.
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Work out how far your budget goes, then check the margin on any
            line before you order.
          </p>
          <div className="mt-10 space-y-8">
            <StockPlanner bands={plannerBands} />
            <MarginCalculator />
          </div>
        </Container>
      </section>

      {/* Built for every store */}
      <section className="bg-background py-20 sm:py-24">
        <Container>
          <h2 className="text-balance max-w-2xl font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Built for every kind of store
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stores.map((s) => (
              <Link
                key={s.title}
                href="/collections"
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
              >
                <div className="relative h-48 bg-[#f1efeb]">
                  <Image
                    src={img(s.photo)}
                    alt=""
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className="object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-ink">
                    <IconStorefront className="h-5 w-5 text-[#b0164f]" />
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* GB Credit */}
      <section className="bg-background py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-10 rounded-[2rem] bg-ink p-8 sm:p-12 lg:flex-row lg:items-center">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
                  GB Credit
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                  Coming soon
                </span>
              </div>
              <h2 className="text-balance mt-4 font-serif text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Stock up today. Pay after it sells.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">
                Credit periods for verified retailers through lending
                partners, chosen at checkout.
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:w-80">
              <div className="grid grid-cols-3 gap-2">
                {["30 days", "60 days", "90 days"].map((d) => (
                  <span
                    key={d}
                    className="rounded-xl border border-white/20 py-3 text-center text-sm font-semibold text-white"
                  >
                    {d}
                  </span>
                ))}
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-amber-200"
              >
                Tell me when it launches
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-background pb-12">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#b0164f] px-6 py-14 sm:px-12">
            <div
              className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 grid-cols-4 gap-3 p-6 opacity-30 lg:grid"
              aria-hidden
            >
              {[
                "women-saree",
                "men-jacket",
                "kids-girls-dress",
                "shoes-heels",
                "bag-tote",
                "ethnic-sherwani",
                "acc-watch",
                "women-dress",
              ].map((f) => (
                <div key={f} className="relative overflow-hidden rounded-xl bg-white">
                  <Image src={img(f)} alt="" fill unoptimized sizes="10vw" className="object-contain" />
                </div>
              ))}
            </div>
            <div className="relative max-w-xl">
              <h2 className="text-balance font-serif text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Your next bestseller is already here.
              </h2>
              <p className="mt-3 text-base text-rose-100">
                Free to join. Browse every price before you sign up.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/collections"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-rose-50"
                >
                  Start buying
                  <IconArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Create buyer account
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Sell on GarmentBazaar */}
      <section className="bg-background pb-20 sm:pb-24">
        <Container>
          <div className="grid grid-cols-1 gap-4 rounded-3xl bg-white p-6 ring-1 ring-slate-200 sm:p-8 lg:grid-cols-3 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Not a retailer?
              </p>
              <p className="mt-1 font-serif text-2xl font-semibold text-ink">
                Sell on GarmentBazaar
              </p>
            </div>
            <Link
              href="/solutions/brands"
              className="group flex items-center justify-between rounded-2xl bg-accent-50 px-5 py-4 transition hover:bg-accent-100"
            >
              <span>
                <span className="block text-base font-semibold text-ink">I&apos;m a brand</span>
                <span className="block text-sm text-slate-600">
                  Reach stores without a sales force
                </span>
              </span>
              <IconArrowRight className="h-5 w-5 text-accent-700 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/solutions/manufacturers"
              className="group flex items-center justify-between rounded-2xl bg-teal-50 px-5 py-4 transition hover:bg-teal-100"
            >
              <span>
                <span className="block text-base font-semibold text-ink">
                  I&apos;m a mill or factory
                </span>
                <span className="block text-sm text-slate-600">
                  Sell fabric and production to brands
                </span>
              </span>
              <IconArrowRight className="h-5 w-5 text-teal-800 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </Container>
      </section>
      <MobileBarSpacer />
      <MobileBuyBar
        cta="Start buying"
        href="/collections"
        secondary={{ label: "Under ₹500", href: "/collections?price=under-500" }}
      />
    </>
  );
}
