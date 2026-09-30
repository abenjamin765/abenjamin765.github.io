---
id: decision-shared-assignment
type: decision
status: accepted
date: 2026-09-28
owner: liza
related_evidence:
  - evidence-classroom-usability
  - evidence-classroom-completion-illustration
  - evidence-classroom-outcome
related_objects:
  - object-assignment
related_decisions:
  - decision-priority-groups
reversibility: medium
---

# One shared assignment object beside product-specific attributes

## Context

Each practice and assessment product stored assignments its own way. The hub needed one recognizable assignment for teachers while preserving product context. Aggregate completion counts could not name which students still needed help until student IDs entered the payload.

## Options considered

- Map only product-specific shapes into the hub UI.
- Define one shared assignment object (title, type, assigned date, due date) with product-specific detail alongside.
- Wait for a fuller student-performance summary before shipping student-level attention.

## Decision and rationale

Facilitate an object-modeling workshop and define one shared assignment object. Show shared fields first; keep product context in labels and icons. Defer the fuller student-performance summary so the core fix (which assignments and students need attention) could ship.

## Consequences

- Interface and API alignment around shared fields plus student IDs and completion time.
- Product-specific fields such as questions answered or pages read remain alongside, not forced into every card.
- Student is not promoted here as a shared knowledge object; sensitivity and scope stay on the case page rules.

## Revisit trigger

Cross-product attributes diverge enough that the shared set no longer matches teacher recognition, or a sourced student object is approved for the shared library.
