"use client";

import { useMemo, useState } from "react";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import SupplierCard from "@/components/SupplierCard";
import { IconSearch, IconX } from "@/components/Icons";
import {
  categories,
  certifications,
  regions,
  type Category,
  type Certification,
  type Region,
  type Supplier,
} from "@/data/suppliers";

export default function MarketplaceClient({
  suppliers,
}: {
  suppliers: Supplier[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [region, setRegion] = useState<Region | "All">("All");
  const [selectedCerts, setSelectedCerts] = useState<Certification[]>([]);

  function toggleCert(cert: Certification) {
    setSelectedCerts((prev) =>
      prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert],
    );
  }

  function clearFilters() {
    setQuery("");
    setCategory("All");
    setRegion("All");
    setSelectedCerts([]);
  }

  const hasActiveFilters =
    query !== "" || category !== "All" || region !== "All" || selectedCerts.length > 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return suppliers.filter((s) => {
      if (category !== "All" && s.category !== category) return false;
      if (region !== "All" && s.region !== region) return false;
      if (
        selectedCerts.length > 0 &&
        !selectedCerts.every((c) => s.certifications.includes(c))
      )
        return false;
      if (q) {
        const haystack = [s.name, s.city, s.region, s.category, ...s.specialties]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, category, region, selectedCerts, suppliers]);

  return (
    <section className="bg-background py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Supplier Directory</Eyebrow>
          <h1 className="text-balance mt-4 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Vetted manufacturers across India&apos;s textile hubs
          </h1>
          <p className="text-balance mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">
            Filter by category, region, or certification, then request a
            quote directly. Every listing shown here is a sample — connect
            your real supplier network to replace it.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <div className="relative">
            <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search supplier name, specialty, or city..."
              className="w-full rounded-full border border-slate-300 bg-white py-3 pl-12 pr-4 text-sm text-ink shadow-sm outline-none placeholder:text-slate-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
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
                  className="inline-flex items-center gap-1 text-xs font-medium text-accent-700 hover:text-accent-600"
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
                {categories.map((c) => (
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

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Region
              </p>
              <div className="mt-3 flex flex-col gap-1">
                <button
                  onClick={() => setRegion("All")}
                  className={`rounded-lg px-3 py-1.5 text-left text-sm transition ${
                    region === "All"
                      ? "bg-ink text-white"
                      : "text-slate-600 hover:bg-white"
                  }`}
                >
                  All regions
                </button>
                {regions.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRegion(r)}
                    className={`rounded-lg px-3 py-1.5 text-left text-sm transition ${
                      region === r
                        ? "bg-ink text-white"
                        : "text-slate-600 hover:bg-white"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Certification
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {certifications.map((cert) => (
                  <label
                    key={cert}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCerts.includes(cert)}
                      onChange={() => toggleCert(cert)}
                      className="h-4 w-4 rounded border-slate-300 text-accent-600 focus:ring-accent-500"
                    />
                    {cert}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <p className="text-sm text-slate-500">
              {filtered.length} supplier{filtered.length === 1 ? "" : "s"}
            </p>
            {filtered.length > 0 ? (
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((s) => (
                  <SupplierCard key={s.slug} supplier={s} />
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <p className="text-sm font-medium text-ink">
                  No suppliers match those filters
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Try clearing a filter or searching a different term.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 inline-flex items-center rounded-full bg-accent-600 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-700"
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
