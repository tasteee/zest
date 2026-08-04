# z-filter

A pill-based faceting control (the daisyUI "filter" pattern). Options are
supplied as an `options` array property.

```html
<z-filter label="Category"></z-filter>
```

```js
const filter = document.querySelector('z-filter')
filter.options = [
  { value: 'design', label: 'Design' },
  { value: 'eng', label: 'Engineering', children: [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' }
  ] }
]
filter.addEventListener('change', (e) => e.detail) // { value, path }
```

Flat (default): a single-select group. Picking a pill collapses the rest away
and reveals a reset (✕); reset brings them all back.

Nested (`is-drilldown`): options may carry `children`. Picking a branch drills
in — its siblings collapse into a breadcrumb and its children appear as the
next level of pills. Picking a leaf just activates it; its siblings stay
visible. Crumbs are clickable to step back up.

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `accent` | `primary` `secondary` | `primary` accent | pill accent color |
| `size` | `small` `medium` | `medium` | pill size |
| `label` | string | — | accessible group name |
| `reset-label` | string | `Clear` | accessible label for the reset (✕) button |
| `is-drilldown` | boolean | — | enable nested drill-down mode instead of flat single-select |
| `is-hidden` | boolean | — | hide |

## Properties

- `options` — `{ value, label, isDisabled?, children? }[]`

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `change` | `{ value, path }` | selection changed; `path` is the full chosen branch |
