---
id: object-lab-result
type: object
name: Lab Result
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
related_evidence:
  - evidence-green-loom-status
related_decisions:
  - decision-separate-lab-result
  - decision-schema-separate-from-retail
---

# Lab Result

## Definition

The lab certificate of analysis (COA) for a catalog product, with its own validity period. Operators treat it as evidence, not as a field on the product identity.

Georgia design context for Green Loom’s retail launch: a full-panel COA contracted within the last 12 months and made publicly available; product labels must show analysis results or give direct QR access. Hemp rules change; the case is not a claim of legal certification.

Source: `src/green-loom.pug`. Schema document type LabResult is the exchange form of this idea.

## Attributes

| Attribute | Meaning | Required | Sensitive | Source |
| --- | --- | --- | --- | --- |
| Validity period | Window during which the certificate counts as current | Yes | No | Separate Lab Result record; Georgia 12-month design context |
| Analysis results | Lab findings shown on labels or via QR | Yes | No | Georgia retail guidance (design context) |
| Link to product | Which catalog product this evidence covers | Yes | No | Catalog model |

## Relationships

| Related object | Relationship | Cardinality | Direction | Lifecycle consequence |
| --- | --- | --- | --- | --- |
| Catalog Product | Evidence for | Many lab results over time → 1 product | Linked to product | Expiry does not rewrite product |
| Listing | Gates publication | Valid link required to publish | Check | Expired result stops listing |

## Actions

| Action | Actor | Preconditions | State change | Failure behavior |
| --- | --- | --- | --- | --- |
| Link to product | Operator | Lab Result exists | Product certificate-linked; listing may publish | Invalid or missing evidence blocks publish |
| Expire | Time | Past validity period | Listing publication check fails | Product unchanged; reason named |
| Replace with new certificate | Operator | New Lab Result available | New link; listing may publish again | Old expiry still explains prior stop |

## States and transitions

| State | Meaning | May enter from | May exit to | Visible to |
| --- | --- | --- | --- | --- |
| Linked and valid | Within validity; listing can publish | Create / link | Expired | Operators |
| Expired | Past validity period | Linked and valid | Superseded by new link | Operators |
| Superseded | Newer Lab Result linked | Expired | — | Operators |

## Permissions and rules

- Keep the certificate out of the product record.
- Potency must not look editable on the product; the lab result is the source.
- Publishing the Cannabis Product Schema is not evidence of industry adoption or legal approval.

## Mental-model notes

The rule puts a date on the evidence, not on the product. Nothing about a product has to change for its certificate to go out of date.

## Open questions

- Exact lab-panel attribute list beyond “full-panel COA” is not enumerated on the case page.
- Operator evidence that this separation works in practice is still ahead.
