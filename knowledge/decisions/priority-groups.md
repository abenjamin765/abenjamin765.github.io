---
id: decision-priority-groups
type: decision
status: accepted
date: 2026-09-28
owner: liza
related_evidence:
  - evidence-classroom-usability
  - evidence-classroom-outcome
related_objects:
  - object-assignment
related_decisions:
  - decision-shared-assignment
reversibility: high
---

# Replace the filterable table with priority groups

## Context

Version 1 of the Renaissance Intelligence Assignments page aggregated work from several products into a table. The team assumed better data plus sort and filter would be enough. Teachers still had to build their own priority list before acting, and urgency followed due date while the table led with assigned date.

## Options considered

- Keep improving the table (sort, filter, richer columns).
- Replace the default with priority groups: new first, then overdue, due soon, in progress, and done, with expand/collapse.

## Decision and rationale

Ship the priority-grouped view as Version 2. Published study copy states all ten teachers said the grouping matched how they expected to review assignments. Flexibility remains via expand/collapse rather than as the first job.

## Consequences

- Teachers scan by urgency without leaving the page once student names exist.
- Done can stay collapsed so finished work does not push active work down.
- Outcome language stays behavioral (fewer trips to product reports); no percentage.

## Revisit trigger

New research shows teachers need a different default ranking, or product behavior shows the groups harm findability for a clear segment.
