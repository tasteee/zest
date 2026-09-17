# z-textarea

A multi-line text field with the same hairline-to-accent focus treatment as
[z-input](z-input.md). Supports auto-grow so the field tracks content height
without a scrollbar.

For standalone usage, wrap this control in [`z-field`](z-field.md) to provide
its visible and accessible label. Use `label` directly only for compact controls
with clear surrounding context.

```html
<z-textarea placeholder="Write a comment…" rows="4"></z-textarea>
<z-textarea is-auto-resize></z-textarea>
```

Form-associated: see [Forms](../../fundamentals/forms.md). `name` goes on the host and names the FormData entry; `is-required` blocks the owning form from submitting; reset, fieldset disabling and `checkValidity()` / `reportValidity()` / `setCustomValidity()` all work as they would on a native control.

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `value` | string | — | current value (reflected, two-way) |
| `placeholder` | string | — | placeholder text |
| `name` | string | — | FormData entry name (on the host; the inner textarea carries none) |
| `rows` | number | `3` | initial visible rows |
| `accent` | `dom` `sub` | neutral | focus accent color |
| `label` | string | — | accessible name for compact contextual use (falls back to a surrounding `aria-label`) |
| `description` | string | — | accessible description (set by a surrounding `z-field`; rendered hidden and pointed at with `aria-describedby`) |
| `error` | string | — | accessible error text and `aria-invalid` (set by a surrounding `z-field`) |
| `size` | `sm` `md` `lg` | `md` | field padding and font size (same scale as [z-input](z-input.md)) |
| `is-focused` | boolean | — | focus state (reflected, two-way; driven internally on focus/blur) |
| `is-auto-resize` | boolean | — | grow to fit content (disables manual resize) |
| `is-invalid` | boolean | — | error styling |
| `is-disabled` | boolean | — | disable |
| `is-readonly` | boolean | — | read-only |
| `is-required` | boolean | — | blocks the owning form from submitting while empty |
| `is-hidden` | boolean | — | hide |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `input` | `{ value }` | on every keystroke |
| `change` | `{ value }` | on blur, when the value changed during editing |
