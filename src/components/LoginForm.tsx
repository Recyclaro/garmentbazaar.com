"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "@/actions/auth";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="space-y-5">
      {state?.message && (
        <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink">
          Email
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
          className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none placeholder:text-slate-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
          placeholder="Your password"
        />
        {state?.errors?.password && (
          <p className="mt-1 text-xs text-red-600">{state.errors.password[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-700 disabled:opacity-60"
      >
        {pending ? "Logging in..." : "Log in"}
      </button>

      <p className="text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-accent-700 hover:text-accent-600">
          Sign up
        </Link>
      </p>
    </form>
  );
}
