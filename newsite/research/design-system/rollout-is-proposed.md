# The 30-60-90 rollout is a proposal

**Claim:** The report’s thirty-, sixty-, and ninety-day plan, including its Gantt, is a proposed schedule that assumes a start on 19 October 2026. It is not a fact about this portfolio.

**Sources:** Metro × Apple design-system report (attachment `deep-research-report__11_.md`).

## Evidence

**Prescribed:** Days 0–30: audit, principles, token taxonomy, root `DESIGN.md`, WCAG baseline, component inventory, adapters defined conceptually. Exit examples include at least 90% of existing colors, type, and spacing classified, no unexplained duplicate semantic roles, a linting `DESIGN.md`, and passing pilot contrast tests. Days 31–60: generated tokens, reference components, themes, a pilot of buttons, inputs, navigation, list, and dialog, icon map, motion spec, then keyboard, VoiceOver, Narrator, and touch tests. Days 61–90: remaining components, migration help, docs, CI, a SemVer release, legacy-token sunset. The report says success is semantic convergence, not screenshot similarity.

**Prescribed gates:** Day 30, stop if semantic colors, spacing roles, and primary states cannot be explained. Day 60, stop broad adoption if the pilot only works with a mouse at one viewport. Day 90, measure adoption of stable roles, native feel, automated and manual accessibility tests, and central visual change.

**Observed:** The Gantt title is “Unified Metro × Apple Design-System Rollout,” with tasks from 2026-10-19 through a milestone on 2027-01-17. The report says those dates assume work begins on 19 October 2026 and are a proposed implementation schedule rather than external facts.

## Disagreement

The winning-portfolios report has a different illustrative Gantt for a portfolio rewrite, also starting 2026-10-19 (`../build-priority/schedule-is-illustrative.md`). Same start date, different project. Neither clock is this site’s plan.

## Implication for this portfolio

Do not schedule the intro, work rows, or contact panel on this 90-day design-system rollout.

## Limit

“90% classified” and “majority of active feature development” are exit criteria with no baseline inventory attached.
