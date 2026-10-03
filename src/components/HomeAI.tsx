import Link from "next/link";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import HomeAdvisor from "./HomeAdvisor";
import AiDemo from "./AiDemo";
import type { AiDemoData } from "@/lib/aiDemo";
import type { Season } from "@/lib/advisorOptions";
import { IconArrowRight, IconSearch, IconSparkles } from "./Icons";

// Home page showcase for the AI tools: the stock advisor up front, then
// plain-language search and the WhatsApp writer. Wording only says "AI"
// when Claude is switched on (ANTHROPIC_API_KEY).
export default function HomeAI({ aiOn, season, demo }: { aiOn: boolean; season: Season; demo: AiDemoData }) {
  return (
    <section id="ai-tools" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow={aiOn ? "AI tools · Free for shop owners" : "Smart tools · Free for shop owners"}
          title={aiOn ? "AI that works for your shop" : "Smart tools for your shop"}
          intro={
            aiOn
              ? "Plan what to stock, find it in your own words and sell it on WhatsApp. Powered by Claude and the live catalogue."
              : "Plan what to stock, find it in your own words and sell it on WhatsApp, using the live catalogue."
          }
          link={{ href: "/ai-tools", label: "All tools" }}
        />

        <div className="mt-10">
          <AiDemo data={demo} />
        </div>

        <div className="mt-5">
          <HomeAdvisor aiOn={aiOn} season={season} />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Ask & find */}
          <div className="flex flex-col rounded-[2rem] bg-[#fdf2f6] p-6 ring-1 ring-rose-200/70 sm:p-8">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#b0164f] ring-1 ring-rose-200">
              <IconSearch className="h-3.5 w-3.5" />
              {aiOn ? "AI search" : "Smart search"}
            </span>
            <h3 className="mt-4 font-serif text-2xl font-semibold text-ink sm:text-3xl">Ask for stock in your own words</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {aiOn
                ? "Hindi, English or Hinglish. Mention product, customer, season, price or MOQ and get matching collections."
                : "Mention a product, price per piece or MOQ and get matching collections."}
            </p>
            <form action="/ask" method="get" className="mt-5 flex items-center gap-2 rounded-full bg-white p-1.5 ring-1 ring-rose-200">
              <label htmlFor="home-ask" className="sr-only">Describe the stock you need</label>
              <input
                id="home-ask"
                name="q"
                maxLength={200}
                placeholder={aiOn ? "e.g. ladies kurti 500 ke andar, chhota MOQ" : "e.g. cotton kurtis under 500"}
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-ink placeholder:text-slate-400 focus:outline-none"
              />
              <button type="submit" className="shrink-0 rounded-full bg-[#b0164f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#c81d5c]">
                Find
              </button>
            </form>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {["Festive sarees for a boutique", "Kids school wear, small MOQ", "Gents shirts under 700"].map((e) => (
                <Link
                  key={e}
                  href={`/ask?q=${encodeURIComponent(e)}`}
                  className="rounded-full bg-white px-3 py-1 text-slate-700 ring-1 ring-rose-200 transition hover:text-[#b0164f]"
                >
                  {e}
                </Link>
              ))}
            </div>
          </div>

          {/* WhatsApp writer */}
          <div className="flex flex-col rounded-[2rem] bg-[#e7f6ee] p-6 ring-1 ring-green-200 sm:p-8">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0f766e] ring-1 ring-green-200">
              <IconSparkles className="h-3.5 w-3.5" />
              {aiOn ? "AI WhatsApp writer" : "WhatsApp writer"}
            </span>
            <h3 className="mt-4 font-serif text-2xl font-semibold text-ink sm:text-3xl">Sell it on WhatsApp the same day</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {aiOn
                ? "Pick what you bought. Get a broadcast, a Status line and a note for regulars in Hinglish, Hindi or 9 regional languages."
                : "Pick what you bought. Get a broadcast and a Status line in Hinglish or English, ready to copy."}
            </p>
            <div className="mt-5 max-w-sm rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm leading-6 text-ink shadow-sm">
              <span className="block text-[10px] font-bold uppercase tracking-wide text-slate-400">Example</span>
              Namaste 🙏 Tyohar ke liye nayi collection aa gayi hai! Cotton kurta sets, silk-blend sarees… Photo ke liye reply kijiye 😊
            </div>
            <Link
              href="/whatsapp-writer"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6560]"
            >
              Write my messages
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
