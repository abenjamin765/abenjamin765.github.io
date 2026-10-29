---
id: interface-direction-homepage-narrative-2026-10-22
type: interface-direction
status: accepted
date: 2026-10-22
owner: iris
related_objects: []
related_evidence: []
related_decisions: []
---

# Interface direction

## Current revision: scroll-opening captions

Aaron requested that each floating phase pill start with only its centered red label visible, then slide open on scroll. Figma node308:9579 supplies the closed/open states; its motion inventory is empty, so timing is an implementation choice for the explicitly requested transition. The two captions share one progressive enhancement in newsite/process-captions.js. Both illustrations remain static, with no buttons, editable quantity, mapping highlights, or status prompts. The bridge remains “Attributes and controls come together to form a UI.” at16px.

The one-time500ms reveal clips the white surface outward, moves the unscaled red label from the center to its final position, and reveals the description over250ms after250ms. It uses the existing story ease-out token and only clip-path, transform, and opacity. The complete open layout remains reserved, including on mobile, so the diagrams never shift. The closed pill stays attached to the inset well. No-JS, unsupported APIs, reduced motion, print, keyboard scrolling, and interrupted motion retain or settle to full open captions. Fast scroll jumps also settle skipped captions; repeat visits never close them again.

Verified actual0/250/500ms frames, desktop/mobile geometry, normal completion, zero residual animations, once-only revisit, keyboard/reduced/visibility/resize interruption, pending remeasurement, print, static fallbacks, and320/390/768/845/1280px plus200% reflow equivalence. Sentry independently verified these cases and a fresh WCAG2.1AA audit with zero violations. Report: /private/tmp/folio-sentry-caption-final.json. The earlier interaction descriptions below are historical and superseded by this revision. The old storytelling.js remains unloaded; journey.js and Work remain unchanged.


## Context and design thesis

Show judgment through questions, decisions, and concrete evidence. Preserve the warm paper, Helvetica Neue, glass browser, and restrained red accent already established.

## Baseline surfaces

Personal hero/Indeed, career, Classroom, Curbside, independent Process, shared practice, writing, contact, footer. Only Process changes in this pass. The connected diamonds are superseded by the user’s explicit Figma model-to-interface layout.

## Lived-in stress set

320–1440px layouts, 200% zoom, long role descriptions, no JavaScript, keyboard and touch selection, reduced motion, rapid process changes.

## Direction comparison

The approved wireframe already established the direction. Iris recommended reserving the brushstroke for Indeed, using quieter frames below it, and avoiding another card-grid work interruption. Liza approved these recommendations.

## Visual grammar

At desktop the 960px schema ground contains Coffee and Order, thin exact relationship assets, attribute pills, and action labels. Coffee has Name, Price, Quantity and Add to order; Order has Order ID, Date, Total and Submit. The model ground uses a quiet pink grid and dashed red border. The next layer uses a floating white caption with a red Representation badge over a gray grid ground, white border, and soft inset shadow. One Java Chip card contains the supplied cup photo, name, $4.95 price, native quantity, and blue Add to order. Four annotation pills point to the matching UI details. Overall grid opacity was adjusted to .045 to match the Figma screenshot’s faint material; original asset pixels are unchanged.

## Components

Shared narrative heading and type tokens; two phase-caption pills; Coffee–Order schema with exact Figma icons/connectors; one native coffee form; four linked inspection keys; two separate polite status regions. Twenty-one exact local Figma assets are used, including the texture, cup photo, icons, arrows, and dots. No new dependencies. Order-side labels are static spans, not dead interactive controls.

## Token roles

Warm paper/background; ink/body; muted/supporting text; accent/questions and selected process state; darker accent/action text; shared border, glass highlight, and ease-out roles.

## Interaction states

Default content is fully visible. Successful enhancement enables eight inspection buttons and the product fieldset. Hover, focus, or tap highlights the matching model/annotation pair and card target; click persists the inspection until another detail or Escape. Matching inputs participate reciprocally. Pointer highlight opacity transitions use 150ms and the existing story ease-out token; keyboard and reduced-motion changes are immediate. Nothing autoplays or scrolls the page. Quantity accepts integers1–9; submitting announces “2 × Java Chip added to order.” locally. No network request, checkout, payment, cart service, or fulfillment claim is involved. Incomplete initialization and no-JS keep controls disabled and static content readable.

## Perceptual diagnosis

Aaron identified that the earlier case-bound milestone diagram did not explain his broader process. Separating it from Classroom and following the same concrete booking idea through four representations makes the transformation inspectable without clicking.

## Revision log

Earlier stage lists, Classroom-bound curves, four-card canvas, and connected diamonds are superseded. Aaron supplied and then updated node302:9077 during implementation. The new version changed the headline to “How do I”, changed Coffee’s attributes from Name/Size/Roast to Name/Price/Quantity, and supplied the annotated Java Chip card. A later refresh confirmed the red Representation badge and gray inset frame, which were incorporated. The discarded full coffee-selector/order-summary draft was never integrated. The obvious “Some text about something” placeholder became “Name and price become content. Quantity becomes a control.” Desktop geometry follows the reference; accessible44px hit targets sit around the small visual chips. Below840px the schema stacks vertically; below640px representation annotations reflow beneath the card instead of shrinking the text.

## Selection record

Selected Aaron’s latest Figma model-to-interface composition. It exposes the connection between product structure and a visible interface using one concrete example. Original static assets are downloaded locally; no screenshot is embedded as an implementation asset. Additional visual concepts were unnecessary because the user provided the selected layout. Source: https://www.figma.com/design/rfEd5vFXmAdu7ioP04z1Mz/new-folio?node-id=302-9077.

## Accessibility notes

Native inspection buttons with aria-controls/aria-describedby; native labeled quantity input with min/max/step/required validation; native submit button; logical headings and separate polite mapping/order status regions. Keyboard focus has its own strong outline. Four model details always appear in text and the UI; motion never gates understanding. Disabled static fallback is readable without JavaScript. New data/behavior is scoped to data-coffee-process.

## Evidence debt

Browser coverage and remaining limitations are recorded in the sibling quality strategy. Taste recommendations are design judgments, not measured conversion claims.

## Handoff for Finn

Root data-coffee-process. Eight button[data-model-field] nodes use name,price,quantity,add, each matching one data-ui-field target. Order-side labels are static spans. Form[data-coffee-form] has data-unit-price495; fieldset[data-coffee-demo-fields] starts disabled; number input name=coffee-quantity; submit button data-coffee-add. Separate data-model-status/data-coffee-status nodes. Enable controls only after validating the complete contract; preserve immediate keyboard/reduced-motion mapping and prevent navigation.
