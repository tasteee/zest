# Color

Three ten-step ramps, five reserved colours, and the roles that sit on top of them. This is the layer everything else in the fundamentals is built from.

## What it solves

One place where "what does step 3 do?" and "which grey is a border?" have the same answer in every theme, so a component can ask for a role and a theme can answer in its own ramp.

## Primitives

### Scale anatomy

Every ramp runs `0 → 9`. The neutral ramp is authored dark-first: `0` is the page floor and lightness climbs monotonically to `9`. Each step has one job, and the job is what a theme has to preserve when it restates the values.

| Step | Job (dark) | Semantic tokens that point here |
| --- | --- | --- |
| `neutral-0` | The page. | `--background` |
| `neutral-1` | A surface on the page: card, popover, sidebar. | `--card`, `--popover`, `--sidebar` |
| `neutral-2` | A well or a lifted band: hover fills, dialog body, `--background-light`. | `--background-light` |
| `neutral-3` | Hairlines and skeletons. Nearly invisible as a fill. | `--border`, `--input`, `--skeleton`, scrollbar thumb |
| `neutral-4` | The decorative ring and a hovered hairline. | `--ring` |
| `neutral-5` | Secondary text and the lowest-contrast chart series. | `--secondary` |
| `neutral-6` | Muted text: descriptions, placeholders, comments. | `--muted`, `--muted-foreground` |
| `neutral-7` | The keyboard focus ring and selection highlight. | `--focus-ring`, `--selection-background` |
| `neutral-8` | Body text. The primary UI colour. | `--foreground`, `--primary` |
| `neutral-9` | The brightest white. Reserved; a few elements opt in directly. | — |

<z-token-table names="--color-neutral-0 --color-neutral-1 --color-neutral-2 --color-neutral-3 --color-neutral-4 --color-neutral-5 --color-neutral-6 --color-neutral-7 --color-neutral-8 --color-neutral-9" kind="color"></z-token-table>

The light theme keeps the *jobs* and rewrites the *order*: `1` lifts above the page (raised surfaces read lighter on paper), `2` recedes below it, and `5–9` descend into ink. That is why light is hand-authored rather than derived — an inverted dark ramp would put the card below the page.

### Palettes

| Ramp | Anchor | Hue | Chroma | Notes |
| --- | --- | --- | --- | --- |
| `--color-neutral-*` | `--base-neutral-color-dark` / `-light` | 270 (dark) · 292 (light) · 250 (console) · 220 (studio) | 0.004–0.022 | A cool tint, not a pure grey: a neutral with zero chroma sits visibly warmer than the purple accent next to it. Each theme picks its own tint. |
| `--color-primary-*` | `--base-accent-color-0` (pink) | ~1 | 0.02–0.22 | Step `4` is the base colour; `0–3` darken toward the floor, `5–9` tint toward white. |
| `--color-secondary-*` | `--base-accent-color-1` (purple) | ~288 | 0.02–0.22 | Same shape as primary. |
| `--success`, `--warning`, `--destructive` | `--base-*-color` | 145 · 76 · 37 | — | Single values. There is no ramp for a state colour, on purpose: the state colours are signals, and a signal has one intensity. |

<z-token-table names="--color-primary-0 --color-primary-2 --color-primary-4 --color-primary-6 --color-primary-8 --color-secondary-0 --color-secondary-2 --color-secondary-4 --color-secondary-6 --color-secondary-8" kind="color"></z-token-table>

<z-callout accent="warning" heading="Unfinished: the accent ramps have no consumers">
No component reads <code>--color-primary-N</code> or <code>--color-secondary-N</code>. The only readers are two syntax-highlighting tokens. Every accent role below points at the <em>anchor</em> (<code>--purple</code>, <code>--pink</code>), so the ramps are computed and then ignored. Either the soft/ghost fills should move off <code>color-mix()</code> and onto the ramp, or the ramp should go.
</z-callout>

## Semantic tokens

| Role | Token | → Primitive | Job |
| --- | --- | --- | --- |
| Surface | `--background` | `neutral-0` | The page. |
| Surface | `--card` | `neutral-1` | A bordered surface at rest. |
| Surface | `--popover` | `neutral-1` (dark) · `neutral-2` (console) | A floating surface. Separated from `--card` by border and stacking, not tone, in the flat themes. |
| Surface | `--background-light` | `neutral-2` | A well: hover fill, inset band. |
| Text | `--foreground` | `neutral-8` | Body and label text. |
| Text | `--muted-foreground` | `neutral-6` | Descriptions, placeholders, captions. |
| Text | `--secondary-foreground` | `--primary` → `neutral-8` | Text on a `--secondary` fill. |
| Text | `--primary-foreground` | `--bg` → `neutral-0` | Text on a neutral solid fill (the fill flips with the theme, so the text does too). |
| Text | `--on-accent` | `#111216` (dark) · `#fff` (light, studio) | Text on any accent solid fill. |
| Border | `--border` | `neutral-3` | The hairline. |
| Border | `--input` | `neutral-3` | Same value; a separate name so fields can diverge later. |
| Border | `--ring` | `neutral-4` | Decorative ring; never the keyboard ring. |
| Border | `--focus-ring` | `neutral-7` | The keyboard focus outline. Contrast-bearing. |
| Accent | `--purple` / `--accent` | `--base-accent-color-1` | The dominant accent — `accent="dom"`. |
| Accent | `--pink` / `--accent-alt` | `--base-accent-color-0` | The subordinate accent — `accent="sub"`. |
| Accent | `--success` | `--base-success-color` | Confirms. Only ever confirms. |
| Accent | `--warning` | `--base-warning-color` | Cautions. |
| Accent | `--destructive` | `--base-danger-color` | Destructive and error states, nothing else. |

