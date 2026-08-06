# z-knob

A rotary control — the hardware counterpart to [z-slider](../forms/z-slider.md).
Drag vertically to turn, hold `Shift` for fine adjustment, double-click to
return to `default-value`.

```html
<z-knob label="Cutoff" value="40" min="0" max="100" does-show-value accent="dom"></z-knob>
```

```js
knob.addEventListener('input', (e) => {
  e.detail.value // fires continuously while dragging
})

knob.addEventListener('change', (e) => {
  e.detail.value // fires once, when the gesture ends
})
```

Built as three stacked rings so each themes independently: a carved well sunk
into the panel, an LED travel arc drawn on top of it, and the cap sitting proud
in the middle with a pointer milled into it. In the flat themes those resolve to
a plain ring, a coloured arc, and a flat disc — see [Theming](../theming.md).

## Why vertical drag

Following the pointer around the circle sounds more faithful and is much worse
to use: it makes fine adjustment near the centre impossible, and the value
flips wildly when the pointer crosses the dead zone. Every DAW resolved this the
same way decades ago. Up is more.

## Why a 270° sweep

The dead zone at the bottom is what physical hardware does. A full 360° leaves
no way to see where travel begins — the eye reads the gap as the zero mark.

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `value` | number | `min` | Current value. |
| `min` | number | `0` | Lower bound. |
| `max` | number | `100` | Upper bound. |
| `step` | number | `1` | Granularity. `0` is continuous. |
| `default-value` | number | — | Value restored on double-click. |
| `label` | string | — | Rendered above the dial, and used as the accessible name. |
| `does-show-value` | boolean | — | Renders the current value below the dial. |
| `value-prefix` | string | — | Prepended to the displayed value. |
| `value-suffix` | string | — | Appended to the displayed value — `Hz`, `dB`, `%`. |
| `accent` | `dom` `sub` `success` `warning` `error` | — | Colour of the arc and pointer. |
| `is-glowing` | boolean | — | Lights the arc's bloom. Only visible in themes with an emissive layer. |
| _size_ | `size` `size` | — | Dial diameter. |
| `is-disabled` | boolean | — | Non-interactive. |
| `is-hidden` | boolean | — | Hide. |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `input` | `{ value }` | Continuous, while dragging or on each key press. |
| `change` | `{ value }` | Once, when the gesture or key press completes. |

## Keyboard

| Key | Action |
| --- | --- |
| `↑` `→` | Increase by `step` |
| `↓` `←` | Decrease by `step` |
| `Page Up` / `Page Down` | Increase / decrease by ten steps |
| `Home` / `End` | Jump to `min` / `max` |

## CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--knob-size` | `3.5rem` | Dial diameter, driven by the size attributes. |
| `--knob-accent` | `var(--accent)` | Arc and pointer colour, driven by `accent`. |
| `--knob-track` | `var(--color-neutral-3)` | The unlit portion of the arc. |

## Accessibility

- The dial is a `role="slider"` with `aria-valuemin`, `aria-valuemax`,
  `aria-valuenow` and `aria-valuetext`, so screen readers announce the value
  with its prefix and suffix rather than as a bare number.
- `aria-orientation="vertical"` matches the drag axis.
- `label` supplies the accessible name; without one the dial falls back to
  "Knob", which you should override.
- Every interaction is available from the keyboard, including the extremes.
