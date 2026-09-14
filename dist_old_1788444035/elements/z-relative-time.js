import { c as u, a as d, b as f, j as l, d as m } from "../chunks/define-element-BWC3wEPr.js";
import { u as h } from "../chunks/hooks-D9_x-ckD.js";
const b = u`
	:host {
		display: inline;
		color: inherit;
	}
	:host([is-hidden]) {
		display: none;
	}
`, y = 864e5, N = (e, r) => {
  const t = Date.now() - e;
  if (t < 0) return "just now";
  const n = Math.round(t / 1e3);
  if (n < 45) return "just now";
  const s = Math.round(n / 60);
  if (s < 60) return `${s}m`;
  const a = Math.round(s / 60);
  if (a < 24) return `${a}h`;
  const c = Math.round(a / 24);
  return t < r ? c === 1 ? "Yesterday" : `${c}d` : new Date(e).toLocaleDateString();
}, i = /* @__PURE__ */ new Set();
let o = null;
const p = (e, r) => (i.add(e), o || (o = setInterval(() => {
  i.forEach((t) => t());
}, r)), () => {
  i.delete(e), !i.size && o && (clearInterval(o), o = null);
}), w = (e) => {
  if (typeof e == "number") return e;
  if (typeof e == "string") {
    const r = Number(e);
    return Number.isFinite(r) && e.trim() !== "" ? r : Date.parse(e);
  }
  return NaN;
}, D = d(
  (e) => {
    const [, r] = h(0), t = w(e.datetime), n = !Number.isNaN(t);
    return f(() => p(() => r((s) => s + 1), e.refresh || 6e4), [e.refresh]), /* @__PURE__ */ l("host", { shadowDom: !0, title: n ? new Date(t).toLocaleString() : "", children: n ? N(t, e.threshold || 7 * y) : "" });
  },
  {
    props: {
      datetime: { type: String, reflect: !0 },
      threshold: { type: Number, reflect: !0 },
      refresh: { type: Number, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: b
  }
);
m("z-relative-time", D);
export {
  D as ZRelativeTime
};
