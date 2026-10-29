---
id: practice-change-folio-diagramming-20261023
type: practice-change
status: implemented
date: 2026-10-23
owner: iris
related_objects: []
related_evidence: []
related_decisions: []
---

# Practice change: diagram geometry and project conventions

## Trigger

The user asked to connect broken branches in the Shapes Product representation diagram, center its peer context headers, and create/install a diagramming skill so other agents can reuse the learning.

## Actual vs desired

| Field | Description |
| --- | --- |
| Actual behavior | The horizontal bus used 16.66% insets, while card stems followed card centers in a grid with 16px gaps. This left about 5.3px seams at the outer branches. Context headers were left-aligned. |
| Desired behavior | Source, bus, and branches form one connected relationship; peer context headers are centered; narrow layouts retain readable labels and no orphaned lines. |
| Affected agent / skill | Iris and Finn; new project-installed `diagramming` skill. |
| Pattern scope | Portable connector mechanics; portfolio-specific presentation preferences. |

## Scope decision

Add a focused skill package in `skills/diagramming/` and register it for normal discovery. Keep this user's portfolio choices in the package's project-style reference. Use the existing adapter generator for discovery mounts, without changing agent roles or installing unrelated host adapters. This record is the project override/provenance for those local choices; other projects should choose their own visual vocabulary.

## Evaluation case

A correct standalone fan-out fixture passes. A deliberately broken variant with percent-based insets and left-aligned headers fails on both connector endpoints and alignment. The real pre-fix Shapes page also fails for those defects; the corrected page passes at 1440, 949, 768, 390, and 320px.

The checker verifies thin axis-aligned DOM/CSS segment rectangles. It does not claim to validate arbitrary SVG curves, graph meaning, or complete accessibility. The visible diagram was also inspected.

## Files changed

- `newsite/shapes.css`: shared grid-gap geometry, connected source stem, centered context headers, coherent stacked fallback.
- `skills/diagramming/`: instructions, connector/project/checker references, optional render checker, positive/broken regression fixture, portable contract, and evaluation cases.
- `config/skills.json`: discovery record owned by Iris.
- `.agents/skills/diagramming`: normal shared project skill mount.
- `.claude/skills/diagramming`: matching project skill mount for Claude discovery.

## Compatibility and validation

The checker uses the existing Node/Puppeteer installation and accepts only local files or loopback URLs. No dependency installation or deployment is part of the skill. Skill frontmatter and project package validation passed. Existing broad repository validation failures are recorded separately; this change does not attempt to repair unrelated adapters or parse errors under node_modules.
