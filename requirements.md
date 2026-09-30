# Folio requirements

This file is the contract for later human and AI work on the folio: the homepage and the case studies. It describes the site as it is now. It is not the bio in `README.md`, and it is not the working notes under `docs/`. When this file and an older plan disagree, this file and the live pages win.

## 1. Overview

### Purpose

The folio is for a hiring manager who skims first and then decides whether to keep reading. The first screen has to say who Aaron is and what range of work he does. Each case has to survive a 20-second skim through its facts block and headings, and reward a full read with a real turn in the story and honest evidence.

### Routes

| Route | Source | Stylesheet |
| --- | --- | --- |
| `/` | `src/index.pug` | `folio.css` |
| `/classroom-assignment-management.html` | `src/classroom-assignment-management.pug` | `folio.css` |
| `/green-loom.html` | `src/green-loom.pug` | `folio.css` |
| `/design-dash.html` | `src/design-dash.pug` | `folio.css` |
| `/many-hats.html` | `src/many-hats.pug` | `folio.css` |
| `/a-to-z-first-claim.html` | `src/a-to-z-first-claim.pug` | `folio.css` |
| `/curbside-pickup.html` | `src/curbside-pickup.pug` | `folio.css` |
| `/price-adjustments.html` | `src/price-adjustments.pug` | `folio.css` |
| `/resume.html` | `src/resume.pug` | `resume.css` |
| `/writing.html` | `src/writing.pug` | `site.css` |
| `/blog/` | Eleventy, from `content/blog/` | `site.css` |

`src/resume-builder.pug` is an internal, unlisted tool. It uses the folio head and `folio.css`, with its own rules scoped to `.rb` in `_folio-builder.scss`. It is not part of the public folio.

### Stack

- Pages are Pug, compiled by Gulp from `src/*.pug` into `dist/`.
- Styles are SCSS, compiled by Gulp. `src/assets/style/folio.scss` is the folio entry point.
- The blog is built by Eleventy (`eleventy.config.js`).
- Folio images live in `src/assets/img/folio/`, with one folder per case (`project--assignment-management/`, `project--green-loom/`, `project--design-dash/`, `project--many-hats/`, `project--a-to-z-first-claim/`, `project--curbside-pickup/`, `project--price-adjustments/`).
- There is no component framework. Copy stays in the page files. Shared structure lives in Pug mixins.

## 2. Writing

### Where persona is allowed

A little personality is allowed in these places only:

- The homepage hero.
- The short note at the top of How I work (`.folio-claims__note`).
- Case takeaways, the "My takeaway" paragraph at the end of each outcome.
- The footer lead on the homepage and on the Classroom page.

Humor, if any, points at Aaron or at the old interface. It never points at teachers, students, operators, or regulators.

### Where language stays plain

Use plain, literal sentences for:

- Research methods and sample sizes.
- Outcome claims.
- Georgia hemp rules and the legal caveat beside them.
- Schema caveats (publishing the schema is not adoption or legal approval).
- Anything about students.

Green Loom stays plain throughout, including its footer lead and its takeaway. A hemp project should not read as a bit.

### Truthfulness

- Do not invent people, scenes, quotes, or metrics.
- On the Classroom page, "eight of ten students finished" is an illustration, and the page says so in the same paragraph: "It is an illustration, not one observed session." Keep that label if the sentence stays.
- The only observed quote on the site is "OMG, this is amazing." It is attributed to a study participant after comparing the grouped design with Version 1.
- The Classroom demo's student names and results are illustrative, and the demo says so. Keep that note.
- Peach Orchard Chew and The Corner Store are sample data, and every Green Loom caption that uses them says so. Keep those labels.
- There is no outcome number for Classroom. The outcome describes behavior (fewer trips from the Assignments page out to product reports). Do not add a percentage.
- The study sentence reads "All ten teachers in the study, five current users and five new to the suite, said the grouping matched how they expected to review assignments." Do not upgrade that to "validated" or a similar verb until Aaron confirms what was measured.

### Word budget and style

