# wired-row

Horizontal layout from `@tasteee/wired`, re-exported and registered by the root `@tasteee/zest` import.

```html
<wired-row gap="md" x="between" y="center">
  <span>Account</span>
  <z-button size="sm">Save</z-button>
</wired-row>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `gap` | `none` `2xs` `xs` `sm` `md` `lg` `xl` `2xl` | `none` | Spacing between children. |
| `x` | `start` `center` `end` `between` `around` `evenly` | `start` | Horizontal distribution. |
| `y` | `start` `center` `end` `stretch` `baseline` | `stretch` | Vertical alignment. |
| `wrap` | boolean | `false` | Allows children to wrap. |
| `constrain` | `xs` `sm` `md` `lg` `xl` `2xl` | — | Centers the row and limits its inline size. |
