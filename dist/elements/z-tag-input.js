// @ts-self-types="./z-tag-input.d.ts"
import { c as ye, a as be, e as x, f as D, g as R, j as a } from "../chunks/define-element-BZUk-KLk.js";
import { i as xe } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as De, d as ze } from "../chunks/form-control-CZ1HzNxT.js";
import { s as Se, d as we, u as Be, a as Re, r as Ce } from "../chunks/accessible-NC1hpH4S.js";
import { u as Ae } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as C } from "../chunks/hooks-DEFT8qqt.js";
import { o as H, l as V } from "../chunks/prop-types-CSJu2W-0.js";
import { u as ke } from "../chunks/locale-BNhgEFKA.js";
import { c as Te, a as Ie, R as Fe } from "../chunks/chip-styles-Rr3rYEMP.js";
const Pe = ye`
	:host {
		display: inline-flex;
		width: 100%;
		min-width: 0;
	}

	:host([is-hidden]) {
		display: none;
	}

	.field {
		--tone: var(--accent-primary);
		--control-height: var(--control-height-md);
		--z-chip-height: 1.75rem;
		--z-chip-padding: var(--space-2-5);
		--z-chip-font-size: var(--font-size-sm);
		--field-pad: calc((var(--control-height) - var(--z-chip-height)) / 2 - 1px);
		--field-inset: var(--space-3);

		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-1-5);
		width: 100%;
		min-width: 0;
		min-height: var(--control-height);
		box-sizing: border-box;
		padding: var(--field-pad);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		background: transparent;
		color: var(--text-primary);
		font-family: inherit;
		font-size: var(--font-size-sm);
		cursor: text;
		transition:
			border-color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	:host([tone='secondary']) .field { --tone: var(--accent-secondary); }
	:host([tone='tertiary']) .field { --tone: var(--accent-tertiary); }

	.field.is-sm {
		--control-height: var(--control-height-sm);
		--z-chip-height: 1.375rem;
		--z-chip-padding: var(--space-2);
		--z-chip-font-size: var(--font-size-xs);
		--field-inset: var(--space-2-5);
		font-size: var(--font-size-sm);
	}
	.field.is-lg {
		--control-height: var(--control-height-lg);
		--z-chip-height: 2.125rem;
		--z-chip-padding: var(--space-3);
		--z-chip-font-size: var(--font-size-sm);
		--field-inset: var(--space-3-5);
		font-size: var(--font-size-md);
	}

	.field:hover {
		border-color: color-mix(in oklch, var(--text-primary) 30%, transparent);
	}

	.field:focus-within {
		border-color: var(--tone);
		background: color-mix(in oklch, var(--tone) 5%, transparent);
		outline: 1px solid var(--border-focus);
		outline-offset: -1px;
	}

	.field.is-invalid {
		--tone: var(--status-danger);
		border-color: var(--status-danger);
	}

	.field.is-disabled {
		opacity: var(--control-disabled-opacity);
		pointer-events: none;
	}

	.adornment {
		display: inline-flex;
		align-items: center;
		flex-shrink: 0;
		color: var(--text-secondary);
	}
	.adornment.is-empty {
		display: none;
	}
	.adornment.is-prefix {
		padding-inline-start: calc(var(--field-inset) - var(--field-pad));
	}
	.adornment.is-suffix {
		margin-inline-start: auto;
		padding-inline-end: calc(var(--field-inset) - var(--field-pad));
	}

	.tags {
		display: contents;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.chip {
		--chip-rest-bg: var(--surface-subtle);
		--chip-rest-border: transparent;
	}
	.chip.is-toned {
		--chip-rest-bg: color-mix(in oklch, var(--tone) 14%, transparent);
		color: color-mix(in oklab, var(--tone) 70%, var(--text-strong));
	}
	.chip:has(.remove:focus-visible) {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}
	.remove:focus-visible {
		outline: none;
	}

	input {
		flex: 1 1 4rem;
		min-width: 4rem;
		height: var(--z-chip-height);
		padding: 0 var(--space-1);
		appearance: none;
		background: transparent;
		border: none;
		outline: none;
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		line-height: var(--line-height-none);
	}

	/* Lines the text up with z-input's: its padding plus the gap
	   after its (empty) prefix adornment. */
	input.is-leading {
		padding-inline-start: calc(var(--field-inset) + var(--space-2-5) - var(--field-pad));
	}

	input::placeholder {
		color: var(--text-secondary);
	}

	input::-webkit-calendar-picker-indicator {
		display: none !important;
	}

	::slotted(svg) {
		width: 1.125em;
		height: 1.125em;
	}
`, Ke = (t) => t === "sm" ? "is-sm" : t === "lg" ? "is-lg" : "is-md", Le = (t, l) => {
  if (l.length === 0) return null;
  const r = new FormData();
  for (const c of l) r.append(t, c);
  return r;
}, qe = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), Z = (t, l) => {
  const p = l ? `|${qe(l)}` : "", r = new RegExp(`\\n${p}`);
  return t.split(r).map((m) => m.trim()).filter(Boolean);
}, Ne = (t) => t.selectionStart !== t.selectionEnd ? !1 : t.selectionStart === 0, $e = be(
  (t) => {
    const l = ke(), p = Be(t.label), r = D(), c = D(), [f, m] = Ae("value"), [A, z] = C(""), [k, _] = C(!1), [G, J] = C(!1), Q = Array.isArray(f) ? f : [], U = D(Q), d = Array.isArray(f) ? f : [], g = D(d);
    g.current = d;
    const v = d.length, y = v > 0, u = t.delimiter ?? ",", T = typeof t.max == "number", W = T && v >= t.max, I = t.name ?? "", F = De({
      value: Le(I, d),
      isDisabled: t.isDisabled,
      isReadonly: t.isReadonly,
      control: r,
      onReset: () => {
        z(""), m(U.current);
      },
      onRestore: (e) => {
        e instanceof FormData && m(e.getAll(I).map(String));
      }
    }), S = !!t.isDisabled || F.isFormDisabled, w = !S && !t.isReadonly, P = (e) => {
      g.current = e, m(e), t.change({ value: e });
    }, K = (e) => {
      const n = [...g.current], s = [];
      for (const i of e) {
        if (T && n.length >= t.max) break;
        n.includes(i) && !t.canDuplicate || (n.push(i), s.push(i));
      }
      if (!(s.length > 0)) return 0;
      P(n);
      for (const i of s) t.add({ value: i });
      return s.length;
    }, L = () => {
      var e;
      return ((e = r.current) == null ? void 0 : e.value) ?? A;
    }, X = () => {
      const e = r.current;
      e && (e.value = ""), z("");
    }, q = () => {
      const e = Z(L(), u);
      return e.length > 0 ? (K(e), X(), !0) : !1;
    }, N = (e) => {
      const n = g.current, s = n[e], o = n.filter((i, h) => h !== e);
      P(o), t.remove({ value: s, index: e });
    }, Y = () => {
      const e = c.current;
      return e ? [...e.querySelectorAll(".remove")] : [];
    }, b = (e) => {
      var o;
      const s = Y()[e];
      if (s) {
        s.focus();
        return;
      }
      (o = r.current) == null || o.focus();
    }, B = () => {
      var e;
      return (e = r.current) == null ? void 0 : e.focus();
    }, E = (e) => {
      const n = e.currentTarget;
      if (e.isComposing) return;
      const o = e.key === "Enter", i = !!u && e.key === u, h = L().trim().length > 0;
      if (o && !h) {
        e.preventDefault(), F.requestSubmit();
        return;
      }
      if (o || i) {
        e.preventDefault(), q();
        return;
      }
      (e.key === "Backspace" || e.key === "ArrowLeft") && y && Ne(n) && w && (e.preventDefault(), b(v - 1));
    }, ee = (e, n) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault(), N(n);
        const i = Math.max(0, n - 1);
        if (v - 1 > 0) {
          requestAnimationFrame(() => b(i));
          return;
        }
        B();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault(), b(Math.max(0, n - 1));
        return;
      }
      (e.key === "ArrowRight" || e.key === "Escape") && (e.preventDefault(), b(n + 1));
    }, te = (e, n) => {
      e.stopPropagation(), N(n), B();
    }, ne = (e) => {
      e.stopPropagation();
      const n = e.target.value;
      z(n), t.input({ value: n });
    }, se = (e) => {
      var i;
      const n = ((i = e.clipboardData) == null ? void 0 : i.getData("text")) ?? "";
      (u && n.includes(u) || n.includes(`
`)) && (e.preventDefault(), K(Z(n, u)));
    }, ie = () => {
      w && !t.isDraftKeptOnBlur && q();
    }, re = (e) => {
      e.target === c.current && (e.preventDefault(), B());
    }, ae = (e) => {
      const n = e.target;
      _(n.assignedNodes().length > 0);
    }, oe = (e) => {
      const n = e.target;
      J(n.assignedNodes().length > 0);
    }, $ = !!t.isInvalid || !!t.error, le = ["field", Ke(t.size)].concat($ ? ["is-invalid"] : []).concat(S ? ["is-disabled"] : []).join(" "), ce = k ? "adornment is-prefix" : "adornment is-prefix is-empty", de = G ? "adornment is-suffix" : "adornment is-suffix is-empty", ue = !y && !k ? "is-leading" : "", fe = y ? void 0 : t.placeholder, j = (Array.isArray(t.suggestions) ? t.suggestions : []).filter((e) => !d.includes(e)), M = j.length > 0, O = Ie(t.tone), me = ["chip", O, O ? "is-toned" : ""].filter(Boolean).join(" "), he = !!t.isRequired && !y, pe = !!t.isReadonly || W;
    return /* @__PURE__ */ R("host", { shadowDom: { delegatesFocus: !0 }, children: [
      /* @__PURE__ */ R("div", { ref: c, class: le, part: "field", onpointerdown: re, children: [
        /* @__PURE__ */ a("span", { class: ce, children: /* @__PURE__ */ a("slot", { name: "prefix", onslotchange: ae }) }),
        /* @__PURE__ */ a("ul", { class: "tags", role: "list", children: d.map((e, n) => /* @__PURE__ */ R("li", { class: me, children: [
          /* @__PURE__ */ a("span", { class: "label", children: e }),
          w && /* @__PURE__ */ a(
            "button",
            {
              class: "remove",
              type: "button",
              tabindex: "-1",
              "aria-label": l("removeItem", { label: e }),
              onclick: (s) => te(s, n),
              onkeydown: (s) => ee(s, n),
              children: /* @__PURE__ */ a(Fe, {})
            }
          )
        ] }, `${e}-${n}`)) }),
        /* @__PURE__ */ a(
          "input",
          {
            ref: r,
            class: ue,
            type: "text",
            value: A,
            placeholder: fe,
            disabled: S,
            readonly: pe ? !0 : void 0,
            required: he,
            enterkeyhint: "enter",
            autocomplete: "off",
            list: M ? "suggestions" : void 0,
            "aria-label": p,
            "aria-describedby": Re(t.description, t.error),
            "aria-invalid": $ ? "true" : void 0,
            onkeydown: E,
            oninput: ne,
            onchange: (e) => e.stopPropagation(),
            onpaste: se,
            onblur: ie
          }
        ),
        M && /* @__PURE__ */ a("datalist", { id: "suggestions", children: j.map((e) => /* @__PURE__ */ a("option", { value: e })) }),
        /* @__PURE__ */ a("span", { class: de, children: /* @__PURE__ */ a("slot", { name: "suffix", onslotchange: oe }) })
      ] }),
      Ce(t.description, t.error)
    ] });
  },
  {
    props: {
      ...we,
      value: { type: V() },
      suggestions: { type: V() },
      name: { type: String, reflect: !0 },
      label: String,
      placeholder: String,
      delimiter: String,
      max: { type: Number, reflect: !0 },
      size: { type: H("sm", "md", "lg"), reflect: !0 },
      tone: { type: H("primary", "secondary", "tertiary", "success", "warning", "danger"), reflect: !0 },
      canDuplicate: { type: Boolean, reflect: !0 },
      isDraftKeptOnBlur: { type: Boolean, reflect: !0 },
      isInvalid: { type: Boolean, reflect: !0 },
      isRequired: { type: Boolean, reflect: !0 },
      isReadonly: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      input: x({ bubbles: !0, composed: !0 }),
      change: x({ bubbles: !0, composed: !0 }),
      add: x({ bubbles: !0, composed: !0 }),
      remove: x({ bubbles: !0, composed: !0 })
    },
    styles: [Te, Pe, xe, Se],
    form: !0
  }
);
ze("z-tag-input", $e);
export {
  $e as ZTagInput
};
