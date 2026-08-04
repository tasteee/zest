# Tokens

Every value in zest comes from a token. Nothing in a component hardcodes a
colour, a spacing, a radius, or a type size — which is what lets four themes
that disagree about physics share one component library.

Every swatch below shows its **resolved** value in whatever theme you are
currently reading in. Switch the theme and they all change, because they are
read with `getComputedStyle` rather than written down. Click any swatch to
copy its `var(--token)` form.

## Colour — semantic

The layer components actually reference. These are the only colour tokens a
consumer should need.

<z-token-table names="--background --background-light --foreground --card --card-foreground --popover --popover-foreground --border --input --ring"></z-token-table>

## Colour — accent

`--purple` is the dominant accent and `--pink` the subordinate one; the
`accent="dom"` and `accent="sub"` vocabulary resolves to these. The neons are
accents only, never surfaces.

<z-token-table names="--purple --pink --neon-purple --neon-pink --accent --accent-alt --accent-foreground"></z-token-table>

## Colour — state

Reserved. `--destructive` is for destructive and error states and nothing
else; `--success` only ever confirms.

<z-token-table names="--success --warning --destructive --muted --muted-foreground --skeleton"></z-token-table>

## Spacing

The scale components use for gap, padding, and inset. Layout elements also
accept the numeric `--spacing-N` primitives and any raw CSS length.

<z-token-table names="--space-xs --space-sm --space-md --space-base --space-lg --space-xl --space-2xl --space-3xl" kind="space"></z-token-table>

## Radius

<z-token-table names="--radius-sm --radius-md --radius --radius-lg --radius-xl" kind="radius"></z-token-table>

## Type scale

The semantic sizes. `--font-size-0` through `--font-size-8` are the raw ladder
underneath them.

<z-token-table names="--font-size-caption --font-size-small --font-size-body --font-size-h4 --font-size-h3 --font-size-h2 --font-size-h1 --font-size-display" kind="type"></z-token-table>

## Using them

```css
.thing {
  padding: var(--space-md);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--card);
  color: var(--foreground);
}
```

Two rules cover most of it. Depth comes from surface and border, never from a
shadow or a gradient — see [theming](../theming.md) for how the hardware
themes get away with looking otherwise. And red is reserved: if it is not
destructive, it is not `--destructive`.

See also [z-swatch](../canvas-panels/z-swatch.md) and
[z-token-table](../canvas-panels/z-token-table.md) for documenting your own.
