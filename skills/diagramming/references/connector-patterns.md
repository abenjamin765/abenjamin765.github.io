# Connector patterns

## One source, three equal representations

Question: how do three interface contexts refer to the same underlying object?

Let the representation grid's **inner width** be W and its column gap be G. Three equal cards have width C = (W − 2G) / 3. Their centers are:

- C / 2
- W / 2
- W − C / 2

A bus positioned with `left: 16.66%; right: 16.66%` ignores G and misses the outer stems by G / 3. With G = 16px, the seam is about 5.3px at each end. Making the line longer by eye only hides the problem at one width.

```css
.source {
  position: relative;
  width: fit-content;
  margin: 0 auto 36px;
}
.source::after {
  content: "";
  position: absolute;
  left: calc(50% - .5px);
  bottom: -19px;
  width: 1px;
  height: 19px;
  background: var(--connector);
}
.representations {
  --gap: 16px;
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--gap);
}
.representations::before {
  content: "";
  position: absolute;
  left: calc((100% - 2 * var(--gap)) / 6 - .5px);
  right: calc((100% - 2 * var(--gap)) / 6 - .5px);
  top: -18px;
  height: 1px;
  background: var(--connector);
}
.representation { position: relative; }
.representation::before {
  content: "";
  position: absolute;
  bottom: calc(100% - 1px);
  left: calc(50% - .5px);
  height: 19px;
  width: 1px;
  background: var(--connector);
}
```

The source stem spans the first half of the 36px separation; card stems span the second half. The extra pixel overlaps the bus/card edge. Borders affect the containing block; inspect the actual source boundary rather than assuming offsets are exact. The checker uses a 1.25px tolerance for a 1px stroke, not permission for a visible gap.

The fixture at `evals/fan-out.html` is a self-contained implementation. Its `.broken` mode reproduces the previous percent-based gap and left-aligned peer headers. The checker regression test must pass the good fixture and reject that broken fixture.

When the cards stack, hide the source stem, bus, and **all** card stems together. Keep the shared source and explicit context labels. If sequence itself matters, replace the bus with a vertical flow rather than silently removing it.

## A callout beside a content block

Give the callout a visible box or a tight label, then route to the relevant element. A line spanning only the CSS grid gap can end in whitespace if the label occupies a much wider invisible column. Use named ports on real visual boundaries. If a line describes an action, targeting the action's control can be more useful than targeting the entire card.

## When to use SVG or measured routes

Use SVG when nodes have unequal widths, multiple ports, branches crossing rows, or connectors that need bends and arrows. Lay out HTML nodes first, choose ports, then route in one coordinate system. Measure after fonts and images load. If measurements can change, use ResizeObserver and consolidate updates; do not measure during every scroll event.

Check the actual SVG path endpoints and route around labels. The rectangle-based checker cannot prove the continuity of a curved SVG path, an arrow glyph, or a dashed CSS border. Add a path-specific check or inspect it directly.

## Alignment is a relationship

Centering the three peer context headings can make a comparison easier to scan; that does not require centering product names, tables, or every paragraph. Align comparable roles, not every element. A single-line label is a useful desktop goal when it fits naturally; wrapping on phones is preferable to clipped text or illegibly small type.
