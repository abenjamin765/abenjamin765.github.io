---
id: object-role
type: object
name: Role
status: draft
date: 2026-09-28
owner: luke
source_project: null
derived_from: null
evidence:
  - evidence-career-experience-index
  - evidence-resume-claim-rule
related_objects:
  - object-claim
related_evidence:
  - evidence-career-experience-index
  - evidence-resume-claim-rule
related_decisions:
  - decision-career-facts-canonical
  - decision-knowledge-seed-scope
---

# Role

## Definition

One employment role in Aaron Benjamin’s canonical career record: company, primary title, date range, and related claims. Conflicting or historical titles stay as title variants; they are never collapsed into a single invented title.

Source: `resume/canonical/experience.yml`, `resume/schema/conventions.md`.

## Attributes

| Attribute | Meaning | Required | Sensitive | Source |
| --- | --- | --- | --- | --- |
| id | Stable kebab-case id (for example `role-renaissance-learning-senior-ux-designer`) | Yes | No | Canonical experience |
| company | Employer name | Yes | No | Canonical experience |
| title | Primary title | Yes | No | Canonical experience |
| title_variants | Conflicting or historical titles with id, title, label | No | No | Conventions: never collapse |
| start / end | `YYYY-MM` or year-only; end null when ongoing | Yes | No | Conventions |
| current | True when role is ongoing | No | No | Should coincide with end null |
| workplace | remote / hybrid / onsite | No | No | Schema enum |
| area | Org unit or product area | No | No | Conventions |
| leadership_scope | Team size / reports | No | Yes if named people | Only when sourced |
| overlap_note | Explains legitimate date overlap | No | No | Conventions |
| summaries | one_line / short / long summary claims | No | No | kind: summary |
| claims | Assertion ids attached to the role | No | Per claim | Canonical experience |

## Relationships

| Related object | Relationship | Cardinality | Direction | Lifecycle consequence |
| --- | --- | --- | --- | --- |
| Claim | Has assertions | 1 role → many claims | Role owns claim list | Profiles select claims by id; they do not invent new ones |

## Actions

| Action | Actor | Preconditions | State change | Failure behavior |
| --- | --- | --- | --- | --- |
| Record title variant | Maintainer | Source disagrees on title | Variant added | Do not overwrite primary by collapsing |
| Attach claim | Maintainer | Claim exists | Claim linked to role | Unverified claims excluded from public export when allow_unverified false |
| Select for profile | Profile author | Role id exists | Profile references role | Export fails if required_role_ids missing |

## States and transitions

| State | Meaning | May enter from | May exit to | Visible to |
| --- | --- | --- | --- | --- |
| Current | end null, current true | Active employment | Ended | Public profiles that include the role |
| Ended | end date set | Current | — | Same |

## Permissions and rules

- Canonical record holds facts; profiles hold selection and presentation only.
- Year-only dates must not be normalized to invented months.
- Do not copy contact fields (phone, email) into shared knowledge objects.

## Mental-model notes

A role is not a résumé bullet list. Bullets are claims selected by a profile.

## Open questions

- Per-role confidential fields beyond the claim `confidential` flag are not separately modeled here.
