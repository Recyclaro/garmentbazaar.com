import CardRail from "@/components/CardRail";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import CollectionCard from "@/components/CollectionCard";
import HomeHero from "@/components/HomeHero";
import DeptTiles from "@/components/DeptTiles";
import HomeGuides from "@/components/HomeGuides";
import SectionHeading from "@/components/SectionHeading";
import MarginCalculator from "@/components/MarginCalculator";
import StockPlanner from "@/components/StockPlanner";
import TripCostCalculator from "@/components/TripCostCalculator";
import HomeHowItWorks from "@/components/HomeHowItWorks";
import ToolTabs from "@/components/ToolTabs";
import HomeFaq from "@/components/HomeFaq";
import { departments } from "@/data/departments";
import { priceBands, inBand } from "@/lib/priceBands";
import { listApprovedCollections, collectionRowToCollection } from "@/lib/db";
import { IconArrowRight } from "@/components/Icons";

// Live counts, prices and fresh listings all come from the database.
export const dynamic = "force-dynamic";

const img = (file: string) => `/images/products/${file}.jpg`;


// One photo and colour per budget band.
const bandLook: Record<string, { photo: string; bg: string; text: string; sub: string }> = {
  "under-500": { photo: "men-tshirt", bg: "bg-[#f4c430]", text: "text-ink", sub: "text-ink/70" },
  "500-1000": { photo: "women-dress", bg: "bg-[#b0164f]", text: "text-white", sub: "text-rose-100" },
  "1000-2000": { photo: "shoes-sports", bg: "bg-[#0f766e]", text: "text-white", sub: "text-teal-100" },
  "2000-plus": { photo: "ethnic-lehenga", bg: "bg-[#16335e]", text: "text-white", sub: "text-sky-100" },
};




