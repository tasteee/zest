# z-thinking

A collapsible reasoning / chain-of-thought block. While `is-active` the label
shimmers (the model is still reasoning); once done, pass a `duration` like
"Thought for 4s". Composes [z-collapsible](../navigation-disclosure/z-collapsible.md)
for the disclosure.

```html
<z-thinking is-active label="Thinking">
  Let me work through the constraints…
</z-thinking>

<z-thinking duration="Thought for 4s">
  Considered three approaches before landing on this one.
</z-thinking>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `label` | string | `Thinking` | header label |
| `duration` | string | — | shown next to the label once no longer active (e.g. "Thought for 4s") |
| `is-active` | boolean | — | shimmer the label to indicate reasoning is still in progress |
| `is-expanded` | boolean | — | disclosure open state |
| `is-hidden` | boolean | — | hide |

## Properties

- `content` — reasoning text rendered through [z-markdown](../specialized/z-markdown.md), instead of slotting

## Slots

- _(default)_ — reasoning content as plain text/markup (ignored if `content` is set).
