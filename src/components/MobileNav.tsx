"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconCart, IconSearch, IconStorefront, IconBoxes } from "./Icons";

// App-style tab bar on phones, so shop owners can reach the shop, budget
// buys and their orders with a thumb. Hidden from md up.
export default function MobileNav({ loggedIn }: { loggedIn: boolean }) {
  const path = usePathname() ?? "/";
  // Onboarding has its own sticky Next button; keep the screen focused.
  if (path.startsWith("/onboarding")) return null;
  const tabs = [
    { href: "/", label: "Home", icon: IconStorefront, active: path === "/" },
    {
      href: "/collections",
      label: "Shop",
      icon: IconSearch,
      active: path.startsWith("/collections") || path.startsWith("/wholesale"),
    },
    {
      href: "/collections?price=under-500",
      label: "Under ₹500",
      icon: IconCart,
      active: false,
    },
    {
      href: loggedIn ? "/dashboard" : "/signup",
      label: loggedIn ? "My orders" : "Join free",
      icon: IconBoxes,
      active: path.startsWith("/dashboard") || path.startsWith("/signup"),
    },
  ];

  return (
    <nav
      aria-label="Quick links"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_20px_rgba(15,23,42,0.08)] backdrop-blur md:hidden"
    >
      <ul className="grid grid-cols-4">
        {tabs.map((t) => (
          <li key={t.label}>
            <Link
              href={t.href}
              className={`flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold ${
                t.active ? "text-[#b0164f]" : "text-slate-600"
              }`}
            >
              <t.icon className="h-6 w-6" />
              {t.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
