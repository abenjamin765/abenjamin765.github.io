---
id: run-packet-homepage-narrative-2026-10-22
type: run-packet
status: accepted
date: 2026-10-22
owner: liza
related_objects: []
related_evidence: []
related_decisions: []
expected_artifacts: [interface-direction, language-inventory, slice-report, quality-strategy]
---

# Run packet

## Current revision: scroll-opening captions

Aaron requested that each floating phase pill start with only its centered red label visible, then slide open on scroll. Figma node308:9579 supplies the closed/open states; its motion inventory is empty, so timing is an implementation choice for the explicitly requested transition. The two captions share one progressive enhancement in newsite/process-captions.js. Both illustrations remain static, with no buttons, editable quantity, mapping highlights, or status prompts. The bridge remains “Attributes and controls come together to form a UI.” at16px.

The one-time500ms reveal clips the white surface outward, moves the unscaled red label from the center to its final position, and reveals the description over250ms after250ms. It uses the existing story ease-out token and only clip-path, transform, and opacity. The complete open layout remains reserved, including on mobile, so the diagrams never shift. The closed pill stays attached to the inset well. No-JS, unsupported APIs, reduced motion, print, keyboard scrolling, and interrupted motion retain or settle to full open captions. Fast scroll jumps also settle skipped captions; repeat visits never close them again.

Verified actual0/250/500ms frames, desktop/mobile geometry, normal completion, zero residual animations, once-only revisit, keyboard/reduced/visibility/resize interruption, pending remeasurement, print, static fallbacks, and320/390/768/845/1280px plus200% reflow equivalence. Sentry independently verified these cases and a fresh WCAG2.1AA audit with zero violations. Report: /private/tmp/folio-sentry-caption-final.json. The earlier interaction descriptions below are historical and superseded by this revision. The old storytelling.js remains unloaded; journey.js and Work remain unchanged.


## Outcome

Implement Aaron’s updated Figma Process direction (rfEd5vFXmAdu7ioP04z1Mz, node302:9077). Replace the superseded diamonds with Coffee–Order object modeling and an annotated Java Chip product card. The first-person question, Name/Price/Quantity, pink schema grid, red Representation badge, gray inset representation frame, real coffee image, and blue Add action follow the latest retrieved design. Connect four model details to their UI representation through optional hover/focus/tap inspection. Preserve all surrounding homepage content and behavior. Local implementation only.

## Owners and sequence

| Order | Owner | Artifact or decision | Depends on |
| --- | --- | --- | --- |
| 1 | Liza | Translate approved direction and integrate | Aaron’s explicit Go ahead |
| 2 | Iris | Working canvas layout and original HTML/CSS diagram | Existing system, approved structure |
| 3 | Finn | Finite optional trace motion | Visible diagram contract |
| 4 | Liza | Static Classroom, section integration, direct render review | Iris/Finn artifacts |
| 5 | Sentry | Independent responsive/interaction/accessibility checks | Integrated page |

## Human gates

No additional human decision is required for the authorized local revision. Do not publish, deploy, merge, or message externally under this run.

## Expected artifacts

`interface-direction`, `language-inventory`, `slice-report`, and `quality-strategy`; sibling files prefixed `homepage-narrative-`.

## Completion evidence

Object model and product representation are both visible at rest and without JavaScript. Four supported mappings connect eight model/annotation buttons to four card targets; Order attributes remain static because no Order UI is represented. Quantity is a native 1–9 control; Add produces only a local announcement. Parent rendered seven widths, checked assets/geometry, interactions, accessibility, and scope. Iris reviewed actual renders against refreshed Figma. Independent Sentry results are recorded in quality strategy.
