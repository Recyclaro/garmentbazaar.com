"use client";

import { useActionState } from "react";
import type { ListingFormState } from "@/actions/listings";
import { categories, regions, certifications, type Supplier } from "@/data/suppliers";

type ListingAction = (
  prevState: ListingFormState | undefined,
  formData: FormData,
) => Promise<ListingFormState | undefined>;

export default function ListingForm({
  action,
  initial,
  submitLabel = "Submit for review",
}: {
  action: ListingAction;
  initial?: Partial<Supplier>;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="space-y-5">
      {state?.message && (
        <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink">
            Company name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={initial?.name}
            className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
          />
          {state?.errors?.name && (
            <p className="mt-1 text-xs text-red-600">{state.errors.name[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-ink">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            required
            defaultValue={initial?.city}
            className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
          />
          {state?.errors?.city && (
            <p className="mt-1 text-xs text-red-600">{state.errors.city[0]}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="region" className="block text-sm font-medium text-ink">
            Region
          </label>
          <select
            id="region"
            name="region"
            required
            defaultValue={initial?.region ?? ""}
            className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
          >
            <option value="" disabled>
              Select a region
            </option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          {state?.errors?.region && (
            <p className="mt-1 text-xs text-red-600">{state.errors.region[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-ink">
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue={initial?.category ?? ""}
            className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {state?.errors?.category && (
            <p className="mt-1 text-xs text-red-600">{state.errors.category[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="specialties" className="block text-sm font-medium text-ink">
          Specialties
        </label>
        <input
          id="specialties"
          name="specialties"
          type="text"
          required
          defaultValue={initial?.specialties?.join(", ")}
          placeholder="e.g. Jersey, French Terry, Fleece"
          className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none placeholder:text-slate-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
        />
        <p className="mt-1 text-xs text-slate-500">Comma-separated.</p>
        {state?.errors?.specialties && (
          <p className="mt-1 text-xs text-red-600">{state.errors.specialties[0]}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="moq" className="block text-sm font-medium text-ink">
            MOQ
          </label>
          <input
            id="moq"
            name="moq"
            type="number"
            min={1}
            required
            defaultValue={initial?.moq ?? undefined}
            className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
          />
          {state?.errors?.moq && (
            <p className="mt-1 text-xs text-red-600">{state.errors.moq[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="leadTimeDays" className="block text-sm font-medium text-ink">
            Lead time (days)
          </label>
          <input
            id="leadTimeDays"
            name="leadTimeDays"
            type="number"
            min={1}
            required
            defaultValue={initial?.leadTimeDays ?? undefined}
            className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
          />
          {state?.errors?.leadTimeDays && (
            <p className="mt-1 text-xs text-red-600">
              {state.errors.leadTimeDays[0]}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="since" className="block text-sm font-medium text-ink">
            Operating since (year)
          </label>
          <input
            id="since"
            name="since"
            type="number"
            min={1900}
            max={new Date().getFullYear()}
            required
            defaultValue={initial?.since ?? undefined}
            className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
          />
          {state?.errors?.since && (
            <p className="mt-1 text-xs text-red-600">{state.errors.since[0]}</p>
          )}
        </div>
      </div>

      <div>
        <p className="block text-sm font-medium text-ink">Certifications</p>
        <div className="mt-2 flex flex-wrap gap-3">
          {certifications.map((cert) => (
            <label
              key={cert}
              className="flex items-center gap-2 text-sm text-slate-600"
            >
              <input
                type="checkbox"
                name="certifications"
                value={cert}
                defaultChecked={initial?.certifications?.includes(cert)}
                className="h-4 w-4 rounded border-slate-300 text-accent-600 focus:ring-accent-500"
              />
              {cert}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-700 disabled:opacity-60"
      >
        {pending ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
