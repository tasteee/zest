# API modernization — implementation spec

Decided. This replaces the audit version of this file; every item below is
settled and ready to implement. Scope: 146 components, 370 boolean props.

---

## 1. `color` vs `accent` — the split

You were right that these are two different things, and the library already
agrees with you. Of the 45 components that declare `tone` today, **26 set an
internal CSS variable literally named `--accent`**. The concept had already
named itself; only the public prop was lying about it.

So the prop divides by what the value actually paints:

**`color`** — components whose entire visual output is text. The value *is* the
glyph color.

> `z-text` · `z-heading` · `z-subheading` · `z-label` · `z-inline` · `z-display`
> · `z-stat` · `z-link` · `z-eyebrow`

**`accent`** — components with chrome. The value tints a border, a fill, a focus
ring, an indicator — the component's theme, not its letters.

> The other 43, including `z-button`, `z-badge`, `z-input`, `z-alert`,
> `z-surface`, `z-checkbox`, `z-tabs`, `z-progress`, …

`z-link` and `z-eyebrow` move *out* of the tone group into the ink group — both
render text and nothing else. Everything else that had `tone` becomes `accent`.

### Vocabularies

```
accent = dom | sub | neutral | success | warning | error
color  = dom | sub | neutral | success | warning | error | muted | strong
```

`color` is a superset: text has a neutrality ladder that chrome doesn't.
`muted` is `--muted-foreground`; `strong` is `--color-neutral-9`, replacing the
current `white`, which is a literal color name in a system about to grow a light
theme. `neutral` stays `--foreground` and stays the default.

Text gains `success | warning | error`, which it can't express today.

### Value mapping

| Today | Becomes |
|---|---|
| `tone="primary"` | `accent="dom"` (or `color="dom"` for the ink group) |
| `tone="secondary"` | `accent="sub"` |
| `tone="danger"` | `accent="error"` |
| `tone="neutral \| success \| warning"` | unchanged, under the new prop name |
| `tone="info"` (z-alert) | `accent="sub"` — no `info` slot |
| `tone="plain"` (z-surface) | **omit the attribute.** `plain` meant "no color"; absence says that better than a value does |
| `color="white"` (z-text) | `color="strong"` |
| `color="primary \| secondary"` | `color="dom \| sub"` |

### Dead props found on the way

`z-dialog`, `z-drawer`, and `z-sheet` each declare `tone` and never read it —
no CSS rule, no JS branch. They're settable attributes that do nothing.
Recommendation: delete rather than port. Adding to
`questionable-api-choices.md`.

---

## 2. Boolean clusters → enums

### 2a. `toggleVariantProps` — 9 flags, 2 components

```
is-purple | is-pink | is-neutral  →  accent="dom | sub | neutral"
is-small | is-medium | is-large   →  size="xs | sm | md | lg | xl"   (see §4)
is-ghost | is-outlined            →  kind="solid | outline | ghost | soft | plain"
is-icon                           →  stays boolean — composes with any kind
```

`kind` takes z-button's full set, not just the two the flags covered — z-toggle
today declares `kind` as a string that only handles `ghost`, with `isOutlined`
as a separate boolean beside it. One prop, one vocabulary, shared with z-button
and z-badge.

This also fixes live dead code: the group's `--z-toggle-*` custom properties are
inert because the item reads `--tone-*` and takes its color from its own flag.
An inherited enum is what makes group-level color work at all.

### 2b. z-box, z-row, z-column, z-card — flex only

`display` doesn't get an enum; it gets deleted. These are flex containers by
definition and z-box is already flex by default.

```
DELETE  isFlex isInlineFlex isGrid isInlineGrid isBlock isInlineBlock
KEEP    isInline   — upgrades flex → inline-flex
z-box   isRow | isColumn  →  direction="horizontal | vertical"
z-card  DELETE isFlex, isRow, isColumn — a card is a column, full stop
```

Grid mode leaves z-box entirely; `z-grid` already owns that with `columns`,
`minColumnWidth`, and `gap`. A row inside a card is a slotted `z-row`.

One consequence to expect: `getBoxHostStyle`'s alignment logic branches on grid
mode for `alignsX`/`alignsY` (grid aligns per-cell with no axis swap). That
branch comes out with it.

### 2c. Size flags → `size`

`z-knob`, `z-field`, `z-theme-switcher` drop `isSmall`/`isLarge` for `size`.

### 2d. Direction — five spellings → one

`direction="horizontal | vertical"` replaces all of:

| Today | Components |
|---|---|
| `orientation` | z-scroll-area, z-toolbar |
| `isVertical` | z-separator, z-toggle-group, z-button-group |
| `isHorizontal` | z-radio-group, z-virtual-list |
| `vertical` | z-marquee |
| `isVertical` **and** `isHorizontal` | z-line — settable together, undefined result |

Also covers z-box's new `direction` (§2b), so one word means one thing library-wide.

### 2e. `z-message-group` avatar

`hideAvatar` + `showAvatar` → `avatar="auto | always | never"`.

### 2f. Chrome visibility — split by shape

