#!/usr/bin/env python3
"""One-time, deterministic importer for mapped Design Dash skill resources."""

from __future__ import annotations

import argparse
import json
import re
import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LINK_RE = re.compile(r"(\[[^\]]+\]\()([^)]+)(\))")


def rewrite_external_links(source_dir: Path, target_dir: Path, repo_root: Path) -> None:
    for target_file in target_dir.rglob("*.md"):
        source_file = source_dir / target_file.relative_to(target_dir)
        text = target_file.read_text(encoding="utf-8")

        def replace(match: re.Match[str]) -> str:
            raw = match.group(2)
            path_part, marker, fragment = raw.partition("#")
            if not path_part or "://" in path_part or path_part.startswith("mailto:"):
                return match.group(0)
            resolved = (source_file.parent / path_part).resolve()
            if resolved.is_relative_to(source_dir):
                return match.group(0)
            if resolved.is_relative_to(repo_root):
                relative = resolved.relative_to(repo_root).as_posix()
                suffix = f"#{fragment}" if marker else ""
                url = f"https://github.com/abenjamin765/design-dash/blob/main/{relative}{suffix}"
                return f"{match.group(1)}{url}{match.group(3)}"
            return match.group(0)

        target_file.write_text(LINK_RE.sub(replace, text), encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("design_dash", type=Path)
    args = parser.parse_args()
    source_root = args.design_dash.resolve() / "skills"
    mapping = json.loads((ROOT / "config" / "design-dash-map.json").read_text(encoding="utf-8"))
    imported: dict[str, list[tuple[str, str]]] = {}
    for item in mapping:
        source = source_root / item["source"]
        if not (source / "SKILL.md").exists():
            raise SystemExit(f"missing source skill: {source}")
        source_name = item["source"].split("/")[-1]
        target = ROOT / "skills" / item["skill"] / "references" / "design-dash" / source_name
        if target.exists():
            shutil.rmtree(target)
        shutil.copytree(source, target)
        rewrite_external_links(source, target, args.design_dash.resolve())
        (target / "SKILL.md").rename(target / "method.md")
        imported.setdefault(item["skill"], []).append((source_name, item["source"]))
    for skill, items in imported.items():
        index = ROOT / "skills" / skill / "references" / "design-dash" / "index.md"
        lines = [
            "# Design Dash method references",
            "",
            "Read only the method that matches the current decision boundary. These are attributed source references, not additional discoverable skills.",
            "",
        ]
        for source_name, source_path in sorted(items):
            lines.append(f"- [`{source_path}`]({source_name}/method.md)")
        index.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"imported {len(mapping)} Design Dash skill resources")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
