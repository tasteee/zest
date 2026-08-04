# z-toolbar

A horizontal (or vertical) action strip with real toolbar semantics:
`role="toolbar"` plus roving tabindex, so the whole bar is a single tab stop
and arrow keys (Home/End) move focus across its controls. Holds slotted
[z-button](z-button.md) / [z-toggle](z-toggle.md) / `z-toolbar-group`,
divided by [z-separator](../foundation/z-separator.md).

```html
<z-toolbar>
  <z-button kind="ghost">Bold</z-button>
  <z-button kind="ghost">Italic</z-button>
  <z-separator direction="vertical"></z-separator>
  <z-button kind="ghost">Link</z-button>
</z-toolbar>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `direction` | `horizontal` `vertical` | `horizontal` | layout axis and arrow-key direction |
| `size` | `small` `medium` `large` | `medium` | control gap between items |
| `overflow` | `scroll` `does-wrap` `menu` | — | how to handle a too-narrow bar (`menu` — collapsing extras into a trailing "⋯" — is not implemented yet) |
| `is-disabled` | boolean | — | disable the whole toolbar |

## Slots

- _(default)_ — toolbar controls.
- `overflow` — content pinned to the trailing edge (margin-left: auto).

## Notes

- Roving tabindex is recalculated on `focusin` and on any child mutation, so
  dynamically added/removed controls stay keyboard-navigable.
- Used by the chat composer, message hover-actions, dashboard page headers,
  and editor tool strips.
