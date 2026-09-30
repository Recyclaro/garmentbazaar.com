import PageHero from "@/components/PageHero";
import DeptMarquee from "@/components/DeptMarquee";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import CollectionCard from "@/components/CollectionCard";
import { IconArrowRight } from "@/components/Icons";
import { listApprovedCollections, collectionRowToCollection } from "@/lib/db";

export const metadata: Metadata = {
  title: "For Retailers",
  description:
    "Buy branded fashion and lifestyle stock at wholesale price, direct from brands, at each brand's minimum order quantity.",
};

// The live collections strip reads from the database, so render per request.
export const dynamic = "force-dynamic";

const buyers = [
  {
    title: "Boutiques and MBOs",
    band: "bg-[#b0164f]",
    desc: "Mix brands in one place and order only the MOQ each brand sets.",
  },
  {
    title: "Retail chains",
    band: "bg-[#16335e]",
    desc: "Source seasonal lines and larger quantities direct from brands.",
  },
  {
    title: "Online and D2C sellers",
    band: "bg-accent-600",
    desc: "Collections come with real product photos you can review before ordering.",
  },
  {
    title: "Export buyers",
    band: "bg-[#0f766e]",
    desc: "Tell us what you need and we'll connect you with brands and factories.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create a retailer account",
    desc: "Sign up with your store details. It's free.",
  },
  {
    number: "02",
    title: "Browse collections",
    desc: "Filter by category and compare price per unit and MOQ.",
  },
  {
    number: "03",
    title: "Order direct from the brand",
    desc: "Place your order at the brand's MOQ. No middlemen.",
  },
  {
    number: "04",
    title: "Track it in your dashboard",
    desc: "Your full order history stays in one place for reorders.",
  },
];

export default function RetailersPage() {
  const fresh = listApprovedCollections()
    .map(collectionRowToCollection)
    .slice(0, 4);

  return (
    <>
            {/* Hero */}
      <PageHero
        tone="rose"
        eyebrow="For retailers and buyers"
        title="Branded stock for your store, at wholesale price."
        subtitle="Buy direct from verified brands at the MOQ they set, and get it delivered to your door. No trips to the mandi."
        photos={[
          { file: "women-dress", alt: "Dress" },
          { file: "men-polo", alt: "Polo shirt" },
          { file: "shoes-sports", alt: "Sports shoes" },
          { file: "kids-girls-dress", alt: "Girls dress" },
        ]}
        badges={["Buy at the brand's MOQ", "No middlemen"]}
      >
        <Link
          href="/collections"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-ink shadow-sm transition hover:bg-rose-50"
        >
          Start buying
          <IconArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/signup"
          className="inline-flex items-center justify-center rounded-full border border-white/50 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
        >
          Create a free account
        </Link>
      </PageHero>

      <div className="mt-10">
        <DeptMarquee />
      </div>

      {/* Buyer types */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {buyers.map((b) => (
              <div
                key={b.title}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-background transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5"
              >
                <div className={`h-1.5 ${b.band}`} />
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-ink">{b.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Live collections */}
      {fresh.length > 0 && (
        <section className="bg-white py-20 sm:py-24">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                Fresh from brands
              </h2>
              <Link
                href="/collections"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-rose-700 hover:text-rose-600"
              >
                All collections
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

      {/* GB Credit */}
      <section className="bg-background py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-10 rounded-3xl bg-ink p-8 sm:p-12 lg:flex-row lg:items-center">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-300">
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
                Credit periods for verified retailers through lending partners,
                chosen at checkout.
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
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-slate-100"
              >
                Tell me when it launches
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* How buying works */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <h2 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            How buying works
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

      {/* CTA */}
      <section className="bg-rose-700">
        <Container className="flex flex-col gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-balance font-serif text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Open your buyer account
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-slate-100"
            >
              Create account
            </Link>
            <Link
              href="/collections"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Browse collections
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
