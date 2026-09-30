import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import CollectionCard from "@/components/CollectionCard";
import PhotoStrip from "@/components/PhotoStrip";
import { listApprovedCollections, collectionRowToCollection } from "@/lib/db";

// The fresh-collections strip reads from the database, so render per request.
export const dynamic = "force-dynamic";
import {
  IconArrowRight,
  IconBoxes,
  IconCheck,
  IconSearch,
  IconShieldCheck,
  IconTarget,
  IconTruck,
} from "@/components/Icons";

// Three tiers of the network, shown in the hero.
const tiers = [
  {
    step: "01 · Mills & factories",
    title: "Fabric and production",
    desc: "Verified mills and manufacturers with capacity, MOQs and specs listed.",
    image: "/images/products/fabric-cotton.jpg",
    swatch: "",
  },
  {
    step: "02 · Brands",
    title: "Collections in sets",
    desc: "Brands list collections with wholesale pricing and their own MOQ.",
    image: "/images/products/men-polo.jpg",
    swatch: "",
  },
  {
    step: "03 · Retail",
    title: "Every shelf, every city",
    desc: "Boutiques, chains, online sellers and export buyers order direct.",
    image: "/images/products/women-coord.jpg",
    swatch: "",
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
    tone: "text-accent-700",
    button: "bg-accent-600 hover:bg-accent-700",
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
    tone: "text-rose-700",
    button: "bg-rose-600 hover:bg-rose-700",
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
    tone: "text-amber-800",
    button: "bg-amber-800 hover:bg-amber-900",
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
    tone: "text-teal-800",
    button: "bg-teal-700 hover:bg-teal-800",
  },
];

// Department tiles. Each opens /collections filtered to that department;
// photos live in public/images/products.
const departments = [
  { name: "Menswear", image: "hero-men" },
  { name: "Womenswear", image: "hero-women" },
  { name: "Kidswear", image: "hero-kids" },
  { name: "Ethnic & Occasion", image: "ethnic-lehenga" },
  { name: "Activewear", image: "active-yoga" },
  { name: "Innerwear & Sleepwear", image: "inner-sleepwear" },
  { name: "Maternity & Plus Size", image: "maternity-dress" },
  { name: "Footwear", image: "shoes-sports" },
  { name: "Bags & Luggage", image: "bag-handbag" },
  { name: "Accessories", image: "acc-watch" },
  { name: "Uniforms & Workwear", image: "uniform-hospitality" },
  { name: "Home & Lifestyle", image: "home-bedlinen" },
];

const steps = [
  {
    number: "01",
    title: "Create your account",
    desc: "Sign up as a brand, manufacturer or retailer. Listings are reviewed before they go live.",
  },
  {
    number: "02",
    title: "Discover",
    desc: "Browse brand collections and the supplier marketplace, filtered by category and MOQ.",
  },
  {
    number: "03",
    title: "Order or request a quote",
    desc: "Order collections at the brand's MOQ, or send a quote request to a manufacturer.",
  },
  {
    number: "04",
    title: "Track in your dashboard",
    desc: "Orders and quote requests stay in one place for buyers and sellers alike.",
  },
];

const services = [
  {
    icon: IconSearch,
    title: "AI sourcing",
    desc: "Match styles to suppliers on capacity, quality, lead time and MOQ fit.",
    soon: false,
  },
  {
    icon: IconTarget,
    title: "Demand insights",
    desc: "Reorder and sell-through signals fed back to brands and mills.",
    soon: false,
  },
  {
    icon: IconBoxes,
    title: "GB Credit",
    desc: "Buyers pay in 30 to 90 days; sellers get paid on dispatch.",
    soon: true,
  },
  {
    icon: IconTruck,
    title: "GB Logistics",
    desc: "Pickup, pan-India delivery and export freight at pooled rates.",
    soon: true,
  },
  {
    icon: IconShieldCheck,
    title: "GB Assure",
    desc: "Pre-dispatch inspection and fabric lab tests on bulk orders.",
    soon: true,
  },
];

const trust = [
  "Every brand and factory listing is reviewed before it goes live",
  "Separate accounts and dashboards for brands, manufacturers and retailers",
  "Orders and quote requests recorded with a full history",
  "Collections sold at the MOQ the brand sets, with no middlemen",
];

