# Web resilience

Use this reference for web interfaces that must adapt across containers, devices, inputs, capabilities, network conditions, or partial technology failure.

## Design a continuum, not one ideal viewport

Define the core outcome and the least powerful dependable path that delivers it. Layer richer layout, media, interaction, motion, and offline behavior when the environment supports them. Progressive enhancement is not a ban on JavaScript; it prevents an optional enhancement from becoming an unnecessary single point of failure.

Record:

- the core task and semantic baseline;
- enhancements and the capability each requires;
- behavior when an enhancement, asset, request, or script fails;
- which information or action must remain available;
- how state and recovery are communicated.

## Adapt behavior to context

Do not explain responsive changes only with device labels or conventional breakpoints. Relate them to available space, content needs, input precision, posture, reach, environment, capability, and task frequency.

Prefer fluid and intrinsic rules with useful minimum and maximum bounds. Test intermediate sizes, zoom, wrapping, long content, localization, pointer and keyboard use, touch targets, orientation, and reduced capabilities. A layout that merely shrinks can preserve pixels while breaking priority or interaction.

For very long collections, do not prescribe virtualization solely from record count. Verify performance with representative data, then choose pagination, progressive loading, windowing, or another strategy that preserves semantic structure, focus continuity, findability, status announcements, and return position.

## Work from composition to components

Set global type, spacing rhythm, color roles, content measure, and layout composition before micro-styling isolated cards and controls. Let inherited system rules carry most of the interface; use component exceptions only when context requires them.

## Source basis

- [Luke Wroblewski, Mobile First: Constraints](https://www.lukew.com/mobilefirst/04-chapter-2/index.html): constraints as prioritization.
- [Luke Wroblewski, Mobile First: Layout](https://www.lukew.com/mobilefirst/09-chapter-7/index.html): fluid layout, responsive adaptation, input, posture, and device experience.
- [Aaron Gustafson, Where Do We Go From Here?](https://www.aaron-gustafson.com/notebook/where-do-we-go-from-here/): experience as a progressively enhanced continuum.
- [Piccalilli, Minimum viable experience](https://piccalil.li/blog/how-a-minimum-viable-experience-produces-a-resilient-inclusive-end-product/): a useful baseline that remains available when enhancements fail.
- [Piccalilli, CUBE CSS](https://piccalil.li/blog/cube-css/): composition, global systems, and contextual exceptions.
