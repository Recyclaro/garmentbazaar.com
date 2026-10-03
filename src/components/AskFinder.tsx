"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { findCollections } from "@/actions/ai";
import { formatPaise } from "@/lib/currency";
import { IconArrowRight, IconSearch, IconSparkles } from "./Icons";

const examples = [
  "Cotton kurtis under ₹500 for summer",
  "Bachon ke liye school wale kapde, chhota MOQ",
  "Festive sarees for a wedding season boutique",
  "Gents shirts under 700 rupees",
];

export default function AskFinder({
  aiOn,
  initialQuery,
  autoRun,
}: {
  aiOn: boolean;
  initialQuery: string;
  autoRun: boolean;
}) {
  const [state, action, pending] = useActionState(findCollections, undefined);
  const [q, setQ] = useState(initialQuery);
  const formRef = useRef<HTMLFormElement>(null);
  const ran = useRef(false);

  useEffect(() => {
    if (autoRun && initialQuery && !ran.current) {
      ran.current = true;
      formRef.current?.requestSubmit();
    }
  }, [autoRun, initialQuery]);

  const result = state?.result;

  return (
    <div>
      <form ref={formRef} action={action} role="search" className="rounded-3xl bg-white p-3 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200 sm:p-4">
        <label htmlFor="ask-q" className="sr-only">Describe what you want to stock</label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-3 px-2">
            <IconSparkles className="h-5 w-5 shrink-0 text-[#b0164f]" />
            <input
              id="ask-q"
              name="q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              maxLength={200}
              placeholder={aiOn ? "Describe it in Hindi or English…" : "e.g. cotton kurtis under ₹500"}
              className="min-w-0 flex-1 bg-transparent py-3 text-base text-ink placeholder:text-slate-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#b0164f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c81d5c] disabled:opacity-60"
          >
            <IconSearch className="h-4 w-4" />
            {pending ? "Finding…" : "Find stock"}
          </button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {examples.map((e) => (
          <button
            key={e}
            type="button"
            onClick={() => {
              setQ(e);
              setTimeout(() => formRef.current?.requestSubmit(), 0);
            }}
            className="rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-sm text-ink transition hover:border-[#b0164f] hover:text-[#b0164f]"
          >
            {e}
          </button>
        ))}
      </div>

      <div className="mt-8" aria-live="polite">
        {state?.message && <p className="rounded-2xl bg-amber-50 px-5 py-4 text-sm text-amber-900 ring-1 ring-amber-200">{state.message}</p>}

        {pending && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => <div key={i} className="h-72 animate-pulse rounded-2xl bg-white ring-1 ring-slate-200" />)}
          </div>
        )}

        {result && !pending && (
          <>
            <div className="flex flex-col gap-3 rounded-2xl bg-[#12264a] px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-start gap-2 text-sm leading-6">
                <span className="mt-0.5 shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-amber-200">
                  {result.engine === "ai" ? "AI" : "Search"}
                </span>
                {result.reply}
              </p>
              {state?.query && (
                <Link href={`/collections?q=${encodeURIComponent(state.query)}`} className="shrink-0 text-sm font-semibold text-amber-200 hover:text-amber-100">
                  Open full catalogue
                </Link>
              )}
            </div>
            <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {result.matches.map(({ collection: c, why }) => (
                <li key={c.slug}>
                  <Link
                    href={`/collections/${encodeURIComponent(c.slug)}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/10"
                  >
                    <span className="relative block h-44 bg-[#f1efeb]">
                      {c.imagePath && (
                        <Image
                          src={c.imagePath}
                          alt={c.name}
                          fill
                          unoptimized
                          sizes="(min-width: 1024px) 22vw, 45vw"
                          className={c.imagePath.startsWith("/images/products/") ? "object-contain" : "object-cover"}
                        />
                      )}
                      <span className="absolute left-2 top-2 rounded-full bg-success-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">MOQ {c.moq}</span>
                    </span>
                    <span className="flex flex-1 flex-col p-4">
                      <span className="font-semibold leading-snug text-ink group-hover:text-rose-700">{c.name}</span>
                      <span className="text-[11px] font-medium uppercase tracking-wide text-rose-600">{c.brandName}</span>
                      <span className="mt-1 font-serif text-lg font-semibold text-ink">
                        {formatPaise(c.pricePaise)}
                        <span className="font-sans text-xs font-medium text-slate-500"> /piece</span>
                      </span>
                      {why && <span className="mt-1.5 text-xs leading-5 text-slate-600">{why}</span>}
                      <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-rose-700">
                        View &amp; order <IconArrowRight className="h-4 w-4" />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
