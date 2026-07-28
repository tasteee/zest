# z-aura

A rotating border-light effect that wraps any element (a button, card,
avatar, image) in an animated glowing frame. Two stacked conic-gradient
layers spin behind the slotted content: a crisp ring at the edge and a
blurred bloom that bleeds outward.

```html
<z-aura variant="gold" size="lg">
  <z-avatar name="Ada Lovelace"></z-avatar>
</z-aura>

<z-aura variant="glow">
  <z-button tone="primary">Upgrade</z-button>
</z-aura>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `variant` | `default` `dual` `rainbow` `holo` `gold` `silver` `glow` | `default` | color palette / comet pattern (`glow` drops the crisp ring for a soft pulsing halo) |
| `size` | `xs` `sm` `md` `lg` `xl` | `md` | frame thickness and bloom spread |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — the wrapped content. Keeps its own background — only the
  frame is added around it.

## Notes

- Override the accent with `--aura-color`, the spin speed with
  `--aura-duration`.
- Respects `prefers-reduced-motion` (disables the spin/pulse animation).
