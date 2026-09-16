# Radius

One dial, four steps derived from it by subtraction, and three roles. This is the smallest page in the fundamentals and one of the ones that most changes how a theme feels.

## What it solves

Corners that nest correctly — a field inside a card is visibly tighter than the card — and a single number a theme turns to square everything off at once.

## Primitives

`--base-radius` is the dial. The steps are offsets from it, not multiples, so the *difference* between a card corner and a control corner stays 2px whatever the dial says. `max(0px, …)` keeps a small dial from going negative.

| Token | Formula | Dark / light | Console | Studio |
| --- | --- | --- | --- | --- |
| `--base-radius` | — | `0.625rem` (10px) | `0.3125rem` (5px) | `0.25rem` (4px) |
| `--radius-sm` | `max(0, base − 4px)` | 6px | 1px | 0 |
| `--radius-md` | `max(0, base − 2px)` | 8px | 3px | 2px |
| `--radius-lg` | `base` | 10px | 5px | 4px |
| `--radius-xl` | `base + 4px` | 14px | 9px | 8px |

<z-token-table names="--radius-sm --radius-md --radius-lg --radius-xl" kind="radius"></z-token-table>

The pill is not on the scale: `999px` is a literal, used 68 times, and means "fully round regardless of height". A circle (`50%`) is used by five components for avatars and dots.

## Semantic tokens

The roles are the steps, read by what they are for. There is no separate role layer here; the step names carry the role.

| Role | Token | → Formula | Used by | Consumers |
| --- | --- | --- | --- | --- |
| Inset | `--radius-sm` | base − 4px | Chips, small buttons, menu items, swatches — anything inside a control-sized parent. | 64 |
| Control | `--radius-md` | base − 2px | Fields, medium buttons, popovers, tabs. | 62 |
| Container | `--radius-lg` | base | Cards, dialogs, sheets, surfaces. | 31 |
| Hero | `--radius-xl` | base + 4px | Large media, a bento tile. | 4 |
| Pill | `999px` literal | — | Badges, switches, range thumbs, scrollbar thumbs. | 68 |

Buttons read the scale through one alias per size, so a button's corner can be retuned without touching fields: `--small-button-radius` → `sm`, `--medium-button-radius` → `md`, `--large-button-radius` → `lg`. A per-instance `--z-button-radius` overrides all three.

## In use

A container holding a control holding an inset — each one step tighter than its parent, from the same dial.

<div style="padding: var(--space-lg); border: 1px solid var(--border); border-radius: var(--radius-lg); background: var(--card);">
<div style="display: flex; gap: var(--space-sm); align-items: center; flex-wrap: wrap;">
<z-input placeholder="--radius-md" style="min-width: 10rem;"></z-input>
<z-button size="sm" kind="soft" accent="dom">--radius-sm</z-button>
<z-badge accent="sub">pill</z-badge>
</div>
</div>

```css
.card   { border-radius: var(--radius-lg); }   /* container */
.field  { border-radius: var(--radius-md); }   /* control   */
.chip   { border-radius: var(--radius-sm); }   /* inset     */
.badge  { border-radius: 999px; }              /* pill      */
```

## Rules

- **Do** step down one level per nesting. Container → control → inset. A control-radius element inside a control-radius parent looks like a mistake at the corners.
- **Do** use `999px` for a pill, not `--radius-xl`. A pill is round at any height; `xl` is 14px and stops being round on a tall element.
- **Don't** write a radius in px. Themes square the whole system through `--base-radius`; a literal `8px` stays round on an aluminium panel.
- **Don't** add `--radius-2xl`. The layout helpers compute `calc(var(--radius) + 8px)` for the one place that wants it; if a second place appears, promote it then.

## Rationale

Subtraction rather than a ratio is what makes nesting work: a 0.8× ratio at a 4px dial gives 3.2px and 2.56px — three visually identical corners — whereas −2px and −4px at the same dial give 4, 2 and 0, which still read as three steps. That property is why the hardware themes can go nearly square through one number and still have a card visibly softer than the field inside it.
