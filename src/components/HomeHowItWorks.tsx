import Link from "next/link";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import { IconArrowRight } from "./Icons";

// One section for the retailer story: four steps on the left, and on the
// right why buying direct leaves more margin. No figures are claimed for the
// supply chain; each hop is only labelled as adding a margin.
export default function HomeHowItWorks({
  collections,
  departments,
  minMoq,
}: {
  collections: number;
  departments: number;
  minMoq: number | null;
}) {
  const steps = [
    {
      title: "Browse from your shop",
      desc: `${collections} collections from reviewed brands across ${departments} departments.`,
      hindi: "Ghar baithe stock",
    },
    {
      title: "Compare price and MOQ",
      desc: "Wholesale price per piece and minimum order are on every listing, before signup.",
      hindi: "Sabke liye ek daam",
    },
    {
      title: "Order small, direct from the brand",
      desc: minMoq
        ? `MOQs from ${minMoq} pieces, so you can test styles before buying big.`
        : "Brands set their own MOQs, so you can test styles before buying big.",
      hindi: "Kam MOQ, kam risk",
    },
    {
      title: "Reorder what sells",
      desc: "Every order stays in your dashboard. Reorder a bestseller in one tap.",
      hindi: "Dukaan band nahi",
    },
  ];
  const usual = ["Brand", "Distributor", "Wholesaler", "Your shop"];

  return (
    <section id="how-it-works" className="scroll-mt-24 bg-[#fff8e6] py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          tone="text-amber-800"
          title="Restock without the mandi trip"
          intro="Built for shops in Tier 2, 3 and 4 towns. Ab mandi jaane ki zaroorat nahi."
        />

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <ol className="grid grid-cols-1 content-start gap-3 sm:grid-cols-2 lg:col-span-7">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-amber-200/70">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink font-serif text-base font-semibold text-amber-300">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold leading-snug text-ink">{s.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{s.desc}</p>
                  <p className="mt-1.5 text-xs font-semibold italic text-amber-800">{s.hindi}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-amber-200/70 lg:col-span-5">
            <h3 className="font-serif text-2xl font-semibold text-ink">Fewer hands, more margin</h3>
            <p className="mt-4 text-xs font-bold uppercase tracking-wide text-slate-500">The usual route</p>
            <div className="mt-2 flex flex-wrap items-start gap-x-1 gap-y-2">
              {usual.map((u, i) => (
                <span key={u} className="flex items-start gap-1">
                  <span className="whitespace-nowrap rounded-lg bg-slate-100 px-2 py-1.5 text-xs font-semibold text-slate-700 sm:text-sm">
                    {u}
                  </span>
                  {i < usual.length - 1 && (
                    <span className="flex flex-col items-center pt-1 text-[9px] font-bold uppercase leading-none text-red-600">
                      <IconArrowRight className="h-3.5 w-3.5 text-slate-400" />
                      +margin
                    </span>
                  )}
                </span>
              ))}
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-wide text-[#0f766e]">With GarmentBazaar</p>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="rounded-lg bg-accent-100 px-2.5 py-1.5 text-sm font-semibold text-accent-700">Brand</span>
              <IconArrowRight className="h-4 w-4 text-[#0f766e]" />
              <span className="rounded-lg bg-[#0f766e] px-2.5 py-1.5 text-sm font-semibold text-white">Your shop</span>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-600">
              Each extra hop usually adds its own margin. Buying from the brand
              removes those hops, so you can price well and still earn more.
            </p>
            <div className="mt-auto flex flex-col gap-2 pt-6 sm:flex-row">
              <Link
                href="/signup?role=retailer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#b0164f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c81d5c]"
              >
                Open free shop account
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#tools"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-ink transition hover:bg-slate-50"
              >
                Work out my savings
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
