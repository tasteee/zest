# V2 architecture audit

**What this is:** a map of where Zest 1.0 breaks
[`architecture.md`](./architecture.md), how big the fix is, and what it
breaks. It is the work list for V2.

**Snapshot:** `main` at 1.0.0, November 2026. 156 component files, 101
public elements, 22 form-associated controls. Line numbers are from that
snapshot and will drift.

**Effort is not a factor.** Every decision here picks the correct, intuitive
design. File counts are listed so the scope is visible, not to argue for a
smaller change.

---

## 0. Start here

1. **Read** [`architecture.md`](./architecture.md), especially Rules 17–21.
2. **Work the phases in §7 in order.** Each phase lists what it unblocks.
3. **For every file you touch**, run the acceptance criteria
   (`architecture.md` §8) on it, not only the finding that brought you
   there. The audit is a map, not a line-by-line review (see §9).
4. **When a new decision comes up**, record it as a rule first
   (`AGENTS.md` → "Recording new rules"), then build it.
5. **Tick findings off here** as they land, so this file stays the live
   work list.

---

## 1. Verdict

- **Size:** a focused major release, not a rewrite. About **45 source
  files**, **~15 test files**, **~40 `api-notes.json` entries**, and
  **~170 docs usages** change.
- **Where the work is:** one new shared contract (field ↔ control), one new
  shared channel (group → child inherited state), one validity model, then
  alignment in every control.
- **The common markup still works:**
  `<z-field label="Email"><z-input></z-input></z-field>`.
- **No deprecation phase.** Zest has no outside users yet, so V2 changes
  APIs directly. No shims, no `warnDeprecated()` bridges.

### What is already right (keep it)

- **Controls own value, validity, and form participation.**
  `src/shared/form-control.ts` gives every control `ElementInternals`,
  native validity, reset, restore, and fieldset disabling. This is the
  foundation the new rules need.
- **Controls are independently accessible.** `resolveAccessibleName()` in
  `src/shared/accessible.tsx` takes `aria-labelledby`, `aria-label`, and
  `<label for>` on the host (Rule 3).
- **Cross-shadow description already avoids bare idrefs.** Controls render
  forwarded text into their own shadow root (Rule 11 intent).
- **Intrinsic option labels** on checkbox, radio, switch, and chip are
  allowed by Rule 2.
- **Layout primitives carry no semantics.** `z-row`, `z-column`, `z-grid`,
  `z-box` and friends set no roles or ARIA.
- **`z-tooltip` releases what it forwards.** Its ownership-tracking pattern
  is the right shape for any "present someone else's info" relationship.

---

## 2. Decisions

These are settled and recorded as rules in
[`architecture.md`](./architecture.md): D1 is Rule 17, D2 is Rule 19, D3 is
Rule 18, D4 is Rule 21, and the inherited channel is Rule 20. The rules are
the source; this section explains the reasoning and the scope.

### D1. `label` means visible text. Nothing else.

A prop named `label` must render a visible label. If it only names the
element for assistive tech, it is not a label.

- **Drop `label`** wherever it is only an accessible name. Use the standard
  `aria-label` (or `aria-labelledby`, or `z-field`).
- **Not `name`.** On a form control, `name` is the form-submission key
  (`FormData`). Reusing it would collide.
- **Keep `label`** where it renders visible text: `z-checkbox`, `z-chip`,
  `z-button`, `z-badge`, `z-link`, `z-separator`, `z-meter`, `z-step`, and
  the other display elements that show it.
- **Make it visible** on `z-radio` and `z-switch`. Today `label` there is
  name-only while the visible text comes from the slot. It should behave like
  `z-checkbox`: `label` is the visible option text, the slot overrides it.

`label` is dropped on **30 public elements**:

| Kind | Elements |
|------|----------|
| Text and choice controls | `z-input`, `z-textarea`, `z-select`, `z-combobox`, `z-date-input`, `z-number-input`, `z-number-range-input`, `z-tag-input`, `z-input-otp`, `z-rating`, `z-color-picker` |
| Range controls (visible label moves to `z-field`) | `z-slider`, `z-range` |
| Groups (visible label comes from `z-field` or `z-fieldset`) | `z-radio-group`, `z-checkbox-group`, `z-chip-group` |
| Other name-only | `z-calendar`, `z-copy-field`, `z-spinner`, `z-dialog`, `z-menu`, `z-popover`, `z-command`, `z-tabs`, `z-pagination`, `z-filter`, `z-stepper`, `z-timeline`, `z-swap`, `z-toolbar-group` |

