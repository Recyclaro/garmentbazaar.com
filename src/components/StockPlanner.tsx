"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { IconArrowRight } from "./Icons";

// Turns a buying budget into a stocking plan, using the median order size
// (price × MOQ) of live collections in each price band. Everything shown is
// computed from those figures and what the visitor types.
export interface PlannerBand {
  key: string;
  label: string;
  count: number;
  medianOrder: number; // paise, one collection at its MOQ
  medianMoq: number;
}

function rupees(paise: number) {
  return `₹${Math.round(paise / 100).toLocaleString("en-IN")}`;
}

const tones = ["bg-[#f4c430]", "bg-[#b0164f]", "bg-[#0f766e]", "bg-[#16335e]"];

export default function StockPlanner({ bands }: { bands: PlannerBand[] }) {
  const usable = bands.filter((b) => b.count > 0 && b.medianOrder > 0);
  const [budget, setBudget] = useState(100000);
  const [focus, setFocus] = useState<string>("mix");

  const plan = useMemo(() => {
    const paise = budget * 100;
    const chosen = focus === "mix" ? usable : usable.filter((b) => b.key === focus);
    if (chosen.length === 0) return { rows: [], lines: 0, pieces: 0, left: paise };
    // Round-robin: add one line per band in turn while the budget allows,
    // so a mix spreads across budgets and spends the money properly.
    let left = paise;
    const lines = chosen.map(() => 0);
    let added = true;
    while (added) {
      added = false;
      chosen.forEach((b, i) => {
        if (lines[i] < b.count && b.medianOrder <= left) {
          lines[i] += 1;
          left -= b.medianOrder;
          added = true;
        }
      });
    }
    const rows = chosen.map((b, i) => ({
      ...b,
      lines: lines[i],
      pieces: lines[i] * b.medianMoq,
      spend: lines[i] * b.medianOrder,
    }));
    return {
      rows,
      lines: rows.reduce((n, r) => n + r.lines, 0),
      pieces: rows.reduce((n, r) => n + r.pieces, 0),
      left,
    };
  }, [budget, focus, usable]);

  const maxSpend = Math.max(1, ...plan.rows.map((r) => r.spend));

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200 lg:grid-cols-2">
      <div className="p-6 sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0f766e]">
          Stock planner
        </p>
        <h3 className="text-balance mt-3 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Plan your next restock
        </h3>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Enter what you want to spend. We&apos;ll show how many new lines it
          buys at brand MOQs, so you can test more styles with the same money.
        </p>

        <label className="mt-8 block text-sm font-medium text-slate-700">
          Buying budget (₹)
          <input
            type="number"
            min={0}
            step={5000}
            inputMode="numeric"
            value={budget}
            onChange={(e) => setBudget(Math.max(0, Number(e.target.value)))}
            className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-lg font-semibold text-ink outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20"
          />
        </label>
        <input
          type="range"
          min={10000}
          max={500000}
          step={5000}
          value={Math.min(500000, Math.max(10000, budget))}
          onChange={(e) => setBudget(Number(e.target.value))}
          aria-label="Budget slider"
          className="mt-4 w-full accent-[#0f766e]"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>₹10K</span>
          <span>₹5L</span>
        </div>

        <p className="mt-6 text-sm font-medium text-slate-700">Spend it on</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {[{ key: "mix", label: "A mix of budgets" }, ...usable].map((b) => (
            <button
              key={b.key}
              type="button"
              onClick={() => setFocus(b.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                focus === b.key
                  ? "bg-[#0f766e] text-white"
                  : "bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-slate-400"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col bg-[#f1f7f6] p-6 sm:p-10" aria-live="polite">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white p-4 ring-1 ring-teal-100">
            <p className="text-xs text-slate-500">New lines you can stock</p>
            <p className="mt-1 font-serif text-4xl font-semibold text-ink">{plan.lines}</p>
          </div>
          <div className="rounded-2xl bg-white p-4 ring-1 ring-teal-100">
            <p className="text-xs text-slate-500">Pieces on your shelf</p>
            <p className="mt-1 font-serif text-4xl font-semibold text-ink">
              ~{plan.pieces.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <ul className="mt-6 space-y-4">
          {plan.rows.map((r) => {
            const i = bands.findIndex((b) => b.key === r.key);
            return (
              <li key={r.key}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-semibold text-ink">{r.label}</span>
                  <span className="text-slate-600">
                    {r.lines} line{r.lines === 1 ? "" : "s"} · {rupees(r.spend)}
                  </span>
                </div>
                <div className="mt-1.5 h-2.5 rounded-full bg-white">
                  <div
                    className={`h-2.5 rounded-full ${tones[i] ?? "bg-ink"}`}
                    style={{ width: `${r.spend ? Math.max(4, (r.spend / maxSpend) * 100) : 0}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-sm text-slate-700">
          {plan.lines === 0
            ? "Raise the budget to cover at least one collection at its MOQ."
            : `About ${rupees(plan.left)} left over. Tip: test a few lines first, then reorder the ones that sell.`}
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Based on the median order size (price × MOQ) of live collections in each price band.
        </p>

        <Link
          href={focus === "mix" ? "/collections?sort=moq-asc" : `/collections?price=${focus}`}
          className="mt-6 inline-flex items-center justify-center gap-2 self-start rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0b5c56]"
        >
          Shop this plan
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
