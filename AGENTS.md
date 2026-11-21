# Agent instructions for Zest

These instructions apply to every agent and every change in this repository.

## Required reading before any change

Read [`docs/architecture.md`](./docs/architecture.md) before you change an
element, prop, slot, event, style hook, or behavior. It is the foundational
architecture document. Every other proposal, design note, and API note must
conform to it, including any slot proposal.

Then read [`docs/v2-architecture-audit.md`](./docs/v2-architecture-audit.md)
to see where today's code breaks those rules. Do not copy a pattern from old
code that the audit lists as a violation.

## The one rule that governs everything

**One source of truth per responsibility.** Every fact has one owner. Others
observe it, reference it, or present it. They never hold a second editable
copy.

- A field composes. A control operates. A group organizes. A form
  orchestrates. A layout primitive arranges.
- A parent never writes into a child's public props to impose its own state.
  Use an inherited channel the child combines with its own prop.
- No element reaches into another element's shadow root. Talk through the
  other element's public contract.
- Error text never decides validity. Validity comes from the control.
- Required, disabled, and read-only are declared on the control. A field or
  group reflects them; it does not set them.
- Visible field labels belong to `z-field`. Controls (except intrinsic option
  labels such as checkbox, radio, switch, chip) do not render their own.
- Never silently pick "the first child" when ownership is ambiguous. Report
  it with `console.warn` (the docs check fails on any warning).
- A prop named `label` must render visible text. If it only names the
  element for assistive tech, use `aria-label`. Never reuse `name` for this:
  on a control, `name` is the form-submission key.
- Validity has one source: the control's constraints plus its
  `custom-validity` slot. No `is-invalid` flag. The field shows the
  control's `validationMessage`; it holds no error text of its own.
- A control owns its own size. A field reads it. A group may set a default;
  the control's own prop wins.

## Checklist for every change

Answer these in the PR description for any new or changed public API
(the full list is in `docs/architecture.md` §7):

1. Which component owns this responsibility? Does one already own it?
2. Is it behavior, semantic composition, presentation, or orchestration?
3. Is there exactly one authoritative source of truth?
4. Does it work without touching any private implementation detail?
5. Does it keep accessibility and keyboard behavior correct, across layouts?
6. Does it compose with other Zest elements without duplicating them?
7. Can the public contract be kept as the system grows?

If the honest answer to any of these is "no", stop and redesign. An
extension is never accepted only because it is easy to build.

## Repository facts

- Elements live in `src/components/z-*.tsx` (Atomico). `src/elements/*.ts`
  are per-element entry points that register a component.
- Shared contracts live in `src/shared/`. Form participation is
  `form-control.ts`. Naming and description across shadow roots is
  `accessible.tsx`. Change these with care: every control depends on them.
- `api-notes.json` is the source for element descriptions in
  `custom-elements.json` and on the docs site. Keep it in step with the code.
- `scripts/held-back.mjs` lists elements that exist in source but are not
  public. The release gate fails if one leaks.
- Zest has no outside users yet. Change APIs directly to the correct
  design. Do not add deprecation shims or compatibility bridges.
- Build: `pnpm build`. Types: `pnpm typecheck`. Tests: `pnpm test`
  (`test:unit`, `test:browser`).
