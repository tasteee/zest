# z-checkbox

A square checkbox. Unchecked is a hairline outline; checked fills with the accent
and reveals a checkmark. An optional slotted label sits to the right and is fully
clickable.

The box stays visually compact while the clickable label occupies the shared
control height. When a checkbox shares a row with a top-labelled input, wrap it
in `<z-field is-label-reserved>` so both controls align.

```html
<z-checkbox is-checked>Subscribe to updates</z-checkbox>
<z-checkbox accent="dom" name="terms" value="accepted">I agree</z-checkbox>
```

```js
checkbox.addEventListener('change', (e) => e.detail.checked)
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `is-checked` | boolean | — | checked state (reflected, two-way) |
| `size` | `sm` `md` `lg` | `md` | size of the box and label text |
| `accent` | `dom` `sub` | `dom` accent | accent color |
| `name` | string | — | form field name |
| `value` | string | — | form value |
| `disabled` | boolean | — | disable |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — the label.

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `change` | `{ checked, value }` | on toggle |
