# z-button

A button. Combine `accent` (color), `kind` (treatment), and `size`. All accents
share the same boldness so a solid button reads consistently across hues.

```html
<z-button accent="dom">Save</z-button>
<z-button accent="error" kind="outline">Delete</z-button>
<z-button kind="ghost" size="sm">Cancel</z-button>
<z-button accent="dom" is-loading>Saving…</z-button>
<z-button is-full-width>Continue</z-button>

<!-- icons go in the default slot alongside (or instead of) the label -->
<z-button>
  <svg>…</svg> With icon
</z-button>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `accent` | `neutral` `dom` `sub` `success` `warning` `error` | `neutral` | color family |
| `kind` | `solid` `outline` `ghost` `soft` `plain` | `solid` | visual treatment |
| `size` | `sm` `md` `lg` | `md` | size |
| `label` | string | — | text (alternative to slotting children) |
| `type` | `button` `submit` `reset` | `button` | native button type |
| `is-disabled` | boolean | — | disable |
| `is-loading` | boolean | — | show a spinner and block interaction |
| `is-full-width` | boolean | — | stretch to fill its container |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — button content (label and/or icons). Ignored if `label` is set.

## Events

Use the native `click` event (`onClick` in React).

## Notes

Inside a [z-button-group](z-button-group.md) the corner radii are managed for
you, so individual buttons join into a seamless segmented control.
