# The report adopts WCAG 2.2 AA by criterion

**Claim:** The report sets WCAG 2.2 AA as the baseline even where a store or Windows requirement differs, and it maps a specific set of criteria.

**Sources:** Metro × Apple design-system report (attachment `deep-research-report__11_.md`).

## Evidence

**Borrowed:** The report says WCAG 2.2 is the normative web reference and adds Focus Not Obscured, Dragging Movements, and Target Size. Numeric floors are in `contrast-and-targets.md`. The Quick Reference was not re-read. Citation handles were not resolved.

**Prescribed mapping, as the report states it:**

- 1.4.1 Use of Color: do not rely on color alone.
- 1.4.3 Contrast (Minimum): 4.5:1 ordinary text; 3:1 qualifying large text.
- 1.4.4 Resize Text: usable at 200% text scaling.
- 1.4.10 Reflow: no forced two-dimensional scrolling for ordinary content at the reflow condition.
- 1.4.11 Non-text Contrast: essential control and graphic cues at least 3:1.
- 1.4.12 Text Spacing: no clipping when the user changes spacing.
- 2.1.1 Keyboard: relevant actions keyboard-operable.
- 2.3.1 Three Flashes: no rapid unsafe flashing.
- 2.4.3 Focus Order: focus follows the task.
- 2.4.7 Focus Visible: do not suppress focus without a replacement.
- 2.4.11 Focus Not Obscured: sticky bars and dialogs must not cover the focused control.
- 2.5.1 Pointer Gestures: a simple-pointer alternative where required.
- 2.5.2 Pointer Cancellation: do not commit a destructive action on the initial pointer-down.
- 2.5.3 Label in Name: the accessible name includes the visible text.
- 2.5.4 Motion Actuation: a conventional control besides device motion.
- 2.5.7 Dragging Movements: reordering also works without dragging.
- 2.5.8 Target Size: 24×24 CSS px AA floor where it applies; touch guidance prefers 44×44.
- 4.1.3 Status Messages: toasts, progress, and errors expose status without moving focus by surprise.

Fluent and Apple are cited only as agreeing that accessibility is part of the system, not as a second audit.

## Disagreement

The winning-portfolios report borrowed keyboard, visible focus, and reflow only. It did not list these criterion numbers. Meeting this list is not something the 3/12 accessibility-signal code measured.

## Implication for this portfolio

This is a test list for the page, not copy for the About panel. It is not a result.

## Limit

Exceptions inside WCAG (the report says target size has specified exceptions) are named but not spelled out.
