# Handoff — commercialcleaningservicessavage.com

Status: **READY TO LAUNCH** (pending manual steps — see "Before going live" below)

## What this is

43-page static HTML microsite plus a 25-post blog for Savage Commercial Cleaning
Services (South Metro MN, 8 towns, 3 services). No CMS, no build step, no
framework. Deployed on Vercel, git repo already connected to the Vercel project.

## Latest session: footer credit line

Added a "Built and Maintained by Infin8Content" credit line
(`<a href="https://infin8content.com/">`) to the very bottom of the footer on all
69 pages (43 core pages + 25 blog posts + blog hub). Implemented as a new
`.footer-credit` span appended to the existing `.footer-bottom` block, with a
CSS rule added so it wraps onto its own centered line rather than breaking the
existing two-column `justify-content: space-between` layout. Verified via grep
that all 69 `index.html` files contain the credit, and via local
`python3 -m http.server` that it renders on both a core page and a blog page.

## Prior session: CRM quote wizard + 25-post blog

Replaced the original single-step `/api/lead.js` quote form with the full
multi-step CRM-integrated wizard, and added a 25-post blog section, following
`Playbook Replicating This.md` (Phases 2 and 3).

**Quote wizard:**
- `api/submit-lead.js` (new) replaces `api/lead.js` (deleted). Full CRM PushLead
  payload support: structured `questions[]`, `appointments[]` (walkthrough
  date/time slots), and `industry` selection — not just a flat lead form.
  `ZIP_DEFAULT=55378`, `ADDRESS_DEFAULT='Savage, MN'`.
- `SITE_SOURCE_TAG = 'Site: commercialcleaningservicessavage.com'` is prepended to
  `customer.notes` on every submission. **This is required, not decorative** —
  `CRM_API_TOKEN` is shared across the whole portfolio of sites using this same CRM
  account, and the CRM has no per-site field. Without this tag every lead from
  every portfolio site is indistinguishable. If this codebase is ever forked to
  another domain, this constant must change first.
- `assets/js/quote-wizard.js` (new) — the multi-step client wizard (questions,
  appointment booking, review step, submit). Copied per the playbook's fixed CRM
  questionnaire schema; only the CORS origin, ZIP/address defaults, and source tag
  in `submit-lead.js` are site-specific.
- `/request-a-quote/` now renders the wizard scaffold (`data-quote-wizard` +
  the six `data-wizard-*` hooks) instead of the old flat form.
- Home's existing `GET /request-a-quote/?name=&phone=&city=&sqft=` teaser form was
  left as-is — the wizard's `prefillFromQuery()` already reads those params and
  prefills step 1. `/contact/` still has no form by design (unchanged from prior
  session).
- `scripts.js` trimmed to UTM capture only — the old `data-lead-form` submit
  handler is gone since nothing on the site has that attribute anymore.
- Wizard CSS block appended to `styles.css` (`.wiz-*` classes).
- `node --check` passes on both new JS files. Confirmed locally via
  `python3 -m http.server` that `/request-a-quote/` serves all six wizard hooks
  and the script tag loads.

**Blog (25 posts):**
- `blog/<slug>/index.html` × 25 + `blog/index.html` hub, generated from a
  scaffolding script (not committed) per the playbook's recommended approach —
  guarantees byte-identical header/nav/footer/JSON-LD across every post.
- All posts rewritten for this brand/phone/email; no `thequotemasters.com` or
  other-city brand references (verified via grep).
- Named-study citations from the source pack (Princeton, American Cleaning
  Institute "88%", FitRated "362x", specific OSHA CFR sections, National
  Restaurant Association dollar figures) were all softened to general,
  unattributed claims — none of them could be verified from inside this build
  session.
- No fabricated dollar figures anywhere in the blog (verified via grep for `$`).
- The 3 source-pack posts written for restaurants/gyms/schools were reframed as
  general facility-hygiene guidance (`high-traffic-facility-cleaning-considerations`,
  `cleaning-considerations-for-shared-equipment-facilities`,
  `cleaning-considerations-for-shared-community-spaces`) since this site's quoted
  scope (per `services/`) is office / medical-dental / retail / light industrial —
  it does not quote restaurants, gyms, or schools.
- One additional post (`signs-its-time-for-a-new-cleaning-company`) was written to
  bring the total to 25, since the supplied source pack started at "Post 2" (24
  posts) with no "Post 1".
- `LocalBusiness`-only JSON-LD on every post — no `Article`/`BlogPosting` schema,
  byline, or publish date, matching the rest of the site's content pages.
- Nav "Blog" link added to all 43 existing pages, inserted right after FAQ.
- All 25 post URLs + `/blog/` added to `sitemap.xml` (`changefreq weekly`);
  validated as well-formed XML.
- Verified: zero cross-portfolio outbound links, zero old-brand references, every
  internal link in every post resolves to a real file on this site (scripted
  check, not spot-checked).

**Not done — required before this goes fully live:**
- **The wizard has not been clicked through in a real browser.** No browser tool
  was available in this session. Per the playbook, do this on a Vercel preview
  deploy before launch, including one real appointment booking and one real CRM
  submission, to confirm the CRM actually accepts the payload shape end to end.
- `CRM_API_TOKEN` must be set in this project's Vercel env vars (see "Before going
  live" below) — the wizard will 500 without it, same as the old form did.

## Prior session: initial CRM lead capture

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

- The old `api/lead.js` hardcoded `industry: 23`. The new wizard instead requires
  the visitor to pick their actual facility type from the CRM's fixed 40+ item
  industry list — this is a behavior change, not just a technical swap. Confirm
  that's the intended direction (it matches the playbook's reference
  implementation).
- The wizard's `questions`/`appointments` arrays are now populated (previously
  sent empty by `api/lead.js`) — the CRM requires both to be non-empty per the
  validation rules documented in `api/submit-lead.js`'s header comment.
