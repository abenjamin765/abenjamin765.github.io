---
id: object-claim
type: object
name: Claim
status: draft
date: 2026-09-28
owner: luke
source_project: null
derived_from: null
evidence:
  - evidence-resume-claim-rule
  - evidence-career-experience-index
related_objects:
  - object-role
related_evidence:
  - evidence-resume-claim-rule
  - evidence-career-experience-index
related_decisions:
  - decision-career-facts-canonical
  - decision-knowledge-seed-scope
---

# Claim

## Definition

One assertion about the candidate in the canonical career record: canonical wording, optional approved variants, optional metric wording when a source states a measure, and a verification status.

Source: `resume/schema/conventions.md`, `resume/canonical/experience.yml`.

## Attributes

| Attribute | Meaning | Required | Sensitive | Source |
| --- | --- | --- | --- | --- |
| id | Stable kebab-case id | Yes | No | Canonical record |
| text | Canonical wording | Yes | Per claim | Canonical record |
| kind | summary / impact / leadership / strategy / craft / method / project | Yes | No | Schema enum |
| variants | Alternate approved wordings (id, text, length, audience) | No | No | Never delete an approved wording to make room |
| metric | Optional; wording and/or value only when a source states a measure | No | No | Do not synthesize numbers (example wording: “over 30 A/B tests”) |
| status | verified / unverified / rejected | Yes | No | verified requires at least one source |
| sources | path + optional locator | Required when verified | No | Builder/validator rule |
| confidential | Must never appear in a public profile | No | Yes when true | Conventions |
| skills / tools / keywords | Matching aids | No | No | Conventions |
| emphasis | Free tags for profile ranking | No | No | Not for picking identity values |

## Relationships

| Related object | Relationship | Cardinality | Direction | Lifecycle consequence |
| --- | --- | --- | --- | --- |
| Role | Asserts about | Many claims → 1 role (typical) | Attached to role | Rejected claims kept so wording is not re-proposed |

## Actions

| Action | Actor | Preconditions | State change | Failure behavior |
| --- | --- | --- | --- | --- |
| Add claim | Maintainer | Role exists | status defaults unverified | Do not mark verified without a real source |
| Verify | Maintainer | At least one source path | status verified | Schema/builder rejects verified without source |
| Reject | Maintainer | Wording must not return | status rejected | Claim kept, not deleted |
| Select variant in profile | Profile author | variant_id exists on claim | Presentation only | Profile must not invent free-form replacement text |

## States and transitions

| State | Meaning | May enter from | May exit to | Visible to |
| --- | --- | --- | --- | --- |
| unverified | Default for new claims | Create | verified, rejected | Internal; public export may exclude |
| verified | Sourced assertion | unverified | rejected (rare) | Public when profile allows |
| rejected | Kept to block re-proposal | unverified or verified | — | Maintainers |

## Permissions and rules

- A numeric `value` is never required; metric `wording` alone is valid when sourced.
- Public default `allow_unverified: false` excludes non-verified claims from export.
- Shared knowledge must not promote unverified resume claims into accepted metrics or objects beyond this definition.

## Mental-model notes

Claims are facts-under-review in the career record. Case-study outcome sentences on the folio are separate evidence notes, not résumé claims, unless recorded in the canonical YAML.

## Open questions

- Mapping between folio case outcome sentences and specific claim ids is not part of this seed.
