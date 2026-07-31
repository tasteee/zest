# z-theme-switcher

Switches the page between zest's themes. Two kinds share one piece of state:
`segmented` offers a joined control, `icon` is a single compact button that
flips between light and dark.

```html
<z-theme-switcher></z-theme-switcher>
<z-theme-switcher kind="icon"></z-theme-switcher>
```

By default it offers Light, Dark and System. Name a `themes` list to offer any
other subset — including the material themes described in
[Theming](../theming.md):

```js
switcher.themes = ['light', 'dark', 'console', 'studio', 'system']
```

```js
switcher.addEventListener('change', (e) => {
  e.detail.preference // 'light' | 'dark' | 'system'
  e.detail.theme // 'light' | 'dark' — what is actually painted
})
```

The switcher writes `data-theme` onto `<html>`, which is the attribute every token
block in `ink.css` keys off. Custom properties cross shadow boundaries, so that one
attribute re-themes every `z-*` element on the page. The chosen preference is
persisted to `localStorage`, and `system` keeps tracking the OS after the fact.

## Preventing the flash

Importing the library applies the stored preference immediately, but no module can
run before first paint. Pages that care should set the attribute inline in `<head>`,
before any stylesheet resolves:

```html
<script>
  const stored = localStorage.getItem('zest-theme-preference')
  const isSystem = !stored || stored === 'system'
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches
  const theme = isSystem ? (prefersDark ? 'dark' : 'light') : stored
  document.documentElement.setAttribute('data-theme', theme)
</script>
```

## Precedence

Three sources can decide the theme on load, in this order:

1. A **stored preference** — the reader's own past choice. Always wins.
2. A **`data-theme` already on `<html>`** — set by your markup or the snippet
   above. Adopted as an explicit preference, so a page that declares itself
   light stays light.
3. The **system preference**, which is the default when neither of the above
   applies.

## The transition

Changing theme fades the page out, swaps while nothing is visible, and fades
back in — `0.45s` end to end, half each way.

Almost none of a theme swap can be transitioned in CSS: custom properties don't
interpolate unless registered, and the material themes bring in gradients and
translucent surfaces that can't animate from their flat equivalents at all. So
the change is sequenced rather than blended.

The page colour is the one thing that doesn't fade. `background-color` is
genuinely animatable and doesn't care that its value arrived through `var()`, so
it interpolates on its own across the full duration — the page is already
morphing underneath while the content is out, and has arrived by the time the
content returns.

> **Not the View Transition API.** That's the obvious tool and the wrong one
> here. Its default root animation cross-fades the two snapshots under
> `mix-blend-mode: plus-lighter` — the frames are *added*, not interpolated.
> That's invisible when a few elements move, and violent when the whole page
> changes luminance at once: halfway through a dark-to-light swap the sum blows
> past white and the screen flashes. Sequencing has no overlap, so there's no
> blend to get wrong.

Retime it with a token, or turn it off:

```css
:root {
  --theme-transition-duration: 0.3s;
}
```

Selecting `system` when the system already agrees changes the preference but not
a single pixel, and is committed without animating. A `prefers-reduced-motion`
request swaps instantly.

## Theming a region

`data-theme` is not a document-wide switch. It works on any element, and both
values are defined, so a dark region can sit inside a light page and vice versa:

```html
<div data-theme="light">
  <z-card>Always light, whatever the page is set to.</z-card>
</div>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `kind` | `segmented` `icon` | `segmented` | a joined control, or one compact toggle |
| `themes` | `string[]` (property) | `['light','dark','system']` | which choices to offer, in order |
| `is-icon-only` | boolean | — | drops the text labels from the segmented kind |
| `tone` | `primary` `secondary` | — | accent the selection paints with; neutral when unset |
| _size_ | `is-small` `is-large` | — | density |
| `is-hidden` | boolean | — | hide |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `change` | `{ preference, theme }` | `preference` is what was chosen, `theme` is what that resolves to right now |

## JavaScript API

The same state is exported from the package, so app chrome can read or set the
theme without rendering a switcher. Every mounted switcher updates itself when it
does.

```js
import { getTheme, getThemePreference, setThemePreference, subscribeToTheme, toggleTheme } from '@tasteee/zest'

setThemePreference('light')
toggleTheme()
const stopListening = subscribeToTheme((state) => console.log(state.theme))
```

## Notes

- The segmented kind is a `radiogroup` of `radio` buttons — it reports one choice
  out of three rather than three independent toggles.
- The icon kind has no `system` state to land on. Flipping it from `system`
  commits to the opposite of whatever the system is currently showing, which is
  the only reading of "toggle" that isn't a no-op.
- Any number of switchers can coexist on a page; they read the same module state
  and stay in agreement without being wired to each other.
