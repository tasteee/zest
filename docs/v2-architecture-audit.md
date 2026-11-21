# V2 architecture audit

**What this is:** a map of where Zest 1.0 breaks
[`architecture.md`](./architecture.md), how big the fix is, and what it
breaks for consumers. It is the work list for V2.

**Snapshot:** `main` at 1.0.0, November 2026. 156 component files, 101
public elements, 22 form-associated controls. Line numbers are from that
snapshot and will drift.

---

## 1. Verdict

- **Size:** a focused major release, not a rewrite. About **35 source
  files**, **~15 test files**, and **~30 `api-notes.json` entries** change.
- **Where the work is:** one new shared contract (field ↔ control), one new
  shared channel (group → child inherited state), then mechanical alignment
  in every control.
- **Consumer impact:** the common markup does not change.
  `<z-field label="Email"><z-input></z-input></z-field>` works as before.
  What breaks is the duplicated-state markup: `is-required` on the field,
  error text that implies invalid, slider and range labels, and parents that
  overwrite child props.
- **Semver:** several changes alter meaning, not just names. Ship them as
  **2.0.0**. Where a rename is enough, deprecate in 1.x with
  `warnDeprecated()` first.

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

## 2. Field and control layer

This is the core of V2. Every finding here is in `z-field`, the two shared
helpers, or the controls they feed.

| # | Rule | Where | Today | Target |
|---|------|-------|-------|--------|
| F1 | 7 | `z-field.tsx:133` | Error text sets `isInvalid = true` on the control. | Control owns validity. Field only presents the message. |
| F2 | 7 | `z-input.tsx:197`, `z-select.tsx:468`, `z-textarea.tsx:180`, and 8 more | `aria-invalid` is `isInvalid \|\| error`. Error text alone flags invalid. | `aria-invalid` comes from the control's validity state only. |
| F3 | 7 | all 22 controls | Three sources of "invalid": the `is-invalid` prop, `error` text, and `ElementInternals` validity. They can disagree. | One: validity. `is-invalid` becomes a way to *feed* validity (a custom error), not a parallel flag. |
| F4 | 8 | `z-field.tsx:114` | Field has `is-required` and pushes it into the control. Docs tell users to set it on both. | Required lives on the control. Field observes it and draws the marker. Remove `is-required` from `z-field`. |
| F5 | 6, 9 | `z-field.tsx:142` | Label click runs `control.shadowRoot.querySelector('input, textarea, select')`. | Call a public method. Controls already use `delegatesFocus`, so `control.focus()` is enough for focus; toggles need a defined activate method. |
| F6 | 5 | `z-field.tsx:104` | Field takes the first slotted element as "the control", silently. | Exactly one Zest control in the default slot. Anything else warns in development. Extra content goes in a documented header slot. |
| F7 | 4 | `z-field.tsx:109` | If the control has its own `aria-label`, the field silently skips naming. Visible and accessible names can differ with no signal. | Detect the conflict and warn in development. |
| F8 | 1 | `z-field.tsx:103–140` | Label, description, and error are forwarded by writing the control's public `label`, `description`, `error` props, with heuristics to guess who set them. | A dedicated field-link channel, separate from consumer props. No guessing. |
| F9 | 1 | `z-field.tsx:178`, `api-notes.json` | Field `size` sets the band height. The note says it is "passed to the control"; it is not. Field and control sizes can disagree. | Decide one owner (see Decisions). Fix the note either way. |
| F10 | — | `api-notes.json` (`z-field.accessibility`) | Says the field links label "with `for`". It does not. | Correct the note to the real mechanism. |
| F11 | 2 | `z-slider.tsx:236`, `z-range.tsx:394` | Slider and range render their own visible label in a header. | Visible label moves to `z-field`. |
| F12 | 13, 16 | `z-slider.tsx:231–246` | Slider owns `start`, `center`, `value` header slots and a value pill above the track. That header is a field region. | Field exposes a header extension point. Slider keeps a value-*presentation* API (format, prefix, suffix); placement moves to the field. |
| F13 | 2 | `z-slider.tsx:236` | `can-reset` double-click on the slider's own label. | Thumb double-click only, or an explicit public `reset()` a field-header button can call. |
| F14 | 3 | 15 controls (plus `z-button`, `z-toggle-button`) | Controls take a `label` prop that is only an accessible name. It duplicates `aria-label`, two sources for one fact. | See Decisions: deprecate on non-intrinsic controls, or keep it as the one documented name source and drop the other. |
| F15 | 7, 11 | `z-radio-group.tsx:187`, `z-checkbox-group.tsx:267`, `z-chip-group.tsx:242` | Groups put description and error on `aria-description` and derive `aria-invalid` from error text. | Same field-link channel as single controls. Invalid comes from group validity. |
| F16 | 4 | dev builds | `warnDeprecated()` checks `import.meta.env.DEV`, which is false in `dist`. Consumers of the package never see a warning. | Rules 4 and 5 need warnings that reach consumers. Ship a dev build, or warn once per page in all builds. |

