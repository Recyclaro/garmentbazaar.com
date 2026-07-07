import type { Metadata } from "next";
import SolutionPage from "@/components/SolutionPage";
import {
  IconBoxes,
  IconTarget,
  IconTrendingUp,
  IconTruck,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Solutions for Retailers",
  description:
    "GarmentBazaar helps retailers stock the right products automatically with AI-curated assortments and inventory optimization.",
};

export default function RetailersPage() {
  return (
    <SolutionPage
      eyebrow="For Retailers"
      title="Stock the right products, automatically"
      subtitle="Get AI-curated assortments from vetted brands and manufacturers, tuned to regional demand, with inventory recommendations that keep shelves full without overstocking."
      painPoints={[
        "Assortment decisions are based on gut feel rather than regional demand data",
        "Discovering new brands and products means sifting through countless catalogs",
        "Reorder timing is reactive, leading to stockouts or excess inventory",
        "Little insight into which products are outperforming across similar stores",
      ]}
      solutionPoints={[
        "AI recommends assortments based on regional demand patterns and category performance",
        "A curated shortlist of relevant products replaces manual catalog browsing",
        "Automated reorder point recommendations reduce stockouts and overstock",
        "Performance benchmarking shows what's working across comparable retailers",
      ]}
      features={[
        {
          icon: IconTarget,
          title: "Retailer Recommendations",
          desc: "Get matched with fast-moving, regionally relevant products from vetted brands and manufacturers.",
        },
        {
          icon: IconBoxes,
          title: "Inventory Optimization",
          desc: "SKU-level demand forecasting drives reorder point and allocation recommendations.",
        },
        {
          icon: IconTrendingUp,
          title: "Performance Benchmarking",
          desc: "See how products and categories are performing across similar retail partners.",
        },
        {
          icon: IconTruck,
          title: "Supply Chain Visibility",
          desc: "Track incoming orders and shipments end-to-end so replenishment stays on schedule.",
        },
      ]}
      ctaTitle="Build a smarter assortment"
      ctaSubtitle="Tell us about your stores and category mix, and we'll show you how AI-curated sourcing keeps shelves full."
    />
  );
}
