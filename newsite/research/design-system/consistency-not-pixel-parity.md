# Three kinds of consistency

**Claim:** The report requires semantic and behavioral consistency, and it does not require pixel-identical UI across platforms.

**Sources:** Metro × Apple design-system report (attachment `deep-research-report__11_.md`).

## Evidence

**Prescribed:** Semantic consistency is required (“primary action” means the same thing). Behavioral consistency is required except for a genuine platform convention (disabled, loading, and destructive states). Visual pixel consistency is not required: a SwiftUI button and a WinUI button need not share radius, font metric, or material.

**Prescribed questions for a change:** what problem it solves; whether it is primitive, semantic, component, or platform-specific; whether accessibility or the behavioral contract changes; whether a platform difference is intentional; whether a migration alias is required; whether it is breaking.

**Prescribed versioning:** SemVer for the design-system package even while `DESIGN.md` the format is alpha. Major for removed tokens, incompatible contracts, or material adapter changes. Minor for new tokens, components, optional variants, or platform mappings. Patch for corrected values, docs, and accessibility fixes that preserve the API. A release, as the report lists it, carries a changelog, a token diff, a visual-regression diff, an accessibility test result, a `DESIGN.md` lint result, and migration notes when needed.

## Implication for this portfolio

This governance model is for a multi-platform system. It does not create a versioning scheme for the newsite page. The part that touches the page is the same idea as the portfolio notes: do not copy another site’s pixels. See `../visual-identity/no-winning-visual-template.md`.

## Limit

The report does not name owners for this portfolio. “≥90% of colors classified” and the other rollout exit numbers are targets in `rollout-is-proposed.md`, not measurements.
