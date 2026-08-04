# z-suggestion-chips

A wrapping row of tappable prompt suggestions: starter prompts on an empty
thread, or follow-up questions after an answer.

```html
<z-suggestion-chips show-arrow></z-suggestion-chips>
```

```js
const chips = document.querySelector('z-suggestion-chips')
chips.suggestions = [
  'Summarize this',
  "Explain like I'm 5",
  { label: 'Translate to French', value: 'translate:fr' }
]
chips.addEventListener('select', (e) => e.detail) // { value, label }
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `does-show-arrow` | boolean | — | show a trailing arrow icon on each chip |
| `is-hidden` | boolean | — | hide |

## Properties

- `suggestions` — `(string | { label, value? })[]`

## Slots

- _(default)_ — additional custom chip content, rendered after the data-driven ones.

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `select` | `{ value, label }` | a chip was tapped |
