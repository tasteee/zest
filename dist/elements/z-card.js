import { c as i, a as n, g as r, j as a, d as s } from "../chunks/define-element-BZUk-KLk.js";
import { s as l } from "../chunks/layout-schema-CPCZ71fv.js";
import { r as d } from "../chunks/box-schema-C_c94p3x.js";
import { o as c } from "../chunks/prop-types-B3Bpi956.js";
const h = i`
	/* A card is a flex column by default; direction="horizontal" lays its
	   children in a row, and gap spaces them on the spacing scale. */
	:host {
		display: flex;
		flex-direction: column;
		gap: var(--z-card-gap, 0);
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

	:host([direction='horizontal']) {
		flex-direction: row;
		align-items: center;
	}

	:host([is-hidden]) {
		display: none;
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
`, g = n(
  (e) => {
    const o = !!e.heading || !!e.description, t = d(e.gap);
    return /* @__PURE__ */ r("host", { shadowDom: !0, style: t ? { "--z-card-gap": t } : {}, children: [
      o && /* @__PURE__ */ r("div", { class: "header", children: [
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
      gap: l,
      direction: { type: c("vertical", "horizontal"), reflect: !0 },
      isReactive: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: h
  }
);
s("z-card", g);
export {
  g as ZCard
};
