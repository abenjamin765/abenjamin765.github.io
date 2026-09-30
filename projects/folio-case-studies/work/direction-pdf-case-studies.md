---
id: direction-pdf-case-studies
type: direction
status: draft
date: '2026-09-30'
owner: liza
source: ~/Downloads/folio.pdf (45 image-only pages, no text layer)
related_objects:
  - object-role
  - object-claim
related_evidence:
  - evidence-amazon-ux-designer
  - evidence-home-depot-staff-ux-designer
  - evidence-resume-claim-rule
related_decisions:
  - decision-career-facts-canonical
---

# Direction: pdf-case-studies

## Decision needed

Should the three retail stories in `folio.pdf` become interview-grade case studies? If they should, how far do they go before a human clears confidentiality and the missing numbers?

**Liza's recommendation:** yes, as drafts only. Write three IDEAS sections and three draft narratives in `CASE-STUDY-INTERVIEW.md`. Every number must trace to a slide or be marked missing. Nothing goes on the public site in this slice.

The stories:

| Order | Story | Deck pages (1-based PDF index) | Why this position |
| --- | --- | --- | --- |
| 1 | Amazon Seller Central, A-to-z first-claim experience | 2–14 | It has a point of view, a decision, and a stated 60-day U.S. result |
| 2 | Home Depot curbside pickup | 33–44 | The problem and pilot results are usable. Two analysis figures are redacted as `**%`, and the journey diagram is a placeholder |
| 3 | Home Depot Order Up price adjustments | 16–31 | The process is strong. Impact is directional only, with no figures |

## Users and breakdown

**Primary user:** a hiring manager or design interviewer reading the portfolio or listening in an interview. They want to know what Aaron personally did, what decision changed the work, and what happened as a result.

**Current state:** the stories exist only as a 45-page image deck built as presentation scaffolding. It has section breaks, pause slides, emoji beats, and slide voice. It has no text layer. It cannot be read like the Classroom, Green Loom, Design Dash, or Many Hats worksheets.

**Breakdown:** the deck cannot be quoted, searched, or reviewed claim by claim. Some of its numbers are redacted or missing. The career record already marks every Amazon and Home Depot claim as unverified. Without a direction, a writer is likely to smooth the gaps with invented numbers, sole-designer framing, or cropped internal UI.

**Consequence:** one over-claimed or uncleared case study damages trust in the rest of the portfolio. That trust matters more than adding three pages.

## Evidence status

| Claim | Class |
| --- | --- |
| Amazon role is UX Designer, 2016-08 to 2017-12; every Amazon claim is unverified (`evidence-amazon-ux-designer`) | Observed (career record) |
| Home Depot role is Staff UX Designer, 2018-10 to 2022-02; every Home Depot claim is unverified (`evidence-home-depot-staff-ux-designer`) | Observed (career record) |
| A metric appears only when a source states it; do not synthesize numbers or mark claims verified (`evidence-resume-claim-rule`) | Observed (conventions) |
| `folio.pdf` exists, is about 20 MB, and is image-only | Observed (file inspection) |
| Page ranges, story order, the A-to-z 60-day U.S. result, the curbside 60-day, 50-store pilot, two redacted curbside `**%` figures, a placeholder journey, and directional-only price-adjustment impact | Borrowed (plan summary of the deck; Liza has not read the slides. Scout must observe and cite pages) |
| The A-to-z result came from Aaron's design and not only from a team email change | Assumed (Allie must challenge) |
| Price adjustments has enough substance to stand as its own case study | Assumed (Allie must challenge) |
| Three older retail stories strengthen the portfolio next to the current work | Assumed (Allie must challenge; the human decides) |
| Product screenshots in the deck may appear publicly | Assumed false by default (Cipher and the human decide) |

## Outcomes

- **User outcome:** an interviewer can follow each story from its hook through Aaron's decision to its evidenced result. They can tell what is measured, what is directional, and what is missing.
- **Portfolio outcome:** three drafts that are ready for a publish or hold decision, with no confidentiality or accuracy debt hidden inside them.
- **Not an outcome of this slice:** public pages, more traffic, or résumé changes.

## Options

| Option | User value | Risk | Reversibility | Evidence strength | Verdict |
| --- | --- | --- | --- | --- | --- |
| A. Do nothing; keep the deck as an offline PDF | Low; the stories stay unreadable | Low | Full | n/a | Rejected. The stories have real process and some stated results |
| B. Draft all three in the worksheet behind evidence, metric, and clearance gates | High for interviews | Low; nothing is public | Full | Mixed and labeled | **Chosen** |
| C. Draft and publish Pug pages now | High if accurate | High: employer UI, redacted numbers, unverified claims | Low once indexed | Weak for curbside and price adjustments | Rejected. It skips human gates the plan requires |
| D. Draft A-to-z only | Medium | Lowest | Full | Strongest story | Held as a fallback if Allie or the human cuts the thinner stories |
| E. Link or embed the deck as-is | Low; slide voice, no text layer | High: uncleared screenshots | Low | n/a | Rejected |

## Goals / non-goals

**Goals:**

- Write three IDEAS sections, each with a draft narrative, in `CASE-STUDY-INTERVIEW.md` in this order: A-to-z, curbside, price adjustments.
- Label every factual claim from the deck as observed (visible on a cited slide), inferred, or assumed. Reconcile each claim with the canonical Amazon and Home Depot role records.
- Classify every measure before any sentence uses it: stated with a window, directional only, or blocked.
- Get a confidentiality ruling before any image or page.
- Keep Allie's dissent on file even if the drafts proceed.

