# Interface iteration protocol

Use this reference when producing stress fixtures, choosing prototype fidelity, revising a direction, or explaining how a design improved.

## Build a lived-in stress set

Choose the smallest fixtures that expose likely failure:

- ordinary and high-frequency content;
- empty, loading, partial, error, permission, success, and destructive states;
- shortest, typical, longest, localized, missing, and malformed content;
- dense or at-scale collections;
- narrow and wide containers and relevant orientations;
- keyboard, pointer, touch, voice, or other relevant input;
- zoom, large text, increased contrast, dark interface, reduced motion, and screen-reader paths;
- first launch, login, settings, and critical product tasks when applicable.

Do not generate filler that conveniently fits the composition. Realistic names, images, descriptions, data ranges, and missing values reveal hierarchy and resilience defects.

## Match fidelity to the question

| Question | Useful fidelity |
| --- | --- |
| Is the hierarchy or grouping right? | Annotated layout or static render |
| Do directions feel materially different? | Comparable representative surfaces |
| Does a control or transition make sense? | Small interactive prototype |
| Do motion parameters feel right? | Interactive tuning surface with named phases |
| Does the implementation preserve intent? | Built component or vertical slice with real content |

Prefer artifacts that are cheap to change until the question requires implementation fidelity. Keep alternatives named and easy to switch between. Temporary tuning controls may expose content state, type, color, spacing, motion, or offsets side by side; they are exploration tools, not production UI.

## Revise in passes

Use only the passes relevant to the risk, in this order when several are needed:

1. Purpose, flow, agency, and recovery
2. Hierarchy, grouping, and language
3. Platform behavior and responsive adaptation
4. Accessibility and semantic interaction
5. Typography, color, imagery, and optical alignment
6. Motion, feedback, performance, and implementation fidelity
7. Reduction of anything that no longer earns its place

Record each material change as:

`question → observed defect → evidence → principle → change → expected effect → verification`

Example: “Can a person distinguish the primary action at a glance? → three equal-weight buttons compete → comparison render and scan-order review → hierarchy → demote two actions through placement and contrast → one clear first action without hiding alternatives → recheck ordinary and destructive states.”

Delete unsupported polish instead of rewriting its rationale. If a revision changes product structure, stop and return that decision to the accountable owner.

## Verify the whole task

Component conformance is necessary but insufficient. For every critical task, check entry, progress, feedback, interruption, failure, recovery, and completion under the relevant accessibility and device contexts. Apple’s accessibility criteria require common tasks—not isolated screens—to work with a claimed feature. See [Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels).

## Source basis

- [Apple, Create UI prototypes using agents in Xcode](https://developer.apple.com/videos/play/wwdc2026/227/): named variants, realistic content, remixing, tuning panels, and human judgment.
- [Apple app design cycle](https://developer.apple.com/tutorials/develop-in-swift/explore-the-app-design-cycle): discover, prototype, validate, and iterate.
- [Apple, Iterate on your design](https://developer.apple.com/tutorials/develop-in-swift/iterate-on-your-design): systematic refinement tied to principles and findings.
