# Shared knowledge plane

This directory contains reusable project intelligence available to every agent. Plain Markdown with YAML frontmatter is canonical; generated indexes or graphs are disposable views.

Typed templates and work artifacts are catalogued in [`docs/artifacts.md`](../docs/artifacts.md). Scaffold with `python3 scripts/new_artifact.py <type> --project <name> --slug <slug>` (project-scoped only). Shared files under this tree are written directly.

- `objects/` — domain objects and their relationships, actions, states, permissions, and rules ([`_template.md`](objects/_template.md))
- `evidence/` — observations, sources, claims, provenance, and confidence ([`_template.md`](evidence/_template.md))
- `decisions/` — options, rationale, consequences, and reversibility ([`_template.md`](decisions/_template.md))
- `metrics/` — metric, event, and experiment definitions ([`_template.md`](metrics/_template.md), [`_event-template.md`](metrics/_event-template.md), [`_experiment-template.md`](metrics/_experiment-template.md))
- `glossary/` — canonical domain, UI, and code terminology ([`_template.md`](glossary/_template.md))

Project-specific facts belong under `projects/<project>/knowledge/`. Promote them here only when they are intended to be shared across projects and have been reviewed.

## What is primary

**Career experience is the primary shared knowledge for this portfolio.** Start with the career index and per-role evidence transcribed from [`resume/canonical/experience.yml`](../resume/canonical/experience.yml). Case-study models (Classroom, Green Loom) stay as supporting domain detail for those pages—not the center of the site.

All employment claims remain **unverified** until sourced verification says otherwise. Metrics stay templates until a measure has a source, grain, and owner. Do not copy contact fields here.

## Seeded contents

### Career (primary)

| Collection | Files |
| --- | --- |
| Index | [`career-experience-index`](evidence/career-experience-index.md) |
| Roles | [`renaissance-learning-senior-ux-designer`](evidence/renaissance-learning-senior-ux-designer.md), [`indeed-senior-ux-designer`](evidence/indeed-senior-ux-designer.md), [`redfin-senior-product-designer`](evidence/redfin-senior-product-designer.md), [`home-depot-staff-ux-designer`](evidence/home-depot-staff-ux-designer.md), [`snap-mobile-senior-product-designer`](evidence/snap-mobile-senior-product-designer.md), [`amazon-ux-designer`](evidence/amazon-ux-designer.md), [`hp-ux-lead`](evidence/hp-ux-lead.md), [`att-senior-ux-designer`](evidence/att-senior-ux-designer.md), [`pyramid-consulting-graphic-designer`](evidence/pyramid-consulting-graphic-designer.md) |
| Rules | [`resume-claim-rule`](evidence/resume-claim-rule.md) |
| Objects | [`role`](objects/role.md), [`claim`](objects/claim.md) |
| Decisions | [`career-facts-canonical`](decisions/career-facts-canonical.md), [`knowledge-seed-scope`](decisions/knowledge-seed-scope.md) |

### Case studies (supporting)

| Collection | Files |
| --- | --- |
| Objects | [`assignment`](objects/assignment.md), [`catalog-product`](objects/catalog-product.md), [`variant`](objects/variant.md), [`listing`](objects/listing.md), [`lab-result`](objects/lab-result.md), [`inventory`](objects/inventory.md) |
| Evidence | [`classroom-usability`](evidence/classroom-usability.md), [`classroom-completion-illustration`](evidence/classroom-completion-illustration.md), [`classroom-outcome`](evidence/classroom-outcome.md), [`green-loom-status`](evidence/green-loom-status.md) |
| Decisions | [`priority-groups`](decisions/priority-groups.md), [`shared-assignment`](decisions/shared-assignment.md), [`separate-lab-result`](decisions/separate-lab-result.md), [`schema-separate-from-retail`](decisions/schema-separate-from-retail.md) |

### Shared

| Collection | Files |
| --- | --- |
| Glossary | [`terms.md`](glossary/terms.md) |
| Metrics | Templates only |

Scope boundaries: no Student object; no phone/email in knowledge; unverified résumé claims are not accepted metrics; Library Holds / `projects/demo/` is out of scope; Green Loom co-founder work is on the case page and is not a row in experience.yml.
