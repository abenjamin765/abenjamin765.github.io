# Spacing, radius, and depth are roles

**Claim:** The report uses a 4-unit spacing reference, semantic radii that may change by platform, and depth only for real layers.

**Sources:** Metro × Apple design-system report (attachment `deep-research-report__11_.md`).

## Evidence

**Borrowed:** Fluent’s rhythm is described as 4-unit, with 2, 6, and 10 also used for icon alignment. Apple layout, as summarized, leans on native margins, safe areas, and intrinsic control metrics. A rigid 8 px grid is called too inflexible.

**Prescribed:** Base quantum `4`, with `2` as a micro-alignment exception. Core ramp listed: 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48. Custom UI can use that ramp. An Apple navigation bar’s internal padding is not rebuilt to fit it. Radius is a role (`radius.control`, `radius.container`). The report says `radius.control` might be 4–6 px in a branded web or Windows theme and should follow native control shape on Apple. Cross-platform radius parity is not a KPI. Elevation is for actual layering; content hierarchy should use spacing, type, and tone first.

## Implication for this portfolio

These ramps do not restyle the intro. If spacing is tokenized later, the report’s point is a shared step size, not a requirement to match WinUI or SwiftUI.

## Limit

The sample `DESIGN.md` also shows radii of 4, 8, 12, and 9999 px. That file is a starter. The prose forbids treating radius parity as the goal.
