import type { Metadata } from "next";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import CTASection from "@/components/CTASection";
import {
  IconBolt,
  IconLayers,
  IconShieldCheck,
  IconSparkles,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "GarmentBazaar's mission is to become the AI-first B2B fashion sourcing platform for India's fashion and lifestyle ecosystem.",
};

const values = [
  {
    icon: IconSparkles,
    title: "AI-first",
    desc: "We build automation into the core of every workflow, not as an add-on feature.",
  },
  {
    icon: IconShieldCheck,
    title: "Trust through data",
    desc: "Structured, verifiable data replaces relationship-driven guesswork across the supply chain.",
  },
  {
    icon: IconBolt,
    title: "Speed with rigor",
    desc: "We compress sourcing timelines without cutting corners on quality or compliance.",
  },
  {
    icon: IconLayers,
    title: "One ecosystem",
    desc: "Brands, manufacturers, factories, and retailers should operate on shared infrastructure, not siloed tools.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950">
        <div className="bg-grid pointer-events-none absolute inset-0" />
        <Container className="relative py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow light>About GarmentBazaar</Eyebrow>
            <h1 className="text-balance mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Building the AI-first backbone of fashion sourcing
            </h1>
            <p className="text-balance mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              GarmentBazaar exists to connect brands, manufacturers, factories,
              and retailers across India&apos;s fashion and lifestyle ecosystem
              on a single, intelligent platform.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Eyebrow>Our mission</Eyebrow>
            <h2 className="text-balance mt-4 text-3xl font-semibold tracking-tight text-slate-900">
              Make sourcing decisions as fast and reliable as the products
              they produce
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
              <p>
                India&apos;s fashion and lifestyle ecosystem runs on deep
                manufacturing expertise, but the process of connecting demand
                to supply is still largely manual — built on personal
                networks, spreadsheets, and endless rounds of messaging.
              </p>
              <p>
                GarmentBazaar aims to become the AI-first B2B sourcing and
                supply chain platform for this ecosystem: automating product
                onboarding, procurement, pricing, inventory optimization,
                supply chain decisions, and retailer recommendations, so
                every participant — from factory floor to retail shelf — can
                move faster and with better information.
              </p>
              <p>
                We&apos;re starting with the highest-friction parts of the
                sourcing lifecycle and building outward into a connected
                platform that brands, manufacturers, factories, and retailers
                can all rely on.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>What we believe</Eyebrow>
            <h2 className="text-balance mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Our operating principles
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900">
                  <v.icon className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-slate-900">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Join us in rebuilding fashion sourcing"
        subtitle="Whether you're a brand, manufacturer, factory, or retailer, we'd love to hear from you."
        primaryLabel="Get in Touch"
      />
    </>
  );
}
