#!/usr/bin/env python3
"""Assert run-packet expected_artifacts exist with required headings."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from artifact_lib import collect_docs, has_required_headings, registry_by_type  # noqa: E402


def check_project(project: str) -> list[str]:
    errors: list[str] = []
    registry = registry_by_type()
    docs = [doc for doc in collect_docs(project) if doc.scope == project]
    packets = [doc for doc in docs if doc.meta.get("type") == "run-packet"]
    if not packets:
        return errors

    by_type: dict[str, list] = {}
    for doc in docs:
        artifact_type = doc.meta.get("type")
        if isinstance(artifact_type, str):
            by_type.setdefault(artifact_type, []).append(doc)

    for packet in packets:
        expected = packet.meta.get("expected_artifacts") or []
        if not isinstance(expected, list):
            errors.append(f"{packet.path.relative_to(ROOT)}: expected_artifacts must be a list")
            continue
        for artifact_type in expected:
            if not isinstance(artifact_type, str):
                errors.append(f"{packet.path.relative_to(ROOT)}: invalid expected artifact {artifact_type!r}")
                continue
            if artifact_type not in registry:
                errors.append(f"{packet.path.relative_to(ROOT)}: unknown expected type {artifact_type!r}")
                continue
            matches = by_type.get(artifact_type, [])
            if not matches:
                errors.append(
                    f"{packet.path.relative_to(ROOT)}: missing expected artifact type {artifact_type!r}"
                )
                continue
            entry = registry[artifact_type]
            for doc in matches:
                missing = has_required_headings(doc.body, entry.get("required_headings", []))
                for heading in missing:
                    errors.append(
                        f"{doc.path.relative_to(ROOT)}: expected by run packet but missing heading {heading!r}"
                    )
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--project", default=None, help="Limit to one project; default checks all with packets")
    args = parser.parse_args()

    projects = [args.project] if args.project else sorted(
        p.name for p in (ROOT / "projects").iterdir() if p.is_dir()
    )
    errors: list[str] = []
    checked = 0
    for project in projects:
        project_errors = check_project(project)
        docs = collect_docs(project)
        if any(doc.meta.get("type") == "run-packet" and doc.scope == project for doc in docs):
            checked += 1
        errors.extend(project_errors)

    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1
    print(f"PASS: run packets ({checked} project(s) with packets)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
