# API modernization — attribute audit

Every component's attribute API, audited against three questions:

1. Does it use boolean flags where a string enum belongs?
2. Does it use the current vocabulary (`color="dom | sub | neutral | success | warning | error"`)?
3. Does it follow the naming rules (interrogative prefix, positive polarity)?

**Nothing here has been changed.** Each item has a proposal and a `Decision:`
line. Mark them up and I'll implement the accepted ones in one pass.

Counted across 146 components: **370 boolean props**, **45** components with
`tone`, **27** with `size`, **7** with `kind`, **3** with `color`, **3** with
`variant`.

---

## 0. The cross-cutting rename: `tone` → `color`

45 components declare `tone`. The accepted vocabulary is now:

```
color="dom | sub | neutral | success | warning | error"
```

Mapping from what's in the source today:

| Today | Becomes | Usages |
|---|---|---|
| `tone="primary"` | `color="dom"` | 25 |
| `tone="secondary"` | `color="sub"` | 37 |
| `tone="neutral"` | `color="neutral"` | 6 |
| `tone="success"` | `color="success"` | 6 |
| `tone="warning"` | `color="warning"` | 4 |
| `tone="danger"` | `color="error"` | 6 |
| `tone="info"` (z-alert only) | ? | 1 |
| `tone="plain"` (z-surface only) | ? | 1 |
| `is-purple` / `is-pink` (z-toggle*) | `color="dom"` / `color="sub"` | — |

Three sub-decisions this forces:

**0a. The name collides.** `color` already exists on `z-text`, `z-display`, and
`z-stat`, with a *different* vocabulary: `primary | secondary | muted | white |
neutral`. That's a text-ink scale, not a semantic tone. Options: rename those to
`ink`, fold them into the new vocabulary and add `muted`, or keep `color` on text
meaning ink and accept that `z-text color="dom"` means something unrelated to
`z-button color="dom"`.

> Decision:

**0b. `tone="info"` on z-alert.** The new vocabulary has no info slot. Either
add `info`, or map alert's info state onto `sub`.

> Decision:

**0c. `tone="plain"` on z-surface.** Surface's tone is a *surface* level, not a
semantic tone — it shares a prop name with buttons but nothing else. Probably
belongs on `level` (which z-surface already has) rather than `color`.

> Decision:

---

## 1. Mutually exclusive boolean flags → string enum

These are the over-usage cases: sets of booleans where only one can be true, so
the type is lying about the shape of the value.

### 1a. `toggleVariantProps` — 9 flags, 3 enums · **z-toggle-group, z-toggle-group-item**

The one you already called out. `src/shared/toggle-schema.ts` declares:

```ts
isPurple  isPink  isNeutral      // → color
isSmall   isMedium  isLarge      // → size
isGhost   isOutlined             // → kind
isIcon                           // → kind="icon"? or stays boolean
```

Proposal: `color="dom | sub | neutral"`, `size="small | medium | large"`,
`kind="solid | ghost | outline"`, and `isIcon` stays a boolean (it's a shape
modifier that composes with any kind, unlike the others).

Note this also fixes the dead code documented at `z-toggle-group.tsx:88` — the
group's `--z-toggle-*` custom properties are inert because the item reads
`--tone-*` and takes its color from its own flag. Moving to an inherited enum is
what makes group-level color actually work.

> Decision:

### 1b. Box display flags — 7 flags, 1 enum · **z-box, z-row, z-column, z-card**

`src/shared/box-schema.ts`:

```ts
isFlex  isInlineFlex  isGrid  isInlineGrid  isBlock  isInlineBlock  isInline
```

Seven booleans for one CSS `display` value. Proposal:
`display="flex | inline-flex | grid | inline-grid | block | inline-block | inline"`.

Same file, adjacent: `isRow` / `isColumn` → `direction="row | column"`.
(`z-row` and `z-column` already omit these via `directionLockedBoxProps`, so
only `z-box` and `z-card` are affected.)

`z-card` separately carries its own `isFlex` / `isRow` / `isColumn` triplet
rather than reusing the box schema.

> Decision:

### 1c. Size-as-flags · **z-knob, z-field, z-theme-switcher**

