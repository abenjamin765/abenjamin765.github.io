# Projects

Create one directory per product or initiative:

```text
projects/<name>/
├── README.md
├── knowledge/
│   ├── objects/
│   ├── evidence/
│   ├── decisions/
│   ├── metrics/
│   └── glossary/
├── overrides/
│   ├── agents/
│   └── skills/
└── work/
```

Scaffold typed artifacts from [`docs/artifacts.md`](../docs/artifacts.md):

```bash
python3 scripts/new_artifact.py direction --project <name> --slug hold-mvp
```

| Directory | Role |
| --- | --- |
| [`demo/`](demo/) | Public Many Hats showcase (Library Holds). Safe to commit; fictional domain. |
| [`example/`](example/) | Blank starter template for a new private or public project. |

Project overrides state the evidence, scope, and base version they modify. Keep private or sensitive content in a separately controlled repository or under the ignored `private/` directory; do not assume `.gitignore` is access control. Do not put confidential product facts in `demo/`.
