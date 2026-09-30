---
name: verify-product-quality
description: Build and execute a risk-based product quality strategy covering acceptance criteria, failure modes, regressions, accessibility, and release readiness. Use for test planning, QA audits, bug verification, adversarial testing, or readiness reviews; do not use for ordinary implementation unless independent verification is requested.
---

# Outcome

Produce evidence-based confidence or a prioritized defect record for the product behaviors most likely to harm users or the business.

# Workflow

1. Identify the release decision, scope, affected users, critical journeys, and irreversible effects.
2. Trace requirements and acceptance criteria to observable checks.
3. Rank risks by impact, reach, likelihood, detectability, and recoverability.
4. Test representative happy paths, boundaries, state transitions, permissions, concurrency, interruption, and recovery.
5. Cover empty, partial, delayed, invalid, duplicate, offline, at-scale, and dependency-failure conditions as relevant.
6. Verify keyboard, focus, semantics, zoom, contrast, screen-reader announcements, and motion behavior for critical UI.
7. Reproduce suspected defects before ranking them.
8. Record environment, data, steps, expected behavior, actual behavior, evidence, and severity rationale.
9. Re-run affected checks after fixes and inspect for neighboring regressions.
10. State release confidence, blocked areas, and untested risk.

# Decision rules

- Prefer a small set of high-signal tests over indiscriminate coverage.
- Treat automated checks, manual exploration, and monitoring as complementary evidence.
- A green pipeline does not prove usability or correctness outside its assertions.
- Ask Cipher for security findings and Harbor for deployment or recovery readiness when relevant.

# Completion

Every critical finding is reproducible or explicitly hypothetical; every resolved finding has regression evidence; and the readiness statement names residual risk rather than reducing it to a bare pass/fail label. Copy `templates/work/quality-strategy.md` and `templates/work/defect.md`.

# Resources

For accessibility, usability, or artifact validation within Design Dash, choose the relevant method from [`references/design-dash/index.md`](references/design-dash/index.md).
