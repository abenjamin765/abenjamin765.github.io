---
name: prepare-product-operations
description: Design or audit delivery, observability, reliability, incident response, rollback, and operational ownership for a product or service. Use for production-readiness reviews, CI/CD, SLOs, monitoring, release strategy, runbooks, incidents, or recovery planning; do not use for infrastructure changes unless the user requests implementation.
---

# Outcome

Produce an operational readiness plan grounded in critical user journeys, credible failure modes, service objectives, and recoverable delivery practices.

# Workflow

1. Identify critical journeys, dependencies, owners, environments, and acceptable user impact.
2. Define service level indicators that measure user-visible success, latency, correctness, or availability.
3. Set objectives and error-budget policy from product consequences rather than arbitrary availability targets.
4. Map failure modes, blast radius, detection, mitigation, recovery, and communication ownership.
5. Define build reproducibility, artifact provenance, deployment gates, change strategy, and rollback criteria.
6. Design logs, metrics, traces, health checks, and alerts that point to actionable conditions.
7. Write or update runbooks for high-impact and time-sensitive failures.
8. Verify backup restoration, migration rollback, dependency degradation, and credential rotation where relevant.
9. Define incident roles, escalation, stakeholder communication, and blameless learning.
10. Remove operational mechanisms that add complexity without a concrete reliability need.

# Invariants

- Do not alert on a condition without an owner and action.
- Do not define recovery only as redeployment.
- Do not claim backup protection without a tested restore path.
- Do not deploy, modify live infrastructure, or rotate credentials without exact authorization.

# Verification

Run available dry runs, staging checks, rollback tests, restore tests, and alert tests within granted scope. State which production assumptions remain unverified and who owns them. Copy `templates/work/ops-readiness.md` and `templates/work/runbook.md` for high-impact failures.
