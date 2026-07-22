import type { Metadata } from "next";
import MarketplaceClient from "./MarketplaceClient";
import { listApprovedSuppliers, supplierRowToSupplier } from "@/lib/db";

export const metadata: Metadata = {
  title: "Marketplace",
  description:
    "Browse GarmentBazaar's directory of AI-verified manufacturers and factories across India's textile hubs. Filter by category, region, and certification, then request a quote.",
};

// Listings change as manufacturers submit and admins moderate them, so
// always read fresh from the database rather than serving a build-time snapshot.
export const dynamic = "force-dynamic";

export default function MarketplacePage() {
  const suppliers = listApprovedSuppliers().map(supplierRowToSupplier);
  return <MarketplaceClient suppliers={suppliers} />;
}
