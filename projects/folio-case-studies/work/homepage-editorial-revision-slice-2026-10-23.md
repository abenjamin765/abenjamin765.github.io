---
id: slice-homepage-editorial-revision-2026-10-23
type: slice-report
status: accepted
date: 2026-10-23
owner: finn
related_objects: []
related_evidence: [evidence-classroom-outcome]
related_decisions: [direction-homepage-editorial-review-2026-10-23]
---

# Slice report

## Current revision: compact spacing

Applied the next three browser comments: removed the remaining Classroom outcome line; limited Curbside's placeholder to 640px wide (360px tall at full size); removed Contact's full-viewport panel class and tightened its vertical padding to 48px, or 40px on mobile. Versioned the narrative stylesheet URL so the refreshed preview loads current layout rules. At Aaron's 949 × 928 viewport, directly verified in the in-app browser: Contact is about 296px tall, Curbside is 640 × 360, and there is no horizontal overflow. Additional checks at 320, 390 and 1440px passed with no script errors. Reviewed section renders in `/Users/aaron/Documents/ChatGPT/portfolio/output/homepage-spacing/`. Diff whitespace check passed. No publication performed.

## Current revision: browser comments

Implemented Aaron's ten browser comments: removed Indeed/Classroom/Curbside introductory heading blocks; removed Indeed and Curbside outcome paragraphs; removed project eyebrows, including MEOW; restored question-based case-study invitations with “Find out” for all four cases; matched Experience title size, weight, line height, tracking and responsive scale to the shared section headings. The Classroom outcome paragraph was not marked for removal and remains.

Classroom now uses a glass browser frame containing `newsite/img/placeholders/classroom.svg`; Curbside uses `newsite/img/placeholders/curbside.svg`. Both are neutral 1600 × 900 SVG placeholders awaiting Aaron's exports. Existing project images and case-page assets were preserved. Accessible article labels now reference the CTA questions after removing their headings.

Verified at 320, 390, 768, 1280 and 1440px: no overflow, missing images, broken local links/fragments, script/request errors, or axe violations. Reviewed desktop/mobile renders. Evidence is in `/Users/aaron/Documents/ChatGPT/portfolio/output/homepage-browser-comments/`. Static requirement checks and diff whitespace validation passed. No publication performed.

## Current revision: restored sections

Aaron subsequently requested that Indeed return to its former position and that the original Experience and Process sections return. This supersedes the grouping/removal criteria below. Indeed is again nested in Intro, immediately before Experience. The original Experience and Process HTML blocks were restored exactly from the pre-editorial source, including all nine roles, the disclosure, both diagrams, and the process-caption script. Classroom and Curbside retain the clearer contribution/outcome copy; the single MEOW feature and brief contact remain. Dash/Shapes and the long writing promotion remain off Home.

Verified source-block equality and section order; browser checks at 320, 390, 768, 1280 and 1440px show no overflow or broken images. Local links/fragments resolve; zero script/request errors and zero axe violations. Tested Experience expand/collapse (nine total entries), both Process layers and active caption enhancement. Reviewed the desktop render; desktop/mobile captures and checks are in `/Users/aaron/Documents/ChatGPT/portfolio/output/homepage-restored-sections/`. No publication performed. Earlier acceptance mapping below records the preceding revision, not the current scope.

## Acceptance criteria mapping

| Criterion | Implementation | Status |
| --- | --- | --- |
| Preserve existing introduction per Aaron's explicit override | Original intro copy, actions, and logo-strip markup retained byte-for-byte; existing typography, widths, margins, and logo behavior retained | Static and visual verification passed |
| Uninterrupted selected work with distinct capabilities | Indeed → Classroom → Curbside grouped under #work, each with company/capability context, personal contribution, product imagery, supported qualitative consequence, and descriptive case link | Implemented |
| Preserve proof while shortening narrative | All three existing professional product previews retained, including Indeed quote interaction and curbside email/app comparison | Implemented |
| Compact experience and leadership | Current Senior UX role and career breadth summarized; one MEOW feature states co-founder contribution, mentor training, workshops, and project sourcing | Implemented |
| Move chronology and granular detail deeper | Full experience/resume destination retained; Process tutorial, Dash/Shapes previews, and full essay promotion removed from Home; Work unchanged | Implemented |
| Brief contact | One invitation with existing email and LinkedIn actions | Implemented |
| Valid navigation and resilient interactions | #intro, #work, #experience, #practice, #contact targets retained; removed obsolete Practice nav item; removed unused process-captions.js load; kept journey.js | Static and browser verification passed |

## Files changed

- `newsite/index.html`: editorial sequence and concise, evidence-based copy.
- `newsite/narrative.css`: scoped homepage presentation for context labels, outcomes, compact leadership layout, and minimum-height adjustment after moving Indeed out of Intro. Shared existing component rules retained because other pages use this stylesheet.
- This slice report.

## Verification

- Custom Python HTMLParser check: balanced HTML nesting, unique IDs, valid local fragment targets passed.
- Byte comparison against pre-edit snapshot: introduction copy, actions, and entire logo-strip markup identical.
- Local URL/asset inspection: all 30 distinct local asset and page destinations exist.
- `git diff --check -- newsite/index.html newsite/narrative.css`: passed.
- Inspected `journey.js`: optional legacy chronology code is guarded by `.experience-more`; quote and logo targets retained; navigation reads top-level `.panel` sections, now including Work and Contact.
- Independent Sentry HTTP browser checks: no horizontal overflow or broken images at 320, 390, 768, 1280 and 1440px; all local links/fragments resolve, zero script/request errors, and zero automated accessibility violations. Keyboard focus, reduced motion, and no-JavaScript content visibility checked.
- Liza directly inspected final desktop and mobile renders and verified contribution/outcome wording against project sources. Initial full-page captures had not scrolled the animated experience header into view; final captures reflect its settled visible state.
- Browser evidence: `/Users/aaron/Documents/ChatGPT/portfolio/output/homepage-editorial-revision/checks.json` and `home-1280.png`, `home-390.png` in that directory.
- No broad site build or publication run; this change affects the standalone newsite page only.

## Residual risk

Qualitative outcome copy reflects existing case evidence, not new measurement. Curbside retrospective numeric figures were intentionally omitted. Automated accessibility checks and rendered review do not establish visitor comprehension or a complete assistive-technology audit. External destinations were retained, not live-audited.

## Deferred work

Work and case-study destinations remain unchanged. Full chronology remains available through the existing resume destination. No publication was authorized or performed.
