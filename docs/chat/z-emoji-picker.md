# z-emoji-picker

A categorized emoji panel with search. Drop it inside a
[z-popover](../overlays/z-popover.md) for a composer's emoji button or a
message's reaction picker.

```html
<z-popover>
  <z-button slot="trigger" kind="ghost">😀</z-button>
  <z-emoji-picker></z-emoji-picker>
</z-popover>
```

```js
picker.addEventListener('select', (e) => insertEmoji(e.detail.emoji))
```

## Properties

- `emojis` — `{ char, name, cat }[]`, overriding the built-in curated set of ~120 emoji

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `select` | `{ emoji }` | an emoji was chosen |

## Notes

- Ships 9 built-in categories (Smileys, Gestures, Hearts, Animals, Food,
  Activities, Travel, Objects, Symbols); typing in the search box filters
  across all categories by name.
