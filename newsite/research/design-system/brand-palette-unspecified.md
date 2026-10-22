# Brand color is unspecified

**Claim:** The report defines a token structure and refuses a brand palette. Hex values in its examples are placeholders.

**Sources:** Metro × Apple design-system report (attachment `deep-research-report__11_.md`).

## Evidence

**Observed:** The decision table says brand color is unspecified. The report repeats that the brief specified no brand, so the production accent is intentionally undecided. It labels the CSS hex block and the sample `DESIGN.md` colors as demonstration or placeholders until a palette is defined and contrast-tested.

**Observed examples, not a palette decision:** The sample YAML uses `#005FB8`, `#FFFFFF`, `#F5F5F5`, `#1A1A1A`, `#525252`, `#B42318`. The theme CSS also shows dark-scheme values such as `#111111`, `#1F1F1F`, `#69AFE5`, and `#07131C`. A migration illustration uses `#0078D4`, `#0875C1`, and `rgb(0 120 212)` as legacy blues that should not be declared “correct” on sight.

## Disagreement

`../visual-identity/palette-type-motion-open.md` says the Wall sample cannot choose this site’s palette. This report also does not choose it. It does propose semantic color roles. Those roles are structure, not a yellow-field decision.

## Implication for this portfolio

Do not copy these hex values into `newsite/style.css`. The portfolio notes still leave the yellow intro as described identity, not as a token from this spec.

## Limit

No contrast check of those placeholder hexes is in the report.
