# Questionable API choices

This records intentional design questions that remain after the 0.8 API
audit. Dead props found during the audit were removed rather than shipped as
placeholders: `z-editor-canvas.snap`, `z-relative-time.format`, and
`z-sortable.group` / `animation`. Variant APIs now use the shared `accent`,
`kind`, `size`, and `direction` vocabularies.

## z-range's authoring pattern is the odd one out

Every other multi-value component in the library (z-select, z-combobox,
z-menu, z-tabs, z-tree, z-sidebar, z-nav-menu, z-command, …) takes its data as
a JS array property: `el.options = [...]`. `z-range` is the exception — its
two values are configured by putting two `<z-range-handle>` custom elements
in its default slot, each carrying its own `value`/`min`/`max`/`step`/`accent`
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
