import { c as o, a as s, g as t, j as r, d as l } from "../chunks/define-element-BWC3wEPr.js";
const a = o`
	:host {
		display: block;
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	:host([is-plain]) {
		background: transparent;
		border: none;
		border-radius: 0;
	}

	:host([is-hidden]) {
		display: none;
	}

	.label {
		display: block;
		padding: 0.875rem 1rem 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		font-weight: 500;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--muted-foreground);
	}

	/* Hairline dividers between rows. ::slotted() only accepts a compound
	   selector (no sibling combinators), so draw a top border on every row but
	   the first. The label lives in the shadow DOM, so :first-child here is the
	   first slotted light-DOM row. */
	::slotted(z-list-row:not(:first-child)) {
		border-top: 1px solid var(--border);
	}
`, i = s(
  (e) => /* @__PURE__ */ t("host", { shadowDom: !0, children: [
    e.label && /* @__PURE__ */ r("span", { class: "label", children: e.label }),
    /* @__PURE__ */ r("slot", {})
  ] }),
  {
    props: {
      label: String,
      isPlain: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: a
  }
);
l("z-list", i);
export {
  i as ZList
};
