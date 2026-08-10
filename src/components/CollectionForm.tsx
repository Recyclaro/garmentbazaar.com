"use client";

import { useActionState } from "react";
import type { CollectionFormState } from "@/actions/collections";
import { collectionCategories, type Collection } from "@/data/collections";

type CollectionAction = (
  prevState: CollectionFormState | undefined,
  formData: FormData,
) => Promise<CollectionFormState | undefined>;

export default function CollectionForm({
  action,
  initial,
  submitLabel = "Submit for review",
}: {
  action: CollectionAction;
  initial?: Partial<Collection>;
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

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink">
          Collection name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={initial?.name}
          placeholder="e.g. Autumn Handloom Sarees"
          className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
        />
        {state?.errors?.name && (
          <p className="mt-1 text-xs text-red-600">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-ink">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={initial?.description}
          placeholder="What's in this collection, materials, sizing, what makes it sell..."
          className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
        />
        {state?.errors?.description && (
          <p className="mt-1 text-xs text-red-600">{state.errors.description[0]}</p>
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
          className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
        >
          <option value="" disabled>
            Select a category
          </option>
          {collectionCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {state?.errors?.category && (
          <p className="mt-1 text-xs text-red-600">{state.errors.category[0]}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-ink">
            Price per unit (₹)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min={1}
            step="0.01"
            required
            defaultValue={
              initial?.pricePaise !== undefined ? initial.pricePaise / 100 : undefined
            }
            className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
          />
          {state?.errors?.price && (
            <p className="mt-1 text-xs text-red-600">{state.errors.price[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="moq" className="block text-sm font-medium text-ink">
            Minimum order quantity
          </label>
          <input
            id="moq"
            name="moq"
            type="number"
            min={1}
            required
            defaultValue={initial?.moq ?? undefined}
            className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
          />
          {state?.errors?.moq && (
            <p className="mt-1 text-xs text-red-600">{state.errors.moq[0]}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 disabled:opacity-60"
      >
        {pending ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