- "complex" and "clear" at most once per page each. The homepage hero uses "complex" once. The case pages use neither.
- No three-item slogan lists, such as three abstract virtues in a dek. The range of industries belongs in the dek, not as three scenes in the headline.
- First person in body copy and in meta descriptions ("I designed", "I'm Aaron Benjamin").
- Reading only a case's h1 and h2s should tell person, problem, turn, decision, and result. Current Classroom skim: "Teachers could see how many finished, not who hadn't" / "We assumed a better table would be enough" / "The API knew how many students finished, not who" / "I replaced the table with a priority view" / "Student names sit one click from each assignment" / "Making it buildable inside the product we had" / "Teachers stayed on one page instead of opening each product's report". Current Green Loom skim: "A certificate can expire without changing the product" / "Georgia requires a lab certificate from the last 12 months" / "I kept the certificate out of the product record" / "One model, two speeds of work" / "A schema for exchanged data, separate from the product model" / "Approved as design direction, with operator evidence still ahead". Current Design Dash skim: "The screen arrived before the system was defined" / "A workshop could end as a stack of files" / "I derived the rigor from the risk" / "Plain files are the only thing anyone edits" / "The Assignments session left a model the team could test". Current Many Hats skim: "One chat was answering as the whole team" / "Fifty-three methods still had no owner" / "I separated roles, skills, and project facts" / "The critic can reject the bigger product" / "v0.1 is a cloneable team, and the decision stays mine". Current A-to-z skim: "Turning a seller’s first A-to-z claim into a learning moment" / "Support contacts showed what sellers did not understand" / "Mapping and interviews made the gap concrete" / "The first-claim email had to explain, cover, and coach" / "Sixty days in the U.S.". Current Curbside skim: "Managing curbside expectations when the store is inventing the process" / "The field made the variance obvious" / "Alignment started from a problem statement, not a finished journey" / "ETA in the email, confirmation at check-in" / "Fifty stores, sixty days". Current Price Adjustments skim: "Giving associates a real markdown path in Order Up" / "Twelve stores made the workarounds impossible to ignore" / "Usability picked the pattern; language picked “Markdown”" / "Shipped widely; impact stays directional".
- A-to-z public metrics are deck-stated for a 60-day U.S. window and remain unverified in the career record. Separate email design ownership from first-claim coverage and shipping. Curbside omits the two redacted analysis percentages from the source deck; never invent them and never show `**%`. Price adjustments impact stays directional only—no invented magnitudes.

### Homepage hero and footer

The hero is two lines, matching the folio frame. The first is regular gray: "I help teams make sense of complex problems." The second is bold: "Then we ship something [adjective]" with no period after the adjective. The kicker, that line, and the dek scale down with the column so the headline stays one line. The adjective is orange (`#f18309`) and rotates: glorious, delightful, outrageous, splendid, mischievous, brilliant, audacious, exquisite, scalable, useful, clear, usable, accessible, engaging, thoughtful, intentional, durable, reliable, humane, focused, simple, sturdy, precise, inclusive, coherent, measurable, considered, legible, user-centered, ridiculous, bonkers, feral, cheeky, absurd, chaotic, spicy, suspicious, unhinged, extra. The slot shrinks and grows to the word, the current word leaves upward, and the next arrives from below. The accessible name and the meta description stay on "glorious." People who prefer reduced motion see "glorious" only. The dek is "I'm a UX and product leader with 10+ years of experience turning complex problems into useful, scalable products for companies including Amazon, The Home Depot, HP, and AT&T." The button reads "Explore my work."

- How I work note: "I believe good design is facilitated, not produced by one person in isolation." The three claims describe the practice across the career. They do not retell one case.
- Homepage footer lead: "If there's a question your product should answer and can't yet, send it my way."

Current case footer leads:

