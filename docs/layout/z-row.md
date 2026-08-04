# z-row

[z-box](../foundation/z-box.md) with the flow direction locked to a
horizontal row. A thin wrapper — every other z-box attribute (`gap`,
`aligns-x`/`aligns-y`, `does-wrap`, `padding`/`margin`, `inset`,
`is-full-width`/`is-full-height`, grid attributes, …) works exactly the same way.
See [z-box](../foundation/z-box.md) for the full attribute reference and
value scale.

```html
<z-row gap="md" aligns-x="between" aligns-y="center">
  <span>Left</span>
  <span>Right</span>
</z-row>

<!-- wrapping row of chips -->
<z-row wrap gap="sm">
  <z-badge>Tag</z-badge>
  <z-badge>Tag</z-badge>
</z-row>
```

## Slots

- _(default)_ — row children.
