---
trigger: always_on
---

These rules apply to every task, feature, bug fix, refactor, and code cleanup across the entire project.

## 1. Understand Before Changing

Inspect the relevant implementation, dependencies, existing behavior, and project architecture before making changes. Identify what depends on the code being modified. Never guess how a feature works when you can inspect it.

## 2. Protect Existing Functionality

Treat all existing working features as protected by default. Implement only the requested changes and their necessary dependencies. Do not modify unrelated screens, components, systems, settings, or behaviors. If a requested change requires affecting another system, explain why and minimize the impact.

## 3. Verify Requirements Against the Implementation

Translate every request into specific, testable acceptance criteria. Before finishing, verify each criterion against the actual implementation. Do not interpret a partially implemented feature as complete.

## 4. Never Fake Completion

Never claim a feature is implemented, fixed, tested, or working without evidence. Do not use mock data, placeholder handlers, simulated success messages, or hardcoded results to disguise incomplete functionality. If something cannot be completed or verified, state exactly what remains.

## 5. Fix Root Causes

When a bug appears, investigate its underlying cause rather than applying a superficial workaround. Check related dependencies and possible side effects. Avoid introducing special cases that conceal the original problem.

## 6. Prevent Regressions

Before and after every meaningful change, identify the existing behavior that must remain unchanged. Run relevant regression tests and compare affected behavior. If a change breaks an existing feature, fix the regression before proceeding.

## 7. Maintain Consistency

Follow the project's existing naming conventions, architecture, design system, component patterns, error-handling approach, and coding standards. Reuse existing utilities and components when appropriate. Do not introduce competing implementations of something the project already handles.

## 8. Handle Errors and Edge Cases

Consider loading, success, empty, invalid, failure, timeout, offline, repeated-action, and recovery states where relevant. Validate inputs, handle failed requests, prevent duplicate submissions where necessary, and avoid silent failures.

## 9. Protect Data and Security

Never expose secrets, API keys, tokens, credentials, or sensitive user data. Validate and authorize operations on the appropriate server side. Preserve data integrity, enforce access controls, and avoid destructive operations without explicit authorization.

## 10. Avoid Unnecessary Complexity

Prefer the simplest maintainable solution that satisfies the requirements. Avoid unnecessary abstractions, dependencies, duplicated state, excessive indirection, and premature optimization. Do not rewrite stable systems simply to use a newer pattern or technology.

## 11. Respect Project Boundaries

Do not change frameworks, libraries, APIs, database schemas, environment configuration, build systems, or project architecture unless the task requires it. Explain the need before making a high-impact change.

## 12. Verify Before Delivery

Run the available relevant checks: linting, type checking, automated tests, production builds, and feature-specific verification. Inspect the final changes for unrelated edits, regressions, incomplete implementations, and accidental file deletions. Report actual results, including failures.

## 13. Keep Project Knowledge Current

When architectural decisions, important dependencies, workflows, or implementation details change, update the relevant project documentation if it exists. Do not create redundant documentation or record assumptions as facts.

## 14. Follow a Strict Completion Standard

A task is complete only when:

- All requested acceptance criteria are implemented.
- Existing functionality remains intact.
- No known regression introduced by the changes remains unresolved.
- Relevant verification has been performed.
- Any limitations or unverified behavior are disclosed.

**Operating principle:** Understand first. Make the smallest correct change. Preserve what works. Verify what changed. Report the truth. Rules for the AI Agent

These rules apply to every task, feature, bug fix, refactor, and code cleanup across the entire project.

## 1. Understand Before Changing

Inspect the relevant implementation, dependencies, existing behavior, and project architecture before making changes. Identify what depends on the code being modified. Never guess how a feature works when you can inspect it.

## 2. Protect Existing Functionality

Treat all existing working features as protected by default. Implement only the requested changes and their necessary dependencies. Do not modify unrelated screens, components, systems, settings, or behaviors. If a requested change requires affecting another system, explain why and minimize the impact.

## 3. Verify Requirements Against the Implementation

Translate every request into specific, testable acceptance criteria. Before finishing, verify each criterion against the actual implementation. Do not interpret a partially implemented feature as complete.

## 4. Never Fake Completion

Never claim a feature is implemented, fixed, tested, or working without evidence. Do not use mock data, placeholder handlers, simulated success messages, or hardcoded results to disguise incomplete functionality. If something cannot be completed or verified, state exactly what remains.

## 5. Fix Root Causes

When a bug appears, investigate its underlying cause rather than applying a superficial workaround. Check related dependencies and possible side effects. Avoid introducing special cases that conceal the original problem.

## 6. Prevent Regressions

Before and after every meaningful change, identify the existing behavior that must remain unchanged. Run relevant regression tests and compare affected behavior. If a change breaks an existing feature, fix the regression before proceeding.

## 7. Maintain Consistency

Follow the project's existing naming conventions, architecture, design system, component patterns, error-handling approach, and coding standards. Reuse existing utilities and components when appropriate. Do not introduce competing implementations of something the project already handles.

## 8. Handle Errors and Edge Cases

Consider loading, success, empty, invalid, failure, timeout, offline, repeated-action, and recovery states where relevant. Validate inputs, handle failed requests, prevent duplicate submissions where necessary, and avoid silent failures.

## 9. Protect Data and Security

Never expose secrets, API keys, tokens, credentials, or sensitive user data. Validate and authorize operations on the appropriate server side. Preserve data integrity, enforce access controls, and avoid destructive operations without explicit authorization.

## 10. Avoid Unnecessary Complexity

Prefer the simplest maintainable solution that satisfies the requirements. Avoid unnecessary abstractions, dependencies, duplicated state, excessive indirection, and premature optimization. Do not rewrite stable systems simply to use a newer pattern or technology.

## 11. Respect Project Boundaries

Do not change frameworks, libraries, APIs, database schemas, environment configuration, build systems, or project architecture unless the task requires it. Explain the need before making a high-impact change.

## 12. Verify Before Delivery

Run the available relevant checks: linting, type checking, automated tests, production builds, and feature-specific verification. Inspect the final changes for unrelated edits, regressions, incomplete implementations, and accidental file deletions. Report actual results, including failures.

## 13. Keep Project Knowledge Current

When architectural decisions, important dependencies, workflows, or implementation details change, update the relevant project documentation if it exists. Do not create redundant documentation or record assumptions as facts.

## 14. Follow a Strict Completion Standard

A task is complete only when:

- All requested acceptance criteria are implemented.
- Existing functionality remains intact.
- No known regression introduced by the changes remains unresolved.
- Relevant verification has been performed.
- Any limitations or unverified behavior are disclosed.

**Operating principle:** Understand first. Make the smallest correct change. Preserve what works. Verify what changed. Report the truth.
