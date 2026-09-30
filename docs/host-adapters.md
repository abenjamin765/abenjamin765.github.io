# Host adapters

Many Hats keeps **one** portable team and generates thin discovery mounts for common AI coding hosts. Adapters add paths and frontmatter hosts need for discovery. They do not fork skill instructions or role boundaries.

## Design

```text
Canonical                  Generated mounts
─────────                  ────────────────
AGENTS.md                  CLAUDE.md
agents/*.md          →     .claude/agents/, .cursor/agents/, .github/agents/
skills/*/SKILL.md    →     .agents/skills/, .claude/skills/
                           .github/copilot-instructions.md
                           .windsurf/rules/many-hats.md
```

**Shared skills first.** Cursor, Codex, GitHub Copilot, and Windsurf all discover Agent Skills from `.agents/skills/`. The installer symlinks each skill package there once. Claude Code still prefers `.claude/skills/`, so that mount is generated as well.

**Named specialists only where native.** Cursor, Claude Code, and Copilot have first-class agent/subagent files. Codex and Windsurf rely on `AGENTS.md` plus skills. Windsurf gets one short always-on rule that points at `AGENTS.md` instead of thirteen always-on agent rules (context budget).

**No Cursor rule that restates `AGENTS.md`.** Cursor already loads root `AGENTS.md`.

## Install

```bash
./install.sh --all          # default when no host flags are passed
./install.sh --cursor       # shared skills + Cursor agents
./install.sh --codex        # shared .agents/skills only
./install.sh --dry-run
./install.sh --check        # fail if generated adapters are stale
```

`scripts/generate_adapters.py` is the source of truth for generated files. Commit the generated mounts so clone-and-open works without a local install step. Re-run the generator after changing `agents/*.md` or adding a skill.

## Per-host extras

### Cursor

- Skills: `.agents/skills/` (Cursor also scans `.cursor/skills/`; we do not duplicate)
- Agents: `.cursor/agents/<name>.md` with `name`, `description` (includes “Use when…”), and `model: inherit`
- Invoke skills with `/skill-name`; invoke specialists by name or “ask Liza…”

### Claude Code

- Skills: `.claude/skills/`
- Agents: `.claude/agents/<name>.md` with `skills:` listing that agent’s **primary** skills only
- Pointer: `CLAUDE.md` → read `AGENTS.md`
- Invoke with `/skill-name` or subagent delegation

### Codex / OpenAI

- Skills: `.agents/skills/` (Codex’s repository skill path)
- No `.codex/skills` primary mount
- Named routing via `AGENTS.md` and skill descriptions
- Invoke with `$skill-name` or `/skills`

### GitHub Copilot

- Skills: `.agents/skills/` (also accepts `.github/skills/` and `.claude/skills/`)
- Agents: `.github/agents/<name>.agent.md`
- Pointer: `.github/copilot-instructions.md` → `AGENTS.md`
- Select a specialist from the agent dropdown; skills match by description

### Windsurf

- Skills: `.agents/skills/`
- Pointer: `.windsurf/rules/many-hats.md` (`always_on`)
- `@mention` skills or rely on automatic match; route roles through `AGENTS.md`

### Generic hosts

Follow [`adapters/generic.md`](../adapters/generic.md): read `AGENTS.md`, load `agents/<name>.md`, load matching `skills/*/SKILL.md`.

## Validation

`scripts/validate_repo.py` asserts:

- every skill has a `.agents/skills/<name>` mount
- every agent has Claude, Cursor, and Copilot wrappers with required frontmatter
- Claude wrappers declare primary skills; Cursor wrappers set `model: inherit`
- pointer files mention `AGENTS.md`
- adapter docs list `.agents/skills` for Codex
- generated content matches `generate_adapters.py` (no silent hand edits)

## Out of scope

Marketplace plugins, Gemini/Continue/Aider first-class directories, and copying full skill bodies into Copilot prompts or Windsurf rules. Those hosts can still use the generic `AGENTS.md` path.
