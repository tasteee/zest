# Production-readiness plan

A response to the September 2026 audit. The audit's verdict: Zest has a
credible visual identity, but its contracts (form participation, accessible
relationships, keyboard completeness, public types) are not dependable, and
there is no evidence they hold. This plan turns that into ordered work with
exit criteria that can be checked, not felt.

**Where this stands at the start (verified against the checkout, 2026-09-16):**

- 171 component files, 184 tags. 58 authored doc pages — all marked `stable`.
- 276 tests pass; 229 are registration/mount checks. 34.75% statements, 26.62%
  branches. `vitest.config.ts` thresholds are set *below* current coverage.
- One workflow (`deploy-docs.yml`). It builds; it does not run `npm test` or
  `npm run typecheck`. Nothing gates a push to `main`.
- Zero uses of `ElementInternals` in `src/`. Atomico 2.x supports
  `formAssociated` + `useInternals()`, so this is per-component work.
- Focus treatment is split: 16 files on `--focus-ring`, 34 on the older `--ring`.
- Directionality: 58 files use physical `left`/`right` properties, 13 use
  logical ones. No locale/string mechanism. No `forced-colors` handling.
- No CHANGELOG, no browser-support statement, no deprecation policy.

## Principles for this plan

- **Freeze the catalog.** No new elements land until Phase 4 is done.
  `ROADMAP.md` unchecked boxes stay unchecked. Fixes to existing elements
  outside the core set are allowed only when they're needed by a core flow.
- **Tests land with the fix, not after.** Every phase-1/2 item is a behavior
  test plus a change, in the same commit. Coverage rises as a side effect;
  it is not a goal in itself.
- **Status is earned, not declared.** A component is `stable` when the
  evidence checklist in Phase 4 is green. Until then it is `beta`. Yes, that
  means downgrading 50-odd pages in Phase 0. That's the point.
- **Core first, catalog second.** Everything below applies to the core set;
  the remaining ~150 elements get the same treatment later or stay `beta`.

## The core set (20)

Chosen because a validated form, a searchable table, and a settings screen
can be built from them and nothing else.

| Group | Elements |
|---|---|
| Form controls | `z-input`, `z-textarea`, `z-number-input`, `z-checkbox`, `z-radio` + `z-radio-group`, `z-switch`, `z-select`, `z-combobox` |
| Form structure | `z-field`, `z-button`, `z-button-group` |
| Overlays | `z-dialog`, `z-popover`, `z-tooltip`, `z-menu` |
| Navigation & data | `z-tabs`, `z-table`, `z-table-toolbar` |
| Feedback | `z-toast`, `z-alert` |

`z-input-otp`, `z-slider`, `z-range`, `z-color-picker` and `z-filter` are
form-shaped but *not* core; they get form participation in Phase 5.

---

## Phase 0 — Stop the bleeding (≈1 week)

Nothing here fixes a component. It makes the following phases checkable.

1. **CI gate.** Add `.github/workflows/ci.yml` on `push` + `pull_request`:
   `npm ci`, `npm run typecheck`, `npm test`, `npm run build` (which already
   runs `check-css-templates` and `check-release-surface`). Make
   `deploy-docs.yml` `needs:` the CI job, or move the docs build into the
   same workflow behind it.
2. **Browser test harness.** Add Vitest browser mode
   (`@vitest/browser` + `@vitest/browser-playwright`, Chromium first) as a
   second project in `vitest.config.ts`. Keep happy-dom for the existing
   suite. New behavior tests go in `src/_tests/browser/`. Verify one real
   test passes in CI before writing more: `<z-input>` inside a `<form>`
   *fails* to contribute a `FormData` entry. That red test is Phase 1's
   starting line.
3. **Accessibility harness.** `@axe-core/playwright` (or `vitest-axe`)
   wired into the browser project with a helper `expectNoA11yViolations(el)`.
4. **Screenshot harness.** Playwright test project (`e2e/`) that renders a
   fixture page per component at 4 themes × the states in Phase 3's matrix
   and compares against committed baselines. Start with `z-button` only so
   the pipeline is proven before it's expensive.
5. **Honest status.** Add `beta` and `experimental` to `ComponentStatus` in
   `site/src/component-docs/types.ts` (verify what exists). Flip every
   `ComponentStatus.stable` to `beta`. Extend the type with an evidence
   record the docs render:
   ```ts
   evidence: {
     formAssociated?: boolean   // n/a for non-controls
     keyboard: 'verified' | 'partial' | 'none'
     screenReader: 'verified' | 'partial' | 'none'
     browserTests: boolean
     screenshots: boolean
   }
   ```
   `check-release-surface.mjs` gains a rule: `stable` requires every
   evidence flag green.
