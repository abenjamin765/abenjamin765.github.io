#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
dry_run=false
check=false
selected=()

usage() {
  echo "Usage: ./install.sh [--claude] [--cursor] [--codex] [--copilot] [--windsurf] [--all] [--dry-run] [--check]"
  echo "  With no host flags, installs all supported host adapters."
}

for argument in "$@"; do
  case "$argument" in
    --claude|--cursor|--codex|--copilot|--windsurf) selected+=("${argument}") ;;
    --all) selected=(--claude --cursor --codex --copilot --windsurf) ;;
    --dry-run) dry_run=true ;;
    --check) check=true ;;
    --help|-h) usage; exit 0 ;;
    *) echo "Unknown option: $argument" >&2; usage >&2; exit 2 ;;
  esac
done

if [[ ${#selected[@]} -eq 0 ]]; then
  selected=(--claude --cursor --codex --copilot --windsurf)
fi

args=("${selected[@]}")
if $dry_run; then
  args+=(--dry-run)
fi
if $check; then
  args+=(--check)
fi

python3 "$repo_root/scripts/generate_adapters.py" "${args[@]}"
