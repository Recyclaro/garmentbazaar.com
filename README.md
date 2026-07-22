# GarmentBazaar

**GarmentBazaar** is an AI-first B2B sourcing and supply chain platform
connecting brands, manufacturers, factories, and retailers across India's
fashion and lifestyle ecosystem. This repo is the marketing site plus a
working marketplace: real accounts, role-based dashboards, manufacturer
self-listing with admin moderation, and quote request (RFQ) capture.

Built with [Next.js](https://nextjs.org) (App Router), TypeScript, and
Tailwind CSS. Data lives in a hosted Postgres database
([Neon](https://neon.tech), via [Drizzle ORM](https://orm.drizzle.team)),
sessions are signed cookies (`jose` + `bcryptjs`), and transactional email
goes through [Resend](https://resend.com). Designed to deploy on
[Vercel](https://vercel.com) with zero server management.

## Pages

- `/` — Home
- `/platform` — Deep dive into the six AI capabilities (onboarding,
  procurement, pricing, inventory, supply chain, retailer recommendations)
- `/marketplace` — Live, filterable supplier directory backed by the database
- `/solutions/brands`, `/solutions/manufacturers`, `/solutions/retailers` —
  Persona-specific solution pages
- `/about` — Mission and principles
- `/contact` — Contact form (stores a real quote request / RFQ)
- `/signup`, `/login` — Account creation and login (Brand / Manufacturer /
  Retailer)
- `/dashboard` — Role-aware redirect into:
  - `/dashboard/manufacturer` — manage your factory listing(s), view quote
    requests received, create/edit/delete listings
  - `/dashboard/buyer` — brand/retailer view of your submitted quote requests
  - `/dashboard/admin` — moderation queue for pending listings + all RFQs

## Getting Started (local development)

```bash
npm install
cp .env.example .env.local   # then fill in DATABASE_URL and SESSION_SECRET (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

Local development needs a real `DATABASE_URL` — create a free Neon project
(or a separate branch of your production Neon project, so local testing
never touches real user data) and paste its connection string into
`.env.local`.

### Environment variables

Copy `.env.example` to `.env.local` and set:

- `DATABASE_URL` — Postgres connection string from Neon. Required.
- `SESSION_SECRET` — signs session cookies. Generate one with
  `openssl rand -base64 32`. Falls back to an insecure dev-only value with a
  console warning if unset — fine for poking around locally, never for
  anything deployed.
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — seeded as the one admin account the
  first time the database is empty. In production, a default or missing
  `ADMIN_PASSWORD` makes the deploy fail on purpose (see `scripts/migrate.ts`)
  rather than launch with a guessable password.
- `RESEND_API_KEY` / `RESEND_FROM_EMAIL` — optional. Without them, the app
  runs fine and just logs a warning instead of emailing manufacturers when
  they get a new quote request.

### Database

Schema and seed data are managed by `scripts/migrate.ts`, which runs
automatically as part of `npm run build` (see `package.json`). It:

1. Applies any pending SQL migrations in `/drizzle` (generated from
   `src/lib/schema.ts` via `npm run db:generate` — only needs to run when
   that schema file changes, and never touches a live database itself).
2. Seeds the supplier directory and admin account if the database is empty.

If `DATABASE_URL` isn't set, the build still succeeds — the script logs a
warning and skips, so contributors without a database configured yet (or
this project's own sandboxed dev environment) aren't blocked.

## Deploying (Vercel + Neon + Resend)

1. **Neon** (database) — create a project at neon.tech, copy the connection
   string from the dashboard.
2. **Resend** (email, optional but recommended) — create an account at
   resend.com, verify your sending domain, copy the API key.
3. **Vercel** (hosting) — import this GitHub repo at vercel.com. Before the
   first deploy, add these under Project Settings → Environment Variables:
   `DATABASE_URL`, `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`,
   `RESEND_API_KEY`, `RESEND_FROM_EMAIL`. Use a real, unique
   `ADMIN_PASSWORD` — the build intentionally fails if it's left as the
   `changeme123` default.
4. Deploy. Vercel runs `npm run build`, which applies migrations and seeds
   the database automatically — no manual database step required.
5. **Domain** — in Vercel, add your domain under Project Settings →
   Domains, then add the DNS records it gives you at your registrar.
6. Log in as the admin account you configured and change nothing else —
   the moderation queue, listings, and RFQs all just work against the new
   database.

## Scripts

- `npm run dev` — start the local dev server
- `npm run build` — applies database migrations/seed, then production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint
- `npm run db:generate` — after changing `src/lib/schema.ts`, generate the
  matching SQL migration file (offline — no database connection needed)
