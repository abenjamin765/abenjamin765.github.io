# Case Study Interview Worksheet

Use this worksheet to develop the narrative for each project page. Rough notes are welcome; fragments and incomplete answers are useful starting material.

The structure comes from the IDEAS framework in `ideas.pdf`:

- **I — Inspiration:** hook, context, user problem, and why it mattered
- **D — Design Process:** research, methods, challenges, and design decisions
- **E — Engagement:** collaboration, communication, leadership, and user feedback
- **A — Action:** what you personally did and how constraints were handled
- **S — Success:** outcomes, impact, evidence, and learnings
- **Closing Reflection:** what the project changed about your practice

The example story in the PDF is illustrative only. Do not copy its facts into these answers.

## Suggested page rhythm

Each completed interview can become a case-study page with room for supporting visuals:

1. `[Hero image]` — the project in one glance
2. `[Context image]` — the problem, environment, or user workflow
3. `[Process artifact]` — research, map, model, sketch, or prototype
4. `[Final UI or system view]` — the solution in use
5. `[Outcome evidence]` — result, quote, metric, or shipped artifact

---

## 1. Classroom Assignment Management

### I — Inspiration

**What was the project hook?** Write the compelling statement, question, or tension that started the work.

> Answer: How might we help teachers focus their attention across active assignments spanning multiple classes and products?

**Who was the primary user, what were they trying to do, and what made the existing experience difficult?**

> Answer: The primary users were K–12 teachers using Renaissance products to assign practice and formative assessments. The existing hub aggregated assignments in one place, but left teachers to manually sort and filter in order to identify students who needed attention. A teacher could see that 8 of 10 students had completed an assignment, for example, but had to leave the hub and open product-specific reports to identify the two students who had not. Research also showed that due date—not assigned date—best matched teachers’ sense of urgency.

**What was happening in the surrounding product or business that made this project important?**

> Answer: I was the Senior UX Designer on a six-person product team: a product manager, product owner, three engineers, and me. The team had quickly launched an assignments page as part of its first hub product, Renaissance Intelligence, which brought several apps together. Version 1 solved aggregation, but not actionability: teachers still needed to open individual product reports to find the students behind an assignment’s completion rate. Version 2 focused on aligning the hub to teachers’ mental models, surfacing more useful student-level context, and reducing that unnecessary cross-product navigation. It also supported an organizational KPI: increasing the share of time users spent in Renaissance Intelligence relative to individual products. Renaissance serves 40% of U.S. schools, so improving this common workflow had meaningful potential reach. We spent four weeks on research and design iteration, followed by two weeks of development before launching Version 2.

### D — Design Process

**What research, mapping, prototyping, testing, or technical exploration did you personally do?**

> Answer: Our UX research partners ran moderated usability studies comparing the existing experience with two prototypes I created to explore new layouts and assignment object models. Each study included 10 teachers: five who were unfamiliar with Renaissance products and five active users. Participants reviewed the screen, narrated what they saw, found specific assignments, and described how they would use the feature in the classroom. I also facilitated an object-modeling workshop with product and engineering partners to define what an assignment meant across products: its shared attributes, its meaningful differences, how teachers would recognize each type, and the information they needed to act both on and off screen—for example, when reminding students to finish work in class. After testing our assumptions and aligning on the data model, I used an AI prototyping tool to create a higher-fidelity version of the chosen direction. UX research then retested it with a new group of existing users.

**What was the hardest design problem or constraint, and how did you work through it?**

> Answer: Each practice and assessment product had its own context, data sets, and attributes. Modeling the assignment object helped us identify the attributes shared across every assignment—title, type, assigned date, and due date—as well as product-specific fields such as questions answered or pages read. That distinction informed the interface: the primary view distilled the shared signals teachers needed to identify and prioritize work, while labels and icons preserved product-specific context. Research then informed the priority groups used to organize assignments.

**Which design decision most changed the direction of the project?**

> Answer: The pivotal decision was moving from a familiar table to priority-based grouped lists. Our original assumption was that a table with the right data would give teachers maximum flexibility. We hypothesized, however, that a more opinionated structure could better surface students drifting from expectations and show what needed attention without manual digging. The final design kept new assignments at the top, then organized the remaining work into overdue, due soon, in progress, and done groups. Teachers could expand or collapse each group. Every participant in the studies validated this grouping model, and testing showed that it more closely matched how teachers expected to review assignments while preserving flexibility. When one participant compared the new design with the existing experience, she responded: “OMG, this is amazing.”

### E — Engagement

**Who did you collaborate with, and what did each group contribute?**

> Answer: My primary partner was the product manager; together, we authored the PRD and built on the goals of the Version 1 launch. I worked with her and our UX research partner to develop the testing plan, understand where the current experience fell short, and validate our assumptions. I partnered with engineering to understand how assignment data was aggregated and displayed, what data was available, and which API requests would be needed to support the new design. I also facilitated a Design Dash: a remote working session in which the team used the object library I maintained to resolve questions about relationships, mental models, system architecture, and UI surfaces. The session produced updated object documentation, diagrams, wireframes, and a low-fidelity prototype.

**How did you create alignment or incorporate feedback?**

> Answer: The design team held a weekly feedback session for the broader team. I presented work there, sought ad hoc feedback from product and engineering partners, and maintained a running FAQ of open questions and traceable decisions. I also incorporated findings from UX research. When internal feedback conflicted with user feedback, we discussed the user benefit, engineering cost, and timing before deciding. For example, teachers wanted a high-level performance summary for each student on the assignment page, including completion time and scores. We agreed that the need was real, but deferred it to a later version because expanding the scope would delay the core experience; the decision and rationale were documented.

**What leadership, facilitation, or communication role did you personally take?**

> Answer: I led and facilitated the decision-making process, using the Design Dash toolset I built to make complexity explainable, create alignment among partners, and communicate decisions through detailed notes and visuals. I also planned and facilitated cross-team workshops that surfaced and documented dependencies, change-management considerations, feedback from adjacent teams, and new constraints.

### A — Action

**What did you personally own, change, or ship?**

> Answer: I co-authored the page requirements and owned the solution definition and design delivery. I designed the information architecture, interaction patterns using the existing design system, page content and microcopy, states, prototypes, and mockups. I maintained a living source of truth that summarized the PRD, captured key decisions, linked to design artifacts, documented requirements for screens, interactions, states, and API contracts, and supported handoff and launch planning with the team and stakeholders.

**What tradeoffs did you make, and how did you handle technical, organizational, or timeline constraints?**

> Answer: The main technical constraint was an Angular page shell rendering content from a React page in an iframe, which limited choices around layout, filters, dialogs, and other interactions. The API initially exposed only counts of students who had completed an assignment. We partnered with API owners to add student IDs so the interface could render student names, added completion time, and requested pre-filtering by timeframe to protect page performance. We also deliberately deferred a fuller student-level performance summary—completion time, scores, and similar details—to a later release. Teachers valued that information, but including it in the first release would have increased engineering scope and delayed the more important goal: helping teachers quickly identify which assignments and students needed attention.

**What made the final solution possible?**

> Answer: A rigorous, shared process and an actively maintained object library made the work more traceable and implementation-ready. During workshops, the AI-assisted prototyping workflow let the team visualize concepts with mock data in real time, modify them together, explore dozens of options, retain the strongest attributes, and capture decisions and open questions. This removed hours of repetitive Figma production and guessing at mock data. The team could connect user needs, system rules, interface decisions, and technical requirements without relying on disconnected assumptions.

### S — Success

**What changed for users, the team, or the business?**

> Answer: For teachers, the new experience made one of the suite’s most common tasks more actionable by surfacing which assignments and students needed attention without requiring a separate report for every product. For the business, the initiative met its goal of moving users from individual products into Renaissance Intelligence. We observed a sharp decrease in users navigating from the assignments page into individual products to load reports, consistent with the goal of helping users complete more of their work in the hub.

**What evidence supports that outcome?** Include metrics, qualitative feedback, shipped outcomes, adoption, or decisions unlocked.

> Answer: Product behavior metrics showed a decrease in transitions from the assignments page to individual-product reports, and the initiative met its goal of moving users into Renaissance Intelligence. Qualitative research gave the team confidence that the grouped experience matched teachers’ expectations. The new structure also created a foundation for future data enrichment that would have been difficult to accommodate in a simple table.

**What did you learn?**

