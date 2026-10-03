"use client";

import { useState, type ReactNode } from "react";

// Tabs for the free retailer tools. Every panel stays mounted (only hidden),
// so numbers typed into one tool are kept when switching tabs.
export default function ToolTabs({
  tabs,
}: {
  tabs: { id: string; label: string; hint: string; panel: ReactNode }[];
}) {
  const [active, setActive] = useState(tabs[0]?.id);
  return (
    <div className="mt-8">
      <div
        role="tablist"
        aria-label="Free retailer tools"
        className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 sm:mx-0 sm:px-0"
      >
        {tabs.map((t) => {
          const on = t.id === active;
          return (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`panel-${t.id}`}
              onClick={() => setActive(t.id)}
              className={`shrink-0 rounded-2xl px-4 py-2.5 text-left transition sm:px-5 sm:py-3 ${
                on ? "bg-ink text-white shadow-lg shadow-slate-900/15" : "bg-white text-ink ring-1 ring-slate-200 hover:ring-slate-300"
              }`}
            >
              <span className="block text-sm font-semibold">{t.label}</span>
              <span className={`block text-xs ${on ? "text-white/70" : "text-slate-500"}`}>{t.hint}</span>
            </button>
          );
        })}
      </div>
      {tabs.map((t) => (
        <div
          key={t.id}
          id={`panel-${t.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${t.id}`}
          hidden={t.id !== active}
          className="mt-5"
        >
          {t.panel}
        </div>
      ))}
    </div>
  );
}
