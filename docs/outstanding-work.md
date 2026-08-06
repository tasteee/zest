# Outstanding work

Where the library stands and what is left, in roughly the order it should be
tackled.

**184 tags across 172 component files. 173 markdown reference pages, 66
authored `ComponentDocT` pages.** Typecheck, build, and the attribute↔prop
cross-check are clean.

---

## Done

### API modernization — `docs/api-modernization.md`

Landed across six commits, `eca7bb2`…`4986cfb`.

`tone` became `accent` (43 components) or `color` (the nine tags whose whole
output is text). Boolean props went 370 → 318, and **none are left without an
interrogative prefix**. Mutually exclusive flag clusters collapsed into enums:
the nine `toggleVariantProps` flags into three, the seven box `display` flags
into nothing at all (the box family is flex, always). One size ladder,
`xs`…`xxl`. `direction` replaced five different spellings of the same axis.

Three dead props were found and deleted — `z-dialog`, `z-drawer` and `z-sheet`
each declared a `tone` they never read.

### The docs-site plan — `docs/docs-site-plan.md`

All five waves. 35 elements planned, 33 built, and the shortfall is the good
kind:

- **`z-theme-toggle` dropped.** `z-theme-switcher` already covers tri-state
  including system, shared module state, persistence, and a compact `icon`
  kind. A second element for one job is how a library ends up with two ways to
  do everything.
- **`z-code-annotation` folded away.** `highlight-lines` / `added-lines` /
  `removed-lines` / `focus-lines` on `z-code-block` carry the whole job.

`site.css` went from 414 lines to 295. `site/src/render/` holds only adapters;
`playground-controls.ts` is gone.

### Tooling added along the way

- `scripts/build-api-reference.mjs` → `docs/element-api-reference.md`, every
  tag as a JSX-shaped signature. Wired into `npm run build`.
- `scripts/check-css-templates.mjs` — a backtick inside a `` css`` `` template
  silently ends it and surfaces as a syntax error dozens of lines away. It
  caught me three times before this existed.
- Fixed a pre-existing bug in `build-cem.mjs`: it could not resolve a props
  object built by a call, so `z-row` and `z-column` shipped with **zero**
  attributes in the published `custom-elements.json`. They now carry 33 each.

---

## Open — decisions

Flagged in `docs/questionable-api-choices.md`. These need a product call, not
wiring.

- [ ] `z-editor-canvas` `snap` — snap panning, zoom levels, or item positions?
- [ ] `z-relative-time` `format` — needs a token syntax (`long`/`short`, or
      strftime-style)
- [ ] `z-sortable` `group` / `animation` — cross-list DnD + FLIP easing; a
      feature, not a fix
- [ ] `z-range`'s children-as-config pattern (`<z-range-handle>` in a slot) vs.
      the array-property pattern every other multi-value component uses
- [ ] `z-text` `weight` — the reference says `300 | 400 | 600 | 700 | 900`, the
      implementation argues explicitly that weight is a *continuous* axis and a
      fixed ladder puts 850 out of reach. One of the two is wrong.

## Open — content

### Upgrade the remaining pages to authored docs

Every component has a markdown page and `registry.ts` falls back to it, so
nothing is undocumented. The gap is the *upgrade*: 66 tags have authored
`ComponentDocT` pages with live examples, a playground and generated API
tables. The rest render markdown.

Cheapest it will ever be, now that Wave 2 landed — `z-playground`,
`z-control-panel` and `z-api-table` do the work each page used to hand-roll.

Converted: buttons-actions, forms, foundation, layout, overlays, and one of
specialized. Still on markdown: chat, data-display, navigation-disclosure,
canvas-panels, text-editor, effects, music, attachments.

### Fourteen tags have no page at all

Mostly sub-elements that postdate the markdown tree, plus the docs primitives
built this session:

`z-canvas-item` · `z-comment-gutter-icon` · `z-comment-mark` ·
`z-comment-thread-panel` · `z-copy-button` · `z-docs-shell` · `z-draggable` ·
`z-drop-indicator` · `z-drop-target` · `z-example` · `z-nav-tree` ·
`z-panel-handle` · `z-step` · `z-table-axis-handle`

### `z-anatomy` is still blocked

`AnatomyPartT` is `{ name, description }`; pinned numbered callouts need
region coordinates. Add the optional fields *before* authoring anatomy
content, or it is a guaranteed second pass.

## Open — polish on shipped primitives

Each is a known gap noted inline in `ROADMAP.md`:

- [ ] `z-resizable-panels` — collapse snapping
- [ ] `z-tree` — drag-reorder
- [ ] `z-virtual-list` — scroll-up anchoring
- [ ] `z-markdown` — block-cache for streaming (re-parses whole content today);
      `z-table` / `z-link` upgrades
- [ ] `z-toolbar` — overflow-to-menu
- [ ] `z-conversation-list` — `z-virtual-list` handoff for huge inboxes
- [ ] `z-message-list` — `z-virtual-list` handoff for huge histories

## Open — the rest of `ROADMAP.md`

- **Foundational:** `z-hotkeys` and `z-lazy` were listed as cross-cutting
  prerequisites for the docs site and turned out not to be needed — `z-toc`
  owns its own scroll-spy and nothing yet needs a shortcut registry. They are
  still worth building for their own sake. `z-minimap` and `z-zoom-controls`
  wait on nothing; `z-editor-canvas` exists but is unfinished.
- **Chat 3a gaps:** `z-scroll-to-latest`, `z-link-preview`, `z-voice-message`,
  `z-video-message`, `z-mention-pill`, `z-pinned-banner`,
  `z-conversation-details`, `z-member-list`, `z-composer-context-bar`
- **Chat 3b gaps:** `z-artifact`, retry/👍👎 on `z-message-actions`,
  `z-token-counter`, `z-prompt-library`, `z-agent-step`, `z-task-list`
- **Dashboards:** `z-data-grid` and the chart family — the heaviest builds,
  worth doing once the primitives they lean on are stable
- **Blog and Editors:** essentially unstarted

---

## Suggested order

The page upgrades are the highest-value work left: the library is now well
ahead of its own documentation, and every authored page is cheaper than it has
ever been. Chat is the biggest single block and the one with the least
coverage.

The polish TODOs are second — they are all real gaps in elements people are
already using, and each is small.