`z-dialog` already has `heading` for its visible title; dropping `label`
also removes its two competing name sources (old finding L11).

### D2. The control owns its size. The field reads it.

```html
<z-field label="Email">
	<z-input size="sm"></z-input>
</z-field>
```

- `size` lives on the control. The field reads it and sizes its own label
  band, gap, and control band to match.
- **Remove `size` from `z-field`.**
- **Why not the field?** A control needs a size when it stands alone. If the
  field also owned size, there would be two places to set one fact, and
  inside a field the control's own `size` would either be ignored (silent)
  or fight the field. Control-owned means one place, always. It also matches
  required and disabled: every fact about the control is set on the control,
  and the field only reads.
- **Setting a size for many controls at once** is a group concern: a
  `z-fieldset` (or form-level group) sets a default through the inherited
  channel (§5). Precedence is fixed and documented: the control's own `size`
  wins, the nearest group default applies otherwise.

### D3. One validity model. Remove `is-invalid` and field `error`.

Today a control has three sources of "invalid" that can disagree: the
`is-invalid` attribute, `error` text, and real validity. Set `is-invalid`,
then call `setCustomValidity('')`, and the attribute says invalid while the
form says valid. That is the bug this decision removes.

**The model:**

1. **Validity is read-only and has one source:** the control. It is native
   constraints (`is-required`, `min`, `max`, `pattern`, ...) plus one custom
   error slot.
2. **The custom error slot** is a reflected `custom-validity` attribute /
   `customValidity` property. `setCustomValidity(message)` writes that same
   slot. The attribute and the method can never disagree, because they are
   one value.
   ```html
   <z-input custom-validity="That email is taken"></z-input>
   ```
   Empty or absent means no custom error. This is the declarative path for
   React, Vue, and form libraries.
3. **Showing invalid** follows the platform's `:user-invalid` idea: a
   control looks and announces invalid only once it is invalid **and** the
   user has interacted with it or tried to submit. Before that, a required
   empty field is invalid but not red.
   - Exposed as custom states on `ElementInternals.states`:
     `:state(invalid)` and `:state(user-invalid)`, for styling from outside.
   - `aria-invalid` on the inner control follows `user-invalid`.
4. **`z-field` drops `error` (prop and slot).** It shows the control's
   `validationMessage` while the control is `user-invalid`. The field never
   holds its own error text, so its message and the control's state cannot
   disagree.
5. **Custom wording** for any error is the app's call: set
   `custom-validity`. That covers server errors, cross-field rules, and
   friendlier text for native constraints.
6. **Groups** (`z-radio-group`, `z-checkbox-group`, `z-chip-group`) use the
   same model and the same `custom-validity` attribute.

`z-field` keeps `description`: help text is the field's own content.

### D4. Misuse reports: `console.warn` in every build. No dev build.

There are exactly two situations where Zest cannot pick a correct answer and
the rules say it must not guess:

- **Rule 5:** a `z-field` holds zero, or more than one, linkable control.
- **Rule 4:** a control inside a `z-field` also has its own `aria-label` or
  `aria-labelledby` that differs from the field label.

For both: one small `reportMisuse()` helper that calls `console.warn` once
per element, in all builds. In the Rule 4 case the field label still wins,
so behavior stays deterministic.

**Why this is enough:** `pnpm check:docs` already fails on any console warning
on any docs page. So every misuse in our own demos fails CI with no extra
tooling. The old 1.0 `import.meta.env.DEV` gate (silent in `dist`) does not
apply here.

---

## 3. Field and control layer

