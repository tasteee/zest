# z-external-link

A link that leaves the site, and says so.

```html
<z-external-link href="https://developer.mozilla.org" label="MDN"></z-external-link>
<z-external-link href="https://example.com">or slot the text</z-external-link>
```

The arrow is the point: a reader deciding whether to click deserves to know
they are about to lose their place, and finding that out afterwards is the
annoying way to learn it.

**`rel` is hardened rather than left to the author.** `target="_blank"` without
`noopener` hands the opened page a live reference to this one through
`window.opener`. Every consumer would otherwise have to remember; this
remembers for them.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `href` | url | — | the destination |
| `label` | string | slotted content | link text |
| `is-same-tab` | boolean | — | navigate in place instead of opening a tab |
| `is-hidden` | boolean | — | hide |

## Notes

The arrow rides in the text flow rather than being absolutely placed, so it
wraps with the last word instead of stranding itself on a new line.
