import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import { IconBuilding, IconFactory, IconStorefront } from "@/components/Icons";
import { getSupplierBySlug } from "@/lib/db";

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

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ supplier?: string }>;
}) {
  const { supplier: supplierSlug } = await searchParams;
  const supplier = supplierSlug ? getSupplierBySlug(supplierSlug) : undefined;
  const defaultMessage = supplier
    ? `I'm interested in sourcing from ${supplier.name}.`
    : undefined;

  return (
    <section className="bg-background py-10 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div
            className="rounded-[2rem] bg-[#16335e] p-8 text-white sm:p-10 lg:col-span-5"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.09) 1.5px, transparent 1.5px)",
              backgroundSize: "22px 22px",
            }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
              Contact us
            </p>
            <h1 className="text-balance mt-4 font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Let&apos;s talk about your sourcing needs
            </h1>
            <p className="mt-4 text-base leading-7 text-white/80">
              Whether you&apos;re a brand, manufacturer, factory, or retailer,
              tell us a bit about your business and we&apos;ll follow up to
              schedule a walkthrough of GarmentBazaar.
            </p>

            <div className="mt-10 space-y-4">
              {audiences.map((a) => (
                <div key={a.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <a.icon className="h-5 w-5 text-amber-300" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {a.title}
                    </p>
                    <p className="text-sm leading-6 text-white/75">
                      {a.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3">
              {["hero-women", "fabric-denim", "shoes-formal"].map((f) => (
                <div key={f} className="relative h-24 overflow-hidden rounded-xl bg-white">
                  <Image
                    src={`/images/products/${f}.jpg`}
                    alt=""
                    fill
                    unoptimized
                    sizes="12vw"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-white/15 pt-6">
              <p className="text-sm font-semibold text-white">
                Prefer email?
              </p>
              <a
                href="mailto:hello@garmentbazaar.com"
                className="text-sm text-amber-300 hover:text-amber-200"
              >
                hello@garmentbazaar.com
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="h-full rounded-[2rem] bg-white p-6 ring-1 ring-slate-200 sm:p-10">
              <ContactForm
                defaultMessage={defaultMessage}
                supplierSlug={supplier?.slug}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
