// Validates the marketing agent's content files and bundles them into
// src/content/generated.ts. Runs before every build (npm "prebuild"), so a
// bad file fails the build and the live site keeps its last good version.
//
//   node scripts/build-content.mjs          validate + write generated.ts
//   node scripts/build-content.mjs --check  validate only

import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const checkOnly = process.argv.includes("--check");
const errors = [];

// Department names come straight from the catalogue definition.
const collectionsTs = readFileSync(join(root, "src/data/collections.ts"), "utf8");
const typeBlock = collectionsTs.match(/export type CollectionCategory =([\s\S]*?);/)[1];
const departments = [...typeBlock.matchAll(/"([^"]+)"/g)].map((m) => m[1]);

const productImage = (stem) => existsSync(join(root, "public/images/products", `${stem}.jpg`));

function readDir(rel) {
  const dir = join(root, rel);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => {
      const path = `${rel}/${f}`;
      try {
        return { file: f, path, data: JSON.parse(readFileSync(join(dir, f), "utf8")) };
      } catch (e) {
        errors.push(`${path}: not valid JSON (${e.message})`);
        return null;
      }
    })
    .filter(Boolean);
}

const isStr = (v, min = 1, max = 10000) => typeof v === "string" && v.trim().length >= min && v.length <= max;
const isDate = (v) => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));
const isPath = (v) => typeof v === "string" && /^\/[A-Za-z0-9\-_/?=&%.]*$/.test(v);
const isUrl = (v) => typeof v === "string" && /^https:\/\/[^\s]+$/.test(v);

function need(cond, path, msg) {
  if (!cond) errors.push(`${path}: ${msg}`);
}

// ---------- Guides
const guides = [];
const slugs = new Set();
for (const { file, path, data: g } of readDir("src/content/guides")) {
  const stem = file.replace(/\.json$/, "");
  need(g.slug === stem, path, `slug must equal the file name ("${stem}")`);
  need(/^[a-z0-9]+(-[a-z0-9]+)*$/.test(g.slug ?? ""), path, "slug must be lowercase words joined by hyphens");
  need(!slugs.has(g.slug), path, "duplicate slug");
  slugs.add(g.slug);
  need(isStr(g.title, 20, 75), path, "title must be 20-75 characters");
  need(isStr(g.description, 110, 170), path, "description must be 110-170 characters");
  need(isDate(g.date), path, "date must be YYYY-MM-DD");
  need(["retailers", "brands", "mills"].includes(g.audience), path, "audience must be retailers, brands or mills");
  need(g.department === null || departments.includes(g.department), path, `department must be null or one of: ${departments.join(", ")}`);
  need(Array.isArray(g.keywords) && g.keywords.length >= 3 && g.keywords.length <= 12 && g.keywords.every((k) => isStr(k, 2, 60)), path, "keywords: 3-12 short strings");
  need(isStr(g.hero) && productImage(g.hero), path, "hero must be an existing file stem in public/images/products");
  need(Number.isInteger(g.readingMinutes) && g.readingMinutes >= 2 && g.readingMinutes <= 20, path, "readingMinutes: whole number 2-20");
  need(Array.isArray(g.sections) && g.sections.length >= 3 && g.sections.length <= 10, path, "sections: 3-10");
  (g.sections ?? []).forEach((s, i) => {
    need(isStr(s.heading, 3, 90), path, `sections[${i}].heading: 3-90 characters`);
    need(Array.isArray(s.body) && s.body.length >= 1 && s.body.length <= 6 && s.body.every((p) => isStr(p, 20, 1200)), path, `sections[${i}].body: 1-6 paragraphs of 20-1200 characters`);
    need(s.bullets === undefined || (Array.isArray(s.bullets) && s.bullets.length <= 10 && s.bullets.every((b) => isStr(b, 2, 300))), path, `sections[${i}].bullets: up to 10 short strings`);
  });
  need(Array.isArray(g.faq) && g.faq.length >= 2 && g.faq.length <= 6 && g.faq.every((f) => isStr(f.q, 5, 160) && isStr(f.a, 20, 700)), path, "faq: 2-6 {q, a}");
  need(g.cta && isStr(g.cta.label, 3, 40) && isPath(g.cta.href), path, "cta: {label, href} with an internal href starting with /");
  const words = [g.title, g.description, ...(g.sections ?? []).flatMap((s) => [s.heading, ...(s.body ?? []), ...(s.bullets ?? [])])]
    .join(" ")
    .split(/\s+/).length;
  need(words >= 600, path, `too short (${words} words; minimum 600)`);
  guides.push(g);
}
guides.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));

// ---------- Social
const social = readDir("marketing/social").map(({ path, data: b }) => {
  need(isDate(b.date), path, "date must be YYYY-MM-DD");
  need(Array.isArray(b.posts) && b.posts.length >= 1 && b.posts.length <= 10, path, "posts: 1-10");
  (b.posts ?? []).forEach((p, i) => {
    need(["whatsapp", "instagram", "linkedin", "facebook"].includes(p.channel), path, `posts[${i}].channel invalid`);
    need(isStr(p.text, 10, 2200), path, `posts[${i}].text: 10-2200 characters`);
    need(isUrl(p.link) && p.link.startsWith("https://garmentbazaar.com"), path, `posts[${i}].link must be a garmentbazaar.com URL`);
    need(p.image === undefined || productImage(p.image), path, `posts[${i}].image must be an existing product image stem`);
  });
  return b;
});

// ---------- Reports
const reports = readDir("marketing/reports").map(({ path, data: r }) => {
  need(isDate(r.date), path, "date must be YYYY-MM-DD");
  need(isStr(r.period, 3, 60), path, "period");
  need(r.metrics && typeof r.metrics === "object" && Object.values(r.metrics).every((v) => typeof v === "number"), path, "metrics: numbers only");
  need(Array.isArray(r.highlights) && r.highlights.every((h) => isStr(h, 3, 400)), path, "highlights");
  need(Array.isArray(r.nextActions) && r.nextActions.every((h) => isStr(h, 3, 400)), path, "nextActions");
  return r;
});

if (errors.length) {
  console.error(`\nContent check failed (${errors.length} problem${errors.length === 1 ? "" : "s"}):`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}

const byDateDesc = (a, b) => (a.date < b.date ? 1 : -1);
const out = `// Generated by scripts/build-content.mjs. Do not edit; edit the JSON files.
import type { Guide, SocialBatch, GrowthReport } from "./types";

export const guides: Guide[] = ${JSON.stringify(guides, null, 2)};

export const socialBatches: SocialBatch[] = ${JSON.stringify(social.sort(byDateDesc).slice(0, 14), null, 2)};

export const reports: GrowthReport[] = ${JSON.stringify(reports.sort(byDateDesc).slice(0, 12), null, 2)};
`;

if (!checkOnly) writeFileSync(join(root, "src/content/generated.ts"), out);
console.log(
  `Content OK: ${guides.length} guides, ${social.length} social batches, ${reports.length} reports${checkOnly ? " (check only)" : ""}.`,
);
