import Link from "next/link";
import type { ReactNode } from "react";
import { IconArrowRight } from "./Icons";

// One heading style for every home page section: eyebrow, serif title,
// optional intro and an optional "see all" link on the right.
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  link,
  tone = "text-[#b0164f]",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  link?: { href: string; label: string };
  tone?: string;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className={`text-xs font-bold uppercase tracking-[0.16em] ${tone}`}>{eyebrow}</p>
        )}
        <h2 className="text-balance mt-2 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-[2.75rem] sm:leading-[1.1]">
          {title}
        </h2>
        {intro && <p className="mt-3 text-base leading-7 text-slate-600">{intro}</p>}
      </div>
      {link && (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-rose-700 hover:text-rose-600"
        >
          {link.label}
          <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
