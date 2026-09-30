---
id: evidence-resume-claim-rule
type: evidence
status: observed
date: 2026-09-28
owner: scout
source_type: documentation
source: resume/schema/conventions.md; resume/sources/notes/reconciliation.md
confidence: high
related_objects:
  - object-role
  - object-claim
related_evidence:
  - evidence-career-experience-index
related_decisions:
  - decision-career-facts-canonical
  - decision-knowledge-seed-scope
---

# Resume claims stay worded and unverified without sources

## Observation or source claim

Canonical conventions state: a claim’s metric appears only when a source states a measure; numeric value is never required; wording alone (for example “over 30 A/B tests”) is valid; do not synthesize numbers; do not mark anything verified without a real source; default new claims to unverified. Scout’s reconciliation memo records claim statuses as unverified pending owner resolution.

## Context and population

Career record maintainers and profile exporters; public profiles default `allow_unverified: false`.

## Limitations and contradictions

Archive résumés and live site copy disagree on headlines, locations, and bullets; conventions keep variants rather than picking a silent winner.

## Analyst inference

Shared knowledge may define Role and Claim objects and cite the rule; it must not invent verified metrics from résumé prose.

## Product implication

“Over 30 A/B tests” and similar phrases stay claim wording inside the career record, not metric definitions under `knowledge/metrics/`.
