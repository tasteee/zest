# z-separator

A hairline divider that can carry a centered label — the richer sibling of
[z-line](z-line.md). With no label it collapses to a single full-width rule.

```html
<z-separator label="OR"></z-separator>

<!-- richer label via slot -->
<z-separator>
  <z-badge>Section</z-badge>
</z-separator>

<!-- use z-line for an unlabelled vertical rule -->
<z-line vertical></z-line>
```

## Attributes

| Attribute | Type | Description |
| --- | --- | --- |
| `label` | string | text shown centered in the rule |
| `is-hidden` | boolean | hide the separator |

Exposes `role="separator"` with horizontal `aria-orientation`.

## Slots

- _(default)_ — custom label content (used when `label` is not set).
