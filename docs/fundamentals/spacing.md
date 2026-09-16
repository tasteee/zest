# Spacing & sizing

One base unit, a numeric scale multiplied from it, eight named steps on top, and one height scale that every interactive control shares.

## What it solves

Gaps, padding and control heights that agree with each other by construction — an input, a select, a button and a toggle standing in a row resolve to the same height without anyone measuring.

## Primitives

`--base-spacing` is `0.25rem` (4px). Every numeric step is `calc(var(--base-spacing) * N)`; change the dial and the whole rhythm follows.

| Token | N | px at 16 | Token | N | px at 16 |
| --- | --- | --- | --- | --- | --- |
| `--spacing-0` | 0 | 0 | `--spacing-10` | 10 | 40 |
| `--spacing-1` | 1 | 4 | `--spacing-12` | 12 | 48 |
| `--spacing-2` | 2 | 8 | `--spacing-14` | 14 | 56 |
| `--spacing-3` | 3 | 12 | `--spacing-16` | 16 | 64 |
| `--spacing-4` | 4 | 16 | `--spacing-20` | 20 | 80 |
| `--spacing-5` | 5 | 20 | `--spacing-24` | 24 | 96 |
| `--spacing-6` | 6 | 24 | `--spacing-28` | 28 | 112 |
| `--spacing-7` | 7 | 28 | `--spacing-32` | 32 | 128 |
| `--spacing-8` | 8 | 32 | `--spacing-36` | 36 | 144 |
| `--spacing-9` | 9 | 36 | `--spacing-40` | 40 | 160 |

The steps are dense to 12 and then jump by fours: past 48px, a 4px difference is not a decision anyone makes.

## Semantic tokens

### Space

| Token | → Primitive | px | Job |
| --- | --- | --- | --- |
| `--space-xs` | `--spacing-1` | 4 | Icon-to-label, inside a chip. |
| `--space-sm` | `--spacing-2` | 8 | Between controls in a row; swatch padding. |
| `--space-md` | `--spacing-3` | 12 | Inside a field; between a label and its control. |
| `--space-base` | `--spacing-4` | 16 | Default block gap; overlay padding. |
| `--space-lg` | `--spacing-6` | 24 | Card padding. |
| `--space-xl` | `--spacing-8` | 32 | Between sections inside a panel. |
| `--space-2xl` | `--spacing-12` | 48 | Between panels. |
| `--space-3xl` | `--spacing-16` | 64 | Page-level breathing room. |

<z-token-table names="--space-xs --space-sm --space-md --space-base --space-lg --space-xl --space-2xl --space-3xl" kind="space"></z-token-table>

Layout elements (`z-box`, `z-container`, `z-section`, the `wired-*` family) accept the same names as attribute values — `gap="md"`, `padding="lg"` — plus `2xs` and `4xl` at the ends, and pass any raw CSS length through untouched.

### Control sizes

One height scale for every interactive control. Padding deliberately stays per-component — a button wants more inline room than a text field at the same height — but height is what has to match.

| Size | `--control-height-*` | `--control-font-size-*` | Button padding-inline | Icon |
| --- | --- | --- | --- | --- |
| `sm` | `2rem` (32px) | `0.8125rem` (13px) | 0.875rem | 0.875rem |
| `md` | `2.5rem` (40px) | `0.875rem` (14px) | 1rem | 1rem |
| `lg` | `3rem` (48px) | `1rem` (16px) | 1.5rem | 1.125rem |

<z-token-table names="--control-height-sm --control-height-md --control-height-lg --control-font-size-sm --control-font-size-md --control-font-size-lg" kind="space"></z-token-table>

Twelve components read the height scale: button, input, number input, select, combobox, checkbox, switch, toggle button, toggle group, color picker, theme switcher, and `z-field`. A labelled field is three fixed bands — `--field-label-height` 1.25rem + `--field-gap` 0.25rem + the control — so every labelled control in a row is exactly `4rem` tall at `md`.

<z-callout accent="warning" heading="Unfinished: badge is not on the control scale">
<code>z-badge</code> sizes itself from its own rem values rather than <code>--control-height-*</code>, so a badge next to an <code>sm</code> button is close but not equal. The control scale is three steps (<code>sm</code>/<code>md</code>/<code>lg</code>); there is no <code>xs</code> or <code>xl</code> control height, and any component that wants one is inventing it locally.
</z-callout>

## Density rules

| Pick | When |
| --- | --- |
| `sm` | Toolbars, table rows, filter chips, anything that repeats in a list. The 13px text is the floor for UI copy. |
| `md` | The default. Forms, dialogs, settings, every control that stands alone. |
| `lg` | One control that is the point of the page: a search field in a hero, a single call to action. Never a whole form. |

Never mix sizes inside one row. A row of controls is one size, and a field's label band is fixed so the row stays level.

## In use

Four controls at `md`, sharing one height and one gap from roles.

<div style="display: flex; gap: var(--space-sm); align-items: center; flex-wrap: wrap;">
<z-input placeholder="Search" style="min-width: 12rem;"></z-input>
<z-select placeholder="Sort"></z-select>
<z-button accent="dom">Go</z-button>
<z-switch></z-switch>
</div>

```css
.row     { display: flex; gap: var(--space-sm); align-items: center; }
.control { height: var(--control-height-md); font-size: var(--control-font-size-md); }
.card    { padding: var(--space-lg); }
```

## Rules

- **Do** use the named steps for gap and padding. `--spacing-N` is for layout math a name does not cover.
- **Do** read `--control-height-*` for anything a user clicks or types into. A new control that sets its own height is the bug that unified the scale in the first place.
- **Don't** pad a control to a height. Set the height and let padding be the component's own.
- **Don't** put two sizes in one row.
- **Don't** invent a step between `--space-md` and `--space-base`. 14px is not a decision.

## Rationale

A 4px base with named steps is the most common convention in the field, and there was no reason to be clever about it — the value of the scale is that everyone already knows it. Unifying control height was a fix, not a design: input and combobox were 44px at medium while everything else was 40, and nothing said which was right. A shared token made the question unaskable.
