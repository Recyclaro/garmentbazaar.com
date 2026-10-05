import Link from "next/link";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import { cities } from "@/data/cities";

// Links to every town landing page, so shop owners (and search engines)
// can reach the page for their own town from the home and retailer pages.
export default function TownLinks({ tone = "bg-white" }: { tone?: string }) {
  return (
    <section className={`${tone} py-16 sm:py-20`}>
      <Container>
        <SectionHeading
          eyebrow="Wholesale by town"
          title="Buying for a shop in your town?"
          intro="GarmentBazaar works for clothing retailers anywhere in India. Find the page for your town, with the departments and seasons that matter there."
          link={{ href: "/wholesale-clothing", label: "All towns" }}
        />
        <ul className="mt-8 flex flex-wrap gap-2">
          {cities.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/wholesale-clothing/${c.slug}`}
                className="inline-flex rounded-full bg-background px-4 py-2 text-sm font-semibold text-ink ring-1 ring-slate-200 transition hover:ring-slate-400"
              >
                {c.name.replace(/\s*\(.*\)$/, "")}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
