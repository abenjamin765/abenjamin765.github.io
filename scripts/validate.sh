#!/usr/bin/env bash
set -euo pipefail
repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
python3 "$repo_root/scripts/validate_repo.py"
bash -n "$repo_root/install.sh"
python3 -m py_compile "$repo_root/scripts/"*.py
"$repo_root/install.sh" --all --dry-run >/dev/null
echo "PASS: scripts and installer"
