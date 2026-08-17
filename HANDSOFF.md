# Handoff — commercialcleaningservicessavage.com

Status: **READY TO LAUNCH** (pending one manual step — see "Before going live" below)

## What this is

43-page static HTML microsite for Savage Commercial Cleaning Services (South Metro
MN, 8 towns, 3 services). No CMS, no build step, no framework. Deployed on Vercel,
git repo already connected to the Vercel project.

## What was done in this session

1. **Contact form wired to the CRM.** The `/request-a-quote/` page had a dead
   `<form action="#">` with no submission handler. Added:
   - `api/lead.js` — Vercel serverless function that receives the form POST,
     validates/sanitizes input, and forwards it to the CRM-QM `push_lead` endpoint
     (`https://thequotemasters.com/crm_api/api.php?action=push_lead`) with the bearer
     token attached server-side. The token is never sent to the browser.
   - `scripts.js` — client-side fetch-based submit handler with inline success/error
     status messaging, plus a hidden honeypot field for basic bot filtering.
   - The `/contact/` page still has no form by design — it only offers phone/email
     and a link to `/request-a-quote/`, which is the actual lead-capture page. Left
     as-is; it matches the original page's intent.

2. **UTM tracking added.** `scripts.js` is now loaded on all 43 pages. It captures
   `utm_source/medium/campaign/term/content` from the landing URL into
   `sessionStorage` so they survive navigation to `/request-a-quote/` before the form
   is submitted. Only `utm_source` is forwarded to the CRM — that's the only UTM
   field the CRM API payload supports (confirmed against the CRM-QM API doc).

3. **Placeholder / production-readiness sweep across all 43 pages.** No lorem ipsum,
   `{{tokens}}`, TODOs, fake phone numbers, or fabricated claims found — the
   original build already enforced this (see `QA.md`). Verified canonicals, titles,
   meta descriptions, phone/email consistency, and internal links: all clean.

4. **Fixed a real gap: orphaned resource articles.** 4 of the 5 `/resources/`
   articles had zero internal links pointing to them (sitemap-only, undiscoverable
   by users, weak for SEO). Added one contextual inbound link per article from a
   topically relevant page:
   - `cleaning-frequency-guide` ← linked from `/our-process/`
   - `scope-of-work-template` ← linked from `/our-process/`
   - `insurance-and-bonding` ← linked from `/insured-and-bonded/`
   - `how-to-switch-cleaning-companies` ← linked from `/why-choose-us/`
   - (`commercial-cleaning-cost` already had one inbound link from `/pricing/`.)
   No new hub page was built — this was a deliberate scope call, not an oversight;
   see the `AskUserQuestion` decision in this session if reopening.

5. **Vercel project scaffolding added** (this repo had none before): `package.json`
   (Node engine pin), `vercel.json` (clean URLs, trailing slash, baseline security
   headers), `.env.example`, `.gitignore`.

6. **`CLAUDE.md` and this file added.**

## Before going live — action required

Set the CRM bearer token as a Vercel environment variable named `CRM_API_TOKEN`.
It is intentionally **not** in this repo or in this file — the token was supplied
in the client's `CRM-QM API Documentation.pdf`. Copy it from that document directly
into the Vercel dashboard; do not paste it into any file that gets committed.

Set this in the Vercel dashboard → Project → Settings → Environment Variables
(Production + Preview). Without it, `/api/lead` returns a 500 and the quote form
will not submit. This project has git auto-deploy connected to Vercel, so once the
env var is set, the next push to `main` (or a redeploy) picks it up — no CLI needed.

## Explicitly not done (per instructions)

- No automated tests were written — user confirmed "no testing" and no CI is wired up.
- No local/CLI Vercel verification was performed — user confirmed the repo is
  already connected to Vercel and deploys are handled there, not via CLI here.
- The `/contact/` page was left without a form (see item 1 above) — only
  `/request-a-quote/` submits leads. Flag if the intent was actually to add a
  second form on `/contact/`.

## Open items / judgment calls worth a second look

- `industry: 23` is hardcoded in `api/lead.js`, copied from the example payload in
  the CRM API doc. Confirm this is in fact the correct industry code for commercial
  cleaning in the live CRM before relying on lead routing/categorization.
- The CRM payload's `questions` and `appointments` arrays are sent empty — the
  quote form here doesn't collect a structured questionnaire or appointment slots
  (the CRM API supports both). If the CRM side expects those to route/qualify
  leads, consider whether the form needs additional fields.
