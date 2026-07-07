import type { Metadata } from "next";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import CTASection from "@/components/CTASection";
import {
  IconBoxes,
  IconCart,
  IconCheck,
  IconLayers,
  IconShieldCheck,
  IconTarget,
  IconTrendingUp,
  IconTruck,
  IconUpload,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Explore GarmentBazaar's AI-first platform: product onboarding, procurement, dynamic pricing, inventory optimization, supply chain orchestration, and retailer recommendations.",
};

const modules = [
  {
    id: "onboarding",
    icon: IconUpload,
    title: "AI Product Onboarding",
    tagline: "From tech pack to live catalog in minutes",
    desc: "GarmentBazaar's AI reads supplier spec sheets, tech packs, and product images to auto-populate structured listings — fabric composition, sizing, construction details, and compliance attributes — without manual data entry.",
    points: [
      "Auto-extraction from PDFs, spreadsheets, and images",
      "Standardized taxonomy across categories and suppliers",
      "Duplicate and inconsistency detection before publishing",
    ],
  },
  {
    id: "procurement",
    icon: IconCart,
    title: "Intelligent Procurement",
    tagline: "Match every order to its best-fit supplier",
    desc: "The platform scores manufacturers and raw material vendors against the buyer's requirements — capacity, minimum order quantity, quality track record, certifications, and lead time — to recommend the strongest matches automatically.",
    points: [
      "Capacity- and quality-aware supplier matching",
      "Automated RFQ distribution and quote comparison",
      "Structured negotiation and order confirmation workflow",
    ],
  },
  {
    id: "pricing",
    icon: IconTrendingUp,
    title: "Dynamic Pricing Engine",
    tagline: "Pricing grounded in real cost signals",
    desc: "Pricing recommendations combine raw material indices, labor cost benchmarks, freight, and historical quote data so brands and manufacturers negotiate from a shared, transparent baseline instead of guesswork.",
    points: [
      "Real-time cost benchmarking by category and region",
      "Margin and landed-cost visibility for every quote",
      "Alerts when quotes deviate from market ranges",
    ],
  },
  {
    id: "inventory",
    icon: IconBoxes,
    title: "Inventory Optimization",
    tagline: "The right stock, in the right place",
    desc: "Demand forecasting models learn from sell-through, seasonality, and regional trends to recommend reorder points, allocation, and markdown timing — reducing both stockouts and excess inventory.",
    points: [
      "SKU-level demand forecasting",
      "Automated reorder point and safety stock recommendations",
      "Markdown and allocation guidance across retail partners",
    ],
  },
  {
    id: "supply-chain",
    icon: IconTruck,
    title: "Supply Chain Orchestration",
    tagline: "Visibility from raw material to retail",
    desc: "Every order is tracked across production milestones and logistics checkpoints. AI flags at-risk shipments, quality holds, and capacity bottlenecks early enough to act on them.",
    points: [
      "End-to-end order and shipment tracking",
      "Predictive delay and risk detection",
      "Automated exception alerts to the right stakeholders",
    ],
  },
  {
    id: "recommendations",
    icon: IconTarget,
    title: "Retailer Recommendations",
    tagline: "Curated assortments, not endless catalogs",
    desc: "A recommendation engine matches retailers with products from vetted brands and manufacturers based on regional demand patterns, price point, and category performance — turning discovery into a targeted shortlist.",
    points: [
      "Regionally tuned assortment recommendations",
      "Performance-based supplier and product ranking",
      "Automated reorder suggestions for fast-moving SKUs",
    ],
  },
];

const trust = [
  {
    icon: IconShieldCheck,
    title: "Verified network",
    desc: "Manufacturer and factory profiles are validated against compliance documentation, certifications, and production history before they appear in matches.",
  },
  {
    icon: IconLayers,
    title: "One connected workflow",
    desc: "Sourcing, procurement, pricing, inventory, and logistics live in a single platform instead of fragmented spreadsheets and messaging threads.",
  },
  {
    icon: IconCheck,
    title: "Human-in-the-loop",
    desc: "AI recommendations are designed to speed up decisions, with people able to review, override, and refine every automated match or price.",
  },
];

export default function PlatformPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-background">
        <Container className="relative py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>The Platform</Eyebrow>
            <h1 className="text-balance mt-6 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              One AI engine, six connected sourcing capabilities
            </h1>
            <p className="text-balance mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              GarmentBazaar applies AI at each stage of the sourcing lifecycle
              — from listing a new product to fulfilling an order — so every
              decision is backed by structured data instead of guesswork.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="space-y-16">
            {modules.map((m, i) => (
              <div
                key={m.id}
                id={m.id}
                className="grid scroll-mt-24 grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center"
              >
                <div
                  className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink">
                    <m.icon className="h-6 w-6 text-accent-300" />
                  </div>
                  <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-accent-600">
                    {m.tagline}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                    {m.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-slate-600">
                    {m.desc}
                  </p>
                </div>
                <div
                  className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <ul className="space-y-4 rounded-2xl border border-slate-200 bg-background p-6">
                    {m.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" />
                        <span className="text-sm leading-6 text-slate-700">
                          {pt}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-background py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Built on trust</Eyebrow>
            <h2 className="text-balance mt-4 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Automation that keeps people in control
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {trust.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl border border-slate-200 bg-white p-8"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-100">
                  <t.icon className="h-5 w-5 text-accent-600" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-ink">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="See the platform in action"
        subtitle="Walk through onboarding, matching, pricing, and supply chain orchestration with our team."
      />
    </>
  );
}
