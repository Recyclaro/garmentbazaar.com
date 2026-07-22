import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import { getSupplierBySlug, supplierRowToSupplier } from "@/lib/db";
import { categorySwatch } from "@/lib/categorySwatch";
import {
  IconArrowRight,
  IconCheck,
  IconMapPin,
  IconShieldCheck,
  IconStar,
} from "@/components/Icons";

// Listings change as manufacturers submit and admins moderate them, so
// always read fresh from the database rather than serving a build-time snapshot.
export const dynamic = "force-dynamic";

function getPublicSupplier(slug: string) {
  const row = getSupplierBySlug(slug);
  if (!row || row.status !== "approved") return undefined;
  return supplierRowToSupplier(row);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supplier = getPublicSupplier(slug);
  if (!supplier) return { title: "Supplier not found" };
  return {
    title: supplier.name,
    description: `${supplier.name} — ${supplier.category} manufacturer in ${supplier.city}, ${supplier.region}. ${
      supplier.specialties.length > 0 ? `Specialties: ${supplier.specialties.join(", ")}.` : ""
    }`.trim(),
  };
}

export default async function SupplierDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supplier = getPublicSupplier(slug);
  if (!supplier) notFound();

  const hasReviews = supplier.reviews > 0;

  return (
    <section className="bg-background py-12 sm:py-16">
      <Container>
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 hover:text-accent-600"
        >
          <IconArrowRight className="h-3.5 w-3.5 rotate-180" />
          Back to Marketplace
        </Link>

        <div
          className="relative mt-6 h-56 w-full overflow-hidden rounded-3xl sm:h-72"
          style={categorySwatch(supplier.category, supplier.slug)}
        >
          {supplier.verified && (
            <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-accent-700 shadow-sm">
              <IconCheck className="h-3.5 w-3.5" />
              Verified
            </span>
          )}
          <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-ink shadow-sm">
            {supplier.category}
          </span>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <h1 className="text-balance font-serif text-2xl font-semibold text-white sm:text-3xl">
              {supplier.name}
            </h1>
            <div className="mt-1.5 flex items-center gap-1.5 text-sm text-white/90">
              <IconMapPin className="h-4 w-4" />
              {supplier.city}, {supplier.region}
              {supplier.since && (
                <>
                  <span className="text-white/50">&middot;</span>
                  since {supplier.since}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              {hasReviews ? (
                <>
                  <IconStar className="h-4 w-4 text-amber-400" />
                  <span className="font-semibold text-ink">
                    {supplier.rating.toFixed(1)}
                  </span>
                  <span className="text-slate-400">
                    ({supplier.reviews} review{supplier.reviews === 1 ? "" : "s"})
                  </span>
                </>
              ) : (
                <span className="text-slate-400">
                  New to GarmentBazaar &mdash; no reviews yet
                </span>
              )}
            </div>

            {supplier.specialties.length > 0 && (
              <div className="mt-8">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Specialties
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {supplier.specialties.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-accent-50 px-3 py-1.5 text-sm font-medium text-accent-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Certifications
              </h2>
              {supplier.certifications.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {supplier.certifications.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-ink"
                    >
                      <IconShieldCheck className="h-4 w-4 text-accent-600" />
                      {c}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-500">
                  No certifications on file yet &mdash; ask directly when you
                  request a quote.
                </p>
              )}
            </div>

            {!supplier.verified && (
              <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-sm leading-6 text-slate-600">
                This listing hasn&apos;t been independently verified by
                GarmentBazaar yet. Details above come from the supplier or a
                public directory &mdash; confirm specifics directly before
                placing an order.
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Quick facts
              </h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <dt className="text-slate-500">MOQ</dt>
                  <dd className="font-semibold text-ink">
                    {supplier.moq ? supplier.moq.toLocaleString() : "Contact for MOQ"}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <dt className="text-slate-500">Lead time</dt>
                  <dd className="font-semibold text-ink">
                    {supplier.leadTimeDays
                      ? `${supplier.leadTimeDays} days`
                      : "Contact for lead time"}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <dt className="text-slate-500">Operating since</dt>
                  <dd className="font-semibold text-ink">
                    {supplier.since ?? "Not listed"}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500">Region</dt>
                  <dd className="font-semibold text-ink">{supplier.region}</dd>
                </div>
              </dl>

              <Link
                href={`/contact?supplier=${encodeURIComponent(supplier.slug)}`}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-700"
              >
                Request a Quote
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
