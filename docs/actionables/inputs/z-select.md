# z-select

A custom dropdown select. The trigger shows the selected label (or a
placeholder); the panel is a bordered, shadow-free popover. Options are supplied
as an `options` **array property** (not an attribute).

For standalone usage, wrap this control in [`z-field`](z-field.md) to provide
its visible and accessible label. Use `label` directly only for compact controls
with clear surrounding context.

```html
<z-select label="Fruit" placeholder="Pick a fruit"></z-select>
```

```js
const select = document.querySelector('z-select')
select.options = [
  { value: 'apple', label: 'Apple' },
  { value: 'pear', label: 'Pear' },
  { value: 'fig', label: 'Fig', isDisabled: true }
]
select.addEventListener('change', (e) => e.detail.value)
```

Keyboard: ↑/↓ move between enabled options; Home/End jump to the first/last enabled option; typing searches by label. Enter/Space opens or commits. Escape, Tab, and clicking outside close. Opening starts at the selected option. `change` fires only when the selected value changes.

Form-associated: see [Forms](../../fundamentals/forms.md). `name` goes on the host and names the FormData entry; `is-required` blocks the owning form from submitting; reset, fieldset disabling and `checkValidity()` / `reportValidity()` / `setCustomValidity()` all work as they would on a native control.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `{ value, label, isDisabled? }[]` | `[]` | **property** — the option list |
| `value` | string | — | selected value (reflected attribute, two-way) |
| `name` | string | — | FormData entry name (on the host) |
| `description` | string | — | accessible description (set by a surrounding `z-field`; rendered hidden and pointed at with `aria-describedby`) |
| `error` | string | — | accessible error text and `aria-invalid` (set by a surrounding `z-field`) |
| `placeholder` | string | `Select…` | empty-state text |
| `size` | `sm` `md` `lg` | `md` | size |
| `accent` | `dom` `sub` | neutral | accent color |
| `is-required` | boolean | — | blocks the owning form from submitting until an option is chosen |
| `is-invalid` | boolean | — | error styling |
| `is-disabled` | boolean | — | disable |
| `inline` | boolean | — | shrink to content width |
| `is-hidden` | boolean | — | hide |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `change` | `{ value }` | when a committed selection changes the value |

## Related

[z-combobox](z-combobox.md) is the type-to-filter version of this.
