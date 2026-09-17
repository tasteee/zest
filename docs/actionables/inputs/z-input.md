# z-input

A single-line text field. Transparent fill with a hairline border that lifts to
the accent on focus. Optional leading/trailing slots for icons or adornments.

```html
<z-input placeholder="Search…">
  <svg slot="prefix">…</svg>
</z-input>

<z-input type="email" name="email" is-required accent="dom"></z-input>
```

```js
input.addEventListener('input', (e) => e.detail.value)   // every keystroke
input.addEventListener('change', (e) => e.detail.value)  // on blur
```

Form-associated: see [Forms](../../fundamentals/forms.md). `name` goes on the host and names the FormData entry; `is-required` blocks the owning form from submitting; reset, fieldset disabling and `checkValidity()` / `reportValidity()` / `setCustomValidity()` all work as they would on a native control.

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `value` | string | — | current value (reflected, two-way) |
| `type` | any input type | `text` | native input type |
| `placeholder` | string | — | placeholder text |
| `name` | string | — | FormData entry name (on the host; the inner input carries none) |
| `autocomplete` | string | — | native autocomplete hint |
| `inputmode` | string | — | virtual keyboard hint |
| `size` | `sm` `md` `lg` | `md` | size |
| `accent` | `dom` `sub` | neutral | focus accent color |
| `label` | string | — | accessible name for compact contextual use (falls back to a surrounding `aria-label`) |
| `description` | string | — | accessible description (set by a surrounding `z-field`; rendered hidden and pointed at with `aria-describedby`) |
| `error` | string | — | accessible error text and `aria-invalid` (set by a surrounding `z-field`) |
| `is-focused` | boolean | — | focus state (reflected, two-way; driven internally on focus/blur) |
| `is-invalid` | boolean | — | error styling |
| `is-disabled` | boolean | — | disable |
| `is-readonly` | boolean | — | read-only |
| `is-required` | boolean | — | blocks the owning form from submitting while empty |
| `inline` | boolean | — | shrink to content width instead of full width |
| `is-hidden` | boolean | — | hide |

## Slots

- `prefix` — leading adornment (icon).
- `suffix` — trailing adornment (icon).

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `input` | `{ value }` | on every keystroke |
| `change` | `{ value }` | on blur, when the value changed during editing |