<z-token-table names="--background --card --popover --background-light --foreground --muted-foreground --border --ring --focus-ring --on-accent" kind="color"></z-token-table>

<z-token-table names="--purple --pink --success --warning --destructive" kind="color"></z-token-table>

## Accent pointer

`accent` does not choose a colour ramp; it sets one variable, and every `kind` paints from that variable. One worked example, `z-button`, top to bottom:

```css
/* 1. primitives / anchors, in ink.css */
--base-accent-color-1: lab(60 40.17 -57.68);
--purple: var(--base-accent-color-1);

/* 2. the pointer — set by the accent attribute, inside the shadow root */
button.is-dom   { --tone-color: var(--purple); }
button.is-error { --tone-color: var(--destructive); }

/* 3. every kind reads the pointer and nothing else */
button.is-solid   { background: var(--material-tone), var(--tone-color); color: var(--on-accent); }
button.is-soft    { background: color-mix(in srgb, var(--tone-color) 15%, transparent); color: var(--tone-color); }
button.is-outline { border-color: var(--tone-color); color: var(--tone-color); }
```

So `<z-button accent="error" kind="soft">` is the destructive colour at 15% over transparent, with destructive text — and no rule anywhere was written for that pair.

## Contrast

Ratios below are computed from the token math for the dark and light themes, text against `--background` (`neutral-0`). The docs server's `core.html` measures the same pairs live, including the hardware themes.

| Pair | Dark | Light | Verdict |
| --- | --- | --- | --- |
| `--foreground` (`neutral-8`) on page | 11.3 | 11.3 | AAA everywhere. |
| `--muted-foreground` (`neutral-6`) on page | 5.4 | 4.7 | AA body text in both. Light is the one to watch: `neutral-6` is the lowest step that still clears 4.5. |
| `--secondary` (`neutral-5`) on page | 3.3 | 3.2 | Large text and UI only. Not for body copy. |
| `--focus-ring` (`neutral-7`) on page | 8.2 | 7.5 | Clears the 3:1 non-text minimum by a wide margin. |
| `--border` (`neutral-3`) on page | 1.3 | 1.3 | Decorative. Never rely on a hairline to convey state. |
| `--purple` as text on page | 6.1 | 6.0 | AA. |
| `--pink` as text on page | 6.4 | 4.0 | AA on dark; **large-text only on light**. |
| `--success` / `--warning` / `--destructive` as text on page | 6.5 / 8.9 / 5.7 | 4.1 / 3.8 / 4.1 | AA on dark; large-text only on light. |
| `--on-accent` on any solid accent | 5.7–8.9 | 5.3–8.3 | AA for every accent in both themes. |

The guaranteed pairs, then: `neutral-8` and `neutral-6` on `neutral-0`/`-1` for text; `neutral-7` for a ring; any accent under `--on-accent` as a solid fill; any accent as text on dark. Accent-as-text on light is a large-text guarantee only.

## In use

Only roles are read here. Switch the theme and every swatch above, and every colour below, re-resolves.

<z-card heading="Colour roles" description="surface, text, border and accent — nothing literal">
<div style="display: flex; gap: var(--space-sm); flex-wrap: wrap; align-items: center; margin-top: var(--space-sm);">
<z-button accent="dom">Dominant</z-button>
<z-button accent="sub" kind="soft">Subordinate</z-button>
<z-button accent="error" kind="outline">Destructive</z-button>
<z-text color="muted">Muted description text.</z-text>
</div>
</z-card>

```css
.card {
  background: var(--card);
  color: var(--foreground);
  border: 1px solid var(--border);
}
.card .description { color: var(--muted-foreground); }
.card:focus-visible { outline: 3px solid var(--focus-ring); }
```

## Rules

- **Do** read a role. `--border`, not `--color-neutral-3`; `--muted-foreground`, not `--color-neutral-6`.
- **Do** put `--on-accent` on every solid accent fill. It flips between themes; a pinned `white` or `#111` will be wrong in half of them.
- **Don't** use `--destructive` for emphasis, or `--success` for "primary". The state colours are reserved, and their meaning is the whole reason they contrast the way they do.
- **Don't** use `--ring` for keyboard focus. That is `--focus-ring`; `--ring` is decoration and does not clear 3:1.
- **Don't** set an accent as body text in a light theme without checking the table above.

## Rationale

Ten steps with fixed jobs beats twelve with fuzzy ones: the jobs are what a theme author has to keep, and a step without a job is a step that will be used for the wrong thing. The tinted neutrals exist because a pure grey next to a chromatic accent reads as *warm*, and the cheapest fix is to give the grey a little of the accent's hue. State colours stay single values because a ramp would invite using red as a palette.
