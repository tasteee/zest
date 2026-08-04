# z-edit-on-github

The "fix this page" link at the foot of a doc.

```html
<z-edit-on-github repo="tasteee/zest" path="docs/forms/z-input.md"></z-edit-on-github>
```

The URL is built from a repo and a path rather than authored per page, because
150 pages hand-writing their own blob URL is 150 chances to point at the wrong
branch. `href` overrides for the odd page that lives elsewhere.

Composes [z-external-link](z-external-link.md), so the arrow, the `rel`
hardening and the new-tab behaviour are not restated.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `repo` | string | — | `owner/name` |
| `path` | string | — | path to the file within the repo |
| `branch` | string | `main` | branch to edit against |
| `href` | url | built | overrides the built URL entirely |
| `label` | string | `Edit this page` | link text |
| `is-hidden` | boolean | — | hide |

## Notes

Renders nothing when it has neither a usable `repo`/`path` pair nor an `href`,
rather than emitting a link to a 404.
