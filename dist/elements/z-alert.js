// @ts-self-types="./z-alert.d.ts"
import { c as v, a as y, e as f, j as e, g as s, d as x } from "../chunks/define-element-BZUk-KLk.js";
import { i as b } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as w } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as n } from "../chunks/hooks-DEFT8qqt.js";
import { o as k } from "../chunks/prop-types-B3Bpi956.js";
import { u as H } from "../chunks/locale-Bb4aqXuR.js";
const S = v`
	:host {
		display: block;
		--alert-color: var(--text-secondary);
	}

	:host([tone='secondary']) {
		--alert-color: var(--accent-secondary);
	}
	:host([tone='success']) {
		--alert-color: var(--status-success);
	}
	:host([tone='warning']) {
		--alert-color: var(--status-warning);
	}
	:host([tone='danger']) {
		--alert-color: var(--status-danger);
	}

	:host([is-hidden]) {
		display: none;
	}

	.alert {
		display: flex;
		gap: var(--space-3);
		box-sizing: border-box;
		padding: var(--space-3) var(--space-4);
		/* srgb: oklch would drift the hue when mixing the chromatic alert colour
		   against the hue-carrying --border-default. */
		border: 1px solid color-mix(in srgb, var(--alert-color) 40%, var(--border-default));
		border-radius: var(--radius-md);
		background: color-mix(in oklch, var(--alert-color) 8%, transparent);
		color: var(--text-primary);
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
		gap: var(--space-0-5);
	}

	.title {
		margin: 0;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		line-height: var(--line-height-snug);
		color: var(--text-primary);
	}

	.title a,
	::slotted(a) {
		color: inherit;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-top: var(--space-2-5);
	}

	.actions.is-empty {
		display: none;
	}

	.body {
		font-size: var(--font-size-sm);
		line-height: var(--line-height-normal);
		color: var(--text-secondary);
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
		color: var(--text-secondary);
		cursor: pointer;
		transition:
			color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	.close:hover {
		color: var(--text-primary);
		background: color-mix(in oklch, var(--text-primary) 8%, transparent);
	}

	.close:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	.close svg {
		width: 0.875rem;
		height: 0.875rem;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		fill: none;
	}
`, i = {
  primary: /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "9" }),
  success: /* @__PURE__ */ e("polyline", { points: "5 13 10 18 19 6" }),
  warning: /* @__PURE__ */ e("path", { d: "M12 3 2 20h20L12 3Z M12 10v5 M12 17.5v.5" }),
  danger: /* @__PURE__ */ e("path", { d: "M12 3 2 20h20L12 3Z M12 10v5 M12 17.5v.5" }),
  neutral: /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "9" })
}, z = ["danger", "warning"], M = y(
  (r) => {
    const l = H(), [j, c] = w("isHidden"), o = r.tone || "neutral", [d, h] = n(!1), [m, g] = n(!1), a = (t) => t.target.assignedNodes().length > 0, u = z.includes(o) ? "alert" : "status", p = () => {
      c(!0), r.dismiss();
    };
    return /* @__PURE__ */ e("host", { shadowDom: !0, children: /* @__PURE__ */ s("div", { class: "alert", role: u, children: [
      /* @__PURE__ */ e("span", { class: "icon", "aria-hidden": "true", children: /* @__PURE__ */ e("slot", { name: "icon", children: /* @__PURE__ */ e("svg", { viewBox: "0 0 24 24", children: i[o] || i.neutral }) }) }),
      /* @__PURE__ */ s("div", { class: "content", children: [
        /* @__PURE__ */ e("p", { class: "title", style: r.heading || d ? "" : "display: none", children: /* @__PURE__ */ e("slot", { name: "heading", onslotchange: (t) => h(a(t)), children: r.heading }) }),
        /* @__PURE__ */ e("div", { class: "body", children: /* @__PURE__ */ e("slot", {}) }),
        /* @__PURE__ */ e("div", { class: m ? "actions" : "actions is-empty", children: /* @__PURE__ */ e("slot", { name: "actions", onslotchange: (t) => g(a(t)) }) })
      ] }),
      r.isDismissable && /* @__PURE__ */ e("button", { type: "button", class: "close", "aria-label": l("dismiss"), onclick: p, children: /* @__PURE__ */ s("svg", { viewBox: "0 0 24 24", children: [
        /* @__PURE__ */ e("line", { x1: "6", y1: "6", x2: "18", y2: "18" }),
        /* @__PURE__ */ e("line", { x1: "18", y1: "6", x2: "6", y2: "18" })
      ] }) })
    ] }) });
  },
  {
    props: {
      tone: { type: k("primary", "secondary", "tertiary", "success", "warning", "danger"), reflect: !0 },
      heading: String,
      isDismissable: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      dismiss: f({ bubbles: !0, composed: !0 })
    },
    styles: [S, b]
  }
);
x("z-alert", M);
export {
  M as ZAlert
};
