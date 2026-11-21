# Slot proposal: conformance review

**Reviews:** [`slots.md`](./slots.md) against
[`../architecture.md`](../architecture.md) (Rules 1–21).
**Verdict:** the proposal fits the architecture. "Add around, never replace
inside", "the component owns state", and "do not reach into the shadow DOM"
already match Rules 6, 13–16. It needs **10 changes** before it can be
approved. Three of them are real conflicts (C1, C2, C3). The rest tighten
wording or list work the proposal implies.

When the proposal is approved with these changes, record the vocabulary and
the hard rules in `architecture.md` as new numbered rules (§10 process).
Until then they are not rules.

---

## Required changes

| # | Proposal says | Conflicts with | Change |
|---|---------------|----------------|--------|
| C1 | `below` on `z-field` holds "hints, errors, character counts". | **Rule 18.** The field holds no error text; it shows the control's `validationMessage`. Errors in a slot would be a second error source. | `below` never holds errors. The field's error area is separate and fed only by the control. |
| C2 | `below` is a new slot beside the field's existing `description` slot. | **Rule 1.** Two places for the field's help text. | `below` **replaces** the `description` slot. The `description` prop stays as a plain-text shorthand that `below` overrides (the same prop-plus-slot pattern as intrinsic labels, Rule 17). Content in `below` is the control's accessible description, so it should be text, not interactive. |
| C3 | `z-slider` `start`, `center`, `value`: "Done, already shipped." | **Rules 2, 13.** The slider's header is a field label row. With `z-field` owning `start` / `center` / `end` in its label row, the slider would duplicate it. Audit F11–F12. | Remove `start` and `center` from `z-slider`. Keep `value` (Rule 16: the slider owns its value presentation), rendered at the inline end of the slider's **own track row**. A readout in the label row is the field's `end` slot. |
| C4 | Hard rule 6: slotted content "may read state but cannot change it". | **Rule 15** allows interactive content to call public APIs. The proposal's own clear-button case needs to change the value. | "Slotted content changes component state only through the component's public API, never private state." |
| C5 | Hard rule 7: disabled makes slotted content inert with `pointer-events: none`. | **Rule 8:** field content must not become disabled because the control is. Also, `pointer-events` alone leaves slotted buttons reachable by keyboard and screen readers. | Applies only to slots **inside a control's border**, never to `z-field` slots. Inert means pointer, keyboard, and assistive tech. Verify that `inert` on the slot wrapper covers slotted content in Chromium, and test it. |
| C6 | `z-field` label row gets `start`, `center`, `end` beside the label. | **Rules 4, 9, 15.** Content next to a label must not join the accessible name or trigger label activation. | The label element holds only the label text. Label-row slots are siblings of it, outside the click target and outside the name. Add a test for each. |
| C7 | Edge case: a field with no label still renders `center` and `end`. | **Rule 3.** With no visible label, the control still needs a name. | Keep the behavior; the control then needs `aria-label`. With `is-label-hidden`, only the label text hides; label-row slots stay visible, since they are field content, not the label. |
| C8 | "Not slot names: `icon`." | Five elements already ship an `icon` slot: `z-alert`, `z-bento-item`, `z-empty-state`, `z-step`, `z-timeline-item`. | These are icon wells (a structural region), not row edges. Keep them, and reword the list to "not **row-edge** slot names". |
| C9 | "Not slot names: `prefix`, `suffix`, `leading`, `trailing`." | Already shipping: `prefix` on `z-input`, `z-tag-input`, `z-badge`, `z-chip`; `suffix` on `z-input`, `z-tag-input`; `leading` / `trailing` on `z-composer` (held back). | Rename to `start` / `end` directly, no shims (§10 process). `z-composer` renames before it ships. |
| C10 | `z-fieldset` is not mentioned. | **Rule 18.** `z-fieldset` has an `error` slot. | Remove it with the field's `error` slot (audit D3). The fieldset keeps its `legend` and `description` slots, which are group-owned. |

---

## Recommendations on the proposal's decisions

| # | Decision | Recommendation | Why |
|---|----------|----------------|-----|
| 1 | The five names | **Approve** `start`, `end`, `center`, `below`, `value`. | They map to real regions (Rule 14), and none overlaps another. |
| 2 | `z-field`: `start`/`end` or `label-start`/`label-end` | **Reuse `start` / `end`.** | A slot belongs to the element it is on (Rule 13). The parent makes it unambiguous: a child of `z-field` goes to the field's row, a child of `z-input` to the input's border. `label-start` breaks the one-vocabulary rule for no gain. |
| 3 | `start` / `end` on controls mean inside the border | **Confirm.** | Outside is layout, and layout belongs to `z-row` (§2, layout primitives). |
| 4 | Disabled makes slotted content inert | **Confirm, with C5.** | Only inside a control's border, and fully inert. |
| 5 | Clicking slotted content does not focus the control | **Confirm.** | Rule 9: an interactive element next to the control keeps its own behavior. |
| 6 | No clear button as a slot pattern | **Confirm.** A future `can-clear` prop on the control. | The control owns its value; clearing it is control behavior, not slotted content. |
| 7 | Rollout order | **Confirm, merged with the V2 phases.** `z-field` slots ship in the `z-field` rewrite (audit phase 2). Control slots ship as each control is aligned. Phase 3 waits for requests. | Building the slots on the old `z-field` would mean doing it twice. |
| 8 | One "Customizing" docs page | **Confirm.** | — |

### "Decide" rows from the edge cases

| Case | Recommendation |
|------|----------------|
| Read-only | Slotted content stays live (agree with the proposal). |
| Focus ring | The ring wraps the whole control on `:focus-within`, so it shows while a slotted button inside has focus. Focus itself moves to that button. |
| Click on slotted content | Does not focus the control (decision 5). |
| Clear button | Not a slot pattern (decision 6). |
| Wide slot content, very long label | Check per component during the build: the text area shrinks first, the label truncates first. |

---

## Once approved: rules to record

Add to `architecture.md` §4 (extension points), and log them in §11:

- **Rule 22 — One slot vocabulary.** Row-edge slots are `start`, `end`,
  `center`, `below`, `value`. Anything else needs a design review and a rule
  change. Structural slots (`trigger`, `footer`, icon wells, ...) are
  separate.
- **Rule 23 — Slot hard rules.** Hard rules 1–12 from the proposal, as
  amended by C4 and C5.

The audit already tracks the code side: C3 is finding F12, C9 is F17, and
C1, C2, C10 follow from decision D3.
