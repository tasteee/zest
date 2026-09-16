# Iconography

There is no icon component and no icon set. An icon in zest is an inline `<svg>` — slotted into a control, or drawn by the component itself — sized to the control it sits in and coloured by the text around it.

## What it solves

An icon that is the right size in an `sm` button and an `lg` button without an attribute, and the right colour in a muted description, a destructive button and a hardware theme without a fill.

## Primitives

The conventions every inline icon in the library follows. None of them is a token; all of them are consistent.

| Convention | Value | Why |
| --- | --- | --- |
| Grid | `viewBox="0 0 24 24"` | 69 of 72 inline icons. The Lucide / Feather grid; any 24-grid stroke set drops in. |
| Stroke weight | `2` | 32 declarations. The default for a 24-grid icon at 16px — reads as one weight heavier than DM Sans regular, which is what an icon next to text wants. |
| Emphasis stroke | `2.5` – `3` | Checkmarks and the select chevron: a mark that has to be read at 12px goes heavier. |
| Caps and joins | `round` | Everywhere. Square caps read as a different icon set. |
| Colour | `stroke: currentColor; fill: none` | 92 declarations. The icon is text. |

## Semantic tokens

Icon size is derived from the control scale, not declared. Each component that accepts a slotted `<svg>` sizes it relative to its own size step.

| Context | Rule | `sm` | `md` | `lg` |
| --- | --- | --- | --- | --- |
| `z-button` | `::slotted(svg)` in rem, per size | 0.875rem | 1rem | 1.125rem |
| `z-toggle-button` | `var(--toggle-icon-size, 1rem)` | — | 1rem | — |
| `z-input`, `z-badge`, `z-link` | `em` — scales with the control's font size | 1.125em / 0.875em / 1em | | |
| `z-swap` | fixed | 1.25rem | | |
| Self-drawn (alert, callout, select chevron, checkbox tick) | `width: 100%` of a sized `.icon` box | | | |

Colour has no icon-specific token because it needs none: `currentColor` picks up `--foreground` in a card, `--muted-foreground` in a description, `--tone-color` in an accented button and `--on-accent` on a solid one.

<z-callout accent="warning" heading="Unfinished: sizes are per component, not shared">
Icon size is expressed six different ways — three <code>rem</code> values, three <code>em</code> values, one custom property and one fixed size. They land close to the same pixels at each control size, but nothing ties them together. An <code>--icon-size-sm/md/lg</code> trio derived from <code>--control-height-*</code> (roughly 0.4375 × height) would let every <code>::slotted(svg)</code> rule read one token, and would give a consumer's own icons somewhere to stand.
</z-callout>

## In use

The same `<svg>` in three sizes and four colours. It was authored once, with no size and no colour.

<div style="display: flex; gap: var(--space-sm); align-items: center; flex-wrap: wrap;">
<z-button size="sm" kind="soft" accent="dom"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>Small</z-button>
<z-button size="md" accent="sub"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>Medium</z-button>
<z-button size="lg" kind="outline" accent="error"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>Large</z-button>
<z-text color="muted"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -3px;"><path d="M12 5v14M5 12h14"/></svg> inline, muted</z-text>
</div>

```html
<z-button size="lg" kind="outline" accent="error">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
  Large
</z-button>
```

```css
/* z-button: the icon is sized by the control, coloured by the text */
::slotted(svg)               { width: 1rem;     height: 1rem; }
button.is-sm ::slotted(svg)  { width: 0.875rem; height: 0.875rem; }
button.is-lg ::slotted(svg)  { width: 1.125rem; height: 1.125rem; }
```

## Rules

- **Do** author icons on a 24 grid with `stroke="currentColor"`, `fill="none"`, `stroke-width="2"`, round caps and joins. That is the whole spec.
- **Do** leave `width` and `height` off a slotted icon. The control sets them.
- **Don't** set a colour on an icon. If it needs to be muted, put it in muted text; if it needs the accent, put it in an accented control.
- **Don't** mix a filled set with the stroked set. One filled icon in a row of stroked ones reads as a different weight of type.
- **Don't** ship an icon font or a sprite. An inline `<svg>` inherits colour through a shadow boundary; a font glyph does not inherit `stroke-width`.

## Rationale

Not shipping an icon set is a decision, not an omission: every consumer already has one, and the library's job is to make theirs fit — which a size rule and `currentColor` do completely. Tying icon size to the control scale rather than to a separate icon scale is what keeps a button's label and its icon in proportion when the control size changes, without a second attribute to keep in sync.