> Answer: I learned that opinionated software can create outsized value when its priorities reflect users’ mental models and it offers appropriate flexibility. It can also create friction quickly when those assumptions are wrong, which is why early testing and clear fallback paths are essential.

### Closing Reflection

**What would you do differently or explore next?**

> Answer: The logical next step would be to prioritize the next set of data enrichments for each assignment type. We know teachers want a fuller snapshot of each assignment, not only completion status.

**What does this project demonstrate about how you work as a designer?**

> Answer: This project demonstrates how I use systems thinking, research, prototyping, facilitation, and AI-assisted tools to turn ambiguous inputs into an aligned direction. I believe good design is facilitated, not produced by one person in isolation. Here, I synthesized input from stakeholders, subject-matter experts, users, and product data into explicit goals, falsifiable assumptions, and a solution the team could confidently build.

### Supporting images

List available materials and note any redaction or confidentiality constraints.

- [x] Hero / final product image: Final grouped-list design is available
- [x] Problem or workflow image: Version 1 table design is available
- [x] Research, map, or model: Assignment object model is available
- [x] Prototype or iteration: Wireframes and design iterations are available
- [x] Final UI / shipped experience: Before-and-after designs are available
- [x] Outcome evidence: Available
- [ ] Confidentiality or redaction notes:

### Draft case-study narrative

# Helping teachers identify students who need support

Renaissance serves 40% of U.S. schools. Its teachers assign practice and formative assessments across several products, then need to see which students are falling behind and what requires attention next.

I was the Senior UX Designer on a six-person team that redesigned the Assignments page in Renaissance Intelligence, the company’s hub product. Version 1 brought assignments from multiple products into one place. It did not help teachers act on the information. A teacher could see that eight of ten students had completed an assignment, then still had to open a product-specific report to identify the two students who had not.

Our goal for Version 2 was to help teachers prioritize active assignments across classes and products.

## Research showed where the page fell short

Our UX research partners ran moderated usability studies with five active Renaissance users and five teachers who were new to the product suite. Participants reviewed the existing page and two concepts, narrated what they saw, found specific assignments, and explained how they would use the feature in the classroom.

Teachers had to sort and filter the Version 1 table before they could identify students who needed help. They also cared more about due date than assigned date when deciding what to address first.

`[Image: Version 1 table. Assignments are aggregated, but teachers still need to investigate.]`

## A shared model clarified the interface

Each practice and assessment product had its own assignment data. I facilitated an object-modeling workshop with product and engineering partners to define the shared assignment object, its product-specific differences, and the information teachers needed in the classroom.

Every assignment had a title, type, assigned date, and due date. Some attributes varied by product, such as questions answered or pages read. The interface needed to show the shared information first, then use labels and icons to retain product context.

`[Image: Assignment object model. Shared attributes and product-specific differences.]`

## I replaced the table with a priority view

The pivotal decision was replacing the table with grouped lists. A table gave teachers control, but it required them to do the prioritization work themselves.

The final design placed new assignments first, then grouped the remaining work by overdue, due soon, in progress, and done. Teachers could expand or collapse each group. All study participants validated this model. After comparing the concepts, one teacher said, “OMG, this is amazing.”

`[Image: Wireframes and iterations. Table concept to grouped-list prototype.]`

## I designed for the product’s technical constraints

I co-authored the page requirements and designed the information architecture, interaction patterns, content, microcopy, states, prototypes, and mockups. I maintained the handoff documentation, including decisions, technical requirements, and API contracts, and planned the launch with the team.

The Angular page shell rendered the page content from a React app in an iframe. That constrained layout, filters, dialogs, and other interactions. The initial API returned only aggregate completion counts. I worked with engineering and API owners to add student IDs, completion time, and timeframe pre-filtering. The new data let the interface show student names and protected page performance.

We deferred a fuller student performance summary, including scores and completion time, to a later release. Teachers wanted that detail, but adding it would have delayed the core improvement: helping teachers identify assignments and students that needed attention.

`[Image: Final grouped-list design. Assignment status, student names, and product context.]`

## I used workshops to align the team

I used the Design Dash toolset I built to run working sessions with the product manager, UX research, and engineering. The sessions addressed the assignment model, system constraints, open questions, and interface decisions.

An AI-assisted prototyping workflow let the team create and revise concepts with mock data during the workshops. We explored dozens of options, retained the strongest patterns, and captured decisions and open questions as we went. The process reduced repetitive Figma work and gave the team a shared basis for implementation.

## Outcome

After four weeks of research and design iteration and two weeks of development, Version 2 launched. It met the initiative’s goal of moving users from individual products into Renaissance Intelligence. Product metrics showed fewer transitions from the Assignments page to individual-product reports. Research also confirmed that the grouped view matched teachers’ expectations.

The redesign created a structure for future data enrichment without making the core workflow harder to scan. I came away with a simple lesson: defaults should reflect how people prioritize their work, and the interface should still let them inspect the underlying data when they need to.

---

## 2. Nearpod

### I — Inspiration

- What was the hook, user problem, and context?
- Why did this project matter at the time?

### D — Design Process

- What research, mapping, prototyping, testing, or technical exploration did you personally do?
- What was the hardest design problem or constraint?
- Which design decision most changed the direction?

### E — Engagement

- Who did you collaborate with, and how did you create alignment?
- What leadership, facilitation, or communication role did you take?

### A — Action

- What did you personally own, change, or ship?
- What tradeoffs did you make?

### S — Success and reflection

- What changed, and what evidence supports that outcome?
- What did you learn, and what would you explore next?

### Supporting images

- Hero / final product:
- Problem or workflow:
- Research, map, model, or prototype:
- Final UI or outcome evidence:
- Confidentiality or redaction notes:

---

## 3. Indeed

### I — Inspiration

- What was the hook, user problem, and context?
- Why did this project matter at the time?

### D — Design Process

- What research, mapping, prototyping, testing, or technical exploration did you personally do?
- What was the hardest design problem or constraint?
- Which design decision most changed the direction?

### E — Engagement

- Who did you collaborate with, and how did you create alignment?
- What leadership, facilitation, or communication role did you take?

### A — Action

- What did you personally own, change, or ship?
- What tradeoffs did you make?

### S — Success and reflection

- What changed, and what evidence supports that outcome?
- What did you learn, and what would you explore next?

### Supporting images

- Hero / final product:
- Problem or workflow:
- Research, map, model, or prototype:
- Final UI or outcome evidence:
- Confidentiality or redaction notes:

---

## 4. Green Loom

### I — Inspiration

- What was the hook, user problem, and context?
- Why did this project matter at the time?

### D — Design Process

- What research, mapping, prototyping, testing, or technical exploration did you personally do?
- What was the hardest design problem or constraint?
- Which design decision most changed the direction?

### E — Engagement

- Who did you collaborate with, and how did you create alignment?
- What leadership, facilitation, or communication role did you take?

### A — Action

- What did you personally own, change, or ship?
- What tradeoffs did you make?

### S — Success and reflection

- What changed, and what evidence supports that outcome?
- What did you learn, and what would you explore next?

### Supporting images

- Hero / final product:
- Problem or workflow:
- Research, map, model, or prototype:
- Final UI or outcome evidence:
- Confidentiality or redaction notes:

---

## 5. Orbit

### I — Inspiration

- What was the hook, user problem, and context?
- Why did this project matter at the time?

### D — Design Process

- What research, mapping, prototyping, testing, or technical exploration did you personally do?
- What was the hardest design problem or constraint?
- Which design decision most changed the direction?

### E — Engagement

- Who did you collaborate with, and how did you create alignment?
- What leadership, facilitation, or communication role did you take?

### A — Action

- What did you personally own, change, or ship?
- What tradeoffs did you make?

### S — Success and reflection

- What changed, and what evidence supports that outcome?
- What did you learn, and what would you explore next?

### Supporting images

- Hero / final product:
- Problem or workflow:
- Research, map, model, or prototype:
- Final UI or outcome evidence:
- Confidentiality or redaction notes:

---

## 6. Bite Club

### I — Inspiration

- What was the hook, user problem, and context?
- Why did this project matter at the time?

### D — Design Process

- What research, mapping, prototyping, testing, or technical exploration did you personally do?
- What was the hardest design problem or constraint?
- Which design decision most changed the direction?

### E — Engagement

- Who did you collaborate with, and how did you create alignment?
- What leadership, facilitation, or communication role did you take?

### A — Action

- What did you personally own, change, or ship?
- What tradeoffs did you make?

