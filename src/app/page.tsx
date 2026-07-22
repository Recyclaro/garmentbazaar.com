import Link from "next/link";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import CTASection from "@/components/CTASection";
import HeroCollage from "@/components/HeroCollage";
import { listApprovedSuppliers } from "@/lib/db";
import {
  IconArrowRight,
  IconBolt,
  IconBoxes,
  IconBuilding,
  IconCart,
  IconCheck,
  IconFactory,
  IconLayers,
  IconShieldCheck,
  IconSparkles,
  IconStorefront,
  IconTarget,
  IconTrendingUp,
  IconTruck,
  IconUpload,
} from "@/components/Icons";

// The manufacturer count and region count are computed live from the
// database in Home() below, not hardcoded — so the homepage never claims a
// number that isn't actually true of the current marketplace. That live
// read also means the page is rendered per-request rather than served as
// a static build-time snapshot (same reasoning as /marketplace).
export const dynamic = "force-dynamic";

const capabilities = [
  {
    icon: IconUpload,
    title: "AI Product Onboarding",
    desc: "Catalog new styles in minutes. AI extracts specs, fabric composition, sizing, and compliance data from supplier sheets, images, and tech packs.",
  },
  {
    icon: IconCart,
    title: "Intelligent Procurement",
    desc: "AI matches buyers to the right manufacturers and raw material vendors based on capacity, quality history, lead time, and MOQ fit.",
  },
  {
    icon: IconTrendingUp,
    title: "Dynamic Pricing",
    desc: "Cost and market-aware pricing engines benchmark quotes against fabric, labor, and freight indices in real time.",
  },
  {
    icon: IconBoxes,
    title: "Inventory Optimization",
    desc: "Demand forecasting and reorder-point automation reduce stockouts and excess inventory across brands and retailers.",
  },
  {
    icon: IconTruck,
    title: "Supply Chain Orchestration",
    desc: "End-to-end visibility from raw material to shipment, with AI flagging delays, quality risks, and capacity bottlenecks early.",
  },
  {
    icon: IconTarget,
    title: "Retailer Recommendations",
    desc: "A recommendation engine matches retailers with fast-moving, regionally relevant products from vetted brands and manufacturers.",
  },
];

const personas = [
  {
    icon: IconBuilding,
    title: "Brands",
    desc: "Discover Indian manufacturers, automate quoting and quality checks, and launch new styles faster — without a sourcing office on the ground.",
    href: "/solutions/brands",
  },
  {
    icon: IconFactory,
    title: "Manufacturers & Factories",
    desc: "Get discovered by global buyers, fill production capacity with matched orders, and get paid on predictable terms.",
    href: "/solutions/manufacturers",
  },
  {
    icon: IconStorefront,
    title: "Retailers",
    desc: "Source wholesale assortments directly from Indian factories, with AI matching regional demand to the right mix.",
    href: "/solutions/retailers",
  },
];

const steps = [
  {
    number: "01",
    title: "Onboard",
    desc: "Buyers and manufacturers onboard in days, not months. AI ingests catalogs, capacity, and compliance documents automatically.",
  },
  {
    number: "02",
    title: "Match",
    desc: "AI matches sourcing needs with the best-fit supply partners using quality, cost, capacity, and lead-time signals.",
  },
  {
    number: "03",
    title: "Transact",
    desc: "Quoting, pricing, and order confirmation happen inside one workflow, with full audit trails and standardized terms.",
  },
  {
    number: "04",
    title: "Fulfill",
    desc: "Supply chain orchestration tracks production and logistics end-to-end, with AI surfacing risks before they cause delays.",
  },
];

const pillars = [
  {
    icon: IconSparkles,
    title: "AI-first, not AI-bolted-on",
    desc: "Every core workflow — onboarding, matching, pricing, inventory — is built around automation from day one.",
  },
  {
    icon: IconShieldCheck,
    title: "Trust & verification",
    desc: "Structured supplier profiles with clear verification status, so buyers know exactly what they're getting before they commit.",
  },
  {
    icon: IconBolt,
    title: "Speed to shelf",
    desc: "Compress cross-border sourcing cycles from weeks to days by removing manual back-and-forth.",
  },
  {
    icon: IconLayers,
    title: "One ecosystem",
    desc: "Global buyers and Indian manufacturers operate on one shared, connected platform.",
  },
];

