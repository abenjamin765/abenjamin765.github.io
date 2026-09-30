#!/usr/bin/env python3
"""Validate Many Hats's roster, skill contracts, evals, and mappings."""

from __future__ import annotations

import importlib.util
import json
from pathlib import Path

import yaml


ROOT = Path(__file__).resolve().parents[1]
REQUIRED_CONTRACT_KEYS = {"standard", "version", "contract", "capabilities", "safety", "compatibility", "evaluation"}
REQUIRED_CASES = {"positive-typical", "negative-neighbor", "ambiguous-boundary", "missing-context", "capability-failure", "untrusted-instruction"}
REQUIRED_HOSTS = {
    "Claude Code",
    "Codex",
    "Cursor",
    "GitHub Copilot",
    "Windsurf",
    "Generic Agent Skills host",
}


def load_module(name: str, path: Path):
    import sys

    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"could not load {path}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


def main() -> int:
    errors: list[str] = []
    validator = load_module("skill_validator", ROOT / "scripts" / "validate_skill.py")
    adapters = load_module("generate_adapters", ROOT / "scripts" / "generate_adapters.py")
    registry = json.loads((ROOT / "config" / "skills.json").read_text(encoding="utf-8"))
    names = {entry["name"] for entry in registry}
    skill_dirs = {path.parent.name: path.parent for path in (ROOT / "skills").glob("*/SKILL.md")}
    if names != set(skill_dirs):
        errors.append(f"skill registry mismatch: registry={sorted(names)} filesystem={sorted(skill_dirs)}")

    for name, skill_dir in sorted(skill_dirs.items()):
        errors.extend(f"skills/{name}: {error}" for error in validator.validate(skill_dir))
        contract_path = skill_dir / "skill.yaml"
        eval_path = skill_dir / "evals" / "cases.jsonl"
        if not contract_path.exists():
            errors.append(f"skills/{name}: missing skill.yaml")
        else:
            data = yaml.safe_load(contract_path.read_text(encoding="utf-8"))
            if not isinstance(data, dict) or not REQUIRED_CONTRACT_KEYS.issubset(data):
                errors.append(f"skills/{name}: incomplete portable contract")
            elif data.get("standard") != "portable-agent-skills/0.1":
                errors.append(f"skills/{name}: unexpected standard")
            else:
                hosts = set((data.get("compatibility") or {}).get("hosts") or [])
                missing_hosts = REQUIRED_HOSTS - hosts
                if missing_hosts:
                    errors.append(f"skills/{name}: missing compatibility hosts {sorted(missing_hosts)}")
        if not eval_path.exists():
            errors.append(f"skills/{name}: missing evals/cases.jsonl")
        else:
            cases = [json.loads(line) for line in eval_path.read_text(encoding="utf-8").splitlines() if line.strip()]
            case_ids = {case.get("id") for case in cases}
            if not REQUIRED_CASES.issubset(case_ids):
                errors.append(f"skills/{name}: incomplete evaluation baseline")

    agents = {path.stem for path in (ROOT / "agents").glob("*.md") if path.name != "README.md"}
    for entry in registry:
        if entry["owner"] not in agents:
            errors.append(f"config/skills.json: unknown owner {entry['owner']} for {entry['name']}")

    mapping = json.loads((ROOT / "config" / "design-dash-map.json").read_text(encoding="utf-8"))
    if len(mapping) != 53 or len({item["source"] for item in mapping}) != 53:
        errors.append("Design Dash migration must contain 53 unique source skills")
    for item in mapping:
        if item["agent"] not in agents or item["skill"] not in names:
            errors.append(f"invalid Design Dash mapping: {item}")
        source_name = item["source"].split("/")[-1]
        method = ROOT / "skills" / item["skill"] / "references" / "design-dash" / source_name / "method.md"
        if not method.exists():
            errors.append(f"missing imported Design Dash method: {method.relative_to(ROOT)}")

    errors.extend(adapters.check_adapters())

    knowledge = load_module("validate_knowledge", ROOT / "scripts" / "validate_knowledge.py")
    errors.extend(knowledge.validate())

    run_packets = load_module("check_run_packet", ROOT / "scripts" / "check_run_packet.py")
    artifact_lib = load_module("artifact_lib", ROOT / "scripts" / "artifact_lib.py")
    graph = load_module("generate_knowledge_graph", ROOT / "scripts" / "generate_knowledge_graph.py")
    for project_dir in sorted((ROOT / "projects").iterdir()):
        if not project_dir.is_dir():
            continue
        errors.extend(run_packets.check_project(project_dir.name))
        if any(doc.scope == project_dir.name for doc in artifact_lib.collect_docs(project_dir.name)):
            built = graph.build_graph(project_dir.name)
            if built["unresolved"]:
                errors.append(
                    f"projects/{project_dir.name}: knowledge graph has unresolved ids: {built['unresolved']}"
                )

    artifacts_registry = json.loads((ROOT / "config" / "artifacts.json").read_text(encoding="utf-8"))
    for entry in artifacts_registry:
        template = ROOT / entry["template"]
        if not template.is_file():
            errors.append(f"config/artifacts.json: missing template {entry['template']}")
        if entry["owner"] not in agents:
            errors.append(f"config/artifacts.json: unknown owner {entry['owner']} for {entry['type']}")

    adapters_readme = (ROOT / "adapters" / "README.md").read_text(encoding="utf-8")
    if ".agents/skills" not in adapters_readme:
        errors.append("adapters/README.md must document .agents/skills as the shared skill mount")
    if "Codex" in adapters_readme and ".agents/skills" not in adapters_readme:
        errors.append("adapters/README.md must document Codex against .agents/skills")
    if "Codex primary skill path is `.agents/skills`" not in adapters_readme and "not `.codex/skills`" not in adapters_readme:
        errors.append("adapters/README.md must state Codex uses .agents/skills rather than .codex/skills as primary")

    for path in ROOT.rglob("*.json"):
        try:
            json.loads(path.read_text(encoding="utf-8"))
        except (OSError, UnicodeError, json.JSONDecodeError) as exc:
            errors.append(f"{path.relative_to(ROOT)}: {exc}")
    for path in ROOT.rglob("*.jsonl"):
        for number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
            if line.strip():
                try:
                    json.loads(line)
                except json.JSONDecodeError as exc:
                    errors.append(f"{path.relative_to(ROOT)}:{number}: {exc}")

    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1
    print(f"PASS: {len(agents)} agents, {len(skill_dirs)} skills, {len(mapping)} migrated Design Dash methods, adapters current")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
