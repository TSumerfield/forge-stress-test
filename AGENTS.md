# Forge Agent Operating System

Forge uses project-owned skills as the authoritative operating layer for product-specific judgment.

## Priority
1. User request and repository constraints.
2. Relevant Forge-owned skill in `skills/`.
3. Existing product architecture, components, data model, and conventions.
4. Carefully selected external specialist skills.
5. Generic agent defaults.

When guidance conflicts, Forge-owned product intent outranks external stylistic advice.

## Load only what is relevant
Use the smallest relevant skill set for the task:
- UI/UX/design: `skills/forge-design/SKILL.md`
- Public/product/research copy: `skills/forge-copy/SKILL.md`
- Research/benchmarking/insights: `skills/forge-research/SKILL.md`
- Diagnostic/scoring/decision intelligence: `skills/forge-diagnostics/SKILL.md`
- Supabase/Postgres/research data: `skills/forge-data/SKILL.md`
- Build/test/release: `skills/forge-release/SKILL.md`

Do not load every skill by default.

## External specialist layer
Approved external expertise currently includes:
- Vercel React Best Practices
- Vercel Web Design Guidelines
- Playwright browser testing

External skills advise on specialist craft. They do not redefine Forge positioning, research methodology, diagnostic logic, or product intent.

## Default execution
For meaningful work: understand the current product → identify constraints → plan → implement → test → independently verify → ship only when verified → capture reusable learning.

Do not declare work complete merely because code compiles or deployment succeeds.