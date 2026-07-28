# z-typing-indicator

The animated "…" bubble shown while someone is typing. Optional avatar (via
`name`/`avatar-src`) to match a [z-message-group](z-message-group.md) on the
start side. Shared by general chat ("Alice is typing") and AI chat (assistant
composing a reply before the first token streams).

```html
<z-typing-indicator name="Alice"></z-typing-indicator>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `name` | string | — | shown avatar's name (also used in the `aria-label`) |
| `avatar-src` | URL | — | avatar image |
| `is-hidden` | boolean | — | hide |
