import { c as r, a as i, g as t, j as a, d as s } from "../chunks/define-element-BWC3wEPr.js";
const n = r`
	/* A card is a column. If you need a row inside one, slot a wired-row — the card
	   itself no longer switches its own display, which is what is-flex/is-row/
	   is-column used to do. */
	:host {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		transition: border-color 0.05s linear;
		border: 1px solid var(--border);
		color: var(--foreground);
		/* Inert in the flat themes, material in the rest. A card rests on the
		   page rather than floating above it, so it takes the flush stack. */
		background: var(--material-surface);
		box-shadow: var(--elevation-flush);
	}

	:host([is-reactive]:hover),
	:host([is-reactive]:focus-within) {
		border-color: color-mix(in oklch, var(--foreground) 50%, transparent);
	}

	/* Same title treatment as z-dialog, z-sheet, and z-drawer, from the same
	   tokens: every surface that can carry a title should title itself the same
	   way, and that consistency is the whole reason this lives in the component
	   instead of being retyped as a z-heading in every card. */
	.header {
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);
		/* Unconditional, because knowing whether anything was slotted below
		   would mean observing the slot — too much machinery for a card whose
		   header is nearly always followed by content. A heading-only card just
		   reads as slightly deeper bottom padding. */
		margin-bottom: var(--space-md);
	}

	.title {
		margin: 0;
		font-size: var(--font-size-h4);
		font-weight: 600;
		line-height: var(--line-height-h4);
		color: var(--foreground);
	}

	.description {
		margin: 0;
		color: var(--muted-foreground);
		font-size: var(--font-size-small);
		line-height: var(--line-height-body);
	}
`, d = i(
  (e) => {
    const o = !!e.heading || !!e.description;
    return /* @__PURE__ */ t("host", { shadowDom: !0, children: [
      o && /* @__PURE__ */ t("div", { class: "header", children: [
        e.heading && /* @__PURE__ */ a("h3", { class: "title", children: e.heading }),
        e.description && /* @__PURE__ */ a("p", { class: "description", children: e.description })
      ] }),
      /* @__PURE__ */ a("slot", {})
    ] });
  },
  {
    props: {
      heading: String,
      description: String,
      isReactive: { type: Boolean, reflect: !0 }
    },
    styles: n
  }
);
s("z-card", d);
export {
  d as ZCard
};
