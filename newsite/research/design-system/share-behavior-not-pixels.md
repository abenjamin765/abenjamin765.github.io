# Components share behavior and tokens, not pixels

**Claim:** The report unifies a component at three levels: behavioral contract, semantic tokens, and platform-specific rendering.

**Sources:** Metro × Apple design-system report (attachment `deep-research-report__11_.md`).

## Evidence

**Prescribed:** “Same component” does not mean “same rectangle.” Button intents are `primary`, `secondary`, `quiet`, and `destructive`, with one primary emphasis per local decision, distinct rest, hover where relevant, pressed, focus, disabled, and busy states, and destructive styling only for destructive actions. A public API should not expose `liquidGlass` or `fluentAccentButton`.

**Prescribed for other controls, in brief:** Data-entry fields keep persistent labels. Search may use the platform search affordance. Lists share row anatomy (leading icon, title, optional secondary text, trailing affordance) and use native density. Popovers are for contextual content anchored to a source, not a major workflow. Menus need native semantics, keyboard access, and standard dismissal.

The React, SwiftUI, and WinUI listings in the report are examples of that split. They are not copied here as implementation for this site.

## Implication for this portfolio

The site’s nav buttons are page sections, not this button taxonomy. If a control is added, the report’s bar is a visible name, a focus state, and one primary action per decision, rendered for the web.

## Limit

The report did not audit `newsite` components. There is no component inventory in the portfolio notes.
