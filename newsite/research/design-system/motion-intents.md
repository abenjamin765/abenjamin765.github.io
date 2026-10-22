# Motion is an intent, with Fluent timing only as a web reference

**Claim:** The report tokenizes motion by intent. Fluent durations are the web and Windows reference, not a replacement for native Apple animation.

**Sources:** Metro × Apple design-system report (attachment `deep-research-report__11_.md`).

## Evidence

**Borrowed:** Fluent global durations the report attributes to current Fluent UI token source: ultra fast 50 ms, faster 100 ms, fast 150 ms, normal 200 ms, gentle 250 ms, slow 300 ms, slower 400 ms, ultra slow 500 ms. Curves it attributes to Fluent globals: standard `cubic-bezier(0.33, 0, 0.67, 1)`, enter `cubic-bezier(0.1, 0.9, 0.2, 1)`, exit `cubic-bezier(0.9, 0.1, 1, 0.2)`. Apple, as summarized, prefers purposeful motion and system transitions. The `filecite` handles for the token files were not opened here.

**Prescribed semantic durations:** `motion.feedback` 100 ms, `motion.fast` 150 ms, `motion.standard` 200 ms, `motion.deliberate` 300 ms, `motion.slow` 400 ms. Reduced motion is mandatory: drop parallax, large travel, decorative loops, and nonessential transforms; use an immediate change or a short fade when a transition is still useful.

## Disagreement

The portfolio reports say motion must not gate the work and do not choose a duration (`../what-not-to-copy/interaction-must-not-gate-evidence.md`, `../visual-identity/palette-type-motion-open.md`). This file adds timings for a design system. It does not measure the intro’s motion, and it does not require the portrait or the word “complicated” to animate.

## Implication for this portfolio

If the intro moves, the change should be skippable under reduced motion and should not be the only way to read Work. The millisecond table is a reference, not a spec for this page.

## Limit

Eight Fluent durations were simplified by the report to five intents. That simplification is the author’s.
