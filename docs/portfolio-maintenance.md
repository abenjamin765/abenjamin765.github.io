# Portfolio maintenance

## Shared catalog and authored stories

`src/assets/data/portfolio.yml` is the build-time catalog for the production hostname, descriptions, social images, project routes, groupings, four opening facts, and the next-story sequence. It is JSON-compatible YAML. `lib/portfolio-data.js` validates it; Pug and Eleventy consume the same data. Keep the nine existing URLs and meaningful anchors stable. The Price Adjustments next link must lead to Green Loom.

Each case extends `src/includes/case-layout.pug`. Author its `caseConfig`, `caseIntro`, `caseMedia`, and `caseStory` blocks; use `caseScripts` only for that page’s interaction. The shared opening is introduction → role/scope/decision/outcome facts → primary artifact. Narrative stays in each case template, rather than in the metadata catalog. Project cards resolve their titles and URLs through the catalog; their problem, contribution, outcome, and thumbnail descriptions remain authored in `src/index.pug`.

`src/includes/folio-shared.pug` owns header, back link, footer, next-story navigation, figures, evidence excerpts, disclosures, comparisons, qualified outcomes, and prototype frames. Eleventy uses these same header/footer mixins for articles. Disclosures use vendored Lucide expand/shrink icons and the shared `case-disclosures.js` enhancement; native details remain usable without JavaScript, with immediate keyboard/reduced-motion activation and interruptible pointer transitions. A supporting detail belongs in `caseDisclosure`; a qualification that changes the claim’s meaning belongs beside the claim in the primary story.

## Evidence and visuals

Keep source and provenance in the private claim-and-asset inventory. At the owner’s request, case-study artifacts do not display provenance disclaimers, caption blocks, or full-size links. Explain fictional records, retrospective results, confidentiality, and program-level attribution where applicable. Never imply that an illustration is contemporaneous research evidence. Public availability is not adoption; a completed workflow is not proof of deployment or compliance.

Precise interface text, values, rules, and state changes belong in native HTML or a deterministic layout. A dense screenshot needs a readable text excerpt and an explanation in the story. Keep original source artifacts; remove their redundant public placement when they no longer explain a decision. Private claims, prompts, and review inventories stay outside `dist`.

Preserve supplied hero and tile assets. Run `npm run images:variants` with Python 3 and Pillow after adding/changing imagery. The script creates WebP delivery variants without cropping and preserves transparency; it caches unchanged source hashes and regenerates `src/includes/image-variants.pug` plus `src/assets/data/image-variants.json`. Original PNG/JPEG files are copied unchanged; supporting figures load lazily and reserve dimensions. Adjust `sizes` when a layout changes. Run `npm run images:share` to regenerate deterministic 1200×630 social cards after catalog or share-art changes.

## Styles

`_folio-tokens.scss` owns portfolio tokens. Layout, case typography, responsive rules, story structures, reading/evidence devices, and Writing each have a dedicated partial. Maintain the gold shell, shared controls, visible focus, section spacing, and bottom container margin. Classroom and markdown demo styles load only on their case pages. The unlisted résumé builder has its own stylesheet.

The essay uses the portfolio stylesheet and chrome, with a comfortable reading measure. Do not restore its former separate navigation or color system. Keep the homepage’s eight-word rotation, pause control, reduced-motion behavior, and natural line wrapping. Test accent colors against their actual backgrounds.

## Résumé

Canonical identity and experience remain under `resume/canonical`; profiles select approved claims without changing employment titles or chronology. Do not promote a claim’s verification status merely because it is published. `npm run resume:export` regenerates exports; the regular build regenerates the tagged public and ATS PDFs. Inspect PDF reading order, chronology, and contact annotations after copy changes. The public page keeps the shared back treatment and one PDF action.

## Embedded catalog

See `src/prototypes/green-loom/README.md`. Ordinary builds copy the checked-in standalone snapshot. Deliberate rebuilds use `node scripts/build-green-prototype.mjs`, record upstream commit/dirty state/component hashes, and fail if required adapters no longer match. They read the local Green Loom app without modifying it.

Portfolio-only presentation is in `polish.css`, loaded after the application CSS. The local React wrapper restores the stock dialog’s launch control after cancellation/save and announces local stock changes. The prototype uses fictional generic records, not a Georgia publication demonstration; eligibility, COA import, and regulatory checks are outside its demonstrated stock workflow. Keep all data local, lazy iframe loading, mobile back navigation, noindex, and the standalone fallback link.

## Build and release checks

Run `npm run build`, `npm test`, `npm run test:green`, `npm run test:readiness`, and `npm run test:prototype-a11y`. Use `PUPPETEER_EXECUTABLE_PATH` when the installed browser differs from Puppeteer’s cached browser. Firefox checks use `PORTFOLIO_TEST_BROWSER=firefox`; reduced-motion media emulation and Chrome accessibility-tree inspection are explicitly covered in Chrome, because the Firefox automation transport does not support those CDP APIs.

Readiness checks cover 14 public review routes at 320, 390, 768, 1024, and 1440px; 200% text enlargement; visible skip links and disclosures; heading/ID structure; canonical/OG/Twitter metadata; share images; the 13-page sitemap; noindex prototype; and branded missing-page behavior. `PORTFOLIO_REVIEW_DIR` saves screenshots and automated accessibility results. Prototype checks exercise settled product/variant/dialog states, contrast, focus restoration, and local stock updates.

Automated checks do not establish WCAG conformance. Before release, complete a real screen-reader journey and physical mobile-browser review. After an authorized deployment, verify redirects, canonical/share URLs, sitemap, actual 404 status/body, and production performance. Local transfer sizes are diagnostics, not field-performance measurements. External publication and pull requests require the human’s authorization under `AGENTS.md`.
