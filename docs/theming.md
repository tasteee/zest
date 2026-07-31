# Theming

zest ships four themes that disagree about physics.

| Theme | Scheme | Character |
| --- | --- | --- |
| `dark` | dark | The default. Flat ink — no shadow, no gradient, depth from surface and border alone. |
| `light` | light | Haze. Soft lavender paper lit by wide colour washes. No pure white. |
| `console` | dark | Black anodized aluminium, matte caps, milled square corners. |
| `studio` | light | Bead-blasted aluminium synth panel. Carved paneling, silkscreen labels, tight radii. |

Apply one by writing `data-theme` onto `<html>`, or onto any element to theme a
region. See [z-theme-switcher](buttons-actions/z-theme-switcher.md) for the
control, persistence, and the 0.45s fade between them.

```html
<html data-theme="studio">
```

## The material system

The flat themes and the hardware themes want opposite things, and components
have to serve both without ever branching on which theme is active. Two tiers
make that work.

### Tier 1 — theme-private primitives

Whatever a theme needs to describe itself, named in its own vocabulary:
`--haze`, `--blast-grain`, `--panel-occlusion`, `--shell-highlight`. These are
never read outside the theme block that defines them, so they can be added,
renamed and reshaped freely.

```css
[data-theme='studio'] {
  --blast-grain: repeating-linear-gradient(
    109deg,
    oklch(1 0 0 / 0.05) 0 1px,
    oklch(0.4 0.01 220 / 0.022) 1px 2px,
    transparent 2px 4px
  );
  --panel-toplight: oklch(1 0 0 / 0.92);
  --panel-occlusion: oklch(0.28 0.03 240 / 0.16);
}
```

### Tier 2 — semantic, component-facing tokens

A fixed vocabulary of eleven names. **Components read only these.** A theme's
job is to map its tier-1 primitives onto them.

The names describe **role**, never appearance — `--elevation-carved`, not
`--shadow-inset-2`. A component asks for "recessed into the surface" and each
theme answers in its own material.

**Surface materials** — legal `background` shorthand values.

| Token | Role |
| --- | --- |
| `--material-page` | The backdrop behind everything. |
| `--material-surface` | A surface sitting on the page — card, field, well. |
| `--material-raised` | A surface lifted off it — popover, menu, cap. |
| `--material-tone` | A solid accent fill — button, badge, pressed toggle. |

**Elevation** — legal `box-shadow` values.

| Token | Role |
| --- | --- |
| `--elevation-flush` | Resting on the page. |
| `--elevation-raised` | Lifted, pressable. |
| `--elevation-pressed` | The moment it is pressed. |
| `--elevation-overlay` | Floating free of the page. |
| `--elevation-carved` | Recessed into it. |

**Emissive** — also `box-shadow`, composed after elevation.

| Token | Role |
| --- | --- |
| `--emissive-tone` | LED rim behind an active control. |
| `--emissive-focus` | The same, for keyboard focus. |

Both hardware themes leave `--emissive-tone` inert. It is available, and the
first instinct is to use it everywhere — but a coloured halo around every
button, badge and toggle reads as a UI effect rather than as hardware. Real
panels put one LED where something is actually indicating state. `z-knob` keeps
its lit arc, which runs on the component's own glow layer rather than on this
token.

### The two rules that make it work

**Elevation tokens are `0 0 transparent`, never `none`.** Components compose
them:

```css
box-shadow: var(--elevation-raised), var(--emissive-tone);
```

`none` is not a legal *layer* inside a comma-separated shadow list, so
`none, none` invalidates the whole declaration and silently drops any shadow
the component asked for. A fully transparent shadow composes safely and paints
nothing.

**Material tokens are ordered to be legal `background` shorthand values.** A
component opts in with one declaration rather than a separate `background-image`
rule whose cascade position it would then have to defend:

```css
background: var(--material-tone), var(--tone-color);
```

In a flat theme that resolves to `background: none, <color>` — a plain fill,
zero cost.

### Adding a theme

One block of token assignments. No component changes at all.

