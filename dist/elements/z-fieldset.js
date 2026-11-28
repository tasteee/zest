// @ts-self-types="./z-fieldset.d.ts"
import { c as P, a as Z, u as F, f as v, b, j as s, g as d, d as M } from "../chunks/define-element-BZUk-KLk.js";
import { i as _ } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as l } from "../chunks/hooks-DEFT8qqt.js";
import { o as m } from "../chunks/prop-types-CSJu2W-0.js";
const I = P`
	:host {
		display: block;
		min-width: 0;
		--z-fieldset-gap: var(--space-4);
	}

	:host([is-hidden]) {
		display: none;
	}

	.fieldset {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		min-width: 0;
	}

	.fieldset.is-outline {
		padding: var(--space-5);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-lg);
	}

	.fieldset.is-soft {
		padding: var(--space-5);
		background: var(--surface-default);
		border: 1px solid transparent;
		border-radius: var(--radius-lg);
	}

	.header {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		min-width: 0;
	}

	.header[hidden],
	.description[hidden],
	.error[hidden] {
		display: none;
	}

	.legend-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		min-width: 0;
	}

	.legend {
		color: var(--text-primary);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		line-height: var(--line-height-tight);
		min-width: 0;
	}

	:host([size='lg']) .legend {
		font-size: var(--font-size-md);
	}

	.required {
		color: var(--status-danger);
	}

	.actions {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		flex-shrink: 0;
	}

	.description {
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-snug);
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: var(--z-fieldset-gap);
		min-width: 0;
	}

	:host([is-horizontal]) .content {
		flex-direction: row;
		flex-wrap: wrap;
		align-items: flex-start;
	}

	:host([is-horizontal]) .content ::slotted(*) {
		flex: 1 1 12rem;
	}

	.error {
		color: var(--status-danger);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-snug);
	}

	.fieldset.is-invalid.is-outline {
		border-color: color-mix(in oklab, var(--status-danger) 55%, var(--border-default));
	}

	:host([is-legend-hidden]) .header {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
		border: 0;
	}
`, K = "button, input, select, textarea", h = (e) => "isDisabled" in e, V = (e) => e.matches(K), G = (e) => {
  const i = typeof e.isDisabled == "boolean" ? !!e.isDisabled : e.hasAttribute("is-disabled");
  return h(e) ? i : !!e.disabled;
}, y = (e, n) => {
  if (h(e)) {
    e.isDisabled = n;
    return;
  }
  e.disabled = n;
}, J = (e) => [...e.querySelectorAll("*")].filter((i) => h(i) || V(i)), Q = (e) => e ? e.assignedNodes({ flatten: !0 }).map((o) => o.textContent ?? "").join(" ").trim() : "", U = (e) => e === "outline" ? "is-outline" : e === "soft" ? "is-soft" : "is-plain", W = Z(
  (e) => {
    const n = F(), i = v(), o = v(/* @__PURE__ */ new Set()), [x, w] = l(""), [S, z] = l(!1), [D, B] = l(!1), [C, A] = l(!1), a = !!e.isDisabled, u = () => {
      for (const t of J(n.current))
        o.current.has(t) || G(t) || (y(t, !0), o.current.add(t));
    }, N = () => {
      for (const t of o.current) y(t, !1);
      o.current.clear();
    }, f = () => {
      if (a) {
        u();
        return;
      }
      N();
    };
    b(f, [a]), b(() => {
      if (!a || !(typeof MutationObserver < "u")) return;
      const r = new MutationObserver(u);
      return r.observe(n.current, { childList: !0, subtree: !0 }), () => r.disconnect();
    }, [a]);
    const E = () => w(Q(i.current)), H = (t) => {
      const r = t.target;
      z(r.assignedNodes().length > 0);
    }, L = (t) => {
      const r = t.target;
      B(r.assignedNodes().length > 0);
    }, O = (t) => {
      const r = t.target;
      A(r.assignedNodes().length > 0);
    }, g = e.legend || x, j = !!g, p = !!e.description || S, c = !!e.error || D, k = j || p || C, T = n.current.hasAttribute("aria-labelledby") ? void 0 : g || void 0, R = [e.description, e.error].filter(Boolean).join(" ") || void 0, q = ["fieldset", U(e.kind)].concat(c ? ["is-invalid"] : []).join(" ");
    return /* @__PURE__ */ s(
      "host",
      {
        shadowDom: !0,
        role: "group",
        "aria-label": T,
        "aria-description": R,
        "aria-disabled": a ? "true" : void 0,
        "aria-invalid": c ? "true" : void 0,
        children: /* @__PURE__ */ d("div", { class: q, part: "fieldset", children: [
          /* @__PURE__ */ d("div", { class: "header", hidden: !k, children: [
            /* @__PURE__ */ d("div", { class: "legend-row", children: [
              /* @__PURE__ */ d("span", { class: "legend", part: "legend", children: [
                /* @__PURE__ */ s("slot", { ref: i, name: "legend", onslotchange: E, children: e.legend }),
                e.isRequired && /* @__PURE__ */ s("span", { class: "required", "aria-hidden": "true", children: " *" })
              ] }),
              /* @__PURE__ */ s("span", { class: "actions", children: /* @__PURE__ */ s("slot", { name: "actions", onslotchange: O }) })
            ] }),
            /* @__PURE__ */ s("div", { class: "description", hidden: !p, children: /* @__PURE__ */ s("slot", { name: "description", onslotchange: H, children: e.description }) })
          ] }),
          /* @__PURE__ */ s("div", { class: "content", part: "content", children: /* @__PURE__ */ s("slot", { onslotchange: f }) }),
          /* @__PURE__ */ s("div", { class: "error", role: "alert", hidden: !c, children: /* @__PURE__ */ s("slot", { name: "error", onslotchange: L, children: e.error }) })
        ] })
      }
    );
  },
  {
    props: {
      legend: String,
      description: String,
      error: String,
      kind: { type: m("plain", "outline", "soft"), reflect: !0 },
      size: { type: m("md", "lg"), reflect: !0 },
      isRequired: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHorizontal: { type: Boolean, reflect: !0 },
      isLegendHidden: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: [I, _]
  }
);
M("z-fieldset", W);
export {
  W as ZFieldset
};
