"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signup } from "@/actions/auth";

const roleOptions = [
  { value: "brand", label: "Brand" },
  { value: "manufacturer", label: "Manufacturer / Factory" },
  { value: "retailer", label: "Retailer" },
];

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form action={action} className="space-y-5">
      {state?.message && (
        <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
          {state.message}
        </p>
      )}

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
        <label htmlFor="companyName" className="block text-sm font-medium text-ink">
          Company name
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          required
          className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none placeholder:text-slate-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
          placeholder="Company name"
        />
        {state?.errors?.companyName && (
          <p className="mt-1 text-xs text-red-600">
            {state.errors.companyName[0]}
          </p>
        )}
      </div>

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
        <label htmlFor="password" className="block text-sm font-medium text-ink">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none placeholder:text-slate-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
          placeholder="At least 8 characters"
        />
        {state?.errors?.password && (
          <p className="mt-1 text-xs text-red-600">{state.errors.password[0]}</p>
        )}
      </div>

      <div>
        <p className="block text-sm font-medium text-ink">I am a...</p>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {roleOptions.map((r) => (
            <label
              key={r.value}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 has-[:checked]:border-accent-500 has-[:checked]:bg-accent-50 has-[:checked]:text-accent-700"
            >
              <input
                type="radio"
                name="role"
                value={r.value}
                required
                className="h-4 w-4 text-accent-600 focus:ring-accent-500"
              />
              {r.label}
            </label>
          ))}
        </div>
        {state?.errors?.role && (
          <p className="mt-1 text-xs text-red-600">{state.errors.role[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-700 disabled:opacity-60"
      >
        {pending ? "Creating account..." : "Create account"}
      </button>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-accent-700 hover:text-accent-600">
          Log in
        </Link>
      </p>
    </form>
  );
}
