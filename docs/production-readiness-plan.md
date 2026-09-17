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

## Follow-ups parked on purpose

Things the work so far surfaced and deliberately did not fix. Each is
small enough to take in an afternoon; none should be forgotten.

- **`z-menu` active-item highlight is faint** (14% accent tint) in every
  theme — see `e2e/__screenshots__/z-menu-rest-*.png`.
- **Screen-reader evidence is `unverified` on every page.** A manual NVDA
  + VoiceOver pass per core element is owed, and until it is recorded the
  core set honestly stays `beta`.
- **`z-menu`, `z-tabs`, `z-table`, `z-table-toolbar` have no TS doc page**,
  so no evidence record and no rendered key map; their key maps are in
  markdown.
- **Long button labels overflow** their box rather than wrapping or
  truncating (`z-button-rest-*.png`, the narrow row).
- **Bundling**: wired external + atomico inlined means an unbundled page
  loads two Atomicos; bundle wired in, or externalise atomico consistently.
- **Firefox and WebKit** are supported by the feature table in SUPPORT.md,
  not by a test run.
- **Linux screenshot baselines** are not committed yet; the CI job seeds
  them as an artifact on its first run.
- **Playwright's own Chromium fails to launch on the Windows dev machine**
  (side-by-side manifest); Edge is used there.
- **React 19 hydration drops properties and `on*` listeners** on custom
  elements; the React example binds through refs. Worth a docs page of its
  own once frameworks get one.

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

### Status — done 2026-09-16

1. `.github/workflows/ci.yml`: typecheck, unit, browser, build, examples,
   smoke. `deploy-docs.yml` now runs on `workflow_run` after CI succeeds.
2. Vitest browser project in `vitest.config.ts`; the red test became the
   117-test form suite in Phase 1.
3. `src/_tests/browser/a11y-helpers.ts` (`expectNoA11yViolations`, on
   axe-core in-page) and `a11y.test.ts`: the nine core controls pass at rest.
4. `e2e/` Playwright Test project, `npm run test:screens`: `z-button` at rest
   (kinds × accents, sizes, disabled, loading, long label) plus hover,
   focus-visible and active, in all four themes — 16 baselines. Baselines
   are per platform; Windows ones are committed, and the CI job seeds the
   Linux set as an artifact on its first run until they are committed too.
5. `EvidenceT` on `ComponentDocT`, rendered as an Evidence section on every
   page; all 58 pages flipped to `beta`; `src/_tests/doc-status.test.ts`
   refuses `stable` without green rows. (The rule lives in a test rather
   than `check-release-surface.mjs` because the doc pages are TypeScript
   modules, not manifest data.)
6. README: `is-disabled`, the light theme description, the tokens link, and
   a generated default-true list (`build-readme-catalog.mjs` scans
   `value: () => true`). Also found and fixed: the plain-HTML example could
   never have worked — `dist/zest.js` has bare `@tasteee/wired` and
   `atomico` imports — so it now carries the import map.
7. `CHANGELOG.md` and `SUPPORT.md`, with the browser floor derived from the
   features actually used (`ElementInternals`, `popover`, `@starting-style`,
   `color-mix(in oklch)`): Chrome/Edge 117, Firefox 129, Safari 17.5.

Surfaced for later phases:

- The long-label button in the fixture overflows its box rather than
  wrapping or truncating (visible in `rest-*.png`). Phase 3's state matrix
  should decide the rule; it is not fixed here.
- Bundling: keeping wired external while inlining atomico means an
  unbundled page loads two Atomicos. Phase 4 should either bundle wired in
  or externalise atomico consistently.
- Firefox and WebKit are supported by feature table, not by a test run.

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

### Status — done 2026-09-16

- `src/shared/form-control.ts`: `useFormControl` + `defineFormElement`.
  Everything above, plus `formStateRestoreCallback`, readonly/disabled
  barred from validation as the platform does, and a no-op path where
  `ElementInternals` is missing (older Safari, happy-dom).
- All eight controls and `z-button` wired. `z-switch`, `z-select`,
  `z-combobox` and `z-radio-group` gained `is-required`; `z-select`,
  `z-combobox` and `z-radio-group` gained `name`; `z-radio-group` gained
  `is-disabled`; `z-button` gained `name`/`value`. `name` reflects everywhere.
