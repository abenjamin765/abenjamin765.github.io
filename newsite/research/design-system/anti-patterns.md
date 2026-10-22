# Anti-patterns the design-system report names

**Claim:** The report’s avoid-list is about cross-platform imitation, chrome, and unstable syntax. It is not a portfolio-gallery finding.

**Sources:** Metro × Apple design-system report (attachment `deep-research-report__11_.md`).

## Evidence

**Prescribed replacements:**

| Anti-pattern | Replacement the report names |
| --- | --- |
| Make Windows look like iOS | WinUI rendering, shared semantics |
| Make iOS look like Metro | Content-first philosophy, native UI layer |
| Glass everywhere | Material only where a layer relationship exists |
| Card everything | Spacing and type first |
| One universal 14 px body | Role-based native type |
| One SVG icon set everywhere | A semantic icon map |
| One fixed grid for every window | Fluid layout and semantic responsive states |
| Placeholder-only fields | Persistent label plus optional placeholder |
| Toast for critical errors | Persistent error or blocking presentation |
| Raw hex inside components | Semantic aliases |
| CSS copies of Apple glass on every platform | `surface-navigation`, resolved by the adapter |
| Treating proposed `DESIGN.md` features as stable | Root schema plus supporting tokens and docs |

## Disagreement

Portfolio “what not to copy” notes cover process diagrams, galleries, tool clouds, open-to-work headlines, and leadership homepages used as an IC template. This table does not replace those. Overlap is only thematic: both warn against decoration that gets in front of the content.

## Implication for this portfolio

The rows that can apply to a single web portfolio are: no glass or cards by default, no placeholder-only fields, no raw “brand” hex treated as decided, and no toast as the only error. The iOS/Windows imitation rows do not apply until those platforms exist.

## Limit

Each row is the report’s judgment, backed by the citations it names, which were not re-fetched.
