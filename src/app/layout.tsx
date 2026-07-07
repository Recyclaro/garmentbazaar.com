import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GarmentBazaar — The AI-First B2B Fashion Sourcing Platform",
    template: "%s | GarmentBazaar",
  },
  description:
    "GarmentBazaar is an AI-powered B2B sourcing and supply chain platform connecting brands, manufacturers, factories, and retailers across India's fashion and lifestyle ecosystem.",
  keywords: [
    "B2B fashion sourcing",
    "garment manufacturing platform",
    "AI supply chain",
    "apparel sourcing India",
    "textile procurement",
    "retail inventory optimization",
  ],
  openGraph: {
    title: "GarmentBazaar — The AI-First B2B Fashion Sourcing Platform",
    description:
      "AI-powered sourcing, procurement, pricing, and supply chain orchestration for India's fashion and lifestyle ecosystem.",
    url: siteUrl,
    siteName: "GarmentBazaar",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GarmentBazaar — The AI-First B2B Fashion Sourcing Platform",
    description:
      "AI-powered sourcing, procurement, pricing, and supply chain orchestration for India's fashion and lifestyle ecosystem.",
  },
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
        <Header user={user ? { name: user.name, role: user.role } : null} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
