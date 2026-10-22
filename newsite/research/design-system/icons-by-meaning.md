# Icons share a meaning, not one SVG

**Claim:** The report says to token the icon’s meaning and size role, then map it to SF Symbols, Fluent icons, or a web equivalent.

**Sources:** Metro × Apple design-system report (attachment `deep-research-report__11_.md`).

## Evidence

**Borrowed:** SF Symbols and Fluent icons differ in geometry, weight, bounding box, and sometimes metaphor. Apple describes SF Symbols as integrated with system type, as the report summarizes it.

**Prescribed names:** `icon.add`, `icon.back`, `icon.close`, `icon.delete`, `icon.edit`, `icon.error`, `icon.info`, `icon.menu`, `icon.more`, `icon.search`, `icon.settings`, `icon.success`, `icon.warning`, plus `icon.size.sm`, `icon.size.md`, `icon.size.lg`. Custom icons are allowed when a system metaphor is inadequate, and should stay simple at the intended size.

**Observed limit in the report:** `DESIGN.md` has no finalized first-class icon schema. An open proposal is described as prose-first. The report puts the map in supporting docs and `tokens/icon-map.json`, not in an off-spec root key.

## Implication for this portfolio

The newsite nav is text labels (Intro, Experience, Work, About, Contact), not this icon map. Do not add a shared SVG set to match SF Symbols.

## Limit

No mapping table from these names to specific symbol identifiers is in the report.
