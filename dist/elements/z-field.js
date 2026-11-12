// @ts-self-types="./z-field.d.ts"
import { c as E, a as A, f as d, b as z, j as r, g as R, d as I } from "../chunks/define-element-BZUk-KLk.js";
import { i as L } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as q } from "../chunks/hooks-DEFT8qqt.js";
import { o as T } from "../chunks/prop-types-B3Bpi956.js";
const H = E`
	:host {
		display: block;
		width: 100%;
		--z-field-control-height: var(--control-height-md);
	}

	:host([size='sm']) { --z-field-control-height: var(--control-height-sm); }
	:host([size='lg']) { --z-field-control-height: var(--control-height-lg); }

	/* minmax(0, 1fr) rather than the implicit auto track: an auto track is
	   floored at its content's min-content width, so a field in a narrow
	   container (a grid cell, a split pane) grew past it and overlapped its
	   neighbour instead of letting the control shrink. */
	.field { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--field-gap); }

	/* Labels stay in normal flow and align with the control's outer edge. This
	   works on every surface and for every control shape without painting a
	   theme-dependent patch or shadow over a border. The fixed height keeps
	   mixed rows aligned even when a theme uses different font metrics. */
	.header { display: flex; align-items: center; justify-content: space-between; gap: var(--space-3); height: var(--field-label-height); min-width: 0; }

	.label { color: var(--text-primary); font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); line-height: var(--line-height-tight); letter-spacing: normal; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; user-select: none; -webkit-user-select: none; }
	.required { color: var(--status-danger); }

	/* The band. Whatever is slotted sits vertically centred in a row of the
	   control height, which is what lets a switch and a select agree. */
	.control { display: flex; align-items: center; min-width: 0; min-height: var(--z-field-control-height); }

	/* The slotted control is a flex item, so its automatic minimum size is its
	   own min-content — the last place the field could still be forced wider
	   than the space it was given. Controls set min-width: 0 on their inner
	   input already; this carries that the rest of the way out. */
	.control ::slotted(*) { min-width: 0; max-width: 100%; }

	.description, .error { font-size: var(--font-size-sm); line-height: var(--line-height-snug); }
	.description { color: var(--text-secondary); }
	.description ::slotted(*) { color: var(--text-secondary); }
	.error { color: var(--status-danger); }

	/* Horizontal puts the label in its own column left of the control. The
	   label band takes the control's height so the text centres on it, and
	   the error and description line up under the control. */
	:host([is-horizontal]) .field { grid-template-columns: max-content minmax(0, 1fr); column-gap: var(--space-4); align-items: start; }
	:host([is-horizontal]) .header { grid-column: 1; grid-row: 1; height: var(--z-field-control-height); }
	:host([is-horizontal]) .control { grid-column: 2; grid-row: 1; justify-content: flex-end; }
	:host([is-horizontal][is-start]) .control { justify-content: flex-start; }
	:host([is-space-between]) .control { justify-content: flex-end; }
	:host([is-horizontal]) .error, :host([is-horizontal]) .description { grid-column: 2; }

	:host([is-label-hidden]) .header { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
`, C = A(
  (i) => {
    const c = d(), [h, S] = q(!1), [f, k] = q(!1), n = d(), u = d(), g = d(), m = (e) => (e == null ? void 0 : e.assignedNodes({ flatten: !0 }).map((t) => t.textContent ?? "").join(" ").trim()) || void 0, v = () => {
      const e = n.current;
      if (!e) return;
      const t = e.control;
      e.label !== void 0 && t.label === e.label && (t.label = void 0), e.required && t.isRequired && (t.isRequired = !1), e.description !== void 0 && t.description === e.description && (t.description = void 0), e.error !== void 0 && t.error === e.error && (t.error = void 0), e.invalid && t.isInvalid && (t.isInvalid = !1), n.current = void 0;
    }, p = () => {
      var w, x;
      const e = (w = c.current) == null ? void 0 : w.assignedElements({ flatten: !0 })[0];
      if (((x = n.current) == null ? void 0 : x.control) !== e && v(), !e) return;
      const t = n.current ?? { control: e }, l = t.label !== void 0 && e.label === t.label, a = e.hasAttribute("label") || e.hasAttribute("aria-label") || e.hasAttribute("aria-labelledby");
      "label" in e && !a && (l || !e.label) && (e.label = i.label || void 0, t.label = i.label || void 0), "isRequired" in e && (i.isRequired && !e.isRequired ? (e.isRequired = !0, t.required = !0) : !i.isRequired && t.required && (e.isRequired = !1, t.required = !1));
      const o = i.error || m(g.current), s = i.description || m(u.current);
      if ("description" in e && !e.hasAttribute("description") && (t.description !== void 0 || !e.description) && (e.description = s, t.description = s), "error" in e && !e.hasAttribute("error") && (t.error !== void 0 || !e.error) && (e.error = o, t.error = o), "isInvalid" in e && (t.invalid || !e.hasAttribute("is-invalid"))) {
        const y = !!o;
        y && !e.isInvalid ? (e.isInvalid = !0, t.invalid = !0) : !y && t.invalid && (e.isInvalid = !1, t.invalid = !1);
      }
      n.current = t;
    };
    z(() => p(), [i.label, i.isRequired, i.description, i.error, h, f]), z(() => v, []);
    const j = () => {
      var l, a, o, s;
      const e = (l = c.current) == null ? void 0 : l.assignedElements({ flatten: !0 })[0];
      (s = ((a = e == null ? void 0 : e.shadowRoot) == null ? void 0 : a.querySelector("input, textarea, select")) ?? ((o = e == null ? void 0 : e.shadowRoot) == null ? void 0 : o.querySelector('button, [tabindex="0"]')) ?? e) == null || s.focus();
    }, B = !i.label && i.isLabelReserved, b = !!i.error || f;
    return /* @__PURE__ */ r("host", { shadowDom: !0, children: /* @__PURE__ */ R("div", { class: "field", children: [
      i.label && /* @__PURE__ */ r("div", { class: "header", children: /* @__PURE__ */ R("span", { class: "label", onclick: j, children: [
        i.label,
        i.isRequired && /* @__PURE__ */ r("span", { class: "required", "aria-hidden": "true", children: " *" })
      ] }) }),
      B && /* @__PURE__ */ r("div", { class: "header", "aria-hidden": "true" }),
      /* @__PURE__ */ r("div", { class: "control", children: /* @__PURE__ */ r("slot", { ref: c, onslotchange: p }) }),
      /* @__PURE__ */ r("div", { class: "error", hidden: !b, children: /* @__PURE__ */ r("slot", { ref: g, name: "error", onslotchange: (e) => k(e.target.assignedNodes().length > 0), children: i.error }) }),
      /* @__PURE__ */ r("div", { class: "description", hidden: b || !i.description && !h, children: /* @__PURE__ */ r("slot", { ref: u, name: "description", onslotchange: (e) => S(e.target.assignedNodes().length > 0), children: i.description }) })
    ] }) });
  },
  {
    props: {
      label: String,
      description: String,
      error: String,
      isRequired: { type: Boolean, reflect: !0 },
      isLabelHidden: { type: Boolean, reflect: !0 },
      isLabelReserved: { type: Boolean, reflect: !0 },
      isHorizontal: { type: Boolean, reflect: !0 },
      isSpaceBetween: { type: Boolean, reflect: !0 },
      size: { type: T("sm", "md", "lg"), reflect: !0 }
    },
    styles: [H, L]
  }
);
I("z-field", C);
export {
  C as ZField
};
