import type { MetadataRoute } from "next";
import { departments } from "@/data/departments";
import { guides } from "@/content/generated";
import { listApprovedCollections, listApprovedSuppliers } from "@/lib/db";

const siteUrl = "https://garmentbazaar.com";

// Built per request so new collections and suppliers appear as soon as
// they're approved.
export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (
    path: string,
    priority: number,
    changeFrequency: "daily" | "weekly" | "monthly",
  ) => ({ url: `${siteUrl}${path}`, lastModified: now, changeFrequency, priority });

  const core = [
    page("", 1, "daily"),
    page("/collections", 0.9, "daily"),
    page("/ai-tools", 0.8, "weekly"),
    page("/stock-advisor", 0.8, "weekly"),
    page("/ask", 0.7, "weekly"),
    page("/whatsapp-writer", 0.7, "weekly"),
    page("/solutions/retailers", 0.9, "weekly"),
    page("/solutions/brands", 0.7, "monthly"),
    page("/solutions/manufacturers", 0.7, "monthly"),
    page("/marketplace", 0.7, "weekly"),
    page("/platform", 0.5, "monthly"),
    page("/about", 0.4, "monthly"),
    page("/contact", 0.4, "monthly"),
    page("/signup", 0.5, "monthly"),
  ];

  const depts = departments.map((d) => page(`/wholesale/${d.slug}`, 0.8, "daily"));

  const guidePages = [
    page("/guides", 0.8, "daily"),
    ...guides.map((g) => ({
      url: `${siteUrl}/guides/${g.slug}`,
      lastModified: new Date(g.date + "T00:00:00Z"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: [`${siteUrl}/images/products/${g.hero}.jpg`],
    })),
  ];

  const collections = listApprovedCollections().map((c) => ({
    url: `${siteUrl}/collections/${encodeURIComponent(c.slug)}`,
    lastModified: new Date(c.created_at.replace(" ", "T") + "Z"),
    changeFrequency: "weekly" as const,
    priority: 0.7,
    ...(c.image_path ? { images: [`${siteUrl}${c.image_path}`] } : {}),
  }));

  const suppliers = listApprovedSuppliers().map((s) => ({
    url: `${siteUrl}/marketplace/${encodeURIComponent(s.slug)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...core, ...depts, ...guidePages, ...collections, ...suppliers];
}
