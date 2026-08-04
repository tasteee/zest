# z-message-group

A run of consecutive messages from one sender, sharing a single avatar, name,
and timestamp. It positions its slotted [z-message-bubble](z-message-bubble.md)
children (sets their `side` and `group` corner position) so you don't repeat
that on every bubble.

```html
<z-message-group side="start" name="Alice" avatar-name="Alice" timestamp="2026-07-04T18:00:00Z">
  <z-message-bubble>Hey!</z-message-bubble>
  <z-message-bubble>Did you see the designs?</z-message-bubble>
</z-message-group>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `side` | `start` `end` | `start` | `end` is you — right-aligned, no avatar by default |
| `name` | string | — | sender name (shown above the group on `start` side only) |
| `avatar-src` | URL | — | avatar image |
| `avatar-name` | string | falls back to `name` | name used to derive avatar initials |
| `avatar-initials` | string | — | explicit initials override |
| `timestamp` | ISO string | — | rendered via [z-relative-time](../specialized/z-relative-time.md) beneath the group |
| `avatar` | `auto` `always` `never` | `auto` | `auto` shows the avatar on incoming groups and hides it on outgoing ones |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — [z-message-bubble](z-message-bubble.md) children; their `side`/`group` attributes are managed automatically.
