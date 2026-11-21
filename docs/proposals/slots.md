> **Status: Proposed. Not a rule yet.**
> This proposal must conform to [`../architecture.md`](../architecture.md).
> The conformance review and the changes it needs are in
> [`slots-review.md`](./slots-review.md). Nothing here is built until it is
> approved and its rules are recorded in `architecture.md`.

# Slot Design Proposal

Nov 21, 2026 · @Sailor Gray

## Summary

Adopt one slot vocabulary across zest: `start`, `end`, `center`, `below` and `value`. Each slot sits on the edge of a row the component already has. No slot ever opens up a component's internal parts.

**Recommendation:** adopt it as a principle, and roll it out one component at a time. Start with `z-field`, then `z-input` and `z-select`, then `z-button`. Everything else waits until someone needs it.

**Why:** devs learn the pattern once, the defaults stay fully designed, and zest stays a design system instead of turning into a component library.

## Principles

A slot is a place where a dev adds something around a component. It is never a place where they replace part of it.

1. **Add around, never replace inside.** The component keeps its look, its spacing, its states and its behavior. A slot adds content next to them.
2. **Edges only.** A slot sits at the start or the end of a row the component already has. If a component has no such row, it gets no slot.
3. **One vocabulary.** The same name means the same thing on every component. A dev who knows `start` on a button knows it on an input.
4. **Defaults stay designed.** A component with every slot empty looks exactly like it does today.
5. **The component owns state.** Slotted content never takes over value, focus, validation or events. It only reads them.
6. **Slots are permanent API.** Adding one is cheap. Removing one is a breaking change. Each is added only for a real, repeated need.

The line between a design system and a component library: a design system lets you add around its parts. A component library lets you swap the parts themselves.

## The slot vocabulary

Five names. No others.

| Slot | Where it renders | Used on | Notes |
| --- | --- | --- | --- |
| `start` | Before the content of a row, on the inline-start side | Controls, buttons, chips, list rows, headers | Inside the control's border for inputs and selects. Icons, prefixes, small buttons. |
| `end` | After the content of a row, on the inline-end side | Same as `start` | Inside the control's border for inputs and selects. Clear buttons, units, shortcuts, counts. |
| `center` | The flexible middle of a row that has a label | `z-field` label row, `z-slider` header | Fills the leftover space. Hints, badges, links beside a label. |
| `below` | Under the control, in the field's own block | `z-field` only | Hints, errors, character counts. Replaces nothing. |
| `value` | Where a component prints its current value | `z-slider`, `z-meter` | Replaces the default value display. The component still owns the value. |

**Not slot names:** `prefix`, `suffix`, `leading`, `trailing`, `icon`, `left`, `right`, `header-left`. One idea gets one name.

**Existing slots stay.** `trigger`, `footer`, `sidebar`, `sidebar-header` and similar are structural slots, not part of this vocabulary. They are not renamed.

## Per-component support

Phases are the order to build them. Phase 3 is not a promise: it waits for a real request.

| Component | Slots | Phase | Why |
| --- | --- | --- | --- |
| `z-field` | `start`, `center`, `end`, `below` | 1 | Owns the label row. One place for label extras and hints, for every control inside it. |
| `z-input` | `start`, `end` | 2 | Icons, units, clear buttons inside the border. |
| `z-select` | `start`, `end` | 2 | Same as input. The caret stays ours. |
| `z-textarea`, `z-number-input` | `start`, `end` | 2 | Same pattern. On a textarea, `end` sits at the top corner. |
| `z-button` | `start`, `end` | 2 | Icon positions. No label-row slots, since a button has no label row. |
| `z-slider` | `start`, `center`, `value` | Done | Already shipped in this work. |
| `z-badge`, `z-chip` | `start`, `end` | 3 | Dots, icons, close buttons. |
| Menu items, list items, tabs, nav items | `start`, `end` | 3 | Icons, shortcuts, counts. |
| `z-meter` | `value` | 3 | Matches the slider. |
| `z-card`, `z-callout`, `z-dialog`, `z-sheet` | Header `start` and `end` | 3 | Many already have header or footer slots. Audit first, then align. |

