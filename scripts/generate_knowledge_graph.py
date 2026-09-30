#!/usr/bin/env python3
"""Build a disposable knowledge graph from artifact frontmatter links."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from artifact_lib import collect_docs, link_ids  # noqa: E402


def build_graph(project: str) -> dict:
    docs = [doc for doc in collect_docs(project) if doc.scope in {"shared", project}]
    nodes = []
    edges = []
    ids = set()
    for doc in docs:
        artifact_id = doc.meta.get("id")
        if not isinstance(artifact_id, str):
            continue
        ids.add(artifact_id)
        nodes.append(
            {
                "id": artifact_id,
                "type": doc.meta.get("type"),
                "owner": doc.meta.get("owner"),
                "status": doc.meta.get("status"),
                "path": str(doc.path.relative_to(ROOT)),
                "scope": doc.scope,
            }
        )
        for field, target in link_ids(doc.meta):
            edges.append({"from": artifact_id, "to": target, "field": field})

    return {
        "project": project,
        "generated": True,
        "authoritative": False,
        "nodes": nodes,
        "edges": edges,
        "unresolved": sorted({edge["to"] for edge in edges if edge["to"] not in ids}),
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--project", required=True, help="Project name under projects/")
    parser.add_argument(
        "--check",
        action="store_true",
        help="Build in memory and report; do not write graph.json",
    )
    parser.add_argument(
        "--write",
        action="store_true",
        help="Write projects/<project>/knowledge/graph.json",
    )
    args = parser.parse_args()

    project_dir = ROOT / "projects" / args.project
    if not project_dir.is_dir():
        print(f"ERROR: project not found: {project_dir}", file=sys.stderr)
        return 1

    graph = build_graph(args.project)
    if args.write and not args.check:
        out = project_dir / "knowledge" / "graph.json"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(json.dumps(graph, indent=2, sort_keys=True) + "\n", encoding="utf-8")
        print(f"wrote {out.relative_to(ROOT)} ({len(graph['nodes'])} nodes, {len(graph['edges'])} edges)")
    else:
        print(
            f"PASS: graph {args.project} ({len(graph['nodes'])} nodes, "
            f"{len(graph['edges'])} edges, {len(graph['unresolved'])} unresolved)"
        )
        if graph["unresolved"]:
            print("unresolved:", ", ".join(graph["unresolved"]))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
