import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import Container from "@/components/Container";
import AiPageHero from "@/components/AiPageHero";
import { aiEnabled } from "@/lib/claude";
import { IconArrowRight, IconSearch, IconSparkles, IconTarget } from "@/components/Icons";

export const metadata: Metadata = pageMeta({
  title: "AI Tools for Clothing Shop Owners",
  description:
    "Free tools for retailers in Tier 2, 3 and 4 towns: a stock advisor that plans your order, search in Hindi or English, and a WhatsApp message writer in regional languages.",
  path: "/ai-tools",
});

export const dynamic = "force-dynamic";

export default function AiToolsPage() {
  const aiOn = aiEnabled();
  const tools = [
    {
      href: "/stock-advisor",
      icon: IconTarget,
      name: aiOn ? "AI stock advisor" : "Stock advisor",
      title: "Know what to stock before you spend",
      desc: "Enter your town, shop type, season and budget. Get a budget split by department and the exact collections and quantities to order, with a reason for each style.",
      cta: "Plan my stock",
      tone: "bg-[#12264a] text-white",
      sub: "text-white/75",
      btn: "bg-amber-300 text-ink hover:bg-amber-200",
    },
    {
      href: "/ask",
      icon: IconSearch,
      name: aiOn ? "AI search" : "Smart search",
      title: "Ask for stock in your own words",
      desc: aiOn
        ? "Write like you'd talk to a wholesaler, in Hindi, English or Hinglish: product, customer, season, price per piece, MOQ."
        : "Type a product with a price per piece or MOQ, like 'kurtis under 500, small MOQ'.",
      cta: "Find stock",
      tone: "bg-[#fdf2f6] text-ink ring-1 ring-rose-200",
      sub: "text-slate-600",
      btn: "bg-[#b0164f] text-white hover:bg-[#c81d5c]",
    },
    {
      href: "/whatsapp-writer",
      icon: IconSparkles,
      name: aiOn ? "AI WhatsApp writer" : "WhatsApp writer",
      title: "Sell it on WhatsApp the same day",
      desc: aiOn
        ? "Pick what you've bought. Get a broadcast, a Status line and a note for regulars in Hinglish, Hindi or 9 regional languages."
        : "Pick what you've bought. Get a broadcast and a Status line in Hinglish or English.",
      cta: "Write my messages",
      tone: "bg-[#e7f6ee] text-ink ring-1 ring-green-200",
      sub: "text-slate-600",
      btn: "bg-[#0f766e] text-white hover:bg-[#0d6560]",
    },
  ];
  return (
    <>
      <AiPageHero
        badge={aiOn ? "AI tools · Free" : "Smart tools · Free"}
        title="Tools that do the thinking a busy shop owner has no time for."
        intro={
          aiOn
            ? "Plan, find and sell stock with Claude, an AI model, working from the live GarmentBazaar catalogue. Free for shop owners, no signup needed to try."
            : "Plan, find and sell stock using the live GarmentBazaar catalogue. Free for shop owners, no signup needed to try."
        }
      />
      <section className="bg-background py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {tools.map((t) => (
              <Link key={t.href} href={t.href} className={`group flex flex-col rounded-[2rem] p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 ${t.tone}`}>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] opacity-80">
                  <t.icon className="h-4 w-4" />
                  {t.name}
                </span>
                <span className="mt-4 font-serif text-2xl font-semibold leading-tight sm:text-3xl">{t.title}</span>
                <span className={`mt-3 text-sm leading-6 ${t.sub}`}>{t.desc}</span>
                <span className={`mt-8 inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${t.btn}`}>
                  {t.cta}
                  <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-6 text-slate-500">
            Results only ever show real collections that are live on GarmentBazaar, at their listed
            wholesale price and MOQ. Suggestions are based on season, region and shop type, not sales
            data, so check each listing before you order.
          </p>
        </Container>
      </section>
    </>
  );
}
