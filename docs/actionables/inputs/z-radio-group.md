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

Form-associated: see [Forms](../../fundamentals/forms.md). `name` goes on the host and names the FormData entry; `is-required` blocks the owning form from submitting; reset, fieldset disabling and `checkValidity()` / `reportValidity()` / `setCustomValidity()` all work as they would on a native control.

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `value` | string | — | selected value (reflected, two-way) |
| `name` | string | — | FormData entry name — the group is the participant, the radios only carry values |
| `description` | string | — | accessible description (set by a surrounding `z-field`; rendered hidden and pointed at with `aria-describedby`) |
| `error` | string | — | accessible error text and `aria-invalid` (set by a surrounding `z-field`) |
| `label` | string | — | accessible group label (`aria-label`) |
| `is-required` | boolean | — | blocks the owning form from submitting until a radio is chosen |
| `is-disabled` | boolean | — | disables every radio; re-enabling restores only the ones the group disabled |
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
