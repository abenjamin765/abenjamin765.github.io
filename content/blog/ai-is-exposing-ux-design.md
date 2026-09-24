---
title: AI is exposing UX design
description: >-
  AI isn’t replacing UX—it exposes whether teams understand systems or only ship
  convincing interfaces. Why maturity compounds, surface production collapses, and
  the object model matters more than generated screens.
date: 2026-05-06
---

# AI is exposing UX design

A designer opens an AI coding tool and types:

> “Build a modern dashboard for teachers to track student performance.”

Ten seconds later, the screen fills with polished UI.

Cards. Charts. Filters. Tabs. Progress bars.

It looks convincing. Maybe even impressive.

But there’s a problem.

Nobody on the team has actually defined:

- what a “student” is,
- what counts as “performance,”
- which metrics matter,
- how teachers make decisions,
- what actions teachers need to take,
- or what happens when the data is incomplete, contradictory, delayed, or wrong.

**The interface exists before the understanding does.**

And increasingly, that’s what AI is accelerating.

---

## Narrative versus reality

There’s a growing narrative that AI is transforming UX design. Designers are panicking about being replaced. Product teams are celebrating “10x productivity.” Startups are bragging about going from prompt to prototype in a single afternoon.

There is truth underneath the hype. Generative AI is spreading quickly across knowledge work, especially tasks like writing, searching, interpreting information, administrative work, and coding.[^rapid-adoption] Figma now describes AI features that can generate first drafts, rewrite text, and accelerate the path from idea to production.[^figma-ai][^figma-first-draft] GitHub’s own research has reported faster completion times for developers using Copilot, while its documentation still warns that generated code must be reviewed, validated, and treated as assistance rather than replacement.[^github-productivity][^github-responsible]

So yes, AI changes the economics of production.

But I don’t think AI is making UX design better or worse.

**I think it’s exposing it.**

AI is not changing the quality of the thinking. It is changing how quickly that thinking becomes visible.

More specifically, AI is exposing the difference between teams that understand software and teams that mostly understand how to produce artifacts that resemble software.

That distinction matters more than ever, because for years, many organizations gradually narrowed UX from a holistic design practice into an interface production function.

That narrowing matters because software design is not the same thing as interface design.

> **By software design, I don’t mean coding.**
> I mean the work of deciding what the system is, what it knows, what it allows, what it prevents, how its parts relate, and how people understand and act within it.

Software design includes objects, relationships, actions, attributes, rules, states, permissions, workflows, constraints, and meaning. The interface is just one representation of those decisions.

And the tools rewarded a much narrower version of the work.

## The drift — Drawing software versus understanding it

UX became very good at drawing software.

Not necessarily understanding it.

That is not because designers are lazy or shallow. It is because many organizations trained design teams to produce the parts of design that are easiest to see, easiest to schedule, easiest to critique, and easiest to present.

That tension is not new. Don Norman has written that UX originally came from a broader idea of “User Centered System Design,” but that “the system part” was largely forgotten.[^norman-ux] Nielsen Norman Group’s writing on UX strategy makes a similar point from a different angle: practitioners often over-prioritize practical production skills while strategic skills lag behind.[^nng-ux-strategy] McKinsey’s research on the business value of design also argues that mature design is cross-functional, iterative, and tied to outcomes, not merely a department producing artifacts.[^mckinsey-design]

The industry optimized around polished mockups, idealized user journeys, increasingly elaborate design systems, “surprise and delight,” and beautifully organized Figma files full of immaculate rectangles.

Meanwhile, many teams stopped investing deeply in systems thinking, domain modeling, behavioral consistency, information architecture, state management, edge cases, permissions, workflows, and the underlying logic that actually makes software intuitive to use.

**Many designers became experts in representing software without understanding how software behaves.**

That sounds harsh, but it’s difficult to ignore once you start seeing it.

You can sit in product reviews where teams debate spacing, animation timing, and corner radii for an hour without ever discussing how the data model works, how the user’s mental model maps to the system, what assumptions the workflow depends on, or what happens when reality refuses to behave like the happy path in the prototype.

The industry became increasingly fluent in surface area.

Tools like Figma accelerated that shift. Not because Figma is bad. Figma is excellent at what it was designed to do: it made interface production collaborative, scalable, and extremely efficient.

Figma did not cause the drift.

**It removed friction from the drift.**

That framing matters. Figma’s own product materials describe a toolchain increasingly built to accelerate design production, handoff, and development workflows: AI-generated first drafts, Dev Mode, design-to-code bridges, and even workflows that bring Figma context into LLM-assisted development.[^figma-first-draft][^figma-dev-mode][^figma-mcp]

