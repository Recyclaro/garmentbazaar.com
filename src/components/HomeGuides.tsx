import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import { guides } from "@/content/generated";
import { IconArrowRight } from "./Icons";

// The three newest retailer guides, so fresh articles show on the home page.
export default function HomeGuides() {
  const latest = guides.filter((g) => g.audience === "retailers").slice(0, 3);
  if (latest.length === 0) return null;
  return (
    <section className="bg-background py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Free retailer guides"
          title="Run a smarter shop"
          intro="Practical, plain-English guides on buying, stocking and margins for shop owners across India."
          link={{ href: "/guides", label: "All guides" }}
        />
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {latest.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
            >
              <span className="relative block h-44 bg-[#f1efeb]">
                <Image
                  src={`/images/products/${g.hero}.jpg`}
                  alt=""
                  fill
                  unoptimized
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-contain transition duration-300 group-hover:scale-105"
                />
              </span>
              <span className="flex flex-1 flex-col p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {g.department ?? "Shop tips"} · {g.readingMinutes} min read
                </span>
                <span className="mt-2 text-lg font-semibold leading-snug text-ink group-hover:text-rose-700">
                  {g.title}
                </span>
                <span className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{g.description}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-rose-700">
                  Read guide
                  <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
