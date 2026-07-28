# z-send-button

The circular send control for a composer. Two states: idle (send arrow, emits
`send`) and streaming (stop square, emits `stop`). AI chat flips
`is-streaming` while a response is generating so the same button becomes stop.

```html
<z-send-button></z-send-button>
<z-send-button is-streaming></z-send-button>
```

```js
button.addEventListener('send', () => submitMessage())
button.addEventListener('stop', () => abortStream())
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `is-streaming` | boolean | — | show the stop square instead of the send arrow |
| `is-disabled` | boolean | — | disable (ignored while `is-streaming`, so stop is always clickable) |
| `label` | string | `Send` | accessible label when idle (streaming always announces "Stop") |
| `is-hidden` | boolean | — | hide |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `send` | — | clicked while idle |
| `stop` | — | clicked while streaming |
