import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CollectionsClient from "@/app/collections/CollectionsClient";
import Container from "@/components/Container";
import JsonLd, { SITE_URL } from "@/components/JsonLd";
import { departmentBySlug, departments } from "@/data/departments";
import { listApprovedCollections, collectionRowToCollection } from "@/lib/db";
import { formatPaise } from "@/lib/currency";

// Department landing pages, one per department, so each wholesale search
// ("wholesale kurtis", "wholesale footwear for retailers") has a page made
// for it. Listings are read live.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = departmentBySlug(slug);
  if (!d) return { title: "Department not found" };
  const title = `${d.seoTitle} for Retailers | Direct from Brands`;
  return {
    title,
    description: d.seoDescription,
    alternates: { canonical: `/wholesale/${d.slug}` },
    openGraph: {
      title: `${d.seoTitle} | GarmentBazaar`,
      description: d.seoDescription,
      url: `/wholesale/${d.slug}`,
      images: [{ url: `/images/products/${d.photos[0].file}.jpg`, alt: d.seoTitle }],
    },
  };
}

export default async function WholesaleDepartmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = departmentBySlug(slug);
  if (!d) notFound();

  const all = listApprovedCollections().map(collectionRowToCollection);
  const inDept = all.filter((c) => c.category === d.name);
  const prices = inDept.map((c) => c.pricePaise);
  const moqs = inDept.map((c) => c.moq);
  const minPrice = prices.length ? Math.min(...prices) : null;
  const minMoq = moqs.length ? Math.min(...moqs) : null;

  const facts = [
    `${inDept.length} collection${inDept.length === 1 ? "" : "s"} live`,
    minPrice !== null ? `from ${formatPaise(minPrice)} per piece` : null,
    minMoq !== null ? `MOQs from ${minMoq} pieces` : null,
  ].filter(Boolean) as string[];

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE_URL}/collections` },
              { "@type": "ListItem", position: 3, name: d.seoTitle, item: `${SITE_URL}/wholesale/${d.slug}` },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: d.seoTitle,
            numberOfItems: inDept.length,
            itemListElement: inDept.slice(0, 30).map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE_URL}/collections/${c.slug}`,
              name: c.name,
            })),
          },
        ]}
      />

      <CollectionsClient
        collections={all}
        initialCategory={d.name}
        hero={{
          eyebrow: facts.join(" · "),
          title: `${d.seoTitle} for retailers`,
          subtitle: d.seoDescription,
        }}
      />

      {/* Other departments, for shoppers and crawlers alike */}
      <section className="bg-white py-14">
        <Container>
          <h2 className="font-serif text-2xl font-semibold text-ink">
            More wholesale departments
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {departments
              .filter((x) => x.slug !== d.slug)
              .map((x) => (
                <li key={x.slug}>
                  <Link
                    href={`/wholesale/${x.slug}`}
                    className="inline-flex rounded-full bg-background px-4 py-2 text-sm font-semibold text-ink ring-1 ring-slate-200 transition hover:ring-slate-400"
                  >
                    {x.seoTitle}
                  </Link>
                </li>
              ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
