// @ts-self-types="./z-dock.d.ts"
import { c as S, a as M, f as u, j as m, d as E } from "../chunks/define-element-BZUk-KLk.js";
import { s as w, c as L } from "../chunks/layout-schema-CdiVYtzv.js";
const P = S`
	:host {
		display: inline-flex;
		--dock-item-size: 3rem;
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([is-floating]) {
		position: fixed;
		bottom: 1.25rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: var(--z-overlay);
	}

	.dock {
		display: flex;
		align-items: flex-end;
		gap: var(--dock-gap, 0.75rem);
		box-sizing: border-box;
		padding: var(--space-2-5);
		border-radius: var(--radius-xl);
		/* Mixes the flat ramp colour rather than --surface-overlay: in the light theme
		   --surface-overlay carries a haze layer in front of its colour, which is a
		   background shorthand value, not something color-mix can take. */
		background: color-mix(in oklch, var(--surface-default) 85%, transparent);
		border: 1px solid var(--border-default);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}
`, R = M(
  (o) => {
    const n = u(), i = u(), p = (s) => {
      const r = n.current;
      if (!r) return;
      const l = typeof o.magnification == "number" ? o.magnification : 1.08, b = Math.min(Math.max(l, 1), 1.12), k = typeof o.distance == "number" ? o.distance : 96, a = r.assignedElements(), v = a.map((t) => {
        const e = t.getBoundingClientRect(), f = e.left + e.width / 2, d = Math.max(0, 1 - Math.abs(s - f) / k);
        return 1 + (b - 1) * d;
      });
      a.forEach((t, e) => {
        const f = [
          e > 0 ? t.offsetLeft - (a[e - 1].offsetLeft + a[e - 1].offsetWidth) : 1 / 0,
          e < a.length - 1 ? a[e + 1].offsetLeft - (t.offsetLeft + t.offsetWidth) : 1 / 0
        ], d = Math.max(0, Math.min(...f)), x = t.offsetWidth > 0 ? 1 + d / t.offsetWidth : 1, z = Math.min(v[e], x);
        t.style.setProperty("--dock-scale", z.toFixed(3));
      });
    }, g = () => {
      const s = n.current;
      if (!s) return;
      s.assignedElements().forEach((l) => l.style.setProperty("--dock-scale", "1"));
    }, y = (s) => {
      const r = s.clientX;
      i.current || (i.current = requestAnimationFrame(() => {
        p(r), i.current = void 0;
      }));
    }, c = {};
    o.itemSize && (c["--dock-item-size"] = o.itemSize);
    const h = L(o.gap);
    return h && (c["--dock-gap"] = h), /* @__PURE__ */ m("host", { shadowDom: !0, style: c, onpointermove: y, onpointerleave: g, children: /* @__PURE__ */ m("div", { class: "dock", children: /* @__PURE__ */ m("slot", { ref: n }) }) });
  },
  {
    props: {
      magnification: Number,
      distance: Number,
      itemSize: String,
      gap: w,
      isFloating: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: P
  }
);
E("z-dock", R);
export {
  R as ZDock
};