Three components express size as `isSmall` / `isLarge` booleans while 27 others
use `size="small | medium | large"`. `z-theme-switcher` is the sharpest case: it
already has `kind` and `tone` as strings, and size as two booleans.

> Decision:

### 1d. Orientation — five different spellings · **8 components**

| Component | Today |
|---|---|
| `z-scroll-area`, `z-toolbar` | `orientation="horizontal \| vertical"` ✅ |
| `z-separator`, `z-toggle-group`, `z-button-group` | `isVertical` |
| `z-radio-group`, `z-virtual-list` | `isHorizontal` |
| `z-line` | **both** `isVertical` *and* `isHorizontal` |
| `z-marquee` | `vertical` (bare) |

`z-line` can be set to both at once, which has no defined meaning. Proposal:
`orientation` everywhere, matching the two components that already have it.

> Decision:

### 1e. Two booleans for one tri-state · **z-message-group**

`hideAvatar` + `showAvatar`. Four representable combinations, three meanings, one
of them contradictory. Proposal: `avatar="auto | always | never"`.

> Decision:

### 1f. Sub-element visibility flags · **z-piano-roll, z-pattern-roll, z-terminal, z-chart, z-code-block, z-message-actions**

Each of these turns pieces of its own chrome on and off with one boolean per
piece:

| Component | Flags |
|---|---|
| `z-piano-roll`, `z-pattern-roll` | `hideToolbar` `hideKeyboard` |
| `z-terminal` | `hideReplay` `noAutoScroll` |
| `z-chart` | `showGrid` `hideLabels` |
| `z-code-block` | `hasLineNumbers` `hideCopy` |
| `z-message-actions` | `noReply` `noForward` `noMore` |

These aren't mutually exclusive, so an enum is wrong — but a space-separated
token list reads better and stays additive as parts are added:
`parts="toolbar keyboard"`, `actions="reply forward more"`. The alternative is
keeping booleans but making them all positive (§2).

> Decision:

---

## 2. Negative-polarity booleans — 15 props

Every one of these defaults to `false` meaning "on", so the consumer writes the
attribute to *remove* something. That inverts the mental model and none of them
follow the interrogative rule.

```
hideAvatar   hideClose (×2)   hideCopy   hideKeyboard (×2)   hideLabels
hideReplay   hideToolbar (×2)   noAdd   noAutoScroll   noForward
noHighlight   noJump   noMore   noReply   disableEnterSubmit
```

Proposal: invert to `has*` / `can*` with a `true` default — `hasClose`,
`hasCopy`, `canJump`, `canSubmitOnEnter`. Costs a breaking change on 15
attributes; buys an API where every boolean reads the same direction.

> Decision:

---

## 3. Booleans with no interrogative prefix — 32 props

The house rule is `is` / `has` / `can` / `should` / `was` / `will` / `does`.
These don't have one:

**Layout** — `fullWidth` (7 components), `fullHeight` (5), `wrap` (3),
`grow`, `center`, `both`, `text`, `border`, `elevated`, `interactive`

`fullWidth` is the loudest: `z-button` and `z-number-input` declare
`isFullWidth`, while `z-box`, `z-row`, `z-column`, `z-center`, `z-grid`,
`z-eyebrow`, and `z-surface` declare bare `fullWidth`. Same concept, two
spellings, in the same library.

**Behavior** — `animate`, `startOnView`, `loop` (×2), `reverse`, `vertical`,
`pauseOnHover`, `multiple` (×2), `collapsible`, `expandOnHover`, `floating`,
`fixed`, `pulse`, `menuBelow`, `typewriter`, `markdown`, `allowHtml`,
`headingAnchors`

**Visibility** — `showValue` (×3), `showGrid`, `showGuides`, `showArrow`,
`showAvatar`

Proposal: `isFullWidth`, `isFullHeight`, `doesWrap`, `canGrow`, `isCentered`,
`hasBorder`, `isElevated`, `isInteractive`, `isAnimated`, `doesLoop`,
`isReversed`, `doesPauseOnHover`, `isMultiple`, `isCollapsible`, `hasValue`…
Mechanical, but it's 32 renames.

Worth splitting the decision: the layout set (`fullWidth`/`fullHeight`/`wrap`)
is the one that's actively inconsistent *within* the library; the rest are just
non-conforming.

