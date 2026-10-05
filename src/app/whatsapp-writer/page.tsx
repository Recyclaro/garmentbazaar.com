import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Container from "@/components/Container";
import AiPageHero from "@/components/AiPageHero";
import WhatsAppWriter from "@/components/WhatsAppWriter";
import { aiEnabled } from "@/lib/claude";
import { listApprovedCollections, collectionRowToCollection } from "@/lib/db";

export const metadata: Metadata = pageMeta({
  title: "WhatsApp Message Writer for Clothing Shops",
  description:
    "Turn the stock you buy into ready-to-send WhatsApp broadcasts, Status lines and customer follow-ups in Hinglish, Hindi or your regional language. Free for shop owners.",
  path: "/whatsapp-writer",
});

export const dynamic = "force-dynamic";

export default async function WhatsAppWriterPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const aiOn = aiEnabled();
  const options = listApprovedCollections()
    .map(collectionRowToCollection)
    .map((c) => ({ slug: c.slug, name: c.name, category: c.category }))
    .sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  const preselect = typeof sp.item === "string" && options.some((o) => o.slug === sp.item) ? sp.item : "";
  return (
    <>
      <AiPageHero
        badge={aiOn ? "AI WhatsApp writer" : "WhatsApp writer"}
        glow="bg-[#0f766e]/50"
        title="Sell the stock before it reaches your shelf."
        intro={
          aiOn
            ? "Pick what you've bought and get a WhatsApp broadcast, a Status line and a personal note for regulars, in Hinglish, Hindi or 9 regional languages."
            : "Pick what you've bought and get a WhatsApp broadcast and a Status line, ready to copy, in Hinglish or English."
        }
      />
      <section className="bg-background py-10 sm:py-14">
        <Container>
          <WhatsAppWriter aiOn={aiOn} options={options} preselect={preselect} />
        </Container>
      </section>
    </>
  );
}
