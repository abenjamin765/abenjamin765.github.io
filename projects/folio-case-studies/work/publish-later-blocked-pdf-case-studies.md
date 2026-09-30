---
id: publish-later-blocked-pdf-case-studies
type: slice-report
status: done
date: '2026-09-30'
owner: liza
related_objects: []
related_evidence:
  - evidence-a-to-z-first-claim
  - evidence-curbside-pickup
  - evidence-price-adjustments
related_decisions:
  - decision-career-facts-canonical
  - decision-publish-three-pdf-case-studies
---

# Publish slice: gates unlocked, pages shipped

Human gates from the run packet are closed except résumé promotion (explicitly left unresolved).

| Gate | Decision |
| --- | --- |
| 1. Public page permission | All three stories → public pages |
| 2. Screenshot clearance | Crop product UI from `folio.pdf` (not whole slides) |
| 3. Curbside percentages | Explicitly omit; never invent; never show `**%` |
| 4. Career record | Human “Not sure” → **do not** update `resume/canonical/`; unresolved for later |

Decision artifact: `projects/folio-case-studies/knowledge/decisions/publish-three-pdf-case-studies.md`.

## Acceptance criteria mapping

| Criterion | Status |
| --- | --- |
| Public Pug routes for A-to-z, curbside, price adjustments | Done |
| Homepage cards on `src/index.pug` | Done |
| Cropped product UI under `src/assets/img/folio/project--*/` | Done |
| `requirements.md` + `scripts/test-portfolio.js` updated | Done |
| `dist/` built; portfolio tests run | Done in publish slice |
| No `resume/canonical/` claim promotion | Confirmed untouched |
| Curbside public copy omits redacted `%` | Done |

## Files changed

- `projects/folio-case-studies/knowledge/decisions/publish-three-pdf-case-studies.md` (new)
- `src/a-to-z-first-claim.pug`, `src/curbside-pickup.pug`, `src/price-adjustments.pug` (new)
- `src/index.pug`, `src/many-hats.pug` (cards + next-case loop)
- `src/assets/img/folio/project--a-to-z-first-claim/`, `project--curbside-pickup/`, `project--price-adjustments/` (crops)
- `requirements.md`, `scripts/test-portfolio.js`, `CASE-STUDY-INTERVIEW.md` (omit decision + supporting images)
- `dist/` rebuilt for the three routes and assets
- `resume/` not edited

## Verification

- `npx gulp sass pug images` succeeded
- `node scripts/test-portfolio.js` passed (responsive, links, retail structure, classroom disclosure)
- `python3 scripts/validate_knowledge.py --project folio-case-studies` for this report
- Public routes: `/a-to-z-first-claim.html`, `/curbside-pickup.html`, `/price-adjustments.html`

## Residual risk / still blocked

- Deck metrics remain **unverified** in the career record; résumé promotion still needs a separate human yes.
- Committing project evidence transcriptions under `projects/folio-case-studies/` to the public GitHub Pages repo still warrants Cipher caution (separate from shipping Pug pages).
- Price adjustments impact stays directional-only on the public page (Allie thin-story dissent preserved in the challenge artifact).
- Order Up crops omit the associate/store header line; mock names remain in the A-to-z email crop as sample UI data.

## Deferred work

- Optional: redraw anonymized diagrams if an employer asks crops removed.
- Optional: résumé claim review if the human later answers gate 4 with yes.