**Where `z-field` wraps a control**, the field's `start` and `end` sit in the label row. The control's own `start` and `end` sit inside the control. They never collide, because they are different rows.

**Decision for you:** the label-row slots on `z-field` use the names `start` and `end`, and the control uses the same names inside. Same word, different row, depending on which element it is a slot of. The alternative is `label-start` and `label-end` on the field. That is clearer in code, but breaks the one-vocabulary rule.

## Hard rules

Every slot, on every component, must follow these. A component that breaks one does not ship the slot.

1. **Names come from the vocabulary.** Five names only. A new name needs a written reason and an update to this spec.
2. **Logical direction only.** `start` and `end` follow the writing direction. No `left`, `right`, `margin-left` or `padding-left` anywhere in slot styling. The repo's CSS check already enforces this.
3. **The slot is a wrapper.** The component renders the slot inside its own container. The container owns padding, gap, alignment and sizing. Slotted content never sets its own position.
4. **Empty means invisible.** An empty slot renders no box, no gap and no padding. The component detects slot content (as `z-slider` does) and hides the wrapper when empty.
5. **Slotted content is sized by the component.** Content is centered on the row's cross axis and capped to the row's height. Controls get a defined inner height so a slotted button cannot grow the input.
6. **State flows one way.** The component keeps value, focus, validation and events. Slotted content may read them (events, attributes, CSS variables) but cannot change them.
7. **Disabled disables slotted content.** When the component is disabled, slotted interactive content is inert too (`pointer-events: none`, reduced opacity). The component does not rely on the dev to do it.
8. **Events do not leak.** A click inside a slotted button does not focus or change the control unless the dev wants it to. Slotted content is outside the control's own event handling.
9. **Styling is not reachable from outside.** No `::part` for slot internals and no new CSS variables just for slots, except sizing tokens the component already documents.
10. **Accessibility is the dev's job for slotted content, and ours for the container.** Slotted icons need `aria-hidden` or a label. Slotted buttons need a name. The docs say this on every slot.
11. **Every slot is documented in `api-notes.json`** with one sentence on what it is for. The smoke test already fails if a rendered slot is undocumented.
12. **Every slot has a demo** in the component's docs, plus framework variants where the demo has script.

## Limits: what we will not support

| Not supported | Why | Do this instead |
| --- | --- | --- |
| Slots for internals (track, thumb, fill, caret, checkbox box, toggle knob) | These are the design. Replacing them makes it a different component. | Request a variant or a token. |
| Replacing the default content (the text of a button, the value inside an input) | The component owns it. | Use the default slot or a prop, where one exists. |
| Both inside and outside slots on one control (`start-inside`, `start-outside`) | Doubles the API for little gain. | Outside is a `z-row` around the control. |
| Multiple slots for one position (`start-1`, `start-2`) | Slots take any number of children. | Put several elements in one `start`. |
| Slots that pass props to the component (render props) | Web components cannot do it cleanly across frameworks. | Events and attributes. |
| Slots on every component by default | Each is permanent API. | Rollout is one component at a time, on request. |
| Positioning slotted content with absolute offsets inside a control | It breaks on resize, RTL and size changes. | Use `start` and `end`. |

**Hard ceiling:** if a request needs a slot that is not `start`, `end`, `center`, `below` or `value`, the answer is no by default. It goes to a design review first, and it changes this spec if it is accepted.

## Edge cases

