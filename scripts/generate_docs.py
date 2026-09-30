#!/usr/bin/env python3
"""Generate human-readable inventories from canonical JSON configuration."""

from __future__ import annotations

import json
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def main() -> int:
    mapping = json.loads((ROOT / "config" / "design-dash-map.json").read_text(encoding="utf-8"))
    counts = Counter(item["agent"] for item in mapping)
    lines = [
        "# Design Dash migration map",
        "",
        "All 53 Design Dash skills are assigned to an accountable Many Hats agent and consolidated capability. The original method and bundled resources are retained under that capability's `references/design-dash/` directory. This table is generated from `config/design-dash-map.json`.",
        "",
        "| Agent | Imported methods |",
        "| --- | ---: |",
    ]
    for agent, count in sorted(counts.items()):
        lines.append(f"| {agent.title()} | {count} |")
    lines.extend(["", "| Design Dash source | Agent | Many Hats skill |", "| --- | --- | --- |"])
    for item in mapping:
        source_url = f"https://github.com/abenjamin765/design-dash/tree/main/skills/{item['source']}"
        lines.append(f"| [`{item['source']}`]({source_url}) | {item['agent'].title()} | `{item['skill']}` |")
    (ROOT / "docs" / "design-dash-migration.md").parent.mkdir(exist_ok=True)
    (ROOT / "docs" / "design-dash-migration.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"generated migration map for {len(mapping)} methods")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
