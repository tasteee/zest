# z-card

A bordered content card with rounded corners and comfortable padding. Borders
over shadows — optionally brightens its border on hover/focus.

```html
<z-card>
  <wired-column gap="xs">
    <z-heading size="xs">Title</z-heading>
    <z-text color="muted">Supporting copy.</z-text>
  </wired-column>
</z-card>

<z-card is-reactive>
  …
</z-card>
```

## Attributes

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `is-reactive` | boolean | — | brighten the border on hover / focus-within |

## Slots

- _(default)_ — card contents.
