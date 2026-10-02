"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { signup } from "@/actions/auth";
import { IconBuilding, IconCheck, IconFactory, IconStorefront } from "./Icons";

type RoleKey = "retailer" | "brand" | "manufacturer";

const roles: {
  value: RoleKey;
  title: string;
  hint: string;
  icon: typeof IconStorefront;
  ring: string;
  business: string;
  businessPlaceholder: string;
}[] = [
  {
    value: "retailer",
    title: "I buy for my shop",
    hint: "Retailer, boutique or online seller",
    icon: IconStorefront,
    ring: "has-[:checked]:border-[#b0164f] has-[:checked]:bg-rose-50",
    business: "Shop name",
    businessPlaceholder: "e.g. Sharma Fashion House",
  },
  {
    value: "brand",
    title: "I sell my brand",
    hint: "Brand or label selling to stores",
    icon: IconBuilding,
    ring: "has-[:checked]:border-accent-600 has-[:checked]:bg-accent-50",
    business: "Brand name",
    businessPlaceholder: "e.g. Kapoor Weaves",
  },
  {
    value: "manufacturer",
    title: "I make or supply",
    hint: "Manufacturer, factory or fabric mill",
    icon: IconFactory,
    ring: "has-[:checked]:border-[#0f766e] has-[:checked]:bg-teal-50",
    business: "Company name",
    businessPlaceholder: "e.g. Shree Textile Mills",
  },
];

const input =
  "mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-base text-ink shadow-sm outline-none placeholder:text-slate-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 sm:text-sm";

function Err({ msg }: { msg?: string[] }) {
  return msg ? <p className="mt-1 text-xs text-red-600">{msg[0]}</p> : null;
}

export default function SignupForm({ initialRole }: { initialRole?: RoleKey }) {
  const [state, action, pending] = useActionState(signup, undefined);
  const [role, setRole] = useState<RoleKey | undefined>(initialRole);
  // Controlled fields, so a validation error never wipes what was typed.
  const [f, setF] = useState({ name: "", companyName: "", phone: "", city: "", email: "", password: "" });
  const bind = (k: keyof typeof f) => ({
    value: f[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setF((v) => ({ ...v, [k]: e.target.value })),
  });
  const r = roles.find((x) => x.value === role);

  return (
    <form action={action} className="space-y-5">
      {state?.message && (
        <p className="rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-700">{state.message}</p>
      )}

      <fieldset>
        <legend className="text-sm font-semibold text-ink">1. Who are you?</legend>
        <div className="mt-2 grid grid-cols-1 gap-2">
          {roles.map((x) => (
            <label
              key={x.value}
              className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3.5 transition ${x.ring}`}
            >
              <input
                type="radio"
                name="role"
                value={x.value}
                required
                checked={role === x.value}
                onChange={() => setRole(x.value)}
                className="sr-only"
              />
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background">
                <x.icon className="h-5 w-5 text-ink" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-semibold text-ink">{x.title}</span>
                <span className="block text-xs text-slate-500">{x.hint}</span>
              </span>
              {role === x.value && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success-600">
                  <IconCheck className="h-3.5 w-3.5 text-white" />
                </span>
              )}
            </label>
          ))}
        </div>
        <Err msg={state?.errors?.role} />
      </fieldset>

      {r && (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-ink">2. Your details</p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-ink">
                Your name
              </label>
              <input id="name" {...bind("name")} name="name" type="text" required autoComplete="name" className={input} placeholder="Full name" />
              <Err msg={state?.errors?.name} />
            </div>
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-ink">
                {r.business}
              </label>
              <input
                id="companyName"
                {...bind("companyName")}
                name="companyName"
                type="text"
                required
                autoComplete="organization"
                className={input}
                placeholder={r.businessPlaceholder}
              />
              <Err msg={state?.errors?.companyName} />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-ink">
                Mobile (WhatsApp)
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3.5 top-1/2 mt-[3px] -translate-y-1/2 text-base text-slate-500 sm:text-sm">
                  +91
                </span>
                <input
                  id="phone"
                {...bind("phone")}
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  required
                  autoComplete="tel-national"
                  maxLength={17}
                  className={`${input} pl-12`}
                  placeholder="98765 43210"
                />
              </div>
              <Err msg={state?.errors?.phone} />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-ink">
                City or town
              </label>
              <input
                id="city"
                {...bind("city")}
                name="city"
                type="text"
                required
                autoComplete="address-level2"
                className={input}
                placeholder="e.g. Meerut"
              />
              <Err msg={state?.errors?.city} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink">
                Email
              </label>
              <input
                id="email"
                {...bind("email")}
                name="email"
                type="email"
                required
                autoComplete="email"
                className={input}
                placeholder="you@business.com"
              />
              <Err msg={state?.errors?.email} />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-ink">
                Create password
              </label>
              <input
                id="password"
                {...bind("password")}
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                className={input}
                placeholder="At least 8 characters"
              />
              <Err msg={state?.errors?.password} />
            </div>
          </div>

          <button
            type="submit"
            disabled={pending}
            className="inline-flex w-full items-center justify-center rounded-full bg-[#b0164f] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-[#8e1140] disabled:opacity-60"
          >
            {pending ? "Creating your account..." : "Create free account"}
          </button>
          <p className="text-center text-xs text-slate-500">
            Takes under a minute. No fees to join.
          </p>
        </div>
      )}

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-accent-700 hover:text-accent-600">
          Log in
        </Link>
      </p>
    </form>
  );
}
