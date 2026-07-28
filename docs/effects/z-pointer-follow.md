# z-pointer-follow

A custom cursor that trails the pointer. Two modes: **scoped** (default) wraps
slotted content and tracks the pointer only within its own bounding box,
hiding the native cursor over that region — self-contained and composable,
like [z-tooltip](../overlays/z-tooltip.md). **Fixed** is a page-level singleton with no
children: it listens on `window` and hides the native cursor everywhere.

```html
<!-- scoped: wraps a region -->
<z-pointer-follow label="Draw" tone="primary">
  <div class="canvas">…</div>
</z-pointer-follow>

<!-- fixed: one page-level instance, no children -->
<z-pointer-follow fixed tone="secondary"></z-pointer-follow>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `tone` | `secondary` `neutral` | primary/purple | dot and tag color |
| `fixed` | boolean | — | page-level mode instead of scoped-to-slot |
| `label` | string | — | optional trailing text tag next to the dot |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — wrapped content (scoped mode only; ignored when `fixed`).

## Notes

- In `fixed` mode, `cursor: none` is toggled on `document.body` for as long
  as the element is connected (cleaned up on disconnect) — the same pattern a
  modal uses for scroll locking.
