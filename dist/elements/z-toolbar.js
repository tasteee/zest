// @ts-self-types="./z-toolbar.d.ts"
import { c as b, a as p, u as y, b as z, g as x, j as c, d as E } from "../chunks/define-element-BZUk-KLk.js";
import { t as L } from "../chunks/scrollbar-styles-CaLPixBv.js";
import { o as v } from "../chunks/prop-types-CSJu2W-0.js";
import { w as k } from "../chunks/deprecate-DrGNNffe.js";
const O = b`
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
	:host(:not([is-vertical]):not([direction='vertical'])) ::slotted(z-separator[is-vertical]) {
		height: var(--toolbar-divider-height, auto);
		align-self: var(--toolbar-divider-align, stretch);
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
`, A = 'z-button, z-toggle-button, z-toggle-button-group-item, z-tool-button, [role="button"], button, a[href]', D = p(
  (i) => {
    k({ tag: "z-toolbar", attribute: "direction", value: i.direction, flag: "is-vertical", flagValue: "vertical" });
    const h = y(), n = !!i.isVertical || i.direction === "vertical", g = n ? "vertical" : "horizontal";
    return z(() => {
      const r = h.current, a = () => [...r.querySelectorAll(A)], l = (t = 0) => a().forEach((e, o) => e.tabIndex = o === t ? 0 : -1), f = (t) => {
        const e = a();
        if (!e.length) return;
        const o = e.indexOf(t.target);
        if (o < 0) return;
        const w = n ? "ArrowDown" : "ArrowRight", m = n ? "ArrowUp" : "ArrowLeft";
        let s = o;
        if (t.key === w) s = (o + 1) % e.length;
        else if (t.key === m) s = (o - 1 + e.length) % e.length;
        else if (t.key === "Home") s = 0;
        else if (t.key === "End") s = e.length - 1;
        else return;
        t.preventDefault(), l(s), e[s].focus();
      }, d = (t) => {
        const o = a().indexOf(t.target);
        o >= 0 && l(o);
      };
      l(), r.addEventListener("keydown", f), r.addEventListener("focusin", d);
      const u = new MutationObserver(() => l());
      return u.observe(r, { childList: !0, subtree: !0 }), () => {
        r.removeEventListener("keydown", f), r.removeEventListener("focusin", d), u.disconnect();
      };
    }, [n, i.overflow]), /* @__PURE__ */ x("host", { shadowDom: !0, role: "toolbar", "aria-orientation": g, children: [
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
