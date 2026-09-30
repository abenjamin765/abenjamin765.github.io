---
name: shape-interface-system
description: Design or audit a cohesive product interface system across hierarchy, components, interaction patterns, tokens, responsive behavior, and accessibility. Use for UI refactors, design-system work, component selection, interaction-heavy screens, or high-fidelity interface direction; do not use before the underlying flow and information structure are sufficiently defined.
---

# Outcome

Produce an implementable interface direction whose purpose, visual grammar, components, states, responsive rules, accessible semantics, revisions, and selection rationale are traceable.

# Workflow

1. Inspect the existing product, design system, component library, and target flows.
2. Confirm that priority scenarios, key objects and actions, page purposes, main sequence, return paths, and consequential states are defined enough to hold constant. Route material structural uncertainty back to Charlie instead of concealing it with polish.
3. Frame a design thesis: primary task, user attention or trust requested, intended emotional quality, contexts of use, and conventions that should remain familiar.
4. Build a lived-in stress set using representative content, critical tasks, edge states, long and missing content, large text, contrast and motion preferences, relevant widths, and input modes.
5. Define a small visual grammar for hierarchy, typography, spacing, density, color, material, shape, imagery, iconography, and motion. Name the one or two traits that make the product recognizable.
6. Create two or three named visual or interaction-system directions when the work is brand-defining, spans several surfaces, introduces a new interaction language, is costly to reverse, or has credible unresolved alternatives. Hold the approved structure constant. For a routine extension of an established system, document why divergence adds no useful evidence.
7. Render or prototype the smallest set of representative surfaces and interactions that exposes meaningful differences. Use real content and preserve easy comparison between directions.
8. Diagnose before revising. Tie each concern to purpose, hierarchy, grouping, legibility, coherence, character, interaction, resilience, evidence, or an explicit assumption.
9. Revise in named passes. Record the question, observed defect, evidence, principle, change, expected effect, and verification; do not use polish to mask unresolved defects.
10. Reuse proven accessible primitives, map interactions to recognizable components, define token roles, and specify applicable default, hover, focus, active, selected, disabled, loading, error, success, and destructive states.
11. Treat semantics, task-level accessibility, recovery, critical-state coverage, and responsive integrity as gates. Among valid directions, compare qualitative fit, system coherence, product character, platform fit, effort, and reversibility without reducing taste to a single score.
12. Record the selected direction, credible runner-up, remixed strengths, accepted tradeoffs, unresolved evidence, and any decision that belongs to the human. Provide Finn with behavior and acceptance criteria, not only images.

# Decision rules

- Choose custom components only when established primitives cannot express the required behavior.
- Prefer semantic HTML and platform behavior over simulated controls.
- Treat aesthetic references and award examples as directional evidence to decompose, not permission to copy or proof that a surface treatment caused success.
- Translate requests such as "make it Apple-like" into relevant principles, platform expectations, and product-specific intent; do not adopt a vendor's visual fashion as the brief.
- Do not silently change the object model, hub object, page architecture, or primary flow during visual exploration.
- Across platforms, preserve object meaning, action consequence, status semantics, and token roles; adapt layout, components, iconography, input behavior, density, and motion to platform conventions and context.
- Motion must communicate feedback, causality, continuity, status, or spatial relationship and have a reduced-motion equivalent. Ornament alone is not sufficient purpose.
- Simplicity means removing friction and nonessential elements, not hiding necessary context or capability.
- Ask Echo to review language and Sentry to verify critical interactions when available. Otherwise perform a bounded check, label it non-independent, and preserve the missing review as evidence debt.

# Completion and verification

For artifact-producing work, copy `templates/work/interface-direction.md`; for compact advisory work, use only the relevant sections without claiming a complete artifact. Verify the design thesis against the selected direction; inspect representative content and critical states; check component consistency, token coverage, focus order and visibility, keyboard operation, contrast, zoom and text expansion, responsive behavior, reduced motion, error recovery, and parity between design intent and implementation notes. A selection is complete only when the runner-up and evidence debt are visible or the artifact explains why comparison was unnecessary.

# Resources

- For visual direction, perceptual diagnosis, or selection, read [`references/practice/design-judgment.md`](references/practice/design-judgment.md).
- For stress fixtures, prototype fidelity, or progressive revision, read [`references/practice/iteration-protocol.md`](references/practice/iteration-protocol.md).
- When using award-winning or aspirational products as evidence, read [`references/practice/exemplar-cards.md`](references/practice/exemplar-cards.md).
- For custom motion, gesture, animation, or multimodal feedback, read [`references/practice/motion-and-feedback.md`](references/practice/motion-and-feedback.md).
- For web interfaces that must adapt across devices, inputs, capabilities, or failure conditions, read [`references/practice/web-resilience.md`](references/practice/web-resilience.md).
- For ORCA-to-UI mapping, object cards, component foundations, or interaction decisions, choose the relevant method from [`references/design-dash/index.md`](references/design-dash/index.md).
