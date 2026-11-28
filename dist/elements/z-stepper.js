// @ts-self-types="./z-stepper.d.ts"
import { c as y, a as v, e as b, u as g, b as z, j as m, d as S } from "../chunks/define-element-BZUk-KLk.js";
import { i as x } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as N } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as B } from "../chunks/use-listener-CmAx40Cx.js";
import { o as p } from "../chunks/prop-types-CSJu2W-0.js";
import { u as V } from "../chunks/locale-BNhgEFKA.js";
import "./z-step.js";
const M = y`
	:host {
		display: flex;
		align-items: center;
		width: 100%;
		min-width: 0;
		--z-step-accent: var(--accent-primary);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([is-vertical]) {
		flex-direction: column;
		align-items: stretch;
	}

	:host([tone='secondary']) { --z-step-accent: var(--accent-secondary); }
	:host([tone='tertiary']) { --z-step-accent: var(--accent-tertiary); }
	:host([tone='success']) { --z-step-accent: var(--status-success); }
`, w = (e) => [...e.children].filter((n) => n.localName === "z-step"), E = (e, a) => e < a ? "complete" : e === a ? "current" : "upcoming", L = v(
  (e) => {
    const a = V(), n = g(), [d, f] = N("value"), c = Math.max(0, Math.floor(d ?? 0)), l = () => {
      const r = w(n.current), o = r.length - 1;
      for (const [i, t] of r.entries()) {
        const s = E(i, c), u = s === "complete", h = t.hasAttribute("is-disabled");
        t.state = s, t.index = i + 1, t.isLast = i === o, t.isVertical = !!e.isVertical, t.isNavigable = !!e.isNavigable && u && !h, t.size = e.size;
      }
    };
    return z(l, [c, e.isVertical, e.isNavigable, e.size]), B(n, "select", (r) => {
      const o = r;
      if (!(o.target.localName === "z-step")) return;
      o.stopPropagation();
      const s = o.detail.index - 1;
      e.isNavigable && s < c && (f(s), e.change({ value: s }));
    }), /* @__PURE__ */ m("host", { shadowDom: !0, role: "list", "aria-label": e.label || a("steps"), children: /* @__PURE__ */ m("slot", { onslotchange: l }) });
  },
  {
    props: {
      value: { type: Number, reflect: !0 },
      label: String,
      size: { type: p("sm", "md"), reflect: !0 },
      tone: { type: p("primary", "secondary", "tertiary", "success"), reflect: !0 },
      isVertical: { type: Boolean, reflect: !0 },
      isNavigable: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: b({ bubbles: !0, composed: !0 })
    },
    styles: [M, x]
  }
);
S("z-stepper", L);
export {
  L as ZStepper
};
