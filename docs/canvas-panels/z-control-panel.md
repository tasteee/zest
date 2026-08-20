# z-control-panel

The knob rack. Every knob is a real zest form element wrapped in `z-field`,
which is the point — the docs drive the library with the library, so a control
that looks wrong here is a component bug the maintainer meets before the user
does.

```html
<z-control-panel></z-control-panel>
```

```js
const panel = document.querySelector('z-control-panel')
panel.controls = [
  { name: 'size', kind: 'enum', options: ['xs', 'sm', 'md'], defaultValue: 'md' },
  { name: 'disabled', kind: 'boolean' },
  { name: 'columns', kind: 'number', defaultValue: '3' },
  { name: 'label', kind: 'text' }
]
panel.values = { size: 'sm' }
panel.addEventListener('change', (e) => e.detail) // { name, value }
```

Controlled, not stateful: it renders `values` and emits `change`, and never
mutates anything itself. A host can veto, transform, or replay any change
without fighting internal state.

| `kind` | Control |
| --- | --- |
| `boolean` | `z-switch` |
| `enum` | `z-select`, with an "unset" option ahead of the values |
| `number` | `z-number-input` with steppers |
| `text` | `z-input` |

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `controls` | `{ name, kind, options?, defaultValue?, description? }[]` | `[]` | **property** — the knobs |
| `values` | `Record<string, string>` | `{}` | **property** — current value per control name |
| `is-hidden` | boolean | — | hide |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `change` | `{ name, value }` | a knob moved; `value` is `null` to unset |

## Notes

A `null` value means "unset it", which is distinct from the empty string — an
empty string is what a present-but-valueless boolean attribute holds.

`z-field` rather than a bare label beside each control, for a reason specific
to custom elements: the interactive element sits behind a shadow boundary, so
a standalone `<label>` cannot name it. `z-field` forwards the name across. Its
fixed-height control band is also what lets a switch line up with a select
instead of hanging off to one side.

An em dash in `defaultValue` means "no default" and never reaches a control as
a literal value.