### S — Success and reflection

- What changed, and what evidence supports that outcome?
- What did you learn, and what would you explore next?

### Supporting images

- Hero / final product:
- Problem or workflow:
- Research, map, model, or prototype:
- Final UI or outcome evidence:
- Confidentiality or redaction notes:

---

## 7. Many Hats

### I — Inspiration

**What was the project hook?** Write the compelling statement, question, or tension that started the work.

> Answer: How do you give one person a product team without letting a single chat pretend it is the whole team?

**Who was the primary user, what were they trying to do, and what made the existing experience difficult?**

> Answer: The user is a builder facing ambiguous product work: framing a problem, modeling objects, mapping a flow, or pressure-testing scope. A general agent can draft all of that in one thread, but the roles collapse. Strategy, domain rules, interface language, and implementation advice arrive as one voice. Nothing in that thread has to stay inside a role boundary, cite project facts, or stop before it claims a decision the human did not make.

**What was happening in the surrounding product or business that made this project important?**

> Answer: Design Dash already held 53 stage-oriented methods for discovery, modeling, flows, critique, and handoff. Those methods were useful inside a facilitated dash. They were a poor fit for ongoing product work, where the same person needs a small set of specialists who can be asked by role, share one knowledge base, and leave typed artifacts behind. Many Hats is the public v0.1 response: thirteen named agents, fifteen portable skills, and a rule that the human remains the product owner. It was drafted under the working name Open Product Team, then published as Many Hats.

### D — Design Process

**What research, mapping, prototyping, testing, or technical exploration did you personally do?**

> Answer: I separated the system into four planes—people, practice, knowledge, and work—and wrote that split into the architecture before adding more prompts. I mapped all 53 Design Dash skills onto accountable agents and consolidated them into role-owned skills, keeping the original methods as references. Luke received 17 methods under domain modeling. Liza received 10 under direction and facilitation. I reviewed public agent and skill repositories (GitHub awesome-copilot, OpenAI skills, Anthropic skills) for boundaries, progressive disclosure, and verification patterns, and recorded what was synthesized rather than copied. The Library Holds demo is the worked proof: a fictional public-library holds MVP with direction, object, flow, challenge, and glossary artifacts a reader can replay.

**What was the hardest design problem or constraint, and how did you work through it?**

> Answer: The hard constraint was authority. An agent that can recommend scope can also sound as if it approved scope. The contract in `AGENTS.md` draws that line: agents may recommend and prepare; they may not claim stakeholder confirmation, spend authority, publish, merge, deploy, send, or open an external pull request unless the human authorized that exact action. Allie stays independent of implementation ownership so critique does not inherit the plan it is challenging.

**Which design decision most changed the direction of the project?**

> Answer: The pivotal decision was treating skills, roles, and project facts as different objects. Agents are not folders of private knowledge. Skills are not personalities. A fact discovered on one product does not become a universal instruction. Project-specific learning goes in that project’s overrides. A portable change requires evidence, an evaluation case, and a human-approved pull request.

### E — Engagement

**Who did you collaborate with, and what did each group contribute?**

> Answer: This is a solo-authored open-source system, informed by Design Dash, Portable Agent Skills, and the public skill repositories noted above. Inside the system, collaboration is designed as a sequence of specialist artifacts rather than a meeting. On Library Holds, Liza frames Hold MVP scope, Luke defines Hold, Patron, Item, and Pickup Window, Charlie maps waiting, ready, expired, and cancelled, Echo separates Hold from Reservation and Checkout, and Allie cuts waitlist games, a preference center, and multi-branch transfer out of v1.

**How did you create alignment or incorporate feedback?**

> Answer: Alignment is an artifact, not a chat transcript. Direction, objects, evidence, decisions, metrics, and glossary terms are separate files with stable IDs. Generated graphs may index them; plain Markdown plus YAML remains canonical. Specialist claims are checked against files before they are treated as done.

**What leadership, facilitation, or communication role did you personally take?**

> Answer: I defined the role boundaries, the skill ownership, and the rule that the human owns consequential tradeoffs. The public demo is the facilitation example: a prompt that asks Liza to frame the problem and assemble the smallest appropriate team, then leaves a trail another person can read without having been in the thread.

### A — Action

**What did you personally own, change, or ship?**

> Answer: I designed and published Many Hats v0.1: thirteen agent definitions with hat avatars, fifteen portable skills with baseline evals, host adapters for Cursor, Claude Code, Codex, GitHub Copilot, and Windsurf, the shared knowledge templates, the Library Holds demo, and the install path. The portable contract is `AGENTS.md`. Host-specific mounts do not change the skill instructions.

**What tradeoffs did you make, and how did you handle technical, organizational, or timeline constraints?**

> Answer: I consolidated dozens of overlapping micro-skills into fifteen role-owned skills so a request loads one contract instead of a stage bundle. The detailed Design Dash methods stayed as references, so consolidation did not delete the method. I also kept the object library in shared knowledge, with Luke as steward, rather than burying it in one agent’s folder. Charlie, Echo, Finn, Relay, Cipher, and Ledger all need to cite the same objects. Core promotion is deliberately slow: a one-off correction does not rewrite a skill.

**What made the final solution possible?**

> Answer: Design Dash had already made the discovery methods explicit, and Portable Agent Skills had already defined a behavioral contract for skills: portable instructions, side effects, confirmation gates, and evaluations. Many Hats could assign those methods to people with boundaries instead of inventing a second process.

### S — Success

**What changed for users, the team, or the business?**

> Answer: A builder can clone the repo, install the skills, and replay a complete product pass—from scope through objects, flow, language, and an independent challenge—without a single agent owning every decision. The human still approves anything that leaves the repo.

**What evidence supports that outcome?** Include metrics, qualitative feedback, shipped outcomes, adoption, or decisions unlocked.

> Answer: The shipped evidence is the repository itself: v0.1 release notes, the 53-to-15 migration map, the Library Holds artifacts, and the authority rule in `AGENTS.md`. In the demo, Allie’s challenge is an accepted artifact that keeps Hold MVP from becoming a holds platform, and Liza’s decision cites that challenge. I do not have public adoption or outcome metrics for v0.1. Library Holds is fictional, so it demonstrates the collaboration pattern, not a library’s pickup performance.

**What did you learn?**

> Answer: Naming a role is not the same as giving it a boundary. The useful unit is a specialist who can produce a citable artifact, refuse work outside that role, and leave the decision with the human.

### Closing Reflection

**What would you do differently or explore next?**

> Answer: The next useful evidence would be a real project run, with a recorded place where an agent overreached and the contract or skill changed because of it. v0.1 asks contributors for that kind of observed behavior change. I would also want one non-demo project whose overrides show the narrowest-valid-scope rule in use.

**What does this project demonstrate about how you work as a designer?**

> Answer: It shows how I turn a facilitation practice into a system other people can run: explicit roles, shared objects, portable methods, and a human decision at the point where the work becomes real.

### Supporting images

- [x] Hero / final product: Team grid of the thirteen hat avatars, plus the four artifact previews (direction, object, flow, challenge)
- [x] Problem or workflow: Architecture diagram — human direction, roles, skills, knowledge, project work, then learning either as a project override or a reviewed upstream change
- [x] Research, map, or model: Design Dash migration table (53 methods assigned to agents) and the Hold object guide
- [x] Prototype or iteration: Library Holds run packet and Allie’s challenge memo
- [ ] Final UI / shipped experience: Many Hats is a repo and agent system, not a product UI. The artifact pages are the shipped surface.
- [ ] Outcome evidence: No adoption metrics in the repo. Use the accepted Hold MVP decision, which cites Allie’s non-goals.
- [ ] Confidentiality or redaction notes: Demo is fictional. Do not imply a real library engagement.

### Draft case-study narrative

# A product team with boundaries

A general agent can answer as the product manager, the domain modeler, the designer, and the critic in the same breath. The draft looks complete. The roles were never separate, and nothing in the thread had to stop before it sounded like a decision.

I built Many Hats for that gap. It is a cloneable product team: thirteen named specialists, fifteen portable skills, and a shared knowledge system. The person using it stays the product owner. Agents recommend and prepare. They do not approve strategy, merge, deploy, or speak for stakeholders.

## One chat was wearing every hat

Design Dash already contained 53 stage-oriented methods, from object discovery through ethics review. Those methods worked inside a facilitated workshop. They were awkward as an ongoing team. A builder did not need another phase checklist. They needed to ask a product lead to frame the work, a domain steward to define the objects, and a critic who did not inherit the plan.

