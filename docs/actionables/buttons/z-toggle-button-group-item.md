# z-toggle-button-group-item

A single item inside a [z-toggle-button-group](z-toggle-button-group.md). Carries a `value` and
a pressed state; it inherits accent/size/kind from the parent group but can
override any of them with its own variant properties.

```html
<z-toggle-button-group>
  <z-toggle-button-group-item value="bold" is-pressed>B</z-toggle-button-group-item>
  <z-toggle-button-group-item value="italic">I</z-toggle-button-group-item>
</z-toggle-button-group>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `value` | string | — | identifies this item in the group's `change` event |
| `is-pressed` | boolean | — | pressed state (reflected, two-way) |
| `is-disabled` | boolean | — | disable |
| `is-hidden` | boolean | — | hide |
| `accent` | `neutral` `dom` `sub` `success` `warning` `error` | inherit | override accent |
| `size` | `xs` `sm` `md` `lg` | inherit | override size |
| `kind` | `solid` `outline` `ghost` `soft` `plain` | inherit | override treatment |
| `is-icon` | boolean | — | square icon-only item |

## Slots

- _(default)_ — label and/or icon.

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `press` | `{ pressed, value }` | consumed by the parent group to drive its `change` event |
