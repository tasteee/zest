# z-streaming-text

Reveals assistant text with a trailing blinking cursor. Two modes: live
streaming (append tokens to `content` and set `is-streaming`; text shows
as-is until you clear the flag) or typewriter (set `typewriter` and it
reveals `content` progressively at `speed`, cursor on until it catches up).

```html
<z-streaming-text is-streaming></z-streaming-text>
<z-streaming-text typewriter speed="40" markdown></z-streaming-text>
```

```js
const streamingText = document.querySelector('z-streaming-text')
streamingText.content += nextToken
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `is-streaming` | boolean | — | show the cursor (live-streaming mode) |
| `typewriter` | boolean | — | progressively reveal `content` instead of showing it immediately |
| `speed` | number (chars/sec) | `40` | typewriter reveal rate |
| `markdown` | boolean | — | render the revealed text through [z-markdown](z-markdown.md) instead of plain text |
| `is-hidden` | boolean | — | hide |

## Properties

- `content` — the text to show/reveal

## Notes

- The typewriter reveal is time-based (elapsed × speed), so throttled or
  dropped ticks (background tabs, jank) self-correct instead of falling
  behind.
- Feeds the message-text rendering inside AI chat bubbles.
