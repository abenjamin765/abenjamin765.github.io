---
id: language-inventory-homepage-narrative-2026-10-22
type: language-inventory
status: accepted
date: 2026-10-22
owner: echo
related_objects: []
related_evidence: []
related_decisions: []
---

# Language inventory

## Current revision: scroll-opening captions

Aaron requested that each floating phase pill start with only its centered red label visible, then slide open on scroll. Figma node308:9579 supplies the closed/open states; its motion inventory is empty, so timing is an implementation choice for the explicitly requested transition. The two captions share one progressive enhancement in newsite/process-captions.js. Both illustrations remain static, with no buttons, editable quantity, mapping highlights, or status prompts. The bridge remains “Attributes and controls come together to form a UI.” at16px.

The one-time500ms reveal clips the white surface outward, moves the unscaled red label from the center to its final position, and reveals the description over250ms after250ms. It uses the existing story ease-out token and only clip-path, transform, and opacity. The complete open layout remains reserved, including on mobile, so the diagrams never shift. The closed pill stays attached to the inset well. No-JS, unsupported APIs, reduced motion, print, keyboard scrolling, and interrupted motion retain or settle to full open captions. Fast scroll jumps also settle skipped captions; repeat visits never close them again.

Verified actual0/250/500ms frames, desktop/mobile geometry, normal completion, zero residual animations, once-only revisit, keyboard/reduced/visibility/resize interruption, pending remeasurement, print, static fallbacks, and320/390/768/845/1280px plus200% reflow equivalence. Sentry independently verified these cases and a fresh WCAG2.1AA audit with zero violations. Report: /private/tmp/folio-sentry-caption-final.json. The earlier interaction descriptions below are historical and superseded by this revision. The old storytelling.js remains unloaded; journey.js and Work remain unchanged.


## Scope

Preserve the approved hero, question-led project headlines, five question/Find out invitations, career, and practice features. Only Process wording follows the latest Figma and its explicitly approved model-to-interface direction.

## Term inventory

| Concept | UI label | Avoid |
| --- | --- | --- |
| Problem framing | How do you know you’re solving the right problem? | Unsubstantiated skill claims |
| Complexity | What makes complex software feel simple? | Repeating the classroom example |
| Service context | What happens when a design meets the real world? | Invented outcome figures |
| Team practice | How does good design become a shared practice? | Presenting fictional examples as customer evidence |

## Before / after

The booking/diamond process illustration is superseded. The heading now asks “How do I make sense of a problem before designing the solution?” Coffee’s Name, Price, Quantity and Add to order map to the annotated Java Chip card. Order’s ID, Date, Total and Submit remain static model labels.

Phase descriptions follow Figma: “Define the attributes, relationships, and actions across core system objects.” and “Decide how data and controls are presented to the user.” The obvious placeholder between them becomes “Name and price become content. Quantity becomes a control.”

Mapping status explains the inspected detail; local Add announces the requested quantity, for example “2 × Java Chip added to order.” It makes no fulfillment promise. There are no new client evidence claims, invented research findings, outcome figures, or disclaimers.

## Open glossary updates

None. Coffee and Order are illustration concepts from Aaron’s Figma, not additions to the canonical portfolio evidence model.
