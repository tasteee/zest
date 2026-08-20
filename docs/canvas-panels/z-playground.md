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
  { name: 'disabled', kind: 'boolean' }
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
| `tag-name` | string | — | the tag being demonstrated, for the snippet |
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
removed, so the component's own defaults are the baseline rather than whatever
the last reader left behind.

The `slot` attribute is stripped from the serialized markup, so readers see
what they would paste rather than the plumbing that got it onto the stage.
