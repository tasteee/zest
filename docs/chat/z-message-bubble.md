# z-message-bubble

A single chat bubble. Purely visual — the surrounding
[z-message-group](z-message-group.md) sets its `side` and `group` (corner
position) so consecutive bubbles from one sender share tucked corners,
iMessage/Messenger style. Content is slotted, so a bubble can hold plain
text, [z-markdown](../specialized/z-markdown.md), an image, or any other
payload.

```html
<z-message-bubble side="start" group="single">Hey! How's it going?</z-message-bubble>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `side` | `start` `end` | `start` | `start` = them (left), `end` = you (right, primary-colored) |
| `group` | `single` `first` `middle` `last` | `single` | which corners tuck — set automatically by the parent `z-message-group` |
| `accent` | `dom` `sub` `success` `warning` `error` | — | overrides the `side`-based background, for status/system bubbles |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — bubble content (text, markdown, images, etc.).

## Notes

- Exposes `part="bubble"` for external styling.
