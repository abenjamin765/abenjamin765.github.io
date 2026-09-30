---
name: design-product-integrations
description: Design or review APIs, events, webhooks, imports, and external-system integrations as explicit product and technical contracts. Use for integration architecture, API contracts, schema reconciliation, compatibility, or dependency-failure design; do not use for internal implementation details with no system boundary.
---

# Outcome

Produce a versionable integration contract with clear actors, data semantics, security, failure behavior, observability, and ownership.

# Workflow

1. Identify the user and business outcome, participating systems, owners, and source of truth.
2. Map external schemas to product objects and record semantic mismatches.
3. Define operations or events with inputs, outputs, validation, authentication, authorization, and data classification.
4. Specify identifiers, pagination, filtering, ordering, time semantics, idempotency, and concurrency behavior.
5. Define versioning, compatibility, deprecation, migration, and consumer-notification expectations.
6. Model timeouts, retries, rate limits, partial success, duplicates, reordering, unavailable dependencies, and reconciliation.
7. Define error categories that callers can act on without leaking sensitive internals.
8. Add observability with correlation identifiers, useful logs, measures, and ownership.
9. Provide contract examples and verification cases for happy and degraded paths.
10. Review sensitive flows with Cipher and operational behavior with Harbor.

# Invariants

- Do not let vendor terms silently replace the product glossary.
- Do not retry non-idempotent work without a deduplication strategy.
- Do not claim exactly-once behavior without proving the entire boundary.
- Do not expose credentials or sensitive payloads in examples, errors, or logs.

# Verification

Validate the contract against its schema format when available. Walk through creation, retry, duplicate, timeout, version skew, partial failure, and recovery with both producer and consumer perspectives. Copy `templates/work/integration-contract.md`.

# Resources

For Design Dash documentation integration, read the mapped adapter in [`references/design-dash/index.md`](references/design-dash/index.md).
