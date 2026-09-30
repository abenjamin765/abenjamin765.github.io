---
name: implement-product-slice
description: Implement a bounded product slice in an existing codebase and verify its user-visible and technical behavior. Use when approved requirements need production code, tests, migrations, or repository changes; do not use for architecture review or planning without requested implementation.
---

# Outcome

Deliver the smallest maintainable code change that satisfies the approved behavior, preserves unrelated work, and passes relevant verification.

# Workflow

1. Inspect repository instructions, status, architecture, tests, and affected code paths.
2. Trace acceptance criteria to current behavior and identify unresolved product or contract ambiguity.
3. Define the smallest coherent implementation slice and expected file impact.
4. Preserve existing conventions unless a change is required and justified.
5. Implement vertical behavior, including validation, authorization, failure handling, and observable states.
6. Add or update focused tests that fail for the prior behavior and pass for the intended behavior when practical.
7. Run targeted checks first, then broader checks proportional to blast radius.
8. Inspect the diff for accidental edits, secrets, generated noise, and missing documentation.
9. Report the behavior change, verification, residual risk, and any deferred work.

# Invariants

- Do not overwrite unrelated user changes.
- Do not silently choose among materially different product behaviors.
- Do not weaken security, accessibility, data integrity, or compatibility to make checks pass.
- Do not claim tests ran when they did not.

# Failure and recovery

If a dependency, permission, or environment blocks verification, preserve the safe partial state, report the exact blocker, and name the strongest remaining check. Stop before destructive migrations or external deployment unless explicitly authorized. Summarize the slice with `templates/work/slice-report.md`.

# Resources

For an OOUX engineering handoff, read [`references/design-dash/index.md`](references/design-dash/index.md) and load the mapped handoff method.
