# Apple-informed UI design skills for Many Hats

**Audience:** Many Hats maintainers  
**Date:** August 29, 2026  
**Decision:** How to help agents recognize quality, explore alternatives, revise progressively, explain choices, and align on a winning interface direction.

## Recommendation

Do **not** add an “Apple look” recipe to Many Hats. Add a **design-judgment loop** to `shape-interface-system`, supported by focused reference modules, a richer `interface-direction` artifact, and behavioral evaluations.

Apple’s strongest lesson is not glass, rounded corners, or a house style. It is that design is intentional: every feature spends a person’s time, attention, and trust; simplicity means removing friction rather than merely looking minimal; and craft comes from iteration and attention to behavior as well as appearance. Apple explicitly says there is no formula that guarantees the right result. ([Apple, “Principles of great design,” WWDC26](https://developer.apple.com/videos/play/wwdc2026/250/))

That direction fits Many Hats’ architecture. Keep the core skill portable and cross-platform. Use Apple as a high-quality source of principles, platform conventions, and worked examples—not as a visual default.

## What Many Hats already does well

The current skills establish useful boundaries:

| Existing strength | Where it lives |
| --- | --- |
| Flow and information structure precede visual polish | `map-product-flows`, Charlie |
| Hierarchy, components, tokens, states, responsive behavior, and accessibility are in scope | `shape-interface-system`, Iris |
| Native semantics and proven primitives precede custom composites | `shape-interface-system` references |
| Independent critique is separated from implementation ownership | `critique-product-decision`, Allie |
| Critical interactions receive risk-based accessibility and failure verification | `verify-product-quality`, Sentry |

The gap is not another component checklist. The gap is the reasoning between “the flow is valid” and “this interface direction is coherent, distinctive, resilient, and worth shipping.”

The current `shape-interface-system` workflow can produce a competent specification, but it does not require agents to:

- state the intended feeling and aesthetic thesis;
- study real content and hostile states before styling;
- create comparable visual directions;
- diagnose why a design feels off;
- revise in deliberate passes;
- explain why the winner is better than the runner-up;
- preserve unresolved taste judgments as assumptions rather than facts.

The current `interface-direction` template is correspondingly thin, and its baseline evaluations mostly test activation and recovery—not design behavior.

## The design-judgment loop to add

Add the following workflow to `shape-interface-system`. It should run after Charlie’s structure is sufficiently defined and before Finn treats the direction as implementation-ready.

### 1. Frame the experience

Require a short design thesis:

- user purpose and primary task;
- attention, time, trust, or data the interface asks for;
- intended emotional quality, such as calm, confidence, focus, or energy;
- platform, input, posture, environment, expertise, and accessibility contexts;
- established product and platform conventions that should remain familiar.

This translates Apple’s purpose, agency, responsibility, familiarity, flexibility, simplicity, craft, and delight into a usable brief. It also prevents “Apple-like” from becoming an aesthetic instruction. ([Apple design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles); [WWDC26](https://developer.apple.com/videos/play/wwdc2026/250/))

### 2. Build a lived-in stress set

Before aesthetic exploration, assemble representative fixtures:

- ordinary, empty, loading, partial, error, permission, destructive, and success states;
- shortest, typical, and extreme text and data;
- light/dark, increased contrast, reduced motion, and large text;
- narrow/wide layouts and relevant input modes;
- first launch, login, settings, and the product’s critical tasks.

Apple’s accessibility criteria judge whether people can complete **all common tasks** with a claimed accessibility feature and recommend device-specific evaluation. That is a stronger model than checking isolated components. ([Apple Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels))

Real content also improves agent judgment. Apple’s 2026 session on agent-assisted prototyping recommends realistic data, named variations, and easy switching between them so defects appear before a direction hardens. ([Apple, “Create UI prototypes using agents in Xcode”](https://developer.apple.com/videos/play/wwdc2026/227/))

### 3. Define a small visual grammar

Specify roles rather than isolated decoration:

- hierarchy and scan order;
- type roles and density;
- spacing and grouping rhythm;
- color and material roles;
- shape, border, depth, and icon rules;
- imagery or data-visualization behavior;
- motion’s communicative job;
- the one or two traits that make the product recognizable.

This grammar must answer both “does it belong to the system?” and “could it belong specifically to this product?” Airbnb’s published principles pair unified/universal behavior with iconic/conversational character, a useful guard against both inconsistency and generic sameness. ([Airbnb’s design principles](https://principles.design/examples/airbnb-design-principles))

### 4. Generate genuinely different directions

Produce two or three named directions while holding the approved flow and core content constant. Each direction should differ on declared visual or interaction dimensions—for example density, typographic voice, information emphasis, material treatment, or motion character—not just colors and corner radii.

Keep this distinct from Charlie’s structural concept divergence. If a proposed visual direction changes the hub object, page architecture, or primary flow, route it back to Charlie.

Apple’s agent-prototyping guidance recommends generating multiple variations, naming them, switching between them, and remixing the best parts. Crucially, Apple describes agents as collaborators and reserves the key judgment for the person directing the work. ([WWDC26 agent prototyping session](https://developer.apple.com/videos/play/wwdc2026/227/))

### 5. Diagnose before revising

Require an explicit diagnosis instead of “this feels better.” Review each direction through these lenses:

| Lens | Questions |
| --- | --- |
| Purpose | Does the most prominent thing advance the primary task? What can be removed? |
| Hierarchy | Where does the eye go first, second, and third? Are emphasis and de-emphasis intentional? |
| Grouping | Do proximity, rhythm, alignment, and whitespace express the right relationships? |
| Legibility | Does content survive real data, localization, zoom, contrast modes, and large text? |
| Coherence | Do repeated roles behave and look consistently across surfaces and states? |
| Character | Is the expression specific to the product and intended emotion without taxing comprehension? |
| Interaction | Are controls familiar, feedback immediate, motion purposeful, and recovery clear? |
| Resilience | Does the core outcome survive device, input, network, browser, and enhancement failure? |

Refactoring UI is valuable here because it teaches concrete diagnosis—de-emphasis, fewer borders, controlled spacing, visual hierarchy—rather than relying on innate “talent.” ([Refactoring UI](https://refactoringui.com/)) Braun and Dieter Rams add the right constraint: reduction should protect usefulness, intelligibility, honesty, longevity, and care; it is not a monochrome preset. ([Braun’s 100 years of design](https://www.braunhousehold.com/en-us/e/braun-100-years))

### 6. Revise in named passes

Every revision should record:

`question → observed defect → evidence → principle → change → expected effect → verification`

Use separate passes so one kind of polish does not conceal another kind of failure:

1. Purpose, flow, and recovery
2. Hierarchy, grouping, and language
3. Platform behavior and responsive adaptation
4. Accessibility and semantic interaction
5. Typography, color, imagery, and optical alignment
6. Motion, feedback, performance, and implementation fidelity
7. Reduction: remove anything that no longer earns its place

Apple’s own design cycle is discover, prototype, validate, and iterate; its worked design walkthrough refines structure, navigation, content, then visual design. ([Apple app design cycle](https://developer.apple.com/tutorials/develop-in-swift/explore-the-app-design-cycle); [“Design foundations from idea to interface”](https://developer.apple.com/videos/play/wwdc2025/359/))

For the web, each pass should preserve a minimum viable experience and layer enhancement according to capability. This is the durable common ground in Wroblewski, Gustafson, and Piccalilli: responsive design changes behavior for context, and progressive enhancement starts from a usable core rather than a fragile ideal. ([Luke Wroblewski, Mobile First layout](https://www.lukew.com/mobilefirst/09-chapter-7/index.html); [Aaron Gustafson](https://www.aaron-gustafson.com/notebook/where-do-we-go-from-here/); [Piccalilli](https://piccalil.li/blog/how-a-minimum-viable-experience-produces-a-resilient-inclusive-end-product/))

### 7. Select without pretending taste is arithmetic

Use hard gates for semantics, accessibility, recovery, critical-state coverage, and responsive integrity. Do not average a failed gate into a passing score.

Among valid directions, compare qualitative fit to purpose, evidence, system coherence, product character, platform fit, effort, and reversibility. Record:

- selected direction and rationale;
- strongest runner-up and why it lost;
- useful elements remixed from other directions;
- tradeoffs accepted;
- assumptions and untested judgments;
- human decision required, if brand or strategy materially changes.

Award winners are useful as annotated cases, not templates. The 2026 winners demonstrate very different successful strategies: grug’s narrow, playful restraint; Guitar Wiz’s integrated accessibility; Moonlitt’s platform fit; Tide Guide’s readable data and cohesive aquatic expression; and Primary’s content-first minimal interface. ([2026 Apple Design Awards](https://developer.apple.com/design/awards/)) The transferable lesson is the fit between purpose, platform, interaction, accessibility, and character—not any shared surface style.

## Recommended file changes

### Priority 0 — strengthen the existing capability

1. `skills/shape-interface-system/SKILL.md`
   - Add the design thesis, lived-in stress set, visual grammar, comparative directions, perceptual diagnosis, named revision passes, and decision record.
   - Separate hard gates from qualitative judgment.
   - Require motion rationale and a reduced-motion equivalent.

2. `templates/work/interface-direction.md`
   - Add sections for context, design thesis, stress fixtures, direction comparison, visual grammar, perceptual diagnosis, revision log, selection rationale, and evidence debt.

3. `skills/shape-interface-system/evals/cases.jsonl`
   - Keep the baseline discovery/recovery cases.
   - Add behavioral cases described below.

4. `skills/shape-interface-system/skill.yaml`
   - Expand success criteria to include comparative evidence, critical-state resilience, and a traceable direction decision.

### Priority 1 — add progressive references, not a giant manual

Add focused resources under `skills/shape-interface-system/references/`:

- `design-principles.md` — cross-platform translation of Apple, Rams, and complementary sources;
- `visual-diagnosis.md` — the eight lenses with before/after prompts;
- `iteration-protocol.md` — revision record and fidelity-by-question guidance;
- `exemplar-cards.md` — annotated award cases with provenance and expiration/review dates;
- `motion-and-feedback.md` — purpose, continuity, interruptibility, input feedback, and reduced motion;
- `web-resilience.md` — responsive context, semantic baseline, and progressive enhancement.

Do not embed a screenshot gallery or copy proprietary book material. Store source links, compact transformations, and only guidance that changes an agent decision.

### Priority 2 — clarify the team loop

| Role | Design-loop responsibility |
| --- | --- |
| Charlie | Owns structure, IA, flow, and genuinely structural alternatives |
| Iris | Owns visual grammar, interaction-system direction, comparative visual exploration, and selection record |
| Finn | Builds representative interactive prototypes and temporary tuning controls |
| Echo | Reviews hierarchy-supporting labels, instructions, and emotional tone |
| Sentry | Verifies task completion, accessibility, responsive behavior, and critical states |
| Allie | Independently challenges ornamental complexity, imitation, weak evidence, and hidden user cost |
| Liza / human | Resolves brand, scope, priority, and consequential tradeoffs |

This keeps Allie independent and avoids turning design critique into a committee taste vote.

## Behavioral evaluations to add

The current evaluation baseline tests whether the skill activates. Add cases that test whether it behaves well:

1. **“Make it Apple-like.”** Pass only if the agent extracts relevant principles and context, rejects surface imitation, and keeps product/platform evidence primary.
2. **Three directions.** Pass only if directions differ on declared visual or interaction dimensions while preserving the approved structure.
3. **Lived-in content.** Provide long text, missing media, dense data, an error state, and large text. Pass only if the direction and revision survive them.
4. **Defect-led revision.** Pass only if each change names the observed defect, principle, expected effect, and verification.
5. **Winner explanation.** Pass only if the agent compares the selected direction with a credible runner-up and states tradeoffs and evidence debt.
6. **Motion proposal.** Pass only if motion has a communicative purpose, is interruptible where relevant, and has a reduced-motion equivalent.
7. **Award exemplar.** Pass only if the agent extracts the problem, platform advantage, interaction, accessibility, emotional aim, transferable pattern, and non-transferable treatment.
8. **Accessibility end to end.** Pass only if common tasks—not merely individual controls—remain completable.
9. **Responsive adaptation.** Pass only if changes are explained in terms of space, input, posture, content, or capability rather than arbitrary device labels.
10. **Taste disagreement.** Pass only if the agent separates invalid directions, evidence-backed concerns, reversible preferences, and decisions that belong to the human.

For assessment, use expert rubric review plus deterministic artifact checks. Avoid a single “beauty score.” Aesthetic judgment becomes more reliable when the evidence, comparison, and revision trail are inspectable, not when taste is disguised as a number.

## What not to do

- Do not create a top-level `apple-design` skill inside Many Hats; it would fragment Iris’s ownership and overfit a portable system to one platform.
- Do not turn Liquid Glass, spring values, type choices, or corner radii into global defaults.
- Do not use award status as evidence that a specific visual treatment caused success.
- Do not let visual polish reopen approved product structure silently.
- Do not make every design run the full process; scale the loop to risk, novelty, and reversibility.
- Do not treat “less” as automatically better. Apple explicitly distinguishes simplicity from minimalism, and Rams ties reduction to usefulness and understanding.

## Adoption sequence

1. Implement Priority 0 as one reviewable practice change with new behavioral evals.
2. Pilot it on two contrasting interfaces: one dense operational workflow and one expressive consumer surface.
3. Compare old and new outputs on structural fidelity, hierarchy, state resilience, explanation quality, iteration quality, and reviewer disagreement.
4. Add only the reference modules that the pilot proves useful.
5. Promote further changes through `evolve-team-practice` after observed outcomes, preserving the evidence and regression cases.

## Confidence and limitations

Confidence is **high** that Many Hats needs a judgment-and-iteration layer rather than more isolated styling rules. Apple’s current guidance, its agent-prototyping workflow, and the complementary sources converge strongly on purpose, constraints, comparative exploration, resilience, and iteration.

Confidence is **medium** on any claim that award-winning aesthetics directly cause better user outcomes. Apple’s award descriptions are selective editorial evidence; they do not expose failed alternatives, usability data, or causal measures. Refactoring UI, Rams, Airbnb, and the web-design sources are influential practitioner guidance, not controlled studies.

The right success criterion is therefore not “agents produce Apple-quality design.” It is: **agents make context-aware design judgments that are comparative, revisable, explainable, resilient, and verifiable—and the human can see why the chosen direction won.**
