import type { ReactNode } from "react";
import Container from "./Container";
import { IconSparkles } from "./Icons";

// Shared top band for the AI tool pages.
export default function AiPageHero({
  badge,
  title,
  intro,
  glow = "bg-[#b0164f]/40",
}: {
  badge: string;
  title: ReactNode;
  intro: ReactNode;
  glow?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#12264a] text-white">
      <div aria-hidden className={`pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full ${glow} blur-3xl`} />
      <Container className="relative py-12 sm:py-16">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-amber-200 ring-1 ring-white/15">
          <IconSparkles className="h-3.5 w-3.5" />
          {badge}
        </span>
        <h1 className="text-balance mt-5 max-w-3xl font-serif text-4xl font-semibold tracking-tight sm:text-6xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-white/80">{intro}</p>
      </Container>
    </section>
  );
}
