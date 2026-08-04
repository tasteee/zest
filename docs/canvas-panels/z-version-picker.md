# z-version-picker

The docs version dropdown.

```js
const picker = document.querySelector('z-version-picker')
picker.value = '2.x'
picker.versions = [
  { value: '2.x', label: 'v2 (latest)' },
  { value: '1.x', label: 'v1', href: 'https://v1.example.com' }
]
```

A thin `z-menu` composition that would not deserve its own tag except for one
thing: **the route rewriting**. Switching version means landing on the same
page in the other version, not on that version's home page, and that rule
belongs in one place rather than in every consumer.

The version segment is swapped in place, so a reader three pages deep stays
three pages deep. A path that does not carry the segment falls back to the
version root. An entry with an `href` navigates verbatim instead — versioned
docs are often separate deployments.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `versions` | `{ value, label?, href? }[]` | `[]` | **property** — the options |
| `value` | string | — | the current version; the segment that gets replaced |
| `is-managed` | boolean | — | the host owns navigation — fire the event, do not navigate |
| `is-hidden` | boolean | — | hide |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `change` | `{ value, route }` | fires before navigation, always |

## Notes

`is-managed` exists for hosts with a router, where a full page load would
throw away state. The event fires either way.
