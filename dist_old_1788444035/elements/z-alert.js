import { c as a, a as c, e as d, j as e, g as o, d as h } from "../chunks/define-element-BWC3wEPr.js";
import { u } from "../chunks/use-prop-DBBKVpkc.js";
const g = a`
	:host {
		display: block;
		--alert-color: var(--muted-foreground);
	}

	:host([accent='dom']) {
		--alert-color: var(--purple);
	}
	:host([accent='success']) {
		--alert-color: var(--success);
	}
	:host([accent='warning']) {
		--alert-color: var(--warning);
	}
	:host([accent='error']) {
		--alert-color: var(--destructive);
	}

	:host([is-hidden]) {
		display: none;
	}

	.alert {
		display: flex;
		gap: 0.75rem;
		box-sizing: border-box;
		padding: var(--space-md) var(--space-base);
		/* srgb: oklch would drift the hue when mixing the chromatic alert colour
		   against the hue-carrying --border. */
		border: 1px solid color-mix(in srgb, var(--alert-color) 40%, var(--border));
		border-radius: var(--radius-md);
		background: color-mix(in oklch, var(--alert-color) 8%, transparent);
		color: var(--foreground);
	}

	.icon {
		display: inline-flex;
		flex-shrink: 0;
		width: 1.125rem;
		height: 1.125rem;
		margin-top: 0.0625rem;
		color: var(--alert-color);
	}

	.icon svg {
		width: 100%;
		height: 100%;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

	.content {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.title {
		margin: 0;
		font-size: var(--font-size-small);
		font-weight: 600;
		line-height: 1.4;
		color: var(--foreground);
	}

	.body {
		font-size: var(--font-size-small);
		line-height: var(--line-height-body);
		color: var(--muted-foreground);
	}

	.close {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
		flex-shrink: 0;
		margin: -0.25rem -0.25rem 0 0;
		background: transparent;
		border: 0;
		border-radius: var(--radius-sm);
		color: var(--muted-foreground);
		cursor: pointer;
		transition:
			color 0.12s ease,
			background-color 0.12s ease;
	}

	.close:hover {
		color: var(--foreground);
		background: color-mix(in oklch, var(--foreground) 8%, transparent);
	}

	.close:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}

	.close svg {
		width: 0.875rem;
		height: 0.875rem;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		fill: none;
	}
`, t = {
  dom: /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "9" }),
  success: /* @__PURE__ */ e("polyline", { points: "5 13 10 18 19 6" }),
  warning: /* @__PURE__ */ e("path", { d: "M12 3 2 20h20L12 3Z M12 10v5 M12 17.5v.5" }),
  error: /* @__PURE__ */ e("path", { d: "M12 3 2 20h20L12 3Z M12 10v5 M12 17.5v.5" }),
  neutral: /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "9" })
}, m = ["error", "warning"], v = c(
  (r) => {
    const [f, n] = u("isHidden"), i = r.accent || "neutral", s = m.includes(i) ? "alert" : "status", l = () => {
      n(!0), r.dismiss();
    };
    return /* @__PURE__ */ e("host", { shadowDom: !0, children: /* @__PURE__ */ o("div", { class: "alert", role: s, children: [
      /* @__PURE__ */ e("span", { class: "icon", "aria-hidden": "true", children: /* @__PURE__ */ e("svg", { viewBox: "0 0 24 24", children: t[i] || t.neutral }) }),
      /* @__PURE__ */ o("div", { class: "content", children: [
        r.heading && /* @__PURE__ */ e("p", { class: "title", children: r.heading }),
        /* @__PURE__ */ e("div", { class: "body", children: /* @__PURE__ */ e("slot", {}) })
      ] }),
      r.isDismissable && /* @__PURE__ */ e("button", { type: "button", class: "close", "aria-label": "Dismiss", onclick: l, children: /* @__PURE__ */ o("svg", { viewBox: "0 0 24 24", children: [
        /* @__PURE__ */ e("line", { x1: "6", y1: "6", x2: "18", y2: "18" }),
        /* @__PURE__ */ e("line", { x1: "18", y1: "6", x2: "6", y2: "18" })
      ] }) })
    ] }) });
  },
  {
    props: {
      accent: { type: String, reflect: !0 },
      heading: String,
      isDismissable: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      dismiss: d({ bubbles: !0, composed: !0 })
    },
    styles: g
  }
);
h("z-alert", v);
export {
  v as ZAlert
};