Those are useful capabilities. They solve real collaboration problems.

But they also fit very neatly into a culture that already overvalues visible artifacts.

The problem is that many organizations quietly mistook interface production for the practice of design itself.

Executives can easily see screens, prototypes, design systems, polished flows, and tidy component libraries. They cannot easily see conceptual integrity, domain understanding, behavioral consistency, systems maturity, or whether the team actually understands the software they’re building.

So organizations rewarded what became easiest to produce and easiest to present.

And now AI has arrived to compress that entire layer of work even further.

## The compounding — When generation outruns clarity

AI can generate wireframes, UI copy, user flows, personas, front-end code, dashboards, illustrations, presentations, and increasingly convincing prototypes.

Which means the scarcity value of first-pass production is collapsing.

That is uncomfortable for a discipline that spent the last decade heavily optimizing around production.

But AI is not replacing designers.

It is replacing the parts of design work that were already dangerously close to pattern matching.

And the results are fascinating: the same AI tools producing extraordinary leverage for mature teams are producing oceans of plausible nonsense for immature ones.

Because AI does not create organizational maturity.

**It compounds it.**

The evidence here is more nuanced than a simple “AI makes good teams better and bad teams worse.” Harvard Business School researchers studying consultants described AI capability as a “jagged technological frontier”: people performed better and faster on tasks inside the frontier, but worse on a task deliberately selected to be outside it.[^hbs-jagged] In other words, AI can be incredibly useful when teams understand the work well enough to know when to trust it, when to challenge it, and when the output is pretending to be more reliable than it is.

NBER research on generative AI in customer support complicates the story further. AI increased productivity overall, with the biggest gains for less-experienced workers, because the system appeared to help spread patterns used by stronger performers.[^nber-work] That means AI can transfer useful practice on bounded tasks.

But design is rarely just a bounded task.

It is often a judgment problem disguised as a production problem.

If a product organization already understands its domain, knows its users deeply, thinks critically, challenges assumptions, and designs systems intentionally, AI becomes a force multiplier.

But if a team already relies on vague assumptions, shallow research, buzzwords, disconnected workflows, and polished theater masquerading as strategy, AI helps them produce more of it.

Faster.

Design is one of the ways an organization thinks.

If the thinking is shallow, AI gives that shallowness a production pipeline.

## Convincing interfaces, thin foundations

This is why so much AI-generated UX work feels strangely hollow.

Not necessarily ugly.

Not necessarily broken.

Just disconnected from reality.

The interfaces often look complete before the product understanding exists underneath them. That’s the real danger.

NN/g’s evaluation of AI prototyping tools described many outputs as “good from afar, but far from good”: visually plausible, fast to produce, but weak in contextual understanding and nuanced design judgment.[^nng-ai-prototyping] That phrase captures the risk perfectly. AI can create the feeling of progress while skipping the hard work that makes progress meaningful.

AI removes many of the friction points that previously slowed weak thinking down. Historically, implementation constraints forced teams to clarify ideas. Engineering complexity exposed missing assumptions. Production costs punished ambiguity.

Now teams can move from vague idea, to polished prototype, to generated code, in hours without ever fully understanding the system they’re building.

**AI allows organizations to operationalize premature certainty.**

Premature certainty looks like a team generating a dashboard before deciding what decisions the dashboard is supposed to support.

It looks like creating a “personalized learning path” before defining what personalization means, what evidence it uses, how it adapts, or when it should stop adapting.

It looks like designing an onboarding flow before understanding which users are actually confused, which steps are required, which steps are bureaucratic residue, and which steps exist only because the system is poorly modeled.

It looks like moving quickly because the prototype looks real enough to make the uncertainty feel resolved.

Many teams are using AI backwards.

The current obsession is speed: ship faster, prototype faster, generate faster, iterate faster, code faster.

But the most valuable use of AI in product design may actually be the opposite.

AI should not help teams skip thinking. It should multiply understanding.

The goal is not to slow shipping.

**The goal is to make premature certainty harder.**

## Multiply understanding before the interface

The strongest product teams I know are not using AI primarily to generate interfaces. They’re using it to synthesize research, identify contradictions, model systems, explore edge cases, draft requirements, challenge assumptions, map workflows, and deepen their understanding before committing to solutions.

That is where the research is most encouraging. NN/g’s guidance on AI in UX research frames AI as an assistant for planning, analyzing, and reporting, not as a replacement for real user research.[^nng-research-ai] Its warning about synthetic users is equally important: AI-generated “research” can produce artificial findings without studying real users, which makes it useful only in narrow contexts and dangerous when treated as evidence.[^nng-synthetic-users]

