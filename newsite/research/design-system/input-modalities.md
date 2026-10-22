# Inputs the report treats as normal

**Claim:** The report says touch, pointer, keyboard, voice, and assistive technology are all in scope, and hover must not be the only path to an essential action.

**Sources:** Metro × Apple design-system report (attachment `deep-research-report__11_.md`).

## Evidence

**Borrowed:** Apple touch targets about 44×44 pt; separate pointing-device guidance; keyboard and full keyboard access; Voice Control and Siri should not depend on visual position alone; test VoiceOver. Windows, as summarized: touch, mouse, keyboard, pen, touchpad, and speech are normal inputs; access keys are called accessibility and productivity affordances; test Narrator and full keyboard operation. Exact pages were not re-opened. Handles such as `turn27search0` stay unresolved.

**Prescribed:** No hover-only essential path. Logical focus order and a visible focus. Accessible name describes the intent. Semantic role, name, value, state, and reading order must be right.

## Implication for this portfolio

The nav and any later contact control should work from the keyboard with a visible focus, which the portfolio report already asks (`../accessibility/baseline-stronger-than-the-sample.md`). VoiceOver, Narrator, and Siri are not tests this library ran.

## Limit

The report did not test `newsite`. “Where applicable” is the report’s own limit on keyboard coverage.
