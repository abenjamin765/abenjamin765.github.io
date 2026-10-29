# Portfolio research library

For case-study evaluation and revision, use the [case-study rubric](case-study-rubric.md). Its weights and readiness threshold are project editorial decisions, with links back to the research notes and their limits.

This folder is a lookup library for the in-progress portfolio in `newsite/`. It breaks source documents into short notes so a designer can find one decision without rereading a source.

It is not a product direction, a hiring plan, or a claim that any pattern gets someone hired. The first two sources review curated portfolios. Neither interviewed hiring managers. The third source is a design-system specification, not a portfolio sample.

The original notes stay at `newsite/research.md`. The uploaded reports were not edited.

## Sources

1. **Wall of Portfolios notes** — `newsite/research.md`. Date viewed: 19 October 2026. Author credit in that file: scout. Nine live homepages, plus the Wall directory. Evidence IDs E1–E10. Homepage text only. Case interiors were not reviewed.
2. **Winning-portfolios report** — attachment `deep-research-report__10_.md` (“What Winning UX Portfolios Do Differently”). Point in time: 19 October 2026. Twelve primary sites, including case interiors, plus September 2026 Portfolios of the Month. Counts such as 10/12 belong to this sample only.
3. **Metro × Apple design-system report** — attachment `deep-research-report__11_.md` (“A Unified Metro × Apple Human Interface Guidelines System for `DESIGN.md`”). A synthesis of Metro, Fluent 2, Apple HIG, WCAG, and the alpha `DESIGN.md` format (`https://github.com/google-labs-code/design.md`, as cited there). Brand color is unspecified. It does not review the Wall sites. See `method-and-limits/metro-apple-source.md`.

Six designers appear in both portfolio sources: Eemon Roy, Dharmesh Nayak, Aditya Muralidhar, Vaibhav Verma, Niklas Peterson, Rishabh Yadav. Those two samples are not one study. See `method-and-limits/two-samples.md`. The design-system report is a third kind of source. Where it conflicts with a portfolio note, the note has a Disagreement section.

## How a file is structured

Every note uses the same headings so search hits a claim instead of a section buried in an essay.

- Filename: kebab-case, one concept.
- `#` title: the concept.
- **Claim:** one sentence.
- **Sources:** which document the claim came from.
- `## Evidence`: **Observed**, **Inferred**, **Borrowed**, or **Prescribed**.
- `## Disagreement`: only when sources do not say the same thing.
- `## Implication for this portfolio`: what the note can inform on this site. Implications are inferences. They are not hiring outcomes.
- `## Limit`: what the evidence cannot support.

**Observed** means the source says it was on a page, in a count, or stated as a property of a document. **Inferred** means the source drew a lesson. **Borrowed** means Nielsen Norman Group, AIGA, Smashing Magazine, W3C, Apple HIG, Metro, or Fluent as a report summarized them; those primary texts were not re-read here. **Prescribed** means a checklist, token, or template a report recommends, not a frequency in a portfolio sample.

## How to search

From `newsite/research/`:

- By panel: search `intro`, `experience`, `work`, `about`, or `contact`. Those are the sections in `newsite/index.html`.
- By designer: search the name. Names are sample labels. The roster is `method-and-limits/sample-roster.md`.
- By evidence class: search `Observed`, `Inferred`, `Borrowed`, `Prescribed`, or `Disagreement`.
- By homepage-notes ID: search `E1` through `E10`.
- By portfolio-report fraction: search `12/12`, `10/12`, `6/12`, `4/12`, or `3/12`.
- By design-system topic: search `content plane`, `Liquid Glass`, `WCAG 2.2`, `DESIGN.md`, or a token name such as `color.action.primary`.

Filename stems match the concept (`work-row-unit`, `contact-path`, `staff`, `motion-intents`). Heading text repeats that concept in the title and the claim.

## Folder map

| Folder | What it answers |
| --- | --- |
| `method-and-limits/` | Samples, dates, platform claims, biases, what was coded, what is borrowed, and what the design-system source is. |
| `audience-and-hiring-context/` | Who the notes were for, the six reviewer questions, information order, blurbs, and the hire sentence the evidence does not support. |
| `hero-and-first-screen/` | Name, role, one claim, recorded lines, and the current intro panel. |
| `questions-as-headlines/` | Titles, section headings, and rows that can be read before a case opens. |
| `navigation/` | Short labels, résumé, the Experience panel, contact, about. |
| `work-rows-and-case-framing/` | Row unit, hero versus breadth, case layers, decisions, ownership, failure, confidential work. |
| `visual-identity/` | Frame versus rows, no winning template, catalog browse, images, what is still open. |
| `proof-and-metrics/` | Where numbers sit, how often they appear, metric types, honesty about missing results. |
| `what-not-to-copy/` | Process diagrams, galleries, tool clouds, open-to-work headlines, gated interaction, leadership homepages used as an IC template. |
| `accessibility/` | Portfolio-sample signaling versus audit, and a stricter baseline than that sample. Numeric WCAG 2.2 targets live under `design-system/`. |
| `interaction-and-tools/` | When tools matter, optional interaction, proposition versus logo. |
| `seniority/` | Report-only playbook from entry to principal, plus the staff page that matches the homepage notes. |
| `build-priority/` | The portfolio report’s P0–P2 checks, recall questions, and the illustrative schedule. |
| `design-system/` | Metro × Apple × Fluent rules: content versus controls, tokens, type, motion, components, accessibility numbers, and the proposed rollout. Not a Wall finding. |

## Site these notes refer to

`newsite/index.html` has five panels: Intro, Experience, Work, About, Contact. The intro markup read for this library shows “Hello” and “complicated.” The homepage notes also describe a yellow field and a portrait; that description was not re-checked in a browser. Placeholder panels that only say “Hello” were not treated as design evidence.

## What was not copied in full

- The layout schematic at `sandbox:/mnt/data/wall_portfolio_layout_patterns.png` is not in the repo. The three archetypes are summarized in `work-rows-and-case-framing/three-layout-archetypes.md`.
- The winning-portfolios report’s Gantt dates are not this site’s schedule. The phase order is in `build-priority/schedule-is-illustrative.md`.
- The Metro × Apple Gantt (2026-10-19 through 2027-01-17) is a proposed design-system rollout, summarized in `design-system/rollout-is-proposed.md`, not adopted as this site’s plan.
- Citation tokens (`turn18view0`, `turn30search3`, `filecite turn1file0`, and the rest) are not URLs here.
- Illustrative images marked `turn33image0` through `turn33image3` in the design-system report are not in the attachment. The report says they are not normative.
- Testimonial quotations for Kat Angeles are paraphrased by the winning-portfolios report and are not reproduced, because that report does not include the quotes.
- Starter `DESIGN.md` YAML, DTCG JSON, CSS, SCSS, React, SwiftUI, and WinUI listings are not copied verbatim. They illustrate decisions already filed. Hex values in them are placeholders. See `design-system/brand-palette-unspecified.md` and `design-system/design-md-schema.md`.
