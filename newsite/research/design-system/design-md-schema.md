# DESIGN.md is alpha and the schema is narrow

**Claim:** The report says the `DESIGN.md` schema can carry colors, typography, radius, spacing, and a short list of component properties. Richer intent stays in prose and side files.

**Sources:** Metro × Apple design-system report (attachment `deep-research-report__11_.md`).

## Evidence

**Borrowed / observed from the report’s reading of the repo:** The format is alpha. Recognized section order: Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, and Do’s and Don’ts. Unknown sections can be preserved; the linter cares about the recognized order. Component properties it says the linter validates are `backgroundColor`, `textColor`, `typography`, `rounded`, `padding`, `size`, `height`, and `width`. The linter also checks references and component foreground/background contrast. Export to Tailwind and DTCG is claimed. Motion, themes, responsive primitives, iconography, and structured elevation are open, not first-class. Multi-file scoping is unresolved. The report cites `https://github.com/google-labs-code/design.md` and `filecite` handles that are not expanded here.

**Prescribed:** One root `DESIGN.md` today, plus `tokens/*.json`, `docs/design/` guidance, and generated CSS, SCSS, Swift, and WinUI outputs. Do not pretend proposed syntax is stable. Supporting files the report assigns: principles, accessibility, responsive behavior, iconography, motion, theming, component contracts, Apple, Windows, and web platform notes, governance, and migration. Motion, iconography, input modes, and responsive implementation stay in those docs until the schema has a stable place for them.

**Prescribed CI, not run here:** `npx @google/design.md lint DESIGN.md`, `npx @google/design.md diff` against a previous file, and `npx @google/design.md export --format dtcg`. The report says the repo already offers lint and diff. This library did not execute them.

## Implication for this portfolio

`newsite/` is hand-written HTML and CSS. This file does not require adding a `DESIGN.md` to the portfolio. It is the constraint if someone later encodes this site’s visual decisions in that format.

## Limit

This library did not run `npx @google/design.md lint` and did not confirm the schema against the repo.
