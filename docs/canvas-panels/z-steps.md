# z-steps

Numbered instructions with a connector rail. Each step takes arbitrary
content — prose, a code block, a whole live example.

```html
<z-steps>
  <z-step heading="Install">
    <z-code-block language="sh" code="npm i @tasteee/zest"></z-code-block>
  </z-step>
  <z-step heading="Import the stylesheet">
    <p>One import registers every element.</p>
  </z-step>
</z-steps>
```

The marker column and the content column are separate grid tracks rather than
a list-item marker. An `<ol>` marker cannot be styled to sit inside a rail,
and anything tall enough to hold a code block breaks its alignment anyway.

**The number is assigned, not authored.** `z-steps` writes an `index` onto
each slotted step whenever the slot changes, so reordering the markup
renumbers the list. A hand-numbered list is a list that eventually skips 4.

## Guided flows

Set `current` and the list stops being documentation and starts being
progress: steps before it read as done, the current one is highlighted, the
rest are pending. Leave it off and every step reads the same, which is right
for a reference page.

```html
<z-steps current="2">…</z-steps>
```

State shows on the marker alone. Recolouring the content as well would make a
completed step look disabled rather than done.

## `z-steps`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `current` | number | — | 1-based index of the active step; enables the guided-flow states |
| `is-hidden` | boolean | — | hide |

## `z-step`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `heading` | string | — | the step's title |
| `index` | number | assigned | set by the parent; authoring it is overwritten |
| `state` | `pending` `current` `done` | assigned | set by the parent from `current` |
| `is-last` | boolean | assigned | set by the parent; suppresses the trailing rail |
| `is-hidden` | boolean | — | hide |

## CSS custom properties

| Name | Default | Description |
| --- | --- | --- |
| `--steps-marker-size` | `1.75rem` | diameter of the number circle; the heading matches it |
| `--steps-rail` | `--border` | colour of the connector line |
