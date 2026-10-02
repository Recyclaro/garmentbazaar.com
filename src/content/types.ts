// Shapes of the content files the marketing agent writes. They are checked
// by scripts/build-content.mjs before every build, then bundled into
// src/content/generated.ts (git-ignored, rebuilt each time).

export type Audience = "retailers" | "brands" | "mills";

export interface GuideSection {
  heading: string;
  /** Paragraphs of plain text. */
  body: string[];
  bullets?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  audience: Audience;
  /** A collection category such as "Ethnic & Occasion", or null. */
  department: string | null;
  keywords: string[];
  /** File stem in public/images/products. */
  hero: string;
  readingMinutes: number;
  sections: GuideSection[];
  faq: { q: string; a: string }[];
  cta: { label: string; href: string };
}

export interface SocialPost {
  channel: "whatsapp" | "instagram" | "linkedin" | "facebook";
  text: string;
  link: string;
  image?: string;
}

export interface SocialBatch {
  date: string;
  posts: SocialPost[];
}

// Weekly marketing activity summary written by the agent. Activity only
// (guides, drafts, outreach counts): the repo is public, so business
// numbers stay on the live site's admin hub.
export interface GrowthReport {
  date: string;
  period: string;
  metrics: Record<string, number>;
  highlights: string[];
  nextActions: string[];
}
