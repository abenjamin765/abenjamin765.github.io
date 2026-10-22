# Navigation is a role, not one widget

**Claim:** The report says to name navigation by role and choose the widget from the platform and the available space.

**Sources:** Metro × Apple design-system report (attachment `deep-research-report__11_.md`).

## Evidence

**Prescribed roles:** `navigation.primary`, `navigation.secondary`, `navigation.contextual`, `navigation.history`, `navigation.utility`. It explicitly rejects `navigation.tab-bar-everywhere`, `navigation.windows-pivot`, and `navigation.left-sidebar-always`.

**Borrowed:** Apple navigation, as summarized, adapts among tabs, sidebars, and split views. Windows guidance, as summarized, allows replacing one navigation presentation when space changes. The report’s example: bottom or tab navigation in compact layouts, sidebar when space allows.

## Disagreement

`newsite/index.html` uses one text nav for Intro, Experience, Work, About, and Contact. The homepage notes want those labels short (`../navigation/short-nav-labels.md`). This report does not say a portfolio must become a tab bar on small screens. It forbids assuming one widget forever. The portfolio notes do not choose scroll versus snap, and they do not choose a compact nav pattern.

## Implication for this portfolio

Keep the five destinations understandable. A second visual pattern at a narrow width is not required by the Wall notes. If the nav changes shape, the report’s bar is that the role stays the same and the work remains reachable without a pointer-only hover.

## Limit

The report’s compact, medium, and expanded thresholds are explicitly non-normative. See `responsive-by-content.md`.
