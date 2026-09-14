# z-swap

Toggles between two faces (an "on" and an "off" state). Drive it by clicking
(it owns a hidden checkbox) or control it externally with `is-active`. Put the
two faces in the `on` and `off` slots — typically a pair of icons (play/pause,
sun/moon, menu/close).

```html
<z-swap kind="beside" effect="rotate" has-ghost>
  <svg slot="off">…sun…</svg>
  <svg slot="on">…moon…</svg>
</z-swap>
```

```js
swap.addEventListener('change', (e) => e.detail.active)
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `kind` | `stack` `beside` | `stack` | `stack` overlaps both faces in one footprint and crossfades; `beside` places them side by side, each holding its own space |
| `effect` | `fade` `rotate` `flip` | `fade` | transition style |
| `has-ghost` | boolean | — | place both faces side by side and mute the inactive one |
| `is-active` | boolean | — | on/off state (reflected, two-way) |
| `disabled` | boolean | — | disable |
| `label` | string | — | accessible label for the hidden checkbox |
| `is-hidden` | boolean | — | hide |

## Slots

- `off` — the "off" face.
- `on` — the "on" face.

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `change` | `{ active }` | fired on every toggle |

## Notes

- Tune ghost strength with `--swap-ghost-opacity`, timing with `--swap-duration`,
  and `beside` spacing with `--swap-gap`.
