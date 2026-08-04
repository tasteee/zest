# z-language-switcher

The docs locale dropdown — sibling to
[z-version-picker](z-version-picker.md), and worth its own tag for the same
reason: the route rewriting.

```js
const switcher = document.querySelector('z-language-switcher')
switcher.value = 'en'
switcher.locales = [
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' }
]
```

**Label each locale in its own language.** A reader who cannot read the
current one still has to find theirs, and "Japanese" is no help to someone who
only reads 日本語.

The locale is expected as the first path segment, which is the convention
every static docs host uses. A path without one gets it prefixed rather than
rewritten.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `locales` | `{ value, label?, href? }[]` | `[]` | **property** — the options |
| `value` | string | — | the current locale |
| `is-managed` | boolean | — | the host owns navigation — fire the event, do not navigate |
| `is-hidden` | boolean | — | hide |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `change` | `{ value, route }` | fires before navigation, always |
