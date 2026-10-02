"use client";

import Link from "next/link";
import { useState } from "react";
import { IconArrowRight } from "./Icons";

// A quick retail margin check. Every number comes from what the visitor
// types; the starting values are only an example.
function rupees(n: number) {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export default function MarginCalculator() {
  const [cost, setCost] = useState(620);
  const [sell, setSell] = useState(1199);
  const [qty, setQty] = useState(30);

  const outlay = cost * qty;
  const revenue = sell * qty;
  const profit = revenue - outlay;
  const margin = sell > 0 ? (profit / revenue) * 100 : 0;
  const markup = cost > 0 ? ((sell - cost) / cost) * 100 : 0;
  const healthy = margin >= 40;

  const field =
    "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-lg font-semibold text-ink outline-none focus:border-[#b0164f] focus:ring-2 focus:ring-[#b0164f]/20";

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200 lg:grid-cols-2">
      <div className="p-6 sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b0164f]">
          Margin calculator
        </p>
        <h2 className="text-balance mt-3 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          How much will you make?
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Every collection shows its wholesale price per piece. Plug it in
          with your shelf price and see your margin before you order.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <label className="text-sm font-medium text-slate-700">
            Wholesale price (₹)
            <input
              type="number"
              min={0}
              inputMode="numeric"
              value={cost}
              onChange={(e) => setCost(Math.max(0, Number(e.target.value)))}
              className={field}
            />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Your selling price (₹)
            <input
              type="number"
              min={0}
              inputMode="numeric"
              value={sell}
              onChange={(e) => setSell(Math.max(0, Number(e.target.value)))}
              className={field}
            />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Pieces
            <input
              type="number"
              min={1}
              inputMode="numeric"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
              className={field}
            />
          </label>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Example figures. Excludes GST, freight and your store costs.
        </p>
      </div>

      <div
        className="flex flex-col justify-between bg-[#b0164f] p-6 text-white sm:p-10"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.1) 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px",
        }}
        aria-live="polite"
      >
        <div>
          <p className="text-sm font-medium text-rose-100">Profit on this order</p>
          <p className="mt-1 font-serif text-5xl font-semibold sm:text-6xl">
            {rupees(profit)}
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs text-rose-100">Margin</p>
              <p className="mt-1 text-2xl font-semibold">{margin.toFixed(0)}%</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs text-rose-100">Markup</p>
              <p className="mt-1 text-2xl font-semibold">{markup.toFixed(0)}%</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs text-rose-100">You invest</p>
              <p className="mt-1 text-2xl font-semibold">{rupees(outlay)}</p>
            </div>
          </div>
          <p className="mt-6 text-sm text-rose-50">
            {profit <= 0
              ? "This price loses money. Try a higher selling price."
              : healthy
                ? "Healthy margin. That's a line worth stocking."
                : "Thin margin. Look for a lower wholesale price or a smaller MOQ."}
          </p>
        </div>
        <Link
          href="/collections?price=under-500"
          className="mt-8 inline-flex items-center justify-center gap-2 self-start rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-rose-50"
        >
          Find high-margin stock under ₹500
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
