# z-image-message

One or more images sent in a message. A single image renders full-width
(capped); multiple images become an album grid, with a "+N" overlay when
there are more than four.

```html
<z-image-message src="/photos/photo.svg" alt="Sunset"></z-image-message>
```

```js
const message = document.querySelector('z-image-message')
message.images = [{ src: '/photos/a.svg' }, { src: '/photos/b.svg' }, { src: '/photos/c.svg' }]
message.addEventListener('open', (e) => e.detail) // { index, src } — wire to a lightbox
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `src` | URL | — | single-image shorthand (alternative to the `images` property) |
| `alt` | string | — | alt text for the single-image shorthand |
| `is-hidden` | boolean | — | hide |

## Properties

- `images` — `{ src, alt? }[]` — takes priority over `src`/`alt` when set

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `open` | `{ index, src }` | an image was clicked (wire this to a lightbox) |
