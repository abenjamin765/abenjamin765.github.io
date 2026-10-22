# The report’s baseline is stricter than the sample

**Claim:** The report recommends a stronger accessibility baseline than the 3/12 signaling rate, because the site is supposed to demonstrate UX judgment.

**Sources:** Winning-portfolios report (attachment `deep-research-report__10_.md`).

## Evidence

**Inferred:** For a portfolio intended to demonstrate UX judgment, the baseline should be stronger than the sample norm.

**Borrowed:** Keyboard access, visible focus, and reflow, as W3C guidance summarized by the winning-portfolios report. P1 checks: no horizontal content failure at narrow widths or zoom; every actionable element works without a mouse and focus is visible; motion is controllable and does not gate content.

**Not this sample:** A later design-system report states WCAG 2.2 AA criterion numbers, 4.5:1 and 3:1 contrast, a 24×24 CSS-pixel floor, and a 44×44 touch target (`../design-system/wcag-22-aa-baseline.md`, `../design-system/contrast-and-targets.md`). Those figures were not part of the 12-site code.

**Inferred:** A portfolio claiming user-centered design while trapping keyboard users, hiding focus, breaking at zoom, or forcing motion is a credibility contradiction.

## Implication for this portfolio

These P1 checks apply to Intro, Experience, Work, About, and Contact as implementation tests. They are not a reason to add an accessibility badge to the hero.

## Limit

The recommendation is normative. The sample does not show that Wall winners meet it. The report says the accessibility items are not aesthetic refinements.
