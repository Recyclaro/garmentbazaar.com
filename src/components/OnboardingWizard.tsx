"use client";

import Image from "next/image";
import { useState } from "react";
import { completeOnboarding, skipOnboarding } from "@/actions/onboarding";
import { departments } from "@/data/departments";
import { budgets, channels, moqs, storeTypes } from "@/data/onboarding";
import { IconArrowRight, IconCheck } from "./Icons";

type Role = "retailer" | "brand" | "manufacturer";

interface Step {
  key: string;
  title: string;
  hint: string;
  multi: boolean;
  required: boolean;
  options: { value: string; label: string; photo?: string }[];
}

const deptOptions = departments.map((d) => ({
  value: d.name,
  label: d.label,
  photo: d.photos[0].file,
}));

function stepsFor(role: Role, supplierCategories: string[]): Step[] {
  const opts = (xs: readonly string[]) => xs.map((x) => ({ value: x, label: x }));
  if (role === "retailer") {
    return [
      { key: "storeType", title: "What kind of shop do you run?", hint: "Pick one", multi: false, required: true, options: opts(storeTypes) },
      { key: "departments", title: "What do you stock?", hint: "Pick all that apply. We'll show these first.", multi: true, required: true, options: deptOptions },
      { key: "budget", title: "Roughly how much do you buy in a month?", hint: "Helps us suggest the right MOQs", multi: false, required: false, options: opts(budgets) },
    ];
  }
  if (role === "brand") {
    return [
      { key: "departments", title: "What does your brand sell?", hint: "Pick all that apply", multi: true, required: true, options: deptOptions },
      { key: "moq", title: "What's your usual minimum order?", hint: "Pieces per style or set", multi: false, required: false, options: opts(moqs) },
      { key: "channels", title: "Where do you sell today?", hint: "Pick all that apply", multi: true, required: false, options: opts(channels) },
    ];
  }
  return [
    { key: "makes", title: "What do you make or supply?", hint: "Pick all that apply", multi: true, required: true, options: opts(supplierCategories) },
    { key: "moq", title: "What's your usual minimum order?", hint: "Pieces or metres per order", multi: false, required: false, options: opts(moqs) },
  ];
}

const finishLabel: Record<Role, string> = {
  retailer: "Show me my stock",
  brand: "Add my first collection",
  manufacturer: "Create my factory listing",
};

export default function OnboardingWizard({
  role,
  name,
  supplierCategories,
}: {
  role: Role;
  name: string;
  supplierCategories: string[];
}) {
  const steps = stepsFor(role, supplierCategories);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const step = steps[i];
  const chosen = answers[step.key] ?? [];
  const last = i === steps.length - 1;
  const canGo = !step.required || chosen.length > 0;

  function toggle(v: string) {
    setAnswers((a) => {
      const cur = a[step.key] ?? [];
      const next = step.multi
        ? cur.includes(v)
          ? cur.filter((x) => x !== v)
          : [...cur, v]
        : [v];
      return { ...a, [step.key]: next };
    });
    if (!step.multi && !last) setTimeout(() => setI((n) => n + 1), 180);
  }

  const withPhotos = step.options.some((o) => o.photo);

  return (
    <div>
      <p className="text-sm text-slate-600">
        Hi {name.split(/\s+/)[0]}. {steps.length} quick questions so we can set up GarmentBazaar for you.
      </p>

      <div className="mt-4 flex gap-1.5" aria-hidden>
        {steps.map((s, n) => (
          <span key={s.key} className={`h-1.5 flex-1 rounded-full ${n <= i ? "bg-[#b0164f]" : "bg-slate-200"}`} />
        ))}
      </div>
      <p className="mt-2 text-xs font-medium text-slate-500">
        Step {i + 1} of {steps.length}
      </p>

      <h2 className="mt-4 font-serif text-2xl font-semibold text-ink sm:text-3xl">{step.title}</h2>
      <p className="mt-1 text-sm text-slate-500">{step.hint}</p>

      <div className={`mt-5 grid gap-2 ${withPhotos ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
        {step.options.map((o) => {
          const on = chosen.includes(o.value);
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(o.value)}
              className={`relative flex min-w-0 rounded-2xl border-2 text-sm font-semibold transition ${
                o.photo
                  ? "flex-col items-center gap-2 px-2 pb-3 pt-3 text-center"
                  : "items-center gap-2.5 py-3 pl-3 pr-8 text-left"
              } ${
                on ? "border-[#b0164f] bg-rose-50 text-ink" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
              }`}
            >
              {o.photo && (
                <span className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-[#f1efeb]">
                  <Image src={`/images/products/${o.photo}.jpg`} alt="" fill unoptimized sizes="56px" className="object-contain" />
                </span>
              )}
              <span className="min-w-0 leading-snug">{o.label}</span>
              {on && (
                <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#b0164f]">
                  <IconCheck className="h-3 w-3 text-white" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <form
        action={completeOnboarding}
        className="sticky bottom-0 z-10 -mx-6 mt-8 border-t border-slate-100 bg-white/95 px-6 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0"
      >
        {Object.entries(answers).flatMap(([k, vs]) =>
          vs.map((v) => <input key={`${k}-${v}`} type="hidden" name={k} value={v} />),
        )}
        <div className="flex items-center gap-3">
          {i > 0 && (
            <button
              type="button"
              onClick={() => setI((n) => n - 1)}
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-ink"
            >
              Back
            </button>
          )}
          {last ? (
            <button
              key="finish"
              type="submit"
              disabled={!canGo}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#b0164f] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[#8e1140] disabled:opacity-50"
            >
              {finishLabel[role]}
              <IconArrowRight className="h-4 w-4" />
            </button>
          ) : (
            // Separate keys stop React reusing this node as the submit
            // button, which would submit the form on the tap that advances.
            <button
              key="next"
              type="button"
              disabled={!canGo}
              onClick={() => setI((n) => n + 1)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
            >
              Next
              <IconArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      <form action={skipOnboarding} className="mt-4 text-center">
        <button type="submit" className="text-sm font-medium text-slate-500 underline-offset-4 hover:underline">
          Skip for now
        </button>
      </form>
    </div>
  );
}
