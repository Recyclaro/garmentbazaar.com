import type { Metadata } from "next";
import MarketplaceClient from "./MarketplaceClient";

export const metadata: Metadata = {
  title: "Marketplace",
  description:
    "Browse GarmentBazaar's directory of AI-verified manufacturers and factories across India's textile hubs. Filter by category, region, and certification, then request a quote.",
};

export default function MarketplacePage() {
  return <MarketplaceClient />;
}
