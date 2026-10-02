"use client";

import Link from "next/link";
import { useState } from "react";
import { IconArrowRight } from "./Icons";

// What restocking trips to big-city wholesale markets cost a small-town
// shop in a year. Every figure comes from what the visitor enters; the
// starting values are only an example.
function rupees(n: number) {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export default function TripCostCalculator() {
  const [trips, setTrips] = useState(2);
  const [fare, setFare] = useState(3500);
  const [days, setDays] = useState(2);
  const [sales, setSales] = useState(6000);

  const perTrip = fare + days * sales;
  const yearly = perTrip * trips * 12;

  const field =
    "mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base font-semibold text-ink outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20";

  return (
    <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200">
      <div className="p-5 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
          Mandi trip calculator
        </p>
        <h3 className="mt-2 font-serif text-2xl font-semibold text-ink sm:text-3xl">
          What do restock trips really cost you?
        </h3>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <label className="text-xs font-medium text-slate-700 sm:text-sm">
            Trips a month
            <input type="number" min={0} inputMode="numeric" value={trips} onChange={(e) => setTrips(Math.max(0, Number(e.target.value)))} className={field} />
          </label>
          <label className="text-xs font-medium text-slate-700 sm:text-sm">
            Travel + stay per trip (₹)
            <input type="number" min={0} inputMode="numeric" value={fare} onChange={(e) => setFare(Math.max(0, Number(e.target.value)))} className={field} />
          </label>
          <label className="text-xs font-medium text-slate-700 sm:text-sm">
            Days away per trip
            <input type="number" min={0} inputMode="numeric" value={days} onChange={(e) => setDays(Math.max(0, Number(e.target.value)))} className={field} />
          </label>
          <label className="text-xs font-medium text-slate-700 sm:text-sm">
            Sales lost per day away (₹)
            <input type="number" min={0} inputMode="numeric" value={sales} onChange={(e) => setSales(Math.max(0, Number(e.target.value)))} className={field} />
          </label>
        </div>
      </div>
      <div className="bg-amber-300 p-5 sm:p-8" aria-live="polite">
        <p className="text-sm font-medium text-ink/80">Your restock trips cost you about</p>
        <p className="mt-1 font-serif text-4xl font-semibold text-ink sm:text-5xl">
          {rupees(yearly)}
          <span className="text-base font-sans font-medium"> a year</span>
        </p>
        <p className="mt-2 text-sm text-ink/80">
          {rupees(perTrip)} per trip, before you&apos;ve bought a single piece.
        </p>
        <Link
          href="/collections"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Restock from your phone instead
          <IconArrowRight className="h-4 w-4" />
        </Link>
        <p className="mt-3 text-xs text-ink/70">Example figures. Change them to match your shop.</p>
      </div>
    </div>
  );
}
