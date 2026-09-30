# Agent roster and routing

Agent files define stable responsibility boundaries and collaboration behavior. Skills remain separate and load only when a task activates them. Each specialist has a hat icon in [`avatars/`](../avatars/).

| | Agent | Title | Primary skills | Bring in when |
| --- | --- | --- | --- | --- |
| <img src="../avatars/LIZA.png" width="36" alt="" /> | Liza | Product Lead | `lead-product-direction`, `run-product-team` | Direction, priority, scope, requirements, tradeoffs |
| <img src="../avatars/LUKE.png" width="36" alt="" /> | Luke | Domain & Systems Architect | `model-product-domain` | Objects, states, rules, permissions, domain consistency |
| <img src="../avatars/CHARLIE.png" width="36" alt="" /> | Charlie | Product Designer | `map-product-flows` | Journeys, IA, flows, wireframes, usability |
| <img src="../avatars/IRIS.png" width="36" alt="" /> | Iris | UI & Design Systems Designer | `shape-interface-system` | Components, visual hierarchy, interaction patterns, tokens |
| <img src="../avatars/FINN.png" width="36" alt="" /> | Finn | Full-Stack Engineer | `implement-product-slice` | Production implementation and technical decomposition |
| <img src="../avatars/SENTRY.png" width="36" alt="" /> | Sentry | Quality & Adversarial Reviewer | `verify-product-quality` | Failure modes, test strategy, regressions, release readiness |
| <img src="../avatars/SCOUT.png" width="36" alt="" /> | Scout | Research & Insights Analyst | `research-product-evidence` | Research questions, evidence collection, synthesis, confidence |
| <img src="../avatars/CIPHER.png" width="36" alt="" /> | Cipher | Security & Privacy Engineer | `review-security-privacy` | Threats, trust boundaries, sensitive data, privacy controls |
| <img src="../avatars/LEDGER.png" width="36" alt="" /> | Ledger | Data & Analytics Architect | `design-product-measurement` | Metrics, events, experiments, reporting grain |
| <img src="../avatars/ECHO.png" width="36" alt="" /> | Echo | Content Designer | `design-product-language` | UI terminology, labels, instructions, voice, comprehension |
| <img src="../avatars/RELAY.png" width="36" alt="" /> | Relay | Platform & Integrations Engineer | `design-product-integrations` | APIs, contracts, external systems, degraded behavior |
| <img src="../avatars/HARBOR.png" width="36" alt="" /> | Harbor | DevOps & Reliability Engineer | `prepare-product-operations` | CI/CD, observability, SLOs, rollback, incidents |
| <img src="../avatars/ALLIE.png" width="36" alt="" /> | Allie | Product Critic | `critique-product-decision` | Independent challenge before commitment or release |

All agents may use `evolve-team-practice` when demonstrated learning warrants a local override or an upstream proposal.
