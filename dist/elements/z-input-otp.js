import { c as O, a as P, e as y, u as T, f as k, j as f } from "../chunks/define-element-BZUk-KLk.js";
import { u as q, d as E } from "../chunks/form-control-D_UwalCr.js";
import { u as V } from "../chunks/locale-DUDaH1Ni.js";
import { u as H } from "../chunks/use-prop-C0_HeSQ9.js";
import { o as w } from "../chunks/prop-types-B3Bpi956.js";
const L = O`
	:host {
		display: inline-flex;
		--accent: var(--primary);
	}

	:host([tone='secondary']) {
		--accent: var(--purple);
	}

	:host([tone='tertiary']) {
		--accent: var(--pink);
	}

	:host([is-hidden]) {
		display: none;
	}

	.cells {
		display: inline-flex;
		gap: 0.5rem;
	}

	.cell {
		width: 2.75rem;
		height: 3.25rem;
		text-align: center;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		color: var(--foreground);
		font-family: var(--font-mono);
		font-size: var(--font-size-h3);
		font-weight: 600;
		caret-color: var(--accent);
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
		font-size: var(--font-size-h4);
	}
	.cell.is-lg {
		width: 3.25rem;
		height: 3.75rem;
		font-size: var(--font-size-h2);
	}

	.cell:hover {
		border-color: color-mix(in oklch, var(--foreground) 30%, transparent);
	}

	.cell.is-filled {
		color: var(--accent);
		/* srgb: oklch drifts the hue when mixing --accent against the hue-carrying --border. */
		border-color: color-mix(in srgb, var(--accent) 45%, var(--border));
	}

	.cell:focus {
		border-color: var(--accent);
		background: color-mix(in oklch, var(--accent) 6%, transparent);
		outline: 3px solid var(--focus-ring);
		outline-offset: 1px;
	}

	.cell.is-invalid {
		border-color: var(--destructive);
		color: var(--destructive);
	}

	.cell:disabled {
		opacity: 0.5;
		pointer-events: none;
	}
`, x = (r) => r.size === "sm" ? "is-sm" : r.size === "lg" ? "is-lg" : "", K = P(
  (r) => {
    var g;
    const d = T(), m = V(), [i, c] = H("value"), z = k(i ?? ""), h = k(), s = r.length || 6, l = (i || "").slice(0, s).split(""), D = l.length === s && l.every((e) => e !== ""), { isFormDisabled: C } = q({
      value: i ?? "",
      isDisabled: r.isDisabled,
      control: h,
      validity: r.isRequired && !D ? { flags: { valueMissing: !0 }, message: m("enterTheCode", { length: s }) } : { flags: {} },
      onReset: () => c(z.current),
      onRestore: (e) => {
        typeof e == "string" && c(e);
      }
    }), R = r.isDisabled || C, A = x(r), n = (e) => {
      const t = d.current.shadowRoot, o = t == null ? void 0 : t.querySelectorAll(".cell")[e];
      o == null || o.focus(), o == null || o.select();
    }, B = (e, t) => {
      const o = (i || "").padEnd(s, " ").slice(0, s).split("");
      return o[e] = t || " ", o.join("").trimEnd();
    }, I = (e) => e.length === s && !e.includes(" "), v = (e) => {
      c(e), r.change({ value: e }), I(e) && r.complete({ value: e });
    }, u = (e, t) => {
      v(B(e, t));
    }, N = (e) => (t) => {
      const a = t.target.value.slice(-1);
      if (r.isNumeric && a && !/[0-9]/.test(a)) {
        t.target.value = l[e] || "";
        return;
      }
      u(e, a), a && e < s - 1 && n(e + 1);
    }, S = (e) => (t) => {
      t.key === "Backspace" ? !l[e] && e > 0 ? (n(e - 1), u(e - 1, ""), t.preventDefault()) : u(e, "") : t.key === "ArrowLeft" && e > 0 ? n(e - 1) : t.key === "ArrowRight" && e < s - 1 && n(e + 1);
    }, j = (e) => {
      var b;
      e.preventDefault();
      const t = ((b = e.clipboardData) == null ? void 0 : b.getData("text")) || "", a = (r.isNumeric ? t.replace(/[^0-9]/g, "") : t.replace(/\s/g, "")).slice(0, s);
      if (!(a.length > 0)) return;
      v(a);
      const F = a.length === s;
      n(F ? s - 1 : a.length);
    };
    return /* @__PURE__ */ f("host", { shadowDom: !0, children: /* @__PURE__ */ f(
      "div",
      {
        class: "cells",
        role: "group",
        "aria-label": r.label || ((g = d.current) == null ? void 0 : g.getAttribute("aria-label")) || "One-time code",
        onpaste: j,
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
              oninput: N(t),
              onkeydown: S(t),
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
      size: { type: w("sm", "md", "lg"), reflect: !0 },
      tone: { type: w("primary", "secondary", "tertiary"), reflect: !0 },
      isNumeric: { type: Boolean, reflect: !0 },
      name: { type: String, reflect: !0 },
      isRequired: { type: Boolean, reflect: !0 },
      isInvalid: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: y({ bubbles: !0, composed: !0 }),
      complete: y({ bubbles: !0, composed: !0 })
    },
    styles: L,
    form: !0
  }
);
E("z-input-otp", K);
export {
  K as ZInputOtp
};