- Classroom: "We had to get student names through the assignment model and the API before any layout could show them."
- Green Loom: "I'm glad to walk through the Green Loom model, the schema, or where the pilot stands."
- Design Dash: "A screen that cannot point back to a decision does not pass the gate."
- Many Hats: "The agents can prepare the work. I still own the decision."
- A-to-z First Claim: "A high-stakes notification earns its place when it teaches the next action, not when it only softens the tone."
- Curbside Pickup: "When the store is inventing the channel, the message has to carry the expectation the product cannot yet hold."
- Price Adjustments: "The floor already had a workaround. The product needed a markdown path that kept the cart—and the rules—in view."

If the footer lead argument is omitted, the mixin falls back to "If this work is close to what your team needs, I'd like to hear from you."

## 3. Visuals

### Page treatment

- The page field is gold, `#f8b731`, set on `body.folio`.
- Content sits in a 960px column (`$col` in `_folio-layout.scss`) with 40px padding, narrowing through `clamp()` on small screens.
- The main column and homepage card media use a 16px radius (`$radius`). Figures inside cases use 8px.
- Type is Helvetica Neue with Helvetica and Arial fallbacks, ink `#333`. Eyebrows are 15px uppercase in `#666`. The Classroom demo uses Roboto to match the product.
- Case pages sit on a white main column. The gold outcome block carries its own 6px gold top border so it does not disappear into the gold page.
- The illustrated portrait (`assets/img/folio/hero-portrait.png`) appears in the homepage hero and again beside the homepage footer. Case footers do not show it.
- Link underlines are off everywhere in the folio. Links inherit color.
- The keyboard focus outline stays: `3px solid #0b67b2` with a 4px offset on `a:focus-visible` (`_folio-responsive.scss`). Do not remove it.

### HTML stories versus image files

These stories are markup, built from mixins. They are not image requests:

- Annotated frame on Classroom: Version 1 beside the grouped view, with five numbered callouts (`annotatedFrame`).
- Pull quote on Classroom: "OMG, this is amazing." (`pullQuote`).
- Object path on Green Loom: Product, Variant, Listing, with Lab Result and Inventory kept separate (`objectPath`).
- Certificate timeline on Green Loom: linked, expires, listing stopped, product unchanged, new certificate (`stepList` with the timeline variant).
- Schema diagram on Green Loom: the neutral core beside the Georgia profile (inline markup in the page).
- The interactive assignments demo on Classroom (`assignment` mixin plus `assets/js/assignment-demo.js`).

These are image files:

- `work-classroom.png`: Classroom homepage card and the default share image.
- `hero-portrait.png`, `blob.svg`, `favicon.svg`.
- `project--assignment-management/assignment-management--hero.png`: Classroom hero, also the grouped view in the annotated frame.
- `project--assignment-management/assignment-management--current-page.png`: Version 1 in the annotated frame.
- `project--assignment-management/assignment-management--object-model.png`: the object model figure.
- `project--assignment-management/demo-icons/*.svg`: demo icons.
- `project--green-loom/green-loom--mobile-catalog-2x.png`: the mobile catalog exploration (displayed 402×874).
- `project--a-to-z-first-claim/`: hero, work card, and email figure cropped from the folio deck (product UI only; sample seller/order data).
- `project--curbside-pickup/`: hero, work card, ready-for-pickup email, and check-in states cropped from the folio deck. Do not use redacted-analysis or placeholder-journey slides as metric sources.
- `project--price-adjustments/`: hero, work card, apply-markdown, and update-markdown UI crops. Order Up associate name and store number are cropped out of the header.

### Placeholder rule

When a visual has to be made by Aaron outside the repo, the page shows a placeholder, not a generated stand-in and not a known-wrong file. Every placeholder states:

- A description of what is in the frame and what must not appear, plus alt text.
- The displayed size.
- The export size.
- The path the page loads.
- The file name to export, under `src/assets/img/folio/`.

The placeholder's `img` already points at the final path. When the file is missing, the spec stays readable. When the file loads, the image covers the spec. Dropping the exported file in place is the whole swap; no markup change is needed.

Current placeholders:

