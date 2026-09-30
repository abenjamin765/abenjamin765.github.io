---
name: evolve-team-practice
description: Convert observed agent feedback or repeated failures into a scoped project override or an evidence-backed proposal to improve Many Hats. Use when a human corrects recurring behavior, a skill demonstrably fails, or a reusable practice improvement emerges; do not use to rewrite core prompts after a single preference or while unrelated work is still incomplete.
---

# Outcome

Capture demonstrated learning at the narrowest valid scope and, when portable, prepare a reviewable skill or agent change with regression evidence.

# Required evidence

Obtain the triggering request, actual behavior, desired behavior, outcome or feedback, affected agent and skill, and whether the pattern is specific to a person, project, host, or general practice.

# Workflow

1. Finish or safely pause the original task before changing team behavior.
2. Describe the observed gap without turning one example into a universal rule.
3. Classify the learning as user preference, project fact, domain practice, host adaptation, or portable core behavior.
4. Store user and project learning under `projects/<project>/overrides/` with scope and provenance.
5. For a portable gap, identify the smallest responsible agent or skill contract.
6. Add an evaluation case that reproduces the failure and names observable success.
7. Make the narrowest instruction, reference, script, or routing change that addresses the evidence.
8. Run skill validation and the affected evaluation set.
9. Record compatibility, side effects, and migration implications.
10. Prepare a branch and pull-request description when an upstream change is justified.

# Promotion gate

Open an external pull request only after the human approves the exact repository and branch. Never include private project data, credentials, customer content, or personal preferences in an upstream proposal.

# Decision rules

- One person's style preference remains local unless the core explicitly promises personalization.
- A repeated cross-project failure with the same underlying cause is a core candidate.
- A tool-specific workaround belongs in an adapter.
- New guidance must replace or narrow existing guidance when possible; avoid rule accumulation.

# Completion

Report the evidence, scope decision, files changed, evaluation result, and whether a local update or upstream proposal was produced. Do not claim the team has learned unless the durable record exists. Copy `templates/work/practice-change.md`.
