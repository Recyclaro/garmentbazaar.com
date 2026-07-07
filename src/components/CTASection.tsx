import Link from "next/link";
import Container from "./Container";
import { IconArrowRight } from "./Icons";

export default function CTASection({
  title = "Ready to modernize your sourcing?",
  subtitle = "Tell us about your business and see how GarmentBazaar's AI can plug into your sourcing, procurement, and supply chain workflows.",
  primaryLabel = "Request a Demo",
  primaryHref = "/contact",
  secondaryLabel = "Explore the Platform",
  secondaryHref = "/platform",
}: {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-accent-700/15 blur-3xl" />
      <Container className="relative py-20 text-center">
        <h2 className="text-balance mx-auto max-w-2xl font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="text-balance mx-auto mt-4 max-w-xl text-base leading-7 text-slate-400">
          {subtitle}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-700"
          >
            {primaryLabel}
            <IconArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            {secondaryLabel}
          </Link>
        </div>
      </Container>
    </section>
  );
}
