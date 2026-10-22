# Migrate meaning before repainting

**Claim:** The report says a migration starts by inventorying values and assigning semantic roles, not by restyling components to look like iOS or Metro.

**Sources:** Metro × Apple design-system report (attachment `deep-research-report__11_.md`).

## Evidence

**Prescribed order:** Tokens first, keeping the visual result mostly unchanged. Then shared component behavior. Then accessibility (contrast, targets, labels, focus, keyboard, live regions, reduced motion, scaling, reflow). Then replace imitated system UI with native controls where that applies. Visual refinement last.

**Prescribed inventory:** Cluster equivalent literals, alias them, and only then pick a normalized value after contrast, brand intent, and usage. The three blue literals in the report are an illustration of clustering, not a chosen brand. See `brand-palette-unspecified.md`.

## Implication for this portfolio

If `style.css` is later tokenized, the report says to name existing colors before replacing them. It does not authorize a Metro or Liquid Glass reskin of the intro.

## Limit

There is no inventory of `newsite/style.css` in the source.
