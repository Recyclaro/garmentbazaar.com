import type { MetadataRoute } from "next";

const siteUrl = "https://garmentbazaar.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/marketplace",
    "/platform",
    "/solutions/brands",
    "/solutions/manufacturers",
    "/solutions/retailers",
    "/about",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
