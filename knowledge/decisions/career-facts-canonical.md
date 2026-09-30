---
id: decision-career-facts-canonical
type: decision
status: accepted
date: 2026-09-28
owner: liza
related_evidence:
  - evidence-resume-claim-rule
  - evidence-career-experience-index
related_objects:
  - object-role
  - object-claim
related_decisions:
  - decision-knowledge-seed-scope
reversibility: low
---

# Career facts live in the canonical record; profiles only select

## Context

Multiple résumé archives and the live site disagree on headlines, summaries, locations, and bullets. The résumé system separates a canonical career record (facts) from profiles (selection and presentation).

## Options considered

- Treat each published HTML résumé as its own source of truth.
- Hold facts once under `resume/canonical/` with variants; let profiles choose ids and variant ids only.

## Decision and rationale

Canonical YAML holds roles, claims, identity variants, and skills. Profiles reference by id, must not invent employers or metrics, and default public export excludes unverified claims. Title and identity conflicts stay as variants.

## Consequences

- Shared knowledge models Role and Claim from conventions, not from a single archive page.
- Contact fields stay in identity data; they are not copied into `knowledge/`.
- Metric-like résumé phrases remain claim wording until sourced and optionally defined as metrics elsewhere.

## Revisit trigger

Schema change to the career record, or a verified reconciliation that collapses a specific variant set with sourced proof.
