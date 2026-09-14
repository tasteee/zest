import { c as u, a as f, f as o, b as m, j as t, g as d, d as g } from "../chunks/define-element-BWC3wEPr.js";
const w = u`
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
	.header { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; height: var(--field-label-height); min-width: 0; }

	.label { color: var(--color-neutral-5); font-size: var(--font-size-small); font-weight: 600; line-height: 1; letter-spacing: 0.04em; text-transform: lowercase; font-variant-caps: all-small-caps; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; user-select: none; -webkit-user-select: none; }
	.required { color: var(--destructive); }

	/* The band. Whatever is slotted sits vertically centred in a row of the
	   control height, which is what lets a switch and a select agree. */
	.control { display: flex; align-items: center; min-width: 0; min-height: var(--z-field-control-height); }

	/* The slotted control is a flex item, so its automatic minimum size is its
	   own min-content — the last place the field could still be forced wider
	   than the space it was given. Controls set min-width: 0 on their inner
	   input already; this carries that the rest of the way out. */
	.control ::slotted(*) { min-width: 0; max-width: 100%; }

	.description, .error { font-size: var(--font-size-small); line-height: 1.45; }
	.description { color: var(--muted-foreground); }
	.description ::slotted(*) { color: var(--muted-foreground); }
	.error { color: var(--destructive); }

	:host([is-label-hidden]) .header { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
`, v = f(
  (e) => {
    const a = o(), r = o(), n = () => {
      var s;
      const i = (s = a.current) == null ? void 0 : s.assignedElements({ flatten: !0 })[0];
      if (!i || (e.label && (i.hasAttribute("label") || i.hasAttribute("aria-label") || i.hasAttribute("aria-labelledby") || (i.label = e.label)), !("isRequired" in i))) return;
      const l = i;
      e.isRequired && !l.isRequired && (l.isRequired = !0, r.current = i);
      const h = r.current === i;
      !e.isRequired && h && (l.isRequired = !1, r.current = void 0);
    };
    m(() => n(), [e.label, e.isRequired]);
    const c = !e.label && e.isLabelReserved;
    return /* @__PURE__ */ t("host", { shadowDom: !0, children: /* @__PURE__ */ d("div", { class: "field", children: [
      e.label && /* @__PURE__ */ t("div", { class: "header", children: /* @__PURE__ */ d("span", { class: "label", children: [
        e.label,
        e.isRequired && /* @__PURE__ */ t("span", { class: "required", "aria-hidden": "true", children: " *" })
      ] }) }),
      c && /* @__PURE__ */ t("div", { class: "header", "aria-hidden": "true" }),
      /* @__PURE__ */ t("div", { class: "control", children: /* @__PURE__ */ t("slot", { ref: a, onslotchange: n }) }),
      e.error ? /* @__PURE__ */ t("div", { class: "error", children: /* @__PURE__ */ t("slot", { name: "error", children: e.error }) }) : e.description ? /* @__PURE__ */ t("div", { class: "description", children: /* @__PURE__ */ t("slot", { name: "description", children: e.description }) }) : null
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
      size: { type: String, reflect: !0 }
    },
    styles: w
  }
);
g("z-field", v);
export {
  v as ZField
};
