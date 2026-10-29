---
id: quality-strategy-homepage-narrative-2026-10-22
type: quality-strategy
status: accepted
date: 2026-10-22
owner: sentry
related_objects: []
related_evidence: []
related_decisions: []
---

# Homepage narrative quality verification

## Current revision: scroll-opening captions

Aaron requested that each floating phase pill start with only its centered red label visible, then slide open on scroll. Figma node308:9579 supplies the closed/open states; its motion inventory is empty, so timing is an implementation choice for the explicitly requested transition. The two captions share one progressive enhancement in newsite/process-captions.js. Both illustrations remain static, with no buttons, editable quantity, mapping highlights, or status prompts. The bridge remains “Attributes and controls come together to form a UI.” at16px.

The one-time500ms reveal clips the white surface outward, moves the unscaled red label from the center to its final position, and reveals the description over250ms after250ms. It uses the existing story ease-out token and only clip-path, transform, and opacity. The complete open layout remains reserved, including on mobile, so the diagrams never shift. The closed pill stays attached to the inset well. No-JS, unsupported APIs, reduced motion, print, keyboard scrolling, and interrupted motion retain or settle to full open captions. Fast scroll jumps also settle skipped captions; repeat visits never close them again.

Verified actual0/250/500ms frames, desktop/mobile geometry, normal completion, zero residual animations, once-only revisit, keyboard/reduced/visibility/resize interruption, pending remeasurement, print, static fallbacks, and320/390/768/845/1280px plus200% reflow equivalence. Sentry independently verified these cases and a fresh WCAG2.1AA audit with zero violations. Report: /private/tmp/folio-sentry-caption-final.json. The earlier interaction descriptions below are historical and superseded by this revision. The old storytelling.js remains unloaded; journey.js and Work remain unchanged.


## Release decision

Ready for local review of Aaron’s latest Coffee–Order model-to-interface section. No remaining confirmed defects. No publication or deployment performed.

## Risks ranked

| Risk | Impact | Observable check | Result |
| --- | --- | --- | --- |
| Stale Figma revision | High | Refresh high-fidelity context and screenshot during implementation | Pass: latest first-person headline, fields, red badge, gray frame |
| Model labels map incorrectly | High | All8 model/annotation buttons,4 UI targets | Pass |
| Controls mislead or navigate | High | Local quantity submit, invalid input, network/navigation monitoring | Pass |
| Diagram clips on small screens | Medium | Seven widths,200% reflow equivalent, actual screenshots | Pass |
| Asset substitution or distortion | Medium | Files, HTTP, source equality, SVG root/HTML/computed sizes | Pass |
| Surrounding behavior regresses | Medium | Source scope comparison, separate journey.js, Work hash | Pass |

## Mapped acceptance criteria

- Widths320,390,768,845,1049,1280,1440px and200% reflow equivalent fit without horizontal overflow. Native target sizes are at least68×44px for mapping buttons.
- All8 mappings highlight exactly the corresponding model/annotation pair and one UI target. Hover exit, pinned click, Escape, resting-pointer-to-keyboard transition, touch taps, native quantity focus, and Enter submission pass.
- Quantities1,2,9 succeed;0,10,1.5,empty,non-numeric fail without changing a prior success message. Submit causes zero requests/navigation.
- Reduced-motion highlights have0s transition. No autoplay or positional motion exists. No-JS leaves all8 inspection buttons and product controls disabled while both layers remain readable.
- Fresh WCAG2/2.1A/AA audits report zero violations. No runtime/HTTP errors, duplicate IDs, or missing aria-controls targets.
- All21 Figma files are nonempty and load; all59 referenced local assets load. SVG source dimensions match HTML attributes and all31 SVG instances retain declared effective dimensions. The downloaded Figma originals are byte-identical to the local implementation assets.
- HTML outside Process and non-Process CSS prefix match /private/tmp/folio-before-coffee-process. Work remains SHA256441f3dc9d410b2b801f8eaf7cb4c56e7ccb6761b4a135ce5eb79f9bee20c7a52. journey.js remains unchanged; storytelling.js previously contained only the obsolete Process root, verified before replacement.

## Coverage plan

Parent inspected high-fidelity source and final markup/CSS/JS, rendered7 widths, tested mappings/quantity/validation/reduced-motion/no-JS, verified all assets and scope, and ran syntax/a11y/documentation validators. Iris independently compared refreshed Figma against actual desktop/mobile captures and signed off the corrected texture, red badge, gray inset frame, and readable composition. Sentry independently checked responsive/input/fallback/asset/HTTP/scope behavior and reported no confirmed defects. Parent tightened only the placeholder replacement sentence after this review; final320/1280 renders verify its wrapping.

## Residual risk

Chromium headless shell tested. Native Safari/Firefox, actual screen-reader use, and true browser-UI200% zoom were not exercised; equivalent reflow was covered. Taste/clarity remain reviewed design judgments rather than measured visitor outcomes. The coffee action is a local illustration, not a real ordering service.

## Evidence

- /private/tmp/folio-sentry-coffee-report.json
- /private/tmp/folio-sentry-coffee-assets.json
- /private/tmp/folio-sentry-coffee-assets-http.json
- /private/tmp/coffee-process-{320,390,768,845,1049,1280,1440}.png
- /private/tmp/coffee-process-linked.png
- Final shareable capture: homepage-process-coffee.png in the conversation visualization folder.