export default function Home() {
  const fresh = listApprovedCollections()
    .map(collectionRowToCollection)
    .filter((c) => c.imagePath)
    .slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <Container className="py-16 sm:py-24">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Eyebrow className="text-rose-700">
                B2B for fashion, lifestyle &amp; fabric
              </Eyebrow>
              <h1 className="text-balance mt-6 font-serif text-5xl font-semibold leading-[1.03] tracking-tight text-ink sm:text-7xl">
                From fabric to shelf.
                <br />
                One network.
              </h1>
              <p className="text-balance mt-6 max-w-xl text-lg leading-8 text-slate-600">
                GarmentBazaar connects mills, manufacturers, brands and
                retailers on one verified platform. Source production, sell
                collections wholesale, and buy branded stock direct.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/collections"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-600 px-7 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-accent-700"
                >
                  Start buying
                  <IconArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-full border border-ink px-7 py-3.5 text-base font-semibold text-ink transition hover:bg-white"
                >
                  List your brand
                </Link>
              </div>
              <p className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-500">
                <span>Brand-set MOQs</span>
                <span aria-hidden>·</span>
                <span>Reviewed listings</span>
                <span aria-hidden>·</span>
                <span>Direct from brands and factories</span>
              </p>
            </div>

            <div className="flex flex-col gap-3.5 lg:col-span-5">
              {tiers.map((t, i) => (
                <div
                  key={t.step}
                  className={`flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 ${
                    i === 1 ? "lg:ml-8" : i === 2 ? "lg:ml-16" : ""
                  }`}
                >
                  {t.image ? (
                    <Image
                      src={t.image}
                      alt=""
                      width={72}
                      height={88}
                      unoptimized
                      className="h-22 w-18 shrink-0 rounded-xl bg-slate-100 object-cover"
                    />
                  ) : (
                    <div
                      className={`h-22 w-18 shrink-0 rounded-xl ${t.swatch}`}
                      aria-hidden
                    />
                  )}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {t.step}
                    </p>
                    <p className="mt-1 font-serif text-xl font-semibold text-ink">
                      {t.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {t.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Doors */}
      <section id="doors" className="bg-white py-20 sm:py-24">
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
                className="flex flex-col rounded-2xl border border-slate-200 bg-background p-7"
              >
                <p
                  className={`text-xs font-bold uppercase tracking-[0.1em] ${d.tone}`}
                >
                  {d.label}
                </p>
                <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight text-ink">
                  {d.title}
                </h3>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {d.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm leading-6 text-slate-600">
                      <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-4">
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
            ))}
          </div>
        </Container>
      </section>

      {/* Catalogue */}
      <section id="catalogue" className="bg-background py-20 sm:py-24">
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
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {departments.map((d, i) => (
              <Link
                key={d.name}
                href={`/collections?category=${encodeURIComponent(d.name)}`}
                className={`group ${i < 3 ? "lg:col-span-2" : ""}`}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl bg-[#f1efeb] ${
                    i < 3 ? "h-72 sm:h-80" : "h-52"
                  }`}
                >
                  <Image
                    src={`/images/products/${d.image}.jpg`}
                    alt={d.name}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 33vw, 50vw"
                    className="object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-base font-semibold text-ink">
                  {d.name}
                  <IconArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Fresh collections */}
      {fresh.length > 0 && (
        <section className="bg-white py-20 sm:py-24">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                Fresh collections
              </h2>
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
      <section className="bg-background py-20 sm:py-24">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Fabric &amp; materials
            </h2>
            <Link
              href="/solutions/manufacturers"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-amber-800 hover:text-amber-900"
            >
              Source from mills
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <PhotoStrip
            className="mt-10"
            names={[
              { file: "fabric-cotton", label: "Cotton" },
              { file: "fabric-denim", label: "Denim" },
              { file: "fabric-linen", label: "Linen" },
              { file: "fabric-knit", label: "Knit fabrics" },
              { file: "fabric-synthetic", label: "Synthetics" },
              { file: "fabric-sustainable", label: "Sustainable fabrics" },
            ]}
          />
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <h2 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            How it works
          </h2>
          <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.number} className="border-t-2 border-ink pt-5">
                <p className="font-serif text-lg font-semibold text-rose-700">
                  {s.number}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-base leading-7 text-slate-600">{s.desc}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Services */}
      <section id="services" className="bg-background py-20 sm:py-24">
        <Container>
          <div className="rounded-3xl bg-accent-50 p-8 sm:p-12">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="text-balance max-w-xl font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                Services built into every order
              </h2>
              <p className="max-w-md text-base leading-7 text-slate-700">
                The marketplace moves the goods. The platform removes the
                friction around them: finding, funding, shipping and checking.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {services.map((s) => (
                <div key={s.title} className="rounded-2xl bg-white p-6">
                  <div className="flex items-center justify-between gap-2">
                    <s.icon className="h-6 w-6 text-accent-600" />
                    {s.soon && (
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
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
          </div>
        </Container>
      </section>

      {/* Trust */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <h2 className="text-balance font-serif text-4xl font-semibold tracking-tight text-ink">
              Trade with reviewed businesses only
            </h2>
            <ul className="space-y-4">
              {trust.map((t) => (
                <li key={t} className="flex gap-3 text-base text-slate-700">
                  <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-success-600" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-ink">
        <Container className="flex flex-col gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-balance font-serif text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Join the fabric-to-shelf network
            </h2>
            <p className="mt-3 text-base text-slate-400">
              Free to register as a brand, manufacturer or retailer.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-slate-100"
            >
              I&apos;m a retailer
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              I&apos;m a brand
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              I&apos;m a manufacturer
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