I had also watched public agent packs collapse those jobs into tool-specific prompts. Many of them hardcoded a host, a process, or a threshold. I reviewed GitHub’s awesome-copilot collection, OpenAI’s skills, and Anthropic’s skill packaging for boundaries and verification patterns, then wrote original contracts instead of copying agents.

`[Image: Thirteen hat avatars in a team grid. Each avatar links to a role with one primary responsibility.]`

## I split people, practice, knowledge, and work

The architecture keeps four things apart. People are stable roles. Practice is a portable skill with a testable contract. Knowledge is project facts and shared domain intelligence. Work is the artifact a role produces on a specific project.

That split changed the design of learning. A correction that belongs to one product stays in that project’s overrides. A reusable change needs a motivating case, a before-and-after behavior, an evaluation, and a pull request the human approves. Agents do not learn by promoting every correction into a universal rule.

The object library sits in shared knowledge, not inside one agent’s folder. Luke stewards it. Charlie, Echo, Finn, Relay, Cipher, and Ledger cite the same objects. A project can reference an object, fork it when the definition must change, or propose a promotion. It does not edit the shared object in place to satisfy an unreviewed assumption.

`[Image: Architecture flow. Human direction leads to roles, skills, and knowledge, then to project work. Observed learning splits into a project override or a reviewed upstream proposal.]`

## A fictional library shows the boundaries holding

Library Holds is the public demo: patrons and desk staff need a trustworthy holds-and-pickup loop. The tempting version is a platform, with transfers, waitlist games, and a notification preference center.

Liza’s direction chooses a Hold MVP: place, cancel, ready, fulfill, and expire, with one notice channel. Luke defines Hold, Patron, Item, and Pickup Window. Charlie maps waiting, ready, expired, cancelled, and an empty queue. Echo locks Hold against Reservation and Checkout. Allie challenges the platform version directly. SMS preference is an assumption. Waitlist points do not answer “pick up by when?” Multi-branch transfer is a different product. Liza’s accepted decision cites that challenge and keeps those ideas out of v1.

`[Image: Four artifact previews side by side — Liza’s direction, Luke’s Hold object, Charlie’s flow, Allie’s challenge — each with the specialist’s hat.]`

## The authority line is the product

I published Many Hats v0.1 with installers for Cursor, Claude Code, Codex, GitHub Copilot, and Windsurf. The skills stay host-neutral. Adapters only change how a tool discovers them.

The contract a reader has to remember is short. The human owns goals, consequential tradeoffs, approvals, and external actions. Allie does not inherit implementation ownership. A specialist’s claim is not evidence until it matches a file.

I do not have adoption numbers for v0.1, and Library Holds is not a field study. What the repository demonstrates is a way to do product work with AI without collapsing the team into one obliging voice. The useful unit is a specialist who can produce a citable artifact, stay inside a role, and leave the decision with the person accountable for it.

---

## 8. Design Dash

### I — Inspiration

**What was the project hook?** Write the compelling statement, question, or tension that started the work.

> Answer: How do you take a fuzzy product problem to a build-ready plan without letting a polished interface appear before anyone has defined the system?

**Who was the primary user, what were they trying to do, and what made the existing experience difficult?**

> Answer: The primary user is a designer or facilitator running consequential product work with a cross-functional team, with or without an AI assistant. The failure mode I kept seeing was speed without a model. A prompt can produce cards, charts, and filters in seconds. The team still has not defined the objects, the actions, the states, or what is evidence versus assumption. Workshops produced a pile of documents—assumptions, flows, specs, wireframes, a pitch site—whose relationships lived in prose. Asking why a control existed meant archaeology across files.

**What was happening in the surrounding product or business that made this project important?**

> Answer: I was facilitating this kind of work on real product teams, including the Assignments redesign in Renaissance Intelligence, where a remote Design Dash session used an object library to settle relationships, mental models, and interface decisions with product and engineering. AI made production cheaper and made missing system thinking more visible. I open-sourced the method so a dash could run in a general chat, in Cursor or Claude Code, or as a human-facilitated workshop, and still produce the same portable artifacts.

### D — Design Process

**What research, mapping, prototyping, testing, or technical exploration did you personally do?**

> Answer: I encoded the workshop as a nine-phase method, P0 through P8: preconditions, opportunity and evidence, intake and object modeling, framing lock, flow and reconciliation, divergence and selection, wireframe and ethics, an optional build, then validation and learning. Object-oriented UX, in the ORCA sequence, is the modeling core: discover objects, map how they nest, list what users can do, and document each object before screens are treated as the source of truth. I later wrote the Dash Model architecture (accepted 23 August 2026) so those outputs would be nodes and typed edges in plain files, with human-facing views generated from that store.

**What was the hardest design problem or constraint, and how did you work through it?**

> Answer: A dash produces on the order of twenty artifacts. Method v1.1 had treated a living-plan document as the source of truth when a Node toolchain was available. A hand-authored rich document drifts from the notes it summarizes, and it fails the teams who are working in a chat or a workshop with no local toolchain. The constraint I kept was portability: the only copy of a decision cannot live in a proprietary file or a database.

**Which design decision most changed the direction of the project?**

> Answer: The pivotal decision was making rigor a property of the work, not a setting the facilitator picks. Express, Standard, and High-stakes tiers are derived from risk, reversibility, and reach. Anything touching regulated personal data, financial data, or user safety forces High-stakes. Skipped gates become tracked evidence debt. They are deferred, not deleted. On Standard and High-stakes work, simulated review is not accountable sign-off.

### E — Engagement

**Who did you collaborate with, and what did each group contribute?**

> Answer: On the Assignments page at Renaissance, I facilitated the dash with the product manager, UX research, and engineering. The session used the object library to resolve what an assignment meant across products, which attributes were shared, and which interface decisions followed. In the open-source method, the equivalent voices are explicit: evidence, reconciliation, selection, ethics, and learning gates, with real sign-off from the responsible discipline when the tier requires it.

**How did you create alignment or incorporate feedback?**

> Answer: Alignment is a chain a later reader can check: evidence, insight, opportunity, requirement, object or behavior, decision, interface, outcome. Outcomes become the next evidence. The mandatory links are the ones that prevent slop without demanding a citation on every sentence: interface to decision, decision to requirement or object, requirement to opportunity. Open assumptions at a gate stay visible as evidence debt.

**What leadership, facilitation, or communication role did you personally take?**

> Answer: I designed the method, the templates, the gates, and the facilitation path, and I ran it with partner teams when the work had real stakes. The getting-started guide has a path with no terminal: paste a generic agent prompt, or run the phases as worksheets with a facilitator and a note-taker. AI critique can broaden the room. It does not replace the accountable reviewer.

### A — Action

**What did you personally own, change, or ship?**

> Answer: I authored and published Design Dash as an open-source, tool-neutral workflow. A completed dash yields five portable deliverables: object guides that accumulate in a library, a stakeholder pitch site, product requirements, monochrome wireframes, and an evidence trail. I also specified the Dash Model—plain Markdown and YAML as the canonical store—and eight architecture decisions that keep chat, workshop responses, the model, the regenerating Design Plan, and the frozen Story from becoming five sources of truth.

**What tradeoffs did you make, and how did you handle technical, organizational, or timeline constraints?**

> Answer: I rejected a database as the canonical store because it breaks local-first use and the no-Node fallback. I rejected hand-edited living-plan documents for the same reason they feel convenient: they concentrate truth in the artifact that is hardest to keep aligned. Integrity is checked at validation time, so agents, workshop responses, and people can all write files. I also capped the workshop MVP at declarative activities—questions, artifact critique, and comparison—so the project would not drift into a miniature design tool. Express-tier work may skip gates, but only by recording the debt. Solo mode may auto-confirm checkpoints inside a phase, and it still halts before High-stakes work proceeds without a person.

**What made the final solution possible?**

> Answer: The object library had already shown the pattern that scales: plain-file guides plus a generated graph that can be rebuilt and must never be hand-edited. The Dash Model generalizes that pattern from objects to evidence, assumptions, requirements, decisions, screens, and outcomes.

### S — Success

**What changed for users, the team, or the business?**

