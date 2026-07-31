# z-progressive-blur

Wraps slotted content (an image, a card, a hero panel) and fades a blur in
from one edge — strongest right at the edge, clear `reach`% in. Useful for
legibility behind an overlapping heading or toolbar without blurring the
whole image.

```html
<z-progressive-blur direction="bottom" strength="lg" reach="50" radius="lg">
  <img src="/hero.svg" alt="" width="600" />
</z-progressive-blur>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `direction` | `top` `bottom` `left` `right` | `bottom` | which edge the blur is strongest at |
| `strength` | `sm` `md` `lg` `xl` | `md` | max blur radius |
| `reach` | number (%) | `40` | how far the blur fades in, as a percentage of the content |
| `radius` | radius token / length | — | corner radius of the wrapped content — `none` `sm` `md` `lg` `xl` `2xl` `full` |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — the content to blur.

## Notes

- Built from 8 stacked `backdrop-filter` layers, each with its own blur
  amount and mask gradient, since `backdrop-filter` itself can't vary in
  strength across a single element.
