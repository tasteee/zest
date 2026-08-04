# Zest element API reference

**179 elements.** Every one, as you would write it. Generated from
source by `scripts/build-api-reference.mjs`, so it is current by
construction rather than by discipline.

**How to read these.**

- `prop="a | b | c"` — a string attribute with a fixed set of values.
- `prop={string}` — a string attribute, free-form.
- `prop={number}` — a numeric attribute.
- `prop={Array}` / `prop={Object}` — **property only**. Assign it from JS
  (`el.items = [...]`); an attribute cannot carry it.
- `is-thing` — a boolean attribute. Present is true, absent is false.
- `onthing` — an event, with the shape of its `detail`.

Attributes are kebab-case in markup and camelCase as JS properties:
`is-full-width` is `el.isFullWidth`.

**One caveat on the value unions.** Tags, attributes and types come from
`custom-elements.json` and are authoritative. The unions do not: they are
scraped from each component's own CSS and comparisons, so a value that
resolves through a `var()` fallback rather than its own rule leaves no
trace to find. Documented defaults are merged back in. If a union looks
short, that is the first place to check.

## Contents

- [Foundation](#foundation) — 12
- [Layout](#layout) — 13
- [Buttons & actions](#buttons--actions) — 12
- [Forms](#forms) — 16
- [Navigation & disclosure](#navigation--disclosure) — 8
- [Overlays](#overlays) — 11
- [Data display](#data-display) — 14
- [Canvas, panels & docs](#canvas-panels--docs) — 24
- [Text editor](#text-editor) — 9
- [Chat](#chat) — 22
- [Attachments](#attachments) — 4
- [Effects](#effects) — 4
- [Music](#music) — 3
- [Specialized](#specialized) — 13
- [Uncategorised](#uncategorised) — 14

---

## Foundation

### `z-box`

```jsx
<z-box
  gap={string}
  row-gap={string}
  column-gap={string}
  margin={string}
  margin-top={string}
  margin-right={string}
  margin-bottom={string}
  margin-left={string}
  margin-x={string}
  margin-y={string}
  padding={string}
  padding-top={string}
  padding-right={string}
  padding-bottom={string}
  padding-left={string}
  padding-x={string}
  padding-y={string}
  width={string}
  min-width={string}
  max-width={string}
  height={string}
  min-height={string}
  max-height={string}
  direction="horizontal | vertical"   // default: horizontal
  aligns-x={string}
  aligns-y={string}
  inset={string}
  inset-x={string}
  inset-y={string}
  is-inline
  does-wrap
  does-wrap-text
  is-full-width
  is-full-height
/>
```

### `z-card`

```jsx
<z-card
  gap={string}
  is-reactive
  is-hidden
/>
```

### `z-display`

```jsx
<z-display
  size="sm | md | lg | xl"   // default: lg
  color="dom | sub | neutral | strong | muted"   // default: neutral
  weight="700 | 300 | 400 | 600 | 900"   // default: 700
  tag={string}   // default: h1
  is-hidden
/>
```

### `z-eyebrow`

```jsx
<z-eyebrow
  color="dom | neutral"
  label={string}
  has-rule
  is-full-width
  is-hidden
/>
```

### `z-heading`

```jsx
<z-heading
  size="xs | sm | md | lg | xl | xxl"   // default: md
  color="dom | sub | neutral | strong | muted"   // default: neutral
  weight="700 | 300 | 400 | 600 | 900"   // default: 700
  tag={string}   // default: size
  is-italic
  is-underlined
  is-strikethrough
  is-hidden
/>
```

### `z-inline`

```jsx
<z-inline
  color="dom | sub | neutral | strong | muted"
  weight="300 | 400 | 600 | 700 | 900"
  tag={string}   // default: span
  is-italic
  is-underlined
  is-strikethrough
  is-hidden
/>
```

### `z-kbd`

```jsx
<z-kbd
  size="xs | sm | md | lg | xl"   // default: md
  label={string}
  is-hidden
/>
```

### `z-label`

```jsx
<z-label
  size="xs | sm | md | lg | xl | xxl"   // default: md
  color="dom | sub | neutral | strong | muted"   // default: neutral
  weight="500 | 300 | 400 | 600 | 700 | 900"   // default: 500
  tag={string}   // default: span
  is-italic
  is-underlined
  is-strikethrough
  is-hidden
/>
```

### `z-line`

```jsx
<z-line
  direction="horizontal | vertical"
/>
```

### `z-separator`

```jsx
<z-separator
  direction="horizontal | vertical"
  label={string}
  is-hidden
/>
```

### `z-subheading`

```jsx
<z-subheading
  size="xs | sm | md | lg | xl | xxl"   // default: md
  color="dom | sub | neutral | strong | muted"   // default: neutral
  weight="600 | 300 | 400 | 700 | 900"   // default: 600
  tag={string}   // default: p
  is-italic
  is-underlined
  is-strikethrough
  is-hidden
/>
```

### `z-text`

```jsx
<z-text
  size="xs | sm | md | lg | xl | xxl"   // default: md
  color="dom | sub | neutral | strong | muted"   // default: neutral
  weight="300 | 400 | 600 | 700 | 900"
  tag={string}   // default: p
  is-italic
  is-underlined
  is-strikethrough
  is-hidden
/>
```

---

## Layout

### `z-bento-grid`

```jsx
<z-bento-grid
  columns={number}   // default: 3
  row-height={string}   // default: 14rem
  gap={string}
  is-hidden
/>
```

### `z-bento-item`

```jsx
<z-bento-item
  col-span={number}   // default: 1
  row-span={number}   // default: 1
  href={string}
  cta-label={string}
  is-hidden
/>
```

### `z-center`

```jsx
<z-center
  aligns-x="center | start | end"   // default: center
  aligns-y="center | start | end"   // default: center
  max-width={string}
  min-height={string}
  inset={string}
  inset-x={string}
  inset-y={string}
  centers-both
  centers-text
  is-full-width
  is-full-height
/>
```

### `z-chassis`

```jsx
<z-chassis
  rail-width={string}   // default: 4.25rem
  rail-collapsed-width={string}   // default: 3.5rem
  bezel={string}   // default: 0.75rem
  frame={string}   // default: 0.375rem
  rail-side="left | right"   // default: left
  does-expand-on-hover
  is-hidden
/>
```

### `z-column`

```jsx
<z-column
  gap={string}
  row-gap={string}
  column-gap={string}
  margin={string}
  margin-top={string}
  margin-right={string}
  margin-bottom={string}
  margin-left={string}
  margin-x={string}
  margin-y={string}
  padding={string}
  padding-top={string}
  padding-right={string}
  padding-bottom={string}
  padding-left={string}
  padding-x={string}
  padding-y={string}
  width={string}
  min-width={string}
  max-width={string}
  height={string}
  min-height={string}
  max-height={string}
  aligns-x={string}
  aligns-y={string}
  inset={string}
  inset-x={string}
  inset-y={string}
  is-inline
  does-wrap
  does-wrap-text
  is-full-width
  is-full-height
/>
```

### `z-container`

```jsx
<z-container
  size={string}   // default: xl
  gutter={string}
  is-centered
  is-full-height
/>
```

### `z-grid`

```jsx
<z-grid
  columns={string}
  min-column-width={string}
  gap={string}
  gap-x={string}
  gap-y={string}
  aligns-x="stretch | start | center | end"   // default: stretch
  aligns-y="stretch | start | center | end"   // default: stretch
  inset={string}
  inset-x={string}
  inset-y={string}
  is-full-width
/>
```

### `z-row`

```jsx
<z-row
  gap={string}
  row-gap={string}
  column-gap={string}
  margin={string}
  margin-top={string}
  margin-right={string}
  margin-bottom={string}
  margin-left={string}
  margin-x={string}
  margin-y={string}
  padding={string}
  padding-top={string}
  padding-right={string}
  padding-bottom={string}
  padding-left={string}
  padding-x={string}
  padding-y={string}
  width={string}
  min-width={string}
  max-width={string}
  height={string}
  min-height={string}
  max-height={string}
  aligns-x={string}
  aligns-y={string}
  inset={string}
  inset-x={string}
  inset-y={string}
  is-inline
  does-wrap
  does-wrap-text
  is-full-width
  is-full-height
/>
```

### `z-scroll`

```jsx
<z-scroll
  direction="horizontal | vertical | both"   // default: vertical
  max-height={string}
  max-width={string}
  overscroll="auto | contain | none"
  scrollbar="thin | auto | hidden"   // default: thin
  inset={string}
  inset-x={string}
  inset-y={string}
/>
```

### `z-section`

```jsx
<z-section
  space={string}
  space-top={string}
  space-bottom={string}
  container={string}
  gutter={string}
/>
```

### `z-spacer`

```jsx
<z-spacer
  size={string}
  can-grow
/>
```

### `z-surface`

```jsx
<z-surface
  level="0 | 1 | 2 | 3"
  accent="dom | sub | neutral | success | warning | error | strong | plain"   // default: neutral
  kind="outline | ghost | soft | plain | filled | outlined"
  radius={string}   // default: lg
  inset={string}   // default: md
  inset-x={string}
  inset-y={string}
  has-border
  is-elevated
  is-interactive
  is-full-width
/>
```

### `z-swap`

```jsx
<z-swap
  kind="beside | stack"   // default: stack
  effect="fade | rotate | flip"   // default: fade
  label={string}
  has-ghost
  is-active
  is-disabled
  is-hidden
  onchange={(event) => event.detail}   // { active: boolean }
/>
```

---

## Buttons & actions

### `z-button`

```jsx
<z-button
  size="sm | md | lg"   // default: md
  kind="solid | outline | ghost | soft | plain"   // default: solid
  accent="dom | sub | neutral | success | warning | error"   // default: neutral
  label={string}
  type="button | submit | reset"   // default: button
  is-disabled
  is-loading
  is-full-width
  is-hidden
/>
```

### `z-button-group`

```jsx
<z-button-group
  direction="horizontal | vertical"
/>
```

### `z-dock`

```jsx
<z-dock
  magnification={number}   // default: 1.08
  distance={number}   // default: 96
  item-size={string}   // default: 3rem
  gap={string}   // default: 0.75rem
  is-floating
  is-hidden
/>
```

### `z-dock-item`

```jsx
<z-dock-item
  label={string}
  href={string}
  is-active
  is-hidden
  onselect={(event) => event.detail}   // —
/>
```

### `z-link`

```jsx
<z-link
  href={string}
  target="_blank"
  label={string}
  size="sm | md | lg"   // default: md
  color="dom | sub | neutral"   // default: dom
  underline="hover | always | none"   // default: hover
  is-external
  is-block
  is-disabled
  is-hidden
/>
```

### `z-send-button`

```jsx
<z-send-button
  label={string}   // default: Send
  is-streaming
  is-disabled
  is-hidden
  onsend={(event) => event.detail}   // —
  onstop={(event) => event.detail}   // —
/>
```

### `z-theme-switcher`

```jsx
<z-theme-switcher
  kind="icon | segmented"   // default: segmented
  accent="dom | sub"
  themes={Array}
  size="sm | md | lg"
  is-icon-only
  is-hidden
  onchange={(event) => event.detail}   // { preference: ThemePreferenceT; theme: ThemeT }
/>
```

### `z-toggle`

```jsx
<z-toggle
  size="sm | md | lg"   // default: md
  kind="outline | ghost"   // default: outline
  accent="dom | sub | neutral"   // default: neutral
  is-icon
  is-pressed
  is-disabled
  is-hidden
  onpress={(event) => event.detail}   // { pressed: boolean }
/>
```

### `z-toggle-group`

```jsx
<z-toggle-group
  accent="dom | sub | neutral"
  size="sm | md | lg"
  kind="outline | ghost"
  direction="horizontal | vertical"
  type="single | multiple"   // default: single
  is-icon
  is-hidden
  onchange={(event) => event.detail}   // { value?: string | string[] }
/>
```

### `z-toggle-group-item`

```jsx
<z-toggle-group-item
  accent={string}
  size={string}
  kind={string}
  value={string}
  is-icon
  is-pressed
  is-disabled
  is-hidden
  onpress={(event) => event.detail}   // { pressed: boolean; value?: string }
/>
```

### `z-toolbar`

```jsx
<z-toolbar
  direction="horizontal | vertical"   // default: horizontal
  size="sm | md | lg"   // default: md
  overflow="scroll | wrap | menu"
  is-disabled
/>
```

### `z-toolbar-group`

```jsx
<z-toolbar-group
  label={string}
  is-hidden
/>
```

---

## Forms

### `z-checkbox`

```jsx
<z-checkbox
  size="sm | md | lg"   // default: md
  accent="dom | sub"   // default: dom
  name={string}
  value={string}
  is-checked
  is-indeterminate
  is-disabled
  is-block
  is-hidden
  onchange={(event) => event.detail}   // { checked: boolean; value?: string }
/>
```

### `z-color-picker`

```jsx
<z-color-picker
  value={string}
  label={string}
  presets={Array}
  accent="dom | sub"   // default: dom
  is-disabled
  is-hidden
  onchange={(event) => event.detail}   // { value: string }
/>
```

### `z-combobox`

```jsx
<z-combobox
  value={string}
  label={string}
  placeholder={string}
  options={Array}
  size="sm | md | lg"
  accent="dom | sub"   // default: dom
  is-invalid
  is-disabled
  is-inline
  is-hidden
  onchange={(event) => event.detail}   // { value: string }
/>
```

### `z-field`

```jsx
<z-field
  label={string}
  description={string}
  error={string}   // default: description
  size="sm | md | lg"
  is-required
  is-label-hidden
  is-label-reserved
/>
```

### `z-filter`

```jsx
<z-filter
  options={Array}
  accent="dom | sub | neutral"   // default: dom
  size="sm | md"   // default: md
  label={string}
  reset-label={string}   // default: Clear
  is-drilldown
  is-disabled
  is-hidden
  onchange={(event) => event.detail}   // { value?: string; path: string[] }
/>
```

### `z-input`

```jsx
<z-input
  value={string}
  label={string}
  type="text | search"   // default: text
  placeholder={string}
  name={string}
  autocomplete={string}
  inputmode={string}
  size="sm | md | lg"   // default: md
  accent="dom | sub"   // default: dom
  is-focused
  is-invalid
  is-disabled
  is-readonly
  is-required
  is-inline
  is-hidden
  oninput={(event) => event.detail}   // { value: string }
  onchange={(event) => event.detail}   // { value: string }
/>
```

### `z-input-otp`

```jsx
<z-input-otp
  value={string}
  label={string}
  length={number}   // default: 6
  size="sm | md | lg"   // default: md
  accent="dom | sub"   // default: dom
  is-numeric
  is-invalid
  is-disabled
  is-hidden
  onchange={(event) => event.detail}   // { value: string }
  oncomplete={(event) => event.detail}   // { value: string }
/>
```

### `z-number-input`

```jsx
<z-number-input
  value={number}
  min={number}
  max={number}
  step={number}   // default: 1
  label={string}
  name={string}
  placeholder={string}
  size="sm | md | lg"   // default: md
  accent="dom | sub"   // default: dom
  is-invalid
  is-disabled
  is-readonly
  is-required
  has-stepper-buttons
  is-full-width
  is-inline
  is-hidden
  oninput={(event) => event.detail}   // { value: number | null; rawValue: string; isValid: boolean }
  onchange={(event) => event.detail}   // { value: number }
/>
```

### `z-radio`

```jsx
<z-radio
  accent="dom | sub"   // default: dom
  value={string}
  is-checked
  is-disabled
  is-hidden
  onselect={(event) => event.detail}   // { value?: string }
/>
```

### `z-radio-group`

```jsx
<z-radio-group
  value={string}
  label={string}
  direction="horizontal | vertical"
  is-hidden
  onchange={(event) => event.detail}   // { value?: string }
/>
```

### `z-range`

```jsx
<z-range
  min={number}   // default: 0
  max={number}
  step={number}   // default: 1
  label={string}
  value-prefix={string}
  value-suffix={string}
  does-show-value
  is-disabled
  is-hidden
  oninput={(event) => event.detail}   // RangeDetailT
  onchange={(event) => event.detail}   // RangeDetailT
/>
```

### `z-range-handle`

```jsx
<z-range-handle
  value={number}
  min={number}   // default: z-range
  max={number}
  step={number}   // default: z-range
  accent="dom | sub"   // default: dom
  label={string}
/>
```

### `z-select`

```jsx
<z-select
  value={string}
  label={string}
  placeholder={string}
  options={Array}
  size="sm | md | lg"   // default: md
  accent="dom | sub"   // default: dom
  is-invalid
  is-disabled
  is-inline
  is-hidden
  onchange={(event) => event.detail}   // { value: string }
/>
```

### `z-slider`

```jsx
<z-slider
  value={number}   // default: min
  min={number}   // default: 0
  max={number}   // default: 100
  step={number}   // default: 1
  name={string}
  label={string}
  value-prefix={string}
  value-suffix={string}
  accent="dom | sub"   // default: dom
  does-show-value
  is-disabled
  is-hidden
  oninput={(event) => event.detail}   // { value: number }
  onchange={(event) => event.detail}   // { value: number }
/>
```

### `z-switch`

```jsx
<z-switch
  size="sm | md | lg"   // default: md
  accent="dom | sub"   // default: dom
  name={string}
  value={string}
  is-checked
  is-disabled
  is-block
  is-hidden
  onchange={(event) => event.detail}   // { checked: boolean; value?: string }
/>
```

### `z-textarea`

```jsx
<z-textarea
  value={string}
  label={string}
  placeholder={string}
  name={string}
  rows={number}   // default: 3
  size="sm | md | lg"   // default: md
  accent="dom | sub"   // default: dom
  is-focused
  is-invalid
  is-disabled
  is-readonly
  is-required
  is-auto-resize
  is-hidden
  oninput={(event) => event.detail}   // { value: string }
  onchange={(event) => event.detail}   // { value: string }
/>
```

---

## Navigation & disclosure

### `z-accordion`

```jsx
<z-accordion
  type="single | multiple"   // default: single
  is-hidden
/>
```

### `z-breadcrumbs`

```jsx
<z-breadcrumbs
  items={Array}
  max={number}
  accent="dom | sub"   // default: dom
  is-hidden
  onnavigate={(event) => event.detail}   // { value: string; index: number }
/>
```

### `z-collapsible`

```jsx
<z-collapsible
  value={string}
  label={string}
  accent="dom | sub"   // default: dom
  is-open
  is-disabled
  is-hidden
  ontoggle={(event) => event.detail}   // { value: string; open: boolean }
/>
```

### `z-context-menu`

```jsx
<z-context-menu
  items={Array}
  accent="dom | sub"   // default: dom
  is-disabled
  onselect={(event) => event.detail}   // { value: string }
/>
```

### `z-menu`

```jsx
<z-menu
  items={Array}
  align="start | end"   // default: start
  accent="dom | sub"   // default: dom
  is-hidden
  onselect={(event) => event.detail}   // { value: string }
/>
```

### `z-nav-menu`

```jsx
<z-nav-menu
  items={Array}
  value={string}
  accent="dom | sub"   // default: dom
  is-hidden
  onselect={(event) => event.detail}   // { value: string }
/>
```

### `z-sidebar`

```jsx
<z-sidebar
  items={Array}
  value={string}
  accent="dom | sub"   // default: dom
  is-collapsed
  is-docked
  is-hidden
  onselect={(event) => event.detail}   // { value: string }
/>
```

### `z-tabs`

```jsx
<z-tabs
  value={string}
  tabs={Array}
  accent="dom | sub"   // default: dom
  is-fitted
  is-hidden
  onchange={(event) => event.detail}   // { value: string }
/>
```

---

## Overlays

### `z-alert`

```jsx
<z-alert
  accent="dom | neutral | success | warning | error"   // default: neutral
  heading={string}
  is-dismissable
  is-hidden
  ondismiss={(event) => event.detail}   // —
/>
```

### `z-alert-dialog`

```jsx
<z-alert-dialog
  heading={string}
  description={string}
  confirm-label={string}   // default: Confirm
  cancel-label={string}   // default: Cancel
  accent="dom | sub | error"   // default: dom
  is-open
  onconfirm={(event) => event.detail}   // —
  oncancel={(event) => event.detail}   // —
/>
```

### `z-callout`

```jsx
<z-callout
  accent="dom | sub | neutral | success | warning | error"   // default: dom
  heading={string}
  is-expandable
  is-expanded
  is-hidden
/>
```

### `z-command`

```jsx
<z-command
  items={Array}
  placeholder={string}
  empty-text={string}
  is-open
  onselect={(event) => event.detail}   // { value: string }
  onopen={(event) => event.detail}   // —
  onclose={(event) => event.detail}   // —
/>
```

### `z-dialog`

```jsx
<z-dialog
  heading={string}
  description={string}
  size="sm | md | lg"   // default: md
  is-open
  has-close
  is-static
  is-disabled
  onopen={(event) => event.detail}   // —
  onclose={(event) => event.detail}   // —
/>
```

### `z-drawer`

```jsx
<z-drawer
  heading={string}
  description={string}
  is-open
  is-static
  is-disabled
  onopen={(event) => event.detail}   // —
  onclose={(event) => event.detail}   // —
/>
```

### `z-hover-card`

```jsx
<z-hover-card
  placement="top | bottom | left | right | -start | -end"   // default: bottom
  offset={number}   // default: 8
  accent="dom | sub"
  open-delay={number}   // default: 200
  close-delay={number}   // default: 150
  is-hidden
/>
```

### `z-popover`

```jsx
<z-popover
  placement="top | bottom | left | right | -start | -end"   // default: bottom
  offset={number}   // default: 8
  accent="dom | sub"
  is-open
  is-disabled
  is-hidden
  ontoggle={(event) => event.detail}   // { open: boolean }
/>
```

### `z-sheet`

```jsx
<z-sheet
  side="top | bottom | left | right"   // default: right
  heading={string}
  description={string}
  is-open
  has-close
  is-static
  is-disabled
  onopen={(event) => event.detail}   // —
  onclose={(event) => event.detail}   // —
/>
```

### `z-toast`

```jsx
<z-toast
  position="bottom-end | bottom-start | bottom-center | top-end | top-start | top-center"   // default: bottom-end
  ondismiss={(event) => event.detail}   // { id: number }
/>
```

### `z-tooltip`

```jsx
<z-tooltip
  placement="top | bottom | left | right | -start | -end"   // default: top
  offset={number}   // default: 8
  accent={string}
  content={string}
  open-delay={number}   // default: 150
  is-disabled
  is-hidden
/>
```

---

## Data display

### `z-avatar`

```jsx
<z-avatar
  src={string}
  name={string}
  initials={string}   // default: name
  status="online | busy | away | offline"
  size="xs | sm | md | lg | xl"   // default: md
  accent="dom | sub | neutral"   // default: dom
  is-square
  is-hidden
/>
```

### `z-avatar-stack`

```jsx
<z-avatar-stack
  max={number}
  total={number}
  size="xs | sm | md | lg | xl"
  is-hidden
/>
```

### `z-badge`

```jsx
<z-badge
  accent="dom | sub | neutral | success | warning | error"   // default: neutral
  kind="solid | outline | soft"   // default: soft
  size="sm | md"   // default: md
  label={string}
  value={string}
  is-dot
  is-selectable
  is-selected
  is-removable
  is-disabled
  is-hidden
  onselect={(event) => event.detail}   // { value?: string; selected: boolean }
  onremove={(event) => event.detail}   // { value?: string }
/>
```

### `z-list`

```jsx
<z-list
  label={string}
  is-plain
  is-hidden
/>
```

### `z-list-row`

```jsx
<z-list-row
  is-clickable
  is-hidden
/>
```

### `z-pagination`

```jsx
<z-pagination
  page={number}   // default: 1
  total={number}   // default: 1
  sibling-count={number}   // default: 1
  accent="dom | sub"   // default: dom
  is-hidden
  onchange={(event) => event.detail}   // { page: number }
/>
```

### `z-progress`

```jsx
<z-progress
  value={number}   // default: 0
  max={number}   // default: 100
  accent="sub | success | error"
  size="sm | md | lg"   // default: md
  is-indeterminate
  is-hidden
/>
```

### `z-skeleton`

```jsx
<z-skeleton
  shape="text | circle | rect"   // default: text
  width={string}
  height={string}
  lines={number}   // default: 1
  is-inline
  is-hidden
/>
```

### `z-sortable`

```jsx
<z-sortable
  axis="y | x"   // default: y
  handle={string}
  group={string}
  animation={number}
  is-disabled
  onstart={(event) => event.detail}   // { index: number }
  onsort={(event) => event.detail}   // { oldIndex: number; newIndex: number }
  onend={(event) => event.detail}   // —
/>
```

### `z-stat`

```jsx
<z-stat
  value={string}
  label={string}
  size="xs | md | xxl"   // default: xs
  label-size="sm | xxl | xs"   // default: sm
  color={string}
  label-color={string}   // default: muted
  align="start | center | end"   // default: start
  is-hidden
/>
```

### `z-status-dot`

```jsx
<z-status-dot
  status="online | away | dnd | busy | offline"
  size="md | lg"
  label={string}
  does-pulse
  is-hidden
/>
```

### `z-table`

```jsx
<z-table
  columns={Array}
  rows={Array}
  empty-label={string}
  is-striped
  is-clickable
  is-hidden
  onrowclick={(event) => event.detail}   // { row: RowT; index: number }
/>
```

### `z-tree`

```jsx
<z-tree
  items={Array}
  selection="single | multiple | none"   // default: single
  selected={Array}
  expanded={Array}
  does-show-guides
  is-hidden
  onselect={(event) => event.detail}   // { ids: string[]; node: TreeNode }
  onexpand={(event) => event.detail}   // { id: string }
  oncollapse={(event) => event.detail}   // { id: string }
  onactivate={(event) => event.detail}   // { id: string; node: TreeNode }
/>
```

### `z-virtual-list`

```jsx
<z-virtual-list
  items={Array}
  item-height={number}
  estimate-size={number}   // default: 40
  overscan={number}   // default: 4
  direction="horizontal | vertical"
  gap={number}   // default: 0
  render-item={string}
  key-fn={string}
  onvisiblerangechange={(event) => event.detail}   // { start: number; end: number }
/>
```

---

## Canvas, panels & docs

### `z-announcement-bar`

```jsx
<z-announcement-bar
  message={string}
  label={string}   // default: Announcement
  accent="dom | sub | success | warning | error"   // default: dom
  storage-key={string}
  is-permanent
  is-hidden
  ondismiss={(event) => event.detail}   // —
/>
```

### `z-api-table`

```jsx
<z-api-table
  rows={Array}
  kind="attributes | properties | slots | events | css"   // default: attributes
  caption={string}
  is-dense
  is-hidden
/>
```

### `z-code-group`

```jsx
<z-code-group
  group={string}
  value={string}
  storage-key={string}
  is-hidden
  onchange={(event) => event.detail}   // { value: string }
/>
```

### `z-control-panel`

```jsx
<z-control-panel
  controls={Array}
  values={Object}
  is-hidden
  onchange={(event) => event.detail}   // { name: string; value: string | null }
/>
```

### `z-diff`

```jsx
<z-diff
  before={string}
  after={string}
  patch={string}
  language={string}
  filename={string}
  view="unified | split"   // default: unified
  before-label={string}   // default: Before
  after-label={string}   // default: After
  is-hidden
/>
```

### `z-do-dont`

```jsx
<z-do-dont
  do-label={string}   // default: Do
  dont-label={string}
  do-caption={string}
  dont-caption={string}
  layout="center"
  is-hidden
/>
```

### `z-doc-header`

```jsx
<z-doc-header
  eyebrow={string}
  heading={string}
  tagline={string}
  status="stable | beta | experimental | new | deprecated"
  source-href={string}
  version-added={string}
  updated={string}
  is-hidden
/>
```

### `z-edit-on-github`

```jsx
<z-edit-on-github
  repo={string}
  path={string}
  branch={string}   // default: main
  href={string}
  label={string}
  is-hidden
/>
```

### `z-editor-canvas`

```jsx
<z-editor-canvas
  zoom={number}   // default: 1
  pan-x={number}   // default: 0
  pan-y={number}
  min-zoom={number}   // default: 0.1
  max-zoom={number}
  zoom-speed={number}   // default: 1
  grid="dots | lines | none"
  grid-size={number}   // default: 24
  snap={number}   // default: 0
  pan-button="auto | middle | space | left"   // default: auto
  wheel="zoom | pan"   // default: zoom
  is-disabled
  onviewportchange={(event) => event.detail}   // { x: number; y: number; zoom: number }
  onzoomchange={(event) => event.detail}   // { zoom: number }
  onpanchange={(event) => event.detail}   // { x: number; y: number }
/>
```

### `z-external-link`

```jsx
<z-external-link
  href={string}
  label={string}
  is-same-tab
  is-hidden
/>
```

### `z-file-tree`

```jsx
<z-file-tree
  paths={string}
  entries={Array}
  is-hidden
/>
```

### `z-last-updated`

```jsx
<z-last-updated
  datetime={string}
  label={string}   // default: Updated
  commit={string}
  repo={string}
  is-hidden
/>
```

### `z-mermaid`

```jsx
<z-mermaid
  code={string}
  src={string}
  theme={string}
  is-hidden
  onrender={(event) => event.detail}   // { id: string }
/>
```

### `z-panel`

```jsx
<z-panel
  default-size={string}
  min-size={string}
  max-size={string}
  collapsed-size={string}   // default: 0
  collapse-threshold={string}
  order={number}
  is-collapsible
/>
```

### `z-playground`

```jsx
<z-playground
  controls={Array}
  tag-name={string}
  layout="center | stack | fill"
  is-hidden
  onreset={(event) => event.detail}   // —
/>
```

### `z-prev-next`

```jsx
<z-prev-next
  previous={Object}
  next={Object}
  previous-label={string}   // default: Previous
  next-label={string}   // default: Next
  is-hidden
  onnavigate={(event) => event.detail}   // { route: string }
/>
```

### `z-reading-progress`

```jsx
<z-reading-progress
  for={string}
  is-hidden
/>
```

### `z-resizable-panels`

```jsx
<z-resizable-panels
  direction="column | row"   // default: row
  auto-save-id={string}
  keyboard-step={number}   // default: 5
  is-disabled
  onlayout={(event) => event.detail}   // { sizes: number[] }
  ondragging={(event) => event.detail}   // { isDragging: boolean }
/>
```

### `z-steps`

```jsx
<z-steps
  current={number}
  is-hidden
/>
```

### `z-swatch`

```jsx
<z-swatch
  token={string}
  kind="color | space | radius | type | value"
  label={string}
  description={string}
  is-hidden
  oncopy={(event) => event.detail}   // { token: string; value: string }
/>
```

### `z-toc`

```jsx
<z-toc
  for={string}
  headings={Array}
  min-level={number}   // default: 2
  max-level={number}   // default: 3
  label="string"
  active-id={string}
  is-hidden
  onchange={(event) => event.detail}   // { id: string }
/>
```

### `z-token-table`

```jsx
<z-token-table
  tokens={Array}
  names={string}
  kind="color | space | radius | type | value"
  caption={string}
  columns="1"
  is-hidden
/>
```

### `z-type-badge`

```jsx
<z-type-badge
  value={string}
  kind="primitive | literal | union | function | object"
  is-hidden
/>
```

### `z-was-this-helpful`

```jsx
<z-was-this-helpful
  page={string}
  question={string}
  comment-placeholder={string}
  thanks-label={string}
  is-hidden
  onfeedback={(event) => event.detail}   // { isHelpful: boolean; comment: string; page: string }
/>
```

---

## Text editor

### `z-bubble-menu`

```jsx
<z-bubble-menu
  kind="image | table-cell | link"   // default: link
  anchor-rect={string}
  placement="top | bottom | left | right | -start | -end"   // default: top
  offset={number}   // default: 10
  url={string}
  align={string}
  is-open
  has-caption
  onlinkchange={(event) => event.detail}   // { url: string }
  onlinkopen={(event) => event.detail}   // —
  onlinkunlink={(event) => event.detail}   // —
  onimagealign={(event) => event.detail}   // { align: AlignT }
  onimagecaptiontoggle={(event) => event.detail}   // —
  onimagereplace={(event) => event.detail}   // —
  onimagedelete={(event) => event.detail}   // —
  ontableinsertrow={(event) => event.detail}   // { position: RowColPositionT }
  ontabledeleterow={(event) => event.detail}   // —
  ontableinsertcolumn={(event) => event.detail}   // { position: RowColPositionT }
  ontabledeletecolumn={(event) => event.detail}   // —
  ontablemerge={(event) => event.detail}   // —
/>
```

### `z-drag-handle`

```jsx
<z-drag-handle
  label={string}
  is-disabled
/>
```

### `z-format-toolbar`

```jsx
<z-format-toolbar
  items={Array}
  heading-options={Array}
  heading-value={string}
  heading-placeholder={string}
  label={string}   // default: Formatting
  onaction={(event) => event.detail}   // { value: string }
  onheadingchange={(event) => event.detail}   // { value: string }
/>
```

### `z-gutter-handle`

```jsx
<z-gutter-handle
  anchor-rect={string}
  width={number}
  is-open
  onadd={(event) => event.detail}   // —
/>
```

### `z-mention-popover`

```jsx
<z-mention-popover
  trigger={string}
  items={Array}
  source="function"
  query={string}
  debounce-ms={number}
  anchor-rect={string}
  placement="top | bottom | left | right | -start | -end | bottom-start"   // default: bottom-start
  offset={number}   // default: 8
  empty-text={string}
  is-open
  onselect={(event) => event.detail}   // { value: string; label: string }
  onempty={(event) => event.detail}   // —
  ondismiss={(event) => event.detail}   // —
/>
```

### `z-selection-toolbar`

```jsx
<z-selection-toolbar
  items={Array}
  anchor-rect={string}
  placement="top | bottom | left | right | -start | -end"   // default: top
  offset={number}   // default: 10
  label={string}
  is-open
  onaction={(event) => event.detail}   // { value: string }
/>
```

### `z-slash-menu`

```jsx
<z-slash-menu
  items={Array}
  query={string}
  anchor-rect={string}
  placement="top | bottom | left | right | -start | -end | bottom-start"   // default: bottom-start
  offset={number}   // default: 8
  empty-text={string}
  is-open
  onselect={(event) => event.detail}   // { value: string }
  onempty={(event) => event.detail}   // —
  ondismiss={(event) => event.detail}   // —
/>
```

### `z-status-bar`

```jsx
<z-status-bar
  text={string}
  cursor-line={number}
  cursor-column={number}
  save-state="idle | saving | saved"   // default: idle
  words-per-minute={number}
/>
```

### `z-table-toolbar`

```jsx
<z-table-toolbar
  items={Array}
  anchor-rect={string}
  placement="top | bottom | left | right | -start | -end"   // default: top
  offset={number}   // default: 10
  label={string}
  is-open
  onaction={(event) => event.detail}   // { value: string }
  onselect={(event) => event.detail}   // —
  oninsertafter={(event) => event.detail}   // —
  onremove={(event) => event.detail}   // —
/>
```

---

## Chat

### `z-chat-header`

```jsx
<z-chat-header
  name={string}
  subtitle={string}
  avatar-src={string}
  avatar-name={string}   // default: name
  status={string}
  is-hidden
/>
```

### `z-chat-shell`

```jsx
<z-chat-shell
  list-size={string}   // default: 320px
  details-size={string}   // default: 300px
  auto-save-id={string}
  has-details
  is-hidden
/>
```

### `z-composer`

```jsx
<z-composer
  value={string}
  placeholder={string}
  is-focused
  is-disabled
  does-submit-on-enter
  is-hidden
  oninput={(event) => event.detail}   // { value: string }
  onsend={(event) => event.detail}   // { value: string }
/>
```

### `z-conversation-item`

```jsx
<z-conversation-item
  value={string}
  name={string}
  preview={string}
  timestamp={string}
  avatar-src={string}
  avatar-name={string}   // default: name
  status={string}
  unread={number}   // default: 0
  is-active
  is-muted
  is-pinned
  is-hidden
  onselect={(event) => event.detail}   // { value?: string }
/>
```

### `z-conversation-list`

```jsx
<z-conversation-list
  is-hidden
/>
```

### `z-date-divider`

```jsx
<z-date-divider
  label={string}
  is-hidden
/>
```

### `z-delivery-status`

```jsx
<z-delivery-status
  status="sent | read | error | sending | delivered"   // default: sent
  is-hidden
/>
```

### `z-emoji-picker`

```jsx
<z-emoji-picker
  emojis={Array}
  onselect={(event) => event.detail}   // { emoji: string }
/>
```

### `z-image-message`

```jsx
<z-image-message
  images={Array}
  src={string}
  alt={string}
  is-hidden
  onopen={(event) => event.detail}   // { index: number; src: string }
/>
```

### `z-message-actions`

```jsx
<z-message-actions
  quick-reactions={Array}
  actions={string}
  is-hidden
  onreact={(event) => event.detail}   // { emoji: string }
  onaddreaction={(event) => event.detail}   // —
  onreply={(event) => event.detail}   // —
  onforward={(event) => event.detail}   // —
  onmore={(event) => event.detail}   // —
/>
```

### `z-message-bubble`

```jsx
<z-message-bubble
  side="start | end"   // default: start
  group="single | first | middle | last"   // default: single
  accent="dom | sub | success | warning | error"
  is-hidden
/>
```

### `z-message-group`

```jsx
<z-message-group
  side="start | end"   // default: start
  name={string}
  avatar-src={string}
  avatar-name={string}   // default: name
  avatar-initials={string}
  timestamp={string}
  avatar="auto | always | never"   // default: auto
  is-hidden
/>
```

### `z-message-list`

```jsx
<z-message-list
  pin-threshold={number}   // default: 80
  is-pinned
  is-hidden
  onpinnedchange={(event) => event.detail}   // { isPinned: boolean }
/>
```

### `z-model-picker`

```jsx
<z-model-picker
  models={Array}
  value={string}
  placeholder={string}
  is-menu-below
  is-open
  is-hidden
  onchange={(event) => event.detail}   // { value: string }
/>
```

### `z-quoted-message`

```jsx
<z-quoted-message
  name={string}
  text={string}
  value={string}
  accent="sub"
  can-jump
  is-hidden
  onjump={(event) => event.detail}   // { value?: string }
/>
```

### `z-reactions`

```jsx
<z-reactions
  reactions={Array}
  can-add
  is-hidden
  ontoggle={(event) => event.detail}   // { emoji: string; isMine: boolean }
  onadd={(event) => event.detail}   // —
/>
```

### `z-read-receipt`

```jsx
<z-read-receipt
  avatars={Array}
  max={number}   // default: 3
  label={string}
  is-hidden
/>
```

### `z-system-message`

```jsx
<z-system-message
  label={string}
  is-hidden
/>
```

### `z-thinking`

```jsx
<z-thinking
  label={string}   // default: Thinking
  duration={string}
  content={string}
  is-active
  is-expanded
  is-hidden
/>
```

### `z-tool-call`

```jsx
<z-tool-call
  name={string}
  status="running | success | error"   // default: running
  args={string}
  result={string}
  result-language={string}
  is-expanded
  is-hidden
/>
```

### `z-typing-indicator`

```jsx
<z-typing-indicator
  name={string}
  avatar-src={string}
  is-hidden
/>
```

### `z-unread-divider`

```jsx
<z-unread-divider
  label={string}
  accent="sub"
  is-hidden
/>
```

---

## Attachments

### `z-attachment-chip`

```jsx
<z-attachment-chip
  name={string}
  size={string}
  type={string}
  thumbnail={string}
  value={string}
  progress={number}
  is-hidden
  onremove={(event) => event.detail}   // { value?: string }
/>
```

### `z-attachment-tray`

```jsx
<z-attachment-tray
  accept={string}
  max-size={number}
  max-files={number}
  is-multiple
  is-hidden
  onfiles={(event) => event.detail}   // { files: File[] }
  onreject={(event) => event.detail}   // { files: File[]; reason?: string }
/>
```

### `z-dropzone`

```jsx
<z-dropzone
  accept={string}
  max-size={number}
  max-files={number}
  files={Array}
  is-multiple
  is-disabled
  ondrop={(event) => event.detail}   // { files: File[] }
  onclear={(event) => event.detail}   // —
  onreject={(event) => event.detail}   // { files: File[]; reason: string }
/>
```

### `z-file-attachment`

```jsx
<z-file-attachment
  name={string}
  size={string}
  type="image | video | audio | archive | sheet | code"
  href={string}
  is-hidden
/>
```

---

## Effects

### `z-aura`

```jsx
<z-aura
  kind="dual | rainbow | holo | gold | silver | glow | default"   // default: default
  size="xs | sm | md | lg | xl"   // default: md
  is-hidden
/>
```

### `z-marquee`

```jsx
<z-marquee
  duration={number}   // default: 40
  gap={string}
  direction="horizontal | vertical"   // default: horizontal
  is-reversed
  does-pause-on-hover
  has-fade
  is-hidden
/>
```

### `z-pointer-follow`

```jsx
<z-pointer-follow
  label={string}
  accent="sub | neutral"
  is-fixed
  is-hidden
/>
```

### `z-progressive-blur`

```jsx
<z-progressive-blur
  direction="top | bottom | left | right"   // default: bottom
  strength="md | sm | lg | xl"   // default: md
  reach={number}   // default: 40
  radius={string}
  is-hidden
/>
```

---

## Music

### `z-knob`

```jsx
<z-knob
  value={number}   // default: min
  min={number}   // default: 0
  max={number}   // default: 100
  step={number}   // default: 1
  default-value={number}
  label={string}
  value-prefix={string}
  value-suffix={string}
  accent="dom | sub | success | warning | error"
  size="sm | md | lg"
  does-show-value
  is-glowing
  is-disabled
  is-hidden
  oninput={(event) => event.detail}   // { value: number }
  onchange={(event) => event.detail}   // { value: number }
/>
```

### `z-pattern-roll`

```jsx
<z-pattern-roll
  signals={Array}
  tones={number}   // default: 8
  tone-margin={number}   // default: 3
  chord-size={number}
  length={number}   // default: 4
  beats-per-bar={number}   // default: 4
  snap={number}   // default: 0.25
  beat-width={number}   // default: 48
  row-height={number}   // default: 22
  mode="select | draw"   // default: select
  default-velocity={number}   // default: 100
  default-octave={number}   // default: 0
  playhead={number}
  has-toolbar
  has-keyboard
  is-disabled
  is-hidden
  onchange={(event) => event.detail}   // { signals: any[] }
  onselect={(event) => event.detail}   // { ids: number[] }
/>
```

### `z-piano-roll`

```jsx
<z-piano-roll
  notes={Array}
  bars={number}
  beats-per-bar={number}   // default: 4
  snap={number}
  beat-width={number}
  row-height={number}
  min-pitch={number}
  max-pitch={number}
  mode="select | draw"   // default: select
  fold={string}
  scale={string}
  root={number}
  default-velocity={number}   // default: 100
  playhead={number}
  has-toolbar
  has-keyboard
  is-disabled
  is-hidden
  onchange={(event) => event.detail}   // { notes: any[] }
  onselect={(event) => event.detail}   // { ids: number[] }
/>
```

---

## Specialized

### `z-carousel`

```jsx
<z-carousel
  autoplay={number}
  accent="sub"
  does-loop
  is-hidden
  onchange={(event) => event.detail}   // { index: number }
/>
```

### `z-chart`

```jsx
<z-chart
  data={Array}
  type="bar | area | line"   // default: bar
  accent="sub | success | chart-1"   // default: chart-1
  height={string}   // default: 240px
  does-show-grid
  has-labels
  is-hidden
/>
```

### `z-citation`

```jsx
<z-citation
  index={number}
  label={string}
  href={string}
  is-hidden
  onactivate={(event) => event.detail}   // { index: number; href?: string }
/>
```

### `z-code-block`

```jsx
<z-code-block
  code={string}
  language={string}
  filename={string}
  highlight-lines={string}
  added-lines={string}
  removed-lines={string}
  focus-lines={string}
  accent="dom | sub"   // default: dom
  has-line-numbers
  has-copy
  is-hidden
  oncopy={(event) => event.detail}   // —
/>
```

### `z-empty-state`

```jsx
<z-empty-state
  heading={string}
  description={string}
  accent="dom | sub"   // default: dom
  is-bordered
  is-hidden
/>
```

### `z-markdown`

```jsx
<z-markdown
  content={string}
  is-streaming
  does-allow-html
  does-highlight
  has-heading-anchors
  is-hidden
  onlinkclick={(event) => event.detail}   // { href: string }
/>
```

### `z-post-meta`

```jsx
<z-post-meta
  name={string}
  avatar-src={string}
  date={string}
  tags={Array}
  ontagclick={(event) => event.detail}   // { tag: string }
/>
```

### `z-relative-time`

```jsx
<z-relative-time
  datetime={string}
  format={string}
  threshold={number}
  refresh={number}   // default: 60000
  is-hidden
/>
```

### `z-scroll-area`

```jsx
<z-scroll-area
  max-height={string}
  height={string}
  direction="horizontal | vertical"
  is-hidden
/>
```

### `z-sources`

```jsx
<z-sources
  sources={Array}
  label={string}   // default: Sources
  columns={number}
  is-hidden
  onselect={(event) => event.detail}   // { index: number; url?: string }
/>
```

### `z-streaming-text`

```jsx
<z-streaming-text
  content={string}
  speed={number}   // default: 40
  is-streaming
  is-typewriter
  is-markdown
  is-hidden
/>
```

### `z-suggestion-chips`

```jsx
<z-suggestion-chips
  suggestions={Array}
  does-show-arrow
  is-hidden
  onselect={(event) => event.detail}   // { value: string; label: string }
/>
```

### `z-terminal`

```jsx
<z-terminal
  code={string}
  shell={string}
  cwd={string}
  prompt={string}
  copy-lines={string}   // default: commands
  accent="dom | sub"   // default: dom
  width={string}
  height={string}
  max-height={string}
  lines={Array}
  type-speed={number}   // default: 55
  line-delay={number}   // default: 380
  fade-duration={number}   // default: 240
  loop-delay={number}   // default: 2200
  does-animate
  does-start-on-view
  does-loop
  has-replay
  does-auto-scroll
  is-hidden
  oncopy={(event) => event.detail}   // string
  ondone={(event) => event.detail}   // —
/>
```

---

## Uncategorised

### `z-canvas-item`

```jsx
<z-canvas-item
  x={number}
  y={number}
  width={number}
  height={number}
  rotation={number}
/>
```

### `z-comment-gutter-icon`

```jsx
<z-comment-gutter-icon
  thread-id={string}
  anchor-rect={string}
  count={number}
  is-active
  is-open
  onopen={(event) => event.detail}   // { threadId: string }
  onselect={(event) => event.detail}   // { threadId: string }
  onreply={(event) => event.detail}   // { threadId: string; text: string }
  onresolve={(event) => event.detail}   // { threadId: string }
  onclose={(event) => event.detail}   // —
/>
```

### `z-comment-mark`

```jsx
<z-comment-mark
  thread-id={string}
  is-active
  is-resolved
  onactivate={(event) => event.detail}   // { threadId: string }
  onopen={(event) => event.detail}   // { threadId: string }
  onselect={(event) => event.detail}   // { threadId: string }
  onreply={(event) => event.detail}   // { threadId: string; text: string }
  onresolve={(event) => event.detail}   // { threadId: string }
  onclose={(event) => event.detail}   // —
/>
```

### `z-comment-thread-panel`

```jsx
<z-comment-thread-panel
  threads={Array}
  active-thread-id={string}
  is-hidden
  onselect={(event) => event.detail}   // { threadId: string }
  onreply={(event) => event.detail}   // { threadId: string; text: string }
  onresolve={(event) => event.detail}   // { threadId: string }
  onclose={(event) => event.detail}   // —
/>
```

### `z-copy-button`

```jsx
<z-copy-button
  value={string}
  label={string}
  copied-label={string}
  kind="ghost | icon"
  size="sm | md"
  is-disabled
  is-hidden
  oncopy={(event) => event.detail}   // { value: string }
  onerror={(event) => event.detail}   // { error: Error | null }
/>
```

### `z-docs-shell`

```jsx
<z-docs-shell
  nav-width={string}
  toc-width={string}
  content-width={string}
  is-nav-open
  is-hidden
  onnavClose={(event) => event.detail}   // —
/>
```

### `z-draggable`

```jsx
<z-draggable
  type={string}
  data={Object}
  group={string}
  handle={string}
  is-disabled
  ondragstart={(event) => event.detail}   // { type: string; data: unknown }
  ondragmove={(event) => event.detail}   // { x: number; y: number; over: Element | null }
  ondragend={(event) => event.detail}   // { dropped: boolean; target: Element | null }
  ondragenter={(event) => event.detail}   // unknown
  ondragover={(event) => event.detail}   // unknown
  ondragleave={(event) => event.detail}   // unknown
  ondropitem={(event) => event.detail}   // { data: unknown; type: string; source: Element; x: number; y: number }
/>
```

### `z-drop-indicator`

```jsx
<z-drop-indicator
  anchor-rect={string}
  orientation="vertical"
  is-open
/>
```

### `z-drop-target`

```jsx
<z-drop-target
  accept={string}
  group={string}
  is-disabled
  ondragenter={(event) => event.detail}   // unknown
  ondragover={(event) => event.detail}   // unknown
  ondragleave={(event) => event.detail}   // unknown
  ondropitem={(event) => event.detail}   // { data: unknown; type: string; source: Element; x: number; y: number }
/>
```

### `z-example`

```jsx
<z-example
  heading={string}
  description={string}
  snippets={Array}
  layout="center | start | stack | fill"
  is-source-open
  has-background-grid
  is-resizable
  is-hidden
  oncopy={(event) => event.detail}   // { code: string; label: string }
/>
```

### `z-nav-tree`

```jsx
<z-nav-tree
  items={Array}
  route={string}
  label={string}
  storage-key={string}
  filter-placeholder={string}
  is-collapsed-by-default
  is-filtered
  is-hidden
  onnavigate={(event) => event.detail}   // { route: string; node: NavNodeT }
/>
```

### `z-panel-handle`

```jsx
<z-panel-handle
  is-disabled
  ondragging={(event) => event.detail}   // { isDragging: boolean }
/>
```

### `z-step`

```jsx
<z-step
  heading={string}
  index={number}
  state="done | current | pending"
  is-last
  is-hidden
/>
```

### `z-table-axis-handle`

```jsx
<z-table-axis-handle
  axis="column"
  anchor-rect={string}
  is-open
  is-selected
  onselect={(event) => event.detail}   // —
  oninsertafter={(event) => event.detail}   // —
  onremove={(event) => event.detail}   // —
/>
```
