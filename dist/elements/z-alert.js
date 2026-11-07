import { c as v, a as f, e as y, j as e, g as s, d as x } from "../chunks/define-element-BZUk-KLk.js";
import { i as b } from "../chunks/interaction-styles-XiKFAbWA.js";
import { u as w } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as i } from "../chunks/hooks-DEFT8qqt.js";
import { o as k } from "../chunks/prop-types-B3Bpi956.js";
import { u as H } from "../chunks/locale-DUDaH1Ni.js";
const S = v`
	:host {
		display: block;
		--alert-color: var(--muted-foreground);
	}

	:host([tone='secondary']) {
		--alert-color: var(--purple);
	}
	:host([tone='success']) {
		--alert-color: var(--success);
	}
	:host([tone='warning']) {
		--alert-color: var(--warning);
	}
	:host([tone='danger']) {
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

	.title a,
	::slotted(a) {
		color: inherit;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.625rem;
	}

	.actions.is-empty {
		display: none;
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
			color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	.close:hover {
		color: var(--foreground);
		background: color-mix(in oklch, var(--foreground) 8%, transparent);
	}

	.close:focus-visible {
		outline: 3px solid var(--focus-ring);
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
`, a = {
  primary: /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "9" }),
  success: /* @__PURE__ */ e("polyline", { points: "5 13 10 18 19 6" }),
  warning: /* @__PURE__ */ e("path", { d: "M12 3 2 20h20L12 3Z M12 10v5 M12 17.5v.5" }),
  danger: /* @__PURE__ */ e("path", { d: "M12 3 2 20h20L12 3Z M12 10v5 M12 17.5v.5" }),
  neutral: /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "9" })
}, z = ["danger", "warning"], M = f(
  (r) => {
    const l = H(), [j, c] = w("isHidden"), t = r.tone || "neutral", [d, h] = i(!1), [g, m] = i(!1), n = (o) => o.target.assignedNodes().length > 0, u = z.includes(t) ? "alert" : "status", p = () => {
      c(!0), r.dismiss();
    };
    return /* @__PURE__ */ e("host", { shadowDom: !0, children: /* @__PURE__ */ s("div", { class: "alert", role: u, children: [
      /* @__PURE__ */ e("span", { class: "icon", "aria-hidden": "true", children: /* @__PURE__ */ e("slot", { name: "icon", children: /* @__PURE__ */ e("svg", { viewBox: "0 0 24 24", children: a[t] || a.neutral }) }) }),
      /* @__PURE__ */ s("div", { class: "content", children: [
        /* @__PURE__ */ e("p", { class: "title", style: r.heading || d ? "" : "display: none", children: /* @__PURE__ */ e("slot", { name: "heading", onslotchange: (o) => h(n(o)), children: r.heading }) }),
        /* @__PURE__ */ e("div", { class: "body", children: /* @__PURE__ */ e("slot", {}) }),
        /* @__PURE__ */ e("div", { class: g ? "actions" : "actions is-empty", children: /* @__PURE__ */ e("slot", { name: "actions", onslotchange: (o) => m(n(o)) }) })
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
      dismiss: y({ bubbles: !0, composed: !0 })
    },
    styles: [S, b]
  }
);
x("z-alert", M);
export {
  M as ZAlert
};
