// @ts-self-types="./z-toolbar.d.ts"
import { c as p, a as b, u as y, b as x, g as z, j as c, d as E } from "../chunks/define-element-BZUk-KLk.js";
import { t as L } from "../chunks/scrollbar-styles-CaLPixBv.js";
import { o as v } from "../chunks/prop-types-CSJu2W-0.js";
import { w as k } from "../chunks/deprecate-DrGNNffe.js";
const O = p`
	:host {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		min-width: 0;
	}
	:host([is-vertical]),
	:host([direction='vertical']) {
		flex-direction: column;
		align-items: stretch;
	}
	:host([size='sm']) {
		gap: var(--space-1);
	}
	:host([size='lg']) {
		gap: var(--space-3);
	}
	:host([overflow='scroll']) {
		overflow: auto;
		scrollbar-width: none;
	}
	:host([overflow='scroll'])::-webkit-scrollbar {
		display: none;
	}
	:host([overflow='wrap']) {
		flex-wrap: wrap;
	}
	:host([is-disabled]) {
		opacity: 0.5;
		pointer-events: none;
	}
	.overflow {
		margin-inline-start: auto;
	}
`, A = 'z-button, z-toggle-button, z-toggle-button-group-item, z-tool-button, [role="button"], button, a[href]', D = b(
  (n) => {
    k({ tag: "z-toolbar", attribute: "direction", value: n.direction, flag: "is-vertical", flagValue: "vertical" });
    const h = y(), i = !!n.isVertical || n.direction === "vertical", g = i ? "vertical" : "horizontal";
    return x(() => {
      const r = h.current, a = () => [...r.querySelectorAll(A)], l = (e = 0) => a().forEach((t, o) => t.tabIndex = o === e ? 0 : -1), f = (e) => {
        const t = a();
        if (!t.length) return;
        const o = t.indexOf(e.target);
        if (o < 0) return;
        const w = i ? "ArrowDown" : "ArrowRight", m = i ? "ArrowUp" : "ArrowLeft";
        let s = o;
        if (e.key === w) s = (o + 1) % t.length;
        else if (e.key === m) s = (o - 1 + t.length) % t.length;
        else if (e.key === "Home") s = 0;
        else if (e.key === "End") s = t.length - 1;
        else return;
        e.preventDefault(), l(s), t[s].focus();
      }, u = (e) => {
        const o = a().indexOf(e.target);
        o >= 0 && l(o);
      };
      l(), r.addEventListener("keydown", f), r.addEventListener("focusin", u);
      const d = new MutationObserver(() => l());
      return d.observe(r, { childList: !0, subtree: !0 }), () => {
        r.removeEventListener("keydown", f), r.removeEventListener("focusin", u), d.disconnect();
      };
    }, [i, n.overflow]), /* @__PURE__ */ z("host", { shadowDom: !0, role: "toolbar", "aria-orientation": g, children: [
      /* @__PURE__ */ c("slot", {}),
      /* @__PURE__ */ c("div", { class: "overflow", children: /* @__PURE__ */ c("slot", { name: "overflow" }) })
    ] });
  },
  {
    props: {
      size: { type: v("sm", "md", "lg"), reflect: !0 },
      isVertical: { type: Boolean, reflect: !0 },
      /** @deprecated use is-vertical */
      direction: { type: v("horizontal", "vertical"), reflect: !0 },
      overflow: { type: String, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 }
    },
    styles: [L, O]
  }
);
E("z-toolbar", D);
export {
  D as ZToolbar
};
