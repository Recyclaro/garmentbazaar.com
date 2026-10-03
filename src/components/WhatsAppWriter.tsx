"use client";

import { useActionState } from "react";
import { writeWhatsApp } from "@/actions/ai";
import { waLanguages, waOccasions } from "@/lib/aiOptions";
import CopyButton from "./CopyButton";
import { IconSparkles } from "./Icons";

export interface WaOption {
  slug: string;
  name: string;
  category: string;
}

const field =
  "mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20";
const label = "block text-sm font-medium text-ink";

export default function WhatsAppWriter({
  aiOn,
  options,
  preselect,
}: {
  aiOn: boolean;
  options: WaOption[];
  preselect: string;
}) {
  const [state, action, pending] = useActionState(writeWhatsApp, undefined);
  const groups = [...new Set(options.map((o) => o.category))];
  const result = state?.result;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <form action={action} className="h-fit rounded-3xl bg-white p-6 ring-1 ring-slate-200 sm:p-8 lg:col-span-5">
        <h2 className="font-serif text-2xl font-semibold text-ink">What you&apos;re selling</h2>
        <div className="mt-5 space-y-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="grid grid-cols-[1fr_7rem] gap-2">
              <div>
                <label htmlFor={`wa-item${i}`} className={label}>
                  {i === 0 ? "Collection" : `Collection ${i + 1}`}
                  {i > 0 && <span className="font-normal text-slate-500"> (optional)</span>}
                </label>
                <select id={`wa-item${i}`} name={`item${i}`} defaultValue={i === 0 ? preselect : ""} required={i === 0} className={field}>
                  <option value="">{i === 0 ? "Choose a collection" : "None"}</option>
                  {groups.map((g) => (
                    <optgroup key={g} label={g}>
                      {options.filter((o) => o.category === g).map((o) => (
                        <option key={o.slug} value={o.slug}>{o.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={`wa-price${i}`} className={label}>Your price</label>
                <input id={`wa-price${i}`} name={`price${i}`} inputMode="numeric" placeholder="₹" className={field} />
              </div>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="wa-shop" className={label}>Shop name</label>
              <input id="wa-shop" name="shopName" maxLength={60} placeholder="e.g. Sharma Fashion" className={field} />
            </div>
            <div>
              <label htmlFor="wa-town" className={label}>Town</label>
              <input id="wa-town" name="town" maxLength={60} placeholder="e.g. Nashik" className={field} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="wa-lang" className={label}>Language</label>
              <select id="wa-lang" name="language" defaultValue="hinglish" className={field}>
                {Object.entries(waLanguages)
                  .filter(([k]) => aiOn || k === "hinglish" || k === "english")
                  .map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="wa-occ" className={label}>Occasion</label>
              <select id="wa-occ" name="occasion" defaultValue="new" className={field}>
                {Object.entries(waOccasions).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0d6560] disabled:opacity-60"
        >
          <IconSparkles className="h-4 w-4" />
          {pending ? "Writing…" : result ? "Write again" : "Write my messages"}
        </button>
        <p className="mt-3 text-xs leading-5 text-slate-500">
          {aiOn
            ? "Written by Claude, an AI model. Read before you send; prices appear only if you enter them."
            : "Ready-made drafts in Hinglish or English. Read before you send."}
        </p>
      </form>

      <div className="lg:col-span-7" aria-live="polite">
        {state?.message && <p className="rounded-2xl bg-amber-50 px-5 py-4 text-sm text-amber-900 ring-1 ring-amber-200">{state.message}</p>}
        {!result && !state?.message && (
          <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 p-10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0f766e]/10 text-[#0f766e]">
              <IconSparkles className="h-6 w-6" />
            </span>
            <p className="mt-4 font-serif text-2xl font-semibold text-ink">Your messages appear here</p>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
              A broadcast for your customer list, a one-line WhatsApp Status and a personal note for regulars.
            </p>
          </div>
        )}
        {result && (
          <div className={`space-y-4 ${pending ? "opacity-50" : ""}`}>
            {result.note && <p className="text-sm text-slate-600">{result.note}</p>}
            {result.messages.map((m) => (
              <div key={m.label + m.text.slice(0, 20)} className="rounded-3xl bg-[#e7f6ee] p-5 ring-1 ring-green-200 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0f766e]">{m.label}</p>
                  <div className="flex items-center gap-2">
                    <CopyButton text={m.text} />
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(m.text)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-[#25d366] px-3 py-1.5 text-xs font-semibold text-ink transition hover:bg-[#20bd5a]"
                    >
                      Open in WhatsApp
                    </a>
                  </div>
                </div>
                <p className="mt-3 whitespace-pre-line rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-[15px] leading-6 text-ink shadow-sm">{m.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
