---
id: object-listing
type: object
name: Listing
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
  - object-lab-result
  - object-inventory
related_evidence:
  - evidence-green-loom-status
related_decisions:
  - decision-separate-lab-result
---

# Listing

## Definition

How a variant is offered at a store: price and publication. Operators recognize a listing as the store-facing offer of a package, not as the product identity or the lab certificate.

Sample data on the case page: price and publication of Peach Orchard Chew at The Corner Store (sample shop, not a real store).

Source: `src/green-loom.pug`.

## Attributes

| Attribute | Meaning | Required | Sensitive | Source |
| --- | --- | --- | --- | --- |
| Store | Where the variant is offered (sample: The Corner Store) | Yes | No | Catalog model |
| Price | Offer price at that store | Yes | No | Catalog model |
| Publication status | Whether the listing may publish | Yes | No | Publication check against Lab Result validity |

## Relationships

| Related object | Relationship | Cardinality | Direction | Lifecycle consequence |
| --- | --- | --- | --- | --- |
| Variant | Offers | Many listings → 1 variant | Listing references variant | Stopping publication does not delete the variant |
| Catalog Product | Indirect via variant | — | — | Product identity unchanged when listing stops |
| Lab Result | Publication depends on | Listing blocked when linked certificate expired | Check at publish | Names expired certificate as reason |
| Inventory | Stock at store | Listing / store context | — | Availability shown with offer |

## Actions

| Action | Actor | Preconditions | State change | Failure behavior |
| --- | --- | --- | --- | --- |
| Publish | Operator | Valid linked Lab Result (within validity) | Listing publishable | Publication check blocks and names expired certificate |
| Stop / unpublish | System or operator | Certificate expired or operator action | Listing not publishable | Product and packages unchanged |
| Republish after new certificate | Operator | New Lab Result linked | Listing can publish again | Without new link, remains blocked |

## States and transitions

| State | Meaning | May enter from | May exit to | Visible to |
| --- | --- | --- | --- | --- |
| Publishable | Certificate valid and linked | Draft / stopped after new Lab Result | Published / stopped | Operators |
| Stopped | Publication blocked (for example expired certificate) | Publishable | Publishable after new Lab Result | Operators |
| Draft | Not yet published (mobile exploration groups Published and Draft) | Create | Publishable | Operators |

## Permissions and rules

- Proposed publication check stops the store listing when the certificate expires and names the reason.
- Product keeps name, description, and packages through every step of certificate expiry.

## Mental-model notes

Listing is the store offer. Collapsing listing into the product made potency and stock look like editable product fields.

## Open questions

- Exact draft vs published state machine beyond the case narrative and mobile exploration caption is not fully specified.