A growing body of requirements-engineering research is also exploring LLMs as tools for elicitation, validation, and structuring requirements.[^llm-requirements] That is much closer to the future I care about: not AI as a rectangle generator, but AI as a thought partner for clarifying what the system needs to mean and do.

A better AI-assisted design workflow might look less like:

> idea → prompt → interface → code

And more like:

> research notes → domain model → objects and relationships → edge cases → requirements → prototype → implementation plan

In other words: mature teams use AI _before_ the interface. Immature teams use it _after_ the idea.

That difference is enormous, because software is not fundamentally made of screens. It is made of objects, relationships, actions, attributes, permissions, rules, constraints, and states. The interface is simply one representation of those things.

If screens are becoming easier to generate, then screens are the wrong foundation to design from.

The more stable foundation is the object model underneath them.

## Object models and design-system grammar

This is why so many design systems eventually disappoint people.

Not because reuse is bad.

Not because consistency is unimportant.

But because many design systems became enormous vocabularies for products that still lacked grammar.

A button library is not a design system. A modal inventory is not a design system.

A real design system defines how a product expresses meaning and behavior consistently across contexts.

Most design systems stopped at vocabulary.

**The next generation needs grammar.**

And by grammar, I mean interaction rules, state logic, permissions, object relationships, content patterns, accessibility expectations, behavioral standards, and clear rules for how the system should respond when reality gets messy.

This critique is not anti-design-system. It is anti-design-system-theater.

Brad Frost has made a similar distinction for years, arguing that design files and screenshots are not enough to build working software and that design systems need coded, reusable components and compositional guidance.[^frost-sketch][^frost-recipes] NN/g’s definition of design systems is more charitable, and useful: standards can reduce redundancy, create a shared language, and improve consistency at scale.[^nng-design-systems] Both things can be true. Design systems are valuable when they help teams express meaning and behavior consistently. They become wasteful when they stop at component inventory and governance rituals.

Industry surveys also show that design systems struggle with familiar organizational problems: adoption, documentation, design-code alignment, resourcing, governance, and keeping systems connected to real product work.[^zeroheight]

Teams built libraries of buttons, cards, modals, spacing tokens, and component variants while avoiding the much harder work of defining meaning, behavior, workflows, object relationships, permissions, and conceptual consistency.

They standardized ingredients before defining recipes.

And increasingly, production software drifted away from the immaculate systems represented in Figma anyway.

## Code you can generate isn’t architecture

Meanwhile, many UX teams are now trying to use AI to generate production code.

Which is understandable.

Code is a powerful sketching material. A coded prototype can communicate behavior that a static mockup never could, and designers experimenting with code can build a much better understanding of how software actually works.

But it also exposes another uncomfortable gap: many designers were never trained to understand how software works.

Generating code is not the same thing as understanding architecture.

Or state.

Or deployment.

Or debugging.

Or performance.

Or resilience.

Or security.

Or maintenance.

Designers do not need to become full-stack engineers.

But they do need to understand enough about software to stop designing as if implementation is just a translation layer.

AI lets people generate software-shaped outputs without necessarily understanding software itself.

That can be useful when treated as exploration.

AI-generated code is valuable when it works as a sketch of behavior.

It becomes dangerous when organizations mistake generated code for engineered systems.

This is not alarmism. GitHub’s own documentation says Copilot should be used as a tool rather than a replacement and warns that generated suggestions may not always be secure.[^github-responsible] Independent research on Copilot-generated code has found substantial vulnerability risks in tested scenarios.[^pearce-copilot] Stack Overflow’s developer surveys have also shown persistent and growing distrust in the accuracy of AI outputs among developers.[^stackoverflow-2024][^stackoverflow-2025]

At the same time, GitHub has published research suggesting Copilot can improve speed and quality in bounded tasks.[^github-quality] That is the whole point: AI code can be helpful, and still not be architecture. It can support design exploration without replacing engineering judgment.

## The shift — What comes next for the discipline

I think this is where the discipline is heading next.

Not toward “faster wireframes.”

Toward software design in a much more holistic sense.

As interfaces become increasingly adaptive, contextual, personalized, and partially generative, the stable thing underneath them becomes more important.

Not fixed screen layouts.

The underlying system model.

That does not mean the future should be infinitely fluid interfaces that change unpredictably from one user to another. Personalized does not automatically mean better. A constantly changing interface can become hostile, especially for people who rely on learned patterns, assistive technology, documentation, or predictable workflows.