### The new field ↔ control contract

One shared module replaces the prop-writing in `z-field` and the
`describableProps` in every control. Sketch:

```ts
// src/shared/field-link.ts
type FieldLinkT = {
	labelText?: string
	descriptionText?: string
	errorText?: string
}

type FieldLinkedControlT = {
	// field → control: present this text, own nothing
	linkField: (link: FieldLinkT) => void
	unlinkField: () => void
	// control → field: public state the field observes
	readonly isRequired: boolean
	readonly isDisabled: boolean
	readonly isReadonly: boolean
	readonly validity: ValidityState
	// label activation, per the control's semantics
	focus: () => void
	activateFromLabel?: () => void
}
```

- **Field writes only `linkField()`.** Never `isRequired`, `isInvalid`, or a
  consumer prop.
- **Field reads** required, disabled, readonly, validity from the control.
  Controls emit one state event (or the field watches reflected attributes).
- **Control decides** how text reaches assistive tech inside its own shadow
  root. Today that is the sr-only nodes in `accessible.tsx`. When cross-root
  ARIA reference targets ship in supported Chromium, only this module
  changes.
- **Error text never sets validity.** An app that wants "this error means
  invalid" calls `control.setCustomValidity(message)`. The field then shows
  the control's `validationMessage`, or its own `error` text when the app
  supplies one.

---

## 3. Library-wide single source of truth

Rule 1 applies beyond forms. The pattern to remove: **a parent writes into a
child's public props**, so the consumer and the parent are both writers of
the same fact.

| # | Where | Fact with two writers | Target |
|---|-------|----------------------|--------|
| L1 | `z-fieldset.tsx:158` | Child `isDisabled`. Fieldset sets it on every descendant and tries to remember which it touched. | Inherited-disabled channel. Child's effective disabled = own prop OR inherited. Child's own prop is never written. |
| L2 | `z-fieldset.tsx:314` | `is-required` on the group, separate from children. | Group marker derived from children, or documented as group-level only (for "pick at least one" constraints). |
| L3 | `z-radio-group.tsx:142` | Radio `isChecked` vs group `value`. | Group `value` is the owner. Radio exposes checked as derived, read-only state inside a group. |
| L4 | `z-radio-group.tsx:100`, `z-chip-group.tsx:154` | Child `isDisabled` (same as L1). | Inherited channel. |
| L5 | `z-chip-group.tsx:181` | Chip `isSelected` vs group `value`. | Group owns selection in a group. |
| L6 | `z-toggle-button-group.tsx:252` | Item `isPressed` vs group `value`. | Group owns. |
| L7 | `z-stepper.tsx:90–94` | Step `index`, `isLast`, `isVertical`, `isNavigable`, `size`: public props the stepper overwrites. | Derived, read-only, or inherited through the channel. Not consumer props. |
| L8 | `z-accordion.tsx:45` | Collapsible `isOpen` written by both accordion and consumer. | Accordion `value` (open item ids) owns open state in single mode, like tabs. |
| L9 | `z-menu.tsx:236`, `z-popover.tsx:68` | Reach into the trigger's shadow root to set `aria-expanded` / `aria-haspopup`. | Trigger contract: a Zest trigger exposes a public method or property for expanded state; plain elements get the attribute on the host. |
| L10 | `z-chip-group`, `z-checkbox-group`, `z-radio-group`, `z-stepper`, `z-timeline` | Group `size` / `tone` / `kind` cascade to children through CSS variables, and children have the same props. Which wins is not stated. | Write the rule once: child prop wins, group sets the default. Test it. |
| L11 | `z-dialog.tsx:83` | `label` → `aria-label` and `heading` → `aria-labelledby` both set. | One name source; warn on both. |

Held-back elements with the same pattern (`z-message-group`,
`z-message-list`, `z-panel`) are fixed before they ship, not in V2.

### The new inherited-state channel

