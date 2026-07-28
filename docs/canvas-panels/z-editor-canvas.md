# z-editor-canvas

An infinite, pannable/zoomable/pinchable surface. Content lives in **canvas
space**; a single `translate() scale()` transform on an inner viewport maps it
to **screen space**. Every gesture (wheel-zoom-to-cursor, drag-pan, two-pointer
pinch) and every imperative call funnels through one writer, so the viewport
stays consistent and observable. Ships with `z-canvas-item`, declarative
positioning sugar for content dropped into the default slot.

```html
<z-editor-canvas grid="dots">
  <z-canvas-item x="120" y="80">
    <div>A node</div>
  </z-canvas-item>
  <div slot="overlay">
    <!-- fixed HUD: zoom controls, minimap, etc. -->
  </div>
</z-editor-canvas>
```

```js
const canvas = document.querySelector('z-editor-canvas')
canvas.fit(24)                          // fit all canvas-space children
canvas.zoomTo(1.5, { x: 400, y: 300 })   // zoom, keeping a client point fixed
canvas.screenToCanvas({ x, y })
canvas.addEventListener('viewportchange', (e) => e.detail) // { x, y, zoom }
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `zoom` | number | `1` | current scale (reflected, two-way) |
| `pan-x` / `pan-y` | number | `0` | translation in screen px (reflected, two-way) |
| `min-zoom` / `max-zoom` | number | `0.1` / `8` | zoom clamp |
| `zoom-speed` | number | `1` | wheel sensitivity multiplier |
| `grid` | `none` `dots` `lines` | — | background grid style |
| `grid-size` | number | `24` | canvas-space px between grid lines |
| `snap` | number | `0` | grid snap step — declared, not yet wired up (see [questionable API choices](../questionable-api-choices.md)) |
| `pan-button` | `auto` `middle` `space` `left` | `auto` | which pointer button pans (middle always pans; Space-held always pans) |
| `wheel` | `zoom` `pan` | `zoom` | plain-wheel behavior (Ctrl/pinch always zooms) |
| `is-disabled` | boolean | — | freeze all interaction |

## Imperative API

- `zoomTo(scale, centerClient?)` / `zoomBy(factor, centerClient?)`
- `panTo(x, y)` / `panBy(dx, dy)`
- `fit(padding = 24)` — fit all default-slot children into view
- `fitTo(rectOrElement, padding = 24)`
- `reset()` — zoom 1, pan 0
- `screenToCanvas(point)` / `canvasToScreen(point)`
- `getViewport()` → `{ x, y, zoom }`

## Slots

- _(default)_ — canvas-space content, transformed with the viewport.
- `overlay` — screen-space content, fixed (zoom controls, minimap, HUD).

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `viewportchange` | `{ x, y, zoom }` | any pan or zoom |
| `zoomchange` | `{ zoom }` | zoom changed |
| `panchange` | `{ x, y }` | pan changed |

## z-canvas-item

Absolutely positions its slotted content at a canvas coordinate. Purely
declarative sugar over positioning in canvas space — has no behavior of its
own.

### Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `x` / `y` | number | `0` | canvas position |
| `width` / `height` | number | — | optional size in canvas px |
| `rotation` | number | `0` | degrees |

### Slots

- _(default)_ — the positioned content.
