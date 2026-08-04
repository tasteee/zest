# z-type-badge

A monospace pill for one type token, coloured by category. Colour carries
meaning: scanning an API table for "which of these take a fixed set of values"
should be a glance, not a read.

```html
<z-type-badge value="boolean"></z-type-badge>
<z-type-badge value="solid | outline | ghost"></z-type-badge>
<z-type-badge value="(value: string) => void"></z-type-badge>
```

The category is inferred from the token rather than declared, because an API
table holds hundreds of these and hand-classifying each one is how a reference
drifts. Set `kind` when the guess is wrong.

| Inferred kind | Matches | Colour |
| --- | --- | --- |
| `union` | contains a pipe | foreground |
| `function` | contains `=>` or a paren | success |
| `primitive` | `string` `number` `boolean` `null` `undefined` `any` `unknown` `void` `symbol` `bigint` `date` | purple |
| `object` | starts with a brace, ends with `[]`, or starts with `Record<` | warning |
| `literal` | anything else | pink |

Order matters in that table: a union of literals is a union first, and the
function test runs before the object test so `() => void` is not read as a
brace-less object.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | string | — | the type token to render |
| `kind` | `primitive` `literal` `union` `function` `object` | inferred | override the inferred category |
| `is-hidden` | boolean | — | hide |

## Notes

Only the long kinds — union, object, function — are allowed to wrap. A bare
primitive never breaks across lines.
