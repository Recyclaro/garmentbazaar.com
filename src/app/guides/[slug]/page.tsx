import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import CollectionCard from "@/components/CollectionCard";
import CardRail from "@/components/CardRail";
import JsonLd, { SITE_URL } from "@/components/JsonLd";
import { IconArrowRight, IconCheck } from "@/components/Icons";
import { guides } from "@/content/generated";
import { departments } from "@/data/departments";
import { listApprovedCollections, collectionRowToCollection } from "@/lib/db";

// Related collections are read live from the database.
export const dynamic = "force-dynamic";

function findGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = findGuide(slug);
  if (!g) return { title: "Guide not found" };
  return {
    title: g.title,
    description: g.description,
    keywords: g.keywords,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: {
      type: "article",
      title: g.title,
      description: g.description,
      url: `/guides/${g.slug}`,
      publishedTime: g.date,
      images: [{ url: `/images/products/${g.hero}.jpg`, alt: g.title }],
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = findGuide(slug);
  if (!g) notFound();

  const dept = g.department ? departments.find((d) => d.name === g.department) : undefined;
  const live = listApprovedCollections().map(collectionRowToCollection).filter((c) => c.imagePath);
  const related = (g.department ? live.filter((c) => c.category === g.department) : live).slice(0, 4);
  const more = guides.filter((x) => x.slug !== g.slug).slice(0, 3);
  const url = `${SITE_URL}/guides/${g.slug}`;
  const date = new Date(g.date + "T00:00:00Z").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="bg-background pb-20 pt-6 sm:pt-10">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: g.title,
            description: g.description,
            datePublished: g.date,
            dateModified: g.date,
            image: `${SITE_URL}/images/products/${g.hero}.jpg`,
            mainEntityOfPage: url,
            keywords: g.keywords.join(", "),
            author: { "@type": "Organization", name: "GarmentBazaar", url: SITE_URL },
            publisher: {
              "@type": "Organization",
              name: "GarmentBazaar",
              logo: { "@type": "ImageObject", url: `${SITE_URL}/icon` },
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: g.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
              { "@type": "ListItem", position: 3, name: g.title, item: url },
            ],
          },
        ]}
      />

      <Container className="max-w-3xl">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
          <Link href="/guides" className="font-medium text-[#b0164f] hover:underline">
            Guides
          </Link>
          {dept && (
            <>
              <span className="mx-2">/</span>
              <Link href={`/wholesale/${dept.slug}`} className="hover:underline">
                {dept.label}
              </Link>
            </>
          )}
        </nav>

        <h1 className="text-balance mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
          {g.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{g.description}</p>
        <p className="mt-4 text-sm text-slate-500">
          {date} · {g.readingMinutes} min read · By the GarmentBazaar team
        </p>

        <div className="relative mt-8 h-64 overflow-hidden rounded-3xl bg-[#f1efeb] sm:h-80">
          <Image
            src={`/images/products/${g.hero}.jpg`}
            alt=""
            fill
            unoptimized
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-contain"
          />
        </div>

        <nav aria-label="In this guide" className="mt-8 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">In this guide</p>
          <ol className="mt-3 space-y-1.5 text-sm">
            {g.sections.map((s, i) => (
              <li key={s.heading}>
                <a href={`#s${i + 1}`} className="font-medium text-ink hover:text-[#b0164f]">
                  {i + 1}. {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 space-y-10">
          {g.sections.map((s, i) => (
            <section key={s.heading} id={`s${i + 1}`} className="scroll-mt-24">
              <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">{s.heading}</h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-slate-700">
                {s.body.map((p, n) => (
                  <p key={n}>{p}</p>
                ))}
              </div>
              {s.bullets && s.bullets.length > 0 && (
                <ul className="mt-5 space-y-2.5 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-6 text-slate-700">
                      <IconCheck className="mt-1 h-4 w-4 shrink-0 text-success-600" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-[#16335e] p-6 text-white sm:p-8">
          <p className="font-serif text-2xl font-semibold">Ready to restock?</p>
          <p className="mt-2 text-sm text-white/80">
            See the wholesale price per piece and MOQ on every collection, free.
          </p>
          <Link
            href={g.cta.href}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-amber-200"
          >
            {g.cta.label}
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-semibold text-ink">Questions retailers ask</h2>
          <div className="mt-5 divide-y divide-slate-200 rounded-3xl bg-white ring-1 ring-slate-200">
            {g.faq.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-ink">
                  {f.q}
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-background text-lg leading-none text-[#b0164f] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </Container>

      {related.length > 0 && (
        <Container className="mt-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
              {dept ? `Shop ${dept.label.toLowerCase()} wholesale` : "Fresh wholesale collections"}
            </h2>
            <Link
              href={dept ? `/wholesale/${dept.slug}` : "/collections"}
              className="shrink-0 text-sm font-semibold text-[#b0164f] hover:underline"
            >
              See all
            </Link>
          </div>
          <CardRail>
            {related.map((c) => (
              <CollectionCard key={c.slug} collection={c} />
            ))}
          </CardRail>
        </Container>
      )}

      {more.length > 0 && (
        <Container className="mt-16 max-w-3xl">
          <h2 className="font-serif text-2xl font-semibold text-ink">More guides</h2>
          <ul className="mt-4 space-y-3">
            {more.map((m) => (
              <li key={m.slug}>
                <Link
                  href={`/guides/${m.slug}`}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200 transition hover:ring-slate-400"
                >
                  <span className="font-semibold text-ink">{m.title}</span>
                  <IconArrowRight className="h-4 w-4 shrink-0 text-[#b0164f]" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      )}
    </article>
  );
}
