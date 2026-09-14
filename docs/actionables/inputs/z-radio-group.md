# z-radio-group

Coordinates single-selection across slotted [z-radio](z-radio.md) items. Listens
for each radio's `select` event, clears the others, and re-emits a `change` with
the chosen value.

```html
<z-radio-group value="medium" label="Size" accent="dom">
  <z-radio value="small">Small</z-radio>
  <z-radio value="medium">Medium</z-radio>
  <z-radio value="large">Large</z-radio>
</z-radio-group>
```

```js
group.addEventListener('change', (e) => e.detail.value)
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `value` | string | — | selected value (reflected, two-way) |
| `label` | string | — | accessible group label (`aria-label`) |
| `accent` | `neutral` `dom` `sub` `success` `warning` `error` | `neutral` | shared selection accent for child radios |
| `direction` | `vertical` `horizontal` | `vertical` | option layout axis |
| `is-hidden` | boolean | — | hide |

Exposes `role="radiogroup"`.

## Slots

- _(default)_ — the [z-radio](z-radio.md) children.

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `change` | `{ value }` | on selection |