export default async function Home() {
  const approvedSuppliers = await listApprovedSuppliers();
  const manufacturerCount = approvedSuppliers.length;
  const regionCount = new Set(approvedSuppliers.map((s) => s.region)).size;

  const stats = [
    {
      value: `${Math.floor(manufacturerCount / 10) * 10}+`,
      label: "Manufacturers Listed",
    },
    { value: `${regionCount}`, label: "Sourcing Regions in India" },
    { value: "6", label: "AI-Powered Modules" },
    { value: "Minutes", label: "Onboarding Time" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background">
        <Container className="relative py-16 sm:py-24">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <Eyebrow>AI-First B2B Sourcing</Eyebrow>
              <h1 className="text-balance mt-6 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
                Source Better. Source Faster.
                <br />
                <span className="relative inline-block">
                  Source with Confidence.
                  <span
                    className="absolute inset-x-0 -bottom-1 h-1 rounded-full bg-accent-400/70"
                    aria-hidden
                  />
                </span>
              </h1>
              <p className="text-balance mt-6 max-w-xl text-lg leading-8 text-slate-600">
                GarmentBazaar connects global buyers with verified Indian
                fabric and garment manufacturers through AI-powered supplier
                discovery, transparent sourcing, and end-to-end procurement
                tools.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-700"
                >
                  Request a Demo
                  <IconArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/marketplace"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-slate-50"
                >
                  Browse the Marketplace
                </Link>
              </div>

              <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-serif text-3xl font-bold text-ink">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <HeroCollage />
            </div>
          </div>
        </Container>
      </section>

      {/* Persona strip */}
      <section className="bg-white py-14">
        <Container>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {personas.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="group rounded-2xl border border-slate-200 bg-background p-5 transition hover:border-accent-200 hover:bg-accent-50/60"
              >
                <p.icon className="h-6 w-6 text-accent-600" />
                <h3 className="mt-3 text-sm font-semibold text-ink">{p.title}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">{p.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent-600 opacity-0 transition group-hover:opacity-100">
                  Learn more <IconArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Problem / Solution */}
      <section className="bg-background py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">
            <div>
              <Eyebrow>The problem</Eyebrow>
              <h2 className="text-balance mt-4 font-serif text-3xl font-semibold tracking-tight text-ink">
                Sourcing from India still runs on spreadsheets, WhatsApp, and guesswork
              </h2>
              <ul className="mt-8 space-y-4">
                {[
                  "No reliable way to discover and vet Indian manufacturers without visiting in person",
                  "Pricing negotiated ad hoc over WhatsApp, with no cost or market benchmarking",
                  "Inventory and reorder decisions made on intuition, thousands of miles from the factory floor",
                  "Supply chain visibility that ends the moment an order is placed",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-slate-600">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                    <span className="leading-7">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow>The GarmentBazaar approach</Eyebrow>
              <h2 className="text-balance mt-4 font-serif text-3xl font-semibold tracking-tight text-ink">
                One AI-powered platform, from the Indian factory floor to your shelf
              </h2>
              <ul className="mt-8 space-y-4">
                {[
                  "Structured supplier profiles with clear verification status on every listing",
                  "Automated, benchmarked pricing across cost, quality, and lead time",
                  "AI-driven demand forecasting and replenishment recommendations",
                  "Continuous supply chain visibility with proactive risk alerts",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-slate-700">
                    <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" />
                    <span className="leading-7">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Capabilities grid */}
      <section id="capabilities" className="bg-white py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Core capabilities</Eyebrow>
            <h2 className="text-balance mt-4 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              AI embedded in every sourcing decision
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              From the first product upload to the final mile, GarmentBazaar
              automates the decisions that used to take teams of people and
              weeks of cross-border back-and-forth.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-slate-200 bg-background p-6 transition hover:border-accent-200 hover:shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink">
                  <c.icon className="h-5 w-5 text-accent-300" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-ink">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/platform"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 hover:text-accent-600"
            >
              See the full platform
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-background py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="text-balance mt-4 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Onboard, match, transact, fulfill
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.number} className="relative">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-3xl font-bold text-accent-200">
                    {s.number}
                  </span>
                  {i < steps.length - 1 && (
                    <span className="hidden h-px flex-1 bg-slate-200 lg:block" />
                  )}
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Who it's for */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Who it&apos;s for</Eyebrow>
            <h2 className="text-balance mt-4 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Built for global buyers and Indian manufacturers alike
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {personas.map((p) => (
              <div
                key={p.title}
                className="flex flex-col rounded-2xl border border-slate-200 bg-background p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100">
                  <p.icon className="h-6 w-6 text-accent-600" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                  {p.desc}
                </p>
                <Link
                  href={p.href}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 hover:text-accent-600"
                >
                  See solutions for {p.title.toLowerCase()}
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why AI-first */}
      <section className="bg-background py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <Eyebrow>Why AI-first</Eyebrow>
              <h2 className="text-balance mt-4 font-serif text-3xl font-semibold tracking-tight text-ink">
                Built to be intelligent from the ground up
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                GarmentBazaar isn&apos;t a directory with AI features bolted on.
                Automation and data intelligence are the foundation of how the
                platform operates.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
              {pillars.map((p) => (
                <div key={p.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink">
                    <p.icon className="h-5 w-5 text-accent-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        title="Ready to source better from India?"
        subtitle="Tell us what you're looking to source, and see how GarmentBazaar connects you with Indian manufacturers, transparent pricing, and end-to-end visibility."
        secondaryLabel="Browse the Marketplace"
        secondaryHref="/marketplace"
      />
    </>
  );
}
