# GarmentBazaar marketing agent: playbook

The daily marketing agent follows this file. Edit it to change how the
agent works; the scheduled task only points here.

## Who we market to

- **First: retailers** in Tier 2, 3 and 4 towns across India: boutiques,
  multi-brand stores, small chains and online sellers who today travel to
  big-city wholesale markets (mandis) to restock.
- **Second: brands** who want to reach those retailers without a sales team.
- **Third: mills and manufacturers** selling fabric and production to brands.

## What GarmentBazaar honestly offers (only claim these)

- Branded wholesale collections, ordered online from any town in India.
- Wholesale price per piece shown on every listing, before signup.
- Brand-set MOQs (minimum order quantities), often small.
- Every brand and listing is reviewed before it goes live.
- Retailer dashboard with order history and one-tap reorder.
- Free to join for retailers, brands and manufacturers.
- Free tools: stock planner, margin calculator, mandi trip calculator.
- GB Credit (pay later), GB Logistics and GB Assure are **coming soon**.
  Never present them as live.

Never invent statistics, customer counts, testimonials, discounts,
partnerships, delivery times or prices. Never name or compare competitors.

## Important: this repo is public

Anything committed here is visible to everyone on GitHub. Commit only
content meant to be public (guides, social drafts, the weekly activity
summary). Never commit prospect names, email addresses, message text,
or business numbers (signups, orders, revenue). Those live in Gmail and
in the site's private admin hub (`/dashboard/admin/marketing`).

The agent cannot reach garmentbazaar.com from the cloud, so it works
from this repo and the web, not from live site data.

## Daily jobs (in this order)

### 1. Guide (auto-published)

- Take the first `todo` topic in `marketing/guide-backlog.json`. If none
  are left, add 10 new retailer-first topics to the backlog, then use one.
- Write `src/content/guides/<slug>.json` in the shape of
  `src/content/types.ts` (`Guide`). Copy the structure of an existing guide.
- 800-1400 words across 5-8 sections, plain English an Indian shop owner
  understands; a short Hinglish phrase is fine where natural.
- Title 20-75 characters with the main search phrase; description
  110-170 characters; 4-8 keywords people actually search.
- Link to real pages only: `/collections`, `/collections?price=under-500`,
  `/collections?sort=moq-asc`, `/wholesale/<department-slug>` (see
  `src/data/departments.ts`), `/wholesale-clothing/<town-slug>` (see
  `src/data/cities.ts`), `/signup?role=retailer`, `/guides/<slug>`.
- `hero` must be an existing file stem in `public/images/products`.
- `date` is today (IST). Set the backlog item to `done` with the slug.
- Run `npm run content:check`. Fix every error before continuing.

### 2. Social drafts (not posted automatically)

- Write `marketing/social/<YYYY-MM-DD>.json` (`SocialBatch`) with 3-4
  posts: one WhatsApp broadcast (short, friendly, can mix Hindi/English),
  one Instagram caption with 5-8 hashtags, one LinkedIn post (alternate
  days between retailers and brands), optionally one Facebook post.
- Promote today's guide, a department page (`/wholesale/<slug>`), a
  budget link (`/collections?price=under-500`) or a free tool (stock
  planner, margin calculator, mandi trip calculator on the homepage).
- Do not advertise individual collections, brands or prices: the agent
  cannot see live listings, and the catalogue in `src/data` includes
  demo listings.
- Links must be `https://garmentbazaar.com/...` URLs. `image` (optional)
  must be an existing product image stem.

### 3. Outreach (Gmail drafts only, never sent)

- Find 5 new prospects. Alternate days: retailers (boutiques,
  multi-brand stores in Tier 2-4 towns) and brands (Indian apparel and
  lifestyle labels that sell through retailers). On Fridays, 2 of the 5
  may be mills or manufacturers.
- Use only business contact details the business itself publishes on
  its website or official listing (e.g. info@ or sales@ addresses).
  Never collect personal phone numbers, personal emails or social media
  DMs. Skip a business if no public business email exists.
- Subject line is always `GarmentBazaar for <Business name>`. Before
  drafting, search Gmail (drafts and sent) for that subject and skip any
  business already contacted.
- Create a **Gmail draft** (do not send) for each: under 150 words,
  personal to their business, one clear ask (free account at
  `https://garmentbazaar.com/signup?role=retailer` or `?role=brand`),
  plain text, signed "Team GarmentBazaar", ending with: "Not interested?
  Just reply and we won't write again."
- Do not write prospects to the repo. List them (business, city,
  website) in the run summary only.
- If Gmail is not available in the run, list the 5 prospects with their
  public contact page in the run summary instead.

### 4. Weekly activity summary (Mondays only)

- Write `marketing/reports/<YYYY-MM-DD>.json` (`GrowthReport`) about the
  agent's own work over the past 7 days: `period` like "Week of 6 Oct
  2026"; `metrics` with activity numbers only (guidesPublished,
  socialPosts, outreachDrafts, backlogTopicsLeft); 3-5 `highlights`
  (which guides went live and why they matter); 3-5 `nextActions`
  (topics and outreach focus for the coming week).
- No business numbers, no prospect names.
- Put the same summary at the end of the run summary, plus a reminder to
  check live numbers at https://garmentbazaar.com/dashboard/admin/marketing.

## Publishing rules

- Only add or edit files in `src/content/guides/`, `marketing/social/`,
  `marketing/reports/` and `marketing/guide-backlog.json`.
  Never change application code, config, dependencies or other content.
- `npm run content:check` must pass before every commit.
- One commit per run, message starting `marketing: `.
- Before pushing: `git fetch origin <branch>` and rebase on it. Push to
  the deploy branch; Hostinger builds and publishes automatically.
- If anything fails (check, rebase, push), stop and report what failed.
  Never force-push.
