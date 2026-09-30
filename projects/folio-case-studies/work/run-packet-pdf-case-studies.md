---
id: run-packet-pdf-case-studies
type: run-packet
status: draft
date: '2026-09-30'
owner: liza
related_objects:
  - object-role
  - object-claim
related_evidence:
  - evidence-amazon-ux-designer
  - evidence-home-depot-staff-ux-designer
  - evidence-resume-claim-rule
related_decisions:
  - decision-career-facts-canonical
expected_artifacts:
  - direction
  - run-packet
  - evidence
  - metric
  - threat-model
  - language-inventory
  - challenge
---

# Run packet: pdf-case-studies

## Outcome

This run produces three interview-grade drafts from `~/Downloads/folio.pdf`, in the IDEAS format in `CASE-STUDY-INTERVIEW.md`. Each draft is backed by slide-cited evidence, a metric inventory, a confidentiality note, and an independent challenge. The run ends at the human gate. Public pages are not part of this run.

Direction: [`direction-pdf-case-studies.md`](direction-pdf-case-studies.md).

## Owners and sequence

| Order | Owner | Artifact or decision | Depends on |
| --- | --- | --- | --- |
| 1 | Liza | `work/direction-pdf-case-studies.md` and this run packet | none |
| 2 | Scout | One `evidence` file per story under `knowledge/evidence/`, with claims labeled observed, inferred, or assumed and reconciled with the canonical Amazon (2016-08 to 2017-12) and Home Depot (2018-10 to 2022-02) records. Deck metrics stay unverified | 1 |
| 3 | Ledger | `metric` files under `knowledge/metrics/`, one per measure, classified as stated with a window, directional only, or blocked. No invented numerators or denominators | 2 |
| 4 | Cipher | `work/threat-model-pdf-case-studies.md`: a clearance note covering internal product UI, seller and buyer names in the email mock, store-operations data, employer publication risk, and whether project evidence may be committed to this public repo. The default is prose with image placeholders | 2, 3 |
| 5 | Charlie | Story structure and the five-image rhythm for each worksheet section; drop slides that only repeat the sidebar | 2, 3, 4 |
| 5 | Echo | Three IDEAS sections and draft narratives in `CASE-STUDY-INTERVIEW.md`, plus `work/language-inventory-pdf-case-studies.md` recording slide-voice removals | 2, 3, 4, Charlie's structure |
| 6 | Allie | `work/challenge-pdf-case-studies.md`: portfolio fit next to Classroom, Green Loom, Design Dash, and Many Hats; whether price adjustments is too thin; whether A-to-z over-claims a team email change | 5 |
| 7 | Human | The four gates below | 6 |

Write order inside step 5: A-to-z first, curbside second, price adjustments third. Scout and Ledger should work in the same order so the first draft can start early.

Out of this run: Finn, Iris, and Sentry work on public pages only after the human answers gate 1 with yes. That will be a separate run packet.

## Human gates

Actions that require exact human authorization before proceeding.

1. **Public page permission.** Whether any of the three stories may become a public page, and which ones. Until answered, no `src/*.pug` route, `src/index.pug` card, or `dist/` output.
2. **Screenshot clearance.** Whether product screenshots may be redrawn, cropped, or must stay off the site. Until answered, drafts use bracket placeholders only.
3. **Curbside percentages.** The two redacted `**%` figures with a source, or an explicit choice to omit them. Until answered, the curbside draft omits them and says they are missing.
4. **Career record.** Whether any deck result enters `resume/canonical/experience.yml` (still unverified), or stays only in the case-study draft. Until answered, `resume/` is untouched.

Under `AGENTS.md`, committing or pushing `projects/folio-case-studies/` to `origin` (the public GitHub Pages repo) counts as publication and needs the human's authorization, separate from the gates above.

## Expected artifacts

List of registry `type` values this run must produce (also in frontmatter `expected_artifacts`).

| Type | Owner | Path (under `projects/folio-case-studies/`) |
| --- | --- | --- |
| `direction` | Liza | `work/direction-pdf-case-studies.md` |
| `run-packet` | Liza | `work/run-packet-pdf-case-studies.md` |
| `evidence` | Scout | `knowledge/evidence/a-to-z-first-claim.md`, `knowledge/evidence/curbside-pickup.md`, `knowledge/evidence/price-adjustments.md` |
| `metric` | Ledger | `knowledge/metrics/<story-slug>-<measure-slug>.md`, one per measure, including blocked ones |
| `threat-model` | Cipher | `work/threat-model-pdf-case-studies.md` |
| `language-inventory` | Echo | `work/language-inventory-pdf-case-studies.md` |
| `challenge` | Allie | `work/challenge-pdf-case-studies.md` |

