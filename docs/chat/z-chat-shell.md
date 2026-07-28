# z-chat-shell

The app frame for a chat: a resizable inbox rail, the thread, and an optional
details pane. Composes [z-resizable-panels](../canvas-panels/z-resizable-panels.md),
so the dividers drag and (with an `auto-save-id`) persist.

```html
<z-chat-shell auto-save-id="inbox" has-details list-size="320px" details-size="300px">
  <z-conversation-list slot="list">…</z-conversation-list>
  <div>…header + z-message-list + z-composer…</div>
  <div slot="details">…thread details…</div>
</z-chat-shell>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `has-details` | boolean | — | include the third (details) pane |
| `list-size` | length | `320px` | initial inbox rail width |
| `details-size` | length | `300px` | initial details pane width |
| `auto-save-id` | string | — | persists the layout (forwarded to `z-resizable-panels`) |
| `is-hidden` | boolean | — | hide |

## Slots

- `list` — the inbox rail content.
- _(default)_ — the thread (header + message list + composer).
- `details` — the details pane (only rendered when `has-details` is set).
