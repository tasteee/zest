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

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `is-checked` | boolean | — | on/off state (reflected, two-way) |
| `size` | `sm` `md` `lg` | `md` | size |
| `accent` | `dom` `sub` | `dom` accent | accent color |
| `name` | string | — | form field name |
| `value` | string | — | form value |
| `disabled` | boolean | — | disable |
| `is-block` | boolean | — | render as a block element |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — the label.

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `change` | `{ checked, value }` | on toggle |
