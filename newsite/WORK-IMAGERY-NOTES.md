# Work illustrations

The approved illustrated set is hosted in `img/work/illustrated/`. The homepage Work showcase uses the approved Renaissance, Indeed and Curbside Pickup companion heroes. The static `work.html` index uses all nine thumbnails. The remaining companion heroes are retained for future case-study pages. No case-study interiors have been changed.

These are AI-generated conceptual illustrations created with built-in image_gen. They are not photographs of actual people or events, product screenshots, or research evidence. Future case-image captions should identify them as conceptual AI illustrations. The overview images are decorative, with empty alt text, because project titles and descriptions supply the content.

`img/work/illustrated/manifest.json` records the selected versions, full prompts, references, dimensions, and source PNG filenames. Transparent PNG masters and earlier versions remain at /Users/aaron/Documents/ChatGPT/portfolio/output/case-study-imagery/illustrated. WebP files are lossless exports with original dimensions and transparency. To update the artwork, replace its versioned image and corresponding manifest entry.

Image containers use contain fitting and transparent backgrounds without borders. Homepage heroes use a 2.5:1 ratio; index thumbnails use 2:1. No publishing performed.

## Showcase behavior

`work-showcase.js` enhances three static cases into a manually controlled carousel. It has no autoplay or swipe handling. Grid overlap reserves the tallest natural slide height. Inactive slides are inert and hidden from assistive technology. A destination image must decode successfully before the current case changes. Transitions use the existing ease-out curve, with a 120ms fade out and 180ms fade in; reduced motion changes slides immediately. Hidden-tab and live reduced-motion changes finish active fades. No-JavaScript visits show all three cases; print styles expose every case.

The shared entrance coordinator in `journey.js` observes the Work header and showcase wrapper, never individual slides. Experience behavior and site navigation are preserved. The work index is static and does not load either script.

Validated at 320, 390, 768, 1024 and 1440 CSS pixels, including 200% text sizing and 320px reflow equivalent to 400% zoom on a 1280px viewport. Checked keyboard focus, wraparound, stable height, image failure and successful retry, live reduced motion, hidden-tab interruption, no JavaScript, print, navigation and automated accessibility. Local checks and screenshots are recorded in `/Users/aaron/Documents/ChatGPT/portfolio/output/work-showcase/`.
