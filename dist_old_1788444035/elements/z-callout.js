import { c as v, a as w, f as k, b as E, j as e, g as o, d as S } from "../chunks/define-element-BWC3wEPr.js";
import { u as C } from "../chunks/use-prop-DBBKVpkc.js";
import { u as z } from "../chunks/hooks-D9_x-ckD.js";
const H = v`
	:host {
		display: block;
		--callout-color: var(--muted-foreground);
		/* Opaque twin of the callout fill (below), used behind the "Show more"
		   fade. The fill itself keeps a transparent base so the block blends over
		   any surface; the fade approximates the default --background surface. */
		--callout-fade: color-mix(in oklch, var(--callout-color) 7%, var(--background));
	}

	:host([accent='dom']) {
		--callout-color: var(--purple);
	}
	:host([accent='success']) {
		--callout-color: var(--success);
	}
	:host([accent='sub']) {
		--callout-color: var(--accent-alt);
	}
	:host([accent='warning']) {
		--callout-color: var(--warning);
	}
	:host([accent='error']) {
		--callout-color: var(--destructive);
	}

	:host([is-hidden]) {
		display: none;
	}

	.callout {
		display: flex;
		gap: 0.75rem;
		box-sizing: border-box;
		padding: var(--space-md) var(--space-base);
		/* srgb: oklch would drift the chromatic accent when mixed against the
		   hue-carrying --border (matches z-alert). */
		border: 1px solid color-mix(in srgb, var(--callout-color) 25%, var(--border));
		border-left: 3px solid var(--callout-color);
		border-radius: var(--radius-md);
		background: color-mix(in oklch, var(--callout-color) 7%, transparent);
		color: var(--foreground);
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
		gap: 0.25rem;
	}

	.label {
		margin: 0;
		font-size: var(--font-size-small);
		font-weight: 600;
		line-height: 1.4;
		letter-spacing: 0.01em;
		color: var(--callout-color);
	}

	.body {
		position: relative;
		font-size: var(--font-size-small);
		line-height: var(--line-height-body);
		color: var(--muted-foreground);
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
		font-weight: 600;
		color: var(--callout-color);
		cursor: pointer;
	}

	.toggle:hover {
		text-decoration: underline;
	}

	.toggle:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
		border-radius: var(--radius-sm);
	}

	/* Collapsed toggle rides the end of the second line, lifted out of the flow
	   and floated right with a fade so it reads as trailing the truncated copy. */
	.body.is-clamped .toggle {
		position: absolute;
		right: 0;
		bottom: 0;
		padding-left: 2.75rem;
		background: linear-gradient(to right, transparent, var(--callout-fade) 45%);
	}

	/* Expanded toggle drops to its own line beneath the full copy. */
	.body:not(.is-clamped) .toggle {
		display: inline-block;
		margin-top: 0.35rem;
	}

	/* No heading + copy that fits: centre the icon so a bare callout isn't
	   top-heavy. Suppressed once the body clamps/expands to multiple lines. */
	.callout.is-compact {
		align-items: center;
	}
	.callout.is-compact .icon {
		margin-top: 0;
	}
`, f = {
  // lowercase "i" — dot above, stroke below
  dom: /* @__PURE__ */ o("g", { children: [
    /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "8", x2: "12", y2: "8.01" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "11", x2: "12", y2: "16" })
  ] }),
  // lightbulb
  success: /* @__PURE__ */ o("g", { children: [
    /* @__PURE__ */ e("path", { d: "M9 18h6" }),
    /* @__PURE__ */ e("path", { d: "M10 21h4" }),
    /* @__PURE__ */ e("path", { d: "M12 3a6 6 0 0 0-4 10.5c.6.55 1 1.3 1 2.5h6c0-1.2.4-1.95 1-2.5A6 6 0 0 0 12 3Z" })
  ] }),
  // exclamation "!" in a circle — stroke above, dot below (mirrors dom)
  sub: /* @__PURE__ */ o("g", { children: [
    /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "8", x2: "12", y2: "13" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "16", x2: "12", y2: "16.01" })
  ] }),
  // triangle "!"
  warning: /* @__PURE__ */ o("g", { children: [
    /* @__PURE__ */ e("path", { d: "M12 3 2 20h20L12 3Z" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "10", x2: "12", y2: "14" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "17", x2: "12", y2: "17.01" })
  ] }),
  // octagon "!" (stop)
  error: /* @__PURE__ */ o("g", { children: [
    /* @__PURE__ */ e("path", { d: "M8 3h8l5 5v8l-5 5H8l-5-5V8l5-5Z" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "8", x2: "12", y2: "13" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "16", x2: "12", y2: "16.01" })
  ] })
}, M = w(
  (l) => {
    const [a, m] = C("isExpanded"), [s, d] = z(!1), h = k(), i = l.accent || "dom", x = f[i] || f.dom, c = l.heading, b = i === "warning" || i === "error";
    E(() => {
      const r = h.current;
      if (!l.isExpandable || !r) {
        d(!1);
        return;
      }
      const n = () => {
        const g = getComputedStyle(r), y = parseFloat(g.lineHeight) || parseFloat(g.fontSize) * 1.6;
        d(r.scrollHeight > y * 2 + 1);
      };
      n();
      const p = new ResizeObserver(n);
      p.observe(r);
      const t = r.querySelector("slot");
      return t == null || t.addEventListener("slotchange", n), () => {
        p.disconnect(), t == null || t.removeEventListener("slotchange", n);
      };
    }, [l.isExpandable]);
    const u = l.isExpandable && s;
    return /* @__PURE__ */ e("host", { shadowDom: !0, children: /* @__PURE__ */ o("div", { class: `callout${!c && !s ? " is-compact" : ""}`, role: b ? "alert" : "note", children: [
      /* @__PURE__ */ e("span", { class: "icon", "aria-hidden": "true", children: /* @__PURE__ */ e("svg", { viewBox: "0 0 24 24", children: x }) }),
      /* @__PURE__ */ o("div", { class: "content", children: [
        c && /* @__PURE__ */ e("p", { class: "label", children: c }),
        /* @__PURE__ */ o("div", { class: `body${u && !a ? " is-clamped" : ""}`, children: [
          /* @__PURE__ */ e("div", { class: "text", ref: h, children: /* @__PURE__ */ e("slot", {}) }),
          u && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              class: "toggle",
              "aria-expanded": a ? "true" : "false",
              onclick: () => m(!a),
              children: a ? "Show less" : "Show more"
            }
          )
        ] })
      ] })
    ] }) });
  },
  {
    props: {
      accent: { type: String, reflect: !0 },
      heading: { type: String, reflect: !0 },
      isExpandable: { type: Boolean, reflect: !0 },
      isExpanded: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: H
  }
);
S("z-callout", M);
export {
  M as ZCallout
};
