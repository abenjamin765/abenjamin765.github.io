# Skill research and provenance

## Governing format

All installable skills follow the behavioral-contract approach in [Portable Agent Skills](https://github.com/abenjamin765/create-agent-skills): portable `SKILL.md`, optional machine-readable `skill.yaml`, progressive resources, explicit side effects and confirmation gates, and behavioral evaluations.

## Design Dash

[Design Dash](https://github.com/abenjamin765/design-dash) supplies the product discovery, OOUX/ORCA, research, synthesis, flow, wireframing, critique, accessibility, privacy, validation, and workshop foundations. Many Hats consolidates its stage-oriented methods by accountable role while retaining the detailed original methods as conditional references.

See [`design-dash-migration.md`](design-dash-migration.md) for the complete 53-skill mapping.

## Public skill repositories reviewed

| Source | What informed the refactor | Adoption decision |
| --- | --- | --- |
| [GitHub awesome-copilot](https://github.com/github/awesome-copilot) | Role boundaries for product, architecture, security, API, quality, and DevOps agents; repository grounding and verification patterns | Concepts synthesized; no agent copied wholesale because many source agents hardcode tools, process, or arbitrary thresholds |
| [OpenAI skills](https://github.com/openai/skills) | Precise discovery boundaries; repository-grounded threat modeling; explicit approval before external changes; progressive references | Original portable guidance written for this project; compatible patterns adopted with attribution |
| [Anthropic skills](https://github.com/anthropics/skills) | Skill packaging, conditional resources, tool-neutral core, and complex capability decomposition | Structural patterns adopted; source-available document skills excluded |

## Primary practice sources

| Agent or capability | Primary sources | Influence |
| --- | --- | --- |
| Iris and Sentry | [W3C ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/), [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/), [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines), [Apple design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles) | Native semantics, task-level accessibility, keyboard behavior, accessible names, states, platform fit, and verifiable interaction patterns |
| Iris | [Apple design sessions](https://developer.apple.com/videos/design/), [Apple Design Awards](https://developer.apple.com/design/awards/), [Braun design principles](https://www.braunhousehold.com/en-us/e/braun-100-years), [Luke Wroblewski](https://www.lukew.com/mobilefirst/), [Aaron Gustafson](https://www.aaron-gustafson.com/), [Piccalilli](https://piccalil.li/category/progressive-enhancement/), [Refactoring UI](https://refactoringui.com/) | Purpose-led design, comparative visual direction, progressive revision, exemplar decomposition, responsive context, resilience, hierarchy, reduction, and design-decision explanation |
| Cipher | [OWASP Threat Modeling](https://owasp.org/www-community/Threat_Modeling), [OWASP Threat Modeling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html), [NIST Privacy Framework](https://www.nist.gov/privacy-framework) | Scope, system modeling, abuse paths, controls, privacy risk, and explicit uncertainty |
| Ledger | [Google HEART research](https://research.google/pubs/measuring-the-user-experience-on-a-large-scale-user-centered-metrics-for-web-applications/) | Goals-to-signals-to-metrics reasoning and user-centered outcome measurement |
| Relay | [OpenAPI Specification](https://spec.openapis.org/), [AsyncAPI Specification](https://www.asyncapi.com/docs/reference/specification/latest) | Machine-readable HTTP and event contracts, versioning, producers, consumers, channels, and message semantics |
| Harbor | [Google SRE Workbook](https://sre.google/workbook/implementing-slos/) | User-centered SLIs and SLOs, error budgets, operational ownership, and recovery |
| Echo | [U.S. Plain Language Guidelines](https://www.plainlanguage.gov/guidelines/), [GOV.UK Content Design](https://www.gov.uk/guidance/content-design) | Audience-first language, front-loaded meaning, specific actions, and comprehension before voice |
| Finn and Sentry | [NIST Secure Software Development Framework](https://csrc.nist.gov/Projects/ssdf), [GitHub secure software development guidance](https://docs.github.com/en/code-security/getting-started/secure-software-development-lifecycle) | Repository-grounded change, secure defaults, verification, provenance, and risk-based checks |

External sources remain references rather than embedded manuals. Skills contain only guidance that changes decisions or protects a meaningful boundary.
