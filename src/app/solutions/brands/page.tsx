import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
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
  title: "For Brands",
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
      <section className="bg-background">
        <Container className="py-16 sm:py-24">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Eyebrow>For brands and labels</Eyebrow>
              <h1 className="text-balance mt-6 font-serif text-5xl font-semibold leading-[1.04] tracking-tight text-ink sm:text-6xl">
                Put your brand on shelves across India, and beyond.
              </h1>
              <p className="text-balance mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Reach verified boutiques, retail chains, online sellers and
                export buyers from one dashboard. No field sales team needed.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-600 px-7 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-accent-700"
                >
                  List your brand
                  <IconArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-ink px-7 py-3.5 text-base font-semibold text-ink transition hover:bg-white"
                >
                  Talk to our team
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-200 bg-white p-7">
                <p className="text-sm font-semibold text-ink">
                  Your brand dashboard shows
                </p>
                <ul className="mt-5 space-y-3.5">
                  {dashboard.map((d) => (
                    <li
                      key={d}
                      className="flex items-center gap-3 rounded-xl bg-background px-4 py-3 text-sm text-slate-700"
                    >
                      <IconCheck className="h-4 w-4 shrink-0 text-accent-600" />
                      {d}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/collections"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 hover:text-accent-600"
                >
                  See brands already listing
                  <IconArrowRight className="h-4 w-4" />
                </Link>
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
                  <b.icon className="h-6 w-6 text-accent-600" />
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
