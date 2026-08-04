# z-prev-next

The footer pager at the bottom of a documentation page. Two cards that read as
a pair: previous points left and sits left, next points right and sits right.

```html
<z-prev-next></z-prev-next>
```

```js
const pager = document.querySelector('z-prev-next')
pager.previous = { label: 'z-checkbox', route: '#/c/forms/z-checkbox' }
pager.next = { label: 'z-select', route: '#/c/forms/z-select' }
pager.addEventListener('navigate', (e) => e.detail) // { route }
```

Router-agnostic, the same way `z-nav-tree` is: these are real anchors, the
click is never intercepted, and `navigate` is a notification rather than the
navigation itself. Middle-click and open-in-new-tab work because nothing gets
in their way.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `previous` | `{ label, route?, href? }` | — | **property** — the card on the left |
| `next` | `{ label, route?, href? }` | — | **property** — the card on the right |
| `previous-label` | string | `Previous` | direction word above the left card |
| `next-label` | string | `Next` | direction word above the right card |
| `is-hidden` | boolean | — | hide |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `navigate` | `{ route }` | a card was clicked |

## Notes

A missing side still holds its grid column, so the surviving card stays on its
own side rather than sliding to the middle of the page. With neither side set
the element renders nothing.

Collapses to a single column under 40rem, where the right-aligned next card
also flips back to reading left.
