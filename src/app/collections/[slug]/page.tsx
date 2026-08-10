import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import OrderForm from "@/components/OrderForm";
import { getCollectionBySlug, collectionRowToCollection } from "@/lib/db";
import { collectionSwatch } from "@/lib/collectionSwatch";
import { formatPaise } from "@/lib/currency";
import { isRazorpayConfigured } from "@/lib/razorpay";
import { IconArrowRight } from "@/components/Icons";

// Listings change as brands submit and admins moderate them, so always read
// fresh from the database rather than serving a build-time snapshot.
export const dynamic = "force-dynamic";

function getPublicCollection(slug: string) {
  const row = getCollectionBySlug(slug);
  if (!row || row.status !== "approved") return undefined;
  return collectionRowToCollection(row);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getPublicCollection(slug);
  if (!collection) return { title: "Collection not found" };
  return {
    title: collection.name,
    description: `${collection.name} — ${collection.category} collection. ${collection.description}`,
  };
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getPublicCollection(slug);
  if (!collection) notFound();

  return (
    <section className="bg-background py-12 sm:py-16">
      <Container>
        <Link
          href="/collections"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-700 hover:text-rose-600"
        >
          <IconArrowRight className="h-3.5 w-3.5 rotate-180" />
          Back to Collections
        </Link>

        <div
          className="relative mt-6 h-56 w-full overflow-hidden rounded-3xl sm:h-72"
          style={collectionSwatch(collection.category, collection.slug)}
        >
          <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-ink shadow-sm">
            {collection.category}
          </span>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <h1 className="text-balance font-serif text-2xl font-semibold text-white sm:text-3xl">
              {collection.name}
            </h1>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              About this collection
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              {collection.description}
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-ink">
                  {formatPaise(collection.pricePaise)}
                </span>
                <span className="text-sm text-slate-400">/ unit</span>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Minimum order quantity: <strong className="text-ink">{collection.moq}</strong> units
              </p>

              <div className="mt-6 border-t border-slate-100 pt-6">
                <OrderForm
                  collectionSlug={collection.slug}
                  moq={collection.moq}
                  unitPricePaise={collection.pricePaise}
                  paymentsConfigured={isRazorpayConfigured()}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
