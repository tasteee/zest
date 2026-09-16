# z-dialog

A modal built on the native `<dialog>` element, so focus trapping, Esc-to-close,
top-layer stacking, and the backdrop all come from the platform. An optional
`[slot="trigger"]` opens it; `heading` / `description` (or slotted content) fill
the body; a `[slot="footer"]` holds actions.

```html
<z-dialog id="profileDialog" heading="Edit profile" description="Update your details.">
  <z-button slot="trigger">Edit</z-button>

  <z-field label="Name"><z-input placeholder="Ada Lovelace"></z-input></z-field>

  <div slot="footer">
    <z-button id="done" accent="dom">Done</z-button>
  </div>
</z-dialog>
```

```js
const dialog = document.querySelector('#profileDialog')
document.querySelector('#done').addEventListener('click', () => {
  dialog.isOpen = false
})

// Open or close imperatively
dialog.isOpen = true
dialog.addEventListener('open', () => {})
dialog.addEventListener('close', () => {})
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `is-open` | boolean | — | open state (reflected, two-way) |
| `label` | string | — | accessible name when there is no heading |
| `heading` | string | — | visible title and accessible name |
| `description` | string | — | visible description, linked with aria-describedby |
| `size` | `small` `medium` `large` | `medium` | width (24 / 30 / 42 rem) |
| `has-close` | boolean | — | hide the × close button |
| `is-static` | boolean | — | disable backdrop-click dismiss |
| `is-disabled` | boolean | — | prevent the trigger from opening |

## Slots

- `trigger` — element that opens the dialog.
- _(default)_ — dialog body.
- `footer` — action row (hidden when empty).

## Events

| Event | Description |
| --- | --- |
| `open` | when the dialog opens |
| `close` | when the dialog closes |

`is-static` prevents backdrop dismissal; Escape still closes. Footer actions need their own handlers. Boolean attributes are enabled by presence: `has-close="false"` does not hide the close button. Use `dialog.hasClose = false`.
