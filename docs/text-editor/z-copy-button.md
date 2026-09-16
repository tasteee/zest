# z-copy-button

Copy-to-clipboard with state feedback.

```html
<z-copy-button value="npm i @tasteee/zest"></z-copy-button>
<z-copy-button kind="icon" value="…"></z-copy-button>
```

Extracted so prose, tokens, install commands and swatches all get the identical
affordance. `z-code-block` composes it rather than carrying its own.

Sits on `shared/clipboard.ts`, which is the one place that catches. Clipboard
writes fail for ordinary, uninteresting reasons — an insecure origin, a denied
permission, a document that was not focused — and every caller wants the same
response to all of them: leave the affordance unconfirmed.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | string | — | the text to copy |
| `label` | string | `Copy` | resting label |
| `copied-label` | string | `Copied` | label held after a successful copy |
| `kind` | `ghost` `icon` | `ghost` | treatment; `icon` drops the label |
| `size` | `sm` `md` | `md` | density |
| `is-disabled` | boolean | — | disable |
| `is-hidden` | boolean | — | hide |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `copy` | `{ value }` | the copy succeeded |
| `error` | `{ error }` | the copy failed; the button stays unconfirmed |
