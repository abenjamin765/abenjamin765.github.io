---
id: object-catalog-product
type: object
name: Catalog Product
status: draft
date: 2026-09-28
owner: luke
source_project: null
derived_from: null
evidence:
  - evidence-green-loom-status
related_objects:
  - object-variant
  - object-listing
  - object-lab-result
  - object-inventory
related_evidence:
  - evidence-green-loom-status
related_decisions:
  - decision-separate-lab-result
  - decision-schema-separate-from-retail
---

# Catalog Product

## Definition

Shared identity and content for a sellable hemp item in Green Loom’s retail catalog. Operators recognize one product by name, description, and packages. A lab certificate’s expiry does not rewrite the product record.

Sample data on the case page: Peach Orchard Chew (not a real product).

Source: `src/green-loom.pug`. Distinct from a Renaissance practice/assessment product.

## Attributes

| Attribute | Meaning | Required | Sensitive | Source |
| --- | --- | --- | --- | --- |
| Name | Product identity (sample: Peach Orchard Chew) | Yes | No | Catalog model |
| Description | Shared content | Yes | No | Catalog model |
| Packages | Sellable package forms belonging to the product | Yes | No | Catalog model; unchanged when certificate expires |
| Category / form | Retail classification (for example edible); Georgia launch excludes flower and leaves | Yes | No | Georgia consumable-hemp design context |

## Relationships

| Related object | Relationship | Cardinality | Direction | Lifecycle consequence |
| --- | --- | --- | --- | --- |
| Variant | Has sellable packages | 1 product → many variants | Product owns identity | Product stays when listing stops |
| Lab Result | Evidence linked to product | 1 product → many lab results over time | Link / unlink | Expiry does not change product fields |
| Listing | Offered via variants at stores | Indirect through variant | — | Publication can stop while product is unchanged |
| Inventory | Stocked via listings / stores | Indirect | — | Quantity is not a product field |

## Actions

| Action | Actor | Preconditions | State change | Failure behavior |
| --- | --- | --- | --- | --- |
| Create product | Operator | First-publish path or catalog workspace | New identity record | Unfamiliar terms need explanation on first use |
| Edit identity / content | Operator | Product exists | Name, description, packages update | Must not treat lab potency as editable product fields |
| Link lab result | Operator | Valid Lab Result | Listing may become publishable | Expired certificate blocks listing, not product edit |

## States and transitions

| State | Meaning | May enter from | May exit to | Visible to |
| --- | --- | --- | --- | --- |
| Exists with content | Identity and packages recorded | Create | Edited content | Operators |
| Certificate-linked | At least one Lab Result linked | Exists | New certificate linked after expiry | Operators |
| Unchanged through listing stop | Product fields survive publication block | Certificate expiry | Remains product | Operators |

Product does not carry a single “published” state; publication lives on Listing.

## Permissions and rules

- Lab evidence is not embedded in the product record.
- Georgia launch scope: consumable hemp; flower and leaves prohibited for retail sale (design context from state guidance; rules change).
- Schema exchange type “Product” is related but not the same as this retail catalog object; retail still needs Product, Variant, Listing, Inventory, and Lab Result records for editing.

## Mental-model notes

Early concepts put product details, listings, stock, and lab results on the same screens so they looked like one editable product. Operators need to edit identity separately from evidence and store offers.

## Open questions

- Full attribute set beyond name, description, and packages is not enumerated on the published page.
- Operator pilot evidence of this mental model in practice is still ahead.
