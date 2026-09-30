import type { Metadata } from "next";
import CollectionsClient from "./CollectionsClient";
import { listApprovedCollections, collectionRowToCollection } from "@/lib/db";
import { collectionCategories } from "@/data/collections";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Browse fashion and lifestyle collections listed directly by brands. Filter by category, then order at the brand's minimum order quantity (MOQ).",
};

// Listings change as brands submit and admins moderate them, so always read
// fresh from the database rather than serving a build-time snapshot.
export const dynamic = "force-dynamic";

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category } = await searchParams;
  // ?category=Footwear opens the page pre-filtered; anything unknown is ignored.
  const initialCategory = collectionCategories.find((c) => c === category) ?? "All";
  const collections = listApprovedCollections().map(collectionRowToCollection);
  return (
    <CollectionsClient
      collections={collections}
      initialCategory={initialCategory}
    />
  );
}
