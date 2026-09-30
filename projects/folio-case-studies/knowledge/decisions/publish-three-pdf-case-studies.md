---
id: decision-publish-three-pdf-case-studies
type: decision
status: accepted
date: '2026-09-30'
owner: liza
related_evidence:
  - evidence-a-to-z-first-claim
  - evidence-curbside-pickup
  - evidence-price-adjustments
  - evidence-resume-claim-rule
related_objects:
  - object-role
  - object-claim
related_decisions:
  - decision-career-facts-canonical
reversibility: hard
---

# Decision: publish three folio.pdf case studies as public pages

## Context

Interview drafts for Amazon A-to-z first claim, Home Depot curbside pickup, and Home Depot price adjustments lived in `CASE-STUDY-INTERVIEW.md` §§9–11 behind human gates (public pages, screenshots, curbside redacted percentages, résumé promotion). Cipher’s threat model defaulted to prose-only until those gates closed.

## Options considered

1. Keep all three interview-only.
2. Publish a subset (A-to-z and/or curbside only).
3. Publish all three public pages with cleared screenshot crops; omit redacted curbside percentages; leave résumé untouched.

## Decision and rationale

**Chosen: option 3.**

Human cleared:

1. **Public pages:** all three stories may become public routes.
2. **Screenshots:** crop product UI from `~/Downloads/folio.pdf` for the site (not whole slides). Prefer UI/product imagery over slide chrome, sidebar, and footer.
3. **Curbside redacted percentages:** explicitly **omit**. Never invent. Never show `**%`.
4. **Résumé / career record:** human later said to include the results. Three unverified impact claims are in `resume/canonical/experience.yml` and selected on `public-portfolio`: `claim-amazon-a-to-z-first-claim`, `claim-home-depot-curbside-pilot`, and `claim-home-depot-price-adjustments`. Status stays `unverified`. Redacted curbside percentages stay omitted. Price-adjustment impact stays directional, with no invented magnitudes.

Public HTML must keep interview-draft voice: metrics only where stated-with-window and already in the drafts; directional-only claims stay non-numeric; blocked metrics stay omitted; no confidential raw employer dumps beyond cleared UI crops (associate name / store number redacted out of Order Up crops).

## Consequences

- Finn/Iris/Sentry may ship Pug pages, homepage cards, cropped assets, requirements/test updates, and `dist/` build.
- Curbside public copy omits the two redacted analysis rates from p. 37.
- Public résumé exports include the three deck-result claims. They stay unverified. The career record does not invent the omitted curbside rates or numeric price-adjustment deltas.
- Committing `projects/folio-case-studies/` evidence to the public repo still needs separate authorization under `AGENTS.md` if not already granted for this publish slice.

## Revisit trigger

- Employer asks to remove or redraw UI crops.
- Human supplies the omitted curbside percentages with a source.
- A source stronger than the interview deck is available to mark the three impact claims `verified`.
