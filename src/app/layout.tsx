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

const siteTitle = "GarmentBazaar: Wholesale Clothing for Retailers in India";
const siteDescription =
  "GarmentBazaar (Garment Bazaar) is India's wholesale platform for clothing retailers. Buy branded stock direct from brands, with per-piece prices and small MOQs.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | GarmentBazaar",
  },
  description: siteDescription,
  applicationName: "GarmentBazaar",
  keywords: [
    "GarmentBazaar",
    "Garment Bazaar",
    "garment bazaar wholesale",
    "garment bazaar online",
    "wholesale clothing for retailers",
    "online wholesale clothing India",
    "wholesale clothes for shop",
    "buy wholesale clothing online for retail shop",
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
              "@id": `${siteUrl}/#organization`,
              name: "GarmentBazaar",
              alternateName: ["Garment Bazaar", "Garment Bazar", "GarmentBazaar.com", "Garment Bazaar India"],
              url: siteUrl,
              logo: `${siteUrl}/icon`,
              email: "hello@garmentbazaar.com",
              slogan: "Stock what sells. Skip the mandi.",
              description: siteDescription,
              areaServed: "IN",
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${siteUrl}/#website`,
              name: "GarmentBazaar",
              alternateName: ["Garment Bazaar", "Garment Bazar", "GarmentBazaar.com", "Garment Bazaar India"],
              publisher: { "@id": `${siteUrl}/#organization` },
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
