# z-list-row

One row inside [z-list](z-list.md). Lays its slotted children out on a
horizontal flex line: the second child grows to fill the row by default
(typical pattern: leading icon/avatar, then a growing title/subtitle block,
then trailing actions).

```html
<z-list-row is-clickable>
  <svg>…</svg>
  <div>
    <z-text weight="600">Title</z-text>
    <z-text color="muted" size="sm">Subtitle</z-text>
  </div>
  <z-button kind="ghost" size="sm">Edit</z-button>
</z-list-row>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `is-clickable` | boolean | — | hover/pointer affordance |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — row children. The **second** child grows to fill the row.
  Give any child `class="is-grow"` to make it grow too, or `class="is-wrap"`
  to drop it onto its own full-width line below.
