# Classroom: current-state story and restored prototype

October 26, 2026. Local revision requested after the nine-case editorial tightening.

## Story

Rebuilt the opening around a three-panel illustration of the original teacher workflow: see a completion count, leave Assignments, then find named students in a product report. It uses the approved Indeed storyboard as the visual reference. The top cover now explains the problem rather than showing the finished solution before the reader understands it.

The narrative now follows:

1. The hub brought assignments together, but teachers still needed separate reports to identify students. The opportunity was to complete that task inside the hub.
2. Ten-teacher sessions informed urgency groups and expandable student detail. The working prototype immediately demonstrates those decisions.
3. Student IDs, a shared assignment model, a focused release boundary, and API pre-filtering explain delivery.
4. Six-week delivery and fewer report exits over 60 days remain the existing outcome, with confidential adoption figures.

The count image and original assignment screenshot are supporting detail. The early wireframe remains available after the prototype. No new metric, participant quotation, or research scene was added. The illustrated sequence explains the documented workflow; it is not presented as an original research artifact. Its description is in alt text.

## Restored prototype

Restored the existing `src/includes/assignment-comparison.pug` and `assignment-demo.pug` markup, behavior from `src/assets/js/assignment-demo.js` and `assignment-comparison.js`, and scoped presentation from `_folio-demo.scss`. Rendered the fragment and compiled its style directly into local `/newsite` dependencies; no legacy source, deployment, or global legacy style is required.

- After is selected by default, so readers encounter the solution first. Before remains available for comparison.
- Urgency groups and assignments expand/collapse; opening a different assignment closes the prior one. Student names, urgency, and results are sortable.
- Sample student names/results are labeled once above the solution. Missing result cells read “Not available.”
- Keyboard tabs, arrow/Home/End comparison navigation, focus outlines, reduced-motion handling, and native no-JavaScript disclosures remain available.
- Added local screen-reader-caption positioning to prevent hidden captions from expanding the page when the Before table scrolls on small screens.

The prototype omission in the earlier `/newsite` migration is corrected. The current rubric assessment remains 83.75/100; the restoration improves inspectability without creating new project-outcome evidence.

## Verification

- `scripts/test-classroom-case.cjs`: 320/390/768/949/1440px, After default, group/assignment disclosure behavior, name sorting in both directions, result sort selection, tab navigation and inactive-panel focus exclusion, before/after automated WCAG checks, enlarged text, reduced motion, and no-JavaScript native operation all passed.
- `scripts/test-newsite-cases.cjs`: all ten pages passed the existing five-width collection checks, images, local navigation, unique identifiers, keyboard disclosures, accessibility, enlarged text, reduced motion, and no-JavaScript reflow.
- Opening and solution screenshots inspected at desktop/mobile sizes. No page errors or automated accessibility violations were reported.
- `git diff --check` and project run-packet validation passed. No publication performed.

Evidence: [Classroom story review](/Users/aaron/Documents/ChatGPT/portfolio/output/classroom-story-2026-10-26). [Prototype results](/Users/aaron/Documents/ChatGPT/portfolio/output/classroom-story-2026-10-26/classroom-prototype-results.json), [collection results](/Users/aaron/Documents/ChatGPT/portfolio/output/classroom-story-2026-10-26/results.json), [desktop solution](/Users/aaron/Documents/ChatGPT/portfolio/output/classroom-story-2026-10-26/solution-1440.png), [mobile opening](/Users/aaron/Documents/ChatGPT/portfolio/output/classroom-story-2026-10-26/opening-390.png).

## Generated asset and prompt

Generated with the built-in image-generation tool using the existing Indeed storyboard as a style/composition reference, then copied unchanged into the project.

Saved asset: [teacher-current-state-storyboard-v1.png](/Users/aaron/Sites/abenjamin765.github.io/newsite/assets/img/folio/project--assignment-management/teacher-current-state-storyboard-v1.png). 1536 × 1024 PNG. Original generated file remains at `/Users/aaron/.codex/generated_images/01a169b4-c07f-7672-89ab-9763d86d2e91/exec-3a273449-db17-414e-9f66-9941ff8e1997.png`.

Final prompt:

> Create a NEW three-panel storyboard for a portfolio case study about teacher assignment management. The supplied Indeed storyboard is a STYLE AND COMPOSITION REFERENCE ONLY. Match its hand-drawn black marker linework, restrained red handwritten labels, very pale blush shading, warm off-white paper, simple faceless user at a desktop monitor, and three equal panels arranged left-to-right. Landscape aspect around 3:2, crisp legible lettering. No STORYBOARD label, no disclaimer, no footer, no logo, no invented quotes, no student faces. This illustrates the CURRENT problematic workflow, not the solution. Across the top use only these metadata blocks: 'USER:' / 'Teacher reviewing assignments' and 'SCENARIO:' / 'Find students who need help'. Panel 1: teacher looking at a desktop screen with an assignment list and a prominent simple '11/16 complete' count. No student names visible. Caption beneath panel in red: '1. SEE A COUNT' and black explanatory line: 'Who are the students behind it?' Panel 2: same teacher opening a separate product report on monitor, show two simple overlapping windows labeled 'Assignments' and 'Product report' with a red directional arrow from Assignments to Product report. Caption red: '2. LEAVE THE PAGE' and black: 'Open a separate product report.' Panel 3: same teacher at monitor with a simple report showing three generic student rows and progress indicators, no invented real names or grades; one row highlighted with red outline. Caption red: '3. FIND WHO NEEDS HELP' and black: 'Connect the names to their progress.' Make all three scenes readable at website cover size. Keep the final third panel a separate report, NOT an integrated assignment solution. Generous margins. Draw the narrative and captions exactly as described.


## Follow-up: browser cleanup

Removed the visible prototype reconstruction/sample-data note and the After-panel explanatory sentence at Aaron’s request. Removed both the original-assignment-view and early-layout-exploration disclosures, including their contents. The Before comparison tab and working solution remain available. Focused regression evidence is in `/Users/aaron/Documents/ChatGPT/portfolio/output/classroom-cleanup-2026-10-26/`.
