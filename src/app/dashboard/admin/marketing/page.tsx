import Link from "next/link";
import { requireRole } from "@/lib/dal";
import { getGrowthSnapshot } from "@/lib/db";
import { guides, reports, socialBatches } from "@/content/generated";
import { SectionHead } from "@/components/DashUI";
import CopyButton from "@/components/CopyButton";

// Admin-only. Growth numbers are computed here from the live database and
// never leave the server; the agent's public-safe output (guides, social
// drafts, weekly activity) comes from the repo.

const channelStyle: Record<string, string> = {
  whatsapp: "bg-green-50 text-green-800 ring-green-200",
  instagram: "bg-rose-50 text-rose-800 ring-rose-200",
  linkedin: "bg-sky-50 text-sky-800 ring-sky-200",
  facebook: "bg-indigo-50 text-indigo-800 ring-indigo-200",
};

const metricLabels: Record<string, string> = {
  retailerSignups: "Retailer signups",
  brandSignups: "Brand signups",
  manufacturerSignups: "Manufacturer signups",
  newCollections: "Collections from brands",
  orders: "Orders",
  paidRupees: "Paid value (₹)",
  quoteRequests: "Quote requests",
};

function when(d: string) {
  return new Date(d.length === 10 ? d + "T00:00:00Z" : d.replace(" ", "T") + "Z").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

function Delta({ now, before }: { now: number; before: number }) {
  if (now === before) return <span className="text-xs text-slate-400">same as last week</span>;
  const up = now > before;
  return (
    <span className={`text-xs font-semibold ${up ? "text-green-700" : "text-red-700"}`}>
      {up ? "▲" : "▼"} {Math.abs(now - before).toLocaleString("en-IN")} vs last week
    </span>
  );
}

export default async function MarketingHubPage() {
  await requireRole("admin");
  const g = getGrowthSnapshot();
  const today = socialBatches[0];
  const report = reports[0];

  // Plain rules that turn the numbers into today's to-do list.
  const actions: { text: string; href?: string }[] = [];
  if (g.pendingCollections + g.pendingSuppliers > 0)
    actions.push({
      text: `Approve ${g.pendingCollections + g.pendingSuppliers} listing${g.pendingCollections + g.pendingSuppliers === 1 ? "" : "s"} waiting for review. Brands go quiet if they wait.`,
      href: "/dashboard/admin",
    });
  if (g.brandsWithoutCollections.length > 0)
    actions.push({
      text: `${g.brandsWithoutCollections.length} brand${g.brandsWithoutCollections.length === 1 ? " has" : "s have"} signed up but not listed a collection. WhatsApp them below and offer to help.`,
    });
  if (g.retailersNotOnboarded > 0)
    actions.push({ text: `${g.retailersNotOnboarded} retailer${g.retailersNotOnboarded === 1 ? "" : "s"} skipped setup. They see generic picks until they tell us what they stock.` });
  if (g.retailersOnboardedNoOrder > 0)
    actions.push({ text: `${g.retailersOnboardedNoOrder} set-up retailer${g.retailersOnboardedNoOrder === 1 ? " hasn't" : "s haven't"} ordered yet. Share a low-MOQ pick with them.` });
  if (g.totals.brandCollections < 20)
    actions.push({ text: `Only ${g.totals.brandCollections} live collections come from real brands. Brand supply is the bottleneck: focus outreach on brands this week.` });
  if (today) actions.push({ text: "Post today's ready-made social drafts below (tap Copy)." });

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#b0164f]">Growth</p>
          <h2 className="font-serif text-3xl font-semibold text-ink">Marketing hub</h2>
          <p className="mt-1 text-sm text-slate-600">
            Live numbers from the platform, plus what the daily marketing agent produced.
          </p>
        </div>
        <Link href="/dashboard/admin" className="text-sm font-semibold text-accent-700 hover:underline">
          ← Back to admin
        </Link>
      </div>

      {/* This week */}
      <section>
        <SectionHead title="Last 7 days" />
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {Object.entries(g.thisWeek).map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
              <p className="text-xs font-medium text-slate-500">{metricLabels[k] ?? k}</p>
              <p className="mt-1 font-serif text-3xl font-semibold text-ink">{v.toLocaleString("en-IN")}</p>
              <Delta now={v} before={g.lastWeek[k] ?? 0} />
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500">
          All time: {g.totals.retailers} retailers · {g.totals.brands} brands · {g.totals.manufacturers} manufacturers ·{" "}
          {g.totals.liveCollections} live collections ({g.totals.brandCollections} from brands) · {g.totals.orders} orders
        </p>
      </section>

      {/* Do next */}
      <section>
        <SectionHead title="Do next" />
        {actions.length ? (
          <ol className="mt-4 space-y-2">
            {actions.map((a, i) => (
              <li key={i} className="flex items-start gap-3 rounded-2xl bg-amber-50 p-4 text-sm text-amber-950 ring-1 ring-amber-200">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-ink">
                  {i + 1}
                </span>
                <span className="flex-1">{a.text}</span>
                {a.href && (
                  <Link href={a.href} className="shrink-0 font-semibold underline">
                    Open
                  </Link>
                )}
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-4 rounded-2xl bg-green-50 p-4 text-sm text-green-900 ring-1 ring-green-200">Nothing urgent today.</p>
        )}
      </section>

      {/* Follow up */}
      {g.brandsWithoutCollections.length > 0 && (
        <section>
          <SectionHead title="Brands to help list" />
          <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {g.brandsWithoutCollections.map((b) => {
              const msg = encodeURIComponent(
                `Hi ${b.name.split(/\s+/)[0]}, this is the GarmentBazaar team. Thanks for joining! Can we help you list your first collection? It takes about 5 minutes: https://garmentbazaar.com/dashboard/brand/new`,
              );
              return (
                <li key={b.id} className="flex items-center justify-between gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-ink">{b.company_name || b.name}</p>
                    <p className="text-xs text-slate-500">
                      {b.name}
                      {b.city ? ` · ${b.city}` : ""} · joined {when(b.created_at)}
                    </p>
                  </div>
                  {b.phone ? (
                    <a
                      href={`https://wa.me/91${b.phone}?text=${msg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-full bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-700"
                    >
                      WhatsApp
                    </a>
                  ) : (
                    <span className="shrink-0 text-xs text-slate-400">No mobile</span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Social */}
      <section>
        <SectionHead title={today ? `Ready-to-post · ${when(today.date)}` : "Ready-to-post"} />
        {today ? (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {today.posts.map((p, i) => (
              <div key={i} className="flex flex-col rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                <div className="flex items-center justify-between gap-2">
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ring-1 ${channelStyle[p.channel]}`}>
                    {p.channel}
                  </span>
                  <CopyButton text={`${p.text}\n\n${p.link}`} />
                </div>
                <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">{p.text}</p>
                <a href={p.link} className="mt-3 truncate text-xs font-medium text-accent-700 hover:underline">
                  {p.link}
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
            Social drafts appear after the agent&apos;s first run.
          </p>
        )}
      </section>

      {/* Agent weekly activity */}
      <section>
        <SectionHead title={report ? `Agent activity · ${report.period}` : "Agent activity"} />
        {report ? (
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <dl className="grid grid-cols-2 gap-3 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              {Object.entries(report.metrics).map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs text-slate-500">{k}</dt>
                  <dd className="text-xl font-semibold text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-ink">Done this week</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
                {report.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-ink">Planned next</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
                {report.nextActions.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
            The agent&apos;s first weekly summary arrives on Monday. Outreach emails wait as drafts in your Gmail.
          </p>
        )}
      </section>

      {/* Guides */}
      <section>
        <SectionHead title={`Published guides (${guides.length})`} />
        <ul className="mt-4 space-y-2">
          {guides.map((x) => (
            <li key={x.slug} className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-slate-200">
              <Link href={`/guides/${x.slug}`} className="min-w-0 truncate font-medium text-ink hover:underline">
                {x.title}
              </Link>
              <span className="shrink-0 text-xs text-slate-500">{when(x.date)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