Generative UI is already being discussed seriously as a shift from static screens toward dynamic, goal-oriented interfaces.[^nng-generative-ui] W3C’s personalization semantics work also shows that adaptation can be beneficial, especially for people with cognitive and learning disabilities, when it is structured around meaningful semantics.[^w3c-personalization]

But accessibility standards also make the caution obvious. WCAG emphasizes predictability and consistent navigation, including repeated navigation appearing in the same relative order.[^wcag] A fully fluid interface that changes without stable rules can easily become inaccessible, untestable, and impossible to document.

Generative interfaces will only be usable if they are generated from stable, coherent, accessible system models.

That is why the future of UX design may center far less around arranging rectangles and far more around defining objects, relationships, actions, attributes, behaviors, and meaning clearly enough that interfaces can be generated coherently.

This is where object-oriented UX and ORCA become more important, not less. ORCA’s focus on objects, relationships, calls-to-action, and attributes gives teams a way to model the system before designing the screen.[^orca] I would not claim ORCA has “won” the future. But I do think it points in the right direction.

If the interface becomes more generative, the object model becomes the design system.

The future designer may spend less time drawing screens and more time facilitating understanding.

That means helping teams model reality, aligning organizations around shared concepts, synthesizing research into systems, defining behavioral rules, structuring information, and ensuring software matches the mental models of the people using it.

In that future, the value of design shifts away from artifact production and toward organizational cognition.

And honestly, I think that’s a good thing.

Because the hardest part of software design was never drawing the interface.

It was understanding reality well enough to design something useful in the first place.

AI does not replace that work.

**It exposes whether it was happening at all.**

---

## References

