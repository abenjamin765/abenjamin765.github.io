# Dark mode remaps roles; it does not invert the page

**Claim:** The report forbids `filter: invert(1)` as a dark theme. Semantic roles remap, and high contrast and reduced transparency are environment dimensions.

**Sources:** Metro × Apple design-system report (attachment `deep-research-report__11_.md`).

## Evidence

**Borrowed:** Fluent supports light, dark, high-contrast, and brand-oriented semantic tokens, as the report summarizes it. Apple Dark Mode expects appearance-aware color rather than naive inversion. Apple materials can also follow content and the user’s transparency setting, not only light and dark.

**Prescribed:** Theme `surface-navigation` and text roles. Include `highContrast` and `reducedTransparency` as environment dimensions, not as an afterthought theme. The hex pairs in the report’s CSS are labeled demonstration only.

**Observed:** Current `DESIGN.md` has no finalized first-class multi-theme syntax; an open issue tracks the gap. The report puts theme modes in supporting DTCG tokens until that is stable.

## Implication for this portfolio

The newsite intro is described by the homepage notes as a yellow field. This report does not supply a dark-mode palette for that field. If a dark theme is added later, remap roles instead of inverting the portrait and the type.

## Limit

The report does not say this portfolio needs a dark theme. The Wall catalog’s “dark themed” count is a different source (`../visual-identity/catalog-browses-by-look.md`).
