import type { Metadata } from "next";
import SolutionPage from "@/components/SolutionPage";
import {
  IconBoxes,
  IconCart,
  IconShieldCheck,
  IconTruck,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Solutions for Manufacturers & Factories",
  description:
    "GarmentBazaar helps manufacturers and factories fill production capacity with matched, ready-to-produce orders and streamlined compliance.",
};

export default function ManufacturersPage() {
  return (
    <SolutionPage
      eyebrow="For Manufacturers & Factories"
      title="Fill capacity with orders that actually fit"
      subtitle="Get matched with brands and retailers whose requirements fit your capacity, capabilities, and lead times — with less time spent chasing leads that never convert."
      painPoints={[
        "Inconsistent order flow makes production planning difficult",
        "Time spent on RFQs that don't match your capabilities or MOQ",
        "Payment terms and order confirmations negotiated informally",
        "No structured way to showcase quality certifications and track record",
      ]}
      solutionPoints={[
        "AI surfaces your factory to buyers whose requirements match your real capacity and specialization",
        "Structured RFQs mean you only quote on orders you can realistically win and fulfill",
        "Standardized order and payment workflows reduce disputes and delays",
        "Verified profiles highlight your certifications, quality history, and capabilities",
      ]}
      features={[
        {
          icon: IconCart,
          title: "Intelligent Procurement Matching",
          desc: "Get matched to buyer requirements that fit your production lines, MOQ, and lead times.",
        },
        {
          icon: IconBoxes,
          title: "Capacity Planning Signals",
          desc: "Understand incoming demand patterns to plan production capacity ahead of time.",
        },
        {
          icon: IconTruck,
          title: "Supply Chain Orchestration",
          desc: "Track shared visibility on order status and logistics milestones with your buyers.",
        },
        {
          icon: IconShieldCheck,
          title: "Verified Factory Profile",
          desc: "Showcase compliance certifications, quality history, and specializations to serious buyers.",
        },
      ]}
      ctaTitle="Get matched with the right buyers"
      ctaSubtitle="Tell us about your production capacity and specializations, and we'll show you how AI-matched sourcing fills your order book."
    />
  );
}
