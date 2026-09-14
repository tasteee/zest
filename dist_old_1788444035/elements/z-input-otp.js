import { c as C, a as B, e as m, u as S, j as i, d as I } from "../chunks/define-element-BWC3wEPr.js";
import { u as N } from "../chunks/use-prop-DBBKVpkc.js";
const j = C`
	:host {
		display: inline-flex;
		--accent: var(--primary);
	}

	:host([accent='dom']) {
		--accent: var(--purple);
	}

	:host([accent='sub']) {
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
		transition: border-color 0.12s ease, background-color 0.12s ease, color 0.12s ease;
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
		outline: 3px solid color-mix(in oklch, var(--ring) 40%, transparent);
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
`, P = (o) => o.size === "sm" ? "is-sm" : o.size === "lg" ? "is-lg" : "", E = B(
  (o) => {
    var f;
    const u = S(), [h, v] = N("value"), l = o.length || 6, a = (h || "").slice(0, l).split(""), b = P(o), c = (e) => {
      const t = u.current.shadowRoot, r = t == null ? void 0 : t.querySelectorAll(".cell")[e];
      r == null || r.focus(), r == null || r.select();
    }, y = (e, t) => {
      const r = (h || "").padEnd(l, " ").slice(0, l).split("");
      return r[e] = t || " ", r.join("").trimEnd();
    }, k = (e) => e.length === l && !e.includes(" "), d = (e) => {
      v(e), o.change({ value: e }), k(e) && o.complete({ value: e });
    }, n = (e, t) => {
      d(y(e, t));
    }, w = (e) => (t) => {
      const s = t.target.value.slice(-1);
      if (o.isNumeric && s && !/[0-9]/.test(s)) {
        t.target.value = a[e] || "";
        return;
      }
      n(e, s), s && e < l - 1 && c(e + 1);
    }, z = (e) => (t) => {
      t.key === "Backspace" ? !a[e] && e > 0 ? (c(e - 1), n(e - 1, ""), t.preventDefault()) : n(e, "") : t.key === "ArrowLeft" && e > 0 ? c(e - 1) : t.key === "ArrowRight" && e < l - 1 && c(e + 1);
    }, D = (e) => {
      var p;
      e.preventDefault();
      const t = ((p = e.clipboardData) == null ? void 0 : p.getData("text")) || "", s = (o.isNumeric ? t.replace(/[^0-9]/g, "") : t.replace(/\s/g, "")).slice(0, l);
      if (!(s.length > 0)) return;
      d(s);
      const A = s.length === l;
      c(A ? l - 1 : s.length);
    };
    return /* @__PURE__ */ i("host", { shadowDom: !0, children: /* @__PURE__ */ i(
      "div",
      {
        class: "cells",
        role: "group",
        "aria-label": o.label || ((f = u.current) == null ? void 0 : f.getAttribute("aria-label")) || "One-time code",
        onpaste: D,
        children: Array.from({ length: l }).map((e, t) => {
          const r = a[t] && a[t] !== " " ? a[t] : "", s = ["cell", b].filter(Boolean).concat(r ? ["is-filled"] : []).concat(o.isInvalid ? ["is-invalid"] : []).join(" ");
          return /* @__PURE__ */ i(
            "input",
            {
              class: s,
              type: "text",
              inputmode: o.isNumeric ? "numeric" : "text",
              maxlength: 1,
              value: r,
              disabled: o.isDisabled,
              "aria-label": `Digit ${t + 1}`,
              oninput: w(t),
              onkeydown: z(t),
              onfocus: (g) => g.target.select()
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
      size: { type: String, reflect: !0 },
      accent: { type: String, reflect: !0 },
      isNumeric: { type: Boolean, reflect: !0 },
      isInvalid: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: m({ bubbles: !0, composed: !0 }),
      complete: m({ bubbles: !0, composed: !0 })
    },
    styles: j
  }
);
I("z-input-otp", E);
export {
  E as ZInputOtp
};
