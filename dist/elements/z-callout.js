// @ts-self-types="./z-callout.d.ts"
import { c as w, a as k, f as E, b as C, j as e, g as t, d as z } from "../chunks/define-element-BZUk-KLk.js";
import { u as S } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as M } from "../chunks/hooks-DEFT8qqt.js";
import { o as H } from "../chunks/prop-types-B3Bpi956.js";
import { u as L } from "../chunks/locale-Bb4aqXuR.js";
const O = w`
	:host {
		display: block;
		--callout-color: var(--text-secondary);
		/* Opaque twin of the callout fill (below), used behind the "Show more"
		   fade. The fill itself keeps a transparent base so the block blends over
		   any surface; the fade approximates the default --surface-page surface. */
		--callout-fade: color-mix(in oklab, var(--callout-color) 7%, var(--surface-page));
	}

	:host([tone='secondary']) {
		--callout-color: var(--accent-secondary);
	}
	:host([tone='success']) {
		--callout-color: var(--status-success);
	}
	:host([tone='tertiary']) {
		--callout-color: var(--accent-tertiary);
	}
	:host([tone='warning']) {
		--callout-color: var(--status-warning);
	}
	:host([tone='danger']) {
		--callout-color: var(--status-danger);
	}

	:host([is-hidden]) {
		display: none;
	}

	.callout {
		display: flex;
		gap: var(--space-3);
		box-sizing: border-box;
		padding: var(--space-3) var(--space-4);
		/* srgb: oklch would drift the chromatic accent when mixed against the
		   hue-carrying --border-default (matches z-alert). */
		border: 1px solid color-mix(in srgb, var(--callout-color) 25%, var(--border-default));
		border-inline-start: 3px solid var(--callout-color);
		border-radius: var(--radius-md);
		background: color-mix(in oklch, var(--callout-color) 7%, transparent);
		color: var(--text-primary);
	}

	.icon {
		display: inline-flex;
		flex-shrink: 0;
		width: 1.125rem;
		height: 1.125rem;
		margin-top: 0.0625rem;
		color: var(--callout-color);
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
		gap: var(--space-1);
	}

	.label {
		margin: 0;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		line-height: var(--line-height-snug);
		letter-spacing: 0.01em;
		color: var(--callout-color);
	}

	.body {
		position: relative;
		font-size: var(--font-size-sm);
		line-height: var(--line-height-normal);
		color: var(--text-secondary);
	}

	/* Collapsed: clamp the slotted copy to two lines. The <slot> defaults to
	   display:contents, so the assigned nodes are laid out directly inside the
	   -webkit-box and the line clamp counts their text lines. */
	.body.is-clamped .text {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.toggle {
		margin: 0;
		padding: 0;
		border: 0;
		background: transparent;
		font: inherit;
		font-weight: var(--font-weight-semibold);
		color: var(--callout-color);
		cursor: pointer;
	}

	.toggle:hover {
		text-decoration: underline;
	}

	.toggle:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
		border-radius: var(--radius-sm);
	}

	/* Collapsed toggle rides the end of the second line, lifted out of the flow
	   and floated right with a fade so it reads as trailing the truncated copy. */
	.body.is-clamped .toggle {
		position: absolute;
		right: 0;
		bottom: 0;
		padding-inline-start: 2.75rem;
		background: linear-gradient(to right, transparent, var(--callout-fade) 45%);
	}

	/* Expanded toggle drops to its own line beneath the full copy. */
	.body:not(.is-clamped) .toggle {
		display: inline-block;
		margin-top: var(--space-1-5);
	}

	/* No heading + copy that fits: centre the icon so a bare callout isn't
	   top-heavy. Suppressed once the body clamps/expands to multiple lines. */
	.callout.is-compact {
		align-items: center;
	}
	.callout.is-compact .icon {
		margin-top: 0;
	}
`, m = {
  // lowercase "i", dot above, stroke below
  primary: /* @__PURE__ */ t("g", { children: [
    /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "8", x2: "12", y2: "8.01" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "11", x2: "12", y2: "16" })
  ] }),
  // lightbulb
  success: /* @__PURE__ */ t("g", { children: [
    /* @__PURE__ */ e("path", { d: "M9 18h6" }),
    /* @__PURE__ */ e("path", { d: "M10 21h4" }),
    /* @__PURE__ */ e("path", { d: "M12 3a6 6 0 0 0-4 10.5c.6.55 1 1.3 1 2.5h6c0-1.2.4-1.95 1-2.5A6 6 0 0 0 12 3Z" })
  ] }),
  // exclamation "!" in a circle, stroke above, dot below (mirrors dom)
  secondary: /* @__PURE__ */ t("g", { children: [
    /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "8", x2: "12", y2: "13" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "16", x2: "12", y2: "16.01" })
  ] }),
  // triangle "!"
  warning: /* @__PURE__ */ t("g", { children: [
    /* @__PURE__ */ e("path", { d: "M12 3 2 20h20L12 3Z" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "10", x2: "12", y2: "14" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "17", x2: "12", y2: "17.01" })
  ] }),
  // octagon "!" (stop)
  danger: /* @__PURE__ */ t("g", { children: [
    /* @__PURE__ */ e("path", { d: "M8 3h8l5 5v8l-5 5H8l-5-5V8l5-5Z" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "8", x2: "12", y2: "13" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "16", x2: "12", y2: "16.01" })
  ] })
}, j = k(
  (a) => {
    const c = L(), [l, y] = S("isExpanded"), [d, h] = M(!1), p = E(), i = a.tone || "primary", x = m[i] || m.primary, s = a.heading, b = i === "warning" || i === "danger";
    C(() => {
      const r = p.current;
      if (!a.isExpandable || !r) {
        h(!1);
        return;
      }
      const n = () => {
        const f = getComputedStyle(r), v = parseFloat(f.lineHeight) || parseFloat(f.fontSize) * 1.6;
        h(r.scrollHeight > v * 2 + 1);
      };
      n();
      const g = new ResizeObserver(n);
      g.observe(r);
      const o = r.querySelector("slot");
      return o == null || o.addEventListener("slotchange", n), () => {
        g.disconnect(), o == null || o.removeEventListener("slotchange", n);
      };
    }, [a.isExpandable]);
    const u = a.isExpandable && d;
    return /* @__PURE__ */ e("host", { shadowDom: !0, children: /* @__PURE__ */ t("div", { class: `callout${!s && !d ? " is-compact" : ""}`, role: b ? "alert" : "note", children: [
      /* @__PURE__ */ e("span", { class: "icon", "aria-hidden": "true", children: /* @__PURE__ */ e("svg", { viewBox: "0 0 24 24", children: x }) }),
      /* @__PURE__ */ t("div", { class: "content", children: [
        s && /* @__PURE__ */ e("p", { class: "label", children: s }),
        /* @__PURE__ */ t("div", { class: `body${u && !l ? " is-clamped" : ""}`, children: [
          /* @__PURE__ */ e("div", { class: "text", ref: p, children: /* @__PURE__ */ e("slot", {}) }),
          u && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              class: "toggle",
              "aria-expanded": l ? "true" : "false",
              onclick: () => y(!l),
              children: c(l ? "showLess" : "showMore")
            }
          )
        ] })
      ] })
    ] }) });
  },
  {
    props: {
      tone: { type: H("primary", "secondary", "tertiary", "success", "warning", "danger"), reflect: !0 },
      heading: { type: String, reflect: !0 },
      isExpandable: { type: Boolean, reflect: !0 },
      isExpanded: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: O
  }
);
z("z-callout", j);
export {
  j as ZCallout
};
