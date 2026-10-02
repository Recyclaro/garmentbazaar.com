import type { Metadata } from "next";
import CollectionsClient from "./CollectionsClient";
import { listApprovedCollections, collectionRowToCollection } from "@/lib/db";
import { collectionCategories } from "@/data/collections";
import { priceBands } from "@/lib/priceBands";

export const metadata: Metadata = {
  title: "Shop Wholesale Clothing, Footwear & Accessories",
  alternates: { canonical: "/collections" },
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
  const { category, price, sort, q } = await searchParams;
  // ?category=Footwear opens the page pre-filtered; anything unknown is ignored.
  const initialCategory = collectionCategories.find((c) => c === category) ?? "All";
  // ?price=under-500 opens it on a budget band.
  const initialPrice = priceBands.find((b) => b.key === price)?.key ?? "all";
  const collections = listApprovedCollections().map(collectionRowToCollection);
  return (
    <CollectionsClient
      collections={collections}
      initialCategory={initialCategory}
      initialPrice={initialPrice}
      initialQuery={typeof q === "string" ? q.slice(0, 80) : ""}
      initialSort={sort === "price-asc" || sort === "price-desc" || sort === "moq-asc" ? sort : "new"}
    />
  );
}
