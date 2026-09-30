---
name: design-product-measurement
description: Define product outcomes, metrics, event contracts, analytical grain, experiments, and reporting needed for a decision. Use for success metrics, instrumentation plans, KPI audits, experiment design, dashboards, or data-quality definitions; do not use for producing a chart before the decision and metric semantics are clear.
---

# Outcome

Produce a measurement contract that lets the team determine whether the intended product outcome occurred without misrepresenting users or data.

# Workflow

1. Name the decision the measurement must support and the product outcome it represents.
2. Define outcome, diagnostic, guardrail, and operational measures separately.
3. Specify each metric's population, grain, window, numerator, denominator, exclusions, source, owner, and interpretation.
4. Map events and properties to stable product objects and state changes.
5. Define identity, deduplication, ordering, late-arrival, deletion, and versioning behavior.
6. Identify privacy, consent, retention, and access constraints with Cipher.
7. Define data-quality checks and acceptable freshness, completeness, and consistency.
8. For experiments, state hypothesis, unit, assignment, exposure, primary outcome, guardrails, duration logic, and stopping risks.
9. Choose a visualization only after the comparison or decision question is explicit.
10. Document what the data cannot establish and which confounders remain.

# Decision rules

- Prefer behavior and outcome measures over proxy activity.
- Do not invent targets from arbitrary round numbers.
- Avoid metrics whose denominator or eligible population cannot be reproduced.
- Do not collect a property without a decision use, operational need, or compliance basis.

# Verification

Walk through representative records from user action to event, transformation, metric, and decision. Confirm consistent grain, versioned contracts, edge-case handling, privacy constraints, and a named owner. Use `knowledge/metrics/_template.md`, `knowledge/metrics/_event-template.md`, and `knowledge/metrics/_experiment-template.md`.

# Resources

For visualization selection in a Design Dash artifact, read the mapped method in [`references/design-dash/index.md`](references/design-dash/index.md).
