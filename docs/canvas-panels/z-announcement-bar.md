# z-announcement-bar

The dismissible strip at the top of a site.

```html
<z-announcement-bar storage-key="zest-v1" accent="dom">
  v1 is out. <z-external-link href="/blog/v1">Read the notes</z-external-link>
</z-announcement-bar>
```

**The storage key is the announcement, not the element.** Change the message,
change the key, and everyone sees it again. A single fixed key would mean a
reader who dismissed last quarter's banner never sees another one.

Persistence is opt-in. Without a `storage-key` the bar dismisses for the
session and returns on reload, which is right for a banner that has not earned
permanence.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `message` | string | slotted content | the announcement |
| `accent` | `dom` `sub` `success` `warning` `error` | `dom` | tint |
| `storage-key` | string | — | persists the dismissal; omit for session-only |
| `label` | string | `Announcement` | accessible name for the region |
| `is-permanent` | boolean | — | remove the close button |
| `is-hidden` | boolean | — | hide |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `dismiss` | — | the bar was closed |

## Notes

Nothing renders until storage has been read, so a dismissed banner never
flashes into view on its way out.

The close button sits at the end of the flex row rather than absolutely, so a
message long enough to wrap pushes it down instead of underneath itself.
