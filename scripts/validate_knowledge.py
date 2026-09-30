#!/usr/bin/env python3
"""Validate project and shared knowledge/work artifacts against the catalog."""

from __future__ import annotations

import argparse
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from artifact_lib import (  # noqa: E402
    collect_docs,
    has_required_headings,
    link_ids,
    registry_by_type,
)


def validate(project: str | None = None) -> list[str]:
    errors: list[str] = []
    registry = registry_by_type()
    docs = collect_docs(project)

    # Empty projects (no id-bearing files) must pass.
    if not docs:
        return errors

    by_scope: dict[str, list] = defaultdict(list)
    for doc in docs:
        by_scope[doc.scope].append(doc)

    # Shared IDs are visible to every project; project IDs must be unique within that project + shared.
    shared_ids = {doc.meta["id"]: doc for doc in by_scope.get("shared", [])}

    for scope, scoped_docs in sorted(by_scope.items()):
        seen: dict[str, Path] = {artifact_id: doc.path for artifact_id, doc in shared_ids.items()} if scope != "shared" else {}
        if scope == "shared":
            seen = {}

        id_index: dict[str, Path] = dict(shared_ids) if scope != "shared" else {}
        for doc in scoped_docs:
            artifact_id = doc.meta.get("id")
            if not isinstance(artifact_id, str) or not artifact_id:
                errors.append(f"{doc.path.relative_to(ROOT)}: missing id")
                continue
            if artifact_id in seen and seen[artifact_id] != doc.path:
                errors.append(
                    f"{doc.path.relative_to(ROOT)}: duplicate id {artifact_id!r} "
                    f"(also {seen[artifact_id].relative_to(ROOT)})"
                )
            seen[artifact_id] = doc.path
            id_index[artifact_id] = doc.path

            artifact_type = doc.meta.get("type")
            if not isinstance(artifact_type, str) or artifact_type not in registry:
                errors.append(f"{doc.path.relative_to(ROOT)}: unknown or missing type {artifact_type!r}")
                continue
            entry = registry[artifact_type]
            for field in entry.get("required_frontmatter", []):
                if field not in doc.meta or doc.meta[field] in (None, ""):
                    errors.append(f"{doc.path.relative_to(ROOT)}: missing frontmatter field {field}")
            missing = has_required_headings(doc.body, entry.get("required_headings", []))
            for heading in missing:
                errors.append(f"{doc.path.relative_to(ROOT)}: missing required heading {heading!r}")

        for doc in scoped_docs:
            for field, target in link_ids(doc.meta):
                if target not in id_index:
                    errors.append(
                        f"{doc.path.relative_to(ROOT)}: {field} references unknown id {target!r}"
                    )
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--project", default=None, help="Limit validation to one project (plus shared knowledge)")
    args = parser.parse_args()
    errors = validate(args.project)
    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1
    print("PASS: knowledge and work artifacts")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
