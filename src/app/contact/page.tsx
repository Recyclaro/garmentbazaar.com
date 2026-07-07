import type { Metadata } from "next";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import ContactForm from "@/components/ContactForm";
import { IconBuilding, IconFactory, IconStorefront } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with GarmentBazaar to request a demo or learn how our AI-first sourcing platform can work for your brand, factory, or retail business.",
};

const audiences = [
  {
    icon: IconBuilding,
    title: "Brands",
    desc: "Looking to source from vetted manufacturers faster.",
  },
  {
    icon: IconFactory,
    title: "Manufacturers & Factories",
    desc: "Looking to fill capacity with matched orders.",
  },
  {
    icon: IconStorefront,
    title: "Retailers",
    desc: "Looking for AI-curated assortments and replenishment.",
  },
];

export default function ContactPage() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Contact us</Eyebrow>
            <h1 className="text-balance mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Let&apos;s talk about your sourcing needs
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Whether you&apos;re a brand, manufacturer, factory, or retailer,
              tell us a bit about your business and we&apos;ll follow up to
              schedule a walkthrough of GarmentBazaar.
            </p>

            <div className="mt-10 space-y-4">
              {audiences.map((a) => (
                <div key={a.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50">
                    <a.icon className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {a.title}
                    </p>
                    <p className="text-sm leading-6 text-slate-600">
                      {a.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 border-t border-slate-200 pt-8">
              <p className="text-sm font-semibold text-slate-900">
                Prefer email?
              </p>
              <a
                href="mailto:hello@garmentbazaar.com"
                className="text-sm text-amber-700 hover:text-amber-800"
              >
                hello@garmentbazaar.com
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
