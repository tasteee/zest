import { c as n, a as s, j as t, g as l, d as r } from "../chunks/define-element-BWC3wEPr.js";
const a = n`
	:host {
		display: inline-flex;
	}

	:host([is-hidden]) {
		display: none;
	}

	.stat {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.stat.is-center {
		align-items: center;
		text-align: center;
	}

	.stat.is-end {
		align-items: flex-end;
		text-align: right;
	}
`, c = (e) => e.align === "center" ? "is-center" : e.align === "end" ? "is-end" : "", o = s(
  (e) => {
    const i = ["stat", c(e)].filter(Boolean).join(" ");
    return /* @__PURE__ */ t("host", { shadowDom: !0, children: /* @__PURE__ */ l("div", { class: i, children: [
      /* @__PURE__ */ l("z-heading", { size: e.size || "xs", tag: "span", color: e.color || void 0, children: [
        e.value,
        /* @__PURE__ */ t("slot", {})
      ] }),
      /* @__PURE__ */ l("z-text", { size: e.labelSize || "sm", color: "muted", children: [
        e.label,
        /* @__PURE__ */ t("slot", { name: "label" })
      ] })
    ] }) });
  },
  {
    props: {
      value: { type: String, reflect: !0 },
      label: { type: String, reflect: !0 },
      size: { type: String, reflect: !0 },
      labelSize: { type: String, reflect: !0 },
      color: { type: String, reflect: !0 },
      align: { type: String, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: a
  }
);
r("z-stat", o);
export {
  o as ZStat
};
