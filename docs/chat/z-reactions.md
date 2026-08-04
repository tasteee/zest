# z-reactions

The row of emoji-count pills under a message.

```html
<z-reactions></z-reactions>
```

```js
const reactions = document.querySelector('z-reactions')
reactions.reactions = [
  { emoji: '👍', count: 3, isMine: true },
  { emoji: '🎉', count: 1 }
]
reactions.addEventListener('toggle', (e) => e.detail) // { emoji, isMine }
reactions.addEventListener('add', () => openEmojiPicker())
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `can-add` | boolean | — | hide the trailing add (＋) button |
| `is-hidden` | boolean | — | hide |

## Properties

- `reactions` — `{ emoji, count, isMine? }[]`

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `toggle` | `{ emoji, isMine }` | a pill was clicked |
| `add` | — | the add (＋) button was clicked (open a [z-emoji-picker](z-emoji-picker.md)) |
