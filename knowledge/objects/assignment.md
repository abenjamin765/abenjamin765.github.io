---
id: object-assignment
type: object
name: Assignment
status: draft
date: 2026-09-28
owner: luke
source_project: null
derived_from: null
evidence:
  - evidence-classroom-usability
  - evidence-classroom-completion-illustration
  - evidence-classroom-outcome
related_objects: []
related_evidence:
  - evidence-classroom-usability
  - evidence-classroom-completion-illustration
  - evidence-classroom-outcome
related_decisions:
  - decision-priority-groups
  - decision-shared-assignment
---

# Assignment

## Definition

A unit of practice or formative assessment work that a K–12 teacher assigns across Renaissance products and reviews in the Renaissance Intelligence Assignments hub. Teachers recognize one assignment by its title, type, and due date. Aggregate completion counts alone do not identify which students still need attention.

Source: `src/classroom-assignment-management.pug`.

## Attributes

| Attribute | Meaning | Required | Sensitive | Source |
| --- | --- | --- | --- | --- |
| Title | Name of the assigned work | Yes | No | Shared assignment object workshop |
| Type | Kind of work (for example skill practice, reading activity, math challenge) | Yes | No | Shared assignment object workshop |
| Assigned date | When the work was assigned | Yes | No | Shared assignment object workshop |
| Due date | When the work is due; teachers ranked urgency by due date | Yes | No | Shared assignment object workshop; research sessions |
| Completion count | Aggregate finished / total (for example 11/16) | No | No | Version 1 API; insufficient alone |
| Student IDs | Identifiers that let the page resolve student names | No (required for student-level view) | Yes | Added to API with engineering |
| Completion time | When a student finished | No | Yes | Added with student IDs |
| Product-specific detail | Fields such as questions answered or pages read | No | Depends | Sits alongside shared fields |

## Relationships

| Related object | Relationship | Cardinality | Direction | Lifecycle consequence |
| --- | --- | --- | --- | --- |
| Renaissance practice or assessment product | Originates from / aggregates into hub | Many products → many assignments | From product into hub | Product-specific attributes stay beside the shared object |

Student is not modeled as a shared object here. The case treats students as people the teacher must see through the assignment; requirements treat student content as sensitive.

## Actions

| Action | Actor | Preconditions | State change | Failure behavior |
| --- | --- | --- | --- | --- |
| Scan by priority group | Teacher | Assignments loaded with due dates | None | Empty or collapsed groups hide finished work by default |
| Expand or collapse group | Teacher | Group exists | UI open/closed only | Flexibility retained without returning to filter-first table |
| Open assignment detail | Teacher | Student IDs available | Shows students, not started first | Without IDs, only aggregate counts exist |
| Leave hub for product report | Teacher | Need student-level detail Version 1 lacked | Navigation out of hub | Outcome goal was fewer of these trips |

## States and transitions

Priority groups on the Version 2 page (UI organization, not a single lifecycle state machine):

| State | Meaning | May enter from | May exit to | Visible to |
| --- | --- | --- | --- | --- |
| New | Newly assigned work shown first | Assignment appears in hub | Overdue, due soon, in progress, done | Teachers |
| Overdue | Past due; high urgency | New or due soon after due date passes | In progress, done | Teachers |
| Due soon | Approaching due date | New | Overdue, in progress, done | Teachers |
| In progress | Active work not finished | New, due soon, overdue | Done | Teachers |
| Done | Finished; group often collapsed | In progress | — | Teachers |

## Permissions and rules

- Shared fields display first; product context stays in labels and icons.
- Student names require student IDs in the payload; aggregate counts alone cannot name who has not finished.
- A fuller student-performance summary was deferred so the hub could ship student-level attention first.

## Mental-model notes

Teachers ranked urgency by due date, while Version 1 led with assigned date and asked them to filter before acting. An opinionated priority list matched how they already reviewed work; expand/collapse preserved flexibility.

## Open questions

- Exact product-type inventory beyond examples named on the page (live lessons, reading activities) is not fully enumerated in the published case.
- Student as a first-class shared object is intentionally out of scope for this seed.