- 117 real-browser tests in `src/_tests/browser/` — a shared 11-case
  contract per control (`describeFormContract`) plus control-specific cases.
  Pulled forward from Phase 0 to make this possible: the Vitest browser
  project (`vitest.config.ts`, `npm run test:browser`) and
  `.github/workflows/ci.yml`. Still owed from Phase 0: axe, screenshots,
  status flip, README pass, policy stubs, and gating `deploy-docs` on CI.
- `examples/react`, `examples/vue`, `examples/svelte` build from the package
  and pass `scripts/smoke-examples.mjs` in a real browser. See
  `examples/README.md` for what they found — most importantly that React 19
  hydration applies neither properties nor `on*` listeners to custom
  elements, so the React example binds both through refs.
- Docs: `docs/fundamentals/forms.md` states the contract; the nine
  component pages (TS and markdown) describe the new attributes.

Two things this surfaced for later phases:

- Chrome's `delegatesFocus` does not reach slotted light-DOM children, so
  `z-radio-group` takes focus itself (`tabindex="-1"`) and forwards it.
  Arrow-key movement between radios is still missing (Phase 2).
- Playwright's own Chromium build fails to launch on this Windows machine
  (side-by-side manifest error), so the browser project and the smoke
  script use the installed Edge on Windows and Playwright's Chromium in CI,
  with `ZEST_BROWSER_CHANNEL` to override.

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

### Status — done 2026-09-16

