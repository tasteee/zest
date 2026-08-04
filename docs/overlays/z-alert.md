# z-alert

An inline, in-flow status banner (not a floating overlay). A bordered box tinted
by `accent`, with a leading status icon, an optional `heading`, slotted body copy,
and an optional close button.

```html
<z-alert accent="success" heading="Saved">Your changes are live.</z-alert>

<z-alert accent="error" is-dismissable>
  Something went wrong.
</z-alert>
```

```js
alert.addEventListener('dismiss', () => {})
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `accent` | `dom` `success` `warning` `error` `neutral` | `neutral` | color + icon |
| `heading` | string | — | optional bold title |
| `is-dismissable` | boolean | — | show a close button |
| `is-hidden` | boolean | — | hide (set automatically on dismiss) |

`danger` / `warning` expose `role="alert"`; other accents use `role="status"`.

## Slots

- _(default)_ — the body copy.

## Events

| Event | Description |
| --- | --- |
| `dismiss` | when the close button is clicked |
