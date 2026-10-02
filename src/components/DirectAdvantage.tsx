import Link from "next/link";
import { IconArrowRight, IconCheck } from "./Icons";

// Why buying direct leaves more margin: the usual chain of hands against the
// direct route, plus the planning habits the platform makes easy. No
// figures are claimed; each hop is only labelled as adding a margin.
export default function DirectAdvantage() {
  const usual = ["Brand", "Distributor", "Wholesaler", "Your store"];
  const levers = [
    {
      title: "Buy direct",
      desc: "Fewer hands between the brand and your shelf means more of the selling price stays with you.",
    },
    {
      title: "Plan by budget",
      desc: "Prices are shown before you sign up, so you can plan a season's spend to the rupee.",
    },
    {
      title: "Test, then scale",
      desc: "Small MOQs let you try several styles, then reorder only the ones customers pick.",
    },
    {
      title: "Cut dead stock",
      desc: "Ordering closer to demand means fewer leftovers to discount at the end of the season.",
    },
  ];

  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Chains */}
          <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 sm:p-10 lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b0164f]">
              Why it pays to buy direct
            </p>
            <h2 className="text-balance mt-2 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Fewer hands. More margin.
            </h2>

            <div className="mt-8">
              <p className="text-sm font-semibold text-slate-500">The usual route</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {usual.map((u, i) => (
                  <div key={u} className="flex items-center gap-2">
                    <span
                      className={`rounded-xl px-3.5 py-2.5 text-sm font-semibold ${
                        i === usual.length - 1
                          ? "bg-slate-200 text-ink"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {u}
                    </span>
                    {i < usual.length - 1 && (
                      <span className="flex flex-col items-center text-[10px] font-semibold uppercase text-red-600">
                        <IconArrowRight className="h-4 w-4 text-slate-400" />
                        + margin
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold text-[#0f766e]">With GarmentBazaar</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-xl bg-accent-100 px-3.5 py-2.5 text-sm font-semibold text-accent-700">
                  Brand
                </span>
                <span className="flex flex-col items-center text-[10px] font-semibold uppercase text-[#0f766e]">
                  <IconArrowRight className="h-4 w-4 text-[#0f766e]" />
                  direct
                </span>
                <span className="rounded-xl bg-[#0f766e] px-3.5 py-2.5 text-sm font-semibold text-white">
                  Your store
                </span>
              </div>
            </div>

            <p className="mt-8 rounded-2xl bg-green-50 px-5 py-4 text-sm leading-6 text-green-900 ring-1 ring-green-200">
              Each extra hop in a supply chain usually adds its own margin to the
              price. Buying from the brand removes those hops, so you can price
              competitively and still keep a healthy margin.
            </p>
          </div>

          {/* Levers */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {levers.map((l) => (
              <div
                key={l.title}
                className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-600">
                  <IconCheck className="h-5 w-5 text-white" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ink">{l.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{l.desc}</p>
                </div>
              </div>
            ))}
            <Link
              href="/collections"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              See wholesale prices now
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
