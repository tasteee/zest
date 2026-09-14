# Zest element API reference

**113 elements.** Every one, as you would write it. Generated from
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

- [Overlays](#overlays) — 11
- [Data display](#data-display) — 14
- [Canvas, panels & docs](#canvas-panels--docs) — 2
- [Text editor](#text-editor) — 10
- [Attachments](#attachments) — 4
- [Effects](#effects) — 2
- [Music](#music) — 2
- [Specialized](#specialized) — 3
- [Uncategorised](#uncategorised) — 34

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

### `z-command`

```jsx
<z-command
  placeholder={string}
  empty-text={string}
  is-open
/>
```

### `z-context-menu`

```jsx
<z-context-menu
  accent="dom | sub"   // default: dom
  is-disabled
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
  does-hide-arrow
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
  is-selected
  removable
  is-disabled
  is-hidden
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

### `z-suggestion-chips`

```jsx
<z-suggestion-chips
  does-show-arrow
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
  is-disabled
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
  is-disabled
  is-hidden
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
  is-disabled
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
  is-disabled
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
  is-disabled
  is-hidden
/>
```

---

## Specialized

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

### `z-relative-time`

```jsx
<z-relative-time
  datetime={string}
  threshold={number}
  refresh={number}   // default: 60000
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

### `z-button`

```jsx
<z-button
  size={string}
  kind={string}
  accent={string}
  label={string}
  type={string}
  is-disabled
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

### `z-checkbox`

```jsx
<z-checkbox
  size={string}
  accent={string}
  name={string}
  value={string}
  is-checked
  is-disabled
  is-hidden
/>
```

### `z-color-picker`

```jsx
<z-color-picker
  value={string}
  label={string}
  accent={string}
  is-disabled
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
  accent={string}
  is-invalid
  is-disabled
  inline
  is-hidden
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
  is-disabled
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
  is-disabled
/>
```

### `z-field`

```jsx
<z-field
  label={string}
  description={string}
  error={string}
  size={string}
  is-required
  is-label-hidden
  is-label-reserved
/>
```

### `z-filter`

```jsx
<z-filter
  accent={string}
  size={string}
  label={string}
  reset-label={string}
  is-drilldown
  is-disabled
  is-hidden
/>
```

### `z-input`

```jsx
<z-input
  value={string}
  label={string}
  type={string}
  placeholder={string}
  name={string}
  autocomplete={string}
  inputmode={string}
  size={string}
  accent={string}
  is-focused
  is-invalid
  is-disabled
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
  length={number}
  size={string}
  accent={string}
  is-numeric
  is-invalid
  is-disabled
  is-hidden
/>
```

### `z-number-input`

```jsx
<z-number-input
  value={number}
  min={number}
  max={number}
  step={number}
  label={string}
  name={string}
  placeholder={string}
  size={string}
  accent={string}
  is-invalid
  is-disabled
  is-readonly
  is-required
  has-stepper-buttons
  is-full-width
  inline
  is-hidden
/>
```

### `z-panel-handle`

```jsx
<z-panel-handle
  is-disabled
/>
```

### `z-radio`

```jsx
<z-radio
  accent={string}
  value={string}
  is-checked
  is-disabled
  is-hidden
/>
```

### `z-radio-group`

```jsx
<z-radio-group
  value={string}
  label={string}
  direction={string}
  accent={string}
  is-hidden
/>
```

### `z-range`

```jsx
<z-range
  min={number}
  max={number}
  step={number}
  label={string}
  value-prefix={string}
  value-suffix={string}
  show-value
  is-disabled
  is-hidden
/>
```

### `z-range-handle`

```jsx
<z-range-handle
  value={number}
  min={number}
  max={number}
  step={number}
  accent={string}
  label={string}
/>
```

### `z-select`

```jsx
<z-select
  value={string}
  label={string}
  placeholder={string}
  size={string}
  accent={string}
  is-invalid
  is-disabled
  inline
  is-hidden
/>
```

### `z-slider`

```jsx
<z-slider
  value={number}
  min={number}
  max={number}
  step={number}
  name={string}
  label={string}
  value-prefix={string}
  value-suffix={string}
  accent={string}
  does-show-value
  is-disabled
  is-hidden
/>
```

### `z-swap`

```jsx
<z-swap
  kind={string}
  effect={string}
  label={string}
  has-ghost
  is-active
  is-disabled
  is-hidden
/>
```

### `z-switch`

```jsx
<z-switch
  size={string}
  accent={string}
  name={string}
  value={string}
  is-checked
  is-disabled
  is-full-width
  is-hidden
/>
```

### `z-table-axis-handle`

```jsx
<z-table-axis-handle
  axis={string}
  anchor-rect={string}
  is-open
  is-selected
/>
```

### `z-textarea`

```jsx
<z-textarea
  value={string}
  label={string}
  placeholder={string}
  name={string}
  rows={number}
  size={string}
  accent={string}
  is-focused
  is-invalid
  is-disabled
  is-readonly
  is-required
  is-auto-resize
  is-hidden
/>
```

### `z-theme-switcher`

```jsx
<z-theme-switcher
  kind={string}
  accent={string}
  size={string}
  is-icon-only
  is-hidden
/>
```

### `z-toggle-button`

```jsx
<z-toggle-button
  size={string}
  kind={string}
  accent={string}
  is-icon
  is-pressed
  is-disabled
  is-hidden
/>
```

### `z-toggle-button-group`

```jsx
<z-toggle-button-group
  accent={string}
  size={string}
  kind={string}
  direction={string}
  is-icon
  is-multiple
  is-hidden
/>
```

### `z-toggle-button-group-item`

```jsx
<z-toggle-button-group-item
  accent={string}
  size={string}
  kind={string}
  value={string}
  is-icon
  is-pressed
  is-disabled
  is-hidden
/>
```

### `z-toolbar`

```jsx
<z-toolbar
  size={string}
  overflow={string}
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
