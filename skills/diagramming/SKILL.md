---
name: diagramming
description: Create or refine clear, responsive product diagrams with HTML, CSS, and SVG, including connected object models, representation comparisons, state mappings, and annotated interfaces. Use when a visual must explain relationships or behavior and match an existing site; do not use to invent the underlying domain model or replace scientific plotting.
---

# Diagramming

Build a diagram that answers one concrete question and whose relationships remain understandable at the available widths.

## Decide what the picture must explain

Identify the reader's question, the nodes, and what each edge means. Use a short relation such as “represents,” “requires,” or “appears in” to check the meaning before drawing. Do not add connections just to fill space. Carry one specific example through related diagrams so the reader can follow a change.

Read nearby screens and diagrams before inventing a visual language. Match their type roles, spacing, surfaces, connector weight, captions, and color meanings. This project's conventions and observed failures are in [references/project-style.md](references/project-style.md); use them when working on this portfolio, not as universal style rules.

## Choose a dependable medium

- Use native HTML/CSS for readable labels, responsive comparisons, and interface wireframes. Use semantic lists, figures, and real tables when their structure fits.
- Use inline SVG for precise ports, branches, and routed paths. Prefer a fixed SVG when the deliverable is an export; pair complex diagrams with an equivalent readable description.
- A small plain engineering diagram may be clearer in Mermaid. A raster image can supply a product photo or illustration; avoid baking diagram labels into it when those labels must remain responsive or editable.
- For simple layouts, share geometry between nodes and CSS connectors. For dynamic HTML bounds and nontrivial routes, measure actual ports after fonts and images settle and update on resize. Do not add a continuous animation loop for static lines.

## Compose and connect

Establish the reading order and content measure first. Keep role labels separate from sample UI text. Give peer headers a shared alignment and peer content a common baseline where it aids comparison. Shorten labels or adjust the layout before shrinking type. Let small-screen text wrap when needed.

Every visible connector must meet a named node or port. Do not point at empty space in a wide text container. A shared bus must intersect every branch, including the source stem. Use the actual grid tracks and gaps rather than rounded percentages of the whole container. Allow a small overlap at 1px junctions so fractional pixels do not create a seam.

Use [references/connector-patterns.md](references/connector-patterns.md) for the tested equal-track fan-out formula and when CSS stops being the right tool. Reflow deliberately: a stacked comparison may drop its decorative bus if labels retain the relationship; a genuine flow still needs a clear sequence. Do not leave disconnected horizontal lines in a vertical layout.

Keep diagrams readable without optional JavaScript. Decorative paths and icons should not add screen-reader noise. A wireframe can show controls as static shapes; do not imply keyboard-operable tabs or buttons unless implementing their behavior. If interaction is useful, provide real controls, focus states, and a reduced-motion path.

## Verify the rendered result

Wait for styles, fonts, and relevant images before measuring. Inspect the actual rendered diagram at a wide size, the reported problem width, an intermediate layout, and a narrow phone width. Check endpoints and junctions, clipping, label alignment, line breaks, reading order, and contrast. Also inspect a screenshot: geometry checks cannot judge whether a relationship makes sense.

The bundled checker uses the project's existing Node and Puppeteer installation. Run from the project root; it does not install dependencies or publish anything:

```sh
node skills/diagramming/scripts/check-diagram.cjs \
  --page newsite/shapes.html \
  --config skills/diagramming/evals/shapes-representations.json \
  --out work/diagram-qa/shapes
```

It checks viewport and diagram overflow, visible text bounds, configured label alignment, and continuity of thin axis-aligned DOM/CSS connector segments. It saves JSON results and screenshots. It does not validate arbitrary SVG paths or infer the truth of a graph. Follow the host's browser and filesystem permissions; if the helper is unavailable, use authorized browser inspection and report only what was actually checked. Do not substitute a success claim for unavailable verification.

For a new diagram, adapt the configuration described in [references/checker.md](references/checker.md). The standalone fixture and regression command are useful when changing the checker itself:

```sh
node skills/diagramming/scripts/test-checker.cjs
```

## Deliver

Show the diagram in context and say what it explains. Captions should teach the relationship or decision, rather than repeat a warning about what the picture is not. Keep actual project stage and measured claims accurate without scattering caveats around every figure.

Report what changed and which widths or interactions were verified. Save portable learning at the right scope: local taste in the project reference, reusable mechanics in the connector reference or checker. Installing this skill does not authorize a push, deployment, new dependency, or unrelated agent changes.
