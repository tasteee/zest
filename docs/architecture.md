# Zest — Field & Control Architecture

**Status:** Foundational. Accepted system rules.
**Scope:** Form controls, fields, labeling, accessibility, validation,
composition, and extension points. The single-source-of-truth principle
(Rule 1) applies to **every** Zest element, not only form elements.

> **Precedence.** This is the foundational architecture document for Zest.
> Every other design document, proposal, and API note (including any slot
> proposal) must conform to it. Where another document disagrees, this one
> wins, and the other document is wrong until it is fixed.
>
> **Before any change** to an element, prop, slot, event, or behavior, read
> this document and answer the acceptance criteria in
> [§8](#8-architectural-acceptance-criteria).
>
> **New rules land here.** When a decision sets a new rule, it is added to
> this document as a numbered rule in the same change, and logged in
> [§11](#11-rule-log). A rule that lives only in a chat, a PR, or the audit
> is not a rule yet.
>
> **Where we are today.** Zest 1.0 predates these rules and breaks several of
> them. The known gaps and the V2 plan to close them are in
> [`v2-architecture-audit.md`](./v2-architecture-audit.md). New work must
> follow these rules even where old code does not.

---

## 1. Foundational philosophy

Every Zest component must have a clearly defined responsibility, and no two
components should independently own the same responsibility.

A component may collaborate with another component, but collaboration must
not create competing sources of truth.

Zest favors composition over duplication, semantic correctness over
incidental markup, and explicit architectural contracts over
implementation-dependent behavior.

**Correctness over effort.** The size of a change never decides a design.
Zest picks the correct, intuitive design, then does the work it takes.

**Core principle:** A field composes. A control operates. A group organizes.
A form orchestrates.

These responsibilities must remain distinct.

## 2. Component responsibilities

### Controls — own behavior

Examples: `z-input`, `z-select`, `z-slider`, `z-textarea`, `z-switch`.

A control owns:

- Its value and value lifecycle.
- Its interactive behavior and focus management.
- Its disabled and read-only behavior.
- Its validation constraints, validity state, and validation APIs.
- Its keyboard and pointer interactions.
- Its events and form participation.
- Its accessible role, state, name, and value.

A control must function independently of `z-field`.

A control does not require a field wrapper to operate correctly, participate
in a form, or be accessible.

### Fields — own semantic composition

`z-field` represents one logical form field.

A field owns:

- Visible field labeling.
- The relationship between the label and control.
- Supporting descriptions and validation-message presentation.
- Required and optional indicators.
- Field-level layout and spacing.
- The accessible association of supporting information with the control.
- Field-level presentation and extension points.

A field is a semantic coordinator, not a form controller.

It does not own values, perform validation, handle user input, or manage form
submission.

### Groups — own collective semantics

A group represents multiple related controls.

A group owns:

- The group's accessible name or legend.
- Collective descriptions and instructions.
- Group-level layout.
- Relationships among grouped controls.

A group does not take ownership of each child's interaction or validation
behavior.

### Forms — own orchestration

A form or application-level form controller may coordinate:

- Submission.
- Cross-field validation.
- Form-wide state.
- External validation results.
- Reset behavior.
- Submission errors.

Individual controls remain responsible for their own validity and form
participation.

### Layout primitives — own arrangement only

Generic layout components such as rows, columns, and stacks must not acquire
field semantics simply because they arrange form controls.

Layout does not imply a semantic relationship.

## 3. System invariants

### Rule 1 — One source of truth per responsibility

Every piece of state or semantic information must have an authoritative
owner.

Other components may observe, reference, or present that information without
independently owning it.

Examples:

- The control owns whether it is required.
- The field presents the required indicator.
- The control owns whether it is invalid.
- The field presents the associated error.
- The field owns the visible field label.
- The control exposes that label as its accessible name.

There must not be two independently editable versions of the same
information that can silently disagree.

> **Library-wide.** This rule governs all of Zest: open state, selection,
> checked state, disabled state, size, tone, orientation, and any other prop.
> If a parent and a child can both set the same fact, one of them is the
> owner and the other observes. A parent must not write into a child's
> public props to impose its own state.

### Rule 2 — Visible field labels belong to fields

`z-field` is the standard mechanism for rendering the visible label
associated with a form control.

Text inputs, sliders, selects, and similar controls must not independently
render a competing external field label.

A control's accessible naming capability is distinct from visible label
rendering.

**Exception:** Components with intrinsic option labels, such as checkboxes
and radio options, may render those labels as part of their own interaction
contract. Their group label remains a group-level responsibility.

### Rule 3 — Every control must be independently accessible

A control must support accessible naming without requiring a field wrapper.

Standalone controls may receive an accessible name through standard
mechanisms such as `aria-label`, `aria-labelledby`, or an associated native
HTML label.

A field-provided visible label becomes the control's accessible name when the
control is composed within a field.

A placeholder must never be treated as a substitute for an accessible name.

### Rule 4 — Visible and accessible labels must agree

When a field supplies the visible label, that label must be represented in
the control's accessible name.

A developer must not accidentally create a visible label that conflicts with
an independently supplied accessible name.

If an explicit accessible name conflicts with the field label, Zest should
expose the configuration problem during development rather than silently
choosing an inconsistent result.

Interactive actions and decorative content adjacent to a label must not
automatically become part of the control's accessible name.

### Rule 5 — A field represents one logical control

`z-field` must associate with exactly one logical control.

It may contain additional decorative, explanatory, or interactive content in
its documented extension points, but that content must not be confused with
the primary control.

Multiple independent controls require separate fields or an appropriate
grouping abstraction.

Zest must never silently choose an arbitrary descendant as the primary
control when association is ambiguous.

### Rule 6 — Field-to-control communication is a public contract

Fields and controls must communicate through an intentional, documented
interface.

A field may:

- Establish the control's accessible label relationship.
- Supply associated description and error information.
- Request that the control receive focus.
- Observe relevant public control state.

A field must not:

- Reach into the control's private DOM implementation.
- Manipulate its value.
- Override its validation constraints.
- Intercept or redefine its events.
- Assume the existence of a particular native element inside its Shadow DOM.

The association must remain reliable if the control's internal
implementation changes.

> **Library-wide.** The same holds for any two Zest elements. A popover,
> menu, tooltip, or group talks to another element through that element's
> public contract, never through its shadow root.

### Rule 7 — Controls own validity; fields own error presentation

The control is the authoritative source of validity state.

Validation may originate from native constraints, custom validators, or
external application logic, but the resulting validity state must be
represented through the control's public contract.

The field presents the appropriate error message and maintains its
accessible association with the control.

The mere existence of error text must not independently determine validity.

An error message and a control's invalid state must remain synchronized
through an explicit contract.

A field must not implement its own parallel validation engine.

### Rule 8 — Required, disabled, and read-only states have one authority

The control owns these behavioral states.

The field may reflect them visually or semantically, but it does not
independently redefine them.

Examples:

- A required control causes the field to display its required indicator.
- A disabled control retains its disabled interaction semantics.
- A read-only control remains readable and focusable according to its
  contract.

Field-level informational content must not automatically become disabled
merely because the associated control is disabled.

### Rule 9 — Label activation must be predictable

Activating the field's visible label must focus or activate its associated
control according to that control's expected semantics.

This interaction must use a public control interface or a verified native
association.

An interactive element placed alongside the label must retain its own
interaction behavior.

For example, activating a help button must not also activate the associated
input.

### Rule 10 — Layout must never alter semantics

A field's vertical, horizontal, compact, or responsive presentation must not
change:

- Which control it labels.
- The control's accessible name.
- The association of descriptions and errors.
- Its validation behavior.
- Its interaction contract.

Orientation is presentation, not meaning.

Layout changes must preserve logical reading order, keyboard usability, and
accessibility relationships.

### Rule 11 — Shadow DOM boundaries are architectural boundaries

Zest must explicitly support correct accessibility relationships across
custom-element and Shadow DOM boundaries.

Associations must not depend on assumptions that ordinary DOM ID references
will work across independent shadow roots.

The field-to-control contract must establish accessible naming and
description relationships through mechanisms supported by the relevant
browser and accessibility APIs.

These relationships must be tested in actual browser and assistive-technology
combinations, not assumed correct from DOM inspection alone.

### Rule 12 — A field must never become a form manager

`z-field` must remain a lightweight semantic composition component.

It must not grow responsibilities for:

- Form submission.
- Cross-field dependencies.
- Asynchronous validation orchestration.
- Dirty or touched state management.
- Global form state.
- Value serialization.
- Data persistence.

These belong to controls, application state, or dedicated form orchestration
systems.

Semantic coordination is not state management.

## 4. Extension-point architecture

### Rule 13 — Extension points belong to the component that owns the region

A component may expose customization points only for regions that fall
within its responsibility.

Examples:

- Field-header content belongs to `z-field`.
- Content inside an input's border belongs to `z-input`.
- Dialog-footer content belongs to `z-dialog`.
- Custom slider-value presentation belongs to the component responsible for
  that presentation, unless the consumer deliberately places it in a
  field-level region.

A slot must not give one component authority over another component's
responsibilities.

### Rule 14 — Slot consistency is contractual, not universal

Zest must establish consistent rules for naming, placement, supported
content, styling, accessibility, and interaction.

However, components are not required to expose identical slots.

Every slot must correspond to a meaningful region of the component's public
anatomy.

Slots must not be added merely to make components appear symmetrical.

Consistency means predictable contracts, not identical APIs.

### Rule 15 — Extension points must not silently redefine behavior

Slotted content must not automatically become part of a control's accessible
name, value, validation, or interaction model.

Decorative content, informational content, and interactive content must have
distinct documented expectations.

Interactive content may invoke public component APIs but must not manipulate
private component state.

The owning component must define the boundaries of its extension points
without attempting to control arbitrary descendant implementations.

### Rule 16 — Presentation customization and state customization are different capabilities

Changing how a value appears must not implicitly change the underlying value
or its lifecycle.

For example:

- A slider owns its numeric value.
- A formatter may present that number as a percentage or decibel value.
- A field may provide a position for that presentation.
- The application may provide custom markup for displaying it.

The placement, presentation, and state responsibilities remain distinct.

## 5. State, validity, and naming

### Rule 17 — Names promise only what they do

A prop's name is a promise about behavior. It must not promise anything the
element does not do.

- A prop named `label` renders visible text. If a value only names the
  element for assistive technology, it is not a label: use `aria-label` or
  `aria-labelledby`.
- `name` is never reused for naming. On a form control, `name` is the
  form-submission key.
- Elements whose `label` is visible keep it: `z-checkbox`, `z-radio`,
  `z-switch`, `z-chip`, `z-button`, `z-badge`, `z-meter`, and similar. On
  intrinsic-label controls, `label` is the visible option text and the
  default slot overrides it.
- Controls whose visible label belongs to `z-field` (Rule 2) have no
  `label` prop at all.

### Rule 18 — One validity model

Validity has exactly one source: the control.

- **Validity is read-only.** It is the result of the control's constraints
  (`is-required`, `min`, `max`, `pattern`, ...) plus one custom error slot.
- **The custom error slot is one value.** The reflected `custom-validity`
  attribute, the `customValidity` property, and `setCustomValidity()` all
  read and write the same slot. They can never disagree. Empty or absent
  means no custom error.

  ```html
  <z-input custom-validity="That email is taken"></z-input>
  ```

- **There is no `is-invalid` flag.** A flag that can say "invalid" while
  validity says "valid" is a second source of truth.
- **Invalid is shown only when it is the user's concern:** the control is
  invalid **and** the user has interacted with it or tried to submit. A
  required empty field is invalid on load but not shown as invalid.
- **The shown state is public.** Controls expose `:state(invalid)` and
  `:state(user-invalid)` through `ElementInternals`, and the inner control's
  `aria-invalid` follows `user-invalid`.
- **Fields hold no error text.** `z-field` shows the control's
  `validationMessage` while the control is `user-invalid`. Custom wording is
  the application's call, made through `custom-validity`.
- Groups (`z-radio-group`, `z-checkbox-group`, `z-chip-group`) follow the
  same model.

### Rule 19 — A control owns its own presentation facts

Facts about how a control looks (for example `size`) live on the control,
exactly like required and disabled.

- The control must have a size when it stands alone, so the control is the
  owner.
- `z-field` reads the control's size and sizes its own label band, gap, and
  control band to match. `z-field` has no `size` prop.
- To size many controls at once, a group sets a default through the
  inherited channel (Rule 20).

### Rule 20 — Inherited state flows through a channel, never through child props

When a group imposes state on its children (disabled, a default size or
tone), it publishes that state through a shared inherited channel. Children
combine it with their own props. The group never writes a child's public
props.

Precedence is fixed:

- **Restrictive state combines.** Effective disabled is the child's own
  `is-disabled` OR inherited disabled OR form-disabled. Re-enabling a group
  can never undo a control the consumer disabled.
- **Presentation defaults yield.** The child's own `size`, `tone`, or `kind`
  wins. The nearest group default applies otherwise.
- **Group-owned state is read-only on the child.** Where a group owns a fact
  (a radio group's `value`, an accordion's open items, a stepper's step
  index), the child exposes it as derived, read-only state inside that
  group.

### Rule 21 — Misuse is reported, never guessed

When Zest cannot pick a correct answer, it reports the problem instead of
silently choosing.

- Reported with `console.warn`, once per element, in every build. There is
  no development-only build and no dev-only gate.
- The docs check fails on any console warning, so misuse in our own demos
  fails CI.
- Where behavior must still be deterministic, the documented winner applies
  (for example the field label wins over a conflicting `aria-label`, per
  Rule 4) and the report still fires.
- Reports go through `src/shared/misuse.ts` (`reportMisuse`), which warns
  once per element and per kind of problem.
- Today the reported cases are: a `z-field` holding zero or more than one
  linkable control (Rule 5); a control inside a field with an accessible
  name that differs from the field label (Rule 4); an `is-icon` button with
  no accessible name (Rule 22); a `z-toggle-button-group` with both
  `columns` and `is-vertical`; a menu item with an unknown `kind`, or with
  `is-checked` on an action row; a `z-select` group with no children; and a
  `z-number-input` with both a `value-prefix`/`value-suffix` and the
  matching slot.

### Rule 22 — Size and shape are one vocabulary

Every button-like control speaks the same size and shape language, so a
button, a toggle and a group item side by side always agree.

- `size` is `xs | sm | md | lg`, and each step reads one
  `--control-height-*` token. No control hardcodes a height.
- `is-icon` is the square, icon-only shape modifier. It composes with every
  size, kind and tone, and means the same thing on every element that has it.
- An icon-only control is named with `aria-label` or `aria-labelledby`,
  never with `label` (Rule 17). An unnamed one is reported (Rule 21).
- A dense region (an editor, a toolbar) resizes its controls by overriding
  the `--control-height-*` tokens on a container, optionally with
  `data-zest-scope`. Per-element height overrides are not supported.

### Rule 23 — A group that acts as one control is one tab stop

When a group is a single control (a toggle-button group, a menu), it is one
stop in the tab order.

- Roving tabindex: Tab enters on the selected item (or the first enabled
  one) and Tab again leaves the group.
- Arrow keys move focus and never change the value. Space / Enter act.
  Home / End go to the first / last enabled item. Disabled items are skipped.
- Layout decides the arrow directions, not the semantics (Rule 10): a line
  uses ←/→ (or ↑/↓ when vertical), a grid (`columns`) uses both, and
  right-to-left swaps ←/→.
- One owner for roving focus: inside a `z-toolbar`, the toolbar owns it for
  every control, including group items, and the group stands aside.

### Rule 24 — Tints never rotate hue

A tint of a tone is mixed against `transparent` in oklch, or against an
opaque neutral (a surface, border or text role) in oklab. oklch interpolates
hue, and Zest's neutrals carry a hue of their own, so mixing a tone into one
in oklch turns violet or red grey-green. The token contract test enforces
this.

## 6. Accessibility is a system invariant

Accessibility is not an optional feature belonging exclusively to consumers.

Zest components must make correct semantics the natural result of using
their public APIs.

Every supported field-control composition must guarantee, within the
documented contract:

- An accessible control name.
- Correct label activation.
- Proper description and error associations.
- Accurate required, disabled, and invalid semantics.
- Predictable focus behavior.
- Correct keyboard navigation.
- Stable behavior across supported layout orientations.

Developers remain responsible for the semantics of their own arbitrary
slotted content.

Zest remains responsible for the correctness of the regions and
relationships it exposes.

Accessibility responsibility follows architectural ownership.

## 7. Preferred consumer experience

The preferred API should be declarative, minimal, and free of duplicated
information.

### Standard labeled field

```html
<z-field label="Email">
	<z-input name="email"></z-input>
</z-field>
```

The field supplies the visible and accessible label relationship. The input
owns its value and form participation.

### Required field

```html
<z-field label="Email">
	<z-input name="email" is-required></z-input>
</z-field>
```

The requirement is declared on the control. The field reflects it visually.

### Standalone input

```html
<z-input aria-label="Search" placeholder="Search..."></z-input>
```

No field wrapper is required because no visible field composition is needed.

### Custom field-header content

`z-field` exposes a documented field-header extension point. The consumer may
place a custom value readout there without altering the control's accessible
name or transferring value ownership to the field.

### Sized field

```html
<z-field label="Email">
	<z-input name="email" size="sm"></z-input>
</z-field>
```

Size is declared on the control. The field reads it and matches its label
and spacing (Rule 19).

### Invalid field

```html
<z-field label="Email">
	<z-input name="email" custom-validity="That email is taken"></z-input>
</z-field>
```

The control receives or computes its invalid state through its public
validation contract. The field presents the corresponding message and
establishes its accessible relationship (Rule 18).

The consumer must not be required to duplicate validity state across
multiple independently controlled components.

## 8. Architectural acceptance criteria

Before a new component, property, slot, or behavior is introduced, its design
must answer:

1. Which component owns this responsibility?
2. Does an existing component already own it?
3. Is this behavior, semantic composition, presentation, or orchestration?
4. Is there a single authoritative source of truth?
5. Does the API work independently of private implementation details?
6. Does it preserve accessibility and interaction correctness?
7. Does it compose naturally with other Zest components?
8. Does it introduce unnecessary coupling or duplicated functionality?
9. Is the abstraction meaningful beyond the immediate implementation?
10. Can its public contract be maintained as the system evolves?
11. Does every prop name promise only what it does (Rule 17)?
12. If a parent influences a child, does it go through the inherited
    channel with the documented precedence (Rule 20)?

An extension must not be accepted solely because it is easy to implement.

## 9. Final architectural doctrine

Zest is a system of independently correct components that become more
capable through intentional composition.

Each component must own its behavior and semantics without unnecessarily
duplicating the responsibilities of others.

Composition adds capabilities by establishing relationships between
components, not by merging their responsibilities.

- A field composes.
- A control operates.
- A group organizes.
- A form orchestrates.
- A layout primitive arranges.

The system must make the correct implementation the natural implementation,
while preserving the independence, predictability, and integrity of every
component.

## 10. Process rules

- **Record every new rule here.** A decision that sets a rule is added as a
  numbered rule in this document, in the same change that makes the
  decision, and logged in §11. `AGENTS.md` carries a short form of it.
- **No compatibility shims before outside users.** Zest has no outside users
  yet. APIs change directly to the correct design. No deprecation bridges.
- **The audit is the work list, not the rulebook.**
  [`v2-architecture-audit.md`](./v2-architecture-audit.md) tracks where code
  breaks the rules. The rules themselves live only here.

## 11. Rule log

| Rule | Added | Source |
|------|-------|--------|
| 1–16 | 2026-11-21 | Foundational field and control architecture. |
| Rule 1 library-wide scope, Rule 6 library-wide scope | 2026-11-21 | Single source of truth applies to all of Zest. |
| Correctness over effort (§1) | 2026-11-21 | V2 planning. |
| 17 Names promise only what they do | 2026-11-21 | V2 decision: drop name-only `label`. |
| 18 One validity model | 2026-11-21 | V2 decision: remove `is-invalid` and field `error`. |
| 19 A control owns its own presentation facts | 2026-11-21 | V2 decision: control owns `size`. |
| 20 Inherited state flows through a channel | 2026-11-21 | V2 audit, group findings. |
| 21 Misuse is reported, never guessed | 2026-11-21 | V2 decision: `console.warn` in every build. |
| §10 Process rules | 2026-11-21 | Record rules here; no shims before outside users. |
| 22 Size and shape are one vocabulary | 2026-11-22 | Dense editor UI: `--control-height-xs`, `z-button` `xs` and `is-icon`. |
| 23 A group that acts as one control is one tab stop | 2026-11-22 | `z-toggle-button-group` `columns` and roving focus. |
| 24 Tints never rotate hue | 2026-11-22 | oklch mixes against neutrals turned tones grey-green. |
| Rule 21 shared reporter and case list | 2026-11-22 | `src/shared/misuse.ts`; new reported cases. |
