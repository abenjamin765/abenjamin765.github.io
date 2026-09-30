#!/usr/bin/env python3
"""Shared helpers for artifact templates, knowledge validation, and graphs."""

from __future__ import annotations

import json
import re
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from typing import Any

import yaml


ROOT = Path(__file__).resolve().parents[1]
SKIP_NAMES = {"readme.md", "prompt.md"}
SKIP_SUFFIXES = ("_template.md", "-template.md")
HEADING_RE = re.compile(r"^#{1,6}\s+(.+?)\s*$", re.MULTILINE)
LINK_FIELDS = ("related_objects", "related_evidence", "related_decisions", "evidence")


@dataclass(frozen=True)
class ArtifactDoc:
    path: Path
    meta: dict[str, Any]
    body: str
    scope: str  # "shared" or project name


def load_registry() -> list[dict[str, Any]]:
    return json.loads((ROOT / "config" / "artifacts.json").read_text(encoding="utf-8"))


def registry_by_type() -> dict[str, dict[str, Any]]:
    return {entry["type"]: entry for entry in load_registry()}


def parse_frontmatter(text: str) -> tuple[dict[str, Any] | None, str]:
    if not text.startswith("---\n"):
        return None, text
    try:
        header, body = text[4:].split("\n---\n", 1)
    except ValueError:
        return None, text
    data = yaml.safe_load(header) or {}
    if not isinstance(data, dict):
        return None, text
    return data, body


def should_skip(path: Path) -> bool:
    name = path.name.lower()
    if name in SKIP_NAMES:
        return True
    if name.startswith("_") and name.endswith("template.md"):
        return True
    if name.endswith(SKIP_SUFFIXES):
        return True
    if name == "graph.json":
        return True
    return False


def headings(body: str) -> set[str]:
    return {match.group(1).strip() for match in HEADING_RE.finditer(body)}


def has_required_headings(body: str, required: list[str]) -> list[str]:
    found = headings(body)
    missing: list[str] = []
    for heading in required:
        if heading in found:
            continue
        # Allow a more specific heading that starts with the required title.
        if any(existing == heading or existing.startswith(heading + " ") or existing.startswith(heading + " (") for existing in found):
            continue
        missing.append(heading)
    return missing


def iter_markdown_files(base: Path) -> list[Path]:
    if not base.exists():
        return []
    return sorted(path for path in base.rglob("*.md") if path.is_file() and not should_skip(path))


def collect_docs(project: str | None = None) -> list[ArtifactDoc]:
    docs: list[ArtifactDoc] = []
    shared = ROOT / "knowledge"
    for path in iter_markdown_files(shared):
        text = path.read_text(encoding="utf-8")
        meta, body = parse_frontmatter(text)
        if not meta or not meta.get("id"):
            continue
        docs.append(ArtifactDoc(path=path, meta=meta, body=body, scope="shared"))

    projects_root = ROOT / "projects"
    project_dirs = [projects_root / project] if project else sorted(p for p in projects_root.iterdir() if p.is_dir())
    for project_dir in project_dirs:
        if not project_dir.is_dir():
            continue
        name = project_dir.name
        for sub in ("knowledge", "work"):
            for path in iter_markdown_files(project_dir / sub):
                text = path.read_text(encoding="utf-8")
                meta, body = parse_frontmatter(text)
                if not meta or not meta.get("id"):
                    continue
                docs.append(ArtifactDoc(path=path, meta=meta, body=body, scope=name))
    return docs


def link_ids(meta: dict[str, Any]) -> list[tuple[str, str]]:
    links: list[tuple[str, str]] = []
    for field in LINK_FIELDS:
        value = meta.get(field)
        if value is None:
            continue
        if isinstance(value, str):
            links.append((field, value))
        elif isinstance(value, list):
            for item in value:
                if isinstance(item, str) and item:
                    links.append((field, item))
    return links


def today_iso() -> str:
    return date.today().isoformat()


def fill_template(text: str, *, artifact_id: str, artifact_type: str, owner: str, slug: str) -> str:
    meta, body = parse_frontmatter(text)
    if meta is None:
        raise ValueError("template missing YAML frontmatter")
    meta["id"] = artifact_id
    meta["type"] = artifact_type
    meta["owner"] = owner
    meta["date"] = today_iso()
    if "name" in meta and artifact_type == "object":
        meta["name"] = slug.replace("-", " ").title()
    dumped = yaml.safe_dump(meta, sort_keys=False, allow_unicode=True).strip()
    title = body.lstrip()
    if title.startswith("# "):
        first, _, rest = title.partition("\n")
        if artifact_type == "object":
            title = f"# {meta.get('name', slug)}\n{rest}"
        elif artifact_type == "glossary":
            title = title
        else:
            # Keep section structure; replace only a generic example H1 when present.
            if first.strip() in {"# Example", "# Decision", "# Evidence statement", "# Metric name", "# Event name", "# Experiment name", "# Direction", "# Run packet", "# Challenge", "# Flow", "# Research plan", "# Research synthesis", "# Threat and privacy model", "# Integration contract", "# Operational readiness", "# Runbook", "# Quality strategy", "# Defect", "# Language inventory", "# Interface direction", "# Slice report", "# Practice change", "# Product glossary"}:
                label = artifact_type.replace("-", " ").title()
                title = f"# {label}: {slug}\n{rest}" if rest else f"# {label}: {slug}\n"
    return f"---\n{dumped}\n---\n\n{title.lstrip()}"
