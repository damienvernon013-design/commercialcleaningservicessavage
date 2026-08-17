# commercialcleaningservicessavage.com

Static HTML microsite (43 pages, no build step) for Savage Commercial Cleaning
Services, deployed on Vercel with a single Node serverless function for lead
capture.

## Stack

- Plain HTML/CSS/vanilla JS — no framework, no bundler, no `node_modules` at runtime.
- `styles.css` — single global stylesheet, CSS custom properties for theme tokens.
- `scripts.js` — loaded on every page (`<script src="/scripts.js" defer>`). Captures UTM
  params into `sessionStorage` and handles the quote form submission on `/request-a-quote/`.
- `api/lead.js` — Vercel Node serverless function. Proxies form submissions to the
  CRM-QM `push_lead` endpoint. Holds the CRM bearer token server-side via the
  `CRM_API_TOKEN` env var — never expose this token in client-side code.
- `vercel.json` — static caching headers + clean/trailing-slash URL config.

## Working conventions

- Every page is `<dir>/index.html` — keep that pattern for new pages (clean URLs).
- Every page repeats the same header/nav/footer markup inline (no templating). When
  editing shared markup (nav links, footer, phone/email), it must be changed on all
  43 pages — there is no single source of truth to edit once. Use `grep -rl` /
  a loop across `find . -name index.html` for site-wide edits, and diff a sample of
  pages after to confirm consistency.
- Contact phone is `(866) 958-8773` (`tel:+18669588773`), email is
  `ops@thequotemasters.com`. These must be identical across all pages if changed.
- No CMS, no testimonials/reviews/star ratings, no invented pricing/policy numbers —
  see `QA.md` for the original build's hard rules and page inventory.
- No test suite exists for this project (static content site, no testing requested).

## Lead API integration

- CRM-QM `push_lead` endpoint: `https://thequotemasters.com/crm_api/api.php?action=push_lead`
- Auth: Bearer token, stored as `CRM_API_TOKEN` in Vercel project env vars (not committed).
- `industry` is hardcoded to `23` in `api/lead.js` (commercial cleaning, per the CRM docs example).
- The client form posts JSON to `/api/lead`; the function reshapes it into the CRM's
  expected payload and forwards it server-side. This keeps the bearer token out of
  the browser.
- A honeypot field (`website`, visually hidden) is used for basic bot mitigation —
  submissions with that field filled are silently accepted (200) but never forwarded.

## UTM tracking

- `scripts.js` reads `utm_source/medium/campaign/term/content` from the URL on any
  page load, stores them in `sessionStorage` (key `qm_utm_params`), and only
  `utm_source` is currently forwarded to the CRM (`utm_source` is the only UTM field
  the CRM API accepts, per `CRM-QM API Documentation.pdf`).

## Deployment

- Git repo is already connected to Vercel. Push to `main` deploys automatically —
  no CLI deploy step needed.
- Required Vercel env var: `CRM_API_TOKEN` (set in Vercel dashboard, not in this repo).
