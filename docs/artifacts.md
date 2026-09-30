# Artifact catalog

Typed artifacts with a steward. Knowledge files live under `knowledge/` and `projects/<project>/knowledge/`. Work files live under `projects/<project>/work/`. Templates are the missing half of each skill's output contract.

For a visual intro, see the four Library Holds previews (with steward avatars) under **What the team produces** in the [root README](../README.md#what-the-team-produces). This page is the full catalog.

Canonical registry: [`config/artifacts.json`](../config/artifacts.json). Scaffold with:

```bash
python3 scripts/new_artifact.py <type> --project <name> --slug <slug>
```

## Shared frontmatter

```yaml
id: <prefix>-<slug>
type: <registry type>
status: draft | proposed | accepted | superseded
date: null
owner: <agent>
related_objects: []
related_evidence: []
related_decisions: []
```

Type-specific fields (for example `derived_from`, `source_type`, `confidence`, `reversibility`, `related_outcome`, `evidence`, `expected_artifacts`) stay on the relevant templates.

## Knowledge

| Type | Steward | Template |
| --- | --- | --- |
| `object` | Luke | [`knowledge/objects/_template.md`](../knowledge/objects/_template.md) |
| `evidence` | Scout | [`knowledge/evidence/_template.md`](../knowledge/evidence/_template.md) |
| `decision` | Liza | [`knowledge/decisions/_template.md`](../knowledge/decisions/_template.md) |
| `metric` | Ledger | [`knowledge/metrics/_template.md`](../knowledge/metrics/_template.md) |
| `event` | Ledger | [`knowledge/metrics/_event-template.md`](../knowledge/metrics/_event-template.md) |
| `experiment` | Ledger | [`knowledge/metrics/_experiment-template.md`](../knowledge/metrics/_experiment-template.md) |
| `glossary` | Echo | [`knowledge/glossary/_template.md`](../knowledge/glossary/_template.md) |

Decisions stay thin. Liza's full slice brief is the work `direction` artifact.

## Work

| Type | Steward | Template |
| --- | --- | --- |
| `direction` | Liza | [`templates/work/direction.md`](../templates/work/direction.md) |
| `run-packet` | Liza | [`templates/work/run-packet.md`](../templates/work/run-packet.md) |
| `challenge` | Allie | [`templates/work/challenge.md`](../templates/work/challenge.md) |
| `flow` | Charlie | [`templates/work/flow.md`](../templates/work/flow.md) |
| `research-plan` | Scout | [`templates/work/research-plan.md`](../templates/work/research-plan.md) |
| `research-synthesis` | Scout | [`templates/work/research-synthesis.md`](../templates/work/research-synthesis.md) |
| `threat-model` | Cipher | [`templates/work/threat-model.md`](../templates/work/threat-model.md) |
| `integration-contract` | Relay | [`templates/work/integration-contract.md`](../templates/work/integration-contract.md) |
| `ops-readiness` | Harbor | [`templates/work/ops-readiness.md`](../templates/work/ops-readiness.md) |
| `runbook` | Harbor | [`templates/work/runbook.md`](../templates/work/runbook.md) |
| `quality-strategy` | Sentry | [`templates/work/quality-strategy.md`](../templates/work/quality-strategy.md) |
| `defect` | Sentry | [`templates/work/defect.md`](../templates/work/defect.md) |
| `language-inventory` | Echo | [`templates/work/language-inventory.md`](../templates/work/language-inventory.md) |
| `interface-direction` | Iris | [`templates/work/interface-direction.md`](../templates/work/interface-direction.md) |
| `slice-report` | Finn | [`templates/work/slice-report.md`](../templates/work/slice-report.md) |
| `practice-change` | Liza / any | [`templates/work/practice-change.md`](../templates/work/practice-change.md) |

## Tooling

| Script | Role |
| --- | --- |
| `scripts/new_artifact.py` | Copy a template and fill `id` / `date` / `owner` / `type` |
| `scripts/validate_knowledge.py` | Unique IDs, resolvable `related_*` links, required headings |
| `scripts/generate_knowledge_graph.py` | Disposable `knowledge/graph.json` from frontmatter links |
| `scripts/check_run_packet.py` | Assert a run packet's `expected_artifacts` exist |

Generated graphs are rebuildable and never authoritative.
