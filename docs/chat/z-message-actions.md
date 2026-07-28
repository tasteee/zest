# z-message-actions

The floating action bar revealed on message hover: a few quick-reaction
emojis, then reply / forward / more. Mirrors [z-toolbar](../buttons-actions/z-toolbar.md)
semantics (`role="toolbar"`) in a self-contained strip the consumer positions
over a bubble.

```html
<z-message-actions></z-message-actions>
```

```js
actions.addEventListener('react', (e) => e.detail.emoji)
actions.addEventListener('addreaction', () => openEmojiPicker())
actions.addEventListener('reply', () => startReply())
actions.addEventListener('forward', () => openForward())
actions.addEventListener('more', () => openMoreMenu())
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `no-reply` | boolean | — | hide the reply button |
| `no-forward` | boolean | — | hide the forward button |
| `no-more` | boolean | — | hide the "more" (⋯) button |
| `is-hidden` | boolean | — | hide |

## Properties

- `quickReactions` — `string[]` of emoji, overriding the default quick set (👍 ❤️ 😂 🎉 😮 😢)

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `react` | `{ emoji }` | a quick-reaction emoji was tapped |
| `addreaction` | — | the "more reactions" button was tapped (open a [z-emoji-picker](z-emoji-picker.md)) |
| `reply` | — | reply button tapped |
| `forward` | — | forward button tapped |
| `more` | — | "more" (⋯) button tapped |