1. `src/shared/accessible.tsx`: one naming rule (`aria-labelledby` →
   `aria-label` → `label` → `<label for>` via the host's `labels`), one
   description mechanism (z-field forwards `description` / `error` /
   `isInvalid`; the control renders hidden nodes and `aria-describedby`
   points at them). All eight controls use it; `z-radio-group` carries
   `aria-description` on the host; `z-tooltip` forwards its content as
   `aria-description` on its trigger. The `ariaDescribedByElements` tier was
   dropped: element reflection cannot reach a sibling element's shadow root.
2. Key maps on every core page (`keyboard:` on TS pages, a Keyboard table on
   the four markdown-only ones) and `src/_tests/browser/keyboard.test.ts`
   with one test per row. Closed on the way: `z-menu` roving focus, Home/End,
   type-ahead and focus return; `z-tabs` RTL arrows; `z-table` rows in the
   tab order with Enter/Space; `z-dialog` Tab wrapping (the platform does
   not wrap at a modal's edges); `z-popover` focus in on open and back on
   Escape; `z-radio-group` arrow keys. Popup ARIA moved from role-less
   wrapper divs onto the slotted triggers' inner controls.
3. axe after every state in the keyboard, naming and form suites. It found
   three real things, all fixed: icon-only `z-button` / `z-toggle-button`
   had no accessible name (host `aria-label` was never forwarded); soft
   buttons and badges measured 3.7–4.4:1 in the light themes; the light
   theme's `--muted-foreground` measured 4.4:1 on tinted surfaces.
4. `--ring` is gone from `src/`; `check-css-templates.mjs` refuses it.
5. `interaction-styles.ts` carries the forced-colors block (Highlight for
   checked/active/selected, GrayText for disabled, a solid outline for
   focus); `transition.ts` skips the exit phase under reduced motion.
   Both are in the screenshot matrix.

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

### Status — done 2026-09-16

1. `e2e/core-matrix.ts` + `core-matrix.screens.ts`: all 20 core elements ×
   4 themes, each as one composite of its static states (default, sizes,
   disabled, error, loading, long label, 320px) plus hover / focus / active
   on a probe, an RTL composite and a forced-colors composite — 172 tests,
   276 baselines, 2.2 MB, stable across runs. Tolerance is 24 pixels, not a
   ratio: a ratio let a one-button text-colour change through unnoticed.
2. `ExampleT.assert`; `src/_tests/browser/docs.test.ts` runs `verify-docs`
   in CI, runs every asserting example, and axes every example on a core
   page. Three examples assert so far (`z-input` × 2, `z-select`); the
   pattern is there for the rest.
3. `src/_tests/api-contract.test.ts` holds `custom-elements.json` to
   `dist/components/*.d.ts` (fields, types, events, both directions). Its
   first honest run exposed that the nine `defineFormElement` controls had
   dropped out of the inventory since Phase 1 — no manifest entry, no
   README catalog row, no `dist/elements/*.js` subpath — because
   `public-element-entries.mjs` matched only `defineElement(`. Fixed, and
   `check-release-surface.mjs` now fails when an exported component
   registers an element the inventory does not see.
4. Coverage thresholds: 40/30/30/40 catalog-wide, 80/65/70/85 on the core
   set's files (they sit at 84–100% statements). `npm run test:coverage`
   runs in CI after the build.

Surfaced, not fixed here:

- The open `z-menu`'s active-item highlight (14% accent tint) is faint in
  every theme; visible in `z-menu-rest-*.png`.
- `z-menu`, `z-tabs`, `z-table` and `z-table-toolbar` have no TS doc page,
  so their evidence record cannot be set; their key maps live in markdown.
- Screen reader rows stay `unverified` for every element: a manual NVDA +
  VoiceOver pass is still owed.

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

### Status — done 2026-09-16

1. `src/shared/prop-types.ts`: `oneOf('sm', 'md', 'lg')` — Atomico's `type()`
   at runtime (still `String`), a `CustomType<'sm' | 'md' | 'lg'>` in the
   declaration. Applied to every enum attribute on the core set and to the
   shared overlay placement/accent. `build-cem.mjs` reads the same call, so
   the manifest carries the union; `build-api-reference.mjs` prints it; the
   API contract test compares the two unions. `src/_tests/prop-types.test.ts`
   is the type-level proof: `size = 'huge'` is a compile error under
   `npm run typecheck`. The rest of the catalog still declares `String`.
2. `z-dialog` takes `sm | md | lg`; `small | medium | large` resolve for one
   minor and warn once in dev through `src/shared/deprecate.ts` (the warning
   is tree-shaken out of dist). Tested.
3. The default-true list is generated into the README (Phase 0).
4. **No status flipped.** The rule needs a screen-reader row that only a
   manual pass can supply, and none has been recorded — so the core set
   stays `beta`, and the status page says so rather than the rule bending.
5. `#/status`: every element in one table with the evidence columns and a
   status filter, built from the doc registry (`site/src/render/status-page.ts`).
   Elements without a TS page show "no record".
6. README sweep across `docs/**`: `tone=`, `size="small"`, and the borders
   page's "two focus specs" callout were the stale claims; fixed.

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

### Status — done 2026-09-16

1. `src/shared/locale.ts`: `setLocale()` / `getLocale()` / `useLocale()`,
   exported from the root. Every string the core set and the long-tail form
   controls say is a key (27 of them); `docs/fundamentals/internationalization.md`
   lists them and a test refuses an undocumented key.
2. 128 physical spacing declarations rewritten to logical ones across
   `src/components` and `src/shared`; `check-css-templates.mjs` refuses
   `margin-left` and its relatives anywhere, and bare `left`/`right` insets
   in the core set unless marked `/* physical */` (the overlay engine's
   measured positioning). The RTL screenshot column changed as intended and
   caught one real bug on the way: `z-button-group`'s corner radii did not
   follow the row direction (fixed with `:dir(rtl)`).
3. `z-input-otp`, `z-slider`, `z-range`, `z-color-picker`, `z-filter` and
   `z-toggle-button-group` are form-associated, with 17 browser tests.
   `z-range` submits both handles under one `name`; `z-toggle-button-group`
   submits every pressed value under one `name` when `is-multiple`.
4. Fonts moved to `@tasteee/zest/fonts.css` (opt-in); `ink.css` names the
   families and fetches nothing. The release gate refuses a Google URL in
   `ink.css`. README has the self-hosting recipe.
5. The exit criterion is `src/_tests/browser/rtl-locale.test.ts`: a
   settings screen in `dir="rtl"` with French strings, mirrored layout
   asserted by geometry, arrow keys following reading direction, axe clean,
   and no request to Google Fonts.

Left for the long tail: physical `left`/`right` insets in non-core files
are unreviewed (the lint rule is scoped to the core set), and non-core
enum attributes still declare `String`.

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
