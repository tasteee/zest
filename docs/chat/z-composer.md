# z-composer

The message input row: an auto-growing textarea flanked by a leading action
slot (attach / emoji) and a trailing send control. Enter sends, Shift+Enter
inserts a newline.

```html
<z-composer placeholder="Message…">
  <z-button slot="leading" kind="ghost">＋</z-button>
</z-composer>
```

```js
composer.addEventListener('input', (e) => e.detail.value)
composer.addEventListener('send', (e) => e.detail.value) // fires, then the field clears
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `value` | string | — | current text (reflected, two-way) |
| `placeholder` | string | `Message…` | placeholder text |
| `is-focused` | boolean | — | focus state (reflected, two-way) |
| `is-disabled` | boolean | — | disable the whole composer |
| `does-submit-on-enter` | boolean | — | make Enter insert a newline instead of sending |
| `is-hidden` | boolean | — | hide |

## Slots

- `leading` — content before the textarea (attach/emoji buttons).
- `trailing` — replaces the default [z-send-button](../buttons-actions/z-send-button.md), which is disabled while the field is empty.

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `input` | `{ value }` | on every keystroke |
| `send` | `{ value }` | Enter pressed (or the send button clicked); the field clears immediately after |

## Notes

- This is the shared base a richer AI prompt input can extend (stop-streaming,
  model picker, token counter).
