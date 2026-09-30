#!/usr/bin/env python3
"""Validate the portable common denominator of an Agent Skill package."""

from __future__ import annotations

import argparse
import pathlib
import re
import sys

NAME_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def parse_frontmatter(text: str) -> tuple[dict[str, str], str]:
    if not text.startswith("---\n"):
        raise ValueError("SKILL.md must begin with YAML frontmatter")
    try:
        header, body = text[4:].split("\n---\n", 1)
    except ValueError as exc:
        raise ValueError("SKILL.md frontmatter must end with ---") from exc

    fields: dict[str, str] = {}
    for line in header.splitlines():
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if ":" not in line:
            raise ValueError(f"unsupported frontmatter line: {line}")
        key, value = line.split(":", 1)
        fields[key.strip()] = value.strip().strip('"').strip("'")
    return fields, body


def validate(skill_dir: pathlib.Path) -> list[str]:
    errors: list[str] = []
    skill_files = [p for p in skill_dir.rglob("*") if p.is_file() and p.name.lower() == "skill.md"]
    expected = skill_dir / "SKILL.md"
    if skill_files != [expected]:
        errors.append("package must contain exactly one root-level SKILL.md")
        return errors

    try:
        fields, body = parse_frontmatter(expected.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, ValueError) as exc:
        errors.append(str(exc))
        return errors

    name = fields.get("name", "")
    description = fields.get("description", "")
    if not name:
        errors.append("frontmatter requires name")
    elif len(name) > 64 or not NAME_RE.fullmatch(name):
        errors.append("name must be at most 64 characters using lowercase letters, digits, and internal hyphens")
    if name and skill_dir.name != name:
        errors.append("directory name must match frontmatter name")
    if not description:
        errors.append("frontmatter requires description")
    elif len(description) > 1024:
        errors.append("description must be at most 1024 characters")
    elif not re.search(r"\buse\b|\bwhen\b", description, re.IGNORECASE):
        errors.append("description should state when the skill applies")
    if not body.strip():
        errors.append("SKILL.md requires instruction content")

    for match in re.finditer(r"\[[^\]]+\]\(([^)]+)\)", body):
        target = match.group(1).split("#", 1)[0]
        if not target or "://" in target or target.startswith("mailto:"):
            continue
        if not (skill_dir / target).resolve().is_relative_to(skill_dir.resolve()):
            errors.append(f"relative reference escapes the skill directory: {target}")
        elif not (skill_dir / target).exists():
            errors.append(f"missing referenced file: {target}")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("skill_dir", type=pathlib.Path)
    args = parser.parse_args()
    errors = validate(args.skill_dir.resolve())
    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1
    print(f"PASS: {args.skill_dir}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
