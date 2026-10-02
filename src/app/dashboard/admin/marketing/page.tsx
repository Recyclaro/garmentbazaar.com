import Link from "next/link";
import { requireRole } from "@/lib/dal";
import { guides, outreachBatches, reports, socialBatches } from "@/content/generated";
import { SectionHead, StatTile } from "@/components/DashUI";
import CopyButton from "@/components/CopyButton";

const channelStyle: Record<string, string> = {
  whatsapp: "bg-green-50 text-green-800 ring-green-200",
  instagram: "bg-rose-50 text-rose-800 ring-rose-200",
  linkedin: "bg-sky-50 text-sky-800 ring-sky-200",
  facebook: "bg-indigo-50 text-indigo-800 ring-indigo-200",
};

function when(d: string) {
  return new Date(d + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export default async function MarketingHubPage() {
  await requireRole("admin");
  const report = reports[0];
  const today = socialBatches[0];
  const prospects = outreachBatches.flatMap((b) => b.prospects.map((p) => ({ ...p, date: b.date })));

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#b0164f]">Marketing agent</p>
          <h2 className="font-serif text-3xl font-semibold text-ink">Marketing hub</h2>
          <p className="mt-1 text-sm text-slate-600">
            Everything the daily agent has produced. Updated after each run.
          </p>
        </div>
        <Link href="/dashboard/admin" className="text-sm font-semibold text-accent-700 hover:underline">
          ← Back to admin
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Guides live" value={guides.length} hint={guides[0] ? `Latest ${when(guides[0].date)}` : undefined} tone="bg-[#b0164f]" />
        <StatTile label="Social drafts" value={socialBatches.reduce((n, b) => n + b.posts.length, 0)} hint="Last 14 days" tone="bg-[#f4c430]" />
        <StatTile label="Prospects contacted" value={prospects.length} hint={`${prospects.filter((p) => p.status === "gmail-draft").length} Gmail drafts`} tone="bg-[#0f766e]" />
        <StatTile label="Reports" value={reports.length} tone="bg-[#16335e]" />
      </div>

      {/* Weekly report */}
      <section>
        <SectionHead title={report ? `Growth report · ${report.period}` : "Growth report"} />
        {report ? (
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 lg:col-span-1">
              <dl className="grid grid-cols-2 gap-3">
                {Object.entries(report.metrics).map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs text-slate-500">{k}</dt>
                    <dd className="text-xl font-semibold text-ink">{v.toLocaleString("en-IN")}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-ink">Highlights</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
                {report.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200">
              <p className="text-sm font-semibold text-amber-900">Do next</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-amber-900">
                {report.nextActions.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
            The first weekly report arrives on Monday.
          </p>
        )}
      </section>

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

      {/* Outreach */}
      <section>
        <SectionHead title="Outreach log" />
        {prospects.length ? (
          <div className="mt-4 overflow-x-auto rounded-2xl bg-white ring-1 ring-slate-200">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Business</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Why</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {prospects.slice(0, 60).map((p, i) => (
                  <tr key={`${p.name}-${i}`}>
                    <td className="px-4 py-3 text-slate-500">{when(p.date)}</td>
                    <td className="px-4 py-3">
                      <a href={p.website} target="_blank" rel="noopener noreferrer" className="font-medium text-ink hover:underline">
                        {p.name}
                      </a>
                    </td>
                    <td className="px-4 py-3 capitalize text-slate-600">{p.type}</td>
                    <td className="px-4 py-3 text-slate-600">{p.city}</td>
                    <td className="max-w-xs px-4 py-3 text-slate-600">{p.why}</td>
                    <td className="px-4 py-3">
                      <a href={p.contactUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-accent-700 hover:underline">
                        {p.status === "gmail-draft" ? "Draft in Gmail" : "Contact page"}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
            Prospects appear after the agent&apos;s first run. Emails wait as drafts in Gmail; nothing is sent without you.
          </p>
        )}
      </section>

      {/* Guides */}
      <section>
        <SectionHead title="Published guides" />
        <ul className="mt-4 space-y-2">
          {guides.map((g) => (
            <li key={g.slug} className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-slate-200">
              <Link href={`/guides/${g.slug}`} className="min-w-0 truncate font-medium text-ink hover:underline">
                {g.title}
              </Link>
              <span className="shrink-0 text-xs text-slate-500">{when(g.date)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
