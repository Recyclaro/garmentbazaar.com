import PageHero from "@/components/PageHero";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import SupplierCard from "@/components/SupplierCard";
import PhotoStrip from "@/components/PhotoStrip";
import { IconArrowRight, IconCheck } from "@/components/Icons";
import { listApprovedSuppliers, supplierRowToSupplier } from "@/lib/db";

export const metadata: Metadata = {
  title: "Fabric Suppliers & Garment Mills: Sell to Brands",
  alternates: { canonical: "/solutions/manufacturers" },
  description:
    "Mills, fabric suppliers and garment factories sell to verified brands on GarmentBazaar. List fabric, capacity and surplus stock, and receive quote requests directly.",
};

// The supplier strip reads from the database, so render per request.
export const dynamic = "force-dynamic";

const sides = [
  {
    label: "Mills & factories",
    title: "Sell to brands that reorder",
    points: [
      "List fabric, capacity, MOQ and certifications",
      "Receive quote requests straight to your dashboard",
      "Clear surplus and overstock lots",
      "Reviewed listings build buyer trust",
    ],
    cta: "List your mill or factory",
    href: "/signup",
    primary: true,
  },
  {
    label: "Brands & buyers",
    title: "Source fabric and production",
    points: [
      "Filter suppliers by category, region and certification",
      "Compare MOQs before you reach out",
      "Send a quote request in a few clicks",
      "Track every request in your dashboard",
    ],
    cta: "Browse suppliers",
    href: "/marketplace",
    primary: false,
  },
];

const steps = [
  {
    number: "01",
    title: "Create a manufacturer account",
    desc: "Sign up as a manufacturer or factory. It's free.",
  },
  {
    number: "02",
    title: "Add your listing",
    desc: "Category, location, MOQ, certifications and what you make.",
  },
  {
    number: "03",
    title: "Our team reviews it",
    desc: "Listings are checked before they appear in the marketplace.",
  },
  {
    number: "04",
    title: "Receive quote requests",
    desc: "Brands and buyers contact you directly through the platform.",
  },
];

const coming = [
  {
    title: "Swatch and sample orders",
    desc: "Brands order swatch cards before committing to bulk.",
  },
  {
    title: "Bulk fabric RFQs",
    desc: "One request, quotes from matching mills, compared side by side.",
  },
  {
    title: "GB Assure lab testing",
    desc: "Shrinkage, GSM and colour fastness checked before dispatch.",
  },
];

export default function FabricMillsPage() {
  const all = listApprovedSuppliers().map(supplierRowToSupplier);
  const mills = all.filter(
    (s) => s.category === "Fabric & Textiles" || s.category === "Surplus & Overstock"
  );
  const featured = (mills.length >= 3 ? mills : all).slice(0, 6);

  return (
    <>
            {/* Hero */}
      <PageHero
        tone="teal"
        eyebrow="Fabric & mills"
        title="Fabric and production, sourced from verified mills."
        subtitle="Mills, fabric suppliers and garment factories sell to brands on the same platform those brands use to sell to retailers."
        photos={[
          { file: "fabric-denim", alt: "Denim fabric" },
          { file: "fabric-knit", alt: "Knit fabrics" },
          { file: "fabric-cotton", alt: "Cotton fabric" },
          { file: "fabric-linen", alt: "Linen fabric" },
        ]}
        badges={["Receive quote requests", "Listings reviewed"]}
      >
        <Link
          href="/marketplace"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-ink shadow-sm transition hover:bg-teal-50"
        >
          Source fabric
          <IconArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/signup"
          className="inline-flex items-center justify-center rounded-full border border-white/50 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
        >
          Sell fabric
        </Link>
      </PageHero>

      {/* Fabric types */}
      <section className="bg-background pt-16">
        <Container>
          <PhotoStrip
            names={[
              { file: "fabric-cotton", label: "Cotton" },
              { file: "fabric-denim", label: "Denim" },
              { file: "fabric-knit", label: "Knit fabrics" },
              { file: "fabric-synthetic", label: "Synthetics" },
              { file: "fabric-linen", label: "Linen" },
              { file: "fabric-sustainable", label: "Sustainable fabrics" },
            ]}
          />
        </Container>
      </section>

      {/* Two sides */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {sides.map((s) => (
              <div
                key={s.label}
                className="flex flex-col rounded-3xl border border-slate-200 bg-background p-8 sm:p-10"
              >
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-amber-800">
                  {s.label}
                </p>
                <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-ink">
                  {s.title}
                </h2>
                <ul className="mt-6 flex-1 space-y-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3 text-base text-slate-700">
                      <IconCheck className="mt-1 h-4 w-4 shrink-0 text-amber-800" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href={s.href}
                  className={`mt-8 inline-flex items-center justify-center self-start rounded-full px-6 py-3 text-sm font-semibold transition ${
                    s.primary
                      ? "bg-amber-800 text-white hover:bg-amber-900"
                      : "border border-ink text-ink hover:bg-white"
                  }`}
                >
                  {s.cta}
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Live suppliers */}
      {featured.length > 0 && (
        <section className="bg-background py-20 sm:py-24">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                Mills and suppliers on GarmentBazaar
              </h2>
              <Link
                href="/marketplace"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-amber-800 hover:text-amber-900"
              >
                Full marketplace
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((s) => (
                <SupplierCard key={s.slug} supplier={s} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* How it works */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <h2 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            How listing works
          </h2>
          <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.number} className="border-t-2 border-ink pt-5">
                <p className="font-serif text-lg font-semibold text-amber-800">
                  {s.number}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-base leading-7 text-slate-600">{s.desc}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Coming soon */}
      <section className="bg-background py-20 sm:py-24">
        <Container>
          <div className="rounded-3xl bg-amber-50 p-8 sm:p-12">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                The fabric exchange
              </h2>
              <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                Coming soon
              </span>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {coming.map((c) => (
                <div key={c.title} className="rounded-2xl bg-white p-6">
                  <h3 className="text-lg font-semibold text-ink">{c.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-amber-900">
        <Container className="flex flex-col gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-balance font-serif text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Run a mill or factory? List it free.
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-slate-100"
            >
              List your mill or factory
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Talk to our team
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
