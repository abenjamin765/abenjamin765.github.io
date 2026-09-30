---
id: evidence-green-loom-status
type: evidence
status: observed
date: 2026-09-28
owner: scout
source_type: design
source: src/green-loom.pug; requirements.md
confidence: high
related_objects:
  - object-catalog-product
  - object-variant
  - object-listing
  - object-lab-result
  - object-inventory
related_evidence: []
related_decisions:
  - decision-separate-lab-result
  - decision-schema-separate-from-retail
---

# Green Loom design status and open evidence debt

## Observation or source claim

The work produced a selected information architecture, an approved wireframe baseline, and a published Cannabis Product Schema. Later high-fidelity work is still a design candidate. An operator pilot is active. The page was written in September 2026 and does not record when the pilot started. Direct operator evidence, accessibility review, and other specialist checks are still needed before claiming the experience works in practice. Publishing the schema is a concrete output; it is not evidence of industry adoption or legal approval. Peach Orchard Chew and The Corner Store are sample data.

## Context and population

Green Loom retail catalog design for Georgia consumable hemp launch scope; co-founder design work; public schema at github.com/greenloom/cannabis-product-schema.

## Limitations and contradictions

Design direction approval is not usability findings. Georgia hemp rules change; the case cites guidance as design context, not legal certification. Schema Package ≠ retail Variant.

## Analyst inference

Object split (Product, Variant, Listing, Inventory, Lab Result) is the approved design model to carry forward until operator evidence revises it.

## Product implication

Do not claim pilot success, adoption, or legal approval. Keep Lab Result off the product record in further design work.
