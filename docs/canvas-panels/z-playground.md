# z-playground

One live instance driven by a declarative control list, with the markup it
produces echoed underneath.

```html
<z-playground tag-name="z-button">
  <z-button slot="stage">Save</z-button>
</z-playground>
```

```js
const playground = document.querySelector('z-playground')
playground.controls = [
  { name: 'kind', kind: 'enum', options: ['solid', 'outline', 'ghost'], defaultValue: 'solid' },
  { name: 'is-disabled', kind: 'boolean' }
]
```

The element under test is **slotted**, not built from a string. It is a real
instance with real listeners and real state — the thing the reader is about to
paste, not a picture of it.

Serialization lives inside the element, and that is the whole point: the
snippet is read back off the live instance after every change, so the code
sample cannot drift from what is on screen. A host that formatted its own
snippet would be maintaining a second source of truth.

Composes [z-control-panel](z-control-panel.md) for the knobs and `z-code-block`
for the output.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `controls` | `control[]` | `[]` | **property** — see [z-control-panel](z-control-panel.md) for the shape |
| `tag-name` | string | — | tag the controls target, including a matching descendant of the stage wrapper |
| `authoredAttributes` | `string[]` | — | **property** — root attributes to retain in copied HTML, alongside controlled attributes |
| `authoredAttributeValues` | `Record<string, string>` | — | **property** — original root attribute values for Reset; otherwise captured on connection |
| `layout` | `center` `stack` `fill` | — | how the stage arranges what is slotted |
| `is-hidden` | boolean | — | hide |

## Slots

| Slot | Description |
| --- | --- |
| `stage` | the live instance — the first assigned element is the one controlled |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `reset` | — | the reset button was pressed |

## Notes

Reset means "back to the element as authored" — every controlled attribute is
restored to its original value. Attributes added through the controls are removed. Wrapped examples reset the controlled child, preserving the wrapper.

The `slot` attribute is stripped from the serialized markup, so readers see
what they would paste rather than the plumbing that got it onto the stage.

Live attribute and content changes update the snippet, including direct interaction with the preview. Mixed text and nested elements are preserved, and attribute values are HTML-escaped. For a boolean whose documented default is `true`, turning it off also produces a JavaScript property assignment; an absent HTML attribute alone cannot express that override.
