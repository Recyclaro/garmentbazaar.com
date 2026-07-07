"use client";

import { FormEvent, useState } from "react";

const roles = [
  "Brand",
  "Manufacturer / Factory",
  "Retailer",
  "Other",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-ink"
          >
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
        </div>
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-ink"
          >
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
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-ink"
          >
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
        </div>
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-ink"
          >
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
        <label
          htmlFor="message"
          className="block text-sm font-medium text-ink"
        >
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none placeholder:text-slate-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
          placeholder="Tell us about your sourcing needs..."
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-700 sm:w-auto"
      >
        Send message
      </button>
    </form>
  );
}