| Case | Behavior | Open? |
| --- | --- | --- |
| Slot is empty | No box, no gap, no padding. | No |
| Slot content is added or removed later | The component re-detects on `slotchange` and updates layout. | No |
| Slotted content is tall | Capped to the row's inner height. Overflow is clipped, not grown. | No |
| Slotted content is wide (a long unit, a wide badge) | The control's text area shrinks first. The slot never wraps. | Check per component |
| Control size changes (`sm`, `md`, `lg`) | The slot's inner height follows the size. Slotted `z-button` should use the matching size. | No |
| Right-to-left | `start` and `end` flip. Slotted icons that imply direction (arrows) are the dev's job to mirror. | No |
| Disabled or read-only | Disabled makes slotted interactive content inert. Read-only does not, since a clear button is hidden by the dev. | Decide |
| Invalid or error state | Border and message come from the component. Slotted content keeps its own color. | No |
| Focus ring | The ring wraps the whole control including slots. Focus inside a slotted button moves focus to that button, not the input. | Decide |
| Click on slotted content | Does not focus the input by default. A dev who wants that wires it. | Decide |
| Clear button in `end` | Dev builds it. We do not ship a built-in clear, since `z-input` may get one as a prop later. | Decide |
| Form submission | Slotted content is not part of the form value. A slotted `input` has its own name. | No |
| Label row on `z-field` with no label | `center` and `end` still render, right-aligned. | No |
| Very long label | The label truncates before `center` or `end` move or wrap. | Check |
| Server rendering or no JS | Slotted content shows in the light DOM. Layout falls back to inline flow, so it is unstyled but readable. | No |
| Slotted `z-icon`-style content | zest has no icon component. Docs show inline SVG at the token size, `currentColor` stroke. | No |

**Rows marked Decide** are choices you need to make. They are collected in the last section.

## Escape hatches: when slots are not enough

The docs should state this once, on a short "Customizing" page, and link it from every component that has slots.

1. **Wrap it.** Put the control in a `z-row` or `z-column` with your own siblings. This covers anything outside the control: a button next to an input, a link under a select.
2. **Compose the parts.** Build the layout from `z-field` and primitives, and own the structure yourself. You lose nothing from the control itself.
3. **Style through tokens.** Change colors, radii, spacing and type through design tokens. This is the supported way to restyle.
4. **Ask for a variant or prop.** If many people want the same thing (a clear button, a loading state), it should become a prop, not a slot.
5. **Do not reach into the shadow DOM.** No `::part` hacks and no absolute positioning inside a control. They break on resize, RTL and updates. If this is the only way to do something, it is a missing feature, and we want the request.

**The rule of thumb for devs:** if it sits next to the control, wrap it. If it sits inside the control's border, use `start` or `end`. If it replaces part of the control, ask for a variant.

## Benefits, risks and decisions

**Benefits**

- One pattern to learn. `start` and `end` mean the same thing everywhere.
- Small cost per component: a few lines of markup and one detection hook.
- New components get their slots by following the rule, with no new design debate.
- Devs get real flexibility without a way to break the design.

**Risks**

- Consistency becomes a promise. If one component gets slots and a similar one does not, it looks like a bug.
- Each slot is permanent API. A wrong one is a breaking change later.
- Slotted content is outside our control, so accessibility depends on the dev. Docs must say so on every slot.
- Pressure to add one more slot never ends. The hard ceiling is what holds the line.
- Rolling out slowly leaves the system inconsistent for a while.

**Decisions for you**

1. **Vocabulary:** approve the five names, or change them. This is the most permanent choice.
2. **`z-field` naming:** reuse `start` and `end` for the label row, or use `label-start` and `label-end`.
3. **Inside only:** confirm that `start` and `end` on controls always mean inside the border, with outside handled by wrapping.
4. **Disabled:** confirm that disabled makes slotted interactive content inert.
5. **Click and focus:** confirm that clicking slotted content does not focus the control by default.
6. **Clear button:** confirm that we do not ship one as a slot pattern, and consider it as a future prop instead.
7. **Rollout:** confirm phase 1 is `z-field`, phase 2 is input, select, textarea, number input and button, and phase 3 waits for requests.
8. **Docs:** confirm a single Customizing page that explains the escape hatches, linked from every component with slots.
