# z-chassis

A device-like application chassis. The outer body (bezel + rail) is a lighter
surface, like the shell of a device; the main content sits in a darker, inset
"screen" with its own border — where a routed view renders.

```html
<z-chassis rail-width="14rem" does-expand-on-hover>
  <div slot="sidebar">…logo + nav rows…</div>
  <div slot="sidebar-footer">…avatar…</div>
  …main / routed content (the screen)…
</z-chassis>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `rail-width` | length | `4.25rem` | expanded rail width |
| `rail-collapsed-width` | length | `3.5rem` | collapsed rail width (with `does-expand-on-hover`) |
| `bezel` | length | `0.75rem` | gap between rail and screen |
| `frame` | length | `0.375rem` | outer padding around the chassis edges |
| `rail-side` | `left` `right` | `left` | which side the rail sits on |
| `does-expand-on-hover` | boolean | — | collapse the rail to a slim width, expanding on hover/focus-within |
| `is-hidden` | boolean | — | hide |

## Slots

- `sidebar` — rail content, top-aligned.
- `sidebar-footer` — rail content, bottom-aligned.
- _(default)_ — the screen content.

## Notes

- Retheme via `--chassis-body` / `--chassis-screen` / `--chassis-border` /
  `--chassis-radius` / `--chassis-rail-width` / `--chassis-bezel` /
  `--chassis-frame` custom properties.
- Exposes `part="rail"` / `part="screen"` for external styling.
- While collapsed, slotted nav labels can key off the inherited
  `--chassis-label-opacity` custom property (`0` collapsed, `1` expanded) to
  hide themselves.
