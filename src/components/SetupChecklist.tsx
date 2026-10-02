import Link from "next/link";
import { IconArrowRight, IconCheck } from "./Icons";

export interface SetupStep {
  label: string;
  done: boolean;
  href?: string;
  cta?: string;
}

// "Finish setting up" card on dashboards. Hidden once every step is done.
export default function SetupChecklist({
  title,
  steps,
}: {
  title: string;
  steps: SetupStep[];
}) {
  const done = steps.filter((s) => s.done).length;
  if (done === steps.length) return null;
  const pct = Math.round((done / steps.length) * 100);
  const next = steps.find((s) => !s.done);

  return (
    <div className="rounded-3xl bg-white p-5 ring-1 ring-slate-200 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="font-serif text-xl font-semibold text-ink">{title}</p>
        <span className="text-sm font-semibold text-slate-600">
          {done}/{steps.length} done
        </span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-slate-100">
        <div className="h-2 rounded-full bg-success-600 transition-all" style={{ width: `${pct}%` }} />
      </div>
      <ul className="mt-4 space-y-2">
        {steps.map((s) => (
          <li key={s.label} className="flex items-center gap-3 text-sm">
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                s.done ? "bg-success-600" : "bg-white ring-2 ring-slate-300"
              }`}
            >
              {s.done && <IconCheck className="h-3.5 w-3.5 text-white" />}
            </span>
            <span className={`flex-1 ${s.done ? "text-slate-400 line-through" : "font-medium text-ink"}`}>
              {s.label}
            </span>
            {!s.done && s.href && (
              <Link href={s.href} className="shrink-0 font-semibold text-[#b0164f] hover:underline">
                {s.cta ?? "Do it"}
              </Link>
            )}
          </li>
        ))}
      </ul>
      {next?.href && (
        <Link
          href={next.href}
          className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#b0164f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8e1140] sm:inline-flex"
        >
          Next: {next.label}
          <IconArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
