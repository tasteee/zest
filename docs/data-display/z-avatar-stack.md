# z-avatar-stack

Overlaps slotted [z-avatar](z-avatar.md) children into a single cluster,
capping how many render (`max`) and summarizing the rest as a "+N" badge.

```html
<z-avatar-stack max="3" total="241">
  <z-avatar name="Ada Lovelace"></z-avatar>
  <z-avatar name="Alan Turing"></z-avatar>
  <z-avatar name="Grace Hopper"></z-avatar>
  <z-avatar name="Margaret Hamilton"></z-avatar>
</z-avatar-stack>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `max` | number | — | avatars to render before overflowing into the "+N" badge |
| `total` | number | — | overrides the overflow count for cases where not every avatar is in the DOM (e.g. "+241" for a big roster) |
| `size` | `xs` `small` `large` `xl` | medium (default) | avatar size and overlap amount |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — [z-avatar](z-avatar.md) children. Overlap direction follows
  slot order — later avatars paint over earlier ones.

## Notes

- Override the ring color between avatars with `--stack-ring` (defaults to
  `--background`, so it blends with the page).
