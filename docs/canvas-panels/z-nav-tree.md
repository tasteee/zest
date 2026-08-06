# z-nav-tree

Recursive, route-aware documentation navigation.

```js
document.querySelector('z-nav-tree').items = [
  { label: 'Forms', children: [
    { label: 'z-checkbox', route: '/c/forms/z-checkbox', status: 'stable' }
  ]}
]
```

**Why not `z-sidebar` or `z-tree`.** `z-sidebar` is an app rail: one level of
grouping, value-based entries, sorted alphabetically. `z-tree` is a generic
hierarchy that renders ARIA `treeitem`s — the wrong role for site navigation,
and its rows are not links. Docs nav is recursive, link-first, and ordered by
author intent.

**Every destination is a real `<a href>`**, which is the point: middle-click,
modifier-click, open-in-new-tab and crawlability all come free, and none of
them survive a div with a click handler.

Router-agnostic. Clicks are never intercepted — the anchor navigates natively —
and `navigate` is a notification (close a drawer, log an analytic), not the
navigation itself.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `{ label, href?, route?, status?, children? }[]` | `[]` | **property** — the tree |
| `route` | string | — | the active route; a plain string match |
| `label` | string | — | accessible name for the nav |
| `storage-key` | string | — | persists collapse state; omit and nothing is stored |
| `filter-placeholder` | string | — | placeholder for the inline filter |
| `is-collapsed-by-default` | boolean | — | only the branch holding the active route opens |
| `is-filtered` | boolean | — | show the inline filter field |
| `is-hidden` | boolean | — | hide |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `navigate` | `{ route, node }` | a row was clicked; the anchor navigates regardless |

## Notes

An explicit toggle wins and stays won — closing the section you are currently
reading in keeps it closed.

Rows are flattened before render, so only expanded branches produce rows and
the render pass stays cheap on a 150-page nav.
