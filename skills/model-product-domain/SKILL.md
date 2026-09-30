---
name: model-product-domain
description: Model a product domain using objects, attributes, relationships, actions, states, permissions, and rules, and maintain the shared Object Library. Use for OOUX/ORCA work, domain modeling, object guides, entity consistency, or reconciling system and user mental models; do not use for database-only schema design without product semantics.
---

# Outcome

Produce a coherent, traceable product object model that can guide language, flows, interface structure, contracts, implementation, security, and measurement.

# Workflow

1. Read the active project's glossary, existing objects, evidence, and decisions.
2. Forage candidate nouns from user language and observed workflows.
3. Separate objects from attributes, roles, containers, states, pages, and implementation artifacts.
4. Define each object by identity, purpose, attributes, relationships, actions, states, permissions, and rules.
5. Map cardinality, direction, ownership, and lifecycle for relationships.
6. Identify actions by actor, precondition, target, state change, and failure behavior.
7. Reconcile system terminology with user terminology and record genuine divergences.
8. Validate the model against priority scenarios and edge states.
9. Reference shared objects read-only; fork project-local variants with `derived_from` metadata.
10. Promote a fork only after review and lineage reconciliation.

# Decision rules

- Treat a noun as an object when users recognize instances of it, it has meaningful attributes or actions, and it persists beyond one screen interaction.
- Do not promote a screen, button, status label, or join table into a product object without user-meaning evidence.
- Prefer stable object identities over page-specific copies.
- Ask Cipher to classify sensitive attributes and Relay to reconcile external schemas when relevant.

# Output and verification

Write object guides to `projects/<project>/knowledge/objects/` or the shared `knowledge/objects/` only when promotion is approved, using `knowledge/objects/_template.md`. Verify unique IDs, reciprocal relationships, valid state transitions, action permissions, glossary alignment, and referenced evidence. Generated graphs are derived, never canonical.

# Resources

For a specific OOUX/ORCA operation, read only the matching method in [`references/design-dash/index.md`](references/design-dash/index.md).
