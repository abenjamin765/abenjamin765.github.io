---
id: glossary-terms
type: glossary
status: draft
date: 2026-09-28
owner: echo
related_objects:
  - object-role
  - object-claim
  - object-assignment
  - object-catalog-product
  - object-variant
  - object-listing
  - object-lab-result
  - object-inventory
related_evidence:
  - evidence-career-experience-index
  - evidence-resume-claim-rule
  - evidence-classroom-usability
  - evidence-green-loom-status
related_decisions:
  - decision-career-facts-canonical
  - decision-knowledge-seed-scope
  - decision-shared-assignment
  - decision-separate-lab-result
  - decision-schema-separate-from-retail
---

# Product glossary

Career terms first (primary folio knowledge), then case-study disambiguation. Rows exist where agents would otherwise mix meanings.

| Concept | Canonical domain term | UI label | Code identifier | Avoid | Notes |
| --- | --- | --- | --- | --- | --- |
| Employment entry in the career record | Role | Role / Experience | object-role / role-* ids | Job bullet | Primary knowledge unit for this site. |
| One assertion in the career record | Claim | Bullet (presentation only) | object-claim / claim-* ids | Metric (unless metric wording is sourced) | status: verified / unverified / rejected. |
| Current employer (from July 2024) | Renaissance Learning | Renaissance | role-renaissance-learning-senior-ux-designer | Inventing titles | Senior UX Designer; area Renaissance Intelligence. |
| Employer marketplace / monetization | Indeed | Indeed | role-indeed-senior-ux-designer | — | Senior UX Designer, 2022-10 → 2024-07. |
| Employer residential real estate | Redfin | Redfin | role-redfin-senior-product-designer | Collapsing title variants | Title variants include Senior Product Designer 2. |
| Employer home improvement retail | The Home Depot | The Home Depot / Home Depot | role-home-depot-staff-ux-designer | — | Staff UX Designer. |
| Employer fundraising products | Snap! Mobile | Snap! Mobile | role-snap-mobile-senior-product-designer | — | Senior Product Designer. |
| Employer marketplace / compliance tools | Amazon | Amazon | role-amazon-ux-designer | Inventing a second Amazon role not in YAML | Canonical row is 2016-08 → 2017-12 unless the record changes. |
| Employer marketing cloud / design system | HP Inc. | HP | role-hp-ux-lead | Collapsing Head of UX vs UX Lead | Title variants retained. |
| Employer telecom / early career UX | AT&T | AT&T | role-att-senior-ux-designer | — | Senior UX Designer, 2011-07 → 2015-08. |
| Early graphic design contract | Pyramid Consulting Inc. | Pyramid Consulting | role-pyramid-consulting-graphic-designer | Inventing months | Year-only 2010 → 2011; archive-only claims. |
| Public résumé headline options | Headline variants | UX Designer; Senior UX / Product Designer; UX & Product Designer; product designer (meta copy) | identity.headline_variants | Picking one “true” title in canonical data | Profiles select; conventions keep all approved wordings. |
| Folio project narrative page | Case | Case study | — | Claim | Supporting story; not a résumé claim object. |
| Shared practice/assessment work in the Renaissance Intelligence hub | Assignment | Assignment | object-assignment | Task, homework (as system object) | Supporting Classroom case model. |
| Company suite app that stores its own assignments | Renaissance product | Product (in suite context) | — | Catalog Product | Not the Green Loom catalog product. |
| Sellable hemp item identity and content | Catalog Product | Product | object-catalog-product | Merging with Listing or Lab Result | Supporting Green Loom case; sample Peach Orchard Chew. |
| Sellable package of a catalog product | Variant | Package (when speaking to operators about the package) | object-variant | Using schema “Package” as the retail edit object | Retail edit object is Variant; schema Package is exchange. |
| Store offer of a variant | Listing | Listing | object-listing | Product | Sample: The Corner Store. |
| Lab certificate of analysis | Lab Result | Certificate / COA | object-lab-result | Product field | Own validity period. |
| Quantity and availability at a store | Inventory | Stock / Inventory | object-inventory | Product attribute | Separate record. |
| Schema document for transferred package data | Package (schema) | Package (schema core) | Cannabis Product Schema Package | Variant (when meaning exchange document) | Not the retail Variant editor. |
