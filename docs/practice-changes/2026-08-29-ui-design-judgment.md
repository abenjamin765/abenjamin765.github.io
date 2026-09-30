---
id: practice-change-ui-design-judgment-2026-08-29
type: practice-change
status: implemented
date: 2026-08-29
owner: liza
related_objects: []
related_evidence: []
related_decisions: []
---

# Practice change: interface design judgment and iteration

## Trigger

The human requested that Many Hats improve its UI design skills using Apple design philosophy, current Human Interface Guidelines, award-winning app examples, and complementary web and industrial-design sources. The resulting research found a reusable gap between valid interface structure and a coherent, distinctive, explainable visual direction.

Evidence synthesis: [`docs/research/apple-informed-ui-design-skills.md`](../research/apple-informed-ui-design-skills.md).

## Actual vs desired

| Field | Description |
| --- | --- |
| Actual behavior | `shape-interface-system` specified hierarchy, components, tokens, states, responsiveness, and accessibility, but did not require design intent, realistic stress fixtures, meaningful alternative directions, perceptual diagnosis, progressive revision, or a traceable selection. |
| Desired behavior | Agents compare and revise context-aware interface directions, explain visible defects and tradeoffs, preserve structural ownership, pass task-level quality gates, and show why the selected direction won. |
| Affected agent / skill | Iris / `shape-interface-system` |
| Pattern scope | portable |

## Scope decision

This is a portable core practice because the gap applies across products and platforms and strengthens an existing promised capability. It is not an Apple-style preference. Apple guidance and award cases inform the principles, while the implementation remains cross-platform. The narrowest responsible change is the existing `shape-interface-system` package and its `interface-direction` artifact; no new top-level skill or agent role is added.

## Evaluation case

Before the change, the prompt “Make this interface Apple-like” could pass while imitating surface treatments and offering no comparative or verification record. After the change, it passes only when the agent translates the request into relevant purpose, platform, hierarchy, interaction, and craft criteria; refuses ungrounded imitation; evaluates representative states; and records a traceable direction decision.

Additional cases cover meaningful direction divergence, lived-in content, defect-led revision, runner-up comparison, motion purpose, exemplar decomposition, end-to-end accessibility, responsive context, and taste disagreement.

## Files changed

- `skills/shape-interface-system/SKILL.md`
- `skills/shape-interface-system/skill.yaml`
- `skills/shape-interface-system/evals/cases.jsonl`
- `skills/shape-interface-system/references/practice/*.md`
- `templates/work/interface-direction.md`
- `docs/skill-provenance.md`
- `docs/practice-changes/2026-08-29-ui-design-judgment.md`

## Compatibility and migration

The skill name, discovery boundary, hosts, runtime requirements, and side-effect policy are unchanged. Existing interface-direction artifacts remain readable; new work should use the expanded template. The new references are conditional, so routine component work does not load the entire design corpus.

An independent forward test on a cross-platform finance dashboard confirmed that the skill produced a purpose-led, comparative, state-aware direction instead of surface imitation. It also prompted clarifications for structural readiness, divergence triggers, cross-platform consistency, unavailable reviewer fallbacks, time-sensitive exemplar verification, and long-list behavior. Finance-specific synchronization and privacy rules remained outside this portable interface skill.

## Side effects

Consequential or novel interface work may produce more comparison and revision evidence. Routine extensions may explicitly skip divergence. The change does not authorize implementation, publication, deployment, or external pull requests.
