import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import JsonLd from "@/components/JsonLd";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/lib/dal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

const siteUrl = "https://garmentbazaar.com";

const siteTitle = "GarmentBazaar | Wholesale Clothing for Retailers, Direct from Brands";
const siteDescription =
  "Buy branded clothing, footwear and accessories wholesale, direct from brands. Price per piece shown up front, small MOQs, 12 departments. B2B fashion marketplace for boutiques, stores and online sellers in India.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | GarmentBazaar",
  },
  description: siteDescription,
  applicationName: "GarmentBazaar",
  keywords: [
    "wholesale clothing for retailers",
    "B2B fashion marketplace India",
    "buy branded clothes wholesale",
    "wholesale garments online",
    "wholesale kurtis",
    "wholesale menswear",
    "wholesale womenswear",
    "wholesale kidswear",
    "wholesale footwear",
    "low MOQ clothing suppliers",
    "boutique wholesale suppliers",
    "garment manufacturers India",
    "fabric suppliers India",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "GarmentBazaar",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  category: "shopping",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-ink">
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GarmentBazaar",
              url: siteUrl,
              logo: `${siteUrl}/icon`,
              email: "hello@garmentbazaar.com",
              description: siteDescription,
              areaServed: "IN",
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "GarmentBazaar",
              url: siteUrl,
              inLanguage: "en-IN",
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteUrl}/collections?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            },
          ]}
        />
        <AnnouncementBar />
        <Header user={user ? { name: user.name, role: user.role } : null} />
        <main className="flex-1">{children}</main>
        <Footer />
        <div className="h-16 md:hidden" aria-hidden />
        <MobileNav loggedIn={Boolean(user)} />
      </body>
    </html>
  );
}
