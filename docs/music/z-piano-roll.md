# z-piano-roll

A full MIDI note editor / piano roll in the spirit of Ableton's, built as a
single self-contained element. It owns a list of signals and every common
authoring gesture: place (double-click empty space), delete, move (time +
pitch), resize, clone (Ctrl+drag), scrub velocity (Alt+drag), collision
handling (latest wins), marquee multi-select, duplicate, select-all,
arrow-key nudge, and click-a-row-label to select every signal on that row —
plus scale highlighting, two fold modes, snap-to-grid, zoom, a sticky
piano-keyboard gutter, and a bar ruler.

**Terminology.** A *note* is a row — a pitch lane, the space you place
things on (what the keyboard gutter on the left labels). A *signal* is one
placed thing on a note: a pitch/start/duration/velocity tuple. The API below
still calls a signal a `Note` and the list a `notes` property, for
compatibility with existing consumers and with z-pattern-roll.

See [z-pattern-roll](z-pattern-roll.md) for the chord-relative sibling of
this editor, which shares the entire interaction engine but expresses pitch
as chord-tone degrees instead of absolute MIDI numbers.

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
| `fold` | fold mode | — | fold the keyboard to used pitches or to `scale` |
| `scale` | scale name | — | scale used for highlighting and `fold="scale"` |
| `root` | MIDI number | — | scale root |
| `default-velocity` | number (1–127) | `100` | velocity for newly placed signals |
| `playhead` | number (beats) | — | draws a playhead line at this beat |
| `has-toolbar` | boolean | — | hide the toolbar |
| `has-keyboard` | boolean | — | hide the piano-keyboard gutter |
| `is-disabled` | boolean | — | disable interaction |
| `is-hidden` | boolean | — | hide |

## Signal model

What the API still calls a `Note` (see Terminology above):

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
| `change` | `{ notes }` | whenever notes are placed, moved, resized, deleted, or duplicated |
| `select` | `{ ids }` | whenever the selection changes |

## Notes

- Keyboard: Delete removes the selection, Ctrl/⌘+D duplicates,
  Ctrl/⌘+A selects all, arrows nudge.
- Mouse: Shift/⌘+click adds to the selection; Ctrl+drag on a signal's body
  clones it and drags the clone, leaving the original in place; Alt+drag a
  signal (anywhere on it) to scrub its velocity vertically; click a row
  label in the keyboard gutter to select every signal on that note.
