import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Private areas and app endpoints have nothing worth indexing.
      disallow: ["/dashboard", "/api/", "/login"],
    },
    sitemap: "https://garmentbazaar.com/sitemap.xml",
    host: "https://garmentbazaar.com",
  };
}
