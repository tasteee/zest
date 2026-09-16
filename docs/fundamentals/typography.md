# Typography

One base size, a modular ladder computed from it, semantic roles on top, and three font stacks — one of which a theme is allowed to re-face.

## What it solves

Every size in the library derives from `--base-font-size`, so scoping that one dial on a container rescales the whole type system inside it, and a theme can swap the heading face without body text or UI chrome noticing.

## Primitives

### The ladder

A 1.2 ratio, nine steps, anchored at `--font-size-3 = 1rem`. Every step is a `calc()` multiple of `--base-font-size`.

| Step | rem | px at 16 | Step | rem | px at 16 |
| --- | --- | --- | --- | --- | --- |
| `--font-size-0` | 0.579 | 9.3 | `--font-size-5` | 1.563 | 25 |
| `--font-size-1` | 0.694 | 11.1 | `--font-size-6` | 1.953 | 31.2 |
| `--font-size-2` | 0.833 | 13.3 | `--font-size-7` | 2.441 | 39.1 |
| `--font-size-3` | 1 | 16 | `--font-size-8` | 3.052 | 48.8 |
| `--font-size-4` | 1.25 | 20 | | | |

<z-token-table names="--font-size-0 --font-size-1 --font-size-2 --font-size-3 --font-size-4 --font-size-5 --font-size-6 --font-size-7 --font-size-8" kind="type"></z-token-table>

### Line-height and tracking

Line-height tightens as size grows; tracking goes negative as size grows and is scaled by the theme's `--font-heading-tracking-scale`.

| Role | Line-height | Tracking (em) |
| --- | --- | --- |
| `--line-height-display` | 0.9 | −0.06 × scale |
| `--line-height-h1` / `-h2` / `-h3` / `-h4` | 1 / 1.1 / 1.2 / 1.3 | −0.05 … −0.006 × scale |
| `--line-height-body` | 1.6 | −0.011 |
| `--line-height-small` / `-caption` | 1.5 / 1.4 | −0.005 / 0 |
| Subheading (uppercase overline) | 1.25–1.43 | **+0.075** — tracked open, never tight |

### Weights

Four names, and the variable faces accept anything between. `z-text weight="850"` is a real weight in DM Sans; the names are the recommended stops, not a whitelist.

| Token | Value | Used for |
| --- | --- | --- |
| `--font-weight-regular` | 400 | Body. |
| `--font-weight-medium` | 500 | Captions and overlines that need to hold their own. |
| `--font-weight-semibold` | 600 | Labels, solid-button text, table headers. |
| `--font-weight-bold` | 700 | Headings — through `--font-heading-weight`, which a theme may change. |

### Font stacks

| Token | Default | Re-faced through |
| --- | --- | --- |
| `--font-sans` | DM Sans, fallback, system-ui | `--base-sans-font-family` — keeps the fallback stack intact |
| `--font-mono` | DM Mono, Geist Mono, Fira Code | `--base-mono-font-family` |
| `--font-serif` | DM Serif Display, Iowan, Georgia | `--base-serif-font-family` — declared, unused by any shipped theme |
| `--font-heading` | `var(--font-sans)` | Directly; the one tier a theme re-faces (console: Outfit) |

Console sets Manrope / IBM Plex Mono / Outfit. Every other theme stays on DM Sans and DM Mono so a theme switch never reflows text. See [theming](../theming.md) for the tracking scale each face wants.

## Semantic tokens

| Role | Element | Size token | → Ladder | Weight | Face |
| --- | --- | --- | --- | --- | --- |
| Display | `z-display` | `clamp(2rem, 5vw, 3.25rem)` … `clamp(3.5rem, 11vw, 7.5rem)` | fluid, viewport-bound | `--font-heading-weight` | `--font-heading` |
| Heading | `z-heading size="xs…xxl"` | 1.5× … 4× base | computed from `--base-font-size` | `--font-heading-weight` | `--font-heading` |
| Subheading | `z-subheading` | 0.75× … 1.25× base, uppercase | computed | 600 | sans |
| Body | `z-text size="xs…xxl"` | 0.75× … 1.5× base | computed | 400 | sans |
| Label | `z-label` | `--font-size-small` | 0.875rem | 600 | sans |
| Caption / UI chrome | components | `--font-size-caption`, `--font-size-small` | 0.75rem / 0.875rem | 400–500 | sans |
| Control text | `z-button`, `z-input`, … | `--control-font-size-sm/md/lg` | 13 / 14 / 16px | 400–600 | sans |
| Code | `z-kbd`, `z-code-block`, `z-eyebrow` | 0.6875–0.9375rem | — | 400–500 | `--font-mono` |

<z-token-table names="--font-size-caption --font-size-small --font-size-body --font-size-h4 --font-size-h3 --font-size-h2 --font-size-h1 --font-size-display" kind="type"></z-token-table>

<z-callout accent="warning" heading="Unfinished: three scales, one of them unread">
Three size scales coexist. The <code>--font-size-0…8</code> ladder is read by two components. The semantic <code>--font-size-h1…h4</code> / <code>-display</code> tokens (3rem, 2.25rem, 1.5rem, 1.25rem, 4.5rem) are read by one component each, and <code>--font-size-display</code> by none. <code>z-heading</code> and <code>z-text</code> compute their own multiples of <code>--base-font-size</code> (4×, 3.5×, 3×, 2.5×, 2×, 1.5×) and read neither. Only <code>--font-size-small</code> and <code>-caption</code> are genuinely shared (46 and 41 consumers). The heading tokens should either point at the ladder and be read by <code>z-heading</code>, or be removed.
</z-callout>

## In use

Every element below reads the same base dial. Set `--base-font-size` on a wrapper and the whole block rescales together.

<div style="--base-font-size: 15px; display: grid; gap: var(--space-sm);">
<z-subheading size="sm">Overline</z-subheading>
<z-heading size="md">A heading at 2.5× base</z-heading>
<z-text>Body text at 1× base, line-height 1.75, tracked a hair tight. Muted and label roles below read the same tokens.</z-text>
<z-text color="muted" size="sm">Muted small text — <code>--muted-foreground</code>, 0.875× base.</z-text>
<z-label>a label</z-label>
</div>

```css
.scope   { --base-font-size: 15px; }             /* one dial */
.heading { font: var(--font-heading-weight) calc(var(--base-font-size) * 2.5) / 1.3 var(--font-heading); }
.body    { font-size: var(--base-font-size); line-height: var(--line-height-body); }
.caption { font-size: var(--font-size-caption); color: var(--muted-foreground); }
```

## Rules

- **Do** read `--font-size-small` and `--font-size-caption` for UI chrome. They are the two sizes every component agrees on.
- **Do** re-face through `--base-sans-font-family`, never `--font-sans`. The fallback stack is the part you do not want to retype.
- **Do** track headings tight and overlines open. The sign of the letter-spacing is the role.
- **Don't** set a heading in anything but `--font-heading`. It is the one tier a theme owns; body text and labels stay on `--font-sans` whatever the theme does.
- **Don't** pick a weight outside 400–700 for UI text. Lighter disappears on the dark page; heavier fights the accent for attention.

## Rationale

Deriving everything from one dial means a dense sidebar and a spacious article can share every component and differ by one declaration. Letting a theme re-face only the heading tier is what keeps a theme switch from reflowing a page: the hundreds of small UI labels stay put, and only the few large headings change voice.
