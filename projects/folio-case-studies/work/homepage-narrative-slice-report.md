---
id: slice-report-homepage-narrative-2026-10-22
type: slice-report
status: accepted
date: 2026-10-22
owner: finn
related_objects: []
related_evidence: []
related_decisions: []
---

# Slice report

## Current revision: scroll-opening captions

Aaron requested that each floating phase pill start with only its centered red label visible, then slide open on scroll. Figma node308:9579 supplies the closed/open states; its motion inventory is empty, so timing is an implementation choice for the explicitly requested transition. The two captions share one progressive enhancement in newsite/process-captions.js. Both illustrations remain static, with no buttons, editable quantity, mapping highlights, or status prompts. The bridge remains “Attributes and controls come together to form a UI.” at16px.

The one-time500ms reveal clips the white surface outward, moves the unscaled red label from the center to its final position, and reveals the description over250ms after250ms. It uses the existing story ease-out token and only clip-path, transform, and opacity. The complete open layout remains reserved, including on mobile, so the diagrams never shift. The closed pill stays attached to the inset well. No-JS, unsupported APIs, reduced motion, print, keyboard scrolling, and interrupted motion retain or settle to full open captions. Fast scroll jumps also settle skipped captions; repeat visits never close them again.

Verified actual0/250/500ms frames, desktop/mobile geometry, normal completion, zero residual animations, once-only revisit, keyboard/reduced/visibility/resize interruption, pending remeasurement, print, static fallbacks, and320/390/768/845/1280px plus200% reflow equivalence. Sentry independently verified these cases and a fresh WCAG2.1AA audit with zero violations. Report: /private/tmp/folio-sentry-caption-final.json. The earlier interaction descriptions below are historical and superseded by this revision. The old storytelling.js remains unloaded; journey.js and Work remain unchanged.


## Acceptance criteria mapping

| Criterion | Implementation | Status |
| --- | --- | --- |
| Latest Figma direction | First-person question, Coffee–Order model, annotated Java Chip card | Rendered |
| Concrete model-to-UI connection | Name, Price, Quantity, Add inspect matching UI | Verified |
| Accessible purposeful interaction | Native buttons/input, subtle pointer highlight, immediate keyboard/reduced motion | Verified |
| Readable default/fallback | Both layers visible; no-JS controls disabled | Verified |
| Responsive integrity | Seven widths plus reflow coverage | Verified |
| Preserve narrative | HTML/CSS outside Process and Work checksum unchanged | Verified |

## Visual refinement

Parent translated the high-fidelity Figma context into the existing HTML/CSS/JavaScript stack. No React/Tailwind or dependency was added. Exact icons, connectors, image, and grid are local assets. Iris reviewed actual renders and recommended a quieter overall texture. The latest red badge, white-bordered gray inset frame, and compact card were verified against a refreshed reference before final checks.

## Files changed

newsite/index.html: Process section only. newsite/narrative.css: Process block only. newsite/storytelling.js: replace only the obsolete Process enhancement with the new scoped mapping and quantity behavior. newsite/assets/process/:21 exact Figma assets. Surrounding homepage HTML/CSS, journey.js, Work, resume, and other existing assets remain unchanged.

## Verification

Syntax check; direct renders320,390,768,845,1049,1280,1440px; no overflow or missing images; hover mapping and Escape; keyboard quantity increment and local submit; invalid quantities blocked; reduced-motion transition0s; no-JS readable disabled fallback. All31 SVG instances retain their declared source dimensions; all21 local asset files are byte-identical to downloaded originals. Fresh WCAG2/2.1A/AA audit reports zero violations. Independent Sentry coverage and final source/scope checks are recorded in quality strategy.

## Residual risk

The coffee card illustrates the product model; the local Add action does not place a real order. Native Safari/Firefox, actual screen-reader use, and actual browser-UI200% zoom were not exercised; Chromium and reflow equivalence were tested. The visible bridge sentence is authored context replacing the reference’s explicit placeholder.

## Deferred work

Publishing/deployment and additional native-browser QA remain outside this authorized local revision.
