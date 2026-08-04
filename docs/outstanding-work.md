# Outstanding work

Everything open across the library, the docs site, and the API — in the order it
should probably be tackled. Step 1 is `docs/api-modernization.md`, which is a
decision document, not a build task.

---

## Step 0 — unblock

- [x] **Rebuild `dist/`.** Done — `dist/zest.js` is now ahead of every source
      file, so the `sidebar-header` slot, the collapse fix, the drawer fix, and
      the `z-field` label notch are live on the site.
- [x] **Remove the stray `.fuse_hidden*` files.** Three were tracked under
      `docs/data-display/` and `docs/specialized/` — stale FUSE copies of
      `z-avatar.md`, `z-carousel.md`, and `z-post-meta.md` from before the
      `.jpg` → `.svg` asset pass. Deleted.
- [x] **Commit.** Everything since `a97d175 docs updates`.

## Step 1 — API modernization *(done)*

See `docs/api-modernization.md` for the spec. Landed across six commits
(`eca7bb2`…`4986cfb`).

- [x] Decisions marked up
- [x] Source renames applied — boolean props 370 → 318, none left without an
      interrogative prefix
- [x] `site/src/component-docs/` entries updated to match
- [x] The 146 markdown reference pages updated
- [x] Typecheck clean, build clean, attribute↔prop cross-check clean

Three items already flagged in `docs/questionable-api-choices.md` that also need
a product decision, not just wiring:

- [ ] `z-editor-canvas` `snap` — snap panning, zoom levels, or item positions?
- [ ] `z-relative-time` `format` — needs a token syntax (`long`/`short`, or
      strftime-style)
- [ ] `z-sortable` `group` / `animation` — cross-list DnD + FLIP easing; a
      feature, not a fix
- [ ] `z-range`'s children-as-config pattern (`<z-range-handle>` in a slot) vs.
      the array-property pattern every other multi-value component uses

## Step 2 — docs-site Wave 1 (finish the frame)

Shipped: `z-example`, `z-copy-button`, `clipboard`, `z-docs-shell`,
`z-nav-tree`. Remaining:

- [ ] `z-toc` — scroll-spy contents, sources headings from an array or by
      observing a container (`for="#content"`)
- [ ] `z-doc-header` — eyebrow, title, tagline, status badge, meta row.
      Uniform across ~150 pages, so it has to be one element
- [ ] `z-prev-next` — footer pager

Cross-cutting prerequisites that land alongside:

- [ ] `z-hotkeys` — ⌘K, `/`, and the theme toggle all need it; solving it
      locally three times is how conflicting listeners happen
- [ ] `z-lazy` — the component index page is unaffordable without it at ~150
      example-dense pages
- [ ] `z-scroll-spy` — start it as internal machinery inside `z-toc`, promote
      only if a second consumer appears

## Step 3 — docs-site Wave 2 (retire `site/src/render/*`)

The wave that pays for itself: deletes five hand-rolled files and roughly half of
`site.css` (414 lines today).

- [ ] `z-playground` + `z-control-panel` — replaces `render/playground.ts` and
      `render/playground-controls.ts`. Keeping attribute serialization inside
      `z-playground` is the point: the snippet can't drift from the instance
- [ ] `z-api-table` — replaces `render/api-reference.ts`
- [ ] `z-type-badge` · `z-api-signature`
- [ ] `z-anatomy` — **blocked**: `AnatomyPartT` is `{ name, description }` and
      pinned callouts need region coordinates. Add the optional fields before
      authoring any anatomy content or it's a guaranteed second pass

## Step 4 — upgrade 80 pages from markdown to rich docs

Correcting an earlier misread: **every component already has a documentation
page.** `docs/` holds 146 markdown files, one per component, and
`registry.ts` falls back to the markdown whenever a tag isn't listed — so no
component is undocumented.

The real gap is the *upgrade*. 66 components have been converted to authored
`ComponentDocT` pages in `site/src/component-docs/`, which is what buys live
examples that own real DOM, a playground, and generated API tables. 80 are
still rendering their markdown fallback.

Converted: buttons-actions (12), forms (16), foundation (13), layout (13),
overlays (11), specialized (1).

Four components have neither — they postdate the markdown tree and need a page
of some kind: **`z-copy-button`, `z-docs-shell`, `z-example`, `z-nav-tree`**.

Still on the markdown fallback, by category:

- [ ] **chat** (~25) — z-chat-shell, z-chat-header, z-conversation-list,
      z-conversation-item, z-message-list, z-message-group, z-message-bubble,
      z-message-actions, z-composer, z-quoted-message, z-reactions,
      z-read-receipt, z-delivery-status, z-typing-indicator, z-system-message,
      z-date-divider, z-unread-divider, z-image-message, z-file-attachment,
      z-attachment-tray, z-attachment-chip, z-emoji-picker, z-mention-popover,
      z-model-picker, z-suggestion-chips, z-streaming-text, z-thinking,
      z-tool-call, z-citation, z-sources, z-send-button