export default function Home() {
  const all = listApprovedCollections().map(collectionRowToCollection);
  const fresh = all.filter((c) => c.imagePath).slice(0, 8);
  const brands = new Set(all.map((c) => c.brandName)).size;
  const minMoq = all.length ? Math.min(...all.map((c) => c.moq)) : null;
  const minPrice = all.length ? Math.min(...all.map((c) => c.pricePaise)) : null;
  const median = (xs: number[]) => {
    const v = [...xs].sort((x, y) => x - y);
    return v.length ? v[Math.floor((v.length - 1) / 2)] : 0;
  };
  const plannerBands = priceBands.map((b) => {
    const inside = all.filter((c) => inBand(c.pricePaise, b));
    return {
      key: b.key,
      label: b.label,
      count: inside.length,
      medianOrder: median(inside.map((c) => c.pricePaise * c.moq)),
      medianMoq: median(inside.map((c) => c.moq)),
    };
  });
  // Hero shows different listings from "Just dropped", one per department.
  const shown = new Set(fresh.map((c) => c.slug));
  const seenCat = new Set<string>();
  const heroPool = all.filter((c) => c.imagePath && !shown.has(c.slug));
  const heroListings = (heroPool.length >= 4 ? heroPool : all.filter((c) => c.imagePath))
    .filter((c) => (seenCat.has(c.category) ? false : (seenCat.add(c.category), true)))
    .slice(0, 4)
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      brandName: c.brandName,
      pricePaise: c.pricePaise,
      moq: c.moq,
      imagePath: c.imagePath as string,
    }));
  const bands = priceBands.map((b) => ({
    ...b,
    count: all.filter((c) => inBand(c.pricePaise, b)).length,
    look: bandLook[b.key],
  }));

  return (
    <>
      <HomeHero
        collections={all.length}
        brands={brands}
        minMoq={minMoq}
        minPrice={minPrice}
        listings={heroListings}
      />

      <DeptTiles />

      {/* Just dropped */}
      {fresh.length > 0 && (
        <section className="bg-background py-16 sm:py-20">
          <Container>
            <SectionHeading
              eyebrow="Latest listings"
              title="Just dropped"
              intro="Fresh collections from reviewed brands, with the wholesale price and MOQ on every card."
              link={{ href: "/collections", label: `See all ${all.length}` }}
            />
            <CardRail>
              {fresh.map((c) => (
                <CollectionCard key={c.slug} collection={c} />
              ))}
            </CardRail>
          </Container>
        </section>
      )}

      {/* Shop by budget */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Wholesale price per piece"
            title="Shop by budget"
            link={{ href: "/collections?sort=price-asc", label: "Lowest prices first" }}
          />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bands.map((b) => (
              <Link
                key={b.key}
                href={`/collections?price=${b.key}`}
                className={`group relative flex h-72 overflow-hidden rounded-3xl ${b.look.bg} p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/15`}
              >
                <div className="relative z-10 flex flex-col">
                  <p className={`text-sm font-semibold ${b.look.sub}`}>
                    {b.count} collection{b.count === 1 ? "" : "s"}
                  </p>
                  <p
                    className={`mt-1 font-serif text-3xl font-semibold leading-tight ${b.look.text}`}
                  >
                    {b.label}
                  </p>
                  <span
                    className={`mt-auto inline-flex items-center gap-1.5 text-sm font-semibold ${b.look.text}`}
                  >
                    Shop now
                    <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 h-44 w-32 overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/20 transition duration-300 group-hover:scale-105">
                  <Image
                    src={img(b.look.photo)}
                    alt=""
                    fill
                    unoptimized
                    sizes="128px"
                    className="object-contain"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works + why direct pays */}
      <HomeHowItWorks collections={all.length} departments={departments.length} minMoq={minMoq} />

      {/* Free tools, one tab each */}
      <section id="tools" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Free retailer tools"
            tone="text-[#0f766e]"
            title="Do the maths before you order"
            intro="Three quick calculators. Change the example numbers to match your shop."
          />
          <ToolTabs
            tabs={[
              {
                id: "trip",
                label: "Mandi trip cost",
                hint: "What restocking trips cost you",
                panel: (
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                      <TripCostCalculator />
                    </div>
                    <div className="flex flex-col rounded-3xl bg-[#12264a] p-6 text-white sm:p-8 lg:col-span-5">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">What it counts</p>
                      <ul className="mt-4 space-y-3 text-sm leading-6 text-white/85">
                        <li><span className="font-semibold text-white">Travel and stay</span> for every buying trip</li>
                        <li><span className="font-semibold text-white">Sales you miss</span> while the shop is shut or short-staffed</li>
                        <li><span className="font-semibold text-white">Before a single piece</span>: this is spent before you buy any stock</li>
                      </ul>
                      <p className="mt-6 text-sm leading-6 text-white/70">
                        On GarmentBazaar you see every brand&apos;s wholesale price and MOQ from your counter.
                      </p>
                      <Link
                        href="/collections?price=under-500"
                        className="mt-6 inline-flex items-center justify-center gap-2 self-start rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-ink transition hover:bg-amber-200"
                      >
                        Browse stock under ₹500
                        <IconArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ),
              },
              {
                id: "planner",
                label: "Stock planner",
                hint: "How far your budget goes",
                panel: <StockPlanner bands={plannerBands} />,
              },
              {
                id: "margin",
                label: "Margin calculator",
                hint: "Profit on any line",
                panel: <MarginCalculator />,
              },
            ]}
          />
        </Container>
      </section>

      {/* Newest guides */}
      <HomeGuides />

      {/* FAQ */}
      <HomeFaq />

      {/* Closing CTA, coming-soon credit and the seller entry points */}
      <section className="bg-background py-16 sm:py-20">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#b0164f] px-6 py-12 sm:px-12 sm:py-14">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-amber-300/25 blur-3xl" />
            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <h2 className="text-balance font-serif text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Your next bestseller is already here.
                </h2>
                <p className="mt-3 text-base text-rose-100">
                  Free to join. Browse every price before you sign up.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/signup?role=retailer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-rose-50"
                  >
                    Create free shop account
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/collections"
                    className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Browse collections
                  </Link>
                </div>
              </div>
              <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/20 lg:col-span-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-amber-200">GB Credit</span>
                  <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
                    Coming soon
                  </span>
                </div>
                <p className="mt-2 font-serif text-2xl font-semibold text-white">
                  Stock up today. Pay after it sells.
                </p>
                <p className="mt-1 text-sm leading-6 text-rose-100">
                  Credit periods for verified retailers through lending partners, chosen at checkout.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-200 hover:text-amber-100"
                >
                  Tell me when it launches
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-center">
            <p className="font-serif text-xl font-semibold text-ink">
              <span className="block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Not a retailer?</span>
              Sell on GarmentBazaar
            </p>
            <Link
              href="/solutions/brands"
              className="group flex items-center justify-between rounded-2xl bg-white px-5 py-4 ring-1 ring-slate-200 transition hover:ring-accent-300"
            >
              <span>
                <span className="block text-base font-semibold text-ink">I&apos;m a brand</span>
                <span className="block text-sm text-slate-600">Reach stores without a sales force</span>
              </span>
              <IconArrowRight className="h-5 w-5 text-accent-700 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/solutions/manufacturers"
              className="group flex items-center justify-between rounded-2xl bg-white px-5 py-4 ring-1 ring-slate-200 transition hover:ring-teal-300"
            >
              <span>
                <span className="block text-base font-semibold text-ink">I&apos;m a mill or factory</span>
                <span className="block text-sm text-slate-600">Sell fabric and production to brands</span>
              </span>
              <IconArrowRight className="h-5 w-5 text-teal-800 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
