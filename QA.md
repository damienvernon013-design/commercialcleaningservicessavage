# QA Checklist — commercialcleaningservicessavage.com

Build date: 2025
Theme: A — Direct & Operational
Tier: 2 — No map pack (AI Overview present; organic-only lane; Savage 33k market)

---

## Page Count
- [x] **43 pages live** — confirmed via `find -name "index.html" | wc -l` = 43

### Page Inventory
| # | Path | Type |
|---|---|---|
| 1 | `/` | Home |
| 2 | `/about/` | Core |
| 3 | `/contact/` | Core |
| 4 | `/request-a-quote/` | Core |
| 5 | `/pricing/` | Core |
| 6 | `/our-process/` | Core |
| 7 | `/why-choose-us/` | Core |
| 8 | `/faq/` | Core |
| 9 | `/insured-and-bonded/` | Core |
| 10 | `/services/` | Services Hub |
| 11 | `/services/nightly-commercial-cleaning/` | Service |
| 12 | `/services/floor-care/` | Service |
| 13 | `/services/restroom-sanitation/` | Service |
| 14 | `/service-areas/` | Areas Hub |
| 15 | `/service-areas/prior-lake/` | Town |
| 16 | `/service-areas/burnsville/` | Town |
| 17 | `/service-areas/shakopee/` | Town |
| 18 | `/service-areas/bloomington/` | Town |
| 19 | `/service-areas/eagan/` | Town |
| 20 | `/service-areas/lakeville/` | Town |
| 21 | `/service-areas/apple-valley/` | Town |
| 22 | `/service-areas/chanhassen/` | Town |
| 23 | `/service-areas/prior-lake/nightly-commercial-cleaning/` | Town × Service |
| 24 | `/service-areas/prior-lake/floor-care/` | Town × Service |
| 25 | `/service-areas/burnsville/nightly-commercial-cleaning/` | Town × Service |
| 26 | `/service-areas/burnsville/floor-care/` | Town × Service |
| 27 | `/service-areas/shakopee/nightly-commercial-cleaning/` | Town × Service |
| 28 | `/service-areas/shakopee/floor-care/` | Town × Service |
| 29 | `/service-areas/bloomington/nightly-commercial-cleaning/` | Town × Service |
| 30 | `/service-areas/bloomington/floor-care/` | Town × Service |
| 31 | `/service-areas/eagan/nightly-commercial-cleaning/` | Town × Service |
| 32 | `/service-areas/eagan/floor-care/` | Town × Service |
| 33 | `/service-areas/lakeville/nightly-commercial-cleaning/` | Town × Service |
| 34 | `/service-areas/lakeville/floor-care/` | Town × Service |
| 35 | `/service-areas/apple-valley/nightly-commercial-cleaning/` | Town × Service |
| 36 | `/service-areas/apple-valley/floor-care/` | Town × Service |
| 37 | `/service-areas/chanhassen/nightly-commercial-cleaning/` | Town × Service |
| 38 | `/service-areas/chanhassen/floor-care/` | Town × Service |
| 39 | `/resources/commercial-cleaning-cost/` | Resource |
| 40 | `/resources/how-to-switch-cleaning-companies/` | Resource |
| 41 | `/resources/scope-of-work-template/` | Resource |
| 42 | `/resources/insurance-and-bonding/` | Resource |
| 43 | `/resources/cleaning-frequency-guide/` | Resource |

---

## Hard Rules Verification

- [x] **Zero outbound links to portfolio domains** — PASS (grep confirmed no cross-domain links)
- [x] **No street address in copy, footer, or schema** — PASS (grep confirmed no street addresses)
- [x] **(866) 958-8773 present on every page** — PASS (all 43 pages confirmed)
- [x] **ops@thequotemasters.com present on every page** — PASS (all 43 pages confirmed)
- [x] **No testimonials, star ratings, or Review/AggregateRating schema anywhere** — PASS
- [x] **"22 years" in header strapline, footer, and homepage opening** — PASS (all 43 pages confirmed)
- [x] **No `{{` tokens anywhere** — PASS
- [x] **No invented credentials, reviews, prices, policy numbers, or staff details** — PASS; insurance and pricing use honest prose only
- [x] **Pricing page uses "contact for quote" language — no fabricated ranges** — PASS; pricing page provides a framework and requests quotes
- [x] **`/insured-and-bonded/` uses plain prose — no invented policy numbers** — PASS
- [x] **`sitemap.xml` and `robots.txt` present** — PASS

