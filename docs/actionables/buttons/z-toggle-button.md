# z-toggle-button

A standalone toggle button — a button with an on/off pressed state. For a set of
related toggles use [z-toggle-button-group](z-toggle-button-group.md) +
[z-toggle-button-group-item](z-toggle-button-group-item.md).

```html
<z-toggle-button accent="dom">
  <svg>…</svg> Bold
</z-toggle-button>

<z-toggle-button is-pressed is-icon>
  <svg>…</svg>
</z-toggle-button>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `accent` | `neutral` `dom` `sub` | `neutral` | color family |
| `kind` | `outline` `ghost` | `outline` | treatment |
| `size` | `sm` `md` `lg` | `md` | size |
| `is-icon` | boolean | — | square icon-only button |
| `is-pressed` | boolean | — | the on/off state (reflected, two-way) |
| `is-disabled` | boolean | — | disable |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — label and/or icon.

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `press` | `{ pressed: boolean }` | fired on toggle |
