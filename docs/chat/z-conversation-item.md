# z-conversation-item

One row in the inbox rail: avatar (with presence dot), name, last-message
preview, timestamp, and an unread count. Composes
[z-avatar](../data-display/z-avatar.md) and
[z-relative-time](../specialized/z-relative-time.md). Typically used inside
[z-conversation-list](z-conversation-list.md).

```html
<z-conversation-item
  name="Alice Rivera"
  preview="Did you see the designs?"
  timestamp="2026-07-05T12:00:00Z"
  status="online"
  unread="2"
></z-conversation-item>
```

```js
item.addEventListener('select', (e) => e.detail.value)
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `value` | string | — | identifier passed back in `select`'s `detail.value` |
| `name` | string | — | contact/conversation name |
| `preview` | string | — | last-message preview text |
| `timestamp` | ISO string | — | rendered via `z-relative-time` |
| `avatar-src` | URL | — | avatar image |
| `avatar-name` | string | falls back to `name` | name used to derive avatar initials |
| `status` | presence value | — | presence dot on the avatar |
| `unread` | number | `0` | unread count badge (caps display at "99+") |
| `is-active` | boolean | — | mark as the open conversation |
| `is-muted` | boolean | — | show a muted glyph |
| `is-pinned` | boolean | — | shows a pin glyph next to the name (same treatment as `is-muted`) |
| `is-hidden` | boolean | — | hide |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `select` | `{ value }` | the row was clicked or activated via Enter/Space |
