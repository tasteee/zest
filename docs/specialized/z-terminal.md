# z-terminal

A clean, chrome-styled terminal surface for command walkthroughs (install / CLI
usage docs). No line numbers or syntax highlighting — just a seamless Hyper-style
window with a mock shell + working directory, traffic-light dots, and per-line
copy on hover. Pass the source via the `code` **property**, one line per row.

Lines that start with the `prompt` marker (default `$`) are treated as commands:
they're copyable and copying strips the marker. Override which lines copy with
`copy-lines` (`all`, `none`, `commands`, or ranges like `1-3,5`). The window
grows with its content unless you give it a `width` / `height` — see
[Sizing](#sizing).

```html
<z-terminal shell="zsh" cwd="~/app" code="$ npm install
added 42 packages"></z-terminal>
```

## Animated simulation

Add `animate` to play the content back like a live session: **command lines type
out** character-by-character with a blinking caret, **output lines fade in**
quickly, and reveals are staggered so only one line animates at a time.

```html
<z-terminal shell="zsh" cwd="~/app" animate start-on-view loop
  code="$ zesty build
$ zesty deploy"></z-terminal>
```

- `start-on-view` waits until the terminal scrolls into view before playing.
- `loop` auto-restarts `loop-delay` ms after the last line reveals.
- A **replay control** appears in the bottom-right once a run completes (suppress
  with `hide-replay`). It's available whether or not `loop` is set.
- `prefers-reduced-motion` skips the animation and renders the final state.

### Per-line timing (the `lines` property)

For control over how long each step holds, set the `lines` **property** to an
array instead of `code`. Each entry is a string (parsed like a `code` row) or an
object. `delay` is the pause **before** that line begins — so a slow step can
hold longer before the next one starts, instead of every gap being uniform.

```js
const term = document.querySelector('z-terminal')
term.animate = true
term.lines = [
  { text: '$ pnpm dev', typeSpeed: 55 },
  { text: 'compiling modules', delay: 900 },
  { text: '✓ ready in 842ms', delay: 700 },
]
```

Each object entry accepts: `text`, `type` (`command` | `output`, inferred from
the prompt marker when omitted), `delay`, `typeSpeed`, and `fade`.

### Controls

```js
term.play()     // start, or resume after pause
term.pause()    // freeze mid-sequence
term.restart()  // replay from the top
term.addEventListener('done', () => {})
```

## Sizing

`width`, `height`, and `max-height` take any CSS length and pin the window to a
fixed box. The header stays put and the body scrolls inside whatever space is
left, so the terminal holds its footprint no matter how many lines it holds.

```html
<z-terminal shell="zsh" cwd="~/app" width="32rem" height="11rem" code="$ zesty build
compiling 128 modules
✓ bundled in 1.2s
$ zesty test
running 64 specs
✓ 64 passed
$ zesty deploy
uploading dist/ → edge
✓ live at https://zesty.dev"></z-terminal>
```

Without a `height` the window grows with its content, as before. `max-height`
caps that growth instead of fixing it, which suits a static log whose length you
don't know up front.

```html
<z-terminal shell="bash" cwd="~/logs" max-height="9rem" copy-lines="none" code="12:04:01 worker started
12:04:03 queue drained
12:04:09 cache warmed"></z-terminal>
```

### Scrolling an animated run

A sized terminal never expands as an animated sequence reveals lines — it
scrolls, following the playhead so the newest line stays in view. That makes a
long simulation safe to drop into a fixed layout slot.

```html
<z-terminal shell="zsh" cwd="~/app" width="32rem" height="10rem" animate loop start-on-view
  code="$ zesty build
compiling 128 modules
✓ bundled in 1.2s
$ zesty test
running 64 specs
✓ 64 passed"></z-terminal>
```

Add `no-auto-scroll` to leave the scroll position alone during playback — the
run then reveals below the fold and the reader scrolls it themselves.

Long lines don't wrap or truncate: they keep their natural width and the body
scrolls sideways, so a narrow terminal stays readable.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `code` | string | — | the source (set as a property to preserve whitespace) |
| `lines` | array | — | per-line content + timing; overrides `code` (property) |
| `shell` | string | — | shell label in the header |
| `cwd` | string | — | working directory in the header |
| `prompt` | string | `$` | command marker |
| `copy-lines` | string | `commands` | which lines copy: `all`, `none`, `commands`, ranges |
| `width` | string | — | CSS length for the window's width |
| `height` | string | — | CSS length that pins the window's height; the body scrolls |
| `max-height` | string | — | CSS length that caps growth instead of fixing the height |
| `animate` | boolean | — | play the content back as a typed/faded simulation |
| `start-on-view` | boolean | — | begin only when scrolled into view |
| `type-speed` | number | `55` | ms per character for typed commands |
| `line-delay` | number | `380` | ms gap before each line reveals |
| `fade-duration` | number | `240` | ms for output lines to fade in |
| `loop` | boolean | — | restart automatically after finishing |
| `loop-delay` | number | `2200` | ms to wait before an auto-restart |
| `hide-replay` | boolean | — | suppress the bottom-right replay control |
| `no-auto-scroll` | boolean | — | don't follow the playhead while an animation plays |
| `tone` | `secondary` | `primary` (green) | accent color |
| `is-hidden` | boolean | — | hide |

## Methods

| Method | Description |
| --- | --- |
| `play()` | start playback, or resume after `pause()` |
| `pause()` | freeze the animation in place |
| `restart()` | replay from the first line |

## Events

| Event | Description |
| --- | --- |
| `copy` | after a line is copied to the clipboard (detail: the copied text) |
| `done` | when an animated sequence reaches its last line |
