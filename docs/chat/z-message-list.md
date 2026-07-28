# z-message-list

The scroll surface for a conversation. Slotted and declarative — author
[z-message-group](z-message-group.md) / [z-date-divider](z-date-divider.md)
children directly. Its job is the behavior every chat needs: pin-to-bottom.
When the user is already near the bottom and a new message arrives, it stays
pinned; when they've scrolled up to read history, new messages don't yank
them down.

```html
<z-message-list>
  <z-date-divider label="Today"></z-date-divider>
  <z-message-group side="start" name="Alice">…</z-message-group>
</z-message-list>
```

```js
list.scrollToBottom()
list.isAtBottom()
list.addEventListener('pinnedchange', (e) => e.detail.isPinned)
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `pin-threshold` | number (px) | `80` | distance from the bottom still considered "pinned" |
| `is-pinned` | boolean | — | reflected pinned state |
| `is-hidden` | boolean | — | hide |

## Imperative API

- `scrollToBottom(behavior?)`
- `isAtBottom()` → boolean

## Slots

- _(default)_ — [z-message-group](z-message-group.md) / [z-date-divider](z-date-divider.md) children.

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `pinnedchange` | `{ isPinned }` | pinned state flipped |

## Notes

- For very long histories this can later hand rows to
  [z-virtual-list](../data-display/z-virtual-list.md); the pin-to-bottom
  contract stays the same either way.