Atomico ships a context API (`createContext` / `useContext`; confirm
against the installed version). One shared context carries the
state a group imposes, and controls combine it with their own props:

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
```

The consumer's prop is never overwritten, so re-enabling a group cannot
clobber a control the consumer disabled.

---

## 4. Blast radius

### Source

| Area | Files | Size | Notes |
|------|------:|:----:|-------|
| New shared contracts (`field-link`, `group-context`, dev warnings) | 3 new | M | The hard part is cross-shadow naming; tested in real browsers. |
| `z-field` rewrite | 1 | M | Shrinks. Gains a header slot. Loses `is-required`, invalid logic, shadow reach. |
| `accessible.tsx`, `form-control.ts` | 2 | S | Name resolution reads the field link; validity drives `aria-invalid`. |
| 22 form-associated controls | 22 | S each | Mostly mechanical: adopt field link, drop error→invalid, read inherited state. |
| `z-slider`, `z-range` header move | (in 22) | M | Real API change. Header slots move to `z-field`. |
| Groups and coordinators (`z-fieldset`, `z-stepper`, `z-step`, `z-accordion`, `z-collapsible`, `z-radio`, `z-chip`, `z-toggle-button-group-item`) | 8 | S–M | Switch to group ownership + inherited channel. |
| Overlay triggers (`z-menu`, `z-popover`, plus `z-button` trigger API) | 3 | S | New trigger contract. |
| **Total** | **~35** | | |

### Tests

- **Change:** `a11y-names.test.ts` encodes the old rule ("takes the z-field
  error, flags aria-invalid"). That test must invert.
- **Touch:** the 9 `*.form.test.ts`, `long-tail.form.test.ts`,
  `z-slider.test.ts`, `new-controls.test.ts`, `keyboard.test.ts`.
- **Add:** a contract test per rule (required flows control → field; error
  text never flips validity; group re-enable keeps a consumer-disabled
  child; ambiguous field warns; no element queries another's shadow root).

### Docs and notes

- `z-field` appears in **123 places across 96 docs files**. Almost all are
  `<z-field label>` around a control and **do not change**.
- **Change:** 1 demo with `is-required` on the field, 2 with field `error`
  implying invalid, 6 slider/range usages with `label`, 1 fieldset
  `is-disabled` demo (behavior stays, mechanism changes).
- **Decision-dependent:** ~140 docs usages of `label=` directly on a
  control (45 on `z-input`, 24 on `z-select`, 15 on `z-radio-group`, 13 on
  `z-slider`, ...). Untouched if `label` stays as the name source.
- **`api-notes.json`:** ~30 entries (25 mention `z-field`), including the
  wrong `size` and `for` claims.

### Consumer breaking changes (2.0)

1. `z-field is-required` removed. Put `is-required` on the control.
2. `z-field error` no longer makes the control invalid. Use the control's
   validity (`is-required`, `pattern`, `setCustomValidity()`).
3. `error` text on a control no longer sets `aria-invalid` by itself.
4. `z-slider` / `z-range` `label`, `start`, `center`, `value` slots move to
   `z-field`'s header.
5. Group children (`z-radio`, `z-chip`, `z-step`, toggle items,
   collapsibles in an accordion) stop accepting state the group owns.
6. Possibly: `label` on non-intrinsic controls (see Decisions).

---

## 5. Phases

1. **Contracts first (no consumer change).** Add `field-link`,
   `group-context`, and consumer-visible dev warnings. Add contract tests
   that fail on today's behavior and are skipped behind a V2 flag.
2. **1.x deprecations.** Warn on `z-field is-required`, slider/range
   `label`, and writes to group-owned child props. Ship as a minor.
3. **Field and controls.** Rewrite `z-field`, move every control to the
   field link and validity-driven `aria-invalid`. Move slider/range header.
4. **Groups and triggers.** Fieldset, radio/chip/toggle groups, stepper,
   accordion, menu/popover triggers.
5. **Docs, notes, release.** Update demos and `api-notes.json`, write the
   2.0 migration notes, ship 2.0.0.

Phases 1–2 are safe to land now. Phases 3–5 are the V2 branch.

---

## 6. Decisions needed

1. **`label` on non-intrinsic controls.** Keep it as the documented
   standalone name (and treat `aria-label` as the same fact), or deprecate it
   for `aria-label`? Keeping it saves ~140 docs edits. Deprecating removes a
   second name source.
2. **Field `size`.** Field reads the control's size (control owns), or field
   size is layout only and the control's size is independent (two facts,
   documented as different)?
3. **Dev warnings in `dist`.** Ship a separate development build, or warn
   once per page in every build?
4. **`is-invalid` on controls.** Keep it as a shorthand that sets a custom
   validity error, or remove it in favour of `setCustomValidity()`?
5. **Slot proposal.** It was not found in this repository. Once it lands,
   check it against Rules 13–16 and this audit before building on it.
