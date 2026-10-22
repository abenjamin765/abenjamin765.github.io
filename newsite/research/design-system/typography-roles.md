# Share type roles, not one numeric ramp

**Claim:** The report says a single cross-platform type ramp is the wrong abstraction. Roles are shared; metrics follow the platform.

**Sources:** Metro × Apple design-system report (attachment `deep-research-report__11_.md`).

## Evidence

**Borrowed:** Fluent treats typography as platform-sensitive. Apple’s guidance, as summarized, centers system type and Dynamic Type. The report’s comparison example: Windows body around Segoe UI 14/20, Apple mobile Body around 17/22, web reference 16/24. It says not to force 14 px onto iOS for pixel parity.

**Prescribed web starters, labeled as starters rather than Apple or Microsoft mandates:** `display` 48/56, `title-lg` 32/40, `title-md` 24/32, `heading` 20/28, `body` 16/24, `body-sm` 14/20, `label` 14/20 at weight 500, `caption` 12/16.

**Prescribed rules:** Sentence case for controls and navigation. Do not depend on all-caps for structure. Do not encode hierarchy with size alone. Body must resize and reflow. Apple code should use dynamic text styles; Windows code should use platform text styles.

## Disagreement

The Wall notes do not choose a type ramp for this site (`../visual-identity/palette-type-motion-open.md`). These starters are the design-system report’s web reference, not a measurement of featured portfolios and not a decision for the intro’s display word.

## Implication for this portfolio

If type is systematized later, name roles (`title`, `body`, `caption`) before locking the intro to one of these sizes. The 48/56 display line is a starter for marketing or hero type in that system, not an instruction to resize “Hello.”

## Limit

“Around 17/22” is the report’s wording. It does not publish Apple’s full type spec.