| Slot | File | Displayed | Export |
| --- | --- | --- | --- |
| Green Loom case hero (also the Green Loom share image) | `src/assets/img/folio/project--green-loom/green-loom--catalog-hero-2x.png` | 960×660 | 1920×1320 |
| Design Dash work card | `src/assets/img/folio/project--design-dash/design-dash--work-card-2x.png` | 880×360 | 1760×720 |
| Design Dash case hero (also the share image) | `src/assets/img/folio/project--design-dash/design-dash--hero-2x.png` | 960×660 | 1920×1320 |
| Design Dash trace figure | `src/assets/img/folio/project--design-dash/design-dash--trace-2x.png` | 960×660 | 1920×1320 |
| Design Dash tier figure | `src/assets/img/folio/project--design-dash/design-dash--tiers-2x.png` | 960×660 | 1920×1320 |
| Design Dash model figure | `src/assets/img/folio/project--design-dash/design-dash--model-2x.png` | 960×660 | 1920×1320 |
| Many Hats work card | `src/assets/img/folio/project--many-hats/many-hats--work-card-2x.png` | 880×360 | 1760×720 |
| Many Hats case hero (also the share image) | `src/assets/img/folio/project--many-hats/many-hats--hero-2x.png` | 960×660 | 1920×1320 |
| Many Hats planes figure | `src/assets/img/folio/project--many-hats/many-hats--planes-2x.png` | 960×660 | 1920×1320 |
| Many Hats Library Holds figure | `src/assets/img/folio/project--many-hats/many-hats--holds-2x.png` | 960×660 | 1920×1320 |

The homepage card uses `src/assets/img/folio/project--green-loom/green-loom--work-card-2x.png` directly. It is not a placeholder. The picture is the corrected catalog: Peach Orchard Chew as an edible, no Flower category, no Inhalable tag, no "Help-derived" text. It is a wide crop, so do not reuse the hero file for it.

Do not request a publish-blocker screenshot. That story is told by the HTML certificate timeline. An older plan described a publish-blocker placeholder as an option; it was not used.

Do not point the Green Loom hero or card back at `green-loom--figma-hero-2x.png`. That export shows an edible tagged Inhalable with category Flower and a "Help-derived" typo, which contradicts the case. The test still requires the file to exist in `dist/`, so leave it in the folder.

## 4. Structure

### Mixins in `src/includes/folio-shared.pug`

Page chrome:

- `folioHead(pageTitle, description, pagePath, stylesheet, shareImage)`: meta, canonical, Open Graph, favicon, stylesheet. `stylesheet` defaults to `folio`. `shareImage` defaults to `/assets/img/folio/work-classroom.png`.
- `folioShell`: the skip link to `#main` and the gold blob decoration.
- `folioHeader(active, projectTitle, backHref)`: `active` is `'work'`, `'about'`, or `'resume'`. With `projectTitle`, the name link becomes a back link labeled "← {projectTitle}" pointing at `backHref`, which defaults to `/#work`.
- `folioFooter(showResume, lead, next, portrait)`: `showResume` shows View Resume unless it is `false`. `lead` is the per-page line. `next` is an optional `{ href, label }` next-case link. `portrait` shows the portrait beside the close; it defaults off, and only the homepage turns it on. The footer always has one "Email Aaron" action.

Homepage:

- `projectCard(card)`: one work card. For a linked case, pass `href`, `image` `{ src, alt }` or `placeholder` `{ description, displaySize, exportSize, fileName, src, alt }`, plus `status`, `title`, `dek`, `cta`, and optionally `id` and `feature`. The mixin also supports an email preview tile (`previewName`, `ctaHref`), which is not currently used.
- `claim(num, title)`: one How I work item. The body is the block.

Case devices:

