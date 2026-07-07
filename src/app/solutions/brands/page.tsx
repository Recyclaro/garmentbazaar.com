import type { Metadata } from "next";
import SolutionPage from "@/components/SolutionPage";
import {
  IconCart,
  IconShieldCheck,
  IconTrendingUp,
  IconUpload,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Solutions for Brands",
  description:
    "GarmentBazaar helps fashion and lifestyle brands discover AI-vetted manufacturers, automate quoting, and launch new styles faster.",
};

export default function BrandsPage() {
  return (
    <SolutionPage
      eyebrow="For Brands"
      title="Source faster, with manufacturers you can trust"
      subtitle="Discover AI-vetted manufacturers and factories, automate quoting and quality checks, and take new styles from concept to production without the usual back-and-forth."
      painPoints={[
        "Finding the right manufacturer relies on personal networks and trial and error",
        "Quoting cycles take weeks of email and WhatsApp negotiation",
        "Quality and compliance are hard to verify before placing an order",
        "Little visibility into production status once an order is placed",
      ]}
      solutionPoints={[
        "AI matches your product requirements to manufacturers by capacity, quality history, and lead time",
        "Standardized RFQs and benchmarked pricing speed up negotiation",
        "Manufacturer profiles include verified compliance and production history",
        "Live order tracking from raw material to shipment",
      ]}
      features={[
        {
          icon: IconUpload,
          title: "AI Product Onboarding",
          desc: "Upload a tech pack or reference image and get a structured, ready-to-quote product listing in minutes.",
        },
        {
          icon: IconCart,
          title: "Intelligent Procurement",
          desc: "Get matched with manufacturers that fit your MOQ, quality bar, and timeline — not just whoever answers first.",
        },
        {
          icon: IconTrendingUp,
          title: "Dynamic Pricing",
          desc: "Negotiate from a shared, cost-benchmarked baseline instead of opaque quotes.",
        },
        {
          icon: IconShieldCheck,
          title: "Verified Manufacturer Network",
          desc: "Every factory profile is checked against compliance documentation and production history before it's shown to you.",
        },
      ]}
      ctaTitle="Bring your next collection to GarmentBazaar"
      ctaSubtitle="Tell us what you're sourcing and we'll show you how AI-matched manufacturing works for your brand."
    />
  );
}
