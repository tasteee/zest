# z-doc-header

The page hero for a documentation page: category eyebrow, title, status badge,
tagline, and a meta row. It exists as one element rather than a composition
each page repeats because it is identical across every page — repeating the
composition means one chance per page to get the order, the gap, or the status
colour subtly wrong.

```html
<z-doc-header
  eyebrow="Forms"
  heading="z-checkbox"
  tagline="A single binary choice."
  status="stable"
  version-added="0.4.0"
  last-updated="2026-07-30"
  source-href="https://github.com/tasteee/zest/blob/main/src/components/z-checkbox.tsx"
></z-doc-header>
```

`status` is mapped to an accent here rather than being handed one, so `beta`
reads the same amber on every page — in this site and in any consumer
documenting their own system.

| `status` | accent |
| --- | --- |
| `stable` | `success` |
| `beta` | `warning` |
| `experimental` | `sub` |
| `new` | `dom` |
| `deprecated` | `error` |

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `eyebrow` | string | — | category label above the title |
| `heading` | string | — | the page title, rendered as the `<h1>` |
| `tagline` | string | — | one-line summary under the title |
| `status` | `stable` `beta` `experimental` `new` `deprecated` | — | maturity badge |
| `source-href` | url | — | adds a "View source" link to the meta row |
| `version-added` | string | — | adds "Added in vX" to the meta row |
| `last-updated` | date string | — | adds a relative "Updated …" to the meta row |
| `is-hidden` | boolean | — | hide |

## Slots

| Slot | Description |
| --- | --- |
| `actions` | trailing controls on the title row — a copy button, a version picker |

## Notes

The meta row only renders when at least one of `source-href`, `version-added`,
or `last-updated` is set, so a page without provenance carries no empty strip.

Composes `z-eyebrow`, `z-badge`, and `z-relative-time`.
