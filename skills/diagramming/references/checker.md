# Diagram checker

Run `scripts/check-diagram.cjs --help` for CLI arguments. The helper loads a local HTML file or a loopback HTTP(S) page with the project's installed Puppeteer. Screenshots and `report.json` go to `--out`, defaulting to `work/diagram-qa`. It exits 1 on a failed invariant and 2 on invalid input or an unavailable runtime. It does not install packages, alter source, click links, or deploy.

## Configuration

The configuration has:

- `root`: one unique selector for the diagram.
- `widths`: representative viewport widths; default 1440, 949, 768, 390, 320.
- `height`: viewport height, default 1000.
- `tolerance`: connector contact tolerance in CSS pixels, default 1.25.
- `nodes`: map of names to selectors. A value can also be `{ "selector": "...", "pseudo": "::before" }` for a thin segment.
- `labels`: entries with `selector`, optional `align: "center"`, and optional `singleLineMinWidth`.
- `connections`: named routes with `from` and `to` endpoints, `segments`, and optional `minWidth` / `maxWidth`.

Endpoints use a named node plus `anchor`: `top`, `bottom`, `left`, `right`, or `center`. These refer to the midpoint of that edge. Segments are named nodes whose rectangles must be thin, axis-aligned connector strokes. For a multisegment route, each adjacent pair must touch within the tolerance, and the first/last segment must touch the endpoint. Hidden routes should be skipped explicitly at responsive widths; a visible but detached line should fail.

See `evals/fan-out.json` for a minimal example and `evals/shapes-representations.json` for the real project diagram. Pseudo-element measurements support pixel, percent, and auto used offsets; unsupported CSS values fail explicitly rather than being counted as verified. Segments are measured relative to the positioned element's padding box. This is not a general SVG/transform measurement engine.

## What it proves

It checks that the rendered viewport and diagram do not overflow, visible text stays within the diagram, declared peer labels align, and configured thin connector rectangles contact their endpoints/junctions. It waits for styles, fonts, and images before measuring.

It does not establish domain correctness, absence of all edge crossings, contrast compliance, or accessibility of interactions. Use visual inspection and the project's normal accessibility checks for those concerns. A screenshot is supporting evidence, not proof that all relationships are true.

## Test the checker

```sh
node skills/diagramming/scripts/test-checker.cjs
```

This runs a correct fixture, creates a temporary version with the observed gap/alignment defects, and verifies that the checker rejects it. Temporary files are cleaned up; the test does not alter the installed fixture or project page. Browser launch still requires the host's normal permission.