> Answer: A team can start from a one-sentence problem and leave with objects, flows, a defended concept, wireframes, requirements, and a pitch, with assumptions labeled as assumptions. In the Assignments work, that workshop produced updated object documentation, diagrams, wireframes, and a low-fidelity prototype the team could test, instead of another disconnected Figma pass.

**What evidence supports that outcome?** Include metrics, qualitative feedback, shipped outcomes, adoption, or decisions unlocked.

> Answer: The method evidence is the published contract: nine phases, five gates, three tiers, five deliverables, and the accepted architecture decisions dated 23 August 2026. The practice evidence is the Assignments redesign, where the shared assignment model and the priority-grouped interface came out of that facilitated process. I do not have separate public usage metrics for the open-source repository. The architecture document is an accepted concept; the per-dash files still migrate toward the Dash Model incrementally.

**What did you learn?**

> Answer: Encouraging people to keep documents in sync does not keep them in sync. The durable version of the rule is structural: one store, generated views, and a small set of links that must exist before the work can pass a gate.

### Closing Reflection

**What would you do differently or explore next?**

> Answer: The next build is the one the architecture already sequences: decision records and the node schema in daily use, a generated graph for the whole model, the three workshop primitives, a Design Plan that regenerates from HEAD, and a Story snapshot that freezes a release. I would also revise `method.yaml` so it no longer names the living-plan document as a source of truth. The architecture already supersedes that sentence.

**What does this project demonstrate about how you work as a designer?**

> Answer: It shows the part of my practice that sits underneath screens. I use object models, explicit evidence, and facilitated workshops to make a product decision traceable, then I turn that practice into something a team—or an agent—can run without trapping the result in one tool.

### Supporting images

- [x] Hero / final product: A Design Plan spread — pitch, requirements, and wireframe generated from one model — or the nine-phase strip from intake to plan
- [x] Problem or workflow: The “twenty loosely linked files” problem beside the traceability chain (evidence → insight → opportunity → requirement → object → decision → UI → outcome)
- [x] Research, map, or model: Nested object matrix or object-library index; Assignments object model is the in-practice example
- [x] Prototype or iteration: Monochrome wireframe with edge states, plus a gate checklist (evidence, reconciliation, selection, ethics, learning)
- [ ] Final UI / shipped experience: Design Dash ends at a plan, not a shipped product UI. Use a pitch-site screenshot if one public example is cleared.
- [x] Outcome evidence: ADR-0001 diagram (files canonical, views generated). Assignments before/after can sit beside it as the facilitated-session outcome. No repository adoption metric.
- [ ] Confidentiality or redaction notes: Renaissance examples need the same redaction standard as the Assignments case study.

### Draft case-study narrative

# From a fuzzy problem to a plan you can build

A designer can ask an AI coding tool for a dashboard and get cards, charts, and filters in seconds. The screen looks finished. The team still has not defined the objects, the actions, or which claims are evidence and which are hopes.

I built Design Dash for the work that has to happen before that screen is believable. It is an open-source workflow that takes a fuzzy problem through nine phases and leaves a build-ready plan: research, an object model, flows, a chosen concept, wireframes, requirements, and a stakeholder pitch. The same method runs in a general AI chat, in Cursor or Claude Code, or as a human-facilitated workshop.

## The interface was getting ahead of the system

I saw the gap in two places at once. On product teams, a workshop could end with a stack of documents whose relationships lived only in prose. A dash might leave behind assumptions, a design spec, a flow, a UI map, a wireframe, and a pitch site. Asking why a control existed meant searching across them. In the tools, generative AI made that pile cheaper to produce and easier to mistake for understanding.

The Assignments redesign at Renaissance Intelligence was one of the working sessions that forced the method to be practical. I facilitated a remote Design Dash with product and engineering, using an object library to decide what an assignment meant across products before we argued about layout. The shared attributes—title, type, assigned date, due date—and the product-specific ones were the reason the page could stay scannable.

`[Image: Two columns. Left, a stack of loosely named files. Right, one chain: evidence, insight, opportunity, requirement, object, decision, interface, outcome.]`

## Rigor follows the risk

I did not want the facilitator to choose how careful to be. Design Dash derives a tier from risk, reversibility, and reach.

Express is for low-risk, easily reversible, narrow work. It still keeps an ethics floor, and any skipped gate is recorded as evidence debt. Standard work requires evidence, reconciliation between the system model and the user’s mental model, a real comparison of concepts, an ethics review, and a learning plan. High-stakes work—hard to undo, broad in reach, or touching regulated, financial, or safety-related data—cannot waive those gates, and a simulated reviewer does not count as sign-off.

The modeling sequence inside that path is object-oriented UX. The team names the objects, sees which ones connect, lists what a person can do with each, and only then designs how those objects appear. Screens are a representation of those decisions.

`[Image: Three tier cards — Express, Standard, High-stakes — with the gates each one requires. High-stakes shows no waivers.]`

## One store, generated views

The failure mode I kept designing against was drift. An early version of the method treated a rich living-plan document as the source of truth whenever a Node toolchain was available. Hand-authored summaries drift, and they exclude anyone working from a chat transcript or a paper worksheet.

The architecture I accepted on 23 August 2026 inverts that. The Dash Model is plain files: Markdown with YAML frontmatter, plus typed links. A generated graph can be rebuilt and must not be edited by hand. Chat can facilitate, but a product decision has to leave the transcript as a record. Workshop responses write back into the model. The Design Plan regenerates from the current model. A Story is a frozen snapshot for a release, not a second place to invent rationale.

Three links are mandatory, because citing everything produces fatigue and citing nothing produces slop. The interface points at a decision. The decision points at a requirement or an object. The requirement points at an opportunity. An open assumption at a gate stays visible.

`[Image: System diagram. Chat and workshop write into the Dash Model. The model generates the Design Plan and the Story. Nothing meaningful exists only in a view.]`

## What a dash leaves behind

A finished dash has five portable outputs. Object guides accumulate in a library and can be referenced, forked, or later promoted. The pitch site is the walk-through for stakeholders. The requirements document states goals, non-goals, users, objects, flows, states, and acceptance criteria. The wireframes are monochrome and design-system-agnostic, including empty, loading, error, and permission states. The evidence trail keeps scope, flow, assumptions, metrics, and terms next to the decision.

On the Assignments work, that kind of session produced the object documentation, diagrams, wireframes, and low-fidelity prototype the team tested. The grouped priority view that shipped came out of that shared model, not from a table we kept decorating.

I do not have public usage metrics for the open-source repo, and the Dash Model is still migrating dash by dash. The lesson I trust is already in the method. Documents do not stay aligned because a team promises to update them. They stay aligned when there is one store, the views are generated, and a gate can fail a screen that cannot point back to a decision.

---

## 9. Amazon A-to-z first claim

### I — Inspiration

**What was the project hook?** Write the compelling statement, question, or tension that started the work.

> Answer: How might we turn a seller’s first A-to-z claim from a disciplinary shock into a learning moment that protects the customer and the selling account?

**Who was the primary user, what were they trying to do, and what made the existing experience difficult?**

> Answer: The primary users were third-party Amazon Marketplace sellers who received an A-to-z claim after a customer problem went unresolved. If a seller did not respond to the buyer within 48 hours, Amazon refunded the customer on the seller’s behalf and notified the seller of the claim and its impact on Order Defect Rate (ODR). Sellers often felt helpless, did not know what to do next, and could not see clear actions in the communications they received. ODR mattered to both sellers and Amazon, and many sellers were not confident they could avoid another claim. (Deck pp. 3, 7.)

**What was happening in the surrounding product or business that made this project important?**

> Answer: I was a UX Designer on Amazon Seller Central work during my 2016-08 to 2017-12 tenure. A-to-z claims sat at the junction of buyer protection, seller account health, and Seller Support load. Call-center analysis of 250 A-to-z-related contacts showed large preventable shares in dispute, appeal, and status questions (p. 5). Improving the first-claim experience was a way to educate sellers, reduce preventable support contacts, and still protect buyers.

### D — Design Process

**What research, mapping, prototyping, testing, or technical exploration did you personally do?**

> Answer: I analyzed Seller Support call-center data for A-to-z themes and preventability (p. 5). I partnered with stakeholders and domain experts to map the claims process—messaging, eligibility, dispute, and appeal—so we could see what information sellers needed to act (p. 6). I interviewed sellers about their first-claim experience and synthesized the gaps above (p. 7). Before designing solutions, I aligned partners on three tenets: the first claim is a learning opportunity; notifications should inform rather than punish; avoiding future claims helps the customer and the seller (p. 8).

