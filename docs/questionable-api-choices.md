# Questionable API choices

Found while auditing every component's docs against its actual implementation.
Nothing here has been changed in the component source — these are flagged for
discussion. Linked from the specific docs where they surfaced.

## Dead / unwired props

Declared in the component's prop schema (and therefore a real attribute
someone can set) but with no effect in the current implementation. A first
pass (below) has been wired up or removed. What's left needs a product
decision on the intended semantics before implementing, not just mechanical
wiring — noted inline in each component's doc.

- **z-editor-canvas** — `snap` is declared but no gesture path rounds to it.
  There's no drag-to-move for `z-canvas-item` today (only the canvas itself
  pans/zooms), so it's unclear whether this should snap panning to the grid,
  snap zoom levels, or snap item positions once item-dragging exists — worth
  deciding the intended behavior before wiring it up.
- **z-relative-time** — `format` is declared but the display format isn't
  actually customizable; the internal formatter is hardcoded. Needs a token
  syntax decided (e.g. `long`/`short`, or a strftime-style pattern) before
  it can be wired up.
- **z-sortable** — `group` (cross-list dragging) and `animation` (FLIP
  easing) are declared but not implemented yet — self-documented in the
  component as future enhancements, not accidental omissions.

Resolved in this pass: z-textarea `size`, z-toolbar `size`, z-file-attachment
`type`, z-conversation-item `is-pinned`, z-message-bubble `tone`, z-markdown
`heading-anchors` (and its unused `copy` event, removed — z-code-block's own
`copy` event already bubbles through), and z-virtual-list `keyFn`.

## Inconsistent variant API: z-toggle-group vs. everything else

Every other component with a color/size/treatment variant uses a single
valued attribute: `tone="primary"`, `size="small"`, `kind="ghost"` (z-button,
z-badge, z-toggle, z-avatar, etc.). `z-toggle-group` / `z-toggle-group-item`
instead use one boolean flag per value — `is-purple` / `is-pink` / `is-neutral`,
`is-small` / `is-medium` / `is-large`, `is-ghost` / `is-outlined` — via a
shared `toggleVariantProps` object that only these two components use.

This is two inconsistencies stacked: a different *mechanism* (boolean flags
vs. an enum attribute) and a different *vocabulary* (`purple`/`pink` instead
of the `primary`/`secondary` tone names used by the rest of the tone
system, and no `success`/`warning`/`danger` at all). Worth deciding whether
to bring these two in line with `tone`/`kind`/`size`, or whether the group
genuinely needs the boolean-flag shape (e.g. because CSS custom properties
are set per-flag for children to inherit) and the rest of the docs should
just call that out as intentional.

## z-range's authoring pattern is the odd one out

Every other multi-value component in the library (z-select, z-combobox,
z-menu, z-tabs, z-tree, z-sidebar, z-nav-menu, z-command, …) takes its data as
a JS array property: `el.options = [...]`. `z-range` is the exception — its
two values are configured by putting two `<z-range-handle>` custom elements
in its default slot, each carrying its own `value`/`min`/`max`/`step`/`tone`
attributes. That's more ceremony to build dynamically (constructing DOM
nodes instead of an array) and it's the only place in the library that uses
"children as config" for a form control's values. Might be intentional (it
mirrors the shipped z-panel/z-panel-handle pattern), but worth confirming
that's the desired precedent for any future dual-value control.

## Three different drag paradigms

`z-drag-drop` (a custom pointer-based drag/drop registry for arbitrary
cross-area drags), `z-sortable` (pointer-based reordering of direct
children), and `z-dropzone` (native HTML5 drag events, because that's the
only way to receive OS file drops) all exist side by side, each solving a
different problem. That's likely the right call — they're not actually
redundant — but the three are easy to reach for interchangeably by name
alone. Might be worth a short "which drag component do I want" note in the
docs README so people don't reach for `z-drag-drop` when they just want
`z-sortable`, or vice versa.
