# z-separator

The divider. A hairline rule that can carry a centered label. With no label it
collapses to a single full-width rule, and `vertical` makes it the 1px rule that
divides clusters in a row. This absorbed `z-line`, which was this element with
the label taken away.

```html
<z-separator label="OR"></z-separator>

<!-- richer label via slot -->
<z-separator>
  <z-badge>Section</z-badge>
</z-separator>

<!-- unlabelled vertical rule -->
<z-separator vertical></z-separator>
```

## Attributes

| Attribute | Type | Description |
| --- | --- | --- |
| `label` | string | text shown centered in the rule; ignored when vertical |
| `vertical` | boolean | fill the available height instead of the width |
| `is-hidden` | boolean | hide the separator |

Exposes `role="separator"` with an `aria-orientation` matching its axis — you
never write either yourself. A vertical rule needs a parent with a resolvable
height; in a block container it collapses to nothing.

## Slots

- _(default)_ — custom label content (used when `label` is not set).