Token list where the set is open-ended, positive booleans where it's two things:

```
z-message-actions   noReply|noForward|noMore   →  actions="reply forward more"
z-piano-roll        hideToolbar|hideKeyboard   →  hasToolbar|hasKeyboard  (default true)
z-pattern-roll      same
z-chart, z-code-block, z-terminal              →  positive booleans
```

---

## 3. Naming

### 3a. Polarity — 15 props

Every `hide*` / `no*` / `disable*` inverts to a `has*` / `can*` / `does*` with a
`true` default:

```
hideAvatar hideClose(×2) hideCopy hideKeyboard(×2) hideLabels hideReplay
hideToolbar(×2) noAdd noAutoScroll noForward noHighlight noJump noMore noReply
disableEnterSubmit
```

### 3b. Interrogative prefix — all 32

No partial pass. Every boolean reads as a question:

```
showValue      → doesShowValue        wrap        → doesWrap
animate        → doesAnimate          loop        → doesLoop
pulse          → doesPulse            reverse     → isReversed
pauseOnHover   → doesPauseOnHover     multiple    → isMultiple
fullWidth      → isFullWidth          fullHeight  → isFullHeight
grow           → canGrow              center      → isCentered
border         → hasBorder            elevated    → isElevated
interactive    → isInteractive        collapsible → isCollapsible
floating       → isFloating           fixed       → isFixed
startOnView    → doesStartOnView      menuBelow   → isMenuBelow
typewriter     → isTypewriter         markdown    → isMarkdown
allowHtml      → doesAllowHtml        headingAnchors → hasHeadingAnchors
expandOnHover  → doesExpandOnHover    showGrid    → doesShowGrid
showGuides     → doesShowGuides       showArrow   → doesShowArrow
both           → ?  (z-center — see note)         text → ? (z-center)
```

Two on `z-center` need renaming for meaning, not just prefix: `both` and `text`
say nothing about what they do. Proposing `centersBoth` and `centersText` unless
you have better names.

`fullWidth` was the loudest case — `isFullWidth` on z-button and z-number-input,
bare `fullWidth` on seven layout components. Same concept, two spellings, same
library.

### 3c. `kind` fixes

- `outlined` → `outline` (z-toggle; z-button and z-badge already say `outline`)
- `variant` → `kind` on `z-aura`, `z-bubble-menu`, `z-surface`
- `z-callout`'s `kind` is a color, not a treatment. It moves to `accent`:

| `kind` today | Resolves to | Becomes |
|---|---|---|
| `note` | `--purple` | `accent="dom"` |
| `important` | `--accent-alt` | `accent="sub"` |
| `tip` | `--success` | `accent="success"` |
| `warning` | `--warning` | `accent="warning"` |
| `caution` | `--destructive` | `accent="error"` |

---

## 4. Size scale — one ladder

`xs | sm | md | lg | xl | xxl` library-wide, anchored on the token scale in
`layout-schema.ts`. The 20 components on `small | medium | large` migrate:

```
small → sm       medium → md       large → lg
```

`xs`, `xl`, and `xxl` become available everywhere; components that only style
three steps clamp to their nearest.

Riding along: **z-select adopts z-input's height scale** (2.25 / 2.75 / 3.25rem,
replacing 2 / 2.5 / 3). z-input is the anchor and z-combobox was already moved
onto it. Selects get 0.25rem taller wherever they appear — the only deliberate
visual change in this whole migration.

---

## 5. Untouched — genuine state booleans

`isDisabled` `isOpen` `isHidden` `isChecked` `isLoading` `isInvalid`
`isReadonly` `isRequired` `isFocused` `isSelected` `isActive` `isExpanded`
`isPressed` `isIndeterminate` `isStreaming` `isPinned` `isMuted` `isCollapsed`
`isResolved` `isDot` `isSelectable` `isRemovable` `isExternal` `isStatic`
`isDocked` `isStriped` `isClickable` `isNumeric` `isGlowing` `isReactive`
`isAutoResize` `isDrilldown` `isFiltered` `isSourceOpen` `isResizable`
`isLabelHidden` `isLabelReserved` `isCollapsedByDefault` `hasStepperButtons`
`hasFade` `hasGhost` `hasRule` `hasLineNumbers` `hasDetails`
`hasBackgroundGrid` `hasCaption`

Each is an independent two-state condition that already reads as a question.

---

## 6. Execution order

1. `tone` → `accent` / `color` + value mapping — the largest and most mechanical
2. Delete dead `tone` on z-dialog, z-drawer, z-sheet
3. Boolean clusters (§2) — schema files first (`toggle-schema.ts`,
   `box-schema.ts`), which covers 6 components in 2 files
4. Size ladder (§4), including the z-select height change
5. Naming sweep (§3) — pure renames, safe to batch
6. `site/src/component-docs/` entries updated in lockstep
7. Structural checker: routes resolve, no duplicate example ids, every
   documented attribute maps to a real prop, every playground control exists in
   its table

Steps 1–5 are source-only and can be verified by typecheck. Step 6 is where
breakage would surface, and step 7 already catches attribute/prop drift.
