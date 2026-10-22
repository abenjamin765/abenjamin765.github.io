# Palette, type, motion, and scroll are still open

**Claim:** The homepage notes say the sample cannot decide palette, type, motion, or whether panels scroll or snap.

**Sources:** Wall of Portfolios notes (`newsite/research.md`). A later design-system spec disagrees about structure, not about this site’s brand.

## Evidence

**Inferred (homepage notes):** Those are design choices. The sample only says the first screen should be identifiable in one glance and specific in one sentence, and that the work should be the next thing a visitor can read.

**Related report items, which are not a palette decision:** Motion should be controllable and should not gate content (P1). Hero videos and images should not make evidence painfully slow to reach (P1). Bespoke interaction is P2, after conventional navigation is excellent. Accessibility reflow is a separate baseline. See `../accessibility/baseline-stronger-than-the-sample.md`.

## Disagreement

The Metro × Apple report (`../design-system/brand-palette-unspecified.md`, `../design-system/typography-roles.md`, `../design-system/motion-intents.md`, `../design-system/responsive-by-content.md`) prescribes semantic type roles, a 4-unit spacing reference, and motion intents for a cross-platform system. It also says brand color and breakpoints are unspecified, and its hex values and 40em/64em queries are starters. That does not choose this portfolio’s palette, the intro’s type, or scroll versus snap. The Wall sample still does not decide those.

## Implication for this portfolio

This library does not pick colors, type, or a scroll model for `newsite/style.css`. It does say motion must not be the only way to read the work.

## Limit

The report never saw the yellow intro. Its motion and performance checks are general, not a critique of this design.
