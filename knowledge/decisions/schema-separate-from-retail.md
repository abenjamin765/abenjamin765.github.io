---
id: decision-schema-separate-from-retail
type: decision
status: accepted
date: 2026-09-28
owner: liza
related_evidence:
  - evidence-green-loom-status
related_objects:
  - object-catalog-product
  - object-variant
  - object-listing
  - object-lab-result
  - object-inventory
related_decisions:
  - decision-separate-lab-result
reversibility: medium
---

# Keep the exchange schema separate from retail catalog records

## Context

No existing standard gave Green Loom a complete product-data contract. The team published a versioned Cannabis Product Schema with a jurisdiction-neutral core (Product, Package, LabResult, Label, Party) and a Georgia hemp profile for local constraints. Retail operators still need to edit the right thing day to day.

## Options considered

- Use only the schema document types as the retail editor model.
- Publish the schema for exchange/validation while keeping retail Product, Variant, Listing, Inventory, and Lab Result records for operators.

## Decision and rationale

Keep the schema separate from the product model operators edit. Schema Package is not the same as retail Variant. Publishing the schema is a concrete output; it is not industry adoption or legal approval.

## Consequences

- Incoming and outgoing product data can be checked against the schema.
- Glossary and object guides must disambiguate Package (schema) vs Variant (retail).
- Georgia constraints stay in a profile applied to core data, not embedded in the core.

## Revisit trigger

A standards body or partner format replaces the need for the public schema, or retail editing is deliberately aligned one-to-one with schema document types after operator evidence.
