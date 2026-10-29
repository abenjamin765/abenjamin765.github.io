# Nine-case tightening verification

October 25, 2026. Implemented locally under `/newsite`; no publication, build migration, or legacy-site deployment.

## Result

Revised nine cases using the approved Indeed direction: removed 31 chapter-rail labels across eight pages and eight hero jump links; centered narrative and outcomes; shortened repetitive copy and captions; removed reader-facing em dashes. Shapes retains its existing 720px reading measure, while the other revised cases use up to 820px. Interface evidence and diagrams may use the wider case shell.

Price Adjustments now has three chapters, Green Loom four, UX MEOW three, and Design Dash four. Classroom, Curbside, Amazon, Many Hats, and Shapes retain their decision sequence with focused cuts. Essential sample-data, reconstruction, historical-context, and result-population facts remain brief and inline. All pre-existing image source references are retained.

The [new baseline/final scorecards](case-study-tightening-scorecards-2026-10-25.md) are separate from the migration scorecards, which were not overwritten. No score increase comes from invented evidence.

## Verification

- `scripts/test-newsite-cases.cjs`: all ten cases, including Indeed, passed at 320/390/768/949/1440px; images, unique IDs, label targets, local routes and next-case order, keyboard disclosure toggling, 200% text reflow at 320px, reduced-motion content, no-JavaScript content, and WCAG-tagged axe checks. Zero reported violations, page errors, or failed routes.
- Expanded every disclosure in the nine revised cases at 390/1440px; no horizontal overflow. Captured all specialized diagrams, prompt/message models, and demonstrations at those sizes, plus chapter-detail screenshots. Checked all chapter narrative bounds remain inside the viewport.
- Price interaction: apply/update/remove calculations, unchanged totals while drafting, manager-approval guard, invalid quantity, cancel/Escape focus restoration, reset, quantity changes, and open-editor reflow at all five widths passed.
- Green prototype: stock application and consistent quantities, six category image assets, reset, empty-search recovery, publication filters, mobile catalog/detail/back navigation, and responsive fit passed.
- Settled demonstration-state accessibility: catalog, product, variants, stock editor, stock review, and markdown editor passed automated WCAG-tagged checks. Escape/cancel/save focus restoration and stock status announcements passed.
- Static check: no chapter rails, hero jump links, or em dashes in the revised case files; image source sets match their baseline snapshots. Source inspection found no newly invented metric, quote, participant scene, or artwork.
- Homepage HTML, Indeed HTML, Shapes diagram stylesheet, and Price interaction script match their pre-pass SHA-256 values. New layout selectors are scoped to the revised pages; Indeed's CSS behavior is not opted into them. Existing Lucide case navigation remains intact.
- `git diff --check` and `scripts/check_run_packet.py --project folio-case-studies` pass.

Automated scans and desktop browser emulation do not establish complete accessibility or physical-device behavior. This pass includes representative visual inspection; no performance or GPU profiling is claimed.

## Screenshots and structured results

Evidence folder: [case-tightening-2026-10-25](/Users/aaron/Documents/ChatGPT/portfolio/output/case-tightening-2026-10-25).

- [Five-width collection results](/Users/aaron/Documents/ChatGPT/portfolio/output/case-tightening-2026-10-25/results.json) and 50 full-page screenshots.
- [Expanded layouts and diagram results](/Users/aaron/Documents/ChatGPT/portfolio/output/case-tightening-2026-10-25/details/results.json), with chapter and specialized-artifact screenshots at 390/1440px.
- [Demonstration accessibility results](/Users/aaron/Documents/ChatGPT/portfolio/output/case-tightening-2026-10-25/prototype-accessibility.json).
- Representative [Classroom desktop](/Users/aaron/Documents/ChatGPT/portfolio/output/case-tightening-2026-10-25/details/classroom-assignment-management-chapter-1440.png), [Price mobile](/Users/aaron/Documents/ChatGPT/portfolio/output/case-tightening-2026-10-25/details/price-adjustments-artifact-0-390.png), [Many Hats decision trail](/Users/aaron/Documents/ChatGPT/portfolio/output/case-tightening-2026-10-25/details/many-hats-artifact-2-390.png), and [Shapes standards diagram](/Users/aaron/Documents/ChatGPT/portfolio/output/case-tightening-2026-10-25/details/shapes-artifact-3-390.png).

## Evidence debt and outstanding questions

No essential fact blocked this revision, and no new author answer is required to review it. Existing gaps remain recorded in each scorecard: confidential Classroom figures; retrospective professional-case results; unspecified Amazon eligibility circumstances; Green retailer/operator validation; original MEOW training material; and independent evaluation of Design Dash, Many Hats, and Shapes. These gaps were not converted into claims.

## Copy inventory

Main-story word counts include supporting disclosures, figure text, and next-case navigation. They exclude head metadata and scripts. Counts describe the edit, not a target reading length.

| Case | Before | After |
|---|---:|---:|
| Classroom | 643 | 541 |
| Curbside Pickup | 567 | 509 |
| Price Adjustments | 722 | 621 |
| Green Loom | 945 | 781 |
| UX MEOW | 595 | 480 |
| Amazon First Claim | 681 | 594 |
| Design Dash | 1198 | 951 |
| Many Hats | 982 | 770 |
| Shapes | 1623 | 1451 |
