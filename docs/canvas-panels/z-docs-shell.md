# z-docs-shell

The three-column documentation frame: nav rail, content column, table of
contents. Composes `z-chassis`.

```html
<z-docs-shell nav-width="17rem" toc-width="13rem" content-width="54rem">
  <z-nav-tree slot="nav"></z-nav-tree>
  <article>…</article>
  <z-toc slot="toc"></z-toc>
</z-docs-shell>
```

It owns the things every docs site re-solves badly: the responsive collapse
(the toc drops out first, then the nav becomes a drawer), the sticky offsets,
and the max content measure.

**The toc column is slot-driven, not a flag.** A page that slots nothing into
`toc` gets a two-column shell, so a splash or a demo page carries no dead
gutter.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `nav-width` | CSS length | `17rem` | width of the nav rail |
| `toc-width` | CSS length | `13rem` | width of the contents column |
| `content-width` | CSS length | `54rem` | max measure of the content column |
| `is-nav-open` | boolean | — | mobile drawer state; two-way |
| `is-hidden` | boolean | — | hide |

## Slots

| Slot | Description |
| --- | --- |
| `banner` | full-width strip above everything |
| `nav-header` | pinned above the scrolling rail — a brand should not scroll away |
| `nav` | the navigation itself |
| `nav-footer` | pinned below the rail |
| `default` | the content column |
| `toc` | the contents column; omit it and the track disappears |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `navClose` | — | the mobile drawer was dismissed |

## Notes

`z-chassis` gained `scrollScreenTo(options)` and `getScreen()` for this: the
screen is the scroll container, and a routed view landing at the top of a new
page has no other way to reach it once the shell owns the frame.
