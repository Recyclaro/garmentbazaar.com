import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import { guides } from "@/content/generated";

export const metadata: Metadata = {
  title: "Retailer Guides: Wholesale Buying, MOQ & Stocking Tips",
  description:
    "Free guides for clothing shop owners in India: how to buy wholesale, use MOQs, plan seasonal stock and grow margins, written for Tier 2, 3 and 4 towns.",
  alternates: { canonical: "/guides" },
};

const audienceLabel: Record<string, string> = {
  retailers: "For retailers",
  brands: "For brands",
  mills: "For mills",
};

function when(d: string) {
  return new Date(d + "T00:00:00Z").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function GuidesPage() {
  const [lead, ...rest] = guides;

  return (
    <section className="bg-background pb-20 pt-8 sm:pt-12">
      <Container>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b0164f]">
          Guides
        </p>
        <h1 className="text-balance mt-2 max-w-3xl font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Run a smarter shop
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          Practical guides on wholesale buying, MOQs, seasonal stock and
          margins, written for shop owners across India.
        </p>

        {lead && (
          <Link
            href={`/guides/${lead.slug}`}
            className="group mt-10 grid grid-cols-1 overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200 transition hover:shadow-xl hover:shadow-slate-900/10 md:grid-cols-2"
          >
            <div className="relative h-60 bg-[#f1efeb] md:h-full md:min-h-72">
              <Image
                src={`/images/products/${lead.hero}.jpg`}
                alt=""
                fill
                unoptimized
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col p-6 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {audienceLabel[lead.audience]} · {lead.readingMinutes} min read
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-ink group-hover:text-[#b0164f]">
                {lead.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">{lead.description}</p>
              <p className="mt-auto pt-6 text-sm text-slate-500">{when(lead.date)}</p>
            </div>
          </Link>
        )}

        {rest.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
              >
                <div className="relative h-44 bg-[#f1efeb]">
                  <Image
                    src={`/images/products/${g.hero}.jpg`}
                    alt=""
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {audienceLabel[g.audience]} · {g.readingMinutes} min read
                  </p>
                  <h2 className="mt-2 font-serif text-xl font-semibold leading-snug text-ink group-hover:text-[#b0164f]">
                    {g.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                    {g.description}
                  </p>
                  <p className="mt-auto pt-4 text-xs text-slate-500">{when(g.date)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