[^rapid-adoption]: Bick, A., Blandin, A., & Deming, D. J. (2024). “The Rapid Adoption of Generative AI.” National Bureau of Economic Research. [https://www.nber.org/system/files/working_papers/w32966/revisions/w32966.rev0.pdf](https://www.nber.org/system/files/working_papers/w32966/revisions/w32966.rev0.pdf)

[^figma-ai]: Figma. (2024). “Meet Figma AI: Empowering Designers with Intelligent Tools.” [https://www.figma.com/blog/introducing-figma-ai/](https://www.figma.com/blog/introducing-figma-ai/)

[^figma-first-draft]: Figma. (2024). “Building a better First Draft for designers.” [https://www.figma.com/blog/figma-ai-first-draft/](https://www.figma.com/blog/figma-ai-first-draft/)

[^github-productivity]: GitHub. (2023). “The economic impact of the AI-powered developer lifecycle and lessons from GitHub Copilot.” [https://github.blog/news-insights/research/the-economic-impact-of-the-ai-powered-developer-lifecycle-and-lessons-from-github-copilot/](https://github.blog/news-insights/research/the-economic-impact-of-the-ai-powered-developer-lifecycle-and-lessons-from-github-copilot/)

[^github-responsible]: GitHub Docs. “Responsible use of GitHub Copilot inline suggestions.” [https://docs.github.com/en/enterprise-cloud@latest/copilot/responsible-use/copilot-code-completion](https://docs.github.com/en/enterprise-cloud@latest/copilot/responsible-use/copilot-code-completion)

[^norman-ux]: Norman, D. (2023). “Where did the term User Experience (UX) come from?” JND.org. [https://jnd.org/where-did-the-term-user-experience-ux-come-from/](https://jnd.org/where-did-the-term-user-experience-ux-come-from/)

[^nng-ux-strategy]: Kaley, A., & Gibbons, S. (2022). “UX Strategy: Definition and Components.” Nielsen Norman Group. [https://www.nngroup.com/articles/ux-strategy/](https://www.nngroup.com/articles/ux-strategy/)

[^mckinsey-design]: McKinsey & Company. (2018). “The Business Value of Design.” [https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-business-value-of-design](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-business-value-of-design)

[^figma-dev-mode]: Figma. (2024). “Everything You Need to Know About Dev Mode.” [https://www.figma.com/blog/everything-you-need-to-know-about-dev-mode/](https://www.figma.com/blog/everything-you-need-to-know-about-dev-mode/)

[^figma-mcp]: Figma. (2025). “Introducing our Dev Mode MCP server: Bringing Figma into your workflow.” [https://www.figma.com/blog/introducing-figma-mcp-server/](https://www.figma.com/blog/introducing-figma-mcp-server/)

[^hbs-jagged]: Dell’Acqua, F., et al. (2023). “Navigating the Jagged Technological Frontier.” Harvard Business School. [https://www.hbs.edu/faculty/Pages/item.aspx?num=64700](https://www.hbs.edu/faculty/Pages/item.aspx?num=64700)

[^nber-work]: Brynjolfsson, E., Li, D., & Raymond, L. (2023). “Generative AI at Work.” National Bureau of Economic Research. [https://www.nber.org/system/files/working_papers/w31161/w31161.pdf](https://www.nber.org/system/files/working_papers/w31161/w31161.pdf)

[^nng-ai-prototyping]: Wang, H. H. (2025). “Good from Afar, But Far from Good: AI Prototyping in Real Design Contexts.” Nielsen Norman Group. [https://www.nngroup.com/articles/ai-prototyping/](https://www.nngroup.com/articles/ai-prototyping/)

[^nng-research-ai]: Nielsen Norman Group. (2024). “Accelerating Research with AI.” [https://www.nngroup.com/articles/research-with-ai/](https://www.nngroup.com/articles/research-with-ai/)

[^nng-synthetic-users]: Rosala, M., & Moran, K. (2024). “Synthetic Users: If, When, and How to Use AI-Generated ‘Research.’” Nielsen Norman Group. [https://www.nngroup.com/articles/synthetic-users/](https://www.nngroup.com/articles/synthetic-users/)

[^llm-requirements]: Zadenoori, M. A., et al. (2025). “Large Language Models (LLMs) for Requirements Engineering (RE): A Systematic Literature Review.” arXiv. [https://arxiv.org/html/2509.11446v1](https://arxiv.org/html/2509.11446v1)

[^frost-sketch]: Frost, B. (2018). “Your Sketch library is not a design system.” [https://bradfrost.com/blog/post/your-sketch-library-is-not-a-design-system/](https://bradfrost.com/blog/post/your-sketch-library-is-not-a-design-system/)

[^frost-recipes]: Frost, B. (2024). “The art of design system recipes.” [https://bradfrost.com/blog/post/the-art-of-design-system-recipes/](https://bradfrost.com/blog/post/the-art-of-design-system-recipes/)

[^nng-design-systems]: Fessenden, T. (2021). “Design Systems 101.” Nielsen Norman Group. [https://www.nngroup.com/articles/design-systems-101/](https://www.nngroup.com/articles/design-systems-101/)

[^zeroheight]: zeroheight. (2025). “Design Systems Report 2025.” [https://zeroheight.com/how-we-document/](https://zeroheight.com/how-we-document/)

[^pearce-copilot]: Pearce, H., et al. (2022). “Asleep at the Keyboard? Assessing the Security of GitHub Copilot’s Code Contributions.” [https://arxiv.org/abs/2108.09293](https://arxiv.org/abs/2108.09293)

[^stackoverflow-2024]: Stack Overflow. (2024). “2024 Developer Survey: AI.” [https://survey.stackoverflow.co/2024/ai](https://survey.stackoverflow.co/2024/ai)

[^stackoverflow-2025]: Stack Overflow. (2025). “2025 Developer Survey: AI.” [https://survey.stackoverflow.co/2025/ai](https://survey.stackoverflow.co/2025/ai)

[^github-quality]: GitHub. (2024). “Does GitHub Copilot improve code quality? Here’s what the data says.” [https://github.blog/news-insights/research/does-github-copilot-improve-code-quality-heres-what-the-data-says/](https://github.blog/news-insights/research/does-github-copilot-improve-code-quality-heres-what-the-data-says/)

[^nng-generative-ui]: Moran, K., & Gibbons, S. (2024). “Generative UI and Outcome-Oriented Design.” Nielsen Norman Group. [https://www.nngroup.com/articles/generative-ui/](https://www.nngroup.com/articles/generative-ui/)

[^w3c-personalization]: W3C. (2020). “Personalization Semantics Content Module 1.0.” [https://www.w3.org/TR/2020/WD-personalization-semantics-content-1.0-20200127/](https://www.w3.org/TR/2020/WD-personalization-semantics-content-1.0-20200127/)

[^wcag]: W3C. (2023). “Web Content Accessibility Guidelines (WCAG) 2.2.” [https://www.w3.org/TR/WCAG22/](https://www.w3.org/TR/WCAG22/)

[^orca]: Prater, S. V. (2023). “Introducing ORCA: The Third Diamond in your UX Process.” OOUX. [https://ooux.com/resources/introducing-orca-the-third-diamond-in-your-ux-process](https://ooux.com/resources/introducing-orca-the-third-diamond-in-your-ux-process)
