# GarmentBazaar

**GarmentBazaar** is an AI-first B2B sourcing and supply chain platform
connecting brands, manufacturers, factories, and retailers across India's
fashion and lifestyle ecosystem. This repo is the marketing site plus a
working marketplace: real accounts, role-based dashboards, manufacturer
self-listing with admin moderation, and quote request (RFQ) capture.

Built with [Next.js](https://nextjs.org) (App Router), TypeScript, and
Tailwind CSS. Auth and data are self-contained — a local SQLite database
(via Node's built-in `node:sqlite`) and signed session cookies (`jose` +
`bcryptjs`) — no external services required to run it.

## Pages

- `/` — Home
- `/platform` — Deep dive into the six AI capabilities (onboarding,
  procurement, pricing, inventory, supply chain, retailer recommendations)
- `/marketplace`, `/marketplace/[slug]` — Live, filterable supplier
  directory backed by the database, plus a full detail page per supplier
- `/collections`, `/collections/[slug]` — Fashion & lifestyle collections
  listed by brands; retailers order directly at the brand's MOQ, with real
  checkout via Razorpay
- `/solutions/brands`, `/solutions/manufacturers`, `/solutions/retailers` —
  Persona-specific solution pages
- `/about` — Mission and principles
- `/contact` — Contact form (stores a real quote request / RFQ)
- `/signup`, `/login` — Account creation and login (Brand / Manufacturer /
  Retailer)
- `/dashboard` — Role-aware redirect into:
  - `/dashboard/manufacturer` — manage your factory listing(s), view quote
    requests received, create/edit/delete listings
  - `/dashboard/brand` — manage your collection listing(s), view orders
    received from retailers
  - `/dashboard/buyer` — brand/retailer view of submitted quote requests;
    retailers also see their order history here
  - `/dashboard/admin` — moderation queue for pending listings/collections,
    all RFQs, and all orders

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in SESSION_SECRET (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment variables

Copy `.env.example` to `.env.local` and set:

- `SESSION_SECRET` — signs session cookies. Generate one with
  `openssl rand -base64 32`. Falls back to an insecure dev-only value with a
  console warning if unset — fine for poking around locally, not for
  anything you'd share.
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — seeded as the one admin account the
  first time the app runs (default `admin@garmentbazaar.com` /
  `changeme123`). Change these before deploying anywhere real.
- `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` — optional. Without them,
  retailers can still browse and "order" collections (saved as a request,
  the brand is notified), just without a real payment. With test-mode keys
  from your Razorpay dashboard, the full checkout flow works with test
  cards and no real money moves. Real money only starts moving once you
  put live keys in and complete Razorpay's business/KYC verification.

### Database

A SQLite file is created at `data/app.db` on first run (git-ignored) and
seeded with sample suppliers plus the admin account. Delete the `data/`
folder to reset to a clean seeded state.

## Scripts

- `npm run dev` — start the local dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint
