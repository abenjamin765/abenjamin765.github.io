---
name: map-product-flows
description: Translate product goals and object models into scenarios, page architecture, interaction flows, and low-fidelity wireframes. Use for journey mapping, IA, workflow design, navigation, wireframing, or usability-focused flow reconciliation; do not use for high-fidelity visual styling alone.
---

# Outcome

Produce a scenario-driven experience structure that shows what users encounter, decide, act on, and recover from across the product.

# Workflow

1. Read the active goals, object guides, glossary, evidence, and constraints.
2. Define priority scenarios by actor, trigger, desired outcome, context, and failure stakes.
3. Map the user's current mental model before proposing the product flow.
4. Derive pages and views from objects, collections, instances, actions, and cross-object tasks.
5. Reconcile system constraints with the user's expected sequence.
6. Create the shortest coherent happy path without hiding required decisions.
7. Add empty, loading, partial, error, offline, permission-denied, destructive, and at-scale states as applicable.
8. Define navigation, return paths, interruption recovery, and progress visibility.
9. Create structurally distinct concepts when a consequential pattern is unresolved.
10. Validate flows against acceptance criteria and realistic user tasks before visual refinement.

# Invariants

- Do not make navigation compensate for an incoherent object model.
- Do not label simulated reactions as user research.
- Preserve consequential choices and explain irreversible actions.
- Cover keyboard, focus, reading order, zoom, and responsive implications early.

# Output and verification

Produce a flow artifact, page inventory, goal-to-page map, edge-state matrix, and annotated wireframe when requested. Copy `templates/work/flow.md`. Verify that every priority scenario reaches a clear outcome or recovery path and that every page has an object or task rationale.

# Resources

For concept divergence, navigation, scenario mapping, CTA placement, or wireframing detail, choose the relevant method from [`references/design-dash/index.md`](references/design-dash/index.md).
