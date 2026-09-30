---
id: evidence-price-adjustments
type: evidence
status: observed
date: '2026-09-30'
owner: scout
source_type: documentation
source: '~/Downloads/folio.pdf (image-only; Vision OCR of /tmp/folio-preview/p16–p31.png); reconciled to evidence-home-depot-staff-ux-designer and evidence-resume-claim-rule'
confidence: medium
related_objects:
  - object-role
  - object-claim
related_evidence:
  - evidence-home-depot-staff-ux-designer
  - evidence-resume-claim-rule
related_decisions:
  - decision-career-facts-canonical
---

# Home Depot Order Up price adjustments — slide evidence

## Observation or source claim

Source deck: `folio.pdf`, PDF pages **pp. 16–31** (1-based file index). Index slide p. 16 and pause p. 32 are out of narrative scope. Empty “UI Iterations” title (p. 21) is scaffolding.

| Claim | Label | Page |
| --- | --- | --- |
| Story title: Home Depot Store Systems, Order Management: Price Adjustments. Hook: offer store associates the flexibility they need to help customers in-store. Credit: Aaron Benjamin, UX Designer | observed | pp. 16–17 |
| Order Up is the associate-facing app for managing and fulfilling in-store pickup orders. Price adjustments arise for competitor match, damaged-item markdowns, and other unmet-expectation discounts | observed | p. 17 |
| Opportunities include associate ability to update pricing on request, ownership/autonomy to resolve issues, and a UI needing minimal training in a fast, high-distraction environment. Customer opportunity wording uses “frictionless” (slide voice) | observed | p. 18 |
| Observational study and interviews across **12 unique stores**: managers trust employees; each store had workarounds; workarounds increased transaction time; existing reason codes did not cover all adjustment types | observed | p. 19 |
| Stakeholder / store-ops requirements: adjustments over $50 still need manager approval; each store has a customer-satisfaction budget; order-level adjustments must split across SKUs; transaction time is an important business metric | observed | p. 20 |
| Multiple UI iterations for apply-markdown flows (item vs order, percentage vs dollar, reason codes) shown as mocks | observed | pp. 22–23, 25, 28–30 |
| Usability testing covered task completion, transaction time, and a short questionnaire for a SUS score. Learnings: keep order info visible during adjustment; associates multitask across apps; “Markdown” more familiar than “adjustment”; associates need to explain “the math.” **No SUS numeric score appears on the slide** | observed | p. 24 |
| Fly-out UI concept iterated because it had the highest task-completion, matched associate needs, and was perceived most usable (no numeric rates on slide) | observed | p. 25 |
| Re-tested updated prototype for item-level vs whole-order markdown paths | observed | p. 26 |
| Solution: components to apply, update, and remove price adjustments; order summary updated for adjustment calculations; manager-approval handoff when discount requires approval (“Switch to eSVS…”) | observed | pp. 27–29 |
| Impact: after testing in a **50-store pilot**, markdown feature rolled out to all Home Depot stores. Looking at trends **30, 60, and 90 days** from launch: order transaction times decreased; associates reported feeling more empowered; decrease in “shrink”; operations reported increase in SOP adoption for price adjustments. **No numeric magnitudes** | observed | p. 31 |
| Canonical role: Staff UX Designer at The Home Depot, **2018-10 → 2022-02** | observed | career record |
| Work sits inside the Home Depot employment window; exact project year not stated on slides | inferred | career record |
| Deck credit “UX Designer” vs canonical Staff UX Designer | observed (title mismatch) | p. 17 vs career record |
| Directional impact bullets are accurate primary-source results | assumed (false for verification); **not verified**; no numerators to invent | p. 31 |

## Context and population

Interview drafting for Order Up associate tooling. Discovery: associates across 12 stores (p. 19). Launch: 50-store pilot then chain-wide rollout; trend windows 30/60/90 days (p. 31). SUS mentioned without a score (p. 24).

## Limitations and contradictions

- Impact is **directional only**. Do not invent percentages or minutes for transaction time, shrink, empowerment, or SOP adoption.
- SUS score is named but missing — use `[Figure missing: SUS score, p. 24]` if referenced.
- Same career-title mismatch as curbside (deck UX Designer vs Staff UX Designer).
- Home Depot claims remain unverified; do not promote deck results into the résumé without a human gate.
- Mock UI shows store/associate labels (e.g. “Dave Smith | Store 6941 | Lithia Springs”) and product SKUs — confidentiality risk for Cipher.

## Analyst inference

Process strength is high (12-store discovery, requirements, iteration, usability, solution components). Outcome strength is weak for a standalone published case study unless the human accepts directional-only impact. Write third; keep impact language non-numeric.

## Product implication

Draft price adjustments last. Every impact sentence must stay directional or mark the figure missing. No Order Up screenshots on the public site by default.
