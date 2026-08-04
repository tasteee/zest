# z-aura

A rotating border-light effect that wraps any element (a button, card,
avatar, image) in an animated glowing frame. Two stacked conic-gradient
layers spin behind the slotted content: a crisp ring at the edge and a
blurred bloom that bleeds outward.

```html
<z-aura kind="gold" size="lg">
  <z-button accent="dom">Upgrade</z-button>
</z-aura>

<!-- round content needs a matching frame radius -->
<z-aura kind="glow" style="--aura-radius: 999px">
  <z-avatar name="Ada Lovelace"></z-avatar>
</z-aura>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `kind` | `default` `dual` `rainbow` `holo` `gold` `silver` `glow` | `default` | color palette / comet pattern (`glow` drops the crisp ring for a soft pulsing halo) |
| `size` | `xs` `sm` `md` `lg` `xl` | `md` | frame thickness and bloom spread |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — the wrapped content. Keeps its own background — only the
  frame is added around it.

## CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--aura-color` | `var(--neon-purple)` | accent the ring and bloom are built from |
| `--aura-radius` | `var(--radius-lg)` | corner radius of the frame |
| `--aura-duration` | `4s` | time for one full rotation (or one pulse cycle on `glow`) |

## Notes

- The frame does not inherit its content's radius — it can't read into the
  slotted element. Match them by hand with `--aura-radius`, or the frame's
  corners will show past round content. `999px` for a circle,
  `var(--radius-md)` for a card, and so on.
- `--aura-size` and `--aura-blur` are set by `size`; override them directly
  only when a preset doesn't fit.
- Respects `prefers-reduced-motion` (disables the spin/pulse animation).