**What was the hardest design problem or constraint, and how did you work through it?**

> Answer: The hard constraint was tone and accountability at once. The claim still counted toward ODR, and future claims would be refunded from the seller’s account, but the first notification could not read like a penalty letter if we wanted sellers to learn. Mapping the process and interviewing sellers showed that missing detail and unclear next steps—not a lack of rules—drove helplessness. The email had to explain what happened, what Amazon would do on a first claim, and how to avoid the next one, without burying the ODR stakes (pp. 7–8, 10).

**Which design decision most changed the direction of the project?**

> Answer: Reframing the first claim as a covered learning event, not only a defect notice. The redesigned first-claim email led with claim details, explained A-to-z and ODR in plain language, stated that Amazon would cover the customer refund on the first claim, and closed with concrete avoidance practices—respond within 24 hours, handle returns and refunds promptly, confirm shipments with tracking, cancel out-of-stock orders, and match the listing (p. 10). That decision changed the voice of the experience and tied education to a real policy moment.

### E — Engagement

**Who did you collaborate with, and what did each group contribute?**

> Answer: I worked with stakeholders and domain experts to map the claims process (p. 6) and aligned with partners on the core tenets before iterating on solutions (p. 8). Seller Support data shaped the problem frame (p. 5). Seller interviews supplied the confidence and clarity gaps (p. 7). Engineering and program partners who shipped the email and first-claim coverage are not named on the deck; I do not claim sole ownership of the live change.

**How did you create alignment or incorporate feedback?**

> Answer: Alignment started with shared tenets rather than screens. Once partners agreed the first claim should teach, the email structure—details, explanation, coverage, tips—became easier to defend than a softer rewrite of the old notice (p. 8, p. 10).

**What leadership, facilitation, or communication role did you personally take?**

> Answer: I facilitated the process mapping and tenets alignment, then designed the first-claim notification content and structure shown in the solution (pp. 6, 8, 10). Related dashboard work appears on the deck as adjacent, not as this story’s primary ship (pp. 13–14).

### A — Action

**What did you personally own, change, or ship?**

> Answer: I owned the discovery synthesis, the tenets workshop framing, and the design of the first-claim email notification: claim details, expectation-setting copy, first-claim coverage messaging, and avoidance guidance (pp. 5–8, 10). The deck presents that email as the solution artifact for this story.

**What tradeoffs did you make, and how did you handle technical, organizational, or timeline constraints?**

> Answer: The email still had to state that the claim affected ODR and that later claims would come from the seller’s account. Softening disciplinary language did not remove account consequences; it moved education earlier. Covering the first claim was a program investment whose cost had to be justified by fewer investigations and support contacts (p. 12)—a tradeoff I can describe, not a budget I can restate from the deck.

**What made the final solution possible?**

> Answer: Combining support-data priorities, a shared process map, seller interview themes, and partner-agreed tenets so the email had a job beyond “notify.”

### S — Success

**What changed for users, the team, or the business?**

> Answer: Sellers who opened the updated email reported higher confidence they could avoid future claims. Seller Support call volume related to A-to-z fell. Seller-initiated refunds trended up year over year. The deck also states that the tone of the first-claim experience changed and that covering first claims reduced investigation and support costs (p. 12). These results are deck-stated and remain unverified in the career record.

**What evidence supports that outcome?** Include metrics, qualitative feedback, shipped outcomes, adoption, or decisions unlocked.

> Answer: Results 60 days after the update was live in the U.S. (p. 12): 88% of sellers who opened the updated email said they were confident or very confident they could avoid future claims (`metric-a-to-z-first-claim-seller-confidence`); A-to-z-related call volume was reduced by 14% (+2% WoW) (`metric-a-to-z-first-claim-call-volume`); seller-initiated refunds trended towards a 30% increase YoY (`metric-a-to-z-first-claim-seller-refunds`). Discovery contact mix on p. 5 supports the problem frame only (`metric-a-to-z-first-claim-support-contact-mix`). Absolute sample sizes for the 60-day survey and call baseline are not on the deck.

**What did you learn?**

> Answer: A high-stakes notification can teach if it leads with specifics, names the consequence accurately, and gives a short list of behaviors that prevent the next failure—especially on a first offense when the company is willing to absorb the refund.

### Closing Reflection

**What would you do differently or explore next?**

> Answer: I would separate, for interview audiences, which outcomes came from the email content versus the first-claim coverage policy, and I would keep related dashboard work in its own story so attribution stays clean (pp. 12–14).

**What does this project demonstrate about how you work as a designer?**

> Answer: It shows how I use operational data and seller interviews to reframe a punitive moment, align partners on tenets before UI, and design communications that carry policy, education, and next actions in one place.

### Supporting images

List available materials and note any redaction or confidentiality constraints.

- [x] Hero / final product image: Cropped first-claim email on public page (gate 2 cleared)
- [ ] Problem or workflow image: Claims process map stays prose / interview-only
- [ ] Research, map, or model: Support-contact mix / tenets stay prose
- [ ] Prototype or iteration: Not emphasized on deck beyond solution email
- [x] Final UI / shipped experience: Email crop shipped; related dashboard mocks (pp. 13–14) stay off the public page
- [x] Outcome evidence: Prose on public page (60-day U.S. results); deck metrics unverified
- [x] Confidentiality or redaction notes: Gate 2 cleared product-UI crops (not whole slides). Mock names remain sample data in the email crop. Deck metrics unverified; résumé untouched (gate 4 unresolved).

### Draft case-study narrative

# Turning a seller’s first A-to-z claim into a learning moment

When a customer’s order from a third-party seller goes wrong and the seller does not respond in time, Amazon steps in. The customer gets a refund. The seller gets an A-to-z claim, a hit to Order Defect Rate, and an email that often felt like a penalty. I was a UX Designer on Seller Central during my Amazon tenure (2016-08 to 2017-12). The question for the first-claim experience was whether that email could teach instead of only punish.

## Support contacts showed what sellers did not understand

I reviewed a sample of 250 Seller Support contacts tied to A-to-z. Appeals, disputes, and status questions made up large shares of the volume, and many of those contacts were marked preventable on the analysis (p. 5). Sellers were not only unhappy—they were stuck.

`[Image: Context — support contact categories for A-to-z issues.]`

## Mapping and interviews made the gap concrete

I worked with stakeholders and domain experts to map how messaging, eligibility, disputes, and appeals connected (p. 6). Seller interviews added the human version: people felt helpless, could not see clear actions in the communications they received, cared deeply about ODR, and doubted they could avoid the next claim (p. 7).

Before we redesigned anything, I aligned partners on three tenets: the first claim is a learning opportunity; notifications should inform rather than discipline; avoiding future claims helps the customer and the seller (p. 8).

`[Image: Process artifact — claims flow and the three tenets.]`

## The first-claim email had to explain, cover, and coach

The pivotal decision was to treat the first claim as a covered learning event. The email led with claim details, explained what an A-to-z claim is and how ODR works, stated that Amazon would cover the customer refund on the first claim, and listed concrete practices for avoiding another one (p. 10). The stakes stayed visible. The tone changed.

I designed that notification. Shipping it and funding first-claim coverage were team and program moves; I do not claim them as solo outcomes.

`[Image: Final UI placeholder — first-claim email structure. No live mock with names.]`

## Sixty days in the U.S.

Sixty days after the update was live in the U.S., the deck reports that 88% of sellers who opened the email said they were confident or very confident they could avoid future claims, A-to-z-related call volume fell 14% (+2% week over week), and seller-initiated refunds trended toward a 30% year-over-year increase (p. 12). Those figures are stated on the slide and remain unverified in my career record.

The lesson I still use: when the company is willing to absorb a first failure, the notification should spend that goodwill on clarity and a short path to better behavior—not on softer adjectives.

---

## 10. Home Depot curbside pickup

### I — Inspiration

**What was the project hook?** Write the compelling statement, question, or tension that started the work.

> Answer: How might we set and manage expectations for customers picking up an order at the store so they stay with the designed curbside process instead of improvising under uncertainty?

**Who was the primary user, what were they trying to do, and what made the existing experience difficult?**

> Answer: Primary users were Home Depot customers using curbside and other contactless pickup, and the associates who picked and delivered orders. Customers expected confirmation when they checked in, disagreed about what “soon” meant, and could not see system errors. Associates dealt with orders of uneven complexity, store layouts that changed door-to-door time, and fulfillment-channel changes that disrupted the floor (p. 36).

