"use client";

import { useActionState } from "react";
import { submitRfq } from "@/actions/rfq";

const roles = ["Brand", "Manufacturer / Factory", "Retailer", "Other"];

export default function ContactForm({
  defaultMessage,
  supplierSlug,
}: {
  defaultMessage?: string;
  supplierSlug?: string;
}) {
  const [state, action, pending] = useActionState(submitRfq, undefined);

  if (state?.success) {
    return (
      <div className="rounded-2xl border border-accent-200 bg-accent-50 p-8 text-center">
        <h3 className="text-lg font-semibold text-ink">
          Thanks — we&apos;ve got your message
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Our team will get back to you shortly at the email you provided.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      {supplierSlug && (
        <input type="hidden" name="supplierSlug" value={supplierSlug} />
      )}
      {state?.message && (
        <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
          {state.message}
        </p>
      )}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none placeholder:text-slate-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
            placeholder="Jane Doe"
          />
          {state?.errors?.name && (
            <p className="mt-1 text-xs text-red-600">{state.errors.name[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-ink">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none placeholder:text-slate-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
            placeholder="Company name"
          />
          {state?.errors?.company && (
            <p className="mt-1 text-xs text-red-600">{state.errors.company[0]}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none placeholder:text-slate-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
            placeholder="you@company.com"
          />
          {state?.errors?.email && (
            <p className="mt-1 text-xs text-red-600">{state.errors.email[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-ink">
            I am a...
          </label>
          <select
            id="role"
            name="role"
            required
            defaultValue=""
            className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
          >
            <option value="" disabled>
              Select one
            </option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          defaultValue={defaultMessage}
          className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none placeholder:text-slate-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
          placeholder="Tell us about your sourcing needs..."
        />
        {state?.errors?.message && (
          <p className="mt-1 text-xs text-red-600">{state.errors.message[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-700 disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
