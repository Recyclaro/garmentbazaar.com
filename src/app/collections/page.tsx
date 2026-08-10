import type { Metadata } from "next";
import CollectionsClient from "./CollectionsClient";
import { listApprovedCollections, collectionRowToCollection } from "@/lib/db";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Browse fashion and lifestyle collections listed directly by brands. Filter by category, then order at the brand's minimum order quantity (MOQ).",
};

// Listings change as brands submit and admins moderate them, so always read
// fresh from the database rather than serving a build-time snapshot.
export const dynamic = "force-dynamic";

export default function CollectionsPage() {
  const collections = listApprovedCollections().map(collectionRowToCollection);
  return <CollectionsClient collections={collections} />;
}
