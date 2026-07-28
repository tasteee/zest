# z-chat-header

The thread's top bar: avatar, name, a presence/subtitle line, and a trailing
`actions` slot (call / video / info buttons). Composes [z-avatar](../data-display/z-avatar.md).

```html
<z-chat-header name="Alice Rivera" subtitle="Active now" status="online">
  <z-button slot="actions" kind="ghost">Call</z-button>
</z-chat-header>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `name` | string | — | conversation/contact name |
| `subtitle` | string | — | secondary line (status text, "typing…", etc.) |
| `avatar-src` | URL | — | avatar image |
| `avatar-name` | string | falls back to `name` | name used to derive avatar initials |
| `status` | presence value (see [z-avatar](../data-display/z-avatar.md)) | — | presence dot on the avatar |
| `is-hidden` | boolean | — | hide |

## Slots

- `name` — additional content appended after the name text.
- `subtitle` — additional content appended after the subtitle text.
- `actions` — trailing action buttons.
