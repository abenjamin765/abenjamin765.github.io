# Motion and feedback

Use this reference for custom animation, gestures, drag or swipe behavior, transitions, haptics, sound, or animated state changes.

## Give motion a job

Custom motion must communicate at least one of:

- immediate response to input;
- causality between a control and its effect;
- status or completion;
- continuity between states or locations;
- spatial relationship and wayfinding;
- physical constraint or momentum that makes direct manipulation understandable;
- emphasis at a genuinely important moment.

If removing motion changes neither understanding, control, feedback, nor intended emotion, prefer the quieter result.

## Interaction rules

- Respond immediately to input and keep feedback continuous during direct manipulation.
- Keep content attached to the pointer or touch during a drag; preserve the grab position.
- Allow a person to interrupt or redirect gesture-driven motion. Do not lock input until a decorative transition finishes.
- Enter and exit along a coherent path, anchored to the source when spatial origin matters.
- Use familiar platform behavior unless a tested alternative improves the task.
- Pair sound or haptics with the causal event and reserve them for meaningful feedback.
- Prototype and tune motion in context. Fixed values copied from another product are reference points, not rules.

## Reduced motion and alternatives

Motion must not be the only carrier of meaning. Define a lower-motion equivalent that preserves status and causality through a short fade, highlight, color or shape change, static state transition, text, sound, or haptic as appropriate. Remove parallax, sustained oscillation, large-field movement, and unnecessary depth simulation when reduced motion is requested.

Also test reduced transparency and increased contrast when material effects affect legibility. Aesthetic material must not weaken content or state communication.

## Handoff record

For each material motion, record its trigger, communicative job, affected elements, phases, interruption behavior, input handling, reduced-motion equivalent, and verification method. Do not hand off only a duration or easing curve.

## Source basis

- [Apple HIG: Motion](https://developer.apple.com/design/human-interface-guidelines/motion): purposeful motion, familiar feedback, and comfort.
- [Apple, Designing Fluid Interfaces](https://developer.apple.com/videos/play/wwdc2018/803/): response, direct manipulation, spatial consistency, interruptibility, and interactive prototyping.
- [Apple reduced-motion criteria](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/reduced-motion-evaluation-criteria): evaluation of motion-sensitive experiences.
