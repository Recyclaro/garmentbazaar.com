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
partnerships, delivery times or prices. Live numbers come only from the
metrics endpoint. Never name or compare competitors.

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
  `src/data/departments.ts`), `/signup?role=retailer`, `/guides/<slug>`.
- `hero` must be an existing file stem in `public/images/products`.
- `date` is today (IST). Set the backlog item to `done` with the slug.
- Run `npm run content:check`. Fix every error before continuing.

### 2. Social drafts (not posted automatically)

- Write `marketing/social/<YYYY-MM-DD>.json` (`SocialBatch`) with 3-4
  posts: one WhatsApp broadcast (short, friendly, can mix Hindi/English),
  one Instagram caption with 5-8 hashtags, one LinkedIn post (for brands
  or retailers, alternate days), optionally one Facebook post.
- Promote today's guide and one or two real collections from
  `newestCollections` in the metrics feed, with their real price per
  piece and MOQ. Links must be `https://garmentbazaar.com/...` URLs.
- `image` (optional) must be an existing product image stem.

### 3. Outreach (drafts only, never sent)

- Find 5 new prospects. Alternate days: retailers (boutiques,
  multi-brand stores in Tier 2-4 towns) and brands (Indian apparel and
  lifestyle labels that sell through retailers). On Fridays, 2 of the 5
  may be mills or manufacturers.
- Use only business contact details the business itself publishes on
  its website or official listing (e.g. info@ or sales@ addresses or a
  contact form). Never collect personal phone numbers, personal emails
  or social media DMs. Skip a business if no public business contact
  exists.
- Skip anyone already in `marketing/outreach/*.json`.
- For each prospect with a public business email, create a **Gmail
  draft** (do not send) from the account owner. Short (under 150 words),
  personal to their business, one clear ask (create a free account at
  `https://garmentbazaar.com/signup?role=retailer` or `?role=brand`),
  plain text, signed "Team GarmentBazaar", ending with: "Not interested?
  Just reply and we won't write again."
- Log all 5 in `marketing/outreach/<YYYY-MM-DD>.json` (`OutreachBatch`),
  `status` = `gmail-draft` or `logged` (no email found or Gmail not
  available). Do not store email addresses or message bodies in the repo.

### 4. Weekly growth report (Mondays only)

- Fetch the metrics feed and compare with the previous report in
  `marketing/reports/`.
- Write `marketing/reports/<YYYY-MM-DD>.json` (`GrowthReport`): `period`
  like "Week of 6 Oct 2026", 6-10 metrics (numbers only), 3-5
  highlights, 3-5 concrete next actions for the founder.
- End the run summary with the report's highlights and actions.

## Publishing rules

- Only add or edit files in `src/content/guides/` and `marketing/`.
  Never change application code, config, dependencies or other content.
- `npm run content:check` must pass before every commit.
- One commit per run, message starting `marketing: `.
- Before pushing: `git fetch origin <branch>` and rebase on it. Push to
  the deploy branch; Hostinger builds and publishes automatically.
- If anything fails (check, rebase, push), stop and report what failed.
  Never force-push.
