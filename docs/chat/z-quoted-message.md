# z-quoted-message

The "replying to…" snippet: an accent bar, the original sender, and a
truncated preview of the quoted text. Use it inside a
[z-message-bubble](z-message-bubble.md) (a reply) or in the composer's
context bar while composing one.

```html
<z-quoted-message name="Alice" centers-text="Did you see the designs?"></z-quoted-message>
```

```js
quoted.addEventListener('jump', (e) => scrollToMessage(e.detail.value))
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `name` | string | — | original sender name |
| `centers-text` | string | — | preview text (clamped to 2 lines) |
| `value` | string | — | identifier passed back in `jump`'s `detail.value` |
| `accent` | `secondary` | primary | accent bar color |
| `can-jump` | boolean | — | disable the click-to-jump behavior (renders non-interactive) |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — additional content appended after `centers-text`.

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `jump` | `{ value }` | clicked (unless `can-jump` is set) |
