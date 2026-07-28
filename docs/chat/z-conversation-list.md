# z-conversation-list

The inbox rail: a scrolling column of [z-conversation-item](z-conversation-item.md)
children, with an optional sticky `header` slot (title, search, new-chat
button). Purely a layout/scroll container — selection is handled by the
items' own `select` events, which bubble.

```html
<z-conversation-list>
  <div slot="header">…search…</div>
  <z-conversation-item name="Alice Rivera" preview="Hey!"></z-conversation-item>
</z-conversation-list>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `is-hidden` | boolean | — | hide |

## Slots

- `header` — sticky header content (hidden automatically when empty).
- _(default)_ — [z-conversation-item](z-conversation-item.md) children.
