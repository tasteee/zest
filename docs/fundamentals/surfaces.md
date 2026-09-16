# Surfaces & depth

How a page, a card, a well and a floating panel tell themselves apart when nothing is allowed to cast a shadow.

## What it solves

Hierarchy without light: four surface layers that read as stacked in the flat themes through tone and hairline alone, and that pick up real material in the hardware themes without a component changing.

## Primitives

The neutral ramp's first three steps, plus the material vocabulary that the hardware themes fill in.

| Primitive | Dark | Light | Job |
| --- | --- | --- | --- |
| `--color-neutral-0` | L 0.185 | L 0.966 | The floor. |
| `--color-neutral-1` | L 0.21 | L 0.988 | One step off the floor. On paper that step goes *up* — a raised surface is lighter than the page. |
| `--color-neutral-2` | L 0.25 | L 0.951 | A second step. On paper it goes *down*: a well recedes. |
| `--material-page` / `-surface` / `-raised` | `none` / `transparent` / `none` | same | Legal `background` layers. Inert here; grain and sheen in console and studio. |
| `--elevation-flush` / `-raised` / `-pressed` / `-overlay` / `-carved` | `0 0 transparent` | same | Legal `box-shadow` layers. Inert here; four-layer stacks in the hardware themes. |

<z-token-table names="--color-neutral-0 --color-neutral-1 --color-neutral-2 --color-neutral-3" kind="color"></z-token-table>

## Semantic tokens

The surface ladder, bottom to top. In the flat themes the top two rungs share a tone — a popover is told apart from a card by its border, its stacking and the fact that it floats, not by being lighter.

| Rung | Token | → Primitive | Elevation | Used by |
| --- | --- | --- | --- | --- |
| Page | `--background` | `neutral-0` | `--material-page` on `<body>` | The document. |
| Well | `--background-light` | `neutral-2` | — | Hover fills, inset bands, `z-surface[kind="plain"]`. |
| Card | `--card` | `neutral-1` | `--material-surface` + `--elevation-flush` | Dialogs, sheets, drawers, list rows, 19 components in all. |
| Raised | `--popover` | `neutral-1` (dark, light) · `neutral-2` (console) | `--material-raised` + `--elevation-overlay` | Menus, popovers, selects, tooltips — every floating panel. |

<z-token-table names="--background --background-light --card --popover" kind="color"></z-token-table>

`z-card` itself is the odd one out, and deliberately: its background is `--material-surface`, which is `transparent` in the flat themes. A card at rest is a *border* on the page, not a fill. `--card` is for surfaces that must be opaque — a dialog over content, a sheet sliding in.

## No shadows rule

The default theme paints no `box-shadow` and no gradient anywhere. Hierarchy is built from three things, in order of preference:

1. **A hairline.** `1px solid var(--border)` separates a surface from the page at a contrast of 1.3:1 — visible as an edge, invisible as a fill. This is the card.
2. **One step of tone.** `--background-light` against `--background` is a well; `--popover` against the page is a floating panel. Never more than one step between adjacent layers.
3. **Stacking and a backdrop.** A dialog is above the page because it is *over* it, with a dimmed backdrop, not because it is lit.

The material tokens exist so a hardware theme can add light on top of this — but every one of them is inert until a theme says otherwise, and a component composes them unconditionally:

```css
background: var(--material-surface);        /* transparent here, aluminium in studio */
box-shadow: var(--elevation-flush);         /* 0 0 transparent here, a top-light in console */
```

<z-callout accent="warning" heading="Unfinished: one surface still carries its own shadow">
<code>z-dialog</code> declares a four-layer <code>box-shadow</code> directly, and reads <code>--color-neutral-2</code> as its body rather than <code>--card</code>. It is the one flat-theme surface that casts a shadow. It should read <code>--elevation-overlay</code> and let the theme decide.
</z-callout>

## In use

Three rungs, side by side. Each reads exactly one surface role; the ladder is the only thing separating them.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr)); gap: var(--space-md); padding: var(--space-lg); background: var(--background); border: 1px solid var(--border); border-radius: var(--radius-lg);">
<div style="padding: var(--space-md); border-radius: var(--radius-md); background: var(--background-light); color: var(--muted-foreground);">Well · <code>--background-light</code></div>
<div style="padding: var(--space-md); border-radius: var(--radius-md); background: var(--card); border: 1px solid var(--border); color: var(--foreground);">Card · <code>--card</code></div>
<div style="padding: var(--space-md); border-radius: var(--radius-md); background: var(--popover); border: 1px solid var(--border); box-shadow: var(--elevation-overlay); color: var(--popover-foreground);">Raised · <code>--popover</code></div>
</div>

```css
.well   { background: var(--background-light); }
.card   { background: var(--card);    border: 1px solid var(--border); }
.raised { background: var(--popover); border: 1px solid var(--border); box-shadow: var(--elevation-overlay); }
```

## Rules

- **Do** separate adjacent layers by one step at most. Two steps between a card and its page reads as a different page.
- **Do** put a hairline on any surface that is not the page. A fill without an edge disappears in the hardware themes' grain.
- **Don't** write a `box-shadow` value in a component. Read an `--elevation-*` token; the flat themes will paint nothing and the hardware themes will paint the right thing.
- **Don't** use `--card` for a hover state. That is `--background-light`; the card rung is for surfaces that must stay opaque over content.
- **Don't** reach for `--color-neutral-N` to invent a fifth rung. If four is not enough, the ladder is wrong, not the component.

## Rationale

A dark interface has no ambient light, so a shadow on it is a lie the eye stops believing quickly; hairlines and one-step tone are what a dark surface honestly looks like, and they survive the move to paper unchanged. Keeping the ladder to four rungs is what lets the hardware themes replace *tone* with *material* rung for rung — a theme fills five elevation names, not a per-component shadow list.
