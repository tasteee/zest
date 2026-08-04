# z-toggle-group

Coordinates a set of [z-toggle-group-item](z-toggle-group-item.md) children. In
`single` mode (default) selecting one item clears the others; in `multiple` mode
several can stay pressed. It joins the items into a seamless segmented control and
sets shared accent/size/kind variant variables that the items inherit.

```html
<z-toggle-group accent="dom" kind="outline">
  <z-toggle-group-item value="left"><svg>…</svg></z-toggle-group-item>
  <z-toggle-group-item value="center"><svg>…</svg></z-toggle-group-item>
  <z-toggle-group-item value="right"><svg>…</svg></z-toggle-group-item>
</z-toggle-group>
```

```js
group.addEventListener('change', (e) => {
  e.detail.value // string (single) | string[] (multiple)
})
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `type` | `single` `multiple` | `single` | selection mode |
| `direction` | boolean | — | stack vertically |
| `is-hidden` | boolean | — | hide |
| _color_ | `accent` `accent` `accent` | — | shared accent for items |
| _size_ | `size` `is-medium` `size` | — | shared size for items |
| _kind_ | `kind` `kind` | — | shared treatment for items |

The color/size/kind flags set CSS variables the items read, so you usually set
them once on the group rather than on each item.

## Slots

- _(default)_ — the [z-toggle-group-item](z-toggle-group-item.md) children.

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `change` | `{ value }` | `value` is a string in `single` mode (or `undefined` when cleared) and a `string[]` in `multiple` mode |
