# z-swatch

One design token, shown as itself: a specimen, the token name, and its
resolved value. Click to copy.

```html
<z-swatch token="--purple"></z-swatch>
<z-swatch token="--space-lg"></z-swatch>
<z-swatch token="--radius-md" description="The default corner."></z-swatch>
```

The value is **resolved, never authored**. It is read with `getComputedStyle`
off the element itself, which buys two things a written-down value could not:
the swatch shows what the token actually is in whatever theme is active, and a
swatch inside a region carrying its own `data-theme` reports that region's
value rather than the page's.

zest ships four themes that disagree about physics, so a token table with
baked-in values would be wrong three quarters of the time.

Clicking copies `var(--token)`, not the resolved value — the token is the
thing you want in your stylesheet; the resolved value is what you are trying
to stop hardcoding.

## Specimens

`kind` is inferred from the token name, because a reference with hundreds of
tokens should not need hundreds of hand-written classifications. Set it
explicitly when the guess is wrong.

| `kind` | Inferred from | Specimen |
| --- | --- | --- |
| `radius` | name contains `radius` | a box with that corner radius |
| `space` | name contains `space` or `spacing` | a bar of exactly that width |
| `type` | name contains `font-size` | `Ag` set at that size |
| `color` | name contains a colour word (`color` `background` `foreground` `border` `accent` `ring` `purple` `pink` `success` `warning` `destructive` `muted` `card` `popover` `sidebar` `chart` `skeleton` `input`) | a filled chip |
| `value` | anything else | no specimen — the value alone |

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `token` | string | — | the custom property; the leading `--` is optional |
| `kind` | `color` `space` `radius` `type` `value` | inferred | which specimen to draw |
| `label` | string | the token name | override the displayed name |
| `description` | string | — | a line under the value |
| `is-hidden` | boolean | — | hide |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `copy` | `{ token, value }` | the token was copied |

## Notes

The theme is observed via `data-theme` on `<html>`, so a swatch re-resolves
when the page theme changes. A region themed by an attribute on some inner
element is read correctly on first render but is not observed for changes.

Every specimen occupies the same box, so a column of mixed kinds still lines
its names up.
