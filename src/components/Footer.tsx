import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";

const columns = [
  {
    title: "Buy wholesale",
    links: [
      { href: "/collections", label: "All collections" },
      { href: "/wholesale/ethnic-wear", label: "Wholesale ethnic wear" },
      { href: "/wholesale/menswear", label: "Wholesale menswear" },
      { href: "/wholesale/womenswear", label: "Wholesale womenswear" },
      { href: "/wholesale/kidswear", label: "Wholesale kidswear" },
      { href: "/collections?sort=moq-asc", label: "Lowest MOQ first" },
    ],
  },
  {
    title: "By town",
    links: [
      { href: "/wholesale-clothing/lucknow", label: "Lucknow" },
      { href: "/wholesale-clothing/indore", label: "Indore" },
      { href: "/wholesale-clothing/jaipur", label: "Jaipur" },
      { href: "/wholesale-clothing/patna", label: "Patna" },
      { href: "/wholesale-clothing/coimbatore", label: "Coimbatore" },
      { href: "/wholesale-clothing", label: "All towns" },
    ],
  },
  {
    title: "Platform",
    links: [
      { href: "/platform", label: "AI Sourcing Platform" },
      { href: "/marketplace", label: "Supplier Marketplace" },
      { href: "/platform#onboarding", label: "Product Onboarding" },
      { href: "/platform#procurement", label: "Procurement & Pricing" },
      { href: "/platform#inventory", label: "Inventory Optimization" },
      { href: "/platform#supply-chain", label: "Supply Chain Orchestration" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { href: "/solutions/brands", label: "For Brands" },
      { href: "/solutions/retailers", label: "For Retailers" },
      { href: "/solutions/manufacturers", label: "Fabric & Mills" },
      { href: "/collections", label: "Shop Collections" },
      { href: "/guides", label: "Retailer Guides" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-slate-300">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-8">
          <div className="col-span-2">
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
              The wholesale buying platform for clothing retailers in every
              Indian town. Branded stock direct from brands, with prices and
              MOQs up front.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title} className="col-span-1 md:col-span-1">
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-accent-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-semibold text-white">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>
                <a href="mailto:hello@garmentbazaar.com" className="[overflow-wrap:anywhere] hover:text-accent-400">
                  hello@garmentbazaar.com
                </a>
              </li>
              <li>Bengaluru, India</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} GarmentBazaar (Garment Bazaar), wholesale clothing for retailers in India. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Built for India&apos;s fashion &amp; lifestyle supply chain.
          </p>
        </div>
      </Container>
    </footer>
  );
}
