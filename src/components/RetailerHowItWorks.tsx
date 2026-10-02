import Image from "next/image";
import Link from "next/link";
import {
  IconArrowRight,
  IconBoxes,
  IconCart,
  IconSearch,
  IconTrendingUp,
} from "./Icons";

// The retailer journey on the homepage: four steps, each paired with the
// way it protects or grows the retailer's profit.
export default function RetailerHowItWorks({
  collections,
  departments,
}: {
  collections: number;
  departments: number;
}) {
  const steps = [
    {
      icon: IconSearch,
      title: "Discover",
      desc: `Browse ${collections} collections from reviewed brands across ${departments} departments, all in one place.`,
      lever: "Find fresh lines before the shop next door",
      photo: "women-coord",
      color: "bg-[#b0164f]",
    },
    {
      icon: IconCart,
      title: "Compare",
      desc: "Price per piece and MOQ are on every card. Check your margin with the calculator below.",
      lever: "Know your margin before you spend a rupee",
      photo: "men-polo",
      color: "bg-[#c77d0a]",
    },
    {
      icon: IconBoxes,
      title: "Order small, direct",
      desc: "Buy straight from the brand at the MOQ they set. No middleman in between.",
      lever: "Less cash stuck in stock, less dead inventory",
      photo: "shoes-sports",
      color: "bg-[#0f766e]",
    },
    {
      icon: IconTrendingUp,
      title: "Sell & reorder",
      desc: "Every order sits in your dashboard. Reorder your best sellers in a tap.",
      lever: "Put your money behind what already sells",
      photo: "ethnic-anarkali",
      color: "bg-[#16335e]",
    },
  ];

  return (
    <section id="how-it-works" className="bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b0164f]">
              How it works for retailers
            </p>
            <h2 className="text-balance mt-2 max-w-2xl font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Four steps from browsing to bigger margins
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-slate-600">
            Every step is built to keep more of each sale in your pocket and
            less of your money sitting on the shelf.
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-background transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
            >
              <div className={`flex items-center justify-between px-5 py-3 text-white ${s.color}`}>
                <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide">
                  <s.icon className="h-5 w-5" />
                  Step {i + 1}
                </span>
                <span className="font-serif text-3xl font-semibold opacity-40">0{i + 1}</span>
              </div>
              <div className="flex flex-1 gap-4 p-5">
                <div className="flex-1">
                  <h3 className="font-serif text-2xl font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{s.desc}</p>
                </div>
                <div className="relative hidden h-24 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f1efeb] sm:block lg:hidden xl:block">
                  <Image
                    src={`/images/products/${s.photo}.jpg`}
                    alt=""
                    fill
                    unoptimized
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="mx-5 mb-5 flex items-start gap-2 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-800 ring-1 ring-green-200">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-600 text-[11px] text-white">
                  ₹
                </span>
                {s.lever}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/signup?role=retailer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#b0164f] px-7 py-3.5 text-base font-semibold text-white transition hover:bg-[#8e1140]"
          >
            Open a free buyer account
            <IconArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#planner"
            className="inline-flex items-center justify-center rounded-full border border-ink px-7 py-3.5 text-base font-semibold text-ink transition hover:bg-background"
          >
            Plan my restock
          </Link>
        </div>
      </div>
    </section>
  );
}