**What was happening in the surrounding product or business that made this project important?**

> Answer: At the start of 2020, COVID regulations and customer needs forced the business, technology, and operations teams to invent contactless and remote shopping quickly. Signage, associates, emails, and other channels had to carry expectations that the product experience alone did not yet hold (p. 34). I was a Staff UX Designer at Home Depot (2018-10 to 2022-02); the deck labels the credit line “UX Designer.”

### D — Design Process

**What research, mapping, prototyping, testing, or technical exploration did you personally do?**

> Answer: I spent time in stores interviewing managers, associates, and customers (p. 36). I analyzed store-operations and survey data to size the problem for stakeholders (p. 37). I wrote a problem statement and built alignment artifacts for product partners (p. 38). I designed the ready-for-pickup email—including ETA prompts and Spanish access—and check-in confirmation states for success, failure, and delay (pp. 40, 42).

**What was the hardest design problem or constraint, and how did you work through it?**

> Answer: Expectation mismatch under operational variance. Customers expected delivery in under five minutes while average door-to-door time was already 3.5 minutes in the analysis set, and a large share of pickup customers called to change fulfillment method (30% on p. 37). Two additional analysis rates are redacted on the deck and are omitted by human decision (never invent; never show `**%`): longer-than-expected pickup; curbside check-in technical failure rate. I focused stakeholders on the visible numbers and on feedback during check-in rather than on unfinished journey diagrams.

**Which design decision most changed the direction of the project?**

> Answer: Asking customers for an ETA in the ready-for-pickup email, and confirming check-in (or failure) explicitly. The email told customers when and where to pick up, prompted “I’ll be there in…” options, explained how to get help, offered Spanish, and avoided mentioning unrelated fulfillment paths (p. 40). Check-in confirmation closed the loop with success, error, or delay messaging (p. 42). That shifted the work from static instructions to a timed conversation between customer and store.

### E — Engagement

**Who did you collaborate with, and what did each group contribute?**

> Answer: Field interviews included store managers, associates, and customers (p. 36). Product partners and store-pickup stakeholders reviewed alignment artifacts and the problem statement (p. 38). Operations and survey data informed the analysis slide (p. 37). Channel owners for email and push/SMS are implied by the solution surfaces but not named on the deck.

**How did you create alignment or incorporate feedback?**

> Answer: I used a concise problem statement—uncertainty without feedback drives process deviation—and supporting artifacts to show partners why expectation-setting belonged in communications, not only in associate heroics (p. 38). I did not treat the on-slide journey sketch as a finished deliverable; it still contains placeholder content.

**What leadership, facilitation, or communication role did you personally take?**

> Answer: I led field discovery, framed the opportunity for stakeholders, and designed the customer communication patterns for ready-for-pickup and check-in confirmation (pp. 36–38, 40, 42).

### A — Action

**What did you personally own, change, or ship?**

> Answer: I owned the research synthesis, the problem statement used for alignment, and the design of the ready-for-pickup email and check-in confirmation messaging (pp. 36–38, 40, 42). Pilot instrumentation and store operations owned measurement of door-to-door time and fulfillment switches.

**What tradeoffs did you make, and how did you handle technical, organizational, or timeline constraints?**

> Answer: We leaned on email and check-in messaging because those channels could move while store systems and layouts still varied. That meant accepting that some failures would still need “call the store” recovery (p. 42) instead of a fully self-healing check-in. Redacted analysis figures stayed out of the stakeholder story until they could be sourced.

**What made the final solution possible?**

> Answer: Pairing field empathy with a few honest operational baselines, then giving customers a way to declare arrival timing so associates could prioritize.

### S — Success

**What changed for users, the team, or the business?**

> Answer: After a 60-day pilot in 50 stores, most participating customers said their order arrived when they expected it, door-to-door times stayed under the five-minute goal with and without ETAs, and fulfillment-switch calls fell sharply versus the prior baseline (p. 44). Associates could prioritize using customer ETAs. Deck results remain unverified in the career record.

**What evidence supports that outcome?** Include metrics, qualitative feedback, shipped outcomes, adoption, or decisions unlocked.

> Answer: Results after a 60-day pilot in 50 stores (p. 44): ~90% of customers said their order was delivered when they expected it (`metric-curbside-pickup-on-time-expectation`); average door-to-door time was 3.8 minutes with ETAs and 4.5 minutes without (`metric-curbside-pickup-door-to-door-time`); less than 10% of pilot customers called to switch fulfillment, compared with a 30%+ baseline (`metric-curbside-pickup-fulfillment-switch-rate`; baseline also on p. 37). Redacted analysis figures on p. 37 stay omitted by human decision.

**What did you learn?**

> Answer: In a rushed operational invention, communications design is part of the product. A clear ETA prompt can do more for floor prioritization than another diagram of the happy path.

### Closing Reflection

**What would you do differently or explore next?**

> Answer: Human gate closed: permanently omit the two redacted analysis rates (never invent; never show `**%`). Replace the placeholder journey sketch with a finished cross-object flow only if a later revision needs it; public pages already ship without treating that sketch as finished.

**What does this project demonstrate about how you work as a designer?**

> Answer: It shows how I work in constrained, fast-moving operations: field listening, selective metrics, and customer communications that reduce improvisation when the store is under load.

### Supporting images

- [x] Hero / final product: Cropped ready-for-pickup email with ETA choices (p. 40) on public page
- [ ] Problem or workflow: Field insights stay prose; do not present p. 38 journey as finished
- [ ] Research, map, or model: Problem statement stays prose
- [x] Final UI / system view: Cropped check-in success / error / delay (p. 42)
- [x] Outcome evidence: Prose on public page (60-day / 50-store results)
- [x] Confidentiality or redaction notes: Gate 2 cleared crops of product UI (not whole slides). Gate 3: permanently omit redacted analysis percentages. Cipher: keep operational raw dumps out of public HTML; public page uses interview-draft voice and stated-with-window metrics only.

### Draft case-study narrative

# Managing curbside expectations when the store is inventing the process

In early 2020, Home Depot had to invent contactless pickup while regulations and customer habits changed week to week. Associates, signage, and email carried a lot of the experience. I was a Staff UX Designer on store systems and communications work in that window. The failure mode I kept seeing was not only slow delivery—it was uncertainty. When customers did not get feedback after check-in, they left the car, called to change fulfillment, or assumed something was wrong.

## The field made the variance obvious

I interviewed store managers, associates, and customers. Orders varied wildly in size and complexity. Store layout changed door-to-door time. Fulfillment-channel changes disrupted the floor. Customers expected a confirmation when they checked in, and they did not share one definition of “on time.” System errors were invisible to them (p. 36).

Analysis added a few usable baselines: customers expected delivery in under five minutes, average door-to-door time was 3.5 minutes, and 30% of pickup customers called to change their pickup method (p. 37). Two other rates remain redacted on the source deck and are **omitted by human decision** (not inventable): longer-than-expected pickup rate; curbside check-in technical failure rate.

`[Image: Context — store pickup without confirmation.]`

## Alignment started from a problem statement, not a finished journey

I told partners that missing feedback during pickup made customers feel uncertain and more likely to leave the designed process (p. 38). I kept the journey sketch out of the “finished artifact” column; on the deck it still reads as a placeholder.

`[Image: Process artifact — problem statement used for stakeholder alignment.]`

## ETA in the email, confirmation at check-in

The decision that changed the work was to make timing a two-way signal. The ready-for-pickup email said when and where to come, asked for an ETA, explained how to get help, offered Spanish, and avoided unrelated fulfillment options (p. 40). Check-in confirmation told customers when they were successful, when to call the store, or when the order would take longer (p. 42).

`[Image: Final UI placeholders — ready-for-pickup ETA choices; check-in states.]`

## Fifty stores, sixty days

After a 60-day pilot in 50 stores, about 90% of customers said the order arrived when they expected it. Average door-to-door time was 3.8 minutes with ETAs and 4.5 minutes without—both under the five-minute goal. Fewer than 10% of pilot customers called to switch fulfillment, against a prior baseline above 30% (p. 44). Those figures are deck-stated and unverified in my career record.

The practice point: when operations are inventing the channel, expectation design is not decoration. It is how you keep customers and associates in the same playbook.

---

## 11. Home Depot price adjustments

### I — Inspiration

