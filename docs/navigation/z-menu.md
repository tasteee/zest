# z-menu

A dropdown menu. The trigger is whatever you slot into `[slot="trigger"]`
(typically a [z-button](../actionables/buttons/z-button.md)); items come from an `items` **array
property**. The panel is a bordered, shadow-free popover.

```html
<z-menu>
  <z-button slot="trigger">Actions</z-button>
</z-menu>
```

```js
const menu = document.querySelector('z-menu')
menu.items = [
  { value: 'edit', label: 'Edit', shortcut: '⌘E' },
  { value: 'dup', label: 'Duplicate' },
  { isSeparator: true },
  { value: 'del', label: 'Delete', isDanger: true }
]
menu.addEventListener('select', (e) => e.detail.value)
```

Keyboard: ↑/↓ move (skipping separators/disabled), Enter/Space pick, Esc closes.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `MenuItem[]` | `[]` | **property** — see shape below |
| `align` | `start` `end` | `start` | which edge the panel aligns to |
| `accent` | `dom` `sub` | `dom` accent | active-item accent |
| `is-hidden` | boolean | — | hide |

**MenuItem:** `{ value?, label?, icon?, shortcut?, isDisabled?, isSeparator?, isDanger? }`
(`icon` is an HTML string rendered inline).

## Keyboard

Every row is exercised by a browser test.

| Keys | Action |
| --- | --- |
| ↓ / Enter / Space | On the trigger: opens the menu and focuses the first item. |
| ↑ | On the trigger: opens the menu and focuses the last item. |
| ↓ / ↑ | Moves focus between items, wrapping and skipping separators and disabled items. |
| Home / End | Focuses the first or last item. |
| A–Z | Type-ahead: jumps to the next item whose label starts with what was typed. |
| Enter / Space | Picks the focused item, closes, and returns focus to the trigger. |
| Esc | Closes and returns focus to the trigger. |
| Tab | Closes and moves on. |

## Slots

- `trigger` — the element that opens the menu.

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `select` | `{ value }` | when an item is chosen |
