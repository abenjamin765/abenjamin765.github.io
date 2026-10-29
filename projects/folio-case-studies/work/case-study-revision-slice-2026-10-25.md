---
id: slice-report-case-study-revision-2026-10-25
type: slice-report
status: accepted
date: 2026-10-25
owner: liza
related_objects: []
related_evidence: []
related_decisions: []
---

# Slice report

## Current revision: Curbside HTML email and illustration correction

October 26: rebuilt the annotated pickup email in responsive HTML, removed the two marked captions, and corrected the customer’s hand pose in the service illustration. See [revision and generation details](curbside-html-revision-2026-10-26.md).

## Earlier revision: Classroom current state and restored prototype

October 26: rebuilt the opening around the teacher’s current workflow, followed by the opportunity and a research-led progression to the solution. Restored the original interactive before/after prototype with After selected by default. See the [revision and verification notes](classroom-current-state-revision-2026-10-26.md).

## Earlier revision: nine-case tightening

Implemented the approved follow-up across the nine cases other than Indeed. See the [new baseline/final scorecards](case-study-tightening-scorecards-2026-10-25.md) and [verification report](case-study-tightening-verification-2026-10-25.md) for per-case edits, evidence debt, screenshots, and checks. Previous migration scorecards are preserved.

## Earlier revision: Indeed scroll entrances

Added first-visit reading entrances to Indeed only, using the animate skill's rare/marketing delight gate. Native IntersectionObserver triggers CSS opacity/translateY entrances: 1400ms, 12px, the existing `--story-ease-out`, and a 180ms stagger capped at 360ms for simultaneous blocks. Headings, prose groups, figures, facts, callouts and the outcome/next-case blocks reveal once; paragraphs do not cascade separately. Initially visible or restored-position content stays visible. The original screenshot/cover, headings, copy and layout are otherwise unchanged.

The implementation is progressive enhancement: no JavaScript, unsupported APIs, observer setup failures, and initial reduced motion keep content visible. Keyboard navigation, focused/pointer-activated groups, fast scroll jumps, live reduced-motion changes, resize, print, hidden-tab interruption and cached-page restoration settle visibly instead of replaying. CSS animates only transform and opacity; there is no scroll-driven per-frame animation loop, new dependency, or permanent will-change layer.

`scripts/test-case-scroll.cjs` verifies actual 1400ms opacity/transform transitions at 320/390/862/949/1440px, once-only behavior, keyboard/focus bypass, fast jumps, reduced-motion initialization/live changes, print, resize, missing/failed observer fallback, no JavaScript, and zero reported WCAG-tagged axe violations. Browser errors: zero. Evidence: `/Users/aaron/Documents/ChatGPT/portfolio/output/indeed-scroll/`. Reviewed an in-progress entrance render; no real-device GPU/frame-rate profiling is claimed. Other case pages are not opted into this motion. No publication performed.

## Current revision: simplified Indeed reading layout

Applied Aaron's three follow-up comments to Indeed only: removed the visible cover caption while retaining its substantive description in the image alt text; removed all three chapter-label rail elements and changed the chapters to a single centered reading column; removed the hero's “Follow the decisions” jump link. The outcome aligns with the same reading column. Other cases retain their current layouts. Five-width checks (320/390/862/949/1440), column alignment, retained alt text, and automated WCAG accessibility checks passed. Render and check evidence: `/Users/aaron/Documents/ChatGPT/portfolio/output/indeed-clean/`.

## Current revision: approved Indeed problem storyboard

Aaron approved the revised three-panel illustration showing a stale post, duplication without closing the original, and two active records for the same opening. A byte-identical copy of the approved generated image is now the Indeed cover, with an accessible full-size image link. The actual Refresh interface remains in the later interaction chapter. Removed the superseded research-section journey image to avoid repeating the problem with an inconsistent closed-original sequence. Updated the deck, research account and qualitative-outcome comparison to follow Aaron's direct correction; historical baselines and legacy source pages were not changed. Provenance and the factual correction are recorded in `projects/folio-case-studies/knowledge/evidence/indeed-job-duplication.md`.

Targeted checks at 320, 390, 862, 949 and 1440px confirmed the approved 1521 × 1034 asset loads without horizontal overflow or runtime errors. The obsolete journey is absent and the later Refresh interface is retained. Desktop/mobile cover renders are in `/Users/aaron/Documents/ChatGPT/portfolio/output/indeed-storyboard/`. This later factual correction supersedes the older closing/reposting wording in the migration's frozen scorecard baseline; no new result magnitude is implied.

## Acceptance criteria mapping

| Criterion | Implementation | Status |
| --- | --- | --- |
| New research-based rubric | Seven weighted criteria, 0–4 anchors, exact calculation, readiness floors, blocker overrides, independent-project treatment and pause-for-input policy | Complete |
| Baselines before rewriting | Allie froze ten sources, then recorded baseline numerical assessments before edit release | Complete |
| All ten local cases | Eight new HTML pages; Classroom and Shapes revised in place; all extend shared case-study.css | Complete |
| Evidence-led revision | Personal contributions, constraints, decisions, visual proof, status/results and limits are explicit | Independent editorial review complete |
| Local collection navigation | Home/Work case hrefs localized; next-case cycle retains Work order | Passed |
| Preserve Home and older site | Home before/after normalization permits only case href replacements; no src/dist edits by this migration | Passed |
| Functional and rendered checks | Fifty width checks; ten integrated accessibility, enlarged-text, no-JS and reduced-motion checks; native disclosures and preserved demos verified | Passed |

