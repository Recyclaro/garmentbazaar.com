"use client";

import { useMemo, useState } from "react";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import CollectionCard from "@/components/CollectionCard";
import { IconSearch, IconX } from "@/components/Icons";
import { collectionCategories, type Collection, type CollectionCategory } from "@/data/collections";

export default function CollectionsClient({
  collections,
}: {
  collections: Collection[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CollectionCategory | "All">("All");

  function clearFilters() {
    setQuery("");
    setCategory("All");
  }

  const hasActiveFilters = query !== "" || category !== "All";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return collections.filter((c) => {
      if (category !== "All" && c.category !== category) return false;
      if (q) {
        const haystack = [c.name, c.category, c.description].join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, category, collections]);

  return (
    <section className="bg-background py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="text-rose-600">Brand Collections</Eyebrow>
          <h1 className="text-balance mt-4 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Fashion &amp; lifestyle, straight from the brand
          </h1>
          <p className="text-balance mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">
            Browse collections listed directly by brands and order at their
            minimum order quantity &mdash; no middleman, no back-and-forth.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <div className="relative">
            <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search collection name or category..."
              className="w-full rounded-full border border-slate-300 bg-white py-3 pl-12 pr-4 text-sm text-ink shadow-sm outline-none placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
            />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-3">
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
            <p className="text-sm text-slate-500">
              {filtered.length} collection{filtered.length === 1 ? "" : "s"}
            </p>
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
  );
}
