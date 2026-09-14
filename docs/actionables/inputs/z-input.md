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

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `value` | string | — | current value (reflected, two-way) |
| `type` | any input type | `text` | native input type |
| `placeholder` | string | — | placeholder text |
| `name` | string | — | form field name |
| `autocomplete` | string | — | native autocomplete hint |
| `inputmode` | string | — | virtual keyboard hint |
| `size` | `sm` `md` `lg` | `md` | size |
| `accent` | `dom` `sub` | `dom` accent | focus accent color |
| `label` | string | — | accessible name for compact contextual use (falls back to a surrounding `aria-label`) |
| `is-focused` | boolean | — | focus state (reflected, two-way; driven internally on focus/blur) |
| `invalid` | boolean | — | error styling |
| `disabled` | boolean | — | disable |
| `is-readonly` | boolean | — | read-only |
| `is-required` | boolean | — | required |
| `inline` | boolean | — | shrink to content width instead of full width |
| `is-hidden` | boolean | — | hide |

## Slots

- `prefix` — leading adornment (icon).
- `suffix` — trailing adornment (icon).

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `input` | `{ value }` | on every keystroke |
| `change` | `{ value }` | on blur |
