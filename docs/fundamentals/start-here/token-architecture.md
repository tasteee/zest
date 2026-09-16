# Token architecture

Every value in zest passes through three layers on its way to a pixel. Each fundamentals page shows the same flow for its own subject; this page is the flow itself.

## What it solves

A theme needs to change hundreds of values at once without any component knowing, and a component needs to ask for "a border" without knowing which theme is answering. Layering the tokens is what makes both true at the same time.

## The three layers

```css
--color-neutral-1: oklch(from var(--base-neutral-color-dark) 0.21 c h); /* 1. primitive  */
--card: var(--color-neutral-1);                                          /* 2. semantic   */
.panel { background: var(--card); }                                      /* 3. component  */
```

| Layer | Named for | Who writes it | Who reads it |
| --- | --- | --- | --- |
| **Primitives** | Position on a scale: `--color-neutral-3`, `--spacing-4`, `--font-size-2`. | A theme block, or a `calc()` from a base dial. | The semantic layer. Components should not. |
| **Semantic** | A role: `--border`, `--card`, `--muted-foreground`, `--space-md`, `--radius-lg`, `--control-height-md`. | `ink.css`, once, as `var()` pointers at primitives. | Every component. This is the only vocabulary a component needs. |
| **Component** | Nothing new — a component consumes semantic tokens in its own shadow styles. Per-instance knobs are the exception: `--z-button-radius`, `--z-container-size`, `--toggle-icon-size`. | Component CSS. | The browser. |

### The dials under the primitives

Primitives are mostly computed, not typed. A handful of `--base-*` dials feed them:

| Dial | Default (dark) | Drives |
| --- | --- | --- |
| `--base-neutral-color-dark` / `-light` | `oklch(0.185 0.008 270)` / `#fff` | The two ends of the neutral ramp. |
| `--base-accent-color-0` / `-1` | pink `lch(62 70 1)` / purple `lab(60 40 -58)` | `--color-primary-*` and `--color-secondary-*`, and `--pink` / `--purple`. |
| `--base-success-color`, `-warning-`, `-danger-` | single values | `--success`, `--warning`, `--destructive`. No ramp. |
| `--base-spacing` | `0.25rem` | Every `--spacing-N`. |
| `--base-radius` | `0.625rem` | Every `--radius-*`. |
| `--base-font-size` | `16px` | The `--font-size-0…8` ladder and every `z-text` / `z-heading` size. |
| `--base-sans-font-family`, `-mono-`, `-serif-` | DM Sans / DM Mono / DM Serif Display | `--font-sans`, `--font-mono`, `--font-serif`, with fallback stacks intact. |

A theme that only turns dials gets a coherent result for free; a theme that wants a different *shape* of ramp (light does — see [Color](../color.md)) restates the primitives instead.

## Naming rules

| Pattern | Layer | Examples |
| --- | --- | --- |
| `--base-<thing>` | dial | `--base-radius`, `--base-accent-color-0` |
| `--color-<ramp>-<step>`, `--spacing-<n>`, `--font-size-<n>` | primitive | `--color-neutral-3`, `--spacing-6`, `--font-size-2` |
| `--<role>` or `--<role>-<variant>` | semantic | `--border`, `--card-foreground`, `--space-lg`, `--radius-md` |
| `--material-*`, `--elevation-*`, `--emissive-*` | semantic, material | Legal `background` / `box-shadow` values; inert by default. See [theming](../../theming.md). |
| `--z-<element>-<knob>` | component knob | `--z-button-radius`, `--z-overlay-max-width` |
| `--z-<layer>` | stacking | `--z-toolbar`, `--z-menu`, `--z-overlay` |

Two legacy families exist and are aliases, not a fourth layer: the shadcn-shaped `--color-<role>` mirrors (`--color-border` → `--border`) and the pre-ramp names (`--bg`, `--paper`, `--line`). New code reads the semantic name on the right of the arrow.

## The `z-` and `is-` conventions

- Every element is `z-<name>`. Layout rows, columns and grids come from `@tasteee/wired` and keep their `wired-*` tags.
- Every boolean attribute is `is-<state>`: `is-disabled`, `is-open`, `is-full-width`, `is-loading`. There are no bare booleans on the public surface, and presence is truth — `is-disabled="false"` still disables.
- Enumerated attributes are bare: `size`, `kind`, `accent`, `align`, `orientation`. The release gate rejects `tone` as an attribute name; the public word is `accent`.
- Inside a shadow root, state classes mirror the attribute in kebab: `button.is-solid`, `.text.is-md`. On the light-DOM `<html>`, the one global state class is camelCase: `html.isThemeFading`.
- Themes are `data-theme="dark|light|console|studio"` on any element, and nest.

## How the accent pointer works

There is no `--accent-1…9` ramp being repointed. The pointer is one variable, `--tone-color`, that the `accent` attribute sets and every `kind` reads:

```css
/* z-button, inside its shadow root */
button.is-neutral { --tone-color: var(--color-neutral-8); }
button.is-dom     { --tone-color: var(--purple); }
button.is-sub     { --tone-color: var(--pink); }
button.is-success { --tone-color: var(--success); }
button.is-warning { --tone-color: var(--warning); }
button.is-error   { --tone-color: var(--destructive); }

button.is-solid   { background: var(--material-tone), var(--tone-color); color: var(--on-accent); }
button.is-outline { border-color: var(--tone-color); color: var(--tone-color); }
```

`dom` and `sub` — dominant and subordinate — are the two accents the library owns; `--purple` and `--pink` sit under them. The three state accents are reserved (see [Color](../color.md)). Overlays repoint a page-level pointer the same way: `z-menu[accent="sub"]` sets `--accent: var(--pink)` on its host and its highlight reads `--accent`.

## In use

The flow, end to end, through a real element. `z-card` reads only semantic tokens; switch the theme and every one of them re-resolves.

<z-card heading="A card" description="border, radius, padding, colour — all roles">
<z-text>Nothing in this card's stylesheet knows what theme it is in.</z-text>
</z-card>

```css
/* primitive → semantic → component */
--color-neutral-3: oklch(from var(--base-neutral-color-dark) 0.31 c h);
--border: var(--line);            /* --line: var(--color-neutral-3) */

:host {                            /* z-card */
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  color: var(--foreground);
  background: var(--material-surface);
  box-shadow: var(--elevation-flush);
}
```

## Rules

- **Do** add a semantic token when a component needs a role that has no name. The primitive it points at is a one-line decision; the name is the durable part.
- **Do** declare the whole ramp in a theme block. A theme that omits `--color-neutral-5` silently inherits dark's, and nothing errors.
- **Don't** read a primitive from a component. 26 components currently read `--color-neutral-N` directly; each is a role that has not been named yet.
- **Don't** put a value in a semantic token. `--card: var(--color-neutral-1)` is right; `--card: oklch(…)` breaks re-theming through the dials.
- **Don't** introduce a new naming pattern. If a token does not fit the table above it is probably in the wrong layer.

## Rationale

Three layers is the minimum that lets a theme be one block of assignments and a component be zero. Two layers (values → components) means every theme rewrites every component; four means nobody remembers which layer they are in. The names are the contract, which is why the naming rules are stricter than the values.
