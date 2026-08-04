# z-column

[z-box](../foundation/z-box.md) with the flow direction locked to a vertical
column. A thin wrapper — every other z-box attribute (`gap`,
`aligns-x`/`aligns-y`, `does-wrap`, `padding`/`margin`, `inset`,
`is-full-width`/`is-full-height`, …) works exactly the same way.
See [z-box](../foundation/z-box.md) for the full attribute reference and
value scale.

```html
<z-column gap="sm" aligns-x="start">
  <span>Top</span>
  <span>Bottom</span>
</z-column>
```

## Slots

- _(default)_ — column children.
