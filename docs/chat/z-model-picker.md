# z-model-picker

The composer control for choosing which model answers. Shows the selected
model; opens a dropdown of options (name + description, check on the current
one).

```html
<z-model-picker placeholder="Select model"></z-model-picker>
```

```js
const picker = document.querySelector('z-model-picker')
picker.models = [
  { value: 'opus', name: 'Opus 4.8', description: 'Most capable' },
  { value: 'sonnet', name: 'Sonnet 4.6', description: 'Balanced' }
]
picker.value = 'opus'
picker.addEventListener('change', (e) => e.detail.value)
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `value` | string | — | selected model value |
| `placeholder` | string | `Select model` | shown when nothing matches `value` |
| `menu-below` | boolean | — | open the dropdown below the trigger instead of above |
| `is-open` | boolean | — | open state (reflected, two-way) |
| `is-hidden` | boolean | — | hide |

## Properties

- `models` — `{ value, name, description? }[]`

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `change` | `{ value }` | a different model was picked |
