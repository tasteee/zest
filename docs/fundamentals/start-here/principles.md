# Principles

Four decisions that every token, theme and component in zest answers to. A change that contradicts one of them is wrong before it is reviewed, which is the point of writing them down.

## What it solves

A system without stated principles re-argues its values at every component; these four settle the arguments once, so a review can ask "which principle does this break?" instead of "do I like it?".

## The four

| Principle | What it means | What enforces it |
| --- | --- | --- |
| **Flat by design** | Depth comes from surface tone and a hairline border. The default theme paints no shadow and no gradient, anywhere. | Every `--elevation-*` and `--material-*` token has an inert default (`0 0 transparent`, `none`). Only a hardware theme overrides them; components never do. |
| **Dark-first** | `:root` *is* the dark theme. Light, console and studio are override blocks that restate the full ramp. | The neutral ramp climbs from the dark floor up: `--color-neutral-0` is the page, `-8` is body text. A light theme re-authors all ten steps rather than inverting them. |
| **Colour ⟂ kind** | What colour a control is and how it is filled are independent axes. | `accent` sets `--tone-color`; `kind` paints with it. Every accent × kind pair is legal and looks intended, because neither axis knows about the other. |
| **Intent over literal values** | A component names a role, never a value. | Components read `--border`, `--card`, `--space-md` — not `--color-neutral-3`, not a hex. The swatches in these pages copy `var(--token)`, never the resolved colour. |

## In use

One accent, five kinds. The colour was chosen once and the fill five times; nothing had to be tuned for a pair.

<div style="display: flex; gap: var(--space-sm); flex-wrap: wrap; align-items: center;">
<z-button accent="dom" kind="solid">Solid</z-button>
<z-button accent="dom" kind="soft">Soft</z-button>
<z-button accent="dom" kind="outline">Outline</z-button>
<z-button accent="dom" kind="ghost">Ghost</z-button>
<z-button accent="dom" kind="plain">Plain</z-button>
</div>

```html
<z-button accent="dom" kind="solid">Solid</z-button>
<z-button accent="dom" kind="soft">Soft</z-button>
<z-button accent="dom" kind="outline">Outline</z-button>
<z-button accent="dom" kind="ghost">Ghost</z-button>
<z-button accent="dom" kind="plain">Plain</z-button>
```

Inside `z-button` the two attributes never meet. The accent writes one variable and the kind reads it:

```css
button.is-dom   { --tone-color: var(--purple); }                    /* accent */
button.is-solid { background: var(--material-tone), var(--tone-color); } /* kind */
button.is-soft  { background: color-mix(in srgb, var(--tone-color) 15%, transparent); }
```

## Rules

- **Do** reach for a role token first. If no role fits, that is a gap in the semantic layer — add the role, do not reach past it to a primitive.
- **Do** keep the default theme flat. A shadow that "helps" in dark mode is a hierarchy problem that a surface step or a border should have solved.
- **Don't** branch on `data-theme` inside a component. The theme's job is to fill the token vocabulary; the component's job is to read it.
- **Don't** couple colour to fill. A new `kind` must work with every `accent`; a new `accent` must work with every `kind`.
- **Don't** invert a ramp to make a light theme. Author the steps; the jobs of each step change on paper (see [Color](../color.md)).

## Rationale

Flat and dark-first were chosen together: a dark surface has no ambient light to cast a shadow into, so depth built from tone and hairlines is what a dark interface honestly looks like, and it carries to paper unchanged. Separating colour from kind is what keeps the button count at five kinds and six accents instead of thirty hand-tuned variants. Naming intent rather than values is what lets four themes that disagree about physics share every component byte for byte.
