# z-accordion

Wraps slotted [z-collapsible](z-collapsible.md) items and draws hairline dividers
between them. `type="single"` (default) keeps at most one section open at a time;
`type="multiple"` lets several stay open. Coordination is automatic — it listens
for each direct child’s bubbling `toggle` event. Nested accordions coordinate their own items independently; opening a nested section does not close its parent.

```html
<z-accordion type="single">
  <z-collapsible label="What is zest?">An Atomico web component library.</z-collapsible>
  <z-collapsible label="Is it framework-agnostic?">Yes.</z-collapsible>
  <z-collapsible label="Does it ship types?">Yes — and a CEM.</z-collapsible>
</z-accordion>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `type` | `single` `multiple` | `single` | how many sections may be open at once |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — the [z-collapsible](z-collapsible.md) children.