Non-registry deliverable, checked by direct inspection: three new sections in the root `CASE-STUDY-INTERVIEW.md`, appended after `## 8. Design Dash` and before the `---` rule that precedes `## Notes for the interview`:

- `## 9. Amazon A-to-z first claim`
- `## 10. Home Depot curbside pickup`
- `## 11. Home Depot price adjustments`

Each uses the Classroom subsection set: `### I — Inspiration`, `### D — Design Process`, `### E — Engagement`, `### A — Action`, `### S — Success`, `### Closing Reflection`, `### Supporting images`, `### Draft case-study narrative`.

Public Pug pages, homepage cards, résumé updates, and image assets are not expected artifacts of this run.

### Conventions for later agents

- **Project slug:** `folio-case-studies`. Work slug: `pdf-case-studies`.
- **Story slugs:** `a-to-z-first-claim`, `curbside-pickup`, `price-adjustments`. Use them in evidence filenames, metric filename prefixes, and IDs (for example `evidence-a-to-z-first-claim`, `metric-curbside-pickup-<measure>`).
- **Page citations:** 1-based PDF page index, written `p. 7` or `pp. 33–35`. The story ranges are A-to-z pp. 2–14, price adjustments pp. 16–31, and curbside pp. 33–44. Scout corrects these if the slides disagree and notes the correction.
- **Claim labels:** `observed` (visible on a cited slide), `inferred` (reasoned from slides), `assumed` (not on a slide). Deck metrics are never `verified`.
- **Metric class:** Ledger adds an `Evidence class` row to the metric table with one of `stated-with-window`, `directional-only`, or `blocked`. Blocked metrics leave the numerator as `not stated` and cite the redacted slide.
- **Links:** new project files set `related_evidence` to the relevant root career evidence (`evidence-amazon-ux-designer` or `evidence-home-depot-staff-ux-designer`) plus `evidence-resume-claim-rule`, and cite project IDs as they are created.
- **Missing figures in drafts:** use the worksheet's bracket style, for example `[Figure missing: curbside analysis, p. 40]`. Never use `**%`.
- **Images in drafts:** bracket placeholders following the worksheet's five-slot rhythm (`[Hero image]`, `[Context image]`, `[Process artifact]`, `[Final UI or system view]`, `[Outcome evidence]`). No crops, exports, or file references from the deck.
- **Voice:** classroom voice from section 1 of the worksheet. Use "I" only for Aaron's own actions and name team contributions as team contributions.
- **Do not edit:** the plan file, `src/`, `dist/`, `resume/`, or core agents and skills.

## Completion evidence

How the team knows the run is done, including residual assumptions.

- `python3 scripts/validate_knowledge.py --project folio-case-studies` passes.
- `python3 scripts/check_run_packet.py --project folio-case-studies` passes, meaning every expected type exists with its required headings.
- `rg -n '^## (9|10|11)\. ' CASE-STUDY-INTERVIEW.md` returns the three sections in write order, and each has the eight subsections above.
- `rg '\*\*%' CASE-STUDY-INTERVIEW.md` returns nothing.
- Each number in the three drafts appears in a Ledger metric file with a page citation, or sits next to a `[Figure missing: …]` marker. Liza verifies this by reading, not from a specialist's summary.
- The out-of-scope paths are unchanged. At run start (2026-09-30), `{ git status --porcelain -- src dist resume; git diff -- src dist resume; } | shasum -a 256` returned `0f930a34822c7f9249d94608244430ecbc9ac0ee2ae74d4b2bd201b1769a2d21` (44 status lines, from pre-existing uncommitted work). The same command must return the same hash at run end. Limitation: it does not detect content changes inside files that were already untracked.
- The challenge artifact has a verdict. Dissent Allie does not withdraw stays in the file.
- The run report lists the four human gates as still open, unless the human answered them, with evidence debt named per story.

Residual assumptions at the start of the run: the deck summary in the direction is borrowed from the plan and has not been observed slide by slide; A-to-z attribution, whether price adjustments can stand alone, and portfolio fit are still unchallenged.
