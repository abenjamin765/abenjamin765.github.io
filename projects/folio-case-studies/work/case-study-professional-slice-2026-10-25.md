---
id: case-study-professional-slice-2026-10-25
type: slice-report
status: verified
date: 2026-10-25
owner: finn
related_objects: []
related_evidence: [evidence-a-to-z-first-claim, evidence-curbside-pickup, evidence-price-adjustments]
related_decisions: []
---

# Professional case-study migration

## Acceptance criteria mapping

| Criterion | Implementation | Status |
| --- | --- | --- |
| Five missing professional cases use latest layout | Hero, cover, contribution/partners/delivery facts, decision-led chapters, explicit outcomes, reflection, local next-case and Work navigation | Complete |
| Narrative prioritizes judgment and ownership | Indeed: behavior vs deduplication; Curbside: app adoption vs service access; Price: interruption/context vs form factor; MEOW: learning vs delivery pressure; Amazon: teaching/coverage vs punitive notification | Complete |
| Evidence and attribution stay honest | Qualitative Indeed results; Curbside pilot boundaries; directional Price impact; shared MEOW outcomes; Amazon program attribution and unverified deck results | Complete |
| Original visual evidence and useful demonstration survive | Existing image paths localized, Price demo rendered from original Pug and copied original logic, readable Amazon reconstruction without seller/buyer names | Complete |
| Readable without JavaScript; accessible essentials | Native disclosures, visible narrative, no-script demo explanation, static Price artifact, accessible labels and keyboard behavior | Checked |
| Local route cycle follows Work order | Indeed → Curbside → Price → Green Loom; MEOW → Amazon → Dash; every case links to local Work and Home | Checked against filesystem |

## Files changed

- `newsite/indeed-job-refresh.html`
- `newsite/curbside-pickup.html`
- `newsite/price-adjustments.html`
- `newsite/home-depot-design-leadership.html`
- `newsite/a-to-z-first-claim.html`
- `newsite/assets/cases/professional.css`
- `newsite/assets/cases/markdown-demo.css`
- `newsite/assets/cases/price-markdown-demo.js`

Shared CSS, homepage, Work links, asset bulk copy, rubric and scorecards are owned by the coordinating task. Legacy source files and deployment are untouched.

## Verification

- Temporary Express/Puppeteer server served repository source; no publishing or external mutations.
- 25 responsive combinations: five cases × 320, 390, 768, 949 and 1440px. No horizontal overflow. Forced all lazy/disclosure images to load: no broken images.
- Automated axe WCAG 2 A/AA, 2.1 AA and 2.2 AA checks found zero violations on all five cases; repeated on Price following updates/reset under reduced motion.
- All five cases retained introduction, decision chapters and outcomes with JavaScript disabled at 390px; no overflow.
- Enlarged main text to 200% at 390px: no horizontal overflow on all five pages. This is a text-enlargement check, not a claim that every browser's zoom setting was simulated.
- Price interaction: keyboard menu launch; apply ($15 total), update ($30 total), remove ($0), reset ($0), Escape restores originating more-actions control; valid markdown totaling more than $50 blocks apply with approval message. The open fly-out stays within the 320px viewport.
- Every image/script/stylesheet and local page href resolves on disk. CSS demo background path changed from legacy absolute URL to `../img/folio/...`.
- Inspected mobile Indeed and Price renders for composition and readable order. Other screenshots are available for final reviewer inspection.
- Headings and final source reviewed against original Pug, canonical project catalog, project evidence, and author-confirmation notes. Amazon role follows current confirmed UX Designer II title.
- First navigation attempts waited for network-idle and intermittently timed out. Repeated with explicit DOM readiness, external requests blocked, and image decode; final checks completed. No remote font or dependency was introduced.

Evidence: `/Users/aaron/Documents/ChatGPT/portfolio/output/case-study-revision/professional/` contains ten desktop/mobile screenshots, `checks.json`, and `extra-checks.json`.

## Residual risk

- Automated accessibility checks do not replace a complete assistive-technology review.
- Amazon/Curbside retrospective deck metrics remain independently unverified; Price magnitudes and SUS value are unavailable. The pages state those limits.
- UX MEOW lacks an original mentor board/training document in the supplied assets. Its model and prompts are labeled illustrative/reconstructed; no invented participants or production launches.
- The Price demonstration reconstructs item-level behavior with sample products/prices; it is not the complete manager-approval or whole-order workflow. A static artifact and explanatory prose preserve the design argument without JavaScript.
- Old stakeholder records and career evidence differ in title vocabulary; role names use the confirmed career/project catalog and do not imply historical screenshots establish canonical titles.

## Deferred work

No essential evidence gap required pausing these five migrations. Independent final scoring and integrated navigation verification are coordinated by Liza and Allie. Publication remains a separate action.
