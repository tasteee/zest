# Zest element API reference

**114 elements.** Every one, as you would write it. Generated from
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
- [Layout](#layout) — 7
- [Buttons & actions](#buttons--actions) — 9
- [Forms](#forms) — 16
- [Navigation & disclosure](#navigation--disclosure) — 8
- [Overlays](#overlays) — 11
- [Data display](#data-display) — 13
- [Canvas, panels & docs](#canvas-panels--docs) — 3
- [Text editor](#text-editor) — 10
- [Attachments](#attachments) — 4
- [Effects](#effects) — 2
- [Music](#music) — 3
- [Specialized](#specialized) — 7
- [Uncategorised](#uncategorised) — 9

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
  inline
  does-wrap
  does-wrap-text
  is-full-width
  is-full-height
/>
```

### `z-card`

```jsx
<z-card
  is-reactive
/>
```

### `z-display`

```jsx
<z-display
  size="sm | md | lg | xl"   // default: lg
  color="dom | sub | neutral | strong | muted | success | warning | error"   // default: neutral
  weight={string}   // default: 700
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
  color="dom | sub | neutral | strong | muted | success | warning | error"   // default: neutral
  weight={string}   // default: 700
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
  color="dom | sub | neutral | strong | muted | success | warning | error"
  weight={string}
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
  tag={string}   // default: span
  is-hidden
/>
```

### `z-line`

```jsx
<z-line
  vertical
/>
```

### `z-separator`

```jsx
<z-separator
  label={string}
  is-hidden
/>
```

### `z-subheading`

```jsx
<z-subheading
  size="xs | sm | md | lg | xl"   // default: md
  color="dom | sub | neutral | strong | muted | success | warning | error"   // default: neutral
  weight={string}   // default: 600
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
  color="dom | sub | neutral | strong | muted | success | warning | error"   // default: neutral
  weight={string}
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
  kind="outline | ghost | soft | plain | filled"
  radius={string}   // default: lg
  interactive
  is-full-width
/>
```

### `z-swap`

```jsx
<z-swap
  kind="stack | beside"   // default: stack
  effect="fade | rotate | flip"   // default: fade
  label={string}
  has-ghost
  is-active
  disabled
  is-hidden
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
  disabled
  is-loading
  is-full-width
  is-hidden
/>
```

### `z-button-group`

```jsx
<z-button-group
  vertical
/>
```

### `z-link`

```jsx
<z-link
  href={string}
  target={string}
  label={string}
  size="sm | md | lg"   // default: md
  color="dom | sub | neutral"   // default: dom
  underline="hover | always | none"   // default: hover
  is-external
  is-block
  disabled
  is-hidden
/>
```

### `z-theme-switcher`

```jsx
<z-theme-switcher
  kind="segmented | icon"   // default: segmented
  accent="dom | sub"
  size={string}
  is-icon-only
  is-hidden
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
  disabled
  is-hidden
/>
```

### `z-toggle-group`

```jsx
<z-toggle-group
  accent={string}
  size={string}
  kind={string}
  direction="horizontal | vertical"   // default: horizontal
  type="single | multiple"   // default: single
  is-icon
  is-hidden
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
  disabled
  is-hidden
/>
```

### `z-toolbar`

```jsx
<z-toolbar
  size="sm | md | lg"   // default: md
  overflow="scroll | wrap | menu"
  disabled
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
  disabled
  is-hidden
/>
```

### `z-color-picker`

```jsx
<z-color-picker
  value={string}
  label={string}
  accent="dom | sub"   // default: dom
  disabled
  is-hidden
/>
```

### `z-combobox`

```jsx
<z-combobox
  value={string}
  label={string}
  placeholder={string}
  size={string}
  accent="dom | sub"   // default: dom
  invalid
  disabled
  inline
  is-hidden
/>
```

### `z-field`

```jsx
<z-field
  label={string}
  description={string}
  error={string}   // default: description
  size={string}
  is-required
  is-label-hidden
  is-label-reserved
/>
```

### `z-filter`

```jsx
<z-filter
  accent="dom | sub"   // default: dom
  size="sm | md"   // default: md
  label={string}
  reset-label={string}   // default: Clear
  is-drilldown
  disabled
  is-hidden
/>
```

### `z-input`

```jsx
<z-input
  value={string}
  label={string}
  type={string}   // default: text
  placeholder={string}
  name={string}
  autocomplete={string}
  inputmode={string}
  size="sm | md | lg"   // default: md
  accent="dom | sub"   // default: dom
  is-focused
  invalid
  disabled
  is-readonly
  is-required
  inline
  is-hidden
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
  invalid
  disabled
  is-hidden
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
  invalid
  disabled
  is-readonly
  is-required
  has-stepper-buttons
  is-full-width
  inline
  is-hidden
/>
```

### `z-radio`

```jsx
<z-radio
  accent="dom | sub"   // default: dom
  value={string}
  is-checked
  disabled
  is-hidden
/>
```

### `z-radio-group`

```jsx
<z-radio-group
  value={string}
  label={string}
  direction="horizontal | vertical"   // default: vertical
  accent="dom | sub | neutral | success | warning | error"   // default: neutral
  is-hidden
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
  show-value
  disabled
  is-hidden
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
  size="sm | md | lg"   // default: md
  accent="dom | sub"   // default: dom
  invalid
  disabled
  inline
  is-hidden
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
  disabled
  is-hidden
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
  disabled
  is-block
  is-hidden
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
  invalid
  disabled
  is-readonly
  is-required
  is-auto-resize
  is-hidden
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
  max={number}
  accent={string}   // default: dom
  is-hidden
/>
```

### `z-collapsible`

```jsx
<z-collapsible
  value={string}
  label={string}
  accent="dom | sub"   // default: dom
  is-open
  disabled
  is-hidden
/>
```

### `z-context-menu`

```jsx
<z-context-menu
  accent="dom | sub"   // default: dom
  disabled
/>
```

### `z-menu`

```jsx
<z-menu
  align="start | end"   // default: start
  accent="dom | sub"   // default: dom
  is-hidden
/>
```

### `z-nav-menu`

```jsx
<z-nav-menu
  value={string}
  accent={string}   // default: dom
  is-hidden
/>
```

### `z-sidebar`

```jsx
<z-sidebar
  value={string}
  accent={string}   // default: dom
  is-collapsed
  is-docked
  is-hidden
/>
```

### `z-tabs`

```jsx
<z-tabs
  value={string}
  accent="dom | sub"   // default: dom
  is-fitted
  is-hidden
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
  placeholder={string}
  empty-text={string}
  is-open
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
  disabled
/>
```

### `z-drawer`

```jsx
<z-drawer
  heading={string}
  description={string}
  is-open
  is-static
  disabled
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
  disabled
  is-hidden
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
  disabled
/>
```

### `z-toast`

```jsx
<z-toast
  position="bottom-end | bottom-start | bottom-center | top-end | top-start | top-center"   // default: bottom-end
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
  disabled
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
  accent="dom | sub | neutral | success | warning | error"   // default: neutral
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
  selectable
  selected
  removable
  disabled
  is-hidden
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
  inline
  is-hidden
/>
```

### `z-sortable`

```jsx
<z-sortable
  axis="y | x"   // default: y
  handle={string}
  disabled
/>
```

### `z-stat`

```jsx
<z-stat
  value={string}
  label={string}
  size="xs | sm | md | lg | xl | xxl"   // default: xs
  label-size="sm | xxl | xl | lg | md | xs"   // default: sm
  color="dom | sub | neutral | strong | muted | success | warning | error"
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
  empty-label={string}
  is-striped
  is-clickable
  is-hidden
/>
```

### `z-tree`

```jsx
<z-tree
  selection="single | multiple | none"   // default: single
  does-show-guides
  is-hidden
/>
```

---

## Canvas, panels & docs

### `z-editor-canvas`

```jsx
<z-editor-canvas
  zoom={number}   // default: 1
  pan-x={number}   // default: 0
  pan-y={number}
  min-zoom={number}   // default: 0.1
  max-zoom={number}
  zoom-speed={number}   // default: 1
  grid="none | dots | lines"
  grid-size={number}   // default: 24
  pan-button="auto | middle | space | left"   // default: auto
  wheel="zoom | pan"   // default: zoom
  disabled
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

### `z-resizable-panels`

```jsx
<z-resizable-panels
  direction="horizontal | vertical"   // default: horizontal
  auto-save-id={string}
  keyboard-step={number}   // default: 5
  disabled
/>
```

---

## Text editor

### `z-bubble-menu`

```jsx
<z-bubble-menu
  kind="link | image | table-cell"   // default: link
  anchor-rect={string}
  placement="top | bottom | left | right | -start | -end"   // default: top
  offset={number}   // default: 10
  url={string}
  align={string}
  is-open
  has-caption
/>
```

### `z-copy-button`

```jsx
<z-copy-button
  value={string}
  label={string}   // default: Copy
  copied-label={string}   // default: Copied
  kind="ghost | icon"   // default: ghost
  size="sm | md"   // default: md
  disabled
  is-hidden
/>
```

### `z-drag-handle`

```jsx
<z-drag-handle
  label={string}
  disabled
/>
```

### `z-format-toolbar`

```jsx
<z-format-toolbar
  heading-value={string}
  heading-placeholder={string}
  label={string}   // default: Formatting
/>
```

### `z-gutter-handle`

```jsx
<z-gutter-handle
  anchor-rect={string}
  width={number}
  is-open
/>
```

### `z-mention-popover`

```jsx
<z-mention-popover
  trigger={string}
  source={string}
  query={string}
  debounce-ms={number}
  anchor-rect={string}
  placement="top | bottom | left | right | -start | -end | bottom-start"   // default: bottom-start
  offset={number}   // default: 8
  empty-text={string}
  is-open
/>
```

### `z-selection-toolbar`

```jsx
<z-selection-toolbar
  anchor-rect={string}
  placement="top | bottom | left | right | -start | -end"   // default: top
  offset={number}   // default: 10
  label={string}
  is-open
/>
```

### `z-slash-menu`

```jsx
<z-slash-menu
  query={string}
  anchor-rect={string}
  placement="top | bottom | left | right | -start | -end | bottom-start"   // default: bottom-start
  offset={number}   // default: 8
  empty-text={string}
  is-open
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
  anchor-rect={string}
  placement="top | bottom | left | right | -start | -end"   // default: top
  offset={number}   // default: 10
  label={string}
  is-open
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
/>
```

### `z-dropzone`

```jsx
<z-dropzone
  accept={string}
  max-size={number}
  max-files={number}
  is-multiple
  disabled
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
  size={string}
  does-show-value
  is-glowing
  disabled
  is-hidden
/>
```

### `z-pattern-roll`

```jsx
<z-pattern-roll
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
  disabled
  is-hidden
/>
```

### `z-piano-roll`

```jsx
<z-piano-roll
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
  disabled
  is-hidden
/>
```

---

## Specialized

### `z-carousel`

```jsx
<z-carousel
  autoplay={number}
  accent={string}
  does-loop
  is-hidden
/>
```

### `z-code-block`

```jsx
<z-code-block
  code={string}
  language={string}
  filename={string}
  label={string}
  added-lines={string}
  removed-lines={string}
  focus-lines={string}
  accent={string}   // default: dom
  line-numbers
  highlight
  has-copy
  is-hidden
/>
```

### `z-empty-state`

```jsx
<z-empty-state
  heading={string}
  description={string}
  accent="dom | sub | neutral | success | warning | error"   // default: neutral
  is-bordered
  is-hidden
/>
```

### `z-relative-time`

```jsx
<z-relative-time
  datetime={string}
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

### `z-suggestion-chips`

```jsx
<z-suggestion-chips
  does-show-arrow
  is-hidden
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
  accent={string}   // default: dom
  width={string}
  height={string}
  max-height={string}
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
/>
```

### `z-comment-mark`

```jsx
<z-comment-mark
  thread-id={string}
  is-active
  is-resolved
/>
```

### `z-comment-thread-panel`

```jsx
<z-comment-thread-panel
  active-thread-id={string}
  is-hidden
/>
```

### `z-draggable`

```jsx
<z-draggable
  type={string}
  group={string}
  handle={string}
  disabled
/>
```

### `z-drop-indicator`

```jsx
<z-drop-indicator
  anchor-rect={string}
  orientation={string}
  is-open
/>
```

### `z-drop-target`

```jsx
<z-drop-target
  accept={string}
  group={string}
  disabled
/>
```

### `z-panel-handle`

```jsx
<z-panel-handle
  disabled
/>
```

### `z-table-axis-handle`

```jsx
<z-table-axis-handle
  axis={string}
  anchor-rect={string}
  is-open
  selected
/>
```
