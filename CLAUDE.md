# commercialcleaningservicessavage.com

Static HTML microsite (43 core pages + 25-post blog, no build step) for Savage
Commercial Cleaning Services, deployed on Vercel with a Node serverless function
backing a multi-step CRM quote wizard.

## Stack

- Plain HTML/CSS/vanilla JS — no framework, no bundler, no `node_modules` at runtime.
- `styles.css` — single global stylesheet, CSS custom properties for theme tokens,
  plus a `.wiz-*` block at the end for the quote wizard.
- `scripts.js` — loaded on every page (`<script src="/scripts.js" defer>`). UTM
  capture only.
- `assets/js/quote-wizard.js` — loaded only on `/request-a-quote/`. Multi-step
  quote wizard client: cleaning-needs questionnaire, walkthrough appointment
  booking, industry selection, review step, and submission to `/api/submit-lead`.
- `api/submit-lead.js` — Vercel Node serverless function. Validates and forwards
  the wizard's CRM-shaped payload to the CRM-QM `push_lead` endpoint. Holds the
  CRM bearer token server-side via the `CRM_API_TOKEN` env var — never expose this
  token in client-side code.
- `blog/` — 25 static posts (`blog/<slug>/index.html`) + `blog/index.html` hub.
  Same static, templated-by-hand pattern as the rest of the site; no CMS, no
  per-post byline/date, `LocalBusiness`-only JSON-LD (no `Article`/`BlogPosting`).
- `vercel.json` — static caching headers + clean/trailing-slash URL config.

## Working conventions

- Every page is `<dir>/index.html` — keep that pattern for new pages (clean URLs).
- Every page repeats the same header/nav/footer markup inline (no templating). When
  editing shared markup (nav links, footer, phone/email), it must be changed on all
  69 pages — there is no single source of truth to edit once. Use `grep -rl` /
  a loop across `find . -name index.html` for site-wide edits, and diff a sample of
  pages after to confirm consistency.
- Contact phone is `(866) 958-8773` (`tel:+18669588773`), email is
  `ops@thequotemasters.com`. These must be identical across all pages if changed.
- Every footer ends with a `.footer-credit` line: "Built and Maintained by
  Infin8Content" linking to `https://infin8content.com/`. Keep this on any new
  page's footer, in the same place (very bottom, inside `.footer-bottom`).
- No CMS, no testimonials/reviews/star ratings, no invented pricing/policy numbers —
  see `QA.md` for the original build's hard rules and page inventory.
- No test suite exists for this project (static content site, no testing requested).

## Quote wizard / CRM integration

- CRM-QM `push_lead` endpoint: `https://thequotemasters.com/crm_api/api.php?action=push_lead`
- Auth: Bearer token, stored as `CRM_API_TOKEN` in Vercel project env vars (not committed).
  **This token is shared across the entire portfolio of sites using this CRM account.**
- `api/submit-lead.js` constants specific to this site: `ZIP_DEFAULT='55378'`,
  `ADDRESS_DEFAULT='Savage, MN'`, `SITE_SOURCE_TAG='Site: commercialcleaningservicessavage.com'`
  (prepended into `customer.notes` on every submission — required because the CRM
  has no per-site field and the token is shared; without it, leads from every
  portfolio site are indistinguishable), and the CORS origin.
- The visitor picks their facility type from the CRM's fixed industry list in the
  wizard's details step — `industry` is no longer hardcoded.
- The wizard collects a structured questionnaire (`questions[]`) and one or more
  walkthrough appointment slots (`appointments[]`); both must be non-empty for the
  CRM to accept the payload. See the header comment in `api/submit-lead.js` for the
  full set of CRM validation rules (date/weekday constraints, field requirements).
- A honeypot is not used in the wizard flow (the old flat form's honeypot went away
  with `api/lead.js`); the multi-step UI and required fields are the current spam
  mitigation.

## UTM tracking

- `scripts.js` reads `utm_source/medium/campaign/term/content` from the URL on any
  page load and stores them in `sessionStorage` (key `qm_utm_params`).
- `quote-wizard.js` reads that stored value and forwards `utm_source` to the CRM
  on submit (`utm_source` is the only UTM field the CRM API accepts, per
  `CRM-QM API Documentation.pdf`).
- Home's teaser form (`GET /request-a-quote/?name=&phone=&city=&sqft=`) hands off
  to the wizard, which prefills step 1 from those query params via
  `prefillFromQuery()`.

## Deployment

- Git repo is already connected to Vercel. Push to `main` deploys automatically —
  no CLI deploy step needed.
- Required Vercel env var: `CRM_API_TOKEN` (set in Vercel dashboard, not in this repo).
- Before launch: click through the wizard on a Vercel preview deploy in a real
  browser, including one real appointment booking and one real CRM submission —
  this was not done in the session that built the wizard (no browser tool
  available). See `HANDSOFF.md` for full context.
