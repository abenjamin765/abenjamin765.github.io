---
id: decision-separate-lab-result
type: decision
status: accepted
date: 2026-09-28
owner: liza
related_evidence:
  - evidence-green-loom-status
related_objects:
  - object-catalog-product
  - object-listing
  - object-lab-result
related_decisions:
  - decision-schema-separate-from-retail
reversibility: medium
---

# Keep Lab Result off the product record

## Context

Georgia consumable-hemp design context requires a dated certificate of analysis. Early catalog concepts put product details, store listings, stock, and lab results on the same screens, so potency looked editable on the product even though the lab result should be its source. Nothing about a product must change when its certificate goes out of date.

## Options considered

- Embed certificate fields on the product.
- Give the certificate its own Lab Result record with a validity period; stop the store listing when it expires and name the reason.

## Decision and rationale

Keep lab evidence as Lab Result, separate from product identity. When a certificate expires, the publication check blocks the listing; the product keeps name, description, and packages. Linking a new certificate lets the listing publish again without re-entering the product.

## Consequences

- Product, Variant, Listing, Inventory, and Lab Result stay distinct edit targets.
- Sample flow (Peach Orchard Chew / The Corner Store) is design narrative, not shipped UI proof.
- Operator evidence of the workflow in practice is still ahead.

## Revisit trigger

Operator pilot or legal review shows a different evidence binding is required, or jurisdiction rules change the certificate model.
