# wired-grid

Fixed or intrinsic grid layout from `@tasteee/wired`, re-exported and registered by the root `@tasteee/zest` import.

```html
<wired-grid min="16rem" gap="lg">
  <z-card>One</z-card>
  <z-card>Two</z-card>
  <z-card>Three</z-card>
</wired-grid>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `columns` | number (1–12) | — | Explicit equal-column count. Mutually exclusive with `min`. |
| `min` | CSS length | — | Minimum width for intrinsic responsive tracks. Mutually exclusive with `columns`. |
| `gap` | `none` `2xs` `xs` `sm` `md` `lg` `xl` `2xl` | `none` | Spacing on both axes. |
| `column-gap` | `none` `2xs` `xs` `sm` `md` `lg` `xl` `2xl` | — | Overrides horizontal spacing. |
| `row-gap` | `none` `2xs` `xs` `sm` `md` `lg` `xl` `2xl` | — | Overrides vertical spacing. |
| `x` | `start` `center` `end` `stretch` | `stretch` | Horizontal item alignment. |
| `y` | `start` `center` `end` `stretch` | `stretch` | Vertical item alignment. |
| `constrain` | `xs` `sm` `md` `lg` `xl` `2xl` | — | Centers the grid and limits its inline size. |
