// @ts-self-types="./z-card.d.ts"
import { c as o, a as n, g as r, j as t, d as s } from "../chunks/define-element-BZUk-KLk.js";
import { s as l } from "../chunks/layout-schema-CdiVYtzv.js";
import { r as d } from "../chunks/box-schema-sGPchxzt.js";
import { o as c } from "../chunks/prop-types-B3Bpi956.js";
const h = o`
	/* A card is a flex column by default; direction="horizontal" lays its
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
`, g = n(
  (e) => {
    const i = !!e.heading || !!e.description, a = d(e.gap);
    return /* @__PURE__ */ r("host", { shadowDom: !0, style: a ? { "--z-card-gap": a } : {}, children: [
      i && /* @__PURE__ */ r("div", { class: "header", children: [
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
