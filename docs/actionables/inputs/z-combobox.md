# z-combobox

A select you can type into — the trigger is a text input that filters the option
list as you type. Same bordered, shadow-free popover as [z-select](z-select.md).
Options come from an `options` **array property**.

For standalone usage, wrap this control in [`z-field`](z-field.md) to provide
its visible and accessible label. Use `label` directly only for compact controls
with clear surrounding context.

```html
<z-combobox label="Framework" placeholder="Search frameworks…"></z-combobox>
```

```js
const combo = document.querySelector('z-combobox')
combo.options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' }
]
combo.addEventListener('change', (e) => e.detail.value)
```

Keyboard: type to filter, ↑/↓ move between enabled results, Enter commits the active row, and Escape or Tab closes. Blur restores the selected label. The panel uses the browser top layer so scroll containers do not clip it. `change` fires only when the selected value changes.

Form-associated: see [Forms](../../fundamentals/forms.md). `name` goes on the host and names the FormData entry; `is-required` blocks the owning form from submitting; reset, fieldset disabling and `checkValidity()` / `reportValidity()` / `setCustomValidity()` all work as they would on a native control.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `{ value, label, isDisabled? }[]` | `[]` | **property** — the option list |
| `value` | string | — | selected value (reflected attribute, two-way) |
| `name` | string | — | FormData entry name (on the host) |
| `description` | string | — | accessible description (set by a surrounding `z-field`; rendered hidden and pointed at with `aria-describedby`) |
| `error` | string | — | accessible error text and `aria-invalid` (set by a surrounding `z-field`) |
| `is-required` | boolean | — | blocks the owning form from submitting until an option is chosen; search text alone does not count |
| `placeholder` | string | `Search…` | input placeholder |
| `accent` | `dom` `sub` | neutral | accent color |
| `is-disabled` | boolean | — | disable |
| `inline` | boolean | — | shrink to content width |
| `is-hidden` | boolean | — | hide |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `change` | `{ value }` | when a committed selection changes the value |
