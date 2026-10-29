---
id: slice-report-case-study-independent-2026-10-25
type: slice-report
status: accepted
date: 2026-10-25
owner: finn
related_objects: []
related_evidence:
  - evidence-green-loom-status
related_decisions:
  - decision-separate-lab-result
  - decision-schema-separate-from-retail
---

# Independent project case-study migration

## Acceptance criteria mapping

| Criterion | Implementation | Status |
| --- | --- | --- |
| Latest standalone layout | Green Loom, Design Dash, Many Hats use case hero, facts, labeled chapters, status, reflection, local next-case navigation, and shared case-study.css. Specialized presentation is scoped by independent-page. | Complete |
| Supported narrative | Original Pug sources supplemented by October 2 author-confirmed narrative notes; actual use separated from fictional demonstrations and future evaluation. | Complete |
| Existing craft preserved | Green Loom sample wireframes, catalog/work-path/schema illustrations and isolated stock interaction; Design Dash object illustration and semantic artifact flows; Many Hats role and decision-trail diagrams. | Complete |
| Clear status and limitations | No retailer adoption/compliance claim, no measured Many Hats gains, no SONAR predictive accuracy or user-effectiveness claim. | Complete |
| Local runtime dependencies | Green snapshot copied under newsite/prototypes/green-loom; image URLs made relative to local assets; six category snapshots preserved. | Complete |
| Readability/accessibility | Single h1; decision conclusions visible; details are supplementary, nonempty native disclosures; no script required for narrative. | Checks below |

## Files changed

- newsite/green-loom.html
- newsite/design-dash.html
- newsite/many-hats.html
- newsite/assets/cases/independent.css
- newsite/prototypes/green-loom/{index.html,prototype.js,prototype.css,polish.css,README.md,upstream-snapshot.json}
- newsite/assets/img/folio/project--green-loom/products/responsive/*-240.webp (six unchanged image snapshots)

No src, dist, homepage, Work, global CSS, or older-site files changed by this slice.

## Evidence and editorial decisions

- Green Loom: canonical September evidence was checked against `/Users/aaron/Documents/ChatGPT/portfolio/green-loom-story-notes.md`. The October 2 direct confirmation explicitly supersedes designed-only framing and includes working COA import/publication blocks. Deployment, retailer use, comprehensive legal compliance, and measured operator outcomes remain unestablished. Regulatory references are framed as historical project constraints, without restating current legal requirements.
- Design Dash: `/Users/aaron/Documents/ChatGPT/portfolio/design-dash-story-revised.md` records the Aegis → SONAR solo run, narrowed prediction language, viewing-prior controls, target selection, competing concepts, engine-first dependency check, and later implementation trail. The Renaissance workshop use is separate. The fictional tool-library artifact remains labeled. New evaluation suggestions are explicitly proposed.
- Many Hats: `/Users/aaron/Documents/ChatGPT/portfolio/many-hats-story-notes.md` and revised story establish author use at Renaissance, Green Loom, and this portfolio. Personal improvements are qualitative and unmeasured; no company-wide adoption is implied. The Library Holds demonstration remains fictional, with critique and response visible. Corrected the old empty disclosure structure by nesting its substantive implementation detail inside the native details element.

## Verification

- Local preview on port 8771, isolated from the user preview.
- All three pages checked at 320, 390, 768, 949, and 1440px: no horizontal overflow; one h1; all image sources loaded after forcing lazy images into the test.
- Axe-core WCAG 2 A/AA, 2.1 AA, and 2.2 AA tag checks at 390 and 1440px: zero reported violations in all six page/viewport runs.
- All three narrative pages remain available with JavaScript disabled; zero runtime page errors in the enabled runs.
- Green Loom existing interaction test adapted to serve newsite (no production rebuild): stock quantity consistency, save, reset, empty-search recovery, publication tabs, six category images, mobile detail/back navigation, responsive 240/320/390/768/1100px fit, and zero runtime errors passed.
- Screenshot set: `/Users/aaron/Documents/ChatGPT/portfolio/output/case-study-revision/independent/` (390 and 1440px per case). Full-page screenshots require explicitly loading lazy images/iframe before capture; narrative check does this for images, while iframe behavior is separately tested.
- Parent owns integrated routing, enlarged-text/reduced-motion and full-collection verification, and independent final scorecards.

## Residual risk

The real-use narratives establish use and a decision trail, not independent user outcomes. Wireframes and explanatory images are labeled; visual polish cannot resolve missing adoption/effectiveness evidence. The Green prototype is an isolated snapshot, not production catalog validation or COA/compliance proof. Automated accessibility checks do not replace assistive-technology review.

## Deferred work

Broader operator validation, external Design Dash usefulness/adoption, independent Many Hats effectiveness, and deployment remain unestablished. No publication was performed.
