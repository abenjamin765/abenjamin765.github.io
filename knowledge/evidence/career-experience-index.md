---
id: evidence-career-experience-index
type: evidence
status: observed
date: 2026-09-28
owner: scout
source_type: documentation
source: resume/canonical/experience.yml; resume/canonical/skills.yml; resume/schema/conventions.md
confidence: high
related_objects:
  - object-role
  - object-claim
related_evidence:
  - evidence-resume-claim-rule
  - evidence-renaissance-learning-senior-ux-designer
  - evidence-indeed-senior-ux-designer
  - evidence-redfin-senior-product-designer
  - evidence-home-depot-staff-ux-designer
  - evidence-snap-mobile-senior-product-designer
  - evidence-amazon-ux-designer
  - evidence-hp-ux-lead
  - evidence-att-senior-ux-designer
  - evidence-pyramid-consulting-graphic-designer
related_decisions:
  - decision-career-facts-canonical
  - decision-knowledge-seed-scope
---

# Career experience index (primary folio knowledge)

## Observation or source claim

The canonical career record is the primary shared knowledge for this portfolio site. Case-study object models (Classroom Assignment, Green Loom catalog) are supporting domain detail for published cases; they are not the center of the site.

| Role id | Company | Title | Dates | Current-site claims |
| --- | --- | --- | --- | --- |
| `role-renaissance-learning-senior-ux-designer` | Renaissance Learning | Senior UX Designer | 2024-07 → present | 4 |
| `role-indeed-senior-ux-designer` | Indeed | Senior UX Designer | 2022-10 → 2024-07 | 9 |
| `role-redfin-senior-product-designer` | Redfin | Senior Product Designer | 2022-02 → 2022-09 | 8 |
| `role-home-depot-staff-ux-designer` | The Home Depot | Staff UX Designer | 2018-10 → 2022-02 | 4 |
| `role-snap-mobile-senior-product-designer` | Snap! Mobile | Senior Product Designer | 2018-01 → 2018-10 | 9 |
| `role-amazon-ux-designer` | Amazon | UX Designer | 2016-08 → 2017-12 | 5 |
| `role-hp-ux-lead` | HP Inc. | UX Lead | 2015-09 → 2016-08 | 6 |
| `role-att-senior-ux-designer` | AT&T | Senior UX Designer | 2011-07 → 2015-08 | 6 |
| `role-pyramid-consulting-graphic-designer` | Pyramid Consulting Inc. | Graphic Designer | 2010 → 2011 | 0 |

Focus areas from `resume/canonical/skills.yml`:
- `focus-accessibility-inclusive-design`: Accessibility & Inclusive Design
- `focus-ux-leadership-strategy`: UX Leadership & Strategy
- `focus-ai-enhanced-design`: AI-Enhanced Design

Capability, practice, and tool skills are listed in the same skills file; not duplicated here.

## Context and population

Aaron Benjamin portfolio and résumé system. Identity variants and education live under `resume/canonical/` and are not copied into knowledge contact fields.

## Limitations and contradictions

All employment claims are unverified pending sourced verification. LinkedIn (preferred work-history source) is not yet ingested. Green Loom co-founder work appears on the folio case page and is not a row in experience.yml.

## Analyst inference

Agents answering career, résumé, or “who is Aaron” questions should start here and with the per-role evidence files, then optionally load case evidence.

## Product implication

Keep case-study knowledge; elevate career experience as the default knowledge plane for this repo.
