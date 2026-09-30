---
id: evidence-classroom-usability
type: evidence
status: observed
date: 2026-09-28
owner: scout
source_type: research
source: src/classroom-assignment-management.pug; requirements.md
confidence: medium
related_objects:
  - object-assignment
related_evidence:
  - evidence-classroom-completion-illustration
  - evidence-classroom-outcome
  - evidence-renaissance-learning-senior-ux-designer
related_decisions:
  - decision-priority-groups
---

# Classroom usability sessions

## Observation or source claim

UX research partners ran moderated sessions with five current Renaissance users and five teachers new to the product suite. Participants reviewed the existing page and two prototypes. The published page states: all ten teachers in the study, five current users and five new to the suite, said the grouping matched how they expected to review assignments. A study participant, after comparing the grouped design with Version 1, said: “OMG, this is amazing.” That quote is the only observed quote on the site and is attributed on the page.

## Context and population

K–12 teachers; ten participants total in the study sentences above; sessions compared Version 1 with prototypes toward the priority-grouped view.

## Limitations and contradictions

`requirements.md` requires not upgrading the grouping sentence to “validated” or a similar verb until Aaron confirms what was measured. The quote is one participant after comparison, not a quantified success metric.

## Analyst inference

Teachers’ urgency ranking by due date and preference for an opinionated group list are supported as published page claims, not as independently re-verified field notes in this repo.

## Product implication

Priority groups (new, overdue, due soon, in progress, done) with expand/collapse are the published design response; do not reinvent a filter-first table as the default without new evidence.
