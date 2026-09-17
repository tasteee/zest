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

Form-associated: see [Forms](../../fundamentals/forms.md). `name` goes on the host and names the FormData entry; `is-required` blocks the owning form from submitting; reset, fieldset disabling and `checkValidity()` / `reportValidity()` / `setCustomValidity()` all work as they would on a native control.

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `is-checked` | boolean | — | checked state (reflected, two-way) |
| `size` | `sm` `md` `lg` | `md` | size of the box and label text |
| `accent` | `dom` `sub` | neutral | accent color |
| `name` | string | — | FormData entry name (on the host) |
| `label` | string | — | Accessible name; use slotted text for the visible label. |
| `description` | string | — | accessible description (set by a surrounding `z-field`; rendered hidden and pointed at with `aria-describedby`) |
| `error` | string | — | accessible error text and `aria-invalid` (set by a surrounding `z-field`) |
| `value` | string | `on` | value submitted while checked; nothing is submitted while unchecked |
| `is-required` | boolean | — | blocks the owning form from submitting while unchecked |
| `is-disabled` | boolean | — | disable |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — the label.

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `change` | `{ checked, value }` | on toggle |