Declare the **whole** vocabulary, including the parts you want inert. Tokens
inherit, so a theme that leaves `--elevation-carved` unset will pick up
whatever the surrounding theme set — which is exactly wrong when a region is
pinned inside a page of a different theme.

## Type

Headings are the one type tier a theme may re-face. `z-display` and `z-heading`
read four tokens; nothing else does, so body text, labels and UI chrome stay on
the sans stack whatever a theme does up top.

| Token | Default | Description |
| --- | --- | --- |
| `--base-sans-font-family` | `DM Sans` | Body and UI face. `--font-sans` derives from it. |
| `--base-mono-font-family` | `DM Mono` | Code and readout face. `--font-mono` derives from it. |
| `--font-heading` | `var(--font-sans)` | Face for the heading tier. |
| `--font-heading-weight` | `700` | Weight for the heading tier. |
| `--font-heading-settings` | `normal` | `font-variation-settings` — variable-font axes. |
| `--font-heading-tracking-scale` | `1` | Multiplies the heading scale's built-in negative tracking. |

Re-face the sans and mono tiers through the two **base** families, not through
`--font-sans` / `--font-mono` — that keeps the fallback stacks intact.

### The sets

| Theme | Heading | Body | Mono |
| --- | --- | --- | --- |
| `dark` | DM Sans | DM Sans | DM Mono |
| `light` | Outfit | Manrope | DM Mono |
| `console` | Outfit | Manrope | IBM Plex Mono |
| `studio` | DM Sans | DM Sans | DM Mono |

**light** and **console** share Outfit over Manrope. Outfit is close to pure
geometric — near-circular bowls, even strokes — which gives headings a clean
modern authority with no decoration to fight the surface behind them. Manrope
takes the body because pure geometry is tiring at small sizes: it is
semi-geometric, the same family of shapes loosened just enough to read
comfortably over long passages.

They diverge on the mono tier. Light keeps DM Mono, soft-cornered and geometric,
sitting with the pair. Console switches to IBM Plex Mono, drawn out of the
engineering-drawing tradition the hardware comes from — which is the right
register for a readout and the wrong one for body copy.

**studio** keeps the library's own DM Sans and DM Mono. The panel is already
doing the talking through material and depth; a second voice in the type only
competes with it.

`--font-serif` and `--base-serif-font-family` exist and resolve to DM Serif
Display, but no shipped theme uses them. They cost nothing until something
renders in that family.

### Tracking

The heading sizes carry aggressive negative tracking tuned for DM Sans'
geometric forms. Other faces need less, or none:

```css
--font-heading-tracking-scale: 0.85; /* light, console — Outfit sets a touch wider */
--font-heading-tracking-scale: 0.15; /* studio — silkscreen sets open, not tight */
```

### Radius

The hardware themes square everything off through one dial. `--radius-lg`
(cards) and `--radius-md` (fields) both derive from it:

```css
--base-radius: 0.625rem;  /* dark, light */
--base-radius: 0.3125rem; /* console — milled, not moulded */
--base-radius: 0.25rem;   /* studio — tighter still */
```

### Cost

Every family lives in one Google Fonts request, and that costs nothing to
anyone who never uses them: the URL returns a stylesheet of `@font-face` rules,
and the browser fetches a woff2 only when something actually renders in that
family. A reader who stays in the default dark theme downloads DM Sans and DM
Mono and nothing else.

## Component prototypes

### Tactile panel

The base surface everything else sits on. `z-card` is this.

```css
.tactilePanel {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  color: var(--foreground);
  background: var(--material-surface);
  box-shadow: var(--elevation-flush);
}
```

### Hardware button

Raised at rest, travelling into the panel when pressed, glowing in its own
tone. `--emissive-color` is the handshake: the theme decides *whether* there
is a glow and how it is built, the component decides *what colour* it glows.

```css
.hardwareButton {
  --emissive-color: var(--tone-color);
  border: 1px solid var(--tone-color);
  border-radius: var(--radius-md);
  color: white;
  background: var(--material-tone), var(--tone-color);
  box-shadow: var(--elevation-raised), var(--emissive-tone);
  transition: box-shadow var(--material-press-duration) ease;
}

.hardwareButton:active {
  box-shadow: var(--elevation-pressed);
}
```