**Non-goals:**

- No public routes. Do not create or edit `src/*.pug` case-study pages.
- No homepage cards. Do not edit `src/index.pug`.
- No résumé claim updates. Do not edit `resume/canonical/experience.yml` or regenerate exports.
- No invented metrics. Do not turn "decreased" or "improved" into a number, and do not create a numerator or denominator the deck does not state.
- No filled-in `**%` figures. Redacted curbside percentages stay redacted until the human supplies them or chooses to omit them.
- No embedded PDF screenshots. Do not crop, export, or reference deck images in drafts or on the site; use bracket image placeholders.
- No section-break, pause, or "That's it" slides as content.

## Acceptance criteria

1. `CASE-STUDY-INTERVIEW.md` has three new sections, one per story, in the chosen write order. Each has I, D, E, A, S, Closing Reflection, Supporting images, and a Draft case-study narrative.
2. Every metric in a draft points to a deck page in Scout's evidence and Ledger's inventory, or the draft states the figure is missing.
3. The curbside draft contains no `**%` string and does not describe the placeholder journey diagram as a finished artifact.
4. The price-adjustments draft uses only directional language for impact and states that no figures exist.
5. The A-to-z draft separates Aaron's own contribution from team or program changes.
6. No file under `src/`, `dist/`, or `resume/` changes in this run. A git diff limited to those paths shows nothing attributable to this run.
7. No deck image appears in any draft or site asset. The Supporting images subsections list placeholders and Cipher's constraints.
8. Allie's challenge artifact exists with a verdict. Any dissent remains in it after the drafts are revised.
9. `python3 scripts/validate_knowledge.py --project folio-case-studies` and `python3 scripts/check_run_packet.py --project folio-case-studies` pass.

## Team for this slice

| Agent | Why their independent expertise changes the result |
| --- | --- |
| Liza | Direction, gates, and sequencing (this artifact and the run packet) |
| Scout | The deck is image-only. Someone must observe each slide, cite pages, and reconcile with career records |
| Ledger | The stories mix stated, directional, and redacted results. Measurement integrity is the main accuracy risk |
| Cipher | Internal employer UI, customer and seller names in the email mock, store-operations data, and publication risk |
| Charlie | Story structure and the five-image rhythm; drop slides that only repeat the sidebar |
| Echo | Remove slide voice and keep specific moments; match the classroom voice |
| Allie | Independent challenge on portfolio fit, story thinness, and over-claiming |

Not in this run: Luke (no domain model changes), Iris, Finn, and Sentry (no public pages until the human says yes), Relay, and Harbor.

## Measures

This slice produces writing, not a shipped product. Its measures are integrity checks, not growth targets:

| Measure | Check | Owner |
| --- | --- | --- |
| Metric traceability | Each number in a draft maps to a Ledger metric file and a Scout evidence page. Target: all of them. | Ledger |
| Redaction leakage | `rg '\*\*%' CASE-STUDY-INTERVIEW.md` returns nothing | Echo, verified by Liza |
| Out-of-scope edits | No changes under `src/`, `dist/`, or `resume/` from this run | Liza |
| Challenge preserved | The challenge artifact has a verdict and unresolved dissent | Allie |

Portfolio impact, such as interview outcomes, is not measured in this slice, and no target is set.

## Risks and dependencies

- **Public repository.** `origin` is `abenjamin765/abenjamin765.github.io`, the GitHub Pages source. Committing or pushing this project folder publishes Scout's slide transcriptions and Ledger's figures even though no Pug page exists. Treat any commit of `projects/folio-case-studies/` as publication under `AGENTS.md`. Cipher should say whether evidence belongs under an ignored path. `projects/README.md` mentions an ignored `private/` directory, but `.gitignore` does not list it today.
- **Over-claiming.** A-to-z may credit a team email change to a sole designer. Allie challenges it, and Echo writes "I" only for Aaron's own actions.
- **Thin story.** Price adjustments may not carry a full case study. If so, option D or a merged Home Depot story is the fallback, and the human decides.
- **Unverified career facts.** Deck dates or titles may conflict with canonical records. Scout records conflicts rather than resolving them silently.
- **Dependency chain:** Scout, then Ledger, then Cipher, then Echo and Charlie, then Allie, then the human gate. Drafting before Ledger and Cipher finish risks rework and leaked figures.
- **Dependency:** Scout needs a way to read image-only pages. The method is Scout's choice, and nothing extracted from the deck goes into `src/` or `dist/`.

## Open questions

Human gates. Each needs an explicit answer before the matching work proceeds:

1. **Public page permission.** May any of the three stories become a public page, and which ones?
2. **Screenshot clearance.** May product screenshots be redrawn, cropped, or used at all, or must they stay off the site?
3. **Curbside percentages.** Supply the two redacted `**%` figures with a source, or choose explicitly to omit them.
4. **Career record.** Should any deck result enter `resume/canonical/experience.yml` (still unverified), or should it stay only in the case-study draft?

For the team, to resolve during the run:

- Does the A-to-z 60-day U.S. result belong to the first-claim design, the email change, or both? (Scout and Allie)
- Are the curbside pilot's 50 stores and 60 days stated on a slide, or inferred? (Scout and Ledger)
- Should the three stories keep separate sections, or should the two Home Depot stories be merged? (Allie recommends; the human decides)