> Decision (layout set):

> Decision (behavior + visibility sets):

---

## 4. Vocabulary inconsistencies between components

### 4a. Two size scales

| Scale | Components |
|---|---|
| `small \| medium \| large` | 20 components |
| `xs \| sm \| md \| lg \| xl \| xxl` | `z-text`, `z-kbd`, and the layout token scale (`z-container`, `z-spacer`, `z-section`, `z-grid`) |

Two ladders isn't automatically wrong — components have three sizes, type has
six — but `size="sm"` and `size="small"` meaning the same step on different
elements is a papercut. Options: alias `sm`↔`small` on both, or move components
to the token scale.

> Decision:

### 4b. Concrete size mismatch: z-select vs z-input

`z-select` is 2 / 2.5 / 3rem; `z-input` is 2.25 / 2.75 / 3.25rem. Siblings in
the same form row that don't line up. (Carried over from the forms audit —
`z-combobox` was already given z-input's scale.)

> Decision:

### 4c. `kind` is a grab-bag

| Component | `kind` values | What it actually means |
|---|---|---|
| `z-button` | `outline ghost soft plain` | treatment |
| `z-badge` | `solid soft outline` | treatment |
| `z-toggle` | `ghost outlined icon` | treatment (+ `outlined` vs `outline`!) |
| `z-copy-button` | `ghost …` | treatment |
| `z-callout` | `note tip important caution warning` | **semantic color** |
| `z-swap` | `beside …` | layout |
| `z-theme-switcher` | — | treatment |

Two problems: `z-callout`'s `kind` is a color and should be `color`
(`note`→`sub`, `caution`/`warning`→`warning`, `important`→`error`?), and
`z-toggle` spells it `outlined` where `z-button` and `z-badge` spell it
`outline`.

> Decision (z-callout kind → color):

> Decision (`outlined` → `outline`):

### 4d. `variant` vs `kind`

`z-aura`, `z-bubble-menu`, and `z-surface` use `variant`; seven others use
`kind` for the same job. Per the project convention (`kind` over `variant`),
these three should rename.

> Decision:

---

## 5. Leaving alone — genuine state booleans

Not flagged, for the record, so the audit is complete: `isDisabled`, `isOpen`,
`isHidden`, `isChecked`, `isLoading`, `isInvalid`, `isReadonly`, `isRequired`,
`isFocused`, `isSelected`, `isActive`, `isExpanded`, `isPressed`,
`isIndeterminate`, `isStreaming`, `isPinned`, `isMuted`, `isCollapsed`,
`isResolved`, `isDot`, `isSelectable`, `isRemovable`, `isExternal`, `isStatic`,
`isDocked`, `isStriped`, `isClickable`, `isNumeric`, `isGlowing`, `isReactive`,
`isAutoResize`, `isDrilldown`, `isFiltered`, `isSourceOpen`, `isResizable`,
`isLabelHidden`, `isLabelReserved`, `isCollapsedByDefault`, `hasStepperButtons`,
`hasFade`, `hasGhost`, `hasRule`, `hasLineNumbers`, `hasDetails`,
`hasBackgroundGrid`, `hasCaption`.

Each is an independent two-state condition. They read as questions and can't be
expressed better as a string.

---

## 6. Blast radius

If everything above is accepted:

| Change | Components touched | Breaking |
|---|---|---|
| `tone` → `color` + vocabulary | 45 | yes |
| toggle flags → enums | 2 | yes |
| box `display` / `direction` enums | 4 | yes |
| size flags → `size` | 3 | yes |
| `orientation` unification | 8 | yes |
| `z-message-group` avatar tri-state | 1 | yes |
| chrome flags → token lists | 6 | yes |
| negative → positive polarity | 13 | yes |
| interrogative prefixes | ~30 | yes |
| `variant` → `kind` | 3 | yes |
| z-callout `kind` → `color` | 1 | yes |

There is no consumer outside this repo and the docs site yet, so this is the
cheapest it will ever be. The docs pages are generated from `ComponentDocT`
entries in `site/src/component-docs/`, so each accepted rename is a source edit
plus a matching entry edit — mechanical, and the structural checker already
verifies every documented attribute maps to a real prop.
