---
name: forge-release
description: Forge build, verification, and release operating system. Use before shipping code, merging changes, deployments, or declaring work complete.
---

# Forge Release OS

## Loop
PLAN → BUILD → TEST → VERIFY → SHIP → OBSERVE → CAPTURE

## Definition of done
Compilation is not verification. A task is complete only when the intended user workflow works in a realistic environment and relevant regressions have been checked.

## Before build
State intended behaviour, affected workflow, likely files/systems, risk level, and verification plan. Keep scope tight.

## Test
Use automated tests where valuable and browser-level testing for user-facing workflows. Test realistic data, mobile widths, loading, empty/error states, validation, navigation, and persistence where relevant.

## Verify
Independently inspect the result after implementation. For high-risk work, separate builder and reviewer roles. Check console/server errors, data writes, permissions, accessibility basics, and whether the change actually solved the original problem.

## Ship
Prefer small reversible releases. Do not bundle unrelated refactors. Protect production data. If a change needs migration or configuration, verify those steps explicitly.

## Observe
After deployment check the live workflow, logs/telemetry available to the project, and any relevant submission/analytics behaviour. A successful deploy status alone is insufficient.

## Capture
Record meaningful architecture decisions, reusable components, discovered failure modes, and new tests. Agents earn greater autonomy through demonstrated reliability.