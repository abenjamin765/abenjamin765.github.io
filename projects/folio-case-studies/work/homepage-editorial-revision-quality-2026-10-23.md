---
id: quality-strategy-homepage-editorial-revision-2026-10-23
type: quality-strategy
status: verified
date: 2026-10-23
owner: sentry
related_objects: []
related_evidence: [evidence-classroom-outcome, evidence-classroom-usability, evidence-curbside-pickup]
related_decisions: []
---

# Quality strategy

## Release decision

The approved local Home editorial revision is ready for Aaron's review. No blocking defects reproduced. This is local verification, not publication approval. Intro preservation overrides the earlier proposed introductory rewrite.

Scope: `newsite/index.html` and `newsite/narrative.css`; visitors assessing Aaron's product design work and experience. Critical journey: understand selected work, open a case, find experience or contact. No irreversible action was performed.

## Risks ranked

| Risk | Impact | Reach | Likelihood | Detectability | Recoverability |
| --- | --- | --- | --- | --- | --- |
| Original intro changes despite explicit preservation | High | All visitors | Medium before checks | Direct source comparison | Local reversal |
| Shorter copy overstates project results or authorship | High | All readers | Medium before checks | Published source comparison | Copy correction |
| Moving sections breaks navigation, motion, imagery or mobile layout | Medium | All visitors | Medium before checks | Browser and responsive checks | Local correction |

## Mapped acceptance criteria

| Acceptance criterion | Observable check | Status |
| --- | --- | --- |
| Keep existing introductory copy, actions and logo strip | Compare 6,560 characters from `.intro-copy` through logo strip to `git HEAD`; exact match after trailing whitespace | Pass |
| Three professional cases form an uninterrupted argument | `#work` contains Indeed, Classroom, Curbside in sequence, before Experience | Pass |
| Each case states personal contribution and a grounded consequence | Compared with `src/indeed-job-refresh.pug`, `src/classroom-assignment-management.pug`, `src/curbside-pickup.pug` and repository evidence | Pass; qualitative language retained |
| Compact experience and mentorship, with routes to depth | Experience summary and one MEOW feature; source checked against `src/home-depot-design-leadership.pug` | Pass |
| Remove repeated process/framework/writing promotion | No Coffee, Dash, Shapes or essay promo in Home; Writing remains a footer link | Pass |
| Contact is a short invitation | One sentence with email and LinkedIn | Pass |
| Local links, anchors and imagery work | 13 local/hash href occurrences resolve; all images decode | Pass |
| Responsive layout and script compatibility | 320, 390, 768, 1280 and 1440 CSS pixels: no horizontal overflow; no script errors or failed requests in final HTTP run | Pass |
| Critical content remains accessible | Axe: zero detected violations; tab sequence reaches actions/cases/experience/contact with visible outlines; no-JS content visible; reduced-motion has no running animations | Pass within tested coverage |

## Coverage plan and executed evidence

Executed with installed Puppeteer Chromium headless shell and axe-core, against `http://127.0.0.1:8765/newsite/`, on 2026-10-23. Browser tests used desktop and touch-emulated mobile; these are not physical-device tests.

- Logo control pauses/resumes with Enter and updates its accessible label. Reduced motion hides the unnecessary pause control and disables animation.
- Indeed quote opens with keyboard focus, closes with Escape, and toggles with two successive touch taps. Visible focus outline confirmed.
- Experience heading becomes opacity 1 and visible on actual scroll. Full-page captures scroll through the document before capture so entrance animation does not conceal proof.
- No-JS mobile load retains all four main sections and their case/contact copy without horizontal overflow.
- Source outcomes remain qualitative: employer-reported time/effort benefit; fewer trips to individual Classroom reports; reported pickup-pilot expectations and fulfillment-switch improvement. No new percentages or causal uplift were introduced.

Evidence directory: `/Users/aaron/Documents/ChatGPT/portfolio/output/homepage-editorial-revision/`.

| Evidence | File |
| --- | --- |
| Responsive, structure, resources, axe, keyboard, no-JS, motion and source preservation results | `checks.json` |
| Keyboard/touch control and scrolled experience state | `interactions.json` |
| Settled full-page desktop/mobile renders | `home-1280.png`, `home-390.png` |
| Readable hero and experience previews | `hero-1280.png`, `hero-390.png`, `experience-1280.png` |

Inspected the mobile full-page render and desktop experience preview. Original typography, warm palette, product imagery and spacing remain. The viewport-height intro gap is removed; experience proof remains visible after normal scrolling.

## Residual risk

No physical iOS/Safari, screen-reader announcement, browser text-zoom, production deployment or external-destination availability checks were performed. Automated accessibility checks supplement the keyboard/visual checks and do not establish universal accessibility compliance. Published employment/project claims were checked for faithful reuse, not independently audited against employer records or primary research datasets.

An initial file-protocol trial produced stylesheet/request abort artifacts. Final verification used the actual local HTTP server and recorded zero failed requests or script errors. `checks.json` retains a synthetic DOM logo comparison mismatch caused by the verifier adding `loading="eager"`; its authoritative raw-source preservation result passes.
