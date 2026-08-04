# z-piano-roll

A full MIDI note editor / piano roll in the spirit of Ableton's, built as a
single self-contained element. It owns a list of notes and every common
authoring gesture: draw/place, delete, move (time + pitch), resize, collision
handling (latest wins), marquee multi-select, duplicate, select-all, and
arrow-key nudge — plus scale highlighting, two fold modes, snap-to-grid,
zoom, a sticky piano-keyboard gutter, and a bar ruler.

See [z-pattern-roll](z-pattern-roll.md) for the chord-relative sibling of
this editor, which shares the entire interaction engine but expresses pitch
as chord-accent degrees instead of absolute MIDI numbers.

```html
<z-piano-roll bars="4" beats-per-bar="4"></z-piano-roll>
```

```js
const roll = document.querySelector('z-piano-roll')
roll.notes = [
  { pitch: 60, start: 0, duration: 1, velocity: 100 },
  { pitch: 64, start: 1, duration: 1, velocity: 90 }
]
roll.addEventListener('change', (e) => save(e.detail.notes))
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `bars` | number | — | grid length in bars |
| `beats-per-bar` | number | `4` | bar grouping for ruler emphasis |
| `snap` | number (beats) | — | grid snap (0 = free) |
| `beat-width` | number (px) | — | horizontal zoom (px per beat) |
| `row-height` | number (px) | — | vertical zoom (px per pitch row) |
| `min-pitch` / `max-pitch` | MIDI number (0–127) | — | visible pitch range |
| `mode` | `select` `draw` | `select` | interaction mode |
| `fold` | fold mode | — | fold the keyboard to used pitches or to `scale` |
| `scale` | scale name | — | scale used for highlighting and `fold="scale"` |
| `root` | MIDI number | — | scale root |
| `default-velocity` | number (1–127) | `100` | velocity for newly drawn notes |
| `playhead` | number (beats) | — | draws a playhead line at this beat |
| `has-toolbar` | boolean | — | hide the toolbar |
| `has-keyboard` | boolean | — | hide the piano-keyboard gutter |
| `is-disabled` | boolean | — | disable interaction |
| `is-hidden` | boolean | — | hide |

## Note model

```ts
type Note = {
  id?: number         // assigned if omitted
  pitch: number        // MIDI 0-127
  start: number         // beats
  duration: number      // beats
  velocity?: number     // 1..127, default `default-velocity`
}
```

## Properties

- `notes` — `Note[]`, two-way via the `change` event

## Imperative API

- `getNotes()` / `setNotes(notes)`
- `selectAll()` / `clearSelection()` / `getSelection()` → `number[]`
- `deleteSelection()` / `duplicateSelection()`

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `change` | `{ notes }` | whenever notes are drawn, moved, resized, deleted, or duplicated |
| `select` | `{ ids }` | whenever the selection changes |

## Notes

- Keyboard: Delete removes the selection, Ctrl/⌘+D duplicates,
  Ctrl/⌘+A selects all, arrows nudge.
