---
name: design-product-language
description: Create or audit product interface language using user mental models, object terminology, plain language, voice, and state-specific guidance. Use for UI language audits, labels, CTAs, navigation, forms, empty or error states, terminology systems, or product voice; do not use for long-form marketing copy without interface context.
---

# Outcome

Produce clear, consistent interface language that helps users recognize objects, predict actions and consequences, recover from problems, and complete work.

# Workflow

1. Read the object guides, glossary, research evidence, product voice, and target flows.
2. Inventory visible terms, labels, instructions, messages, and repeated headings in context.
3. Map each term to the user's concept, canonical object, system identifier, and allowed variants.
4. Identify vague verbs, internal jargon, duplicate labels, inconsistent objects, hidden consequences, and placeholder language.
5. Name actions with specific verbs and objects; distinguish creation, saving, publishing, sending, and destructive effects.
6. Write field help before error text when prevention is possible.
7. For errors, explain what happened, what remains safe, and the next available action.
8. Apply voice only after clarity, accuracy, accessibility, and urgency are satisfied.
9. Check localization, text expansion, reading level, screen-reader context, and label uniqueness.
10. Update the project glossary and provide before/after recommendations with rationale.

# Invariants

- Do not rename a domain object locally without reconciling the glossary.
- Do not use humor for errors, safety, money, privacy, or blocked work unless the established voice and user context clearly support it.
- Preserve necessary legal and technical precision; explain unfamiliar terms rather than deleting meaning.
- Do not solve structural repetition with synonym variation.

# Verification

Read each revised flow as a user encountering it for the first time. Confirm labels are unique in context, action outcomes are predictable, messages offer recovery, and the same object retains the same canonical name. Copy `templates/work/language-inventory.md` and update the project glossary from `knowledge/glossary/_template.md`.

# Resources

For the Design Dash voice and style method, read [`references/design-dash/index.md`](references/design-dash/index.md).
