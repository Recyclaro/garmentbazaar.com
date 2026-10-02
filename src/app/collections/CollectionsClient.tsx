"use client";

import { useMemo, useState } from "react";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import CollectionCard from "@/components/CollectionCard";
import { IconSearch, IconX } from "@/components/Icons";
import { collectionCategories, type Collection, type CollectionCategory } from "@/data/collections";
import { priceBands, inBand } from "@/lib/priceBands";

type SortKey = "new" | "price-asc" | "price-desc" | "moq-asc";

const sorts: { key: SortKey; label: string }[] = [
  { key: "new", label: "Newest" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "moq-asc", label: "Smallest MOQ" },
];

export default function CollectionsClient({
  collections,
  initialCategory = "All",
  initialPrice = "all",
  initialSort = "new",
}: {
  collections: Collection[];
  initialCategory?: CollectionCategory | "All";
  initialPrice?: string;
  initialSort?: SortKey;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CollectionCategory | "All">(initialCategory);
  const [price, setPrice] = useState<string>(initialPrice);
  const [sort, setSort] = useState<SortKey>(initialSort);

  function clearFilters() {
    setQuery("");
    setCategory("All");
    setPrice("all");
  }

  const hasActiveFilters = query !== "" || category !== "All" || price !== "all";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const band = priceBands.find((b) => b.key === price);
    const list = collections.filter((c) => {
      if (category !== "All" && c.category !== category) return false;
      if (band && !inBand(c.pricePaise, band)) return false;
      if (q) {
        const haystack = [c.name, c.brandName, c.category, c.description]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
    if (sort === "price-asc") return [...list].sort((a, b) => a.pricePaise - b.pricePaise);
    if (sort === "price-desc") return [...list].sort((a, b) => b.pricePaise - a.pricePaise);
    if (sort === "moq-asc") return [...list].sort((a, b) => a.moq - b.moq);
    return list;
  }, [query, category, price, sort, collections]);

  return (
    <>
      <PageHero
        tone="rose"
        eyebrow="Shop wholesale"
        title="Fresh stock, straight from the brand."
        subtitle="Browse collections from reviewed brands, see the wholesale price per piece up front, and order at the brand's MOQ. No middleman, no haggling."
        photos={[
          { file: "hero-women", alt: "Women's wear" },
          { file: "men-jacket", alt: "Jacket" },
          { file: "bag-handbag", alt: "Handbag" },
          { file: "kids-girls-dress", alt: "Girls dress" },
        ]}
        badges={["Prices shown up front", "Reviewed brands only"]}
        collageOnMobile={false}
      />

      <section className="bg-background pb-16 pt-6 sm:pb-20 sm:pt-10">
      <Container>
        <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 sm:mx-0 sm:px-0">
          {["All" as const, ...collectionCategories].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                category === c
                  ? "bg-ink text-white"
                  : "bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-slate-400"
              }`}
            >
              {c === "All" ? "All departments" : c}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-4 max-w-2xl sm:mt-8">
          <div className="relative">
            <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search kurtas, sneakers, a brand name..."
              className="w-full rounded-full border border-slate-300 bg-white py-3 pl-12 pr-4 text-base text-ink sm:text-sm shadow-sm outline-none placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
            />
          </div>
        </div>

        <div className="-mx-6 mt-4 flex gap-2 overflow-x-auto px-6 pb-1 lg:hidden">
          {[{ key: "all", short: "Any price" }, ...priceBands].map((b) => (
            <button
              key={b.key}
              onClick={() => setPrice(b.key)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                price === b.key
                  ? "bg-[#b0164f] text-white"
                  : "bg-white text-slate-700 ring-1 ring-slate-200"
              }`}
            >
              {b.short}
            </button>
          ))}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-rose-700"
            >
              Clear
            </button>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-10 sm:mt-12 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-ink">Filters</h2>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 text-xs font-medium text-rose-700 hover:text-rose-600"
                >
                  <IconX className="h-3 w-3" />
                  Clear all
                </button>
              )}
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Budget per piece
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[{ key: "all", short: "Any price" }, ...priceBands].map((b) => (
                  <button
                    key={b.key}
                    onClick={() => setPrice(b.key)}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                      price === b.key
                        ? "bg-[#b0164f] text-white"
                        : "bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-slate-400"
                    }`}
                  >
                    {b.short}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Category
              </p>
              <div className="mt-3 flex flex-col gap-1">
                <button
                  onClick={() => setCategory("All")}
                  className={`rounded-lg px-3 py-1.5 text-left text-sm transition ${
                    category === "All"
                      ? "bg-ink text-white"
                      : "text-slate-600 hover:bg-white"
                  }`}
                >
                  All categories
                </button>
                {collectionCategories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`rounded-lg px-3 py-1.5 text-left text-sm transition ${
                      category === c
                        ? "bg-ink text-white"
                        : "text-slate-600 hover:bg-white"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-500">
                {filtered.length} collection{filtered.length === 1 ? "" : "s"}
              </p>
              <label className="flex items-center gap-2 text-sm text-slate-600">
                Sort by
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-ink outline-none focus:border-rose-500"
                >
                  {sorts.map((o) => (
                    <option key={o.key} value={o.key}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {filtered.length > 0 ? (
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((c) => (
                  <CollectionCard key={c.slug} collection={c} />
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <p className="text-sm font-medium text-ink">
                  No collections match those filters
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Try clearing a filter or searching a different term.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 inline-flex items-center rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
    </>
  );
}
