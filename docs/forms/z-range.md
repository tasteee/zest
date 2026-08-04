# z-range

A single slider bar with two handles (a dual-thumb range slider). `z-range`
owns the domain (`min`/`max`/`step`); its two [z-range-handle](z-range-handle.md)
children each own their own value plus an optional min/max that clamps how
far that handle can travel. The handles can never cross.

```html
<z-range min="0" max="100" label="Price" show-value value-prefix="$">
  <z-range-handle value="20"></z-range-handle>
  <z-range-handle value="80"></z-range-handle>
</z-range>
```

```js
range.addEventListener('input', (e) => e.detail)  // { left, right } — live drag
range.addEventListener('change', (e) => e.detail) // { left, right } — on release
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `min` / `max` | number | `0` / `100` | the domain both handles share |
| `step` | number | `1` | default step, inherited by handles that don't set their own |
| `label` | string | — | visible label |
| `does-show-value` | boolean | — | show a "left – right" value pill |
| `value-prefix` / `value-suffix` | string | — | decorate the shown values (e.g. `$`, `%`) |
| `is-disabled` | boolean | — | disable both handles |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — exactly two [z-range-handle](z-range-handle.md) elements: the
  first is the left/lower handle, the second is the right/upper handle.

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `input` | `{ left, right }` | fires continuously while dragging |
| `change` | `{ left, right }` | fires on release |

## Notes

- Each handle's live value is mirrored back onto its `z-range-handle` element,
  so reading `handleEl.value` after an interaction is always accurate.
- Each handle can set its own `min`/`max`/`step`/`accent`, clamped to the parent
  domain; omitted values inherit from it.
