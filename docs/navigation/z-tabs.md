# z-tabs

A tab list driven by a `tabs` **array property**. Panels are provided as named
slots whose name matches each tab's `value`. The active tab carries an accent
underline; all panels stay mounted, with inactive panels hidden.

```html
<z-tabs id="t" label="Product details">
  <div slot="overview">Overview content</div>
  <div slot="specs">Specs content</div>
</z-tabs>
```

```js
const tabs = document.querySelector('#t')
tabs.tabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'specs', label: 'Specs' }
]
tabs.addEventListener('change', (e) => e.detail.value)
```

Keyboard: ←/→ select and focus the next enabled tab; Home/End select and focus the first/last enabled tab.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `tabs` | `{ value, label, isDisabled? }[]` | `[]` | **property** — the tab list |
| `value` | string | first enabled tab | active value; an unset, invalid, or disabled value displays the first enabled tab |
| `accent` | `dom` `sub` | neutral | underline color |
| `label` | string | — | accessible name for the tab list |
| `is-fitted` | boolean | — | tabs stretch to fill the width equally |
| `is-hidden` | boolean | — | hide |

## Slots

- _(named)_ — one slot per tab, named after the tab's `value`.

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `change` | `{ value }` | on tab change |
