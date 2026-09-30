import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import CollectionCard from "@/components/CollectionCard";
import DeptBand from "@/components/DeptBand";
import DeptMarquee from "@/components/DeptMarquee";
import StatRibbon from "@/components/StatRibbon";
import { departments } from "@/data/departments";
import { listApprovedCollections, collectionRowToCollection } from "@/lib/db";
import {
  IconArrowRight,
  IconBoxes,
  IconCheck,
  IconSearch,
  IconShieldCheck,
  IconTarget,
  IconTruck,
} from "@/components/Icons";

// The fresh-collections strip and stats read from the database.
export const dynamic = "force-dynamic";

const img = (file: string) => `/images/products/${file}.jpg`;

// Three hops of the network, shown under the hero.
const tiers = [
  {
    step: "01",
    label: "Mills & factories",
    title: "Fabric and production",
    desc: "Mills and manufacturers list fabric, capacity, MOQs and certifications.",
    photo: "fabric-denim",
    band: "bg-[#0f766e]",
  },
  {
    step: "02",
    label: "Brands",
    title: "Collections in sets",
    desc: "Brands list collections with wholesale pricing and their own MOQ.",
    photo: "men-polo",
    band: "bg-accent-600",
  },
  {
    step: "03",
    label: "Retail",
    title: "Every shelf, every city",
    desc: "Boutiques, chains, online sellers and export buyers order direct.",
    photo: "women-coord",
    band: "bg-[#b0164f]",
  },
];

// One door per audience.
const doors = [
  {
    label: "For brands",
    title: "Reach stores without a sales force",
    points: [
      "List collections with your MOQ",
      "Orders land in your dashboard",
      "Source production on the same account",
    ],
    cta: "List your brand",
    href: "/signup",
    learnHref: "/solutions/brands",
    band: "bg-accent-600",
    button: "bg-accent-600 hover:bg-accent-700",
    photos: ["men-suit", "women-coord"],
  },
  {
    label: "For retailers",
    title: "Branded stock at wholesale price",
    points: [
      "Boutiques, chains and online sellers",
      "Buy direct at the brand's MOQ",
      "Every order tracked in one place",
    ],
    cta: "Start buying",
    href: "/collections",
    learnHref: "/solutions/retailers",
    band: "bg-[#b0164f]",
    button: "bg-[#b0164f] hover:bg-[#8e1140]",
    photos: ["women-dress", "shoes-sports"],
  },
  {
    label: "For mills & factories",
    title: "Steady orders from verified buyers",
    points: [
      "List capacity, fabrics and MOQs",
      "Receive quote requests directly",
      "Reviewed listings build buyer trust",
    ],
    cta: "List your factory",
    href: "/signup",
    learnHref: "/solutions/manufacturers",
    band: "bg-[#0f766e]",
    button: "bg-[#0f766e] hover:bg-[#0b5c56]",
    photos: ["fabric-cotton", "fabric-knit"],
  },
  {
    label: "For export buyers",
    title: "Source from India with confidence",
    points: [
      "Moderated brands and manufacturers",
      "One point of contact for large orders",
      "Browse the supplier marketplace",
    ],
    cta: "Request a quote",
    href: "/contact",
    learnHref: "/marketplace",
    band: "bg-[#16335e]",
    button: "bg-[#16335e] hover:bg-[#0f2545]",
    photos: ["ethnic-lehenga", "bag-luggage"],
  },
];

const steps = [
  {
    title: "Create your account",
    desc: "Sign up as a brand, manufacturer or retailer. Listings are reviewed before they go live.",
    color: "bg-accent-600",
  },
  {
    title: "Discover",
    desc: "Browse brand collections and the supplier marketplace, filtered by department and MOQ.",
    color: "bg-[#b0164f]",
  },
  {
    title: "Order or request a quote",
    desc: "Order collections at the brand's MOQ, or send a quote request to a manufacturer.",
    color: "bg-[#0f766e]",
  },
  {
    title: "Track in your dashboard",
    desc: "Orders and quote requests stay in one place for buyers and sellers alike.",
    color: "bg-[#c77d0a]",
  },
];

const services = [
  {
    icon: IconSearch,
    title: "AI sourcing",
    desc: "Match styles to suppliers on capacity, quality, lead time and MOQ fit.",
    soon: false,
    tile: "bg-accent-100 text-accent-700",
  },
  {
    icon: IconTarget,
    title: "Demand insights",
    desc: "Reorder and sell-through signals fed back to brands and mills.",
    soon: false,
    tile: "bg-rose-100 text-rose-700",
  },
  {
    icon: IconBoxes,
    title: "GB Credit",
    desc: "Buyers pay in 30 to 90 days; sellers get paid on dispatch.",
    soon: true,
    tile: "bg-amber-100 text-amber-800",
  },
  {
    icon: IconTruck,
    title: "GB Logistics",
    desc: "Pickup, pan-India delivery and export freight at pooled rates.",
    soon: true,
    tile: "bg-teal-100 text-teal-800",
  },
  {
    icon: IconShieldCheck,
    title: "GB Assure",
    desc: "Pre-dispatch inspection and fabric lab tests on bulk orders.",
    soon: true,
    tile: "bg-sky-100 text-sky-800",
  },
];

