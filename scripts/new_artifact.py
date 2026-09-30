#!/usr/bin/env python3
"""Scaffold a knowledge or work artifact from the typed template catalog."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from artifact_lib import fill_template, registry_by_type  # noqa: E402


SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def destination_path(entry: dict, project: str, slug: str) -> Path:
    dest = entry["destination"].format(slug=slug)
    return ROOT / "projects" / project / dest


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("type", help="Artifact type from config/artifacts.json")
    parser.add_argument("--project", required=True, help="Target project under projects/")
    parser.add_argument("--slug", required=True, help="kebab-case slug used in id and filename")
    parser.add_argument("--owner", default=None, help="Override steward owner")
    args = parser.parse_args()

    registry = registry_by_type()
    entry = registry.get(args.type)
    if entry is None:
        print(f"ERROR: unknown artifact type {args.type!r}; known: {', '.join(sorted(registry))}", file=sys.stderr)
        return 1
    if not SLUG_RE.fullmatch(args.slug):
        print("ERROR: slug must be lowercase kebab-case", file=sys.stderr)
        return 1

    project_dir = ROOT / "projects" / args.project
    if not project_dir.is_dir():
        print(f"ERROR: project not found: {project_dir}", file=sys.stderr)
        return 1

    template_path = ROOT / entry["template"]
    if not template_path.is_file():
        print(f"ERROR: missing template {template_path}", file=sys.stderr)
        return 1

    out = destination_path(entry, args.project, args.slug)
    if out.exists():
        print(f"ERROR: refusing to overwrite {out.relative_to(ROOT)}", file=sys.stderr)
        return 1

    prefix = entry.get("id_prefix") or f"{args.type}-"
    artifact_id = f"{prefix}{args.slug}"
    owner = args.owner or entry["owner"]
    text = fill_template(
        template_path.read_text(encoding="utf-8"),
        artifact_id=artifact_id,
        artifact_type=args.type,
        owner=owner,
        slug=args.slug,
    )
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(text, encoding="utf-8")
    print(f"created {out.relative_to(ROOT)} ({artifact_id})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
