# Résumé Record Conventions

Field dictionary and rules for the canonical career record and profiles. The
canonical record holds **facts**; profiles hold **selection and presentation**.
JSON is a generated projection. Do not copy résumés; generate them.

## Files

- `career.schema.json` — the canonical career document (facts only).
- `profile.schema.json` — a profile document (selection + presentation only).

## Global rules

- `additionalProperties: false` everywhere. Unknown keys fail validation.
- **Ids** are stable, lowercase kebab-case: `^[a-z0-9]+(-[a-z0-9]+)*$`
  (e.g. `indeed-senior-ux`, `impact-ab-tests`). Ids are permanent; renaming
  breaks profile references.
- **Dates** are strings `^\d{4}(-\d{2})?$`: `YYYY-MM`, or `YYYY` when the
  source states only a year. This applies to role `start`/`end`, project
  `start`/`end`, and education `year`. Role and project `end` may be `null`
  (ongoing).
- A **year-only date means the month is unknown.** Record exactly what the
  source supports (e.g. Pyramid Consulting, sourced as "2010 - 2011", is
  `start: "2010"`, `end: "2011"`). Never normalize a year-only value to January
  (`2010-01`) or any other invented month, in the canonical record or in
  exports.
- Preserve **multiple approved wordings** of the same fact as `variants`; never
  delete an approved wording to make room for another.
- Never store presentation in the canonical record: no ordering, no length
  choice, no "final" wording, no per-audience selection, no formatting. Those
  are profile decisions.

## Enums

- `workplace`: `remote` | `hybrid` | `onsite`
- `claim.kind`: `summary` | `impact` | `leadership` | `strategy` | `craft` |
  `method` | `project`
- `variant.length` / identity `length`: `short` | `medium` | `long`
- `variant.audience`: `human` | `ats` | `either`
- `status` (claims, education): `verified` | `unverified` | `rejected`
- `skill.kind`: `focus` | `capability` | `tool` | `practice`
- profile `reader`: `human` | `ats`
- profile `roleSelection.summary_level`: `one_line` | `short` | `long`

`employment_type` is a free string; suggested vocabulary: `full-time`,
`part-time`, `contract`, `freelance`, `internship`, `temporary`.

## Claim model

A claim is one assertion about the candidate.

- `text` is the canonical wording. Alternate approved wordings go in
  `variants[]` (`id`, `text`, optional `length`, optional `audience`).
- `metric` is **optional** and appears only when a source states a measure. A
  numeric `value` is never required — `wording` alone (e.g. "over 30 A/B tests")
  is valid. Do not synthesize numbers.
- `skills`, `tools`, `keywords` support matching and ATS tailoring.
- `emphasis[]` are free tags profiles use to select/rank the claim.
- `confidential: true` marks claims that must never appear in a public profile.
- `status` records verification state (see below).

### Verification and sources

- A claim's `sources[]` may be present at any `status`.
- **Rule:** when `status: verified`, the claim MUST carry at least one `source`
  (`path` required; add a `locator` — line range, heading, or quote — whenever
  possible). The schema allows sources everywhere; this required-when-verified
  rule is enforced by the builder/validator, not by JSON Schema alone.
- `rejected` claims are kept (not deleted) so a wording is not re-proposed.
- **Do not mark anything `verified` without a real source.** Default new claims
  to `unverified`.

## Roles (`experience[]`)

- `title` is the primary title. Conflicting or historical titles go in
  `title_variants[]` (`id`, `title`, `label`) — **never collapse** them into one.
- `current: true` should coincide with `end: null`.
- `overlap_note` explains legitimately overlapping date ranges.
- `leadership_scope` (team size / reports) is included only when sourced.
- `area` is the org unit or product area.
- `summaries` holds `one_line` / `short` / `long`, each a claim with
  `kind: summary`. Role detail may live in `summaries` and/or in `claims[]`.

## Identity

- `name` is the only required field. Store **all** valid `emails[]`, `phones[]`,
  and `locations[]` with labels; **do not** designate a single "true" value —
  profiles choose which to render. There is no singular `location` field:
  contradictory locations (e.g. Powder Springs, GA vs Seattle) each get a
  `locations[]` entry (`label`, `text`, optional `id`, optional `sources`).
- `headline_variants[]` and `summary_variants[]` preserve multiple approved
  statements; none is canonical.

## Education & Skills

- Education: `institution` required; `credential` omitted when none earned;
  `honors[]`, `status`, `sources[]` optional. Same verification rule applies.
  When sources disagree (year, campus, credential wording, salutatorian, etc.),
  keep one candidate wording in the parent fields and put every other wording in
  `alternates[]`. Each alternate has optional `id`, `label`, `credential`,
  `location`, `year`, `honors`, `status`, `sources`. No verified winner is
  required; do not collapse contradictory facts.
- Skills: `name` + `kind` required; `keywords[]` aid matching.

## Profiles (selection + presentation only)

- A profile references the canonical record **by id only**. It must not contain
  new employers, new metrics, or free-form replacement bullet text. Any wording
  swap is a `variant_id` that already exists on the claim.
- `length_budget` is an integer **bullet cap** (max claim bullets rendered),
  not a page count.
- `roles[]` lists included roles in display order; each may pick a
  `title_variant_id`, a `summary_level`, and `claims[]` (each `claim_id` with an
  optional `variant_id`).
- `required_role_ids[]`: export MUST fail if any is missing.
- `allow_unverified: false` (public default) means export excludes any
  non-`verified` claim.
- `skill_priority[]` orders existing skills; `tone` guides wording selection.
- Identity selection uses optional id fields, not `emphasis` tags. Each is a
  slug that must match an existing `id` in the canonical `identity`:

  | Profile field | References |
  | --- | --- |
  | `headline_id` | `identity.headline_variants[].id` |
  | `summary_id` | `identity.summary_variants[].id` |
  | `email_id` | `identity.emails[].id` |
  | `phone_id` | `identity.phones[].id` |
  | `location_id` | `identity.locations[].id` |

  JSON Schema checks only the slug format; the builder/validator must reject an
  id that does not resolve. `emphasis[]` remains for ranking claims and should
  not be used to pick identity values.