| # | Rule | Where | Today | Target |
|---|------|-------|-------|--------|
| F1 | 7 | `z-field.tsx:133` | Error text sets `isInvalid = true` on the control. | Gone with D3. The field only reads validity. |
| F2 | 7 | `z-input.tsx:197`, `z-select.tsx:468`, `z-textarea.tsx:180`, and 8 more | `aria-invalid` is `isInvalid \|\| error`. Error text alone flags invalid. | `aria-invalid` follows `user-invalid` (D3). |
| F3 | 7 | all 22 controls | Three sources of "invalid": `is-invalid`, `error` text, `ElementInternals` validity. | One: validity, fed by constraints and `custom-validity` (D3). |
| F4 | 8 | `z-field.tsx:114` | Field has `is-required` and pushes it into the control. Docs tell users to set it on both. | Remove `is-required` from `z-field`. The field reads the control's required state and draws the marker. |
| F5 | 6, 9 | `z-field.tsx:142` | Label click runs `control.shadowRoot.querySelector('input, textarea, select')`. | Public methods only. Controls use `delegatesFocus`, so `control.focus()` covers focus; toggles get `activateFromLabel()`. |
| F6 | 5 | `z-field.tsx:104` | Field silently takes the first slotted element as the control. | Exactly one linkable control. Otherwise `reportMisuse()` (D4). Extra content goes in the header slot. |
| F7 | 4 | `z-field.tsx:109` | If the control has its own `aria-label`, the field silently skips naming. | Field label wins; conflict is reported (D4). |
| F8 | 1 | `z-field.tsx:103–140` | Label, description, error are forwarded by writing the control's public props, with heuristics to guess who set them. | Field-link channel (§4), separate from consumer props. No guessing. |
| F9 | 1 | `z-field.tsx:178`, `api-notes.json` | Field `size` sets band height; the note says it is "passed to the control" (it is not). | Remove field `size`; field reads the control's size (D2). |
| F10 | — | `api-notes.json` (`z-field.accessibility`) | Says the field links label "with `for`". It does not. | Describe the real mechanism. |
| F11 | 2 | `z-slider.tsx:236`, `z-range.tsx:394` | Slider and range render their own visible label. | Visible label moves to `z-field`; `label` dropped (D1). |
| F12 | 13, 16 | `z-slider.tsx:231–246` | Slider owns `start`, `center`, `value` header slots and a value pill. That header is a field region. | `z-field` gets a header slot. Slider keeps value *presentation* (format, prefix, suffix); placement moves to the field. |
| F13 | 2 | `z-slider.tsx:236` | `can-reset` double-click on the slider's own label. | Thumb double-click, plus a public `reset()` a header button can call. |
| F14 | 3 | 30 elements | `label` that is only an accessible name. | Dropped (D1). |
| F16 | 1, 17 | `z-input.tsx:234`, `z-textarea.tsx:213` | `is-focused` is a reflected, writable prop that mirrors browser focus. Setting it does not focus anything; the browser and the prop are two sources for one fact. | Remove the prop. Expose `:state(focused)` for styling, or rely on `:focus-within`. |
| F15 | 7, 11 | `z-radio-group.tsx:187`, `z-checkbox-group.tsx:267`, `z-chip-group.tsx:242` | Groups put description and error on `aria-description` and derive `aria-invalid` from error text. | Field-link channel and the D3 validity model. |

---

## 4. The field ↔ control contract

One shared module replaces the prop-writing in `z-field` and the
`describableProps` in every control.

```ts
// src/shared/field-link.ts
type FieldLinkT = {
	labelText?: string
	descriptionText?: string
}

type FieldLinkedControlT = {
	// field → control: present this text, own nothing
	linkField: (link: FieldLinkT) => void
	unlinkField: () => void
	// control → field: public state the field reads
	readonly isRequired: boolean
	readonly isDisabled: boolean
	readonly isReadonly: boolean
	readonly size: 'sm' | 'md' | 'lg'
	readonly validity: ValidityState
	readonly validationMessage: string
	readonly isUserInvalid: boolean
	// label activation, per the control's semantics
	focus: () => void
	activateFromLabel?: () => void
}
```

- **The field writes only `linkField()`.** Never a consumer prop.
- **The field reads** required, disabled, readonly, size, and validity. The
  control fires one `statechange` event when any of them changes.
- **The control decides** how the text reaches assistive tech inside its own
  shadow root. Today that is the sr-only nodes in `accessible.tsx`. When
  cross-root ARIA reference targets ship in supported Chromium, only this
  module changes.
- **Error text is not in the link.** The field shows the control's own
  `validationMessage` (D3).

---

## 5. Library-wide single source of truth

