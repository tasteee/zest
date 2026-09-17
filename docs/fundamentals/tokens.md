# Tokens

Zest uses shared tokens for theme colors, control geometry, typography, and
spacing. Component-specific details sit on top of these foundations. This page
is the resolved-value reference; the [fundamentals](./color.md)
explain each layer and the flow from primitive to semantic to component.

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

## Core controls

<z-token-table names="--control-height-sm --control-height-md --control-height-lg --control-font-size-sm --control-font-size-md --control-font-size-lg" kind="space"></z-token-table>

Use `--focus-ring` for keyboard outlines and `--on-accent` for text on colored
solid fills. `--control-disabled-opacity` is the shared disabled-control opacity.