## Files changed

- `newsite/research/case-study-rubric.md` and a lookup link in the research README.
- Eight new local case HTML files: Indeed Job Refresh, Curbside, Price Adjustments, Green Loom, UX MEOW, Amazon A-to-z, Design Dash and Many Hats.
- Existing Classroom: local masthead/next route, explicit shipped/deferred boundary, more precise retrospective-outcome context. Existing Shapes: first-person contribution, explicit conceptual/in-development facts, planned-versus-completed validation wording, local next route. Existing Shapes diagram geometry and specialized styling retained.
- Shared `newsite/case-study.css`: resilient text and release-boundary presentation. Scoped professional, independent and Price demo styles/scripts live in `newsite/assets/cases/`.
- Referenced original project assets copied under `newsite/assets/img/folio/`; unused new copies pruned. Source artwork untouched. Green's working prototype snapshot and its dependencies are local under `newsite/prototypes/green-loom/`.
- Home/Work changed only case hrefs during this migration. Shared visual vocabulary and approved homepage content retained.
- Added reusable `scripts/test-newsite-cases.cjs`; `--assets-only` supports a shorter local-assets/navigation rerun.
- Rubric, scorecards, run packet, specialist slice reports and quality report document decisions and verification.

## Inventory and source status

| Work order | Local case | Narrative evidence retained |
| ---: | --- | --- |
| 1 | Classroom Assignment Management | Ten-teacher qualitative research, API/shared model work, shipped release cut, confidential 60-day hub behavior |
| 2 | Indeed Job Refresh | Employer workaround, cross-team proposal, trial-to-Sponsored Jobs delivery; qualitative feedback only |
| 3 | Curbside Pickup | Field/operational constraints, email/app tradeoff, scoped 50-store/60-day reported pilot |
| 4 | Price Adjustments | 12-store discovery, anchored fly-out, business rules, pilot-to-rollout; directional results and sample demo |
| 5 | Green Loom | Catalog completion confirmed by author October 2, COA import/publication controls, original wireframes, sample stock demo; deployment/validation unestablished |
| 6 | UX MEOW | Co-founder/mentor-training work, learning-over-deadlines tradeoff, remote adaptation and reported shared program growth |
| 7 | Amazon A-to-z First Claim | Research synthesis, coverage advocacy with limited authority, email hierarchy, qualified U.S. retrospective program results |
| 8 | Design Dash | SONAR decision trail and Renaissance use alongside a labeled fictional tool-library example; no measured effectiveness |
| 9 | Many Hats | Author use at Renaissance/Green Loom/portfolio, explicit role/critic/human boundaries, fictional Library Holds demonstration |
| 10 | Shapes | Existing retail diagrams/reference workspace, authoring/review decisions, proposed validation; no participant findings |

The immutable starting content lives in `/private/tmp/case-rubric-baseline-2026-10-25/`. Durable scorecards cite the project evidence and the current author-account documents. Older design-only Green Loom notes were reconciled to the later direct confirmation; Amazon's UX Designer II title follows the confirmed career facts and current canonical record. Existing public story sources are evidence, not independent verification.

## Verification

See [quality report](case-study-revision-quality-2026-10-25.md), [baseline/final scorecards](case-study-scorecards-2026-10-25.md), and the two specialist slice reports. The reproducible full browser check is `CASE_REVIEW_OUTPUT=<output-directory> node scripts/test-newsite-cases.cjs`; it uses a temporary loopback server and does not build or alter the older published site. Root diff whitespace and run-packet validation passed.

## Residual risk

All scores meet the editorial target, with individual missing evidence still visible. Scores range from 80 to 83.75; Shapes Evidence remains 2. These assessments do not measure hiring success. Automated accessibility checks and local browser tests are not a full assistive-technology or production audit. No factual gap required an input hold; limitations are recorded rather than replaced with invented results.

## Deferred work

Publication, older-site migration, new artwork, additional empirical validation, and disclosure of confidential figures were not performed. The homepage's temporary Classroom/Curbside image placeholders remain unchanged, as requested by the approved homepage-preservation scope.


## Follow-up: case navigation and Indeed copy

Removed the visible delivery-interface caption from Indeed; the retained image alt text still identifies it as a mockup. Rewrote the decision without an em dash: “Renewed visibility should require updated information rather than resurface an unchanged post.”

Standardized the next-case section on all ten pages: one large linked question, explicit next-project name, Read case study cue, directional arrow, and a separate Browse all work link. Removed the inconsistent thumbnail/secondary-column variants and tightened spacing. Kept collection order and local destinations. The shared component has a visible keyboard focus outline and no added animation. Desktop/mobile detail renders and collection checks are in `/Users/aaron/Documents/ChatGPT/portfolio/output/case-next-review/`.
