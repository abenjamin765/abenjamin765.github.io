---
id: decision-knowledge-seed-scope
type: decision
status: accepted
date: 2026-09-28
owner: liza
related_evidence:
  - evidence-career-experience-index
  - evidence-resume-claim-rule
  - evidence-classroom-usability
  - evidence-classroom-completion-illustration
  - evidence-classroom-outcome
  - evidence-green-loom-status
related_objects:
  - object-role
  - object-claim
  - object-assignment
  - object-catalog-product
  - object-variant
  - object-listing
  - object-lab-result
  - object-inventory
related_decisions:
  - decision-career-facts-canonical
reversibility: high
---

# Shared knowledge centers on career experience; cases support

## Context

Root `knowledge/` needed durable facts agents can cite. This repo is Aaron Benjamin’s portfolio: the canonical career record is the main content system. Published case studies add domain depth for two stories but are not the center of the site.

## Options considered

- Leave `knowledge/` as templates only.
- Seed only case-study object models.
- Seed career experience as primary, keep case models as supporting domain detail.

## Decision and rationale

**Primary:** career index + one evidence file per role from `resume/canonical/experience.yml`, plus Role/Claim objects, claim rules, and career decisions.  
**Supporting:** Classroom and Green Loom objects, evidence, and decisions.  
Keep metrics empty until a measure has source, grain, and owner. Do not add a Student object. Do not copy contact fields. Do not mark résumé claims verified. Do not build Library Holds here.

## Consequences

- Agents answering who Aaron is, where he worked, or what to say on a résumé start with career evidence.
- Case-study knowledge remains available for those pages and OOUX examples.
- Green Loom co-founder work stays on the case evidence path until it exists as an experience.yml role.

## Revisit trigger

LinkedIn ingest updates the career record; claims become verified; or a product project needs project-local knowledge under `projects/<name>/knowledge/`.
