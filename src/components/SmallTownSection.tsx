import Link from "next/link";
import TripCostCalculator from "./TripCostCalculator";
import { IconArrowRight, IconCheck } from "./Icons";

// Homepage section for shop owners outside the metros. Claims are kept to
// what the platform does today: online ordering, the same listed price for
// every buyer, brand-set MOQs.
export default function SmallTownSection({ minMoq }: { minMoq: number | null }) {
  const points = [
    {
      title: "Order from your own town",
      hindi: "Ghar baithe stock",
      desc: "Every brand, every price, on your phone. No train to Delhi, Surat or Ludhiana to restock.",
    },
    {
      title: "Same price as the big cities",
      hindi: "Sabke liye ek daam",
      desc: "The wholesale price per piece on a listing is the same for every buyer, wherever your shop is.",
    },
    {
      title: "Small orders welcome",
      hindi: "Kam MOQ, kam risk",
      desc: minMoq
        ? `MOQs start from ${minMoq} pieces, so you can test what your customers like before buying big.`
        : "Brands set small MOQs, so you can test what your customers like before buying big.",
    },
    {
      title: "Stay at your counter",
      hindi: "Dukaan band nahi",
      desc: "No days away from the shop, so you don't lose sales while you restock.",
    },
  ];

  return (
    <section className="bg-[#fff8e6] py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-800">
              Built for Tier 2, 3 &amp; 4 towns
            </p>
            <h2 className="text-balance mt-2 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Big-city brands. Small-town convenience.
            </h2>
            <p className="mt-3 text-lg font-semibold text-amber-800">
              Ab mandi jaane ki zaroorat nahi.
            </p>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-700">
              Whether your shop is in Meerut or Madurai, GarmentBazaar puts
              branded wholesale stock in your hands without the trip.
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {points.map((p) => (
                <li key={p.title} className="rounded-2xl bg-white p-5 ring-1 ring-amber-200">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400">
                      <IconCheck className="h-3.5 w-3.5 text-ink" />
                    </span>
                    <h3 className="font-semibold text-ink">{p.title}</h3>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-amber-800">{p.hindi}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{p.desc}</p>
                </li>
              ))}
            </ul>

            <Link
              href="/signup?role=retailer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#b0164f] px-7 py-3.5 text-base font-semibold text-white transition hover:bg-[#8e1140]"
            >
              Open my shop&apos;s free account
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="lg:col-span-6">
            <TripCostCalculator />
          </div>
        </div>
      </div>
    </section>
  );
}
