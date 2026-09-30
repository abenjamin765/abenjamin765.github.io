---
name: critique-product-decision
description: Independently pressure-test a product decision, feature, flow, requirements artifact, or design direction for weak evidence, unnecessary complexity, mental-model mismatch, exclusion, and product debt. Use before consequential commitment or when the user asks for critique, red-teaming, simplification, or blind spots; do not use as a generic style review.
---

# Outcome

Produce a concise challenge memo that identifies the strongest reasons to revise, test, simplify, defer, or reject the direction without taking implementation ownership.

# Workflow

1. State the decision under review, its intended outcome, affected users, and current evidence.
2. Identify the assumptions that must be true for the direction to work.
3. Challenge whether the problem is real, material, and appropriately scoped.
4. Compare the proposal with doing nothing, changing policy or process, removing steps, and a smaller intervention.
5. Inspect object and terminology consistency, user effort, cognitive load, hidden state, and recovery.
6. Identify who benefits, who bears complexity, who may be excluded, and which harms are plausible.
7. Examine incentives, dark patterns, metric gaming, privacy exposure, and long-term product debt.
8. Separate fatal flaws, testable risks, reversible preferences, and aesthetic disagreements.
9. Recommend the smallest evidence or change needed to resolve each material challenge.
10. Name what is strong and should be preserved so critique does not erase useful constraints.

# Invariants

- Tie every challenge to evidence, an explicit assumption, a user outcome, or a plausible harm.
- Do not manufacture objections merely to appear adversarial.
- Do not resolve tradeoffs assigned to the human or Product Lead.
- Keep critique independent from delivery ownership.

# Output and verification

Include the decision, strongest case against it, material findings by severity, evidence gaps, simplification options, recommended tests, preserve list, and verdict: proceed, proceed with conditions, revise, test first, or stop. Copy `templates/work/challenge.md`. Verify the verdict follows from the findings.

# Resources

For adversarial panels, ethics and equity review, or anti-slop critique, choose the relevant method from [`references/design-dash/index.md`](references/design-dash/index.md).
