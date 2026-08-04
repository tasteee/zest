# z-do-dont

Paired guidance: the correct case beside the incorrect one.

```html
<z-do-dont
  do-caption="One primary action per view."
  dont-caption="Two primaries make neither one primary."
>
  <z-button slot="do" accent="dom">Save</z-button>

  <div slot="dont">
    <z-button accent="dom">Save</z-button>
    <z-button accent="dom">Publish</z-button>
  </div>
</z-do-dont>
```

**One element with two slots, not two sibling cards.** The pairing *is* the
content — a "do" card alone is just an example, and it only teaches when the
thing it is not sits next to it. Separate elements would make it possible to
ship half the lesson.

Each side takes real DOM, so both cases are live components rather than
screenshots, and neither can drift from the library the way a picture would.

The affordance is deliberately redundant — colour, an icon, and a word. This
element exists for a judgement the reader has to get right at a glance, and
colour alone fails roughly one man in twelve.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `do-label` | string | `Do` | the verdict word on the correct side |
| `dont-label` | string | `Don't` | the verdict word on the incorrect side |
| `do-caption` | string | — | the explanation under the correct side |
| `dont-caption` | string | — | the explanation under the incorrect side |
| `layout` | `center` | — | centre the contents of both stages |
| `is-hidden` | boolean | — | hide |

## Slots

| Slot | Description |
| --- | --- |
| `do` | the correct example — real DOM |
| `dont` | the incorrect one |

## Notes

The verdict colour sits on the label band, never on the stage. A green wash
behind the example itself would make the component look like it were in a
success state.

Collapses to one column under roughly 32rem, where the two cards stack in
reading order — do first.
