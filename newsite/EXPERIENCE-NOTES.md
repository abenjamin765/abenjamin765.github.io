# Experience content and asset notes

Implemented from Aaron's approved Experience finalization plan on October 20, 2026. Scope is newsite's Experience panel; other panels and section order are unchanged.

## Career copy

Career descriptions are author-provided accounts, not independently verified employment evidence. Most claims in resume/canonical/experience.yml are explicitly marked unverified. This implementation does not change their status or add metrics. Titles and dates retain the existing newsite values, including Aaron's directly confirmed Amazon and Redfin titles and Pyramid's year-only dates.

Contribution sources:
- Renaissance: claim-renaissance-ooux.
- Indeed: cross-functional UX working-group account in canonical experience.
- Redfin: claim-redfin-strengthsfinder.
- The Home Depot: Aaron's direct account in portfolio/home-depot-leadership-stories.md (co-founding UX MEOW and owning mentor training).
- Snap!: claim-snap-design-standards.
- Amazon: claim-amazon-newsletter-reach, with all numeric reach claims omitted.
- HP: claim-hp-grommet and claim-hp-design-system-adoption.
- AT&T: claim-att-design-system.
- Pyramid: claim-pyramid-campaign-templates.

Consult the matching knowledge/evidence files and resume/canonical/experience.yml for the full author accounts and provenance. Copy is ready for local review, not a claim of independent verification.

## Résumé PDF

Local copy: assets/Aaron-Benjamin-Resume.pdf.
Source: ../dist/assets/Aaron-Benjamin-Resume.pdf relative to newsite.
When the résumé is regenerated, replace this local copy from that generated source. Do not edit this PDF independently.
Source SHA-256: b5af49510e00d79440a7ef2af505d4ef8cf3f6ce97e9f0941fb01c62689372b8

## Icon

img/icons/file-text.svg: Lucide file-text, https://github.com/lucide-icons/lucide/blob/main/icons/file-text.svg (retrieved October 20, 2026). ISC license: https://github.com/lucide-icons/lucide/blob/main/LICENSE. Displayed at 16px with stroke width 2; hidden from assistive technology beside the visible résumé (PDF) label.

Company logo sources remain in img/companies/SOURCES.md.


## Employer scroller — October 20, 2026

Requested by Aaron after the vertical Experience review. Reference: https://www.gitbook.com/ .framer-15b0oan-container, inspected in the browser. Adaptation uses existing locally hosted employer marks with visible company names, low-contrast styling, a linear 60-second seamless loop, and fading edges. No GitBook artwork or runtime is copied.

Purpose: occasional marketing-page delight and an at-a-glance overview of employers. The detailed history remains static and readable independently. The repeated decorative groups are hidden from assistive technology. Pause/resume is a native icon button with an accessible action label and tooltip. Only explicit button activation changes the user pause state; hovering or focusing does not pause. Animation pauses offscreen and in a hidden tab. Reduced-motion preferences (including live changes) and no-JavaScript visits show one static, wrapping group with all nine employers.


## Scroller feedback — October 20, 2026

Aaron requested continuous playback on hover, a quieter pause/play icon, and the link label “download my resume.” The control uses local Lucide pause/play SVGs (https://github.com/lucide-icons/lucide/tree/main/icons), displayed at 14px inside a 44px target, with changing accessible labels and tooltips. Automatic focus pause was also removed so resume works immediately while the button remains focused. Offscreen/hidden-tab suspension and reduced-motion fallback remain. The local PDF link now has a download attribute and filename.


## Abridged career history — October 20, 2026

The newest four roles (Renaissance, Indeed, Redfin, The Home Depot) appear initially. A native details/summary disclosure reveals the five earlier roles, with Show more / Show less labels and a decorative Lucide chevron-down. No-JavaScript visitors can use the native disclosure. JavaScript adds a measured-height and opacity slide lasting 200ms with cubic-bezier(0.23, 1, 0.32, 1). Repeated activation reverses from the current height; reduced motion changes state immediately; resize settles to natural content height. Collapsed content is inert when enhanced. The logo lineup, résumé link, and career wording are unchanged.


## Bottom-aligned disclosure control

Aaron requested that Show more / Show less stay at the bottom of the list. The control now follows the earlier-role content in both DOM and visual order. A native button exposes aria-expanded and aria-controls. With JavaScript disabled all nine roles are visible and the unnecessary toggle is hidden. The measured 200ms slide, interruption handling, and reduced-motion support remain. After collapse, the control is brought into view only if it would otherwise be outside the usable viewport.


## Experience entrance choreography

Implemented from Aaron's approved plan. The header (280ms, 12px), outer logo strip (240ms, 8px), and four recent-role rows (260ms, 12px) enter once per page visit using opacity and transform. The shared ease-out token is cubic-bezier(0.23, 1, 0.32, 1). IntersectionObserver uses a 64px bottom inset. In a shared batch, the header starts first, logos after 80ms, and rows after 160ms with 50ms between visible rows; later row batches start immediately with the same 50ms stagger.

The inner 88-second logo loop is held until the outer strip settles, without changing manual pause state. Revealed groups are unobserved and tracked in memory only. Earlier roles retain only their existing Show more slide. Keyboard focus or pointer interaction settles the affected group immediately. Live reduced-motion changes and printing settle all groups; a hidden tab settles active entrances. Content is visible by default, arming is progressive enhancement, and failures settle affected groups visibly. No HTML, copy, layout, or other-panel motion changes.


## Entrance pacing refinement

Aaron requested slower or slightly delayed entrances after reviewing the initial motion. Header now takes 480ms, the strip 420ms, and recent rows 440ms. Each newly visible batch has a 60ms lead-in; a shared header batch starts logos at 160ms and rows at 260ms, with 70ms between simultaneous rows. The trigger area, ease-out curve, one-time behavior, focus bypass, reduced-motion fallback, and 200ms disclosure slide remain unchanged.


## Final visual polish

Aaron approved the five review recommendations: smaller mobile wordmarks with tighter gaps, optically balanced square marks, tighter header/strip spacing, improved text wrapping, softer yellow highlighting, and a disclosure aligned with the desktop description column. All 15 logo variants retain intrinsic aspect ratios and matching duplicate-group geometry. Shared column variables keep the list and disclosure aligned at each breakpoint. Contributions use balanced wrapping; K–12 and Object-Oriented UX stay together where space allows, with emergency wrapping for enlarged text. The highlight alpha is now 30%. Entrance timing and disclosure behavior are unchanged.

Validated at 320, 390, 768, 900, 1024, and 1440px: no horizontal overflow, logos loaded, matching loop groups, aligned controls, and nine roles on expansion. Checked 200% text at 320px, reduced motion, and Experience accessibility (zero axe violations). Desktop and mobile renders were reviewed.
