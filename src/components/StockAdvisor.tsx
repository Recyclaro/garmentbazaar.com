"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { getStockPlan } from "@/actions/advisor";
import { regions, seasons, shopTypes } from "@/lib/advisorOptions";
import { formatPaise } from "@/lib/currency";
import { IconArrowRight, IconSparkles } from "./Icons";

export interface AdvisorDefaults {
  town: string;
  region: string;
  tier: string;
  shopType: string;
  season: string;
  budget: string;
  notes: string;
}

const field =
  "mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-[#b0164f] focus:ring-2 focus:ring-[#b0164f]/20";
const label = "block text-sm font-medium text-ink";

const barColours = ["bg-[#b0164f]", "bg-[#0f766e]", "bg-[#16335e]", "bg-amber-400", "bg-accent-500", "bg-[#c77d0a]", "bg-teal-400", "bg-rose-300"];

export default function StockAdvisor({
  aiOn,
  defaults,
  autoRun,
}: {
  aiOn: boolean;
  defaults: AdvisorDefaults;
  autoRun: boolean;
}) {
  const [state, action, pending] = useActionState(getStockPlan, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const ran = useRef(false);

  // Coming from the home page teaser: build the plan straight away.
  useEffect(() => {
    if (autoRun && !ran.current) {
      ran.current = true;
      formRef.current?.requestSubmit();
    }
  }, [autoRun]);

  useEffect(() => {
    if (state?.plan) resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [state]);

  const plan = state?.plan;
  const err = (k: string) => state?.errors?.[k]?.[0];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Form */}
      <form
        ref={formRef}
        action={action}
        className="h-fit rounded-3xl bg-white p-6 ring-1 ring-slate-200 sm:p-8 lg:sticky lg:top-24 lg:col-span-4"
      >
        <h2 className="font-serif text-2xl font-semibold text-ink">Your shop</h2>
        <p className="mt-1 text-sm text-slate-600">Takes about 20 seconds.</p>
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="adv-town" className={label}>Town or city</label>
            <input id="adv-town" name="town" defaultValue={defaults.town} maxLength={60} placeholder="e.g. Bareilly" className={field} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="adv-region" className={label}>Region</label>
              <select id="adv-region" name="region" defaultValue={defaults.region} className={field}>
                {Object.entries(regions).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="adv-tier" className={label}>Town size</label>
              <select id="adv-tier" name="tier" defaultValue={defaults.tier} className={field}>
                <option value="2">Tier 2</option>
                <option value="3">Tier 3</option>
                <option value="4">Tier 4</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="adv-shop" className={label}>Shop type</label>
            <select id="adv-shop" name="shopType" defaultValue={defaults.shopType} className={field}>
              {Object.entries(shopTypes).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="adv-season" className={label}>Buying for</label>
            <select id="adv-season" name="season" defaultValue={defaults.season} className={field}>
              {Object.entries(seasons).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="adv-budget" className={label}>Budget (₹)</label>
            <input id="adv-budget" name="budget" inputMode="numeric" defaultValue={defaults.budget} required className={field} />
            {err("budgetRupees") && <p className="mt-1 text-xs text-red-600">{err("budgetRupees")}</p>}
          </div>
          <div>
            <label htmlFor="adv-notes" className={label}>
              About your customers <span className="font-normal text-slate-500">(optional)</span>
            </label>
            <textarea
              id="adv-notes"
              name="notes"
              rows={2}
              maxLength={240}
              defaultValue={defaults.notes}
              placeholder="e.g. mostly college girls and working women"
              className={field}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#b0164f] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#c81d5c] disabled:opacity-60"
        >
          <IconSparkles className="h-4 w-4" />
          {pending ? "Building your plan…" : plan ? "Rebuild my plan" : "Build my stock plan"}
        </button>
        <p className="mt-3 text-xs leading-5 text-slate-500">
          {aiOn
            ? "Plans are written by Claude, an AI model, from the collections live on GarmentBazaar today."
            : "Plans are built from the collections live on GarmentBazaar today."}
        </p>
      </form>

      {/* Result */}
      <div ref={resultRef} className="scroll-mt-24 lg:col-span-8" aria-live="polite">
        {state?.message && (
          <p className="rounded-2xl bg-red-50 px-5 py-4 text-sm text-red-700 ring-1 ring-red-200">{state.message}</p>
        )}

        {pending && !plan && <PlanSkeleton aiOn={aiOn} />}

        {!pending && !plan && !state?.message && (
          <div className="flex h-full min-h-80 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 p-10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#b0164f]/10 text-[#b0164f]">
              <IconSparkles className="h-6 w-6" />
            </span>
            <p className="mt-4 font-serif text-2xl font-semibold text-ink">Your plan appears here</p>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
              You get a budget split by department, the exact collections to order with quantities,
              and why each style suits your town and season.
            </p>
          </div>
        )}

        {plan && (
          <div className={`space-y-6 transition ${pending ? "opacity-50" : ""}`}>
            <div className="rounded-3xl bg-[#12264a] p-6 text-white sm:p-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-amber-200">
                <IconSparkles className="h-3.5 w-3.5" />
                {plan.engine === "ai" ? "AI plan by Claude" : "Quick plan"}
              </span>
              {state?.aiFallback && (
                <span className="ml-2 text-xs text-white/60">The AI was busy, so this plan uses our built-in rules.</span>
              )}
              <p className="mt-4 text-base leading-7 text-white/90">{plan.summary}</p>
              <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["Plan total", formatPaise(plan.totalPaise)],
                  ["Your budget", formatPaise(plan.budgetPaise)],
                  ["Left for reorders", formatPaise(plan.budgetPaise - plan.totalPaise)],
                  ["Styles", String(plan.picks.length)],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-2xl bg-white/10 px-4 py-3">
                    <dt className="text-xs text-white/60">{k}</dt>
                    <dd className="mt-0.5 font-serif text-xl font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {plan.split.length > 0 && (
              <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 sm:p-8">
                <h3 className="font-serif text-xl font-semibold text-ink">How to split your budget</h3>
                <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-slate-100">
                  {plan.split.map((s, i) => (
                    <span key={s.category} className={barColours[i % barColours.length]} style={{ width: `${s.percent}%` }} />
                  ))}
                </div>
                <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {plan.split.map((s, i) => (
                    <li key={s.category} className="flex gap-3">
                      <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${barColours[i % barColours.length]}`} />
                      <span className="text-sm leading-6">
                        <span className="font-semibold text-ink">{s.category} · {s.percent}%</span>
                        {s.why && <span className="block text-slate-600">{s.why}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h3 className="font-serif text-xl font-semibold text-ink">Styles picked for your market</h3>
              <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {plan.picks.map((p) => (
                  <li key={p.slug} className="flex gap-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                    <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-[#f1efeb]">
                      {p.imagePath && (
                        <Image
                          src={p.imagePath}
                          alt={p.name}
                          fill
                          unoptimized
                          sizes="96px"
                          className={p.imagePath.startsWith("/images/products/") ? "object-contain" : "object-cover"}
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{p.category}</p>
                      <Link href={`/collections/${encodeURIComponent(p.slug)}`} className="block font-semibold leading-snug text-ink hover:text-rose-700">
                        {p.name}
                      </Link>
                      <p className="text-xs font-medium uppercase tracking-wide text-rose-600">{p.brandName}</p>
                      <p className="mt-1.5 text-sm text-ink">
                        <span className="font-semibold">{p.units} pcs</span>
                        <span className="text-slate-500"> × {formatPaise(p.pricePaise)} = </span>
                        <span className="font-semibold">{formatPaise(p.totalPaise)}</span>
                      </p>
                      {p.why && <p className="mt-1.5 text-xs leading-5 text-slate-600">{p.why}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {plan.tips.length > 0 && (
              <div className="rounded-3xl bg-[#fff8e6] p-6 ring-1 ring-amber-200 sm:p-8">
                <h3 className="font-serif text-xl font-semibold text-ink">Selling tips</h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                  {plan.tips.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="text-amber-700">•</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/signup?role=retailer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#b0164f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c81d5c]"
              >
                Create free shop account to order
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <p className="text-xs leading-5 text-slate-500">
                A suggestion based on season, region and shop type, not sales data. Check each listing before you order.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PlanSkeleton({ aiOn }: { aiOn: boolean }) {
  return (
    <div className="space-y-4" aria-label="Building your plan">
      <div className="rounded-3xl bg-[#12264a] p-8 text-white">
        <p className="flex items-center gap-2 text-sm font-semibold text-amber-200">
          <IconSparkles className="h-4 w-4 animate-pulse" />
          {aiOn ? "Claude is reading the live catalogue for your shop…" : "Building your plan…"}
        </p>
        <div className="mt-5 space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-white/15" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-white/15" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-36 animate-pulse rounded-2xl bg-white ring-1 ring-slate-200" />
        ))}
      </div>
    </div>
  );
}
