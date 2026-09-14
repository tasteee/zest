# wired-column

Vertical layout from `@tasteee/wired`, re-exported and registered by the root `@tasteee/zest` import.

```html
<wired-column gap="sm" x="start">
  <z-heading size="sm">Account</z-heading>
  <z-text color="muted">Profile and security settings.</z-text>
</wired-column>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `gap` | `none` `2xs` `xs` `sm` `md` `lg` `xl` `2xl` | `none` | Spacing between children. |
| `x` | `start` `center` `end` `stretch` | `stretch` | Horizontal alignment. |
| `y` | `start` `center` `end` `between` `around` `evenly` | `start` | Vertical distribution. |
| `constrain` | `xs` `sm` `md` `lg` `xl` `2xl` | — | Centers the column and limits its inline size. |
