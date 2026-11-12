// @ts-self-types="./z-input-otp.d.ts"
import { c as F, a as O, e as y, u as P, f as w, j as f } from "../chunks/define-element-BZUk-KLk.js";
import { u as T, d as q } from "../chunks/form-control-CrK-0rhn.js";
import { u as E } from "../chunks/locale-Bb4aqXuR.js";
import { u as V } from "../chunks/use-prop-C0_HeSQ9.js";
import { o as z } from "../chunks/prop-types-B3Bpi956.js";
const H = F`
	:host {
		display: inline-flex;
		--tone: var(--accent-primary);
	}

	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}

	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
	}

	:host([is-hidden]) {
		display: none;
	}

	.cells {
		display: inline-flex;
		gap: var(--space-2);
	}

	.cell {
		width: 2.75rem;
		height: 3.25rem;
		text-align: center;
		background: transparent;
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-semibold);
		caret-color: var(--tone);
		transition:
			border-color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter),
			color var(--motion-fast) var(--ease-enter);
		appearance: none;
		outline: none;
		box-sizing: border-box;
	}

	.cell.is-sm {
		width: 2.25rem;
		height: 2.75rem;
		font-size: var(--font-size-xl);
	}
	.cell.is-lg {
		width: 3.25rem;
		height: 3.75rem;
		font-size: var(--font-size-3xl);
	}

	.cell:hover {
		border-color: color-mix(in oklch, var(--text-primary) 30%, transparent);
	}

	.cell.is-filled {
		color: var(--tone);
		/* srgb: oklch drifts the hue when mixing --tone against the hue-carrying --border-default. */
		border-color: color-mix(in srgb, var(--tone) 45%, var(--border-default));
	}

	.cell:focus {
		border-color: var(--tone);
		background: color-mix(in oklch, var(--tone) 6%, transparent);
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	.cell.is-invalid {
		border-color: var(--status-danger);
		color: var(--status-danger);
	}

	.cell:disabled {
		opacity: 0.5;
		pointer-events: none;
	}
`, L = (r) => r.size === "sm" ? "is-sm" : r.size === "lg" ? "is-lg" : "", K = O(
  (r) => {
    var g;
    const d = P(), m = E(), [i, c] = V("value"), k = w(i ?? ""), h = w(), s = r.length || 6, l = (i || "").slice(0, s).split(""), D = l.length === s && l.every((e) => e !== ""), { isFormDisabled: C } = T({
      value: i ?? "",
      isDisabled: r.isDisabled,
      control: h,
      validity: r.isRequired && !D ? { flags: { valueMissing: !0 }, message: m("enterTheCode", { length: s }) } : { flags: {} },
      onReset: () => c(k.current),
      onRestore: (e) => {
        typeof e == "string" && c(e);
      }
    }), R = r.isDisabled || C, A = L(r), n = (e) => {
      const t = d.current.shadowRoot, o = t == null ? void 0 : t.querySelectorAll(".cell")[e];
      o == null || o.focus(), o == null || o.select();
    }, B = (e, t) => {
      const o = (i || "").padEnd(s, " ").slice(0, s).split("");
      return o[e] = t || " ", o.join("").trimEnd();
    }, x = (e) => e.length === s && !e.includes(" "), v = (e) => {
      c(e), r.change({ value: e }), x(e) && r.complete({ value: e });
    }, u = (e, t) => {
      v(B(e, t));
    }, I = (e) => (t) => {
      const a = t.target.value.slice(-1);
      if (r.isNumeric && a && !/[0-9]/.test(a)) {
        t.target.value = l[e] || "";
        return;
      }
      u(e, a), a && e < s - 1 && n(e + 1);
    }, N = (e) => (t) => {
      t.key === "Backspace" ? !l[e] && e > 0 ? (n(e - 1), u(e - 1, ""), t.preventDefault()) : u(e, "") : t.key === "ArrowLeft" && e > 0 ? n(e - 1) : t.key === "ArrowRight" && e < s - 1 && n(e + 1);
    }, S = (e) => {
      var b;
      e.preventDefault();
      const t = ((b = e.clipboardData) == null ? void 0 : b.getData("text")) || "", a = (r.isNumeric ? t.replace(/[^0-9]/g, "") : t.replace(/\s/g, "")).slice(0, s);
      if (!(a.length > 0)) return;
      v(a);
      const j = a.length === s;
      n(j ? s - 1 : a.length);
    };
    return /* @__PURE__ */ f("host", { shadowDom: !0, children: /* @__PURE__ */ f(
      "div",
      {
        class: "cells",
        role: "group",
        "aria-label": r.label || ((g = d.current) == null ? void 0 : g.getAttribute("aria-label")) || "One-time code",
        onpaste: S,
        children: Array.from({ length: s }).map((e, t) => {
          const o = l[t] && l[t] !== " " ? l[t] : "", a = ["cell", A].filter(Boolean).concat(o ? ["is-filled"] : []).concat(r.isInvalid ? ["is-invalid"] : []).join(" ");
          return /* @__PURE__ */ f(
            "input",
            {
              class: a,
              type: "text",
              inputmode: r.isNumeric ? "numeric" : "text",
              maxlength: 1,
              value: o,
              ref: t === 0 ? h : void 0,
              disabled: R,
              "aria-label": m("digitOf", { index: t + 1, length: s }),
              oninput: I(t),
              onkeydown: N(t),
              onfocus: (p) => p.target.select()
            },
            t
          );
        })
      }
    ) });
  },
  {
    props: {
      value: { type: String, reflect: !0 },
      label: String,
      length: { type: Number, reflect: !0 },
      size: { type: z("sm", "md", "lg"), reflect: !0 },
      tone: { type: z("primary", "secondary", "tertiary"), reflect: !0 },
      isNumeric: { type: Boolean, reflect: !0 },
      name: { type: String, reflect: !0 },
      isRequired: { type: Boolean, reflect: !0 },
      isInvalid: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: y({ bubbles: !0, composed: !0 }),
      complete: y({ bubbles: !0, composed: !0 })
    },
    styles: H,
    form: !0
  }
);
q("z-input-otp", K);
export {
  K as ZInputOtp
};