6. **README truth pass.** Remove the `disabled` example (the convention is
   `is-disabled`), fix the "lavender haze" description, fix the
   `docs/foundation/tokens.md` link target, and replace the blanket "absent
   is false" sentence with the real rule (some booleans default true; list
   them, generated from the CEM).
7. **Policy stubs.** `CHANGELOG.md` (Keep a Changelog format, start at
   0.8.0), a `SUPPORT.md` stating the browser matrix (last 2 of
   Chrome/Edge/Firefox/Safari — confirm against what `ElementInternals`,
   `color-mix(in oklch)` and `:has()` require) and the deprecation rule
   (deprecated attributes keep working one minor, warn once in dev).

**Exit:** CI blocks a red test. One browser test, one axe test, one
screenshot test exist and run. No page says `stable`. README has no
contradictions with `src/`.

## Phase 1 — Form participation (≈2–3 weeks)

Goal: a `<form>` containing Zest controls submits, validates, resets and
disables exactly as if they were native.

1. **Shared hook.** `src/shared/form-control.ts` exporting
   `useFormControl({ value, name, disabled, required, validity })` built on
   Atomico's `useInternals()`. Responsibilities:
   - `formAssociated: true` on the element (via `c(fn, { formAssociated: true })`).
   - `internals.setFormValue()` on every value change; `name` comes from the
     host attribute, not the inner `<input>`.
   - `internals.setValidity()` mirroring the inner control's `validity` +
     `validationMessage`, with `setCustomValidity()` exposed on the host.
   - `formResetCallback` → restore default value. `formDisabledCallback` →
     mirror onto inner control. `formStateRestoreCallback` for bfcache/autofill.
   - Expose the native surface on the host: `form`, `validity`,
     `validationMessage`, `willValidate`, `checkValidity()`,
     `reportValidity()`, `labels`.
   - Emit `invalid` on the host when native validation fails, so `z-field`
     can react.
