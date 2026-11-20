# Changelog

All notable changes to `@tasteee/zest`. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow
[Semantic Versioning](https://semver.org/). A breaking change needs a major
version and a prior deprecation. See `SUPPORT.md`.

## [Unreleased]

### Added

- Boolean orientation flags. `is-vertical` on `z-box`, `z-toolbar`,
  `z-toggle-button-group` and `z-marquee`; `is-horizontal` on `z-card`,
  `z-radio-group` and `z-sortable`. Each names the non-default layout.
- Short color ramps: `--neutral-0…9`, and `--primary`, `--secondary`,
  `--tertiary`, `--success`, `--warning` and `--danger` `-0…9`.

### Deprecated

- `direction` on `z-box`, `z-toolbar`, `z-toggle-button-group`,
  `z-marquee`, `z-card` and `z-radio-group`, and `axis` on `z-sortable`.
  Use the boolean flag above; the default value needs no attribute.
  `direction` stays on `z-scroll-area` and `z-progressive-blur`, which
  take more than two values.
- `--color-neutral-0…9` as a name to read. Themes still set it; read
  `--neutral-0…9`.

## [1.0.0]

The first release. Chrome and Edge 117+.
