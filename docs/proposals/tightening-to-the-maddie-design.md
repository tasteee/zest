# Tightening Zest to match the Maddie toolbar design

Status: notes. Nothing here is implemented in Zest yet.

Maddie's toolbar design (the "MIDI Editor Toolbar Redesign" canvas) looks more precise than the same toolbar built from stock Zest controls. The gap is not color or radius. It is size, icon weight and a few small details. Maddie closes it today with local overrides (`maddie/src/elements/toolbar-bar.css`, `controls.css`, `icons.ts`). These notes say what Zest itself should do so the overrides can go away.

## Where stock Zest is too loose

| Thing | Stock Zest | Design |
| --- | --- | --- |
| Icon button / toggle (`sm`) | 32px | 28px |
| Outline chip (`md`) | 40px tall, 16px side padding, 14px text | 30px tall, 10px side padding, 12.5px text |
| Slotted icon size at `sm` | 14px | 16px (15px inside a chip) |
| Chevron | same size and color as the label | 12px, `text-tertiary` |
| Leading chip icon | text color | `text-tertiary`, 15px |
| Icon set | Lucide, 24 grid, stroke 2, drawn at 14px | custom, 16 grid, stroke 1.6, drawn at 16px |
| Outline hover | 10% tone fill | border goes `border-strong`, no fill |
| Open chip | no state | `surface-page` fill, `border-strong` |
| Separator | stretches the bar height, 8px margins | 1px by 18px, 6px margins |
| Track tab radius | `radius-lg` | `radius-md` |
| M / S toggle | `radius-md`, 12px text | `radius-sm`, 10.5px / 600 text |
| Readout | 13px, wide gaps | 14px / 600 mono, 10px gap |
| Tempo | 76px field, full-size suffix | about 56px, suffix 11px and faint |

## What to change in Zest

1. **Add a compact density.** One switch (an attribute such as `data-density="compact"` on any ancestor) that sets `--control-height-sm` to 1.75rem, `--control-height-md` to 1.875rem and `--font-size-sm` to 0.8125rem. Dense tools like editors should not need per-app overrides.
2. **Make chips a real kind.** `z-button kind="outline"` at `md` is too big to be a chip. Add `kind="chip"` (or a `z-chip`) with 10px padding, 12.5px text, the quiet icon and chevron colors above, the border-only hover and the open state.
3. **Fix the 1px icon drop.** `z-button` and `z-toggle-button` both apply `.label { transform: translateY(calc(var(--space-1) / 4)) }` to line text up optically. The slotted icon sits inside `.label`, so every icon renders 1px low. Apply the nudge to text only. Until then Maddie cancels it with `translate: 0 calc(var(--space-1) / -4)` on the svg.
4. **Size slotted icons for a 16 grid.** Slotted svg should be 16px at `sm` and 12px for `xs`, and read its stroke width from a token. Zest's Lucide recommendation (24 grid, stroke 2) renders thin and uneven at small sizes. Prefer a 16 grid at stroke 1.6.
5. **Add icon color roles.** Default `text-tertiary` inside chips, `text-secondary` in ghost toggles, `accent` when pressed. Pressed toggles get a 12% accent fill, not a solid one.
6. **Tighten `z-separator[is-vertical]` in toolbars.** Fixed 18px height and 6px margins inside `z-toolbar`, not `align-self: stretch`.
7. **Inline number input.** With `is-inline`, size the field to its digits (about 3.2ch) and style the suffix at 11px / `text-tertiary`.

## The rule behind all of it

Zest sizes are tuned for forms and pages. A tool with a dense toolbar needs the next size down, plus quieter chrome: faint icons, no hover fills, thin strokes. Ask of each control: is the border the only thing that changes on hover, and is the icon the quietest thing in the button?

## Reference

The design lives in the Claude canvas "MIDI Editor Toolbar Redesign" (Spec 2: top bar, Spec 3: input and output, Spec 4: editor bar). Its stylesheet is the source for every number above.
