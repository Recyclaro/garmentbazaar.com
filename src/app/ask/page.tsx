import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Container from "@/components/Container";
import AiPageHero from "@/components/AiPageHero";
import AskFinder from "@/components/AskFinder";
import { aiEnabled } from "@/lib/claude";

export const metadata: Metadata = pageMeta({
  title: "Ask & Find Wholesale Stock in Hindi or English",
  description:
    "Describe the stock you need in your own words, like cotton kurtis under ₹500 with a small MOQ, and see matching wholesale collections from brands on GarmentBazaar.",
  path: "/ask",
});

export const dynamic = "force-dynamic";

export default async function AskPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q.slice(0, 200) : "";
  const aiOn = aiEnabled();
  return (
    <>
      <AiPageHero
        badge={aiOn ? "AI search" : "Smart search"}
        title="Ask for stock the way you'd ask a wholesaler."
        intro={
          aiOn
            ? "Type what you need in Hindi, English or Hinglish: product, customer, season, price per piece, MOQ. Claude finds the closest matches in the live catalogue."
            : "Type what you need with a product, price per piece or MOQ, and see the closest matches in the live catalogue."
        }
      />
      <section className="bg-background py-10 sm:py-14">
        <Container>
          <AskFinder aiOn={aiOn} initialQuery={q} autoRun={Boolean(q)} />
        </Container>
      </section>
    </>
  );
}
