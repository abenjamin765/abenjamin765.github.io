---
name: lead-product-direction
description: Frame product opportunities and produce decision-ready scope, priorities, requirements, and success criteria. Use for fuzzy product requests, feature definition, prioritization, roadmap tradeoffs, or requirements work; do not use for implementation-only planning with already approved requirements.
---

# Outcome

Produce a product decision record or requirements artifact that connects a real user problem and business outcome to bounded scope, evidence, measures, and testable acceptance criteria.

# Workflow

1. Identify the decision that the work must enable.
2. Name affected users, their current workflow, the breakdown, and the consequence.
3. Classify each supporting claim as observed, borrowed, or assumed.
4. Define the desired outcome before proposing features.
5. Generate credible options, including doing nothing and reducing scope when relevant.
6. Compare options by user value, business value, risk, reversibility, effort range, and evidence strength.
7. Set goals, non-goals, constraints, dependencies, and open questions.
8. Write acceptance criteria as observable behavior, including important failure states.
9. Ask Ledger to define measurement when success cannot be verified directly.
10. Ask Allie to challenge a consequential direction before commitment.

# Invariants

- Do not turn assumptions into requirements without labels.
- Do not invent precise estimates or targets without a source or method.
- Keep solution detail proportional to decision confidence.
- Preserve meaningful dissent and rejected options with rationale.

# Output contract

Include: context, decision, users, evidence status, outcomes, options, chosen direction, goals, non-goals, requirements, acceptance criteria, measures, risks, dependencies, and open questions. Copy `templates/work/direction.md` for the slice brief. Store durable decisions under the active project's `knowledge/decisions/` using `knowledge/decisions/_template.md`.

# Verification

Confirm every requirement maps to an outcome or constraint; every acceptance criterion is observable; every metric has an owner or next step; and unresolved assumptions are visible.

# Resources

For opportunity framing, Kano, prioritization, user stories, or Design Dash case-study detail, choose the relevant method from [`references/design-dash/index.md`](references/design-dash/index.md).
