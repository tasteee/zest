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
- Correctness over effort: the size of a change never decides a design.
- Names promise only what they do (Rule 17). A prop named `label` renders
  visible text. Name-only values use `aria-label`. Never reuse `name`: on a
  control it is the form-submission key.
- One validity model (Rule 18): constraints plus one `custom-validity`
  slot. No `is-invalid` flag. The field shows the control's
  `validationMessage` and holds no error text.
- A control owns its own presentation facts, like `size` (Rule 19). The
  field reads them.
- Inherited state flows through a channel (Rule 20): disabled combines,
  presentation defaults yield to the child's own prop, group-owned state is
  read-only on the child.
- Misuse is reported, never guessed (Rule 21): `console.warn` in every
  build, through `reportMisuse` in `src/shared/misuse.ts`. The docs check
  fails on any warning.
- Size and shape are one vocabulary (Rule 22): `size` is xs | sm | md | lg,
  each from a `--control-height-*` token; `is-icon` is the square icon-only
  shape, named with `aria-label`. Dense regions override the tokens.
- A group that acts as one control is one tab stop (Rule 23): roving
  tabindex, arrows move and never press; inside a toolbar the toolbar owns it.
- Tints never rotate hue (Rule 24): mix against `transparent` in oklch, or
  against an opaque neutral in oklab.

## Checklist for every change

Answer these in the PR description for any new or changed public API
(the full list is in `docs/architecture.md` §8):

1. Which component owns this responsibility? Does one already own it?
2. Is it behavior, semantic composition, presentation, or orchestration?
3. Is there exactly one authoritative source of truth?
4. Does it work without touching any private implementation detail?
5. Does it keep accessibility and keyboard behavior correct, across layouts?
6. Does it compose with other Zest elements without duplicating them?
7. Can the public contract be kept as the system grows?

If the honest answer to any of these is "no", stop and redesign. An
extension is never accepted only because it is easy to build.

## Recording new rules

When a conversation, review, or PR settles a new rule, record it in the same
change:

1. Add it to `docs/architecture.md` as a numbered rule in the right section.
2. Log it in the rule log (`docs/architecture.md` §11).
3. Add a one-line short form to "The one rule that governs everything"
   above.
4. If it changes planned work, update `docs/v2-architecture-audit.md`.

A rule that exists only in chat, a PR thread, or the audit is not a rule
yet. Short forms here never replace the full rule in `architecture.md`.

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
