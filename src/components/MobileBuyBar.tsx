import Link from "next/link";
import type { ReactNode } from "react";

// A bar fixed to the bottom of the screen on phones only, for the one
// action that matters on the page. Pages that use it render a spacer
// (see MobileBarSpacer) so the bar never hides the footer.
export default function MobileBuyBar({
  info,
  cta,
  href,
  secondary,
}: {
  info?: ReactNode;
  cta: string;
  href: string;
  secondary?: { label: string; href: string };
}) {
  return (
    <div className="fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-40 border-t border-slate-200 bg-white/95 px-4 pb-3 pt-3 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
      <div className="flex items-center gap-3">
        {info && <div className="min-w-0 flex-1">{info}</div>}
        {secondary && (
          <Link
            href={secondary.href}
            className="flex-1 rounded-full border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-ink"
          >
            {secondary.label}
          </Link>
        )}
        <Link
          href={href}
          className={`${info ? "shrink-0" : "flex-1"} rounded-full bg-[#b0164f] px-5 py-3 text-center text-sm font-semibold text-white`}
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}

export function MobileBarSpacer() {
  return <div className="h-24 md:hidden" aria-hidden />;
}