Rule 1 applies beyond forms. The pattern to remove: **a parent writes into a
child's public props**, so the consumer and the parent both write one fact.

| # | Where | Fact with two writers | Target |
|---|-------|----------------------|--------|
| L1 | `z-fieldset.tsx:158` | Child `isDisabled`. Fieldset sets it on every descendant and remembers which it touched. | Inherited-disabled channel. Effective disabled = own prop OR inherited. The child's prop is never written. |
| L2 | `z-fieldset.tsx:314` | `is-required` on the group, separate from children. | Remove. The legend marker is derived from the children (or from a group control's own required state). |
| L3 | `z-radio-group.tsx:142` | Radio `isChecked` vs group `value`. | Group `value` owns. Inside a group, a radio's checked state is read-only and derived. |
| L4 | `z-radio-group.tsx:100`, `z-chip-group.tsx:154` | Child `isDisabled` (as L1). | Inherited channel. |
| L5 | `z-chip-group.tsx:181` | Chip `isSelected` vs group `value`. | Group owns selection inside a group. |
| L6 | `z-toggle-button-group.tsx:252` | Item `isPressed` vs group `value`. | Group owns. |
| L7 | `z-stepper.tsx:90–94` | Step `index`, `isLast`, `isVertical`, `isNavigable`, `size`: public props the stepper overwrites. | Derived and read-only, or inherited. Not consumer props. |
| L8 | `z-accordion.tsx:45` | Collapsible `isOpen` written by both accordion and consumer. | Accordion `value` (open item ids) owns open state, like tabs. |
| L9 | `z-menu.tsx:236`, `z-popover.tsx:68` | Reach into the trigger's shadow root to set `aria-expanded` / `aria-haspopup`. | Trigger contract: a Zest trigger exposes a public expanded-state property; a plain element gets the attribute on the host. |
| L10 | `z-chip-group`, `z-checkbox-group`, `z-radio-group`, `z-stepper`, `z-timeline` | Group `size` / `tone` / `kind` cascade to children through CSS variables; children have the same props; which wins is not stated. | Inherited channel with one rule: the child's own prop wins, the group sets the default (same as D2). |

Held-back elements with the same pattern (`z-message-group`,
`z-message-list`, `z-panel`) are fixed before they ship, not in V2.

### The inherited-state channel

Atomico ships a context API (`createContext` / `useContext`; confirm
against the installed version). One shared context carries the defaults a
group sets, and children combine it with their own props:

```ts
// src/shared/group-context.ts
type InheritedStateT = {
	isDisabled: boolean
	size?: 'sm' | 'md' | 'lg'
	tone?: string
}

// inside a control
const inherited = useContext(GroupContext)
const isDisabled = props.isDisabled || inherited.isDisabled || isFormDisabled
const size = props.size ?? inherited.size ?? 'md'
```

The child's own prop is never overwritten, so re-enabling a group cannot
undo a control the consumer disabled.

---

## 6. Scope

### Source

| Area | Files | Size | Notes |
|------|------:|:----:|-------|
| New shared modules (`field-link`, `group-context`, `report-misuse`, validity in `form-control`) | 3 new + 1 | M | The hard part is cross-shadow naming, tested in real browsers. |
| `z-field` rewrite | 1 | M | Shrinks. Gains a header slot. Loses `is-required`, `error`, `size`, invalid logic, shadow reach. |
| `accessible.tsx` | 1 | S | Name resolution reads the field link; `label` input removed. |
| 22 form-associated controls | 22 | S–M | Field link, D3 validity, inherited state, `label` dropped. |
| `z-slider`, `z-range` header move | (in 22) | M | Header slots move to `z-field`. |
| Groups and coordinators (`z-fieldset`, `z-stepper`, `z-step`, `z-accordion`, `z-collapsible`, `z-radio`, `z-chip`, `z-toggle-button-group-item`) | 8 | S–M | Group ownership + inherited channel. `z-radio` `label` becomes visible. |
| Overlay triggers (`z-menu`, `z-popover`, `z-button`) | 3 | S | Trigger contract. |
| Other `label` drops (`z-calendar`, `z-copy-field`, `z-spinner`, `z-dialog`, `z-command`, `z-tabs`, `z-pagination`, `z-filter`, `z-timeline`, `z-swap`, `z-toolbar-group`) | ~11 | S | `aria-label` instead. |
| **Total** | **~45** | | |

### Tests

- **Invert:** `a11y-names.test.ts` encodes the old rule ("takes the z-field
  error, flags aria-invalid").
- **Touch:** the 9 `*.form.test.ts`, `long-tail.form.test.ts`,
  `z-slider.test.ts`, `new-controls.test.ts`, `keyboard.test.ts`.
- **Add one contract test per rule:**
  - required flows control → field, never back;
  - `custom-validity` and `setCustomValidity()` are one value;
  - a required empty field is invalid but not `user-invalid` until touched
    or submitted;
  - the field shows the control's `validationMessage`, nothing else;
  - re-enabling a group keeps a consumer-disabled child disabled;
  - an ambiguous field reports misuse;
  - no element queries another element's shadow root.

### Docs and notes

- `z-field` appears **123 times across 96 docs files**. Almost all are
  `<z-field label>` around a control and stay as they are.
- **~160 docs usages** of `label=` on the 30 elements in D1 become
  `aria-label=` or move into a `z-field`.
- **Change:** 1 demo with `is-required` on the field, 2 with field `error`,
  ~9 with `is-invalid`, 6 slider/range labels, 1 fieldset `is-disabled`
  demo (behavior stays, mechanism changes).
- **`api-notes.json`:** ~40 entries, including the wrong `size` and `for`
  claims on `z-field`.

### What changes for anyone using Zest

1. `label` is gone on 30 elements where it was only a name. Use
   `aria-label` or `z-field`.
2. `z-field` loses `is-required`, `error` (prop and slot), and `size`.
3. `is-invalid` is gone on every control. Use constraints and
   `custom-validity`.
4. Invalid styling and `aria-invalid` appear only after interaction or a
   submit attempt.
5. `z-slider` / `z-range` header slots move to `z-field`'s header.
6. Group children stop accepting state their group owns.
7. `z-radio` and `z-switch` `label` now render visible text.
8. `is-focused` is gone on `z-input` and `z-textarea`. Style with
   `:state(focused)` or `:focus-within`.

---

## 7. Phases

1. **Shared modules.** `field-link`, `group-context`, `report-misuse`, and
   the D3 validity model in `form-control.ts`, with contract tests.
2. **Field and controls.** Rewrite `z-field`; move every control to the
   field link and D3; drop `label` per D1; move the slider/range header.
3. **Groups and triggers.** Fieldset, radio/chip/toggle groups, stepper,
   accordion, menu/popover triggers.
4. **Docs and notes.** Update demos and `api-notes.json`. `check:docs`
   catches any misuse left in a demo.
5. **Release 2.0.0** with a short "what changed" list (§6).

---

## 8. Still open

- **Slot proposal.** It is not in this repository. Once it lands, check it
  against Rules 13–16 and this audit before building on it.
- **Browser floor.** `:state()` custom-state selectors need Chromium 125.
  `SUPPORT.md` says 117 and the README says 119. Raise the floor to 125 and
  make both say the same.

---

## 9. Coverage

**How this audit was done:** targeted sweeps of all 156 component files for
the patterns the rules forbid:

- form-contract props (`label`, `is-required`, `is-invalid`, `error`,
  `description`, `size`);
- parents writing child props or attributes;
- reaches into another element's shadow root;
- "first slotted element" picks;
- name-only `label` props;
- writable props that mirror state the browser owns (`is-focused`).

The sweep then read `z-field`, `z-fieldset`, `z-input`, `z-slider`, and the
shared form and accessibility modules in full.

**Not yet audited in depth.** Check these as each phase touches them:

- **Event names and payloads** across all elements (V1.md already flags
  this as unfinished).
- **CSS parts and custom properties** as extension points, against
  Rules 13–15.
- **Overlay open state** (`z-dialog`, `z-drawer`, `z-sheet`, `z-popover`,
  `z-command`, `z-color-picker`). A first look found one owner per element,
  which is fine, but trigger ↔ overlay relationships beyond L9 were not
  traced.
- **Held-back elements.** Out of V2 scope; each is checked against the rules
  before it ships.
- **The docs site's own wrapper components** under `site/src`.
