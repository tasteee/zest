# z-dock

A macOS-style dock. Tracks the pointer over the strip and pushes a per-item
`--dock-scale` magnification onto each slotted [z-dock-item](z-dock-item.md),
scaled by linear falloff from cursor distance.

```html
<z-dock is-floating magnification="1.1" distance="96">
  <z-dock-item label="Finder"><svg>…</svg></z-dock-item>
  <z-dock-item label="Mail" is-active><svg>…</svg></z-dock-item>
</z-dock>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `magnification` | number | `1.08` | max scale factor (clamped to `1`–`1.12`) |
| `distance` | number (px) | `96` | pointer falloff reach |
| `item-size` | length | `3rem` | base item size, read by children via `--dock-item-size` |
| `gap` | size token / length | `0.75rem` | gap between items |
| `is-floating` | boolean | — | dock to the bottom-center of the viewport (fixed position) |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — [z-dock-item](z-dock-item.md) children.

## Notes

- The parent owns the pointer-distance physics; each item just renders
  `transform: scale(var(--dock-scale))` — see z-dock-item.
- Magnification is capped per-item so a growing neighbor never overlaps into
  the adjacent item's own layout gap.
