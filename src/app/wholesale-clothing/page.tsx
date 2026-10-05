import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { IconArrowRight } from "@/components/Icons";
import { cities, regions, type Region } from "@/data/cities";
import { pageMeta, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Wholesale Clothing by Town: Buy Online from Any City",
  description:
    "Clothing retailers in Tier 2, 3 and 4 towns across India can buy branded wholesale stock online, direct from brands. Find the page for your town.",
  path: "/wholesale-clothing",
});

const order: Region[] = ["north", "central", "west", "south", "east", "northeast"];

export default function WholesaleByTownPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Wholesale clothing for retailers by town",
          numberOfItems: cities.length,
          itemListElement: cities.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/wholesale-clothing/${c.slug}`,
            name: `Wholesale clothing in ${c.name}`,
          })),
        }}
      />
      <PageHero
        tone="teal"
        eyebrow="Wholesale by town"
        title="Branded wholesale stock for shops in every town"
        subtitle="GarmentBazaar is built for clothing retailers outside the metros. See prices and MOQs up front and order direct from brands, wherever your shop is."
        photos={[
          { file: "ethnic-kurti", alt: "Wholesale kurtis" },
          { file: "men-shirt", alt: "Wholesale menswear" },
          { file: "kids-girls-dress", alt: "Wholesale kidswear" },
          { file: "shoes-casual", alt: "Wholesale footwear" },
        ]}
        badges={["Free for retailers", "Reviewed brands"]}
        collageOnMobile={false}
      >
        <Link
          href="/signup?role=retailer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-7 py-3.5 text-base font-semibold text-ink transition hover:bg-amber-200"
        >
          Create free shop account
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </PageHero>

      <section className="bg-background py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {order.map((r) => {
              const list = cities.filter((c) => c.region === r);
              if (list.length === 0) return null;
              return (
                <div key={r}>
                  <h2 className="font-serif text-2xl font-semibold text-ink">{regions[r].label}</h2>
                  <ul className="mt-4 space-y-2">
                    {list.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/wholesale-clothing/${c.slug}`}
                          className="group flex items-center justify-between rounded-xl bg-white px-4 py-3 ring-1 ring-slate-200 transition hover:ring-slate-400"
                        >
                          <span>
                            <span className="block font-semibold text-ink">{c.name}</span>
                            <span className="block text-xs text-slate-500">
                              {c.state} · also {c.nearby.slice(0, 3).join(", ")}
                            </span>
                          </span>
                          <IconArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <p className="mt-12 max-w-2xl text-sm leading-6 text-slate-600">
            Don&apos;t see your town? GarmentBazaar works for retailers anywhere in
            India.{" "}
            <Link href="/collections" className="font-semibold text-rose-700 hover:underline">
              Browse all collections
            </Link>{" "}
            or{" "}
            <Link href="/signup?role=retailer" className="font-semibold text-rose-700 hover:underline">
              create a free account
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