### Knob

Three stacked rings, each themed independently: a carved well, an LED travel
arc, and a raised cap with a milled pointer. [z-knob](music/z-knob.md) is this.

```css
.knobWell {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--material-surface);
  box-shadow: var(--elevation-carved);
}

/* Masked to a ring rather than a pie. Everything before --knob-angle is lit. */
.knobArc {
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background: conic-gradient(
    from 225deg,
    var(--knob-tone) 0deg var(--knob-angle),
    var(--knob-track) var(--knob-angle) 270deg,
    transparent 270deg 360deg
  );
  mask: radial-gradient(closest-side, transparent 74%, black 76%);
}

.knobCap {
  position: absolute;
  inset: 18%;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--material-raised), var(--card);
  box-shadow: var(--elevation-raised);
  transform: rotate(var(--knob-rotation));
}
```

The sweep is 270 degrees with the dead zone at the bottom, as on physical
hardware — a full 360 leaves no way to see where travel begins, and the eye
reads the gap as the zero mark.

## Keeping it cheap

Multi-layer material styling is exactly the kind of thing that rots a codebase.
Five rules keep it from doing that here.

**One vocabulary, learned once.** Eleven token names cover every theme. A
developer never picks a shadow — they name a role and the theme answers. There
is no `--shadow-sm` / `--shadow-md` / `--shadow-lg` ladder to have opinions
about, and no per-theme conditional anywhere in component code.

**Cost lives in the theme, not the component.** A four-layer shadow stack is
written once, in one theme block, and consumed by a one-line declaration. The
expensive, fiddly part is authored by whoever is designing the theme — not
re-derived by every developer who needs a raised surface.

**Inert defaults mean no branching.** Because every token has a value that
paints nothing, a component writes the material declaration unconditionally.
There is no `@supports`, no theme class check, no JavaScript. Flat themes
render byte-for-byte what they rendered before the material system existed.

**Compose at most two tokens per declaration.** `elevation + emissive` is the
only stack a component builds itself. Anything more complex belongs in the
theme as a single token. If a component needs three, that is a sign the
vocabulary is missing a name.

**Watch the compositing, not the character count.** The real cost of this
system is paint, not bytes: large blurred shadows and stacked gradients are
GPU work. Keep blur radii modest, avoid animating `box-shadow` on anything
large, and prefer transitioning `opacity` or `transform` when a surface needs
to move. The `--material-press-duration` token exists so press feedback stays
short enough to be cheap.

## Region theming

`data-theme` works on any element and every theme defines the full token
vocabulary, so themes nest in either direction:

```html
<body data-theme="studio">
  <main>Bead-blasted aluminium.</main>

  <aside data-theme="dark">Flat ink, inside the hardware page.</aside>
</body>
```

A pinned region only re-points tokens — it does not fill anything. Give it the
page surface if you want it to read as a separate panel:

```css
.region {
  background: var(--background);
  background-image: var(--material-page);
}
```

### Why every theme declares the whole ramp

A custom property is substituted where it is **declared**, not where it is
used. Once `--foreground: var(--color-neutral-8)` has computed on `<html>`,
descendants inherit the resulting colour, not the `var()` expression —
redefining `--color-neutral-8` further down the tree does nothing to it.

So the derivation blocks in `ink.css` target `:root, [data-theme]` rather than
`:root, [data-theme='dark']`. Matching **any** `data-theme` value makes every
themed element re-run the derivations against its own ramp.

The contract that creates: a theme block must declare the full ramp and base
palette — all ten neutrals, all five base accents, both neutral anchors, and
its material and type tokens. Anything omitted silently falls back to the dark
theme's value rather than to nothing. Derived tokens (`--foreground`,
`--color-primary-*`, spacing, the type scale) need no such care; they
re-substitute on their own.

This is the one part of the system that fails quietly rather than loudly, which
is why it is worth stating twice.
