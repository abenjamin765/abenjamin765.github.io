# Host adapters

Canonical agent definitions live in `agents/`. Canonical skills live in `skills/`. Host adapters are **generated discovery mounts** — they must not rewrite skill bodies or role boundaries.

Regenerate with:

```bash
./install.sh --all
# or
python3 scripts/generate_adapters.py --all
```

`./install.sh --check` (and `scripts/validate_repo.py`) fail when generated adapters are missing or stale.

## Discovery matrix

| Host | Skills (scanned) | Named agents | Always-on entry | Notes |
| --- | --- | --- | --- | --- |
| **Shared / Codex** | `.agents/skills/` → `skills/` | — | `AGENTS.md` | Codex primary skill path is `.agents/skills`, not `.codex/skills` |
| **Cursor** | `.agents/skills/` (also accepts `.cursor/skills/`) | `.cursor/agents/<name>.md` | `AGENTS.md` | Agents set `model: inherit`; no duplicate Cursor skill tree |
| **Claude Code** | `.claude/skills/` → `skills/` | `.claude/agents/<name>.md` | `CLAUDE.md` → `AGENTS.md` | Agent frontmatter preloads **primary** skills only |
| **GitHub Copilot** | `.agents/skills/` (also `.github/skills/`, `.claude/skills/`) | `.github/agents/<name>.agent.md` | `.github/copilot-instructions.md` → `AGENTS.md` | Tools omitted so Copilot inherits defaults |
| **Windsurf** | `.agents/skills/` (also `.windsurf/skills/`) | — | `.windsurf/rules/many-hats.md` → `AGENTS.md` | One short always-on rule; avoid 13 always-on agent rules |
| **Generic** | Read `skills/` directly | Read `agents/<name>.md` | [`generic.md`](generic.md) | File-capable hosts with no native mount |

## Generated vs canonical

| Path | Kind |
| --- | --- |
| `AGENTS.md`, `agents/`, `skills/` | Canonical — edit these |
| `.agents/skills/`, `.claude/skills/`, `.claude/agents/`, `.cursor/agents/`, `.github/agents/`, `CLAUDE.md`, `.github/copilot-instructions.md`, `.windsurf/rules/many-hats.md` | Generated — do not hand-edit |

## Invocation cheat sheet

| Host | Skills | Specialists |
| --- | --- | --- |
| Cursor | `/skill-name` or automatic match | Named subagent / “ask Liza…” |
| Claude Code | `/skill-name` or automatic match | `.claude/agents` subagents |
| Codex | `$skill` / `/skills` | Route via `AGENTS.md` |
| Copilot | Automatic skill match | Agent dropdown (`.agent.md`) |
| Windsurf | `@mention` skill or automatic match | Route via `AGENTS.md` |

See [`docs/host-adapters.md`](../docs/host-adapters.md) for rationale and host-specific details.
