# z-scroll-area

A scroll container with the design system's slim, themed scrollbars instead of
the chunky native ones. Constrain it with `max-height` (or `height`) and let the
default slot overflow. Pure CSS — the styled scrollbar lives inside the shadow
root so it never leaks to the page.

```html
<z-scroll-area max-height="20rem">
  <p>Zest ships as plain custom elements, so every component here works the
  same in React, Vue, Svelte, or no framework at all.</p>
  <p>The scrollbar you see on the right is themed CSS living inside this
  element's shadow root — it never leaks out to style the rest of the page,
  and the page's own scrollbar styling never leaks in here either.</p>
  <p>Keep scrolling to see where the fade, if any, and the bottom edge sit.</p>
  <p>Paragraph four: constrain this element with <code>max-height</code> (or
  <code>height</code>) and let the default slot overflow — that's the whole
  API.</p>
  <p>Paragraph five exists purely to push the content well past 20rem so the
  scrollbar actually has somewhere to go.</p>
  <p>Paragraph six. Almost there.</p>
  <p>Paragraph seven — the last one.</p>
</z-scroll-area>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `max-height` | CSS length | — | viewport max height |
| `height` | CSS length | — | fixed viewport height |
| `direction` | `vertical` `horizontal` | both | which axis scrolls |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — scrollable content.

## Related

[z-scroll](../structure/z-scroll.md) is the fuller-featured variant (axis modes, overscroll,
inset padding, scrollbar visibility).
