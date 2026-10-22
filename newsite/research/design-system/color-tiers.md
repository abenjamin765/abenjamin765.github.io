# Color runs primitive, then semantic, then component

**Claim:** The report says components never consume raw palette colors. They consume semantic roles, which may point at primitives.

**Sources:** Metro × Apple design-system report (attachment `deep-research-report__11_.md`).

## Evidence

**Borrowed:** Fluent separates global palette tokens from semantic aliases. Apple’s dynamic system colors, as summarized, must survive Dark Mode and context rather than mean one RGB triplet.

**Prescribed chain:** Primitive (`palette.blue.60`) → semantic (`color.action.primary`) → component (`button.primary.background`). Native adapters may resolve a semantic role to a platform color API instead of a literal.

**Prescribed names:** Lowercase kebab-case in flat `DESIGN.md`; dotted paths in DTCG JSON; purpose, not appearance; no platform name inside a shared semantic token; state last (`button.primary.background.hover`); inverse text as something like `color.text.on-accent`; never `gray-600` as a semantic role; `brand-*` reserved and currently unspecified.

## Implication for this portfolio

`newsite/style.css` is not this token system. If colors are named later, name the job (`text`, `surface`, `action`) rather than pasting a palette step into a component rule. Do not invent the brand step. See `brand-palette-unspecified.md`.

## Limit

The report’s DTCG JSON and CSS custom properties are examples of this chain. They are not checked in this repo.