- `caseFacts`: the facts definition list. The page supplies `.folio-case__fact` items with literal `dt` and `dd`.
- `caseSection(opts)`: a section. `opts` is `{ labelledby, tint, final, prose, figure }`. By default it wraps the block in `.folio-case__prose` and can append a simple figure. With `prose: false`, the page owns the whole section body.
- `caseFigure(fig)`: a simple image figure with optional caption.
- `caseOutcome(id, title)`: the gold outcome block with the "Outcome" eyebrow. The prose is the block.
- `pullQuote(quote, cite)`: the dark callout used as a quote.
- `annotatedFrame(opts)`: a screenshot pair with numbered callouts. The comment above it says it is "not inserted in this task." That comment is stale; Classroom uses it.
- `objectPath(opts)`: the Green Loom model diagram.
- `stepList(opts)`: a numbered step diagram. Pass `variant: "green-case__diagram--timeline"` for the certificate timeline treatment.
- `figurePlaceholder(description, displaySize, exportSize, src, fileName, alt)`: the case placeholder figure described above.
- `caseBack(href, label)`: still defined, but case pages do not use it. See the case spine below.

`src/includes/assignment-demo.pug` defines `assignment(title, stats, due, icon, locked, active)`, the Classroom demo row. Its behavior comes from `assets/js/assignment-demo.js`. Do not rebuild the demo; it works without JavaScript, opens one assignment by default, and supports the keyboard.

### Case spine

Every case follows this order:

1. `folioHead`, `folioShell`, and `folioHeader('work', title, backHref)`.
2. `main#main.folio-main.folio-main--case` containing `article.folio-case`.
3. `header.folio-case__hero`: hero media (image or `figurePlaceholder`), then `.folio-case__intro` with the "Case study" eyebrow, the h1, and the dek, then `caseFacts`.
4. `caseSection` blocks that carry the problem, the turn, and the decision, with figures and devices inside them.
5. `caseOutcome` with the result and the takeaway.
6. `folioFooter(true, lead, next)` after the article, inside `main`.

Case pages do not end with `caseBack`. The header is the way back, and the footer links to the next case. The loop is Classroom → Green Loom → Design Dash → Many Hats → A-to-z First Claim → Curbside Pickup → Price Adjustments → Classroom. Classroom's header returns to `/#work`. Each later case header returns to `/#<card id>`. `#work` is the Selected work section. An older plan listed a back link in the case spine; that instruction is stale.

### Adding a case without copying a page

1. Create `src/<slug>.pug`. Include `includes/folio-shared.pug` and build it from the spine above. Put the copy in the page, not in the mixins.
2. Give it `body.folio.folio--case`, plus a case modifier class only if it needs its own styles.
3. Put images in `src/assets/img/folio/project--<slug>/`. Use `figurePlaceholder` for any image Aaron still has to export.
4. Add a `projectCard` to the Selected work section in `src/index.pug` with an `id`. Pass `/#<id>` as the case's `backHref`.
5. Update the `next` links so the cases form a loop and none is a dead end.
6. If the case needs its own styles, add a partial and import it in `folio.scss` before `_folio-responsive.scss`.
7. Add the route to `routes` in `scripts/test-portfolio.js` and add any case-specific assertions in the same change.

Gulp compiles every `src/*.pug`, so no build list needs editing.

### Adding a work card

Call `projectCard` in `src/index.pug` with the arguments above. Use `placeholder` until the exported image exists. Do not paste card markup by hand.

### Homepage content rules

- Order: hero, Selected work (Classroom, Green Loom, Design Dash, Many Hats, A-to-z First Claim, Curbside Pickup, Price Adjustments), the Indeed credit, How I work, then the footer.
- Classroom card status: "Renaissance · Senior UX Designer". Green Loom card status: "Green Loom · Co-founder". Design Dash card status: "Design Dash · Author". Many Hats card status: "Many Hats · Author". A-to-z card status: "Amazon · UX Designer". Curbside and Price Adjustments card status: "The Home Depot · Staff UX Designer".
- Card ids the case headers depend on: `green-loom`, `design-dash`, `many-hats`, `a-to-z-first-claim`, `curbside-pickup`, `price-adjustments`. Classroom still returns to `/#work`.
- Indeed is a one-line credit ("Also shipped at Indeed…") with one email link. It is not a card.
- Nearpod, Orbit, and Bite Club are omitted until there is evidence for them. Nearpod was removed because it is not in the work history. An older plan asked to confirm Nearpod before keeping it; do not restore it without that confirmation.
- `#about` must remain. The header's About link points at it, and the test checks it. It is the How I work section.

