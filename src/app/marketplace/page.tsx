import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import MarketplaceClient from "./MarketplaceClient";
import { listApprovedSuppliers, supplierRowToSupplier } from "@/lib/db";

export const metadata: Metadata = pageMeta({
  title: "Garment Manufacturers & Fabric Suppliers in India",
  description:
    "Browse garment manufacturers and fabric suppliers across India's textile hubs. Filter by category, region and certification, then request a quote.",
  path: "/marketplace",
});

// Listings change as manufacturers submit and admins moderate them, so
// always read fresh from the database rather than serving a build-time snapshot.
export const dynamic = "force-dynamic";

export default function MarketplacePage() {
  const suppliers = listApprovedSuppliers().map(supplierRowToSupplier);
  return <MarketplaceClient suppliers={suppliers} />;
}
