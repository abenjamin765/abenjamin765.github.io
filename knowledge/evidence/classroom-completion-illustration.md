---
id: evidence-classroom-completion-illustration
type: evidence
status: observed
date: 2026-09-28
owner: scout
source_type: design
source: src/classroom-assignment-management.pug; requirements.md
confidence: high
related_objects:
  - object-assignment
related_evidence:
  - evidence-classroom-usability
related_decisions:
  - decision-shared-assignment
---

# Classroom completion example is an illustration

## Observation or source claim

The Classroom case states: a teacher sees that eight of ten students finished an assignment and still can’t see which two didn’t. The same paragraph labels this as an illustration, not one observed session. The demo’s student names and results are also labeled illustrative.

## Context and population

Narrative device on the published case and interactive reconstruction; not a measured classroom session.

## Limitations and contradictions

Must keep the illustration label if the sentence stays (`requirements.md`). Do not treat 8/10 as an observed metric.

## Analyst inference

The example explains why aggregate counts fail teachers; it does not measure completion rates.

## Product implication

Student-level identity in the assignment payload is the dependency for showing who has not finished; layout alone cannot invent names.
