# z-toolbar-group

A labeled cluster of related controls inside a [z-toolbar](z-toolbar.md).
Keeps its buttons visually tight and exposes an accessible group name.

```html
<z-toolbar>
  <z-toolbar-group label="Text style">
    <z-button kind="ghost">B</z-button>
    <z-button kind="ghost">I</z-button>
  </z-toolbar-group>
</z-toolbar>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `label` | string | — | accessible group name (`aria-label`) |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — the grouped controls.
