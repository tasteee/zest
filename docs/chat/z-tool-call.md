# z-tool-call

An expandable card for an agent tool invocation: the tool name, a run status
(running / success / error), the call arguments, and the result. Composes
[z-collapsible](../navigation-disclosure/z-collapsible.md) for disclosure and
[z-code-block](../specialized/z-code-block.md) for args/result.

```html
<z-tool-call
  name="search_web"
  status="success"
  args='{ "query": "zest web components" }'
  result="3 results found"
></z-tool-call>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `name` | string | — | tool name |
| `status` | `running` `success` `error` | `running` | run status indicator |
| `result-language` | language name | — | syntax highlighting language for `result` |
| `is-expanded` | boolean | — | disclosure open state |
| `is-hidden` | boolean | — | hide |

## Properties

- `args` — string, rendered as JSON in a code block
- `result` — string, rendered in a code block (omit and use the `result` slot for richer output)

## Slots

- `result` — custom result content, used when `result` isn't set.
