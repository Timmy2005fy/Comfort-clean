---
trigger: always_on
---

# Workflow: Continuous Code Cleanup and Dead Code Removal

You must continuously inspect, audit, and clean the codebase throughout every development task. Code cleanup is a permanent responsibility, not an optional step.

## 1. Detect Unnecessary Code

Always scan for:

- Unused variables, constants, imports, functions, classes, hooks, and parameters.
- Dead code, unreachable statements, and obsolete code paths.
- Duplicate functions, repeated logic, and redundant conditions.
- Unused components, files, styles, CSS classes, assets, and dependencies.
- Variables or functions that are declared but never meaningfully used.
- Event listeners, subscriptions, timers, and effects that are no longer needed or properly cleaned up.
- Broken, incomplete, or abandoned implementations.
- Redundant state, unnecessary re-renders, and avoidable computations.
- Debug logs, temporary code, placeholder implementations, and leftover development artifacts.
- Outdated comments and documentation that no longer match the implementation.

## 2. Remove What Is Truly Unnecessary

When you identify code that is confirmed to be unused, redundant, obsolete, or broken and no longer required, remove it.

Do not leave unnecessary code behind simply because it already exists.

Before deleting anything, trace its references and dependencies across the entire project. Account for dynamically imported modules, reflection, framework conventions, public APIs, configuration-driven references, and other indirect usages.

Never assume something is unused just because it has no obvious direct references.

## 3. Preserve Existing Functionality

Code cleanup must never become an excuse to redesign, refactor, or alter unrelated parts of the application.

- Preserve the current UI, layout, styling, animations, and responsive behavior.
- Preserve all working features, business logic, APIs, integrations, routes, and data flows.
- Do not change existing behavior unless a specific defect requires correction.
- Do not remove code that appears redundant but is necessary for compatibility, fallbacks, error handling, or edge cases.
- Do not replace working implementations with new ones just to make the code look cleaner.
- Avoid unnecessary architectural changes and large-scale refactoring.

Your primary objective is to eliminate unnecessary code while keeping the application functionally and visually unchanged.

## 4. Fix Broken and Ineffective Code

When you find code that does not work as intended:

1. Identify the actual cause.
2. Determine whether the code is unnecessary, incorrectly implemented, or dependent on another broken part.
3. Remove it if it is obsolete and unnecessary.
4. Repair it if it is required for an existing feature.
5. Preserve intended behavior and avoid introducing unrelated changes.

Do not blindly delete code simply because it currently fails. Determine its purpose first.

## 5. Verify Every Cleanup

After making changes:

- Run the available linter and static analysis tools.
- Run type checks and relevant automated tests.
- Build the application to detect compilation and dependency errors.
- Check imports and references to confirm that removed code is not still required.
- Verify affected features and important user flows.
- Check for new runtime errors or regressions where practical.

If a check fails, investigate whether your changes caused the failure and fix any regressions before declaring the cleanup complete.

If a verification tool is unavailable, state that limitation instead of claiming the check passed.

## 6. Keep Dependencies and Configuration Safe

Do not remove packages, environment variables, configuration entries, scripts, database fields, API contracts, or migrations solely because they appear unused in the application source.

Verify their usage across the complete project, deployment environment, build system, and external integrations before changing them. Never delete production data or perform destructive database changes as part of routine cleanup.

## 7. Make Cleanup Continuous

Apply this workflow:

- Before implementing a feature, inspect the relevant code for existing dead code and duplication.
- During implementation, avoid introducing unused variables, unnecessary abstractions, redundant state, or temporary artifacts.
- After implementation, scan the changed code and its dependencies.
- Before completing the task, perform a cleanup and regression check.
- When working on an existing feature, clean up obsolete code made unnecessary by the changes.

Do not wait for me to explicitly request code cleanup.

## 8. Report the Results

At the end of each task, provide a concise summary containing:

- What unnecessary or broken code was found.
- What was removed, repaired, or retained and why.
- Any relevant files or modules affected.
- Which lint, type-check, test, and build commands were run and their actual results.
- Any remaining issues or cleanup that could not be safely completed.

Do not claim to have inspected the entire codebase if you only inspected selected files.

**Final rule:** Keep the codebase lean, understandable, maintainable, and functional. Remove confirmed dead code, fix broken required code, preserve working behavior, and verify every meaningful change. Make the smallest safe change that achieves the goal.
