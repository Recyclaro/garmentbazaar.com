import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";

const columns = [
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
      { href: "/solutions/manufacturers", label: "For Manufacturers & Factories" },
      { href: "/solutions/retailers", label: "For Retailers" },
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
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
              The AI-first platform connecting global buyers with verified
              Indian fabric and garment manufacturers.
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
                <a href="mailto:hello@garmentbazaar.com" className="hover:text-accent-400">
                  hello@garmentbazaar.com
                </a>
              </li>
              <li>Bengaluru, India</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} GarmentBazaar. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Sourcing better from India&apos;s fashion &amp; lifestyle manufacturers.
          </p>
        </div>
      </Container>
    </footer>
  );
}
