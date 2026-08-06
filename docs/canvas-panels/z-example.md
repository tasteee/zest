# z-example

A preview surface plus collapsible source with per-language tabs and copy — the
single most-used element on a component docs site.

```html
<z-example heading="Sizes" description="Three densities.">
  <z-button size="sm">Small</z-button>
  <z-button size="md">Medium</z-button>
</z-example>
```

```js
document.querySelector('z-example').snippets = [
  { label: 'HTML', language: 'html', code: '<z-button size="sm">Small</z-button>' }
]
```

The default slot is the live preview — real DOM, real listeners, not a
screenshot of one. Composes `z-tabs`, `z-code-block` and
[z-copy-button](../text-editor/z-copy-button.md).

**The prop is `heading`, not `title`.** `title` is a global attribute and would
hang a tooltip off the card.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `heading` | string | — | the example's title |
| `description` | string | — | a line under the heading |
| `snippets` | `{ label, language, code }[]` | `[]` | **property** — one tab per entry |
| `layout` | `center` `start` `stack` `fill` | `center` | how the preview arranges its children |
| `is-source-open` | boolean | — | start with the source expanded |
| `has-background-grid` | boolean | — | grid behind the preview, for alignment work |
| `is-resizable` | boolean | — | drag the preview width |
| `is-hidden` | boolean | — | hide |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `copy` | `{ code, label }` | a snippet was copied |
