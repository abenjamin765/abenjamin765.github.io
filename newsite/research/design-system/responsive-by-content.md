# Break layout when content fails, not when the device name matches

**Claim:** The report says responsive states are `compact`, `medium`, and `expanded`, and that numeric breakpoints stay non-normative until content is tested.

**Sources:** Metro × Apple design-system report (attachment `deep-research-report__11_.md`).

## Evidence

**Borrowed:** Microsoft’s Windows categories, as the report states them: small below 640 effective pixels, medium 641–1007, large 1008 and above. The report says those are evidence and should not be imposed on a cross-platform web or iOS system.

**Prescribed:** Break when the content is no longer usable, not when the viewport matches a named device. Hover may enhance and must not be the only path to an essential action. The CSS example at 40em and 64em is marked “starter reference only.” An open `DESIGN.md` responsive-token proposal is described as mobile-first and content-driven, and as not yet normative.

**Observed:** The decision table says breakpoints are unspecified until product content is tested. Starter values may be provided and are non-normative.

## Disagreement

The homepage notes leave scroll-versus-snap open and do not publish breakpoints (`../visual-identity/palette-type-motion-open.md`). This report also refuses a universal breakpoint. It does not choose snap scrolling.

## Implication for this portfolio

Do not adopt 640, 1008, 40em, or 64em as this site’s layout law. Test the intro and the work rows at the widths where they actually fail.

## Limit

No viewport test of `newsite` is in the source.
