---
name: review-security-privacy
description: Review a product or codebase for concrete security and privacy risks using repository-grounded trust boundaries, data flows, attacker goals, abuse paths, and mitigations. Use for threat modeling, privacy-by-design review, sensitive-data flows, or explicit security assessment; do not use for generic architecture summaries or routine code review.
---

# Outcome

Produce a scoped threat and privacy model with prioritized abuse paths, affected assets and people, existing controls, recommended mitigations, and unresolved assumptions.

# Workflow

1. Confirm scope, deployment context, actors, exposure, data sensitivity, and intended trust assumptions.
2. Inspect architecture, entry points, stores, integrations, build paths, and administrative surfaces.
3. Map trust boundaries and data flows with authentication, authorization, validation, encryption, retention, and logging behavior.
4. Identify assets, affected people, realistic attacker capabilities, and meaningful non-capabilities.
5. Enumerate a small set of concrete abuse paths tied to attacker goals and user or business impact.
6. Assess privacy risk across collection, inference, use, sharing, retention, deletion, access, and consent.
7. Distinguish verified controls from assumed or recommended controls.
8. Rank risk with explicit likelihood, impact, exposure, and uncertainty reasoning.
9. Tie mitigations to a boundary, component, data element, or operational control.
10. Recheck entry-point and boundary coverage before finalizing.

# Invariants

- Do not report generic checklist items as repository findings without evidence.
- Do not expose secrets, exploit live systems, or access data beyond granted scope.
- Treat legal and regulatory interpretation as requiring accountable human review.
- Prefer data minimization and least privilege over downstream cleanup.

# Output and verification

Include scope, system model, assets, data inventory, boundaries, abuse paths, privacy risks, controls, prioritized mitigations, assumptions, and open questions. Copy `templates/work/threat-model.md`. Cite repository paths or supplied evidence for architectural claims.

# Resources

For the Design Dash privacy gate, read the mapped method in [`references/design-dash/index.md`](references/design-dash/index.md).
