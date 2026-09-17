# z-switch

A binary toggle rendered as a track + sliding knob. Off is a hairline outline
track; on fills with the accent and slides the knob across. An optional slotted
label sits to the right.

```html
<z-switch is-checked>Dark mode</z-switch>
<z-switch accent="dom" name="notifications">Notifications</z-switch>
```

The track stays visually compact while the clickable label occupies the shared
control height. When a switch shares a row with a top-labelled input, wrap it
in `<z-field is-label-reserved>` so both controls use the same label and control
bands.

```js
switchEl.addEventListener('change', (e) => e.detail.checked)
```

Form-associated: see [Forms](../../fundamentals/forms.md). `name` goes on the host and names the FormData entry; `is-required` blocks the owning form from submitting; reset, fieldset disabling and `checkValidity()` / `reportValidity()` / `setCustomValidity()` all work as they would on a native control.

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `is-checked` | boolean | — | on/off state (reflected, two-way) |
| `size` | `sm` `md` `lg` | `md` | size |
| `accent` | `dom` `sub` | neutral | accent color |
| `name` | string | — | FormData entry name (on the host) |
| `label` | string | — | Accessible name; use slotted text for the visible label. |
| `description` | string | — | accessible description (set by a surrounding `z-field`; rendered hidden and pointed at with `aria-describedby`) |
| `error` | string | — | accessible error text and `aria-invalid` (set by a surrounding `z-field`) |
| `value` | string | `on` | value submitted while on; nothing is submitted while off |
| `is-required` | boolean | — | blocks the owning form from submitting while off |
| `is-disabled` | boolean | — | disable |
| `is-full-width` | boolean | — | render as a block element |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — the label.

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `change` | `{ checked, value }` | on toggle |
