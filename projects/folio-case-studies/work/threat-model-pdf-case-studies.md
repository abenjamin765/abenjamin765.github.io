---
id: threat-model-pdf-case-studies
type: threat-model
status: draft
date: '2026-09-30'
owner: cipher
related_objects:
  - object-role
  - object-claim
related_evidence:
  - evidence-a-to-z-first-claim
  - evidence-curbside-pickup
  - evidence-price-adjustments
  - evidence-amazon-ux-designer
  - evidence-home-depot-staff-ux-designer
  - evidence-resume-claim-rule
related_decisions:
  - decision-career-facts-canonical
---

# Threat model / clearance: pdf-case-studies

## Scope

Clearance for turning `folio.pdf` stories into interview drafts in `CASE-STUDY-INTERVIEW.md`, and for storing project evidence/metrics under `projects/folio-case-studies/`. Out of scope for this note: building public Pug pages (blocked on human gate 1). Default publication posture for visuals: **prose + bracket image placeholders only — no PDF crops, exports, or embedded deck screenshots on the site or in drafts.**

## Assets and data inventory

| Asset | Where it appears | Sensitivity |
| --- | --- | --- |
| Amazon Seller Central / Marketplace UI mocks (claims dashboard, email) | Deck pp. 10, 13–14 | Employer internal product UI; customer and seller display names; order IDs; claim amounts |
| First-claim email mock names (“Jerry Smith”, “Karry Markman”) and product/order sample data | p. 10 | Likely fictional mock data, still employer-branded communication design |
| Home Depot Order Up UI (cart, markdown modals, order summary, associate/store labels) | pp. 22–30 | Internal associate tooling; store number/location; associate name labels; SKUs and prices |
| Curbside ready-for-pickup email and check-in SMS/push copy | pp. 40, 42 | Customer communications; store name (Cedartown); operational timing |
| Store-operations and survey analysis figures (including redacted `**%`) | p. 37; pilot results p. 44 | Operational performance data; employer confidential unless cleared |
| A-to-z 60-day U.S. results and price-adjustment directional trends | pp. 12, 31 | Business impact claims; unverified; résumé-claim risk |
| Project evidence/metric markdown under `projects/folio-case-studies/` | This repo | Slide transcriptions and metric inventory; **commit = publish** on GitHub Pages source |

## Trust boundaries

1. **Private drafting vs public repo.** Workspace files that are never committed stay local. Anything committed or pushed to `origin` (`abenjamin765/abenjamin765.github.io`) is public, including `projects/` even without a Pug route.
2. **Interview worksheet vs live site.** `CASE-STUDY-INTERVIEW.md` in the repo is also public if committed. Treat worksheet metrics and employer process detail with the same caution as a page.
3. **Employer systems vs portfolio.** Seller Central, Order Up, and curbside channels are employer-controlled. Portfolio reproduction of UI is a separate trust domain requiring human clearance (gate 2).
4. **Career record boundary.** Deck metrics must not cross into `resume/canonical/` without gate 4; résumé claims stay unverified (`evidence-resume-claim-rule`).

## Abuse paths

- Indexing or scraping of committed slide transcriptions and operational numbers from GitHub.
- Recreating identifiable UI from detailed placeholders or from committed OCR-derived descriptions that are too literal.
- Third parties treating unverified deck metrics as confirmed Amazon / Home Depot results.
- Accidental inclusion of PDF page PNGs under `src/assets` or `dist/` in a later publish run.

## Privacy risks

- Seller and buyer **display names** and order identifiers on A-to-z mocks.
- Associate name and **store number / location** on Order Up mocks.
- Customer-facing store and timing details on curbside communications.
- Store-operations failure rates and wait-time distributions (even when redacted, the topic is sensitive).

## Controls

| Control | Status |
| --- | --- |
| No PDF crops or deck image files in drafts or site assets this run | Required; default |
| Bracket placeholders only for the five-image rhythm | Required |
| Omit redacted `**%`; use `[Figure missing: …, p. N]` | Required |
| Do not edit `src/`, `dist/`, or `resume/` this run | Required (fingerprint check) |
| Do not mark deck metrics verified | Required |
| Human gates 1–4 before public pages, screenshot use, filling %, or résumé promotion | Required |
| Commit/push of `projects/folio-case-studies/` requires separate human authorization under `AGENTS.md` | Required |

## Prioritized mitigations

1. **Immediate:** Drafts use prose and placeholders only. No screenshots, no `**%`, no invented numerators.
2. **Repo safety (Cipher ruling):** Committing project evidence and metric files to this **public** GitHub Pages repository is **not safe by default**. Slide-level transcriptions and operational figures become world-readable. Prefer keeping Scout/Ledger artifacts in a gitignored `private/` path (or another private store) until the human explicitly authorizes committing them. If the human later authorizes a commit, minimize detail (summaries over OCR dumps) and strip mock PII from quotes.
3. **Before any public page:** Human answers gate 1 (which stories) and gate 2 (redraw vs crop vs never). Redrawn anonymized diagrams are safer than crops; still need employer judgment.
4. **Before résumé use:** Gate 4; keep unverified; do not invent source strength.

## Assumptions

- Mock names on p. 10 and Order Up associate labels are synthetic, but that does not clear employer UI or operational metrics.
- Interview use of the worksheet in a live conversation is a lower distribution risk than GitHub publication, but the file in-repo is still public once pushed.
- `projects/README.md` mentions `private/` as gitignored; `.gitignore` may not yet list it — Harbor/Finn should add ignore rules before relying on that path.
- Residual risk remains until human gates close.