---

## Town Radius Verification (all within 25 miles of Savage, MN)

| Town | Approx Distance | Status |
|---|---|---|
| Prior Lake | ~9 miles | PASS |
| Burnsville | ~12 miles | PASS |
| Shakopee | ~7 miles | PASS |
| Bloomington | ~16 miles | PASS |
| Eagan | ~15 miles | PASS |
| Lakeville | ~14 miles | PASS |
| Apple Valley | ~13 miles | PASS |
| Chanhassen | ~11 miles | PASS |

All 8 towns verified within 25-mile radius.

---

## Town-Specific Facts (≥3 per town page)

| Town | Fact 1 | Fact 2 | Fact 3 |
|---|---|---|---|
| Prior Lake | County Road 21 commercial strip | Fountain Hills Drive commercial development | Mystic Lake and US-169 entertainment corridor seasonal patterns |
| Burnsville | Burnsville Center retail corridor | I-35W and County Road 42 interchange offices/medical | 494 Corridor office park |
| Shakopee | Valley Green Business Park (US-169) | ADC Telecom/manufacturing along County Road 83 | Canterbury Park entertainment district (seasonal cleaning schedule) |
| Bloomington | Penn American Business Center (I-494) | Medical Arts Building cluster (98th St) | Mall of America — highest-density foot traffic corridor in region |
| Eagan | Northwest Airlines/Delta Technical Operations Center | United Healthcare campus (Pilot Knob Rd) | Eagan Business Park near I-494 (key-card controlled access) |
| Lakeville | Dodd Boulevard commercial corridor | Airlake Industrial Park (distribution/light manufacturing) | I-35 interchange hotel/retail/office development |
| Apple Valley | Cobblestone Lake commercial district | Galaxie Avenue professional office corridor | Cedar Avenue transitway commercial development |
| Chanhassen | Powers Boulevard commercial district | Chanhassen Business Center near Highway 5 (engineering/tech/distribution) | Minnesota Landscape Arboretum — drives event space cleaning demand |

---

## Meta Descriptions
- All meta descriptions checked at build time
- Pages in the 150–158 char target range or close; short town×service pages inherently constrained by city name length
- All unique per page (no repeated text)

---

## Theme
- [x] **Theme A — Direct & Operational** used throughout all 43 pages
- Colors: Primary #0d2b45, Accent #e85c2a, Background #f8f8f6
- Header: Full-width charcoal bar. CTAs: burnt-orange rectangles, no border-radius. Tables on pricing and process pages.
- Tone: Clipped, factual, no adjective without information value. Written for operations managers and property managers.

## Theme Rotation Log (updated)
| Domain | Theme Used |
|---|---|
| churchcleaningscandia.com | B — Warm & Local |
| commercialcleaningservicessavage.com | A — Direct & Operational |
| *(next build)* | C or D |

---

## Tier Note
**Tier 2 — No map pack.** AI Overview is present on the "commercial cleaning services savage" query (confirmed in workbook). Organic click-through will be compressed versus a plain blue-links SERP. At 33,000 population, Savage is a viable Tier 2 build — not a micro-market. The McColl Drive corridor and Highway 13 commercial zone are genuine commercial demand generators. The AI Overview compression is noted; it does not make the build inadvisable.

---

## Items Deferred (no data supplied by client)
- Insurance coverage amounts and policy details — handled with honest prose ("general liability insurance appropriate for commercial cleaning operations")
- Price bands — pricing page provides framework only; no fabricated ranges
- Bond amounts — referenced generically
- Certifications/awards — none mentioned (none invented)
