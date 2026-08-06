# z-live-code

An editable snippet with its result beside it.

```html
<z-live-code
  code="<z-button accent='dom'>Save</z-button>"
  assets="/zest.js /ink.css"
></z-live-code>
```

**The editor is a plain textarea, on purpose.** Syntax-aware editing means a
tokenizer, an undo model, bracket matching and a several-hundred-kilobyte
dependency — to serve someone poking at six lines of markup to see what
happens. The textarea does that job.

**The preview is a [z-sandbox](z-sandbox.md), which is not a detail.**
Reader-authored markup is arbitrary: it can open a dialog, register a hotkey,
or paint something fixed, and none of that should be able to reach the docs
page around it.

Evaluation is debounced by 400ms. Rebuilding the frame on every keystroke
makes the preview flicker and throws away the reader's scroll position inside
it, which is worse than a beat of latency.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `code` | string | — | **property** — the starting source; replacing it discards the reader's edit |
| `assets` | string | — | passed through to the sandbox |
| `theme` | string | the page's | passed through to the sandbox |
| `height` | CSS length | `20rem` | height of both panes |
| `layout` | `stacked` | side by side | force one column |
| `editor-label` | string | `Edit` | heading over the editor |
| `preview-label` | string | `Result` | heading over the preview |
| `is-hidden` | boolean | — | hide |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `change` | `{ code }` | fires after the debounce, not per keystroke |
| `reset` | — | the reader restored the authored source |

## Notes

A new `code` prop replaces the draft outright rather than merging into it.
Merging an authored change into a reader's edit cannot be done correctly, and
is confusing when attempted.

Collapses to one column under 48rem regardless of `layout`.
