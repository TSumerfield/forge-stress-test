#!/usr/bin/env bash
set -euo pipefail

# Forge external specialist skills.
# Review upstream changes before updating these dependencies.

npx skills add https://github.com/vercel-labs/agent-skills --skill react-best-practices
npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines
npx skills add https://github.com/openai/skills --skill playwright

echo "Forge external agent skills installed. Project-owned skills in ./skills remain authoritative for Forge-specific judgment."
