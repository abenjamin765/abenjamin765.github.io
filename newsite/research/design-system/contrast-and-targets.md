# Contrast ratios and target sizes

**Claim:** The report sets a WCAG 2.2 AA contrast baseline and separates a 24×24 CSS-pixel floor from a stronger 44×44 touch target.

**Sources:** Metro × Apple design-system report (attachment `deep-research-report__11_.md`).

## Evidence

**Borrowed:** W3C, as the report states it: at least 4.5:1 for ordinary text, 3:1 for qualifying large text, and generally 3:1 for non-text UI indicators such as necessary control boundaries and meaningful graphics. Fluent’s text guidance is described as the same 4.5:1 and 3:1. WCAG 2.2 AA target size is stated as 24×24 CSS pixels with specified exceptions. Apple’s touch minimum is stated as about 44×44 points. The report also maps criteria including Use of Color, Resize Text, Reflow, Focus Visible, Focus Not Obscured, Dragging Movements, and status messages. Those mappings were not re-read on W3C’s site.

**Prescribed:** `text-primary` on a normal surface ≥ 4.5:1. Secondary text still ≥ 4.5:1 when it carries essential normal-size information. Focus and essential icons ≥ 3:1. Disabled state is not low contrast alone. Status is not hue alone. Glass must be checked against worst-case backdrops or given an opaque or high-contrast fallback. Touch targets ≥ 44×44 where touch is primary. Do not require every desktop button to be 44×44 CSS pixels.

**Inferred (report):** A token-to-token contrast math is not always enough for translucent material, because the backdrop changes.

## Disagreement

Inside this report, the sample `DESIGN.md` sets `button-primary` `height: 44px`, while the prose says pointer-only desktop controls may use platform density and need not all be 44 CSS pixels. The prose is the rule; the YAML height is a starter field, not a repeal of that exception.

The winning-portfolios report only borrowed keyboard, focus, and reflow (`../accessibility/baseline-stronger-than-the-sample.md`). It did not state 4.5:1, 24×24, or 44×44. Those numbers are not a finding about the 12 sites.

## Implication for this portfolio

Intro, Experience, Work, About, and Contact can be checked later against 4.5:1 for essential text and a visible focus style. This file does not report that check. The nav is pointer and keyboard on a portfolio site; 44×44 is the touch rule, not an automatic size for every nav label.

## Limit

No contrast measurement of the yellow intro, the portrait, or `style.css` is in the source.
