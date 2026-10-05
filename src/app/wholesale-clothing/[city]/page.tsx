import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import TripCostCalculator from "@/components/TripCostCalculator";
import JsonLd from "@/components/JsonLd";
import { IconArrowRight, IconCheck } from "@/components/Icons";
import { cities, cityBySlug, marketsFor, regions, relatedCities } from "@/data/cities";
import { departments } from "@/data/departments";
import { priceBands } from "@/lib/priceBands";
import { guides } from "@/content/generated";
import { pageMeta, notFoundMeta, SITE_URL } from "@/lib/seo";

// One landing page per town, for searches like "wholesale clothing in
// Indore" or "kurti wholesale near Dewas". Copy only states what is true
// for every shop there; see src/data/cities.ts.
export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

const shortName = (name: string) => name.replace(/\s*\(.*\)$/, "");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = cityBySlug(slug);
  if (!city) return notFoundMeta("Town not found");
  const name = shortName(city.name);
  return pageMeta({
    title: `Wholesale Clothing in ${name} for Retailers`,
    description: `Retailers in ${name}, ${city.nearby.slice(0, 2).join(", ")} and nearby: buy branded wholesale clothing online, direct from brands. Price per piece and MOQ shown up front.`,
    path: `/wholesale-clothing/${city.slug}`,
    keywords: [
      `wholesale clothing ${name}`,
      `wholesale clothes market ${name}`,
      `kurti wholesale ${name}`,
      `garment wholesaler ${name}`,
      `branded clothes wholesale ${city.state}`,
    ],
  });
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = cityBySlug(slug);
  if (!city) notFound();

  const name = shortName(city.name);
  const region = regions[city.region];
  const markets = marketsFor(city);
  const focus = region.focus
    .map((s) => departments.find((d) => d.slug === s))
    .filter((d): d is (typeof departments)[number] => Boolean(d));
  const otherDepts = departments.filter((d) => !region.focus.includes(d.slug));
  const nearbyText = `${city.nearby.slice(0, -1).join(", ")} and ${city.nearby[city.nearby.length - 1]}`;
  const latestGuides = guides.filter((g) => g.audience === "retailers").slice(0, 3);
  const related = relatedCities(city);
  const url = `${SITE_URL}/wholesale-clothing/${city.slug}`;

  const faq = [
    {
      q: `Can I buy wholesale clothing online in ${name}?`,
      a: `Yes. Shop owners in ${name} and nearby towns such as ${nearbyText} can browse branded wholesale collections on GarmentBazaar and order directly from the brands, without travelling to ${markets}.`,
    },
    {
      q: "Can I see wholesale prices before signing up?",
      a: "Yes. Every listing shows the wholesale price per piece and the brand's minimum order quantity (MOQ), so you can work out your margin before you create an account.",
    },
    {
      q: "Is there a minimum order?",
      a: "Each brand sets its own MOQ, and many are small, so you can test a new style with a few pieces and reorder what sells. You can sort collections by MOQ to see the smallest first.",
    },
    {
      q: `Is GarmentBazaar free for retailers in ${name}?`,
      a: "Yes. Creating a retailer account is free. You pay only for the stock you order.",
    },
    {
      q: "Are the brands checked?",
      a: "Every brand and every listing is reviewed by the GarmentBazaar team before it goes live.",
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Wholesale by town", item: `${SITE_URL}/wholesale-clothing` },
              { "@type": "ListItem", position: 3, name: `Wholesale clothing in ${name}`, item: url },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `Wholesale clothing for retailers in ${name}`,
            serviceType: "B2B wholesale clothing marketplace",
            provider: { "@type": "Organization", name: "GarmentBazaar", url: SITE_URL },
            areaServed: [
              { "@type": "City", name, containedInPlace: { "@type": "State", name: city.state } },
              ...city.nearby.map((n) => ({ "@type": "City", name: n })),
            ],
            url,
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]}
      />

      <PageHero
        tone="navy"
        eyebrow={`${city.state} · ${region.label}`}
        title={<>Wholesale clothing for retailers in {name}</>}
        subtitle={
          <>
            Shop owners in {name} and nearby towns like {nearbyText} can order
            branded stock straight from the brands, from their own counter.
            No trips to {markets}.
          </>
        }
        photos={focus.slice(0, 4).map((d) => ({ file: d.photos[0].file, alt: `${d.seoTitle} for ${name} retailers` }))}
        badges={["Price per piece up front", "Free for retailers"]}
        collageOnMobile={false}
      >
        <Link
          href="/signup?role=retailer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-7 py-3.5 text-base font-semibold text-ink transition hover:bg-amber-200"
        >
          Create free shop account
          <IconArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/collections"
          className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
        >
          Browse collections
        </Link>
      </PageHero>

      {/* Why buy here */}
      <section className="bg-background py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={`For ${name} shop owners`}
            title="Restock without closing the shop"
            intro={`Many clothing retailers around ${name} restock by travelling to ${markets}. GarmentBazaar lets you see and order the same kind of branded stock online.`}
          />
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Prices before signup", d: "The wholesale price per piece is on every listing, the same for every buyer wherever your shop is." },
              { t: "Small, brand-set MOQs", d: "Test a style with a few pieces, then reorder what sells in your town." },
              { t: "Reviewed brands", d: "Every brand and listing is checked before it goes live." },
              { t: "One-tap reorder", d: "Your order history stays in your dashboard, so repeat orders take seconds." },
            ].map((p) => (
              <li key={p.t} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-300">
                  <IconCheck className="h-4 w-4 text-ink" />
                </span>
                <h3 className="mt-4 font-semibold text-ink">{p.t}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{p.d}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Departments */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Shop by department"
            title={`What ${name} retailers stock most`}
            intro={`Popular with shops across ${region.label}, plus every other department on GarmentBazaar.`}
            link={{ href: "/collections", label: "All collections" }}
          />
          <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {focus.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/wholesale/${d.slug}`}
                  className="group block overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="relative block h-36 bg-[#f1efeb] sm:h-44">
                    <Image
                      src={`/images/products/${d.photos[0].file}.jpg`}
                      alt=""
                      fill
                      unoptimized
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      className="object-contain transition duration-300 group-hover:scale-105"
                    />
                  </span>
                  <span className="block p-4">
                    <span className="block font-semibold text-ink">{d.seoTitle}</span>
                    <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-rose-700">
                      See collections <IconArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-2">
            {otherDepts.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/wholesale/${d.slug}`}
                  className="inline-flex rounded-full bg-background px-4 py-2 text-sm font-semibold text-ink ring-1 ring-slate-200 transition hover:ring-slate-400"
                >
                  {d.seoTitle}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Season calendar */}
      <section className="bg-[#fff8e6] py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={`${region.label} buying calendar`}
            title="Order ahead of each season"
            intro="Stock that arrives a few weeks before demand peaks has the best chance of selling at full price. Plan your orders around these seasons."
            tone="text-amber-800"
          />
          <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {region.seasons.map((s) => (
              <li key={s.name} className="rounded-2xl bg-white p-6 ring-1 ring-amber-200">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-800">{s.when}</p>
                <h3 className="mt-2 font-serif text-xl font-semibold text-ink">{s.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">Stock up on {s.stock}.</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-slate-700">
            Not sure what to order?{" "}
            <Link href="/stock-advisor" className="font-semibold text-rose-700 hover:underline">
              Try the free stock advisor
            </Link>{" "}
            for a buying plan made for your town and budget.
          </p>
        </Container>
      </section>

      {/* Budget + trip calculator */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Shop by budget"
                title="Start from your shelf price"
                intro="Filter wholesale collections by price per piece, or start with the smallest MOQs."
              />
              <ul className="mt-8 grid grid-cols-2 gap-3">
                {priceBands.map((b) => (
                  <li key={b.key}>
                    <Link
                      href={`/collections?price=${b.key}`}
                      className="block rounded-2xl bg-background px-4 py-4 text-center font-semibold text-ink ring-1 ring-slate-200 transition hover:ring-slate-400"
                    >
                      {b.label}
                    </Link>
                  </li>
                ))}
                <li className="col-span-2">
                  <Link
                    href="/collections?sort=moq-asc"
                    className="block rounded-2xl bg-ink px-4 py-4 text-center font-semibold text-white transition hover:bg-slate-800"
                  >
                    Lowest MOQ first
                  </Link>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-7">
              <TripCostCalculator />
            </div>
          </div>
        </Container>
      </section>

      {/* Guides */}
      {latestGuides.length > 0 && (
        <section className="bg-background py-16 sm:py-20">
          <Container>
            <SectionHeading
              eyebrow="Free retailer guides"
              title="Buy smarter this season"
              link={{ href: "/guides", label: "All guides" }}
            />
            <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {latestGuides.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/guides/${g.slug}`}
                    className="block h-full rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <span className="block font-semibold text-ink">{g.title}</span>
                    <span className="mt-2 block text-sm leading-6 text-slate-600">{g.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Questions" title={`Buying wholesale in ${name}`} />
          <div className="mt-8 divide-y divide-slate-200 rounded-2xl ring-1 ring-slate-200">
            {faq.map((f) => (
              <details key={f.q} className="group p-5 sm:p-6">
                <summary className="cursor-pointer list-none font-semibold text-ink">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-700">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Nearby towns */}
      <section className="bg-background py-14">
        <Container>
          <h2 className="font-serif text-2xl font-semibold text-ink">Wholesale clothing in nearby cities</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {related.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/wholesale-clothing/${c.slug}`}
                  className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink ring-1 ring-slate-200 transition hover:ring-slate-400"
                >
                  {shortName(c.name)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/wholesale-clothing"
                className="inline-flex items-center gap-1 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
              >
                All towns <IconArrowRight className="h-3.5 w-3.5" />
              </Link>
            </li>
          </ul>
        </Container>
      </section>
    </>
  );
}