2. **Apply to the core controls**, one per commit, each with a browser test
   file covering: FormData entry · `required` blocks submit · `reset()`
   restores · `<fieldset disabled>` propagates · `reportValidity()` focuses
   the control · `form` property resolves. Order:
   `z-input` → `z-textarea` → `z-checkbox` → `z-switch` → `z-radio`/`z-radio-group`
   (group owns the value; radios don't each register) → `z-number-input`
   (numeric validity: min/max/step) → `z-select` → `z-combobox`.
3. **Delete the duplicate contract.** The inner `<input name>` in
   `z-input.tsx:171` (and equivalents) goes away — the host is the form
   participant now. Anything that relied on querying the shadow input for
   `name` breaks loudly in tests; fix those.
4. **`z-button type="submit"|"reset"`.** A button in a shadow root can't
   submit its ancestor form natively. Use `internals.form.requestSubmit()`
   / `form.reset()` on click. Test it.
5. **Frameworks.** Add `examples/react`, `examples/vue`, `examples/svelte`
   (Vite, one page each) that mount the validated-form flow, bind a rich
   property (an array of options), listen to a custom event, and — for React
   — render via SSR (`renderToString` with the element as unknown tag) and
   hydrate. These are built in CI (`npm run build` inside each), not just
   present.

**Exit:** the Phase 0 red test is green for all 8 controls. A plain
`<form onsubmit>` with only Zest controls produces the right `FormData`, and
`form.checkValidity()` returns false when a required Zest input is empty.
Three framework examples build in CI.

## Phase 2 — Accessible relationships and keyboard completeness (≈2 weeks)

1. **`z-field` ↔ control description wiring.** `aria-describedby` cannot
   cross shadow roots by id. Two-tier fix:
   - **Now:** `z-field` forwards `description` and `error` text onto the
     slotted control as properties (the way it already forwards `label`
     and `isRequired` in `z-field.tsx:88`); each core control renders them
     into visually-hidden nodes inside its own shadow root and sets
     `aria-describedby` internally. Also forward `aria-invalid` when
     `showError` is true.
   - **When supported:** use `ariaDescribedByElements` (ARIA element
     reflection) on the inner control pointing at `z-field`'s nodes, feature
     detected, falling back to the above. Test both paths.
2. **Labeling.** Decide the single rule: a control's accessible name comes
   from (a) `aria-labelledby` on the host if present, (b) `aria-label` on
   the host, (c) `label` property, (d) `z-field`'s label. Implement it
   through one shared helper, delete per-component variations, test each
   branch with a screen-reader-name assertion (`getByRole('textbox', { name })`).
3. **Keyboard audit of the core set.** For each element, write the
   expected key map in its doc page (`keyboard:` block in `ComponentDocT`),
   then a browser test that exercises every row. Known gaps to close:
   - `z-table` clickable rows: `tabindex=0`, `role="button"` or
     `aria-selected` pattern, Enter/Space fire `rowclick`
     (`z-table.tsx:129`).
   - `z-tabs`: Home/End, and Left/Right must flip in RTL (`dir` check on
     `closest('[dir]')` or `getComputedStyle().direction`).
   - `z-menu` / `z-combobox` / `z-select`: typeahead, Escape restores focus
     to the invoker, Tab closes.
   - `z-dialog`: focus trap, initial focus target, focus return on close,
     `Escape` respects `is-dismissable` (or whatever the attribute is).
4. **Axe in every core test file.** `expectNoA11yViolations` after mount and
   after each state change in the tests above.
5. **Focus ring unification.** Move the 34 `--ring` users to `--focus-ring`
   via `interaction-styles.ts`; add a `check-css-templates.mjs` rule that
   fails on `var(--ring)` outside the tokens file.
6. **Forced colors + reduced motion.** One `@media (forced-colors: active)`
   block per core element (borders become `CanvasText`, focus becomes
   `outline`), one `prefers-reduced-motion` guard in `transition.ts` that
   all animations go through. Screenshot both.

**Exit:** every core element has a keyboard test that covers its documented
key map, an axe pass in every state, and `--ring` no longer appears in
`src/components/`. `evidence.keyboard` and `evidence.screenReader` can be
set to `'verified'` for the core set — the screen-reader row still requires
one manual NVDA + VoiceOver pass per element, recorded in the doc page.

## Phase 3 — Regression protection at scale (≈1–2 weeks)

1. **State × theme screenshot matrix** for the core set. States: default,
   hover, focus-visible, active, disabled, error, loading, long label,
   narrow container (320px), RTL, forced-colors. Themes: all four. That is
   ~20 × 11 × 4 ≈ 880 images; Playwright handles this in a few minutes.
   Baselines committed under `e2e/__screenshots__/`, updated only via an
   explicit `npm run test:screens -- --update` that CI rejects if the diff
   isn't in the PR.
2. **Docs examples become tests.** `site/src/verify-docs.ts` already renders
   every page and example in a DOM. Run it in CI (browser project), and
   extend `ExampleT` with an optional `assert(root)` callback so examples
   that claim behavior ("clicking submit shows an error") prove it.
3. **Contract tests.** A test that loads `custom-elements.json` and the
   built `dist/components/*.d.ts` and asserts every documented attribute
   appears in both, with matching enum members. `check-release-surface.mjs`
   does part of this at build time; the test makes it fail in CI with a
   readable diff.
4. **Coverage thresholds** raised to whatever the core set actually hits
   after Phases 1–2 (expect ~60% statements on core files), scoped to the
   core files via a second `coverage.include` project so the long tail
   doesn't mask regressions.

**Exit:** a change to a core element's CSS or keyboard handling cannot merge
without either a screenshot diff or a failing behavior test in the PR.

## Phase 4 — Public contracts and honest docs (≈1–2 weeks)

1. **Tighten the emitted types.** Atomico's `Props<typeof props>` widens
   `{ type: String, value: 'sm' }` to `StringConstructor` in
   `dist/components/*.d.ts`. Options, in order of preference:
   - Declare each core element's props with `as const` + literal unions
     (`type: String as unknown as 'sm' | 'md' | 'lg'` is the documented
     Atomico pattern) so `Props<>` narrows.
   - Failing that, have `scripts/build-element-types.mjs` post-process the
     declarations from the CEM's enum data, which is already correct.
   Add a type-level test (`expectTypeOf<ZButton['size']>().toEqualTypeOf<'sm'|'md'|'lg'>()`)
   per core element.
2. **One size vocabulary.** `z-dialog` `small/medium/large` → `sm/md/lg`
   (`z-dialog.tsx:16`). Keep the old values working for one minor with a
   dev-only console warning; record in CHANGELOG under Deprecated.
3. **Default-true booleans.** Generate the list from the CEM into
   `docs/fundamentals/` and the README, so the "absent means false" sentence
   is replaced by "absent means the default — here they are."
4. **Status flip.** With evidence recorded, set the core 20 back to
   `stable`. Everything else stays `beta` with its evidence table showing
   what's missing. The docs index gets a filter by status.
5. **Accessibility status page** (Carbon-style): one table, every element,
   columns = evidence flags, cells = automated / manual / not yet. Generated
   from the doc pages so it can't drift.

**Exit:** `npm run typecheck` in a consumer project catches `size="huge"`.
Every `stable` page shows green evidence. The docs contain no claim `src/`
contradicts (re-run the README pass across `docs/**`).

## Phase 5 — Internationalization and the long tail (≈2 weeks)

1. **Locale registry.** `src/shared/locale.ts`: `setLocale(strings)` +
   `useLocaleString(key)` hook, English defaults in one file. Replace every
   hardcoded string in the core set (`'No data'` in `z-table`, close/copy
   labels in overlays and `z-copy-button`, etc.) and document the key list.
2. **Logical properties.** Convert the 58 files using physical
   `left/right/margin-left/…` to `inline-start/end` equivalents; add a
   `check-css-templates.mjs` rule that flags the physical forms. Screenshot
   the RTL column of the matrix to confirm.
3. **Remaining form-shaped elements** get `useFormControl`: `z-input-otp`,
   `z-slider`, `z-range`, `z-color-picker`, `z-filter`, `z-toggle-button-group`.
4. **Fonts.** Move the Google Fonts `@import` out of `ink.css` into an
   opt-in `fonts.css` export; document self-hosting with `@font-face`.

**Exit:** the settings-screen flow renders correctly in `dir="rtl"` with a
non-English locale and no Google request in the network log.

## Phase 6 — Prove it with three flows (≈1–2 weeks, overlaps Phase 5)

Each lives in `site/` as a real page (not a snippet) with a Playwright test
that drives it end to end, in all four themes, keyboard-only.

1. **Validated form.** Every core control, `z-field` descriptions and
   errors, native `required`/`pattern`/`min`, custom async validation via
   `setCustomValidity`, submit → server-error toast → fix → success. Asserts
   `FormData` shape, focus lands on the first invalid field on submit, and
   the screen-reader name/description of every control.
2. **Searchable data table.** `z-table-toolbar` search + `z-filter`, sort,
   selectable rows with keyboard, empty state, loading state, a rich cell
   (badge + menu) — which requires `z-table` to accept a `renderCell`
   property or a `<template>` slot per column. This is the one *feature*
   addition the plan allows, because the table is otherwise string-only.
3. **Responsive settings screen.** `z-tabs` sections, toggles and selects
   that save on change, a `z-dialog` confirmation, works at 320px and in
   RTL, `prefers-reduced-motion` and `forced-colors` screenshots.

**Exit:** all three pass keyboard-only in CI. They are linked from the docs
home as "Start here."

## Phase 7 — Adoption and maintenance (ongoing, starts after Phase 4)

- CHANGELOG maintained per release; `npm version` hook refuses to publish
  without an entry.
- Support matrix page: browsers, frameworks (with the Phase 1 examples as
  proof), SSR status, and the deprecation policy.
- Token sync: document the Figma/Open Pencil ↔ `ink.css` workflow, or state
  plainly that tokens are code-first and design tooling consumes them.
- Quarterly re-audit against this document; anything still `beta` after two
  quarters either gets the treatment or is moved to an `experimental`
  entry point so its instability doesn't dilute the core.

---

## Sequencing and effort

| Phase | Weeks | Depends on |
|---|---|---|
| 0 Stop the bleeding | 1 | — |
| 1 Form participation | 2–3 | 0 |
| 2 A11y + keyboard | 2 | 0 (can overlap 1 after `useFormControl` lands) |
| 3 Regression protection | 1–2 | 1, 2 |
| 4 Contracts + docs | 1–2 | 3 |
| 5 i18n + long tail | 2 | 2 |
| 6 Three flows | 1–2 | 1, 2, 5 |
| 7 Maintenance | ongoing | 4 |

Roughly a quarter for one person working steadily; less with two, since 1/2
and 5/6 parallelize.

## What this plan deliberately does not do

- Add elements. The 40-odd unchecked `ROADMAP.md` items wait.
- Chase coverage numbers. The threshold moves only when behavior tests
  raise it.
- Certify screen-reader behavior automatically. The manual NVDA/VoiceOver
  pass per core element is a real cost and is recorded as such.
- Rewrite the table as a data-grid. `renderCell` is the minimum that makes
  the searchable-table flow honest; a grid is a later, separate decision.
