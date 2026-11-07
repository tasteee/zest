import { c as k, a as p, e as y, u as x, f as l, g as c, j as s } from "../chunks/define-element-BZUk-KLk.js";
import { i as w } from "../chunks/interaction-styles-XiKFAbWA.js";
import { u as C, d as z } from "../chunks/form-control-D_UwalCr.js";
import { s as D, d as B, u as S, a as j, r as R } from "../chunks/accessible-NC1hpH4S.js";
import { u as F } from "../chunks/use-prop-C0_HeSQ9.js";
import { o as d } from "../chunks/prop-types-B3Bpi956.js";
const P = k`
	:host {
		display: inline-flex;
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([is-full-width]) {
		display: flex;
	}

	label {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 0.625rem;
		min-height: var(--control-height-md);
		cursor: pointer;
		font-family: inherit;
		font-size: var(--font-size-small);
		color: var(--foreground);
		user-select: none;
		--accent: var(--primary);
	}

	label.is-sm { min-height: var(--control-height-sm); }
	label.is-lg { min-height: var(--control-height-lg); }

	:host([tone='secondary']) label {
		--accent: var(--purple);
	}

	:host([tone='tertiary']) label {
		--accent: var(--pink);
	}

	label.is-disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	.track {
		position: relative;
		display: inline-flex;
		align-items: center;
		flex-shrink: 0;
		width: 2.5rem;
		height: 1.375rem;
		padding: 2px;
		border: 1px solid var(--border);
		border-radius: 999px;
		/* The track is a channel the knob slides along — carved, not raised.
		   Inert in the flat themes. */
		background: var(--material-surface);
		box-shadow: var(--elevation-carved);
		box-sizing: border-box;
		transition:
			background-color var(--motion-fast) var(--ease-enter),
			border-color var(--motion-fast) var(--ease-enter);
	}

	label.is-sm .track {
		width: 2.125rem;
		height: 1.2rem;
	}
	label.is-lg .track {
		width: 3rem;
		height: 1.625rem;
	}

	label:hover .track {
		border-color: color-mix(in oklch, var(--foreground) 40%, transparent);
	}

	.track.is-on {
		--emissive-color: var(--accent);
		background: var(--material-tone), var(--accent);
		box-shadow: var(--elevation-carved), var(--emissive-tone);
		border-color: var(--accent);
	}

	/* The knob is the one part of a switch that is unambiguously an object
	   sitting on top of something else, so it takes the raised stack. */
	.knob {
		width: calc(1.375rem - 6px);
		height: calc(1.375rem - 6px);
		border-radius: 999px;
		background: var(--muted-foreground);
		transition:
			transform var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	label.is-sm .knob {
		width: calc(1.2rem - 6px);
		height: calc(1.2rem - 6px);
	}
	label.is-lg .knob {
		width: calc(1.625rem - 6px);
		height: calc(1.625rem - 6px);
	}

	.track.is-on .knob {
		background: var(--primary-foreground);
		transform: translateX(calc(2.5rem - 1.375rem));
	}
	label.is-sm .track.is-on .knob {
		transform: translateX(calc(2.125rem - 1.2rem));
	}
	label.is-lg .track.is-on .knob {
		transform: translateX(calc(3rem - 1.625rem));
	}

	input {
		position: absolute;
		inset: 0;
		z-index: 1;
		opacity: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		cursor: inherit;
	}

	input:focus-visible + .track {
		outline: 3px solid var(--focus-ring);
		outline-offset: 2px;
	}
`, q = (e) => e.size === "sm" ? "is-sm" : e.size === "lg" ? "is-lg" : "is-md", X = p(
  (e) => {
    const h = x(), m = S(e.label), o = l(), [a, t] = F("isChecked"), u = l(!!a), { isFormDisabled: b } = C({
      value: a ? e.value ?? "on" : null,
      isDisabled: e.isDisabled,
      control: o,
      onReset: () => t(u.current),
      onRestore: (r) => t(r != null && r !== "")
    }), i = e.isDisabled || b, f = ["label", q(e)].concat(i ? ["is-disabled"] : []).join(" "), v = ["track"].concat(a ? ["is-on"] : []).join(" "), g = () => {
      if (i) return;
      const r = !a;
      t(r), e.change({ checked: r, value: e.value });
    };
    return /* @__PURE__ */ c("host", { shadowDom: { delegatesFocus: !0 }, onclick: (r) => {
      r.composedPath()[0] === h.current && g();
    }, children: [
      /* @__PURE__ */ c("label", { class: f, children: [
        /* @__PURE__ */ s(
          "input",
          {
            ref: o,
            type: "checkbox",
            role: "switch",
            checked: a,
            value: e.value,
            disabled: i,
            required: e.isRequired,
            "aria-label": m,
            "aria-describedby": j(e.description, e.error),
            "aria-invalid": e.error ? "true" : void 0,
            "aria-checked": a ? "true" : "false",
            onchange: (r) => {
              if (r.stopPropagation(), i) return;
              const n = r.target.checked;
              t(n), e.change({ checked: n, value: e.value });
            }
          }
        ),
        /* @__PURE__ */ s("span", { class: v, "aria-hidden": "true", children: /* @__PURE__ */ s("span", { class: "knob" }) }),
        /* @__PURE__ */ s("slot", {})
      ] }),
      R(e.description, e.error)
    ] });
  },
  {
    props: {
      ...B,
      isChecked: { type: Boolean, reflect: !0 },
      isRequired: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      isFullWidth: { type: Boolean, reflect: !0 },
      size: { type: d("sm", "md", "lg"), reflect: !0 },
      tone: { type: d("primary", "secondary", "tertiary"), reflect: !0 },
      name: { type: String, reflect: !0 },
      value: String,
      label: String,
      change: y({ bubbles: !0, composed: !0 })
    },
    styles: [P, w, D],
    form: !0
  }
);
z("z-switch", X);
export {
  X as ZSwitch
};
