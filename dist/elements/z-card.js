// @ts-self-types="./z-card.d.ts"
import { c as o, a as n, g as i, j as t, d as s } from "../chunks/define-element-BZUk-KLk.js";
import { s as l } from "../chunks/layout-schema-CdiVYtzv.js";
import { r as d } from "../chunks/box-schema-B_f-L5m1.js";
import { o as c } from "../chunks/prop-types-CSJu2W-0.js";
import { w as h } from "../chunks/deprecate-DrGNNffe.js";
const g = o`
	/* A card is a flex column by default; is-horizontal lays its
	   children in a row, and gap spaces them on the spacing scale. */
	:host {
		display: flex;
		flex-direction: column;
		gap: var(--z-card-gap, 0);
		box-sizing: border-box;
		border-radius: var(--radius-lg);
		padding: var(--space-6);
		transition: border-color var(--motion-instant) linear;
		border: 1px solid var(--border-default);
		color: var(--text-primary);
		background: transparent;
	}

	:host([is-horizontal]),
	:host([direction='horizontal']) {
		flex-direction: row;
		align-items: center;
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([is-reactive]:hover),
	:host([is-reactive]:focus-within) {
		border-color: color-mix(in oklch, var(--text-primary) 50%, transparent);
	}

	/* Same title treatment as z-dialog, z-sheet, and z-drawer, from the same
	   tokens: every surface that can carry a title should title itself the same
	   way, and that consistency is the whole reason this lives in the component
	   instead of being retyped as a z-heading in every card. */
	.header {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		/* Unconditional, because knowing whether anything was slotted below
		   would mean observing the slot — too much machinery for a card whose
		   header is nearly always followed by content. A heading-only card just
		   reads as slightly deeper bottom padding. */
		margin-bottom: var(--space-3);
	}

	.title {
		margin: 0;
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		line-height: var(--line-height-snug);
		color: var(--text-primary);
	}

	.description {
		margin: 0;
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-normal);
	}
`, m = n(
  (e) => {
    h({ tag: "z-card", attribute: "direction", value: e.direction, flag: "is-horizontal", flagValue: "horizontal" });
    const r = !!e.heading || !!e.description, a = d(e.gap);
    return /* @__PURE__ */ i("host", { shadowDom: !0, style: a ? { "--z-card-gap": a } : {}, children: [
      r && /* @__PURE__ */ i("div", { class: "header", children: [
        e.heading && /* @__PURE__ */ t("h3", { class: "title", children: e.heading }),
        e.description && /* @__PURE__ */ t("p", { class: "description", children: e.description })
      ] }),
      /* @__PURE__ */ t("slot", {})
    ] });
  },
  {
    props: {
      heading: String,
      description: String,
      gap: l,
      isHorizontal: { type: Boolean, reflect: !0 },
      /** @deprecated use is-horizontal */
      direction: { type: c("vertical", "horizontal"), reflect: !0 },
      isReactive: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: g
  }
);
s("z-card", m);
export {
  m as ZCard
};
