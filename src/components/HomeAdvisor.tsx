import { regions, seasons, shopTypes, type Season } from "@/lib/advisorOptions";
import { IconArrowRight, IconCheck, IconSparkles } from "./Icons";

// Home page entry to the stock advisor (inside the AI tools section). A plain GET form, so it works
// before any JavaScript loads; the advisor page builds the plan on arrival.
export default function HomeAdvisor({ aiOn, season }: { aiOn: boolean; season: Season }) {
  const field =
    "mt-1.5 block w-full rounded-xl border border-white/20 bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:ring-2 focus:ring-amber-300";
  return (
        <div className="relative overflow-hidden rounded-[2rem] bg-[#12264a] p-6 text-white sm:p-10 lg:p-12">
          <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#b0164f]/40 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-amber-300/15 blur-3xl" />
          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-amber-200 ring-1 ring-white/15">
                <IconSparkles className="h-3.5 w-3.5" />
                {aiOn ? "AI stock advisor" : "Stock advisor"} · Free
              </span>
              <h2 className="text-balance mt-5 font-serif text-3xl font-semibold tracking-tight sm:text-5xl">
                Stock planned for your town, not for the metros.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/80">
                {aiOn
                  ? "Claude reads the live catalogue and builds a buying plan for your shop's region, season and budget."
                  : "Get a buying plan for your shop's region, season and budget, built from the live catalogue."}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-white/90">
                {[
                  "Budget split across departments that suit your shop",
                  "Styles picked for your region, season and price level",
                  "Exact pieces to order at each brand's MOQ, within budget",
                ].map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <form action="/stock-advisor" method="get" className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/15 sm:p-6 lg:col-span-6">
              <input type="hidden" name="go" value="1" />
              <input type="hidden" name="season" value={season} />
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-200">
                Buying for: {seasons[season]}
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="ha-shop" className="text-sm font-medium text-white">Shop type</label>
                  <select id="ha-shop" name="shop" defaultValue="family" className={field}>
                    {Object.entries(shopTypes).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="ha-region" className="text-sm font-medium text-white">Region</label>
                  <select id="ha-region" name="region" defaultValue="north" className={field}>
                    {Object.entries(regions).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="ha-town" className="text-sm font-medium text-white">Town</label>
                  <input id="ha-town" name="town" maxLength={60} placeholder="e.g. Bareilly" className={field} />
                </div>
                <div>
                  <label htmlFor="ha-budget" className="text-sm font-medium text-white">Budget (₹)</label>
                  <select id="ha-budget" name="budget" defaultValue="100000" className={field}>
                    {[25000, 50000, 100000, 200000, 500000].map((b) => (
                      <option key={b} value={b}>₹{b.toLocaleString("en-IN")}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-amber-200"
              >
                <IconSparkles className="h-4 w-4" />
                Build my stock plan
                <IconArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
  );
}
