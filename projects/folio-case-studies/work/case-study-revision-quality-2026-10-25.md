---
id: quality-strategy-case-study-revision-2026-10-25
type: quality-strategy
status: accepted
date: 2026-10-25
owner: liza
related_objects: []
related_evidence: []
related_decisions: []
---

# Quality strategy

## Release decision

All ten revised case studies are ready for local review in /newsite. No publication, deployment, merge, or external pull request was performed. Independent editorial scores meet the approved rubric's numerical and criterion floors; these are editorial assessments, not hiring predictions or independent validation of career outcomes.

The content/evidence review is recorded in [ten baseline/final scorecards](case-study-scorecards-2026-10-25.md). The research standard is [the new rubric](../../../newsite/research/case-study-rubric.md).

## Risks ranked

| Risk | Impact | Reach | Likelihood | Detectability | Recoverability |
| --- | --- | --- | --- | --- | --- |
| Unsupported impact, authority, or adoption | High | Case readers | Reduced by author/source audit | Independent editorial review | Revise claim before publication |
| Legacy links leave /newsite or fail | High | All navigation | Reduced by route tests | Automated local path/next-cycle checks | Correct href |
| Demo or diagram breaks in migrated layout | High | Price/Green/Shapes | Reduced by scoped dependencies and tests | Interaction tests and renders | Local CSS/script correction |
| Hidden or overflowing content on mobile/zoom | High | Narrow/enlarged-text readers | Reduced by responsive tests | Five widths and enlarged text | Layout correction |
| Retrospective or illustrative content misread as measured fact | High | Results/visual readers | Still possible despite labels | Editorial review; not a comprehension study | Preserve nearby caveats |

## Mapped acceptance criteria

| Acceptance criterion | Observable check | Status |
| --- | --- | --- |
| Ten cases on shared latest layout | One h1; facts, chapters, outcome/status, reflection and next navigation on every page | Passed |
| Home and Work route locally | Existing Home content compared with pre-migration snapshot; only case hrefs differ; all ten Work hrefs and next-cycle destinations checked | Passed |
| Original useful craft preserved | Source image audit and browser decode; Price demo retained; Green snapshot retained; Shapes diagram markup preserved | Passed |
| Honest evidence and ownership | Independent source review, case-specific provenance and limitations, Amazon official-title reconciliation | Passed; missing measurement remains disclosed |
| Responsive reading | All ten × 320/390/768/949/1440px | 50 checks passed, no horizontal overflow |
| Enlarged text | All ten at 320px with text enlarged to 200% | Passed, no horizontal overflow |
| Keyboard disclosures | Native summary focus + Enter open/close on each case that has disclosures | Passed |
| Automated accessibility | Axe WCAG2A/AA, 2.1AA and 2.2AA-tagged rules on every integrated case | Zero reported violations in ten integrated checks |
| Motion and JavaScript resilience | Reduced-motion reload and JavaScript-disabled narrative checks on all ten | Passed |
| Asset integrity | Image decode, browser response/error logs, final asset-only retest after pruning unused staged copies | Passed |

## Coverage plan

Executed the reusable `scripts/test-newsite-cases.cjs`. It creates a temporary loopback-only server, serves the repository without rebuilding the older site, and blocks unexpected external runtime dependencies. All ten cases passed structural, route, local-file, image, unique-ID, ARIA-label, five-width, disclosure-keyboard, automated-accessibility, enlarged-text, reduced-motion, and JavaScript-disabled checks. Work order is retained and next-case navigation forms the same complete cycle.

Evidence directory: `/Users/aaron/Documents/ChatGPT/portfolio/output/case-study-revision-2026-10-25/`. `results.json` has ten completed case records, both Home/Work route checks, and no failures. Fifty full-page screenshots cover all five widths for every case. `assets-check/results.json` records the shorter post-pruning rerun. Liza directly inspected all ten 949px renders; specialist reviews also inspected desktop/mobile presentations, and Allie inspected representative renders independently.

Additional interaction evidence:

- Professional slice: `/Users/aaron/Documents/ChatGPT/portfolio/output/case-study-revision/professional/`. Price apply/update/remove/reset, price calculation, Escape/focus return, over-$50 approval guard, and the open 320px fly-out passed. All five professional pages passed five-width checks; no broken lazy/disclosure images or runtime errors. Independent axe checks also passed.
- Independent slice: `/Users/aaron/Documents/ChatGPT/portfolio/output/case-study-revision/independent/`. Green Loom's existing interaction test was adapted to the local snapshot: stock consistency/save/reset, empty-search recovery, publication filters, category images, mobile detail/back, and responsive fit passed. All three independent pages also passed desktop/mobile accessibility checks.

See the [professional slice](case-study-professional-slice-2026-10-25.md) and [independent slice](case-study-independent-slice-2026-10-25.md) for their exact coverage and source records. Native disclosures do not require the older site's disclosure script. The essential design argument remains visible outside disclosures and without demos.

## Residual risk

- These checks do not establish a complete screen-reader/assistive-technology audit, usability-study result, hiring outcome, or production-hosting behavior.
- Amazon and Curbside retrospective figures remain project-reported and independently unverified; Price results remain directional; Classroom figures remain confidential. Their meaning and attribution have not been broadened.
- Shapes has no completed validation findings and retains Evidence=2. Design Dash and Many Hats now include documented real author use, but effectiveness/adoption remains unmeasured. Green Loom's completed catalog does not establish retailer deployment, adoption, or legal compliance.
- Original MEOW mentor-training files were not available. Reconstructed prompts and existing conceptual illustrations are labeled. They do not represent historical participant testimony or original training-board screenshots.
- The demos use fictional/sample data. Price does not execute the complete historical manager-approval/whole-order workflow; Green's stock snapshot is not production COA/compliance validation.
- No essential factual gap prevented a sound revision, so no case required a user-input hold. Further empirical evidence can improve future scores; no measurements were invented to meet the threshold.
