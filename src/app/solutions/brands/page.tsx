import PageHero from "@/components/PageHero";
import DeptBand from "@/components/DeptBand";
import { departments } from "@/data/departments";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import {
  IconArrowRight,
  IconBoxes,
  IconCart,
  IconCheck,
  IconFactory,
  IconStorefront,
  IconTarget,
  IconUpload,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Sell Your Brand Wholesale to Retailers Across India",
  alternates: { canonical: "/solutions/brands" },
  description:
    "List your fashion and lifestyle collections on GarmentBazaar and sell wholesale to boutiques, retail chains, online sellers and export buyers across India.",
};

const benefits = [
  {
    icon: IconStorefront,
    title: "Reach retailers across India",
    desc: "Boutiques, multi-brand stores, chains and online sellers browse your collections in one place.",
    soon: false,
  },
  {
    icon: IconBoxes,
    title: "Sell at your own MOQ",
    desc: "Set your wholesale price per unit and the minimum order quantity for every collection.",
    soon: false,
  },
  {
    icon: IconUpload,
    title: "Show real product photos",
    desc: "Upload photos with each collection so buyers see exactly what they are ordering.",
    soon: false,
  },
  {
    icon: IconCart,
    title: "Orders in one dashboard",
    desc: "Every retailer order lands in your brand dashboard, with the buyer's details and quantity.",
    soon: false,
  },
  {
    icon: IconFactory,
    title: "Source production here too",
    desc: "Find manufacturers in the marketplace and send quote requests from the same account.",
    soon: false,
  },
  {
    icon: IconTarget,
    title: "Get paid on dispatch",
    desc: "GB Credit will carry the buyer's credit period so you are paid when goods ship.",
    soon: true,
  },
];

const steps = [
  {
    number: "01",
    title: "Create a brand account",
    desc: "Sign up as a brand with your company name and contact details.",
  },
  {
    number: "02",
    title: "Add your collections",
    desc: "Photos, description, category, wholesale price and MOQ for each collection.",
  },
  {
    number: "03",
    title: "Our team reviews it",
    desc: "Every listing is checked before it goes live, so buyers trust what they see.",
  },
  {
    number: "04",
    title: "Retailers order direct",
    desc: "Orders arrive in your dashboard. You fulfil them and grow repeat buyers.",
  },
];

const dashboard = [
  "Your live and pending collections",
  "Orders received from retailers",
  "Quote requests you've sent to manufacturers",
  "Listing status after review",
];

export default function BrandsPage() {
  return (
    <>
            {/* Hero */}
      <PageHero
        tone="violet"
        eyebrow="For brands and labels"
        title="Put your brand on shelves across India, and beyond."
        subtitle="Reach verified boutiques, retail chains, online sellers and export buyers from one dashboard. No field sales team needed."
        photos={[
          { file: "men-suit", alt: "Tailored suit" },
          { file: "women-coord", alt: "Co-ord set" },
          { file: "bag-handbag", alt: "Handbag" },
          { file: "ethnic-lehenga", alt: "Lehenga" },
        ]}
        badges={["Sell at your own MOQ", "Listings reviewed"]}
      >
        <Link
          href="/signup"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-ink shadow-sm transition hover:bg-accent-50"
        >
          List your brand
          <IconArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full border border-white/50 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
        >
          Talk to our team
        </Link>
      </PageHero>

      {/* Dashboard + departments */}
      <section className="bg-background py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="h-full rounded-3xl bg-ink p-7 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-300">
                  Your brand dashboard
                </p>
                <ul className="mt-6 space-y-3">
                  {dashboard.map((d) => (
                    <li
                      key={d}
                      className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm"
                    >
                      <IconCheck className="h-4 w-4 shrink-0 text-accent-300" />
                      {d}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/collections"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-200 hover:text-white"
                >
                  See brands already listing
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">
                Departments you can sell in
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {departments.slice(0, 4).map((d) => (
                  <DeptBand key={d.name} dept={d} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <h2 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            What you get
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-slate-200 bg-background p-7"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-100 text-accent-700">
                    <b.icon className="h-5 w-5" />
                  </span>
                  {b.soon && (
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                      Coming soon
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-ink">{b.title}</h3>
                <p className="mt-2 text-base leading-7 text-slate-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How listing works */}
      <section className="bg-background py-20 sm:py-24">
        <Container>
          <h2 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            How listing works
          </h2>
          <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.number} className="border-t-2 border-ink pt-5">
                <p className="font-serif text-lg font-semibold text-accent-600">
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
      <section className="bg-accent-700">
        <Container className="flex flex-col gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-balance font-serif text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Bring your next collection to GarmentBazaar
            </h2>
            <p className="mt-3 text-base text-accent-100">
              Free to create a brand account. Listings go live after review.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-slate-100"
            >
              List your brand
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
