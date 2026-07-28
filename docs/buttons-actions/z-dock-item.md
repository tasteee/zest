# z-dock-item

One icon slot inside a [z-dock](z-dock.md). Its magnification is driven from
outside — the parent dock pushes a `--dock-scale` custom property onto each
item as the pointer moves — this component only paints the icon, tooltip, and
active indicator.

```html
<z-dock>
  <z-dock-item label="Mail" is-active>
    <svg>…</svg>
  </z-dock-item>
</z-dock>
```

```js
item.addEventListener('select', () => openApp('mail'))
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `label` | string | — | shown as a hover/focus tooltip and used as the `aria-label` |
| `href` | string | — | renders the item as a link instead of a button |
| `is-active` | boolean | — | show the active indicator dot |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — the icon.

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `select` | — | the item was clicked |
