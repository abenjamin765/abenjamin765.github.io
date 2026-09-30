---
id: evidence-curbside-pickup
type: evidence
status: observed
date: '2026-09-30'
owner: scout
source_type: documentation
source: '~/Downloads/folio.pdf (image-only; Vision OCR of /tmp/folio-preview/p33–p44.png); reconciled to evidence-home-depot-staff-ux-designer and evidence-resume-claim-rule'
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

# Home Depot curbside pickup — slide evidence

## Observation or source claim

Source deck: `folio.pdf`, PDF pages **pp. 33–44** (1-based file index). Section index p. 33 and empty title slides (p. 39 Ready-for-Pickup Email, p. 41 Check-in Confirmation, p. 43 Impact title) are scaffolding, not narrative content.

| Claim | Label | Page |
| --- | --- | --- |
| Story title: Home Depot Communications, Curbside Pickup: Managing Expectations. Hook: set, manage, and deliver on expectations for customers picking up an order from the store. Credit: Aaron Benjamin, UX Designer | observed | p. 33–34 |
| Early 2020 COVID context: business, technology, and operations invented contactless and remote shopping; managing customer expectations was a major challenge; associates, signage, emails, and other channels guided customers | observed | p. 34 |
| Opportunities for customers: reduce ambiguity, reduce wait times, manage expectations on exceptions. For associates: reduce procedural deviations, help prioritize picking, empower communication, reduce average door-to-door times | observed | p. 35 |
| Field interviews with store managers, associates, and customers: orders vary in complexity; store layouts affect door-to-door time; fulfillment-channel changes disrupt operations; customers expect check-in confirmation; timing perspectives differ; system errors are invisible to customers | observed | p. 36 |
| Analysis from store operations and customer surveys. Stated figures: customers expect delivery in &lt;5 minutes; average door-to-door time was 3.5 minutes; 30% of pickup customers call to change pickup method. Two figures redacted on-slide as `**%`: share of customers reporting pickup took longer than expected; share of curbside check-ins that fail due to technical issues | observed | p. 37 |
| Alignment artifacts included a problem statement and a journey illustration. Journey cells include a placeholder string (“696969”) and incomplete pathing; treat as unfinished scaffolding, not a finished journey map | observed | p. 38 |
| Problem statement (paraphrase of slide): when customers lack feedback and direction during store pickup, they feel uncertain, deviate from the designed process, and get unexpected outcomes; how might we better set and manage expectations? | observed | p. 38 |
| Ready-for-pickup email design goals: when/where to pick up; prompt ETA; help instructions; Spanish translation; avoid mentioning unrelated fulfillment options. Mock shows Cedartown store, ETA chips (10/15/20/30 min, I’m here) | observed | p. 40 |
| Check-in confirmation design goals: success via push/SMS; error with call-store instructions; associate delay signal. Example states: “We’ll be out in 10 min…”, “Something went wrong…”, “Your order will be out soon!” | observed | p. 42 |
| Results after **60 day pilot in 50 stores** (wording on slide): ~90% of customers said order delivered when expected; average door-to-door 3.8 minutes with ETAs and 4.5 without; less than 10% of pilot customers called to switch fulfillment (vs 30%+ baseline); qualitative bullets on expectations and ETA helping associate prioritization | observed | p. 44 |
| Canonical role: Staff UX Designer at The Home Depot, **2018-10 → 2022-02**, Atlanta (`evidence-home-depot-staff-ux-designer`) | observed | career record |
| Early-2020 COVID curbside work falls inside the canonical Home Depot window | inferred | p. 34 + career record |
| Deck credit “UX Designer” matches a craft title on the slide, not the canonical Staff UX Designer title | observed (title mismatch) | p. 34 vs career record |
| Deck pilot metrics are accurate primary-source results | assumed (false for verification); **not verified** | p. 44 |

## Context and population

Interview drafting for Home Depot store-pickup communications during COVID. Pilot population on p. 44: customers and operations in a 50-store, 60-day pilot. Analysis baselines on p. 37 cite store-operations and survey data without method detail. Field work n is not stated.

## Limitations and contradictions

- Two analysis percentages remain redacted (`**%` on p. 37). Drafts must omit them or use `[Figure missing: …, p. 37]` — never reproduce `**%`.
- Journey on p. 38 is a placeholder, not a finished process artifact.
- Career title on the deck (“UX Designer”) does not match canonical **Staff UX Designer**. Record the mismatch; do not silently upgrade or downgrade.
- Home Depot résumé claims remain **unverified**. Do not mark deck metrics verified.
- OCR recovered redacted asterisks as `**%`; treat as intentional redaction in the source deck, not OCR failure.

## Analyst inference

Strongest publishable spine: COVID expectation problem → field + analysis (without redacted %) → ready-for-pickup email and check-in confirmation → 60-day / 50-store stated outcomes. Drop placeholder journey as a claimed deliverable. Baseline 30% fulfillment-switch rate (p. 37) links to the &lt;10% pilot outcome (p. 44).

## Product implication

Draft curbside second. Keep stated pilot metrics with window. Omit redacted analysis % until the human supplies or explicitly drops them. No PDF crops of email or SMS mocks.
