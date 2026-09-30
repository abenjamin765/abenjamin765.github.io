---
id: object-inventory
type: object
name: Inventory
status: draft
date: 2026-09-28
owner: luke
source_project: null
derived_from: null
evidence:
  - evidence-green-loom-status
related_objects:
  - object-catalog-product
  - object-variant
  - object-listing
related_evidence:
  - evidence-green-loom-status
related_decisions:
  - decision-schema-separate-from-retail
---

# Inventory

## Definition

Quantity and availability of a sellable package at a store. Operators recognize inventory as stock, separate from product identity, package definition, store offer, and lab evidence.

Sample data on the case page: stock at The Corner Store.

Source: `src/green-loom.pug`.

## Attributes

| Attribute | Meaning | Required | Sensitive | Source |
| --- | --- | --- | --- | --- |
| Quantity | How much is on hand | Yes | No | Catalog model |
| Availability / stock state | Whether stock is usable or shown as a stock state on rows | Yes | No | Catalog model; mobile catalog exploration |

## Relationships

| Related object | Relationship | Cardinality | Direction | Lifecycle consequence |
| --- | --- | --- | --- | --- |
| Listing / store | Stock at | Inventory per store context | Belongs with store offer | Stock changes do not rewrite product identity |
| Variant | Quantity of package | Inventory tracks a package at a store | — | Package identity stays on Variant |
| Catalog Product | Indirect | — | — | Product content unchanged when stock changes |

## Actions

| Action | Actor | Preconditions | State change | Failure behavior |
| --- | --- | --- | --- | --- |
| Update quantity | Returning operator | Inventory workspace | Quantity / availability change | Must not require reopening first-publish wizard for every change |
| View stock on catalog row | Operator | Catalog loaded | None | Stock states visible with product rows on mobile exploration |

## States and transitions

| State | Meaning | May enter from | May exit to | Visible to |
| --- | --- | --- | --- | --- |
| In stock / available | Quantity usable | Create / restock | Low or out | Operators |
| Out / unavailable | No usable quantity | In stock | In stock after restock | Operators |

Exact stock-state labels beyond “stock states” on the case page are not fully named.

## Permissions and rules

- Inventory stays a separate record from Product, Variant, Listing, and Lab Result.
- Returning operators work in catalog and inventory views; first-publish path creates needed records in order.

## Mental-model notes

Early concepts put stock on the same screens as product and lab results, which made quantity look like a product field.

## Open questions

- Named stock-state vocabulary and low-stock thresholds are not published on the case page.