- [ ] **data-display** — z-table, z-table-toolbar, z-list, z-list-row, z-chart,
      z-stat, z-progress, z-skeleton, z-empty-state, z-pagination, z-badge,
      z-avatar, z-avatar-stack, z-carousel, z-post-meta, z-relative-time,
      z-status-dot, z-virtual-list
- [ ] **navigation-disclosure** — z-nav-menu, z-nav-tree, z-menu,
      z-context-menu, z-breadcrumbs, z-tabs, z-accordion, z-collapsible,
      z-sidebar, z-status-bar
- [ ] **canvas-panels** — z-editor-canvas, z-resizable-panels, z-panel,
      z-gutter-handle, z-scroll-area, z-docs-shell, z-example
- [ ] **text-editor** — z-markdown, z-code-block, z-copy-button,
      z-bubble-menu, z-slash-menu, z-format-toolbar, z-selection-toolbar,
      z-comment-thread
- [ ] **effects** — z-aura, z-marquee, z-pointer-follow, z-progressive-blur,
      z-dock
- [ ] **music** — z-piano-roll, z-pattern-roll, z-knob
- [ ] **interaction** — z-drag-drop, z-drag-handle, z-sortable, z-dropzone,
      z-tree, z-menu

The markdown source lives in `docs/<category>/<tag>.md`; the authored pages live
in `site/src/component-docs/<category>/<tag>.ts`. Converting means writing the
latter and listing it in `registry.ts` — the markdown stays as the prose source.

Four markdown pages have no component of their own — `z-heading`, `z-subheading`,
`z-label`, `z-inline` — because they are additional tags exported from
`z-text.tsx`. Expected, not a gap.

## Step 5 — polish TODOs on shipped primitives

Each is a known gap noted inline in `ROADMAP.md`:

- [ ] `z-resizable-panels` — collapse snapping
- [ ] `z-tree` — drag-reorder
- [ ] `z-virtual-list` — scroll-up anchoring
- [ ] `z-markdown` — block-cache for streaming (re-parses whole content today);
      `z-table` / `z-link` upgrades
- [ ] `z-toolbar` — overflow-to-menu
- [ ] `z-conversation-list` — `z-virtual-list` handoff for huge inboxes
- [ ] `z-message-list` — `z-virtual-list` handoff for huge histories

## Step 6 — docs-site Waves 3–5

Independently shippable; interleave with content work.

**Wave 3 — content blocks:** `z-steps`, `z-code-group`, `z-code-annotation`
(mostly attributes on `z-code-block`: `highlight-lines`, `added-lines`,
`focus-lines`), `z-diff`, `z-file-tree`, `z-token-table` + `z-swatch`,
`z-do-dont`, `z-mermaid` (lazy-loaded so the zero-runtime-dependency guarantee
survives).

`z-token-table` / `z-swatch` deserve priority — for a library whose whole
premise is `base.css` tokens, having no token documentation is the biggest
single gap in the docs.

**Wave 4 — discovery and page furniture:** `z-search-dialog`, `z-theme-toggle`,
`z-external-link`, `z-last-updated`, `z-edit-on-github`, `z-was-this-helpful`,
`z-reading-progress`, `z-announcement-bar`, `z-version-picker`,
`z-language-switcher`.

**Wave 5 — live code:** `z-live-code`, `z-sandbox`. Deliberately last; the
sandbox has to inherit whatever the theme story settles into.

## Step 7 — the rest of ROADMAP.md

Untouched domains, in rough value order:

- **Foundational:** `z-editor-canvas` ⭐ (the one starred primitive still
  unbuilt — it gates artifacts, node editors, minimap, and zoom controls),
  `z-minimap`, `z-zoom-controls`, `z-resize-observer`
- **Chat 3a gaps:** `z-scroll-to-latest`, `z-link-preview`, `z-voice-message`,
  `z-video-message`, `z-mention-pill`, `z-pinned-banner`,
  `z-conversation-details`, `z-member-list`, `z-composer-context-bar`
- **Chat 3b gaps:** `z-artifact`, `z-diff`, retry/👍👎 on `z-message-actions`,
  `z-token-counter`, `z-prompt-library`, `z-agent-step`, `z-task-list`
- **Dashboards:** `z-data-grid` and the chart family — the heaviest builds,
  worth doing once the primitives stabilize
- **Blog and Editors:** essentially unstarted

---

## Suggested order

Steps 0 and 1 first, and they're cheap — a build, a commit, and your decisions
on the audit. Everything downstream compounds off the API vocabulary, and Step 4
is 80 pages of content that would have to be rewritten if it's authored against
the old attribute names.

After that, Steps 2 and 3 before Step 4, for the same reason the docs-site plan
gives: content authored against `site/src/render/*` gets rewritten when those
files are deleted.
