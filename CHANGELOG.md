# Changelog

All notable changes to `@tasteee/zest`. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow
[Semantic Versioning](https://semver.org/). A breaking change needs a major
version and a prior deprecation. See `SUPPORT.md`.

## [Unreleased]

### Added

- `z-fieldset`: a titled group of controls with a group description and
  error. `is-disabled` disables every control inside, as a native
  fieldset does, and restores only what it disabled.
- `z-checkbox-group`: many-of-many selection over z-checkbox children.
  `value` is a `string[]`; `min`, `max` and `is-required` validate;
  `has-select-all` adds a parent with a mixed state.
- A chip family that shares one chip: `z-chip` (a toggle, optionally
  removable), `z-chip-group` (single or `is-multiple` choice, `value`
  is a `string[]`) and `z-tag-input` (typed entries become chips;
  delimiter, paste, suggestions, `max`, keyboard editing).
- `z-rating`: stars, hearts or dots; half steps, `can-clear`, and a
  read-only display that renders fractions.
- `z-meter`: a level in a range, coloured by `low`, `high` and
  `optimum` as the native meter is; `segments` for cell bars.
- `z-stepper` and `z-step`: progress through an ordered flow,
  horizontal or vertical, with `is-navigable` back-steps.
- `z-timeline` and `z-timeline-item`: events down a rail, with icon
  markers and pending items.
- `z-image`: reserved ratio box, loading shimmer, fade-in, captions
  and a fallback slot.
- `z-image-cropper`: pan, zoom and pinch under a fixed frame, rect or
  circle, with `getCrop()`, `toCanvas()`, `toBlob()`, `toDataURL()`.
- `listOf<T>()` for typed array props, so `value` reaches the manifest
  and the React typings as `string[]` instead of `unknown`.
- `z-checkbox` reads `--z-checkbox-group-accent`, so a group's tone
  reaches its boxes.

- `z-calendar`, a month grid for picking one day or, with `is-range`, a
  range of days, and `z-date-input`, a typed date field (or range) with an
  optional calendar. Values are ISO dates; a range is an ISO interval.
- Boolean orientation flags. `is-vertical` on `z-box`, `z-toolbar`,
  `z-toggle-button-group` and `z-marquee`; `is-horizontal` on `z-card`,
  `z-radio-group` and `z-sortable`. Each names the non-default layout.
- Short color ramps: `--neutral-0…9`, and `--primary`, `--secondary`,
  `--tertiary`, `--success`, `--warning` and `--danger` `-0…9`.
- Color formats in `z-color-picker`: hex, rgb, hsl, hsb, hwb, oklch,
  oklab, lch, lab and display-p3. A format menu sits in the value field;
  switching converts the value and swaps the 2D area (HSB, HSL,
  chroma × lightness, or the a × b plane). Per-format channel fields,
  a copy button, `has-alpha`, `has-eyedropper`, `formats`,
  `is-channels-hidden`, `is-copy-hidden`, and `input` / `formatchange`
  / `copy` events.
- `z-color-panel`: the picker body without a trigger, for inline use.
- `z-color-swatch`: a read-only color chip with its value.
- `z-color-picker` takes any focusable element in `slot="trigger"` and
  publishes `--z-color-value` on its host.

### Changed

- `z-color-picker` swatches are opt-in; none show by default. `change`
  now fires when a drag ends; `input` fires on every move.

### Deprecated

- `presets` on `z-color-picker`. Use `swatches`.
- `direction` on `z-box`, `z-toolbar`, `z-toggle-button-group`,
  `z-marquee`, `z-card` and `z-radio-group`, and `axis` on `z-sortable`.
  Use the boolean flag above; the default value needs no attribute.
  `direction` stays on `z-scroll-area` and `z-progressive-blur`, which
  take more than two values.
- `--color-neutral-0…9` as a name to read. Themes still set it; read
  `--neutral-0…9`.

## [1.0.0]

The first release. Chrome and Edge 117+.
