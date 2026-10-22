# Metro as philosophy, Fluent as implementation, Apple as adaptation

**Claim:** The report says the useful combination is architectural: Metro as the philosophical layer, Fluent 2 as the current Microsoft implementation layer, and Apple HIG as the native-platform adaptation layer.

**Sources:** Metro × Apple design-system report (attachment `deep-research-report__11_.md`).

## Evidence

**Inferred:** A literal hybrid of flat Metro tiles, Fluent depth, rounded Apple controls, and Liquid Glass would be an incoherent collage. Metro is not Microsoft’s current production system. The report names Fluent 2 as the contemporary reference and says copying Windows Phone Panorama or Pivot navigation into a 2026 Apple app would be nostalgia.

**Borrowed:** Metro principles the report quotes as Microsoft’s original articulation: “Clean, Light, Open and Fast,” “Celebrate Typography,” “Alive in Motion,” “Content, Not Chrome,” and “Authentically Digital.”

**Prescribed:** Do not encode every platform detail in one YAML file. Prefer a spec-conformant root `DESIGN.md` plus supporting docs and tokens, because motion, themes, responsive primitives, iconography, and structured elevation are not yet first-class in that alpha schema.

## Implication for this portfolio

This site is one web page, not a SwiftUI or WinUI product. The layer that can apply is the content-first philosophy, not a three-platform adapter set.

## Limit

The report does not show that this three-layer split was used by any portfolio in the Wall sample.
