# z-card

A bordered content card with rounded corners and comfortable padding. Borders
over shadows — optionally brightens its border on hover/focus.

```html
<z-card heading="Title" description="Supporting copy.">
  <z-text size="sm">Card body.</z-text>
</z-card>

<z-card is-reactive>
  …
</z-card>
```

`heading` and `description` render the same header the dialog family renders,
so a card title matches a sheet or dialog title instead of being hand-sized in
every card. Slot your own `z-heading` when the title needs a different level.

## Attributes

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `heading` | string | — | card title, rendered as an h3 |
| `description` | string | — | supporting copy under the heading |
| `is-reactive` | boolean | — | brighten the border on hover / focus-within |

## Slots

- _(default)_ — card contents.
