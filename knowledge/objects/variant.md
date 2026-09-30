---
id: object-variant
type: object
name: Variant
status: draft
date: 2026-09-28
owner: luke
source_project: null
derived_from: null
evidence:
  - evidence-green-loom-status
related_objects:
  - object-catalog-product
  - object-listing
  - object-inventory
related_evidence:
  - evidence-green-loom-status
related_decisions:
  - decision-schema-separate-from-retail
---

# Variant

## Definition

A sellable package of a catalog product. Operators distinguish variants as package forms of the same product identity, not as separate store offers or stock counts.

Sample data on the case page: a sellable package of Peach Orchard Chew.

Source: `src/green-loom.pug`. The exchange schema’s “Package” document is related language for transferred data; retail editing uses Variant.

## Attributes

| Attribute | Meaning | Required | Sensitive | Source |
| --- | --- | --- | --- | --- |
| Package identity | What makes this sellable unit distinct | Yes | No | Catalog model |
| Product link | Parent catalog product | Yes | No | Catalog model |

## Relationships

| Related object | Relationship | Cardinality | Direction | Lifecycle consequence |
| --- | --- | --- | --- | --- |
| Catalog Product | Package of | Many variants → 1 product | Variant belongs to product | Product content can stay while packages exist |
| Listing | Offered as | 1 variant → many listings (per store) | Listing references variant | Price and publication are listing concerns |
| Inventory | Stocked as | Per store / listing context | Inventory records quantity | Quantity is not variant identity |

## Actions

| Action | Actor | Preconditions | State change | Failure behavior |
| --- | --- | --- | --- | --- |
| Create variant | Operator | Product exists | New package record | First-publish path sequences needed records |
| Offer at store | Operator | Variant exists | Creates or updates Listing | Publication may block on expired Lab Result |

## States and transitions

| State | Meaning | May enter from | May exit to | Visible to |
| --- | --- | --- | --- | --- |
| Defined | Package recorded under product | Create | Listed at store | Operators |

## Permissions and rules

- Variant identifies the package; Listing controls how it is offered at a store.
- Do not collapse Variant with schema Package when editing retail records; schema Package is for exchanged documents.

## Mental-model notes

The interface can show product, package, and store offer together without making them one record.

## Open questions

- Package attribute detail (size, SKU, and similar) is not listed on the published case page.