### Styles in `src/assets/style/`

`folio.scss` imports, in order:

- `_reset.scss`: base reset, shared with the other stylesheets.
- `_folio-typography.scss`: body font and color, links without underlines.
- `_folio-layout.scss`: column variables, header, nav, hero, How I work, Selected work cards, the homepage card placeholder, the Indeed line, and the footer.
- `_folio-case.scss`: the case shell, including hero, intro, facts, sections, figures, callouts, the pull quote, the annotated frame, and the outcome block.
- `_folio-demo.scss`: the Classroom interactive demo.
- `_folio-green.scss`: Green Loom diagrams, link colors, and the timeline variant. It also holds the `figurePlaceholder` styles (`.folio-case__placeholder*`). Move those to `_folio-case.scss` if a second case starts using the mixin.
- `_folio-builder.scss`: the internal résumé builder, scoped to `.rb`.
- `_folio-responsive.scss`: the focus outline and all breakpoints. It stays last.

## 5. Boundaries and checks

### Boundaries

- Do not restyle `resume.scss` or its partials from folio work.
- Writing and blog prose keep `site.css`. Do not move them onto `folio.css`.
- Keep copy in the page files. Mixins own structure only.
- Keep the selectors the test depends on, or change the assertion in the same edit on purpose. A merged or removed Green Loom figure is a deliberate assertion change, not a silent drop.

### Build

- Full build: `npm run build`. It runs `gulp sass`, `gulp pug`, `gulp images`, `gulp js`, Eleventy, and the résumé PDF script.
- Folio-only edits: `npx gulp sass` and `npx gulp pug`. New or changed images also need `npx gulp images`.
- Tests: `npm test`, which runs `scripts/test-portfolio.js` against `dist/`. Build first. Set `PORTFOLIO_TEST_ORIGIN` to test a running server instead of the built files.

### What `scripts/test-portfolio.js` checks

- Layout: the homepage, the seven cases, the résumé, and the writing page do not scroll sideways at 320, 390, 768, or 1440 pixels wide. The blog is not in this check.
- Links: every internal link on those pages points at a file that exists in `dist/`. Same-page anchors must exist, which is how `#about` and `#work` on the homepage are checked. The résumé PDF must exist.
- Résumé: one Amazon role, roles in the right order (The Home Depot, then Snap! Mobile, then Amazon), and The Home Depot dated October 2018 to February 2022.
- Green Loom: one h1; exactly four `.green-case__figure` figures (the certificate timeline, the model, the schema, and the mobile catalog); no caption on the hero; the header reads "←Green Loom"; `green-loom--figma-hero-2x.png` and `green-loom--mobile-catalog-2x.png` exist in `dist/`; the hero image points at `green-loom--catalog-hero-2x.png`.
- Classroom: the header reads "←Classroom Assignment Management" and links to `/#work`. In the demo, exactly one assignment is open at load and sorted by Status. Opening another closes the first, and clicking it again closes it. The Due soon group opens and closes. Sorting by Student works. Enter on a focused assignment closes it. With JavaScript off, native disclosure still works.

The test does not check copy, the word budget, the placeholder specs, or whether the Green Loom card id matches its back link beyond the link-destination check.

### Open assumptions and evidence debt

- Aaron has not confirmed what the Classroom study measured beyond teachers saying the grouping matched how they expected to review work. Keep the current wording until he does.
- The Green Loom operator pilot has no start date. The page says it was written in September 2026 and does not record when the pilot started. Do not invent a date.
- Recheck Georgia hemp rules before treating the 12-month certificate rule as current. The page already tells readers to check the current rules.
- Nearpod was removed because it is not in the work history.
- Both Green Loom placeholder files are still missing. Until `green-loom--catalog-hero-2x.png` exists, the Green Loom share image points at a missing file.
- Design Dash and Many Hats image files are not exported yet. Their pages and cards point at the paths in the placeholder table. Dropping each file in place is the swap.
- No hiring manager has read the current pages. Claims about what the pages make a reader feel are untested.
