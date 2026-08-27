---
name: forge-data
description: Forge Supabase/Postgres and research-data rules. Use for schema changes, migrations, RLS, analytics, submissions, admin data, benchmarks, and data-model decisions.
---

# Forge Data OS

## Principle
Treat the dataset as a long-term research asset. Data integrity, provenance, privacy, and future comparability outrank short-term implementation convenience.

## Before changing data structures
Inspect the current schema, migrations, queries, RLS policies, application usage, and existing records. Identify backward-compatibility and migration risks before implementation.

## Schema
Model stable research concepts explicitly. Prefer clear normalized entities for durable concepts and flexible metadata only where variation is genuine. Use stable identifiers, timestamps, version fields where methodology may change, and constraints that prevent invalid states.

## Security
Use least privilege. RLS should default closed, then explicitly allow required operations. Never expose service-role secrets client-side. Validate authorization server-side for privileged operations. Treat admin routes and exports as sensitive.

## Research integrity
Preserve raw submissions when feasible and derive normalized/analytical fields separately. Record methodology/scoring versions so historical results remain interpretable. Never silently rewrite historical research data to fit a new model.

## Changes
Prefer migrations over manual production edits. Make destructive changes reversible or backed up. Test migrations against realistic existing data. Review indexes and query cost when adding analytics or benchmark workloads.

## Privacy
Collect the minimum identifying data required. Separate identity from research responses when possible. Public reporting should default to anonymised/aggregated data.

## Verification
After a change test: anonymous user, normal submission, duplicate/invalid submission, authenticated/admin access where applicable, forbidden access, existing historical records, analytics query, and rollback/recovery path.