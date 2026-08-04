# z-code-group

Tabbed sibling code blocks — the npm/pnpm/yarn case, and the
HTML/React/Vue case.

```html
<z-code-group group="package-manager" storage-key="zest-pm">
  <z-code-block label="npm"  language="sh" code="npm i @tasteee/zest"></z-code-block>
  <z-code-block label="pnpm" language="sh" code="pnpm add @tasteee/zest"></z-code-block>
  <z-code-block label="yarn" language="sh" code="yarn add @tasteee/zest"></z-code-block>
</z-code-group>
```

Tab labels come off each child's `label`, falling back to `filename` and then
`language`, so the common case needs no extra markup.

**`group` is what makes this worth an element** rather than a `z-tabs`
composition. Choosing pnpm once should hold for every install snippet on the
page and on the next page. Groups sharing a name sync live through a
module-level registry, and `storage-key` carries the choice across
navigations. A reader who picks their package manager should never pick it
again.

Persistence is opt-in: an element with no `storage-key` never touches
storage.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `group` | string | — | groups with the same name switch together |
| `value` | string | first tab | the selected tab's label |
| `storage-key` | string | — | persists the choice; omit and nothing is stored |
| `is-hidden` | boolean | — | hide |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `change` | `{ value }` | a tab was chosen here — not fired for a synced change |

## Notes

Unselected children carry the `hidden` attribute rather than being hidden with
CSS, which takes them out of the accessibility tree too — a code block behind
another tab cannot be tabbed into.

A storage event only fires in *other* tabs, so same-page sync between groups
cannot rely on it. That is why the registry exists alongside the storage key.