**What was the project hook?** Write the compelling statement, question, or tension that started the work.

> Answer: How might we give store associates a first-class way to adjust prices in Order Up so they can help a customer without a workaround that slows the sale?

**Who was the primary user, what were they trying to do, and what made the existing experience difficult?**

> Answer: Store associates using Order Up to manage and fulfill pickup orders. Customers asked for competitor matches, damaged-item markdowns, and other goodwill discounts when expectations were not met (p. 17). Each store had its own workarounds; those paths lengthened transaction time; and existing reason codes did not cover the adjustment types associates actually needed (p. 19).

**What was happening in the surrounding product or business that made this project important?**

> Answer: Transaction time mattered to the business. Adjustments over $50 still needed manager approval. Stores held customer-satisfaction budgets, and order-level discounts had to allocate across SKUs (p. 20). I was a Staff UX Designer at Home Depot (2018-10 to 2022-02); the deck credit line says “UX Designer.”

### D — Design Process

**What research, mapping, prototyping, testing, or technical exploration did you personally do?**

> Answer: I ran an observational study and interviews across 12 stores (p. 19), met stakeholders and store-operations partners for requirements (p. 20), iterated markdown UI concepts for item and order adjustments (pp. 22–23, 25), and usability-tested layouts, language, and interaction patterns for task completion and transaction time, ending with a SUS questionnaire (p. 24). [Figure missing: SUS score, p. 24.]

**What was the hardest design problem or constraint, and how did you work through it?**

> Answer: Associates needed to apply a markdown without losing sight of the cart, while still respecting approval thresholds and reason codes. Testing showed that keeping order information visible mattered, that associates multitasked across apps, that “Markdown” was clearer than “adjustment,” and that associates needed to explain the math to the customer (p. 24). Manager approval for discounts over $50 had to remain in the flow (p. 20, p. 29).

**Which design decision most changed the direction of the project?**

> Answer: Committing to a fly-out markdown pattern that kept cart context visible, after it showed the strongest task completion and perceived usability among the concepts I tested (p. 25). I then designed components to apply, update, and remove adjustments and updated the order summary to show the math (p. 27).

### E — Engagement

**Who did you collaborate with, and what did each group contribute?**

> Answer: Associates and managers across 12 stores shaped the problem (p. 19). Stakeholders and store-operations partners set approval, budget, and allocation rules (p. 20). Usability participants validated interaction patterns (pp. 24–26). Engineering and rollout partners are implied by the 50-store pilot and chain-wide launch but not named on the deck (p. 31).

**How did you create alignment or incorporate feedback?**

> Answer: I brought store workarounds and reason-code gaps to operations partners, then used usability findings—especially language (“Markdown”) and visible math—to choose among UI directions (pp. 19–20, 24–25).

**What leadership, facilitation, or communication role did you personally take?**

> Answer: I led the multi-store discovery, facilitated requirements alignment with operations, and owned the interaction design through iteration and re-test (pp. 19–27).

### A — Action

**What did you personally own, change, or ship?**

> Answer: I owned discovery across 12 stores, the markdown interaction design (apply / update / remove), order-summary presentation of discounts, and the usability program described on the deck (pp. 19–27). The feature was piloted in 50 stores and then rolled out to all Home Depot stores (p. 31).

**What tradeoffs did you make, and how did you handle technical, organizational, or timeline constraints?**

> Answer: Autonomy stopped at the approval threshold: discounts over $50 still required a manager path (including a handoff to eSVS in the mocks) (pp. 20, 29). Order-level markdowns had to split across SKUs rather than existing as a single opaque total (p. 20). Speed of associate learning beat abstract terminology—so the product spoke “Markdown.”

**What made the final solution possible?**

> Answer: Watching real workarounds in twelve stores, encoding operations rules early, and letting usability—not preference—pick the fly-out pattern.

### S — Success

**What changed for users, the team, or the business?**

> Answer: After the 50-store pilot and chain-wide rollout, trends at 30, 60, and 90 days from launch showed directional improvement only: order transaction times decreased; associates reported feeling more empowered; shrink decreased; operations reported higher SOP adoption for price adjustments (p. 31). No magnitudes appear on the deck.

**What evidence supports that outcome?** Include metrics, qualitative feedback, shipped outcomes, adoption, or decisions unlocked.

> Answer: Shipped outcome: markdown feature piloted in 50 stores, then rolled out to all stores (p. 31). Directional-only measures: `metric-price-adjustments-transaction-time`, `metric-price-adjustments-associate-empowerment`, `metric-price-adjustments-shrink`, `metric-price-adjustments-sop-adoption`. SUS numeric result: [Figure missing: SUS score, p. 24] (`metric-price-adjustments-sus-score`). Do not invent percentages or minutes.

**What did you learn?**

> Answer: In associate tools, the winning design is often the one that preserves context and speaks the floor’s language while still enforcing the approval rule the business cannot waive.

### Closing Reflection

**What would you do differently or explore next?**

> Answer: For portfolio use, I would either recover quantified impact for one primary measure (transaction time or SOP adoption) or keep this story as a process case nested under a stronger Home Depot outcome story. Publishing it alone with only directional impact is a thin claim.

**What does this project demonstrate about how you work as a designer?**

> Answer: It shows systems UI craft under real store constraints: observation, operations rules, iterative testing, and components that make policy visible in the order summary.

### Supporting images

- [x] Hero / final product: Cropped markdown fly-out on cart (pp. 28/30); associate/store header cropped out
- [ ] Problem or workflow: Store workaround context stays prose
- [ ] Research, map, or model: Reason-code / approval rules stay prose
- [x] Final UI / system view: Apply and update markdown UI crops on public page
- [x] Outcome evidence: Prose only — directional 30/60/90-day trends; no fabricated chart
- [x] Confidentiality or redaction notes: Gate 2 cleared crops; associate name and store number omitted from crops. Impact stays directional.

### Draft case-study narrative

# Giving associates a real markdown path in Order Up

When a customer asked for a competitor match or a discount on a damaged item, Home Depot associates still had to finish the sale in Order Up. Many stores had invented workarounds that burned time and still fought the reason codes in the system. I was a Staff UX Designer on store systems. The job was to put price adjustments in the product associates already used—without ignoring manager approval or the store’s customer-satisfaction budget.

## Twelve stores made the workarounds impossible to ignore

Observation and interviews across 12 stores showed a consistent pattern: managers trusted associates to make good calls, but each building had its own path to apply an adjustment, those paths lengthened transaction time, and the official reason codes did not match the situations on the floor (p. 19).

Operations partners added the hard rules. Adjustments over $50 still needed manager approval. Each store had a satisfaction budget. An order-level markdown had to allocate across SKUs. Transaction time was a metric the business watched (p. 20).

`[Image: Context — associate juggling cart context and a workaround.]`

## Usability picked the pattern; language picked “Markdown”

I iterated item-level and order-level markdown UI, then tested task completion, transaction time, and a short SUS questionnaire (p. 24). [Figure missing: SUS score, p. 24.] Associates needed the order visible while they worked, juggled multiple apps, preferred “Markdown” to “adjustment,” and had to explain the math to the customer.

The fly-out concept won on task completion and perceived usability, so I kept iterating that direction and designed components to apply, update, and remove adjustments with an order summary that showed the discount (pp. 25–27). Discounts that required approval stayed explicit in the flow (p. 29).

`[Image: Process artifact — concept comparison leading to the fly-out.]`

`[Image: Final UI placeholder — markdown fly-out and order summary. No live Order Up crop.]`

## Shipped widely; impact stays directional

The markdown feature was tested in a 50-store pilot and rolled out to all Home Depot stores. At 30, 60, and 90 days after launch, the deck reports that transaction times decreased, associates felt more empowered, shrink decreased, and SOP adoption for price adjustments increased (p. 31). Those statements are directional only. I do not have magnitudes to quote, and I will not invent them.

For interviews, this story is strongest as a process and systems-UI case. As a standalone portfolio page with only directional impact, it is the thinnest of the three retail drafts—and that limitation should stay visible.

---

## Notes for the interview

- Separate what you know from what you infer.
- If a project did not ship, describe the decision, prototype, or direction it enabled instead of inventing an outcome.
- Specific moments are more useful than general claims: a disagreement, a surprising finding, a constraint, a before/after, or a decision that changed the work.
- Metrics are helpful but not required. Quotes, observed behavior, adoption, shipped scope, and stakeholder decisions can also be evidence.
