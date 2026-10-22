# Labels stay visible; errors are not color alone

**Claim:** The report says a placeholder cannot be the only label, and an error needs text, an accessibility state, and color only as reinforcement.

**Sources:** Metro × Apple design-system report (attachment `deep-research-report__11_.md`).

## Evidence

**Borrowed:** Fluent, as the report summarizes it, warns against using a placeholder as the substitute for a visible label.

**Prescribed anatomy:** Label, then the field (value or supplementary hint), then helper or error text. The label stays programmatically and visually tied to the control. An error combines a textual description, a semantic accessibility state, an optional icon, and color as reinforcement. The report’s example hint is `name@example.com` under a visible “Email” label.

## Implication for this portfolio

The current Contact panel in `newsite/index.html` is the placeholder word “Hello,” not a form. If a form is added, this rule applies. It does not specify the contact fields.

## Limit

No portfolio homepage in the earlier sources was coded for form labels.
