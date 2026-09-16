# Borders & outlines

The hairline is the load-bearing element of a flat system: it is what separates a surface from the page when nothing else is allowed to. This page is the stroke widths, the three border roles, and the one focus ring.

## What it solves

A single answer to "how thick, and which grey?" for every edge in the library, and a keyboard focus indicator that looks the same on a button, a field and a card.

## Primitives

Stroke widths are not tokens — they are a fixed set of three, and each has one job.

| Width | Job | Count in the library |
| --- | --- | --- |
| `1px` | The hairline. Every surface edge, every field, every divider. | 184 declarations |
| `2px` | A knockout ring: the gap between a range thumb and its track, an avatar and its stack. Always the *page* colour, never a grey. | 15 |
| `3px` | The keyboard focus outline. Never a border. | 6 |

The greys come from the neutral ramp's middle:

| Primitive | Dark L | Light L | Contrast on page |
| --- | --- | --- | --- |
| `--color-neutral-3` | 0.31 | 0.876 | 1.3 — an edge, not a fill |
| `--color-neutral-4` | 0.40 | 0.818 | 1.8 — a hovered edge |
| `--color-neutral-7` | 0.80 | 0.408 | 8.2 / 7.5 — a ring you cannot miss |

## Semantic tokens

| Role | Token | → Primitive | Job |
| --- | --- | --- | --- |
| Subtle | `--border` | `neutral-3` | The resting hairline on cards, panels, tables, dividers. |
| Subtle | `--input` | `neutral-3` | The resting hairline on fields. Same value today; a separate name so fields can diverge without touching cards. |
| Default | `--ring` | `neutral-4` | A hovered or emphasised edge, and the decorative glow behind `--emissive-focus` in the hardware themes. Not a focus indicator. |
| Strong | `--focus-ring` | `neutral-7` | The keyboard focus outline. The only border role that has to clear 3:1. |
| Accent | `--tone-color` (component-local) | any accent | An outline button's edge, an invalid field's edge. Set by `accent`, read by `kind`. |

<z-token-table names="--border --input --ring --focus-ring" kind="color"></z-token-table>

## Focus ring

One spec:

```css
:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 2px;
}
```

`3px` because a hairline-weight ring disappears against a hairline border; `outline-offset: 2px` so the ring never touches the element's own edge and the page colour shows between them; `:focus-visible` so a mouse click does not paint it. Fields use `2px` on `:focus-within` with the same colour, because a field already has a visible edge and a 3px ring on top of it reads as a double border.

<z-callout accent="warning" heading="Unfinished: two focus specs are shipping">
The 16 core controls (button, input, select, checkbox, switch, tabs, badge, …) read <code>--focus-ring</code>. 32 other components — links, breadcrumbs, pagination, the nav tree, the theme switcher, the knob — still paint <code>3px solid color-mix(in oklch, var(--ring) 50%, transparent)</code>, which is <code>neutral-4</code> at half opacity and does not clear 3:1 on the dark page. Those should move to <code>--focus-ring</code>; the <code>--ring</code> form is the decorative one.
</z-callout>

## In use

Three edges and one ring, all from roles. Tab through them.

<div style="display: flex; gap: var(--space-md); flex-wrap: wrap; align-items: center;">
<z-card heading="Subtle" description="1px --border"></z-card>
<z-input placeholder="Focus me — 2px --focus-ring"></z-input>
<z-button kind="outline" accent="dom">Accent edge</z-button>
<z-button>Focus — 3px --focus-ring</z-button>
</div>

```css
.card  { border: 1px solid var(--border); }
.field { border: 1px solid var(--input); }
.field:focus-within  { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
.button:focus-visible { outline: 3px solid var(--focus-ring); outline-offset: 2px; }
.button.is-outline   { border-color: var(--tone-color); }
```

## Rules

- **Do** put a `1px solid var(--border)` on every surface that is not the page.
- **Do** use `outline`, not `border` or `box-shadow`, for focus. An outline does not shift layout and is not clipped by `overflow: hidden` on the element itself.
- **Don't** use `--ring` for focus. It is `neutral-4`, contrast 1.8 — that is a hover edge.
- **Don't** thicken a border to show state. An invalid field changes *colour* (`--tone-color` → `--destructive`), not width.
- **Don't** paint a `2px` ring in any colour but `--background`. It is a knockout, and a grey one reads as a second border.

## Rationale

Three widths with three jobs means a reader can tell what an edge *means* from how thick it is, without reading the colour. Keeping `--ring` and `--focus-ring` as separate tokens — rather than one ring that is sometimes decorative — is what let the hardware themes give focus an LED glow while the flat themes give it a plain 3px band, without any component choosing.
