import { c as r, a, j as l, g as s, d as i } from "../chunks/define-element-BZUk-KLk.js";
import { o as t } from "../chunks/prop-types-B3Bpi956.js";
const c = r`
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
		text-align: end;
	}
`, o = (e) => e.align === "center" ? "is-center" : e.align === "end" ? "is-end" : "", d = a(
  (e) => {
    const n = ["stat", o(e)].filter(Boolean).join(" ");
    return /* @__PURE__ */ l("host", { shadowDom: !0, children: /* @__PURE__ */ s("div", { class: n, children: [
      /* @__PURE__ */ s("z-heading", { size: e.size || "xs", tag: "span", color: e.color || void 0, children: [
        e.value,
        /* @__PURE__ */ l("slot", {})
      ] }),
      /* @__PURE__ */ s("z-text", { size: e.labelSize || "sm", color: "muted", children: [
        e.label,
        /* @__PURE__ */ l("slot", { name: "label" })
      ] })
    ] }) });
  },
  {
    props: {
      value: { type: String, reflect: !0 },
      label: { type: String, reflect: !0 },
      size: { type: t("xs", "sm", "md", "lg", "xl", "xxl"), reflect: !0 },
      labelSize: { type: t("xs", "sm", "md", "lg", "xl", "xxl"), reflect: !0 },
      color: { type: t("primary", "secondary", "tertiary", "success", "warning", "danger", "muted", "strong"), reflect: !0 },
      align: { type: t("start", "center", "end"), reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: c
  }
);
i("z-stat", d);
export {
  d as ZStat
};