const trust = [
  "Every brand and factory listing is reviewed before it goes live",
  "Separate accounts and dashboards for brands, manufacturers and retailers",
  "Orders and quote requests recorded with a full history",
  "Collections sold at the MOQ the brand sets, with no middlemen",
];

const fabrics = [
  { file: "fabric-cotton", label: "Cotton" },
  { file: "fabric-denim", label: "Denim" },
  { file: "fabric-linen", label: "Linen" },
  { file: "fabric-knit", label: "Knit fabrics" },
  { file: "fabric-synthetic", label: "Synthetics" },
  { file: "fabric-sustainable", label: "Sustainable" },
];

export default function Home() {
  const fresh = listApprovedCollections()
    .map(collectionRowToCollection)
    .filter((c) => c.imagePath)
    .slice(0, 8);

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
                  B2B for fashion, lifestyle &amp; fabric
                </p>
                <h1 className="text-balance mt-5 font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-7xl">
                  From fabric to shelf.
                  <br />
                  <span className="text-amber-300">One network.</span>
                </h1>
                <p className="text-balance mt-6 max-w-xl text-lg leading-8 text-white/85">
                  GarmentBazaar connects mills, manufacturers, brands and
                  retailers on one verified platform. Source production, sell
                  collections wholesale, and buy branded stock direct.
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
                    href="/signup"
                    className="inline-flex items-center justify-center rounded-full border border-white/50 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
                  >
                    List your brand
                  </Link>
                </div>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {["Brand-set MOQs", "Reviewed listings", "Direct from brands"].map(
                    (t) => (
                      <li
                        key={t}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-sm text-white"
                      >
                        <IconCheck className="h-3.5 w-3.5 text-amber-300" />
                        {t}
                      </li>
                    ),
                  )}
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
                <div className="absolute -bottom-4 left-2 flex items-center gap-2 rounded-2xl bg-white p-2 pr-4 shadow-xl shadow-black/25 sm:-left-6">
                  <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-[#f1efeb]">
                    <Image
                      src={img("fabric-denim")}
                      alt=""
                      fill
                      unoptimized
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-ink">Fabric to shelf</p>
                    <p className="text-[11px] text-slate-500">Mills · Brands · Retail</p>
                  </div>
                </div>
                <div className="absolute -top-4 right-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-ink shadow-xl shadow-black/25 sm:-right-4">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success-600">
                    <IconCheck className="h-3 w-3 text-white" />
                  </span>
                  12 departments
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

      {/* How the network flows */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {tiers.map((t, i) => (
              <div key={t.step} className="relative">
                <div className="flex h-full items-center gap-5 rounded-2xl border border-slate-200 bg-background p-5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f1efeb]">
                    <Image
                      src={img(t.photo)}
                      alt=""
                      fill
                      unoptimized
                      sizes="80px"
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] text-white ${t.band}`}
                      >
                        {t.step}
                      </span>
                      {t.label}
                    </p>
                    <p className="mt-1.5 font-serif text-xl font-semibold text-ink">
                      {t.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{t.desc}</p>
                  </div>
                </div>
                {i < tiers.length - 1 && (
                  <span className="absolute -right-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-white lg:flex">
                    <IconArrowRight className="h-4 w-4" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Doors */}
      <section id="doors" className="bg-background py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="text-balance font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              One platform, four ways in
            </h2>
            <p className="max-w-md text-base leading-7 text-slate-600">
              Pick your role. Each door opens a workspace built for how you buy
              or sell.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {doors.map((d) => (
              <div
                key={d.label}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
              >
                <div className={`${d.band} px-6 py-3`}>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-white">
                    {d.label}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 px-4 pt-4">
                  {d.photos.map((p) => (
                    <div
                      key={p}
                      className="relative h-28 overflow-hidden rounded-xl bg-[#f1efeb]"
                    >
                      <Image
                        src={img(p)}
                        alt=""
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 10vw, 40vw"
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                  <h3 className="font-serif text-2xl font-semibold leading-tight text-ink">
                    {d.title}
                  </h3>
                  <ul className="mt-4 flex-1 space-y-2">
                    {d.points.map((p) => (
                      <li key={p} className="flex gap-2.5 text-sm leading-6 text-slate-600">
                        <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-success-600" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Link
                      href={d.href}
                      className={`inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white transition ${d.button}`}
                    >
                      {d.cta}
                    </Link>
                    <Link
                      href={d.learnHref}
                      className="text-sm font-semibold text-ink underline-offset-4 hover:underline"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Departments */}
      <section id="catalogue" className="bg-white py-20 sm:py-24">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Shop by department
            </h2>
            <Link
              href="/collections"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent-700 hover:text-accent-600"
            >
              View all collections
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

      {/* Stats */}
      <section className="bg-ink py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              The network today
            </h2>
            <p className="text-sm text-slate-400">Counted live from the platform</p>
          </div>
          <div className="mt-8">
            <StatRibbon />
          </div>
        </Container>
      </section>

      {/* Fresh collections */}
      {fresh.length > 0 && (
        <section className="bg-background py-20 sm:py-24">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b0164f]">
                  New on GarmentBazaar
                </p>
                <h2 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                  Fresh collections
                </h2>
              </div>
              <Link
                href="/collections"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-rose-700 hover:text-rose-600"
              >
                Browse all
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {fresh.map((c) => (
                <CollectionCard key={c.slug} collection={c} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Fabric & materials */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="overflow-hidden rounded-3xl border border-slate-200">
            <Link
              href="/solutions/manufacturers"
              className="group flex items-center justify-between bg-[#0f766e] px-6 py-4 text-white sm:px-8"
            >
              <span className="font-serif text-2xl font-semibold uppercase tracking-wide">
                Fabric &amp; materials
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
                Source from mills
                <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
            <div className="grid grid-cols-3 gap-3 p-4 sm:grid-cols-6 sm:p-6">
              {fabrics.map((f) => (
                <Link key={f.file} href="/solutions/manufacturers" className="group">
                  <div className="relative h-32 overflow-hidden rounded-xl bg-[#f1efeb] sm:h-40">
                    <Image
                      src={img(f.file)}
                      alt={f.label}
                      fill
                      unoptimized
                      sizes="(min-width: 640px) 16vw, 33vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-2 text-center text-sm font-medium text-slate-700">
                    {f.label}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-background py-20 sm:py-24">
        <Container>
          <h2 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            How it works
          </h2>
          <ol className="relative mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <span
              className="absolute left-0 right-0 top-6 hidden h-0.5 bg-slate-200 lg:block"
              aria-hidden
            />
            {steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span
                  className={`relative flex h-12 w-12 items-center justify-center rounded-full font-serif text-lg font-semibold text-white ring-8 ring-background ${s.color}`}
                >
                  {i + 1}
                </span>
                <h3 className="mt-5 text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-base leading-7 text-slate-600">{s.desc}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Services */}
      <section id="services" className="bg-white py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="text-balance max-w-xl font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Services built into every order
            </h2>
            <p className="max-w-md text-base leading-7 text-slate-600">
              The marketplace moves the goods. The platform removes the friction
              around them: finding, funding, shipping and checking.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-slate-200 bg-background p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.tile}`}
                  >
                    <s.icon className="h-5 w-5" />
                  </span>
                  {s.soon && (
                    <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200">
                      Coming soon
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
          <Link
            href="/platform"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 hover:text-accent-600"
          >
            See the full platform
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </Container>
      </section>

      {/* Trust */}
      <section className="bg-background py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 rounded-3xl bg-white p-8 ring-1 ring-slate-200 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-success-700">
                Trust &amp; verification
              </p>
              <h2 className="text-balance mt-3 font-serif text-4xl font-semibold tracking-tight text-ink">
                Trade with reviewed businesses only
              </h2>
            </div>
            <ul className="space-y-4">
              {trust.map((t) => (
                <li key={t} className="flex gap-3 text-base text-slate-700">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success-50">
                    <IconCheck className="h-4 w-4 text-success-600" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-background pb-20 sm:pb-24">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#b0164f] px-6 py-14 sm:px-12">
            <div
              className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 grid-cols-4 gap-3 p-6 opacity-30 lg:grid"
              aria-hidden
            >
              {["women-saree", "men-jacket", "kids-girls-dress", "shoes-heels", "bag-tote", "ethnic-sherwani", "acc-watch", "women-dress"].map(
                (f) => (
                  <div key={f} className="relative overflow-hidden rounded-xl bg-white">
                    <Image src={img(f)} alt="" fill unoptimized sizes="10vw" className="object-contain" />
                  </div>
                ),
              )}
            </div>
            <div className="relative max-w-xl">
              <h2 className="text-balance font-serif text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Join the fabric-to-shelf network
              </h2>
              <p className="mt-3 text-base text-rose-100">
                Free to register as a brand, manufacturer or retailer.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-rose-50"
                >
                  I&apos;m a retailer
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  I&apos;m a brand
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  I&apos;m a manufacturer
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
