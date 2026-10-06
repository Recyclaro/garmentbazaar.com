import type { Metadata } from "next";

export const SITE_URL = "https://garmentbazaar.com";
export const SITE_NAME = "GarmentBazaar";
/** Served by src/app/opengraph-image.png. */
const DEFAULT_SHARE_IMAGE = "/opengraph-image.png";

// Page metadata with matching Open Graph and Twitter tags. Next merges
// metadata shallowly, so a page that sets only `title` would otherwise
// share the home page's og:title and og:url on WhatsApp and social cards.
export function pageMeta({
  title,
  description,
  path,
  image,
  imageAlt,
  type = "website",
  keywords,
  noindex = false,
}: {
  title: string;
  description: string;
  /** Canonical path starting with "/". */
  path: string;
  /** Image URL or path; the site-wide share image is used when omitted. */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  keywords?: string[];
  noindex?: boolean;
}): Metadata {
  const shareTitle = `${title} | ${SITE_NAME}`;
  // Google shows roughly 60 characters. When the brand suffix would push the
  // title past that, drop the suffix rather than lose the keywords.
  const fullTitle = shareTitle.length <= 60 ? title : { absolute: title };
  const images = [
    image
      ? { url: image, alt: imageAlt ?? title }
      : { url: DEFAULT_SHARE_IMAGE, width: 1200, height: 630, alt: "GarmentBazaar: wholesale clothing for retailers" },
  ];
  return {
    title: fullTitle,
    description: clip(description, 160),
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: shareTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_IN",
      type,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}

/** Metadata for a "not found" result inside a dynamic route. */
export const notFoundMeta = (title: string): Metadata => ({
  title,
  robots: { index: false, follow: true },
});

/** Cut text to `max` characters at a word boundary, ending with an ellipsis. */
export function clip(text: string, max: number): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\-–—\s]+$/, "") + "…";
}
