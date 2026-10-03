import type { Metadata } from "next";
import Container from "@/components/Container";
import StockAdvisor from "@/components/StockAdvisor";
import { aiEnabled, currentSeason } from "@/lib/advisor";
import { regions, seasons, shopTypes } from "@/lib/advisorOptions";
import { IconSparkles } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Stock Advisor: Plan Your Wholesale Order for Your Town",
  description:
    "Tell us your town, shop type, season and budget. Get a budget split and the exact wholesale collections to order, with reasons, from brands live on GarmentBazaar.",
  alternates: { canonical: "/stock-advisor" },
};

// The AI switch (ANTHROPIC_API_KEY) and the season are read per request.
export const dynamic = "force-dynamic";

const pick = <T extends Record<string, string>>(v: unknown, options: T, fallback: keyof T & string) =>
  typeof v === "string" && v in options ? v : fallback;

export default async function StockAdvisorPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const aiOn = aiEnabled();
  const one = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : "");
  const budget = one("budget").replace(/[^0-9]/g, "");
  const tier = ["2", "3", "4"].includes(one("tier")) ? one("tier") : "3";

  const defaults = {
    town: one("town").slice(0, 60),
    region: pick(sp.region, regions, "north"),
    tier,
    shopType: pick(sp.shop, shopTypes, "family"),
    season: pick(sp.season, seasons, currentSeason()),
    budget: budget || "100000",
    notes: "",
  };

  return (
    <>
      <section className="relative overflow-hidden bg-[#12264a] text-white">
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#b0164f]/40 blur-3xl" />
        <Container className="relative py-12 sm:py-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-amber-200 ring-1 ring-white/15">
            <IconSparkles className="h-3.5 w-3.5" />
            {aiOn ? "AI stock advisor" : "Stock advisor"}
          </span>
          <h1 className="text-balance mt-5 max-w-3xl font-serif text-4xl font-semibold tracking-tight sm:text-6xl">
            Know what to stock before you spend.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/80">
            Tell us your town, shop and budget. Get a budget split and the exact collections to
            order, picked for your region and season from brands live on GarmentBazaar.
          </p>
        </Container>
      </section>
      <section className="bg-background py-10 sm:py-14">
        <Container>
          <StockAdvisor aiOn={aiOn} defaults={defaults} autoRun={one("go") === "1"} />
        </Container>
      </section>
    </>
  );
}
