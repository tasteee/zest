import { c as f, a as v, e as l, b as g, j as r, g as p, d as m } from "./define-element-BWC3wEPr.js";
import { u as C } from "./hooks-D9_x-ckD.js";
const d = (e) => ({ isCopied: !1, error: new Error(e) }), k = { isCopied: !0, error: null }, x = () => typeof navigator < "u" ? !!navigator.clipboard : !1, w = async (e) => {
  if (!x()) return d("clipboard unavailable in this context");
  try {
    return await navigator.clipboard.writeText(e), k;
  } catch (t) {
    return t instanceof Error ? { isCopied: !1, error: t } : d("clipboard write rejected");
  }
}, E = 1600, S = f`
	:host {
		display: inline-flex;
	}

	:host([is-hidden]) {
		display: none;
	}

	.copy {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		flex-shrink: 0;
		padding: 0.25rem 0.5rem;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		color: var(--muted-foreground);
		font-family: inherit;
		font-size: var(--font-size-caption);
		cursor: pointer;
		transition:
			color 0.12s ease,
			border-color 0.12s ease,
			background-color 0.12s ease;
	}

	.copy:hover {
		color: var(--foreground);
		border-color: color-mix(in oklch, var(--foreground) 30%, transparent);
	}

	.copy:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}

	.copy:disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.copy.is-copied {
		color: var(--success);
		border-color: color-mix(in oklch, var(--success) 50%, transparent);
	}

	:host([kind='ghost']) .copy {
		border-color: transparent;
	}

	:host([kind='ghost']) .copy:hover {
		border-color: transparent;
		background: var(--muted);
	}

	:host([kind='icon']) .copy {
		padding: 0.25rem;
	}

	:host([size='sm']) .copy {
		padding: 0.125rem 0.375rem;
	}

	:host([size='sm'][kind='icon']) .copy {
		padding: 0.125rem;
	}

	.icon {
		display: inline-flex;
		width: 0.875rem;
		height: 0.875rem;
	}

	:host([size='sm']) .icon {
		width: 0.75rem;
		height: 0.75rem;
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

	.label {
		white-space: nowrap;
	}
`, B = /* @__PURE__ */ r("svg", { viewBox: "0 0 24 24", children: /* @__PURE__ */ r("polyline", { points: "4 12 10 18 20 6" }) }), z = /* @__PURE__ */ p("svg", { viewBox: "0 0 24 24", children: [
  /* @__PURE__ */ r("rect", { x: "9", y: "9", width: "11", height: "11", rx: "2" }),
  /* @__PURE__ */ r("path", { d: "M5 15V5a2 2 0 0 1 2-2h10" })
] }), I = v(
  (e) => {
    const [o, t] = C(!1), n = e.value ?? "", s = e.label || "Copy", u = e.copiedLabel || "Copied", a = e.kind === "icon", c = a ? s : void 0, h = o ? B : z, b = o ? u : /* @__PURE__ */ r("slot", { children: s });
    g(() => {
      if (!o) return;
      const i = setTimeout(() => t(!1), E);
      return () => clearTimeout(i);
    }, [o]);
    const y = async () => {
      const i = await w(n);
      if (!i.isCopied) {
        e.error({ error: i.error });
        return;
      }
      t(!0), e.copy({ value: n });
    };
    return /* @__PURE__ */ r("host", { shadowDom: !0, children: /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        class: o ? "copy is-copied" : "copy",
        disabled: e.isDisabled,
        title: c,
        "aria-label": c,
        "aria-live": "polite",
        onclick: y,
        children: [
          /* @__PURE__ */ r("span", { class: "icon", "aria-hidden": "true", children: h }),
          !a && /* @__PURE__ */ r("span", { class: "label", children: b })
        ]
      }
    ) });
  },
  {
    props: {
      value: { type: String },
      label: { type: String, reflect: !0 },
      copiedLabel: { type: String, reflect: !0 },
      kind: { type: String, reflect: !0 },
      size: { type: String, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      copy: l({ bubbles: !0, composed: !0 }),
      error: l({ bubbles: !0, composed: !0 })
    },
    styles: S
  }
);
m("z-copy-button", I);
export {
  E as C,
  I as Z,
  w as a,
  x as c
};
