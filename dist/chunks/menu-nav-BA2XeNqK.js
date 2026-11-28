import { c as u, j as o, g as p } from "./define-element-BZUk-KLk.js";
import { h as c } from "./child-items-CYeHgkFR.js";
import { r as d } from "./misuse-BkfjLjP6.js";
const v = ["z-menu-item", "z-menu-separator", "z-menu-label"], w = ["shortcut", "is-disabled", "is-danger", "type", "is-checked", "description"], l = ["action", "radio", "checkbox"], h = (e) => l.includes(e) ? e : "action", M = (e) => e.tag === "z-menu-separator" ? { isSeparator: !0 } : e.tag === "z-menu-label" ? { isHeading: !0, label: e.label } : {
  value: e.value,
  label: e.label,
  shortcut: e.attributes.shortcut || void 0,
  description: e.attributes.description || void 0,
  type: h(e.attributes.type),
  isChecked: c(e, "is-checked"),
  isDisabled: c(e, "is-disabled"),
  isDanger: c(e, "is-danger"),
  slot: e.slot
}, S = (e) => e ? !e.isSeparator && !e.isHeading && !e.isDisabled : !1, a = (e) => e.type === "radio" || e.type === "checkbox", R = (e) => e.type === "radio" ? "menuitemradio" : e.type === "checkbox" ? "menuitemcheckbox" : "menuitem", C = (e) => {
  if (a(e))
    return e.isChecked ? "true" : "false";
}, T = (e, s, n) => {
  for (const t of n)
    !!t && !l.includes(t) && d(e, `menu-type-${t}`, `menu item type="${t}" is not one of action, radio, checkbox. It is treated as an action.`);
  s.some((t) => t.isChecked && !a(t)) && d(e, "menu-checked-action", 'menu item has is-checked but its type is not radio or checkbox, so the check is not shown. Set type="radio" or type="checkbox".');
}, z = (e) => {
  const s = [], n = (t) => {
    const i = { type: "rows", heading: t, entries: [] };
    return s.push(i), i;
  };
  let r;
  for (const [t, i] of e.entries()) {
    if (i.isSeparator) {
      s.push({ type: "separator", index: t }), r = void 0;
      continue;
    }
    if (i.isHeading) {
      r = n({ row: i, index: t });
      continue;
    }
    r || (r = n()), r.entries.push({ row: i, index: t });
  }
  return s;
}, I = (e) => `menu-heading-${e}`, m = (e) => `menu-item-description-${e}`, j = (e) => e.some(a), f = /* @__PURE__ */ o("svg", { viewBox: "0 0 16 16", width: "14", height: "14", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true", children: /* @__PURE__ */ o("path", { d: "M3.5 8.5l3 3 6-7" }) }), H = (e, s) => {
  if (!s) return null;
  const n = a(e) && !!e.isChecked;
  return /* @__PURE__ */ o("span", { class: "check", "aria-hidden": "true", children: n ? f : null });
}, U = (e, s) => {
  const n = e.slot ? /* @__PURE__ */ o("slot", { name: e.slot }) : e.label;
  return e.description ? /* @__PURE__ */ p("span", { class: "text", children: [
    /* @__PURE__ */ o("span", { class: "label", children: n }),
    /* @__PURE__ */ o("span", { class: "description", id: m(s), children: e.description })
  ] }) : /* @__PURE__ */ o("span", { class: "label", children: n });
}, _ = u`
	.text {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: var(--space-0-5);
		min-width: 0;
	}

	.text .label {
		flex: none;
	}

	.description {
		color: var(--text-secondary);
		font-size: var(--font-size-xs);
		white-space: normal;
	}

	/* On the highlighted row the tint lowers contrast, so the description
	   takes the row's own text color instead of the secondary one. */
	.item.is-active .description,
	.item:disabled .description,
	.item.is-disabled .description {
		color: inherit;
	}

	.check {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
		color: var(--tone);
	}

	.heading {
		padding: var(--space-2) var(--space-2-5) var(--space-1);
		color: var(--text-secondary);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-medium);
		user-select: none;
	}
`, k = 200, b = () => typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, A = (e) => {
  b() ? e() : setTimeout(e, k);
};
export {
  w as M,
  T as a,
  I as b,
  H as c,
  m as d,
  U as e,
  C as f,
  z as g,
  j as h,
  R as i,
  S as j,
  A as k,
  v as l,
  _ as m,
  M as r
};
