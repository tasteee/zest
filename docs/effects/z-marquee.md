# z-marquee

An infinite auto-scrolling row (or column) over slotted content — logo walls,
ticker strips, testimonial loops.

```html
<z-marquee duration="30" pause-on-hover has-fade>
  <img src="/logos/acme.svg" alt="Acme" height="28" />
  <img src="/logos/globex.svg" alt="Globex" height="28" />
  <img src="/logos/initech.svg" alt="Initech" height="28" />
  <img src="/logos/umbrella.svg" alt="Umbrella" height="28" />
  <img src="/logos/hooli.svg" alt="Hooli" height="28" />
</z-marquee>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `duration` | number (seconds) | `40` | time for one full loop |
| `gap` | size token / length | `var(--spacing-6)` | gap between items (and between the loop seam) |
| `is-reversed` | boolean | — | reverse scroll direction |
| `direction` | `horizontal` `vertical` | `horizontal` | scroll axis |
| `does-pause-on-hover` | boolean | — | pause the scroll on hover/focus-within |
| `has-fade` | boolean | — | fade the edges with a mask gradient |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — the looping content.

## Notes

- Prefer attribute-driven slotted content (plain HTML, or components whose
  state is reflected to attributes). The seamless loop works by cloning the
  slotted markup as a serialized HTML string, so any state set only as a JS
  property (not reflected to an attribute) won't survive into the cloned copy.
- Respects `prefers-reduced-motion` (disables the scroll animation).
