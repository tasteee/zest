import { c as o, a as l, e as c, j as a, g as d, d as h } from "../chunks/define-element-BWC3wEPr.js";
import { u as m } from "../chunks/use-prop-DBBKVpkc.js";
const b = o`
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

	:host([accent='dom']) label {
		--accent: var(--purple);
	}

	:host([accent='sub']) label {
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
		transition: background-color 0.16s ease, border-color 0.16s ease;
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
		background: var(--material-raised), var(--muted-foreground);
		box-shadow: var(--elevation-raised);
		transition: transform 0.16s var(--easing-standard, ease-out), background-color 0.16s ease;
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
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}
`, u = (e) => e.size === "sm" ? "is-sm" : e.size === "lg" ? "is-lg" : "is-md", g = l(
  (e) => {
    const [r, i] = m("isChecked"), s = ["label", u(e)].concat(e.isDisabled ? ["is-disabled"] : []).join(" "), n = ["track"].concat(r ? ["is-on"] : []).join(" ");
    return /* @__PURE__ */ a("host", { shadowDom: !0, onclick: () => {
      if (e.isDisabled) return;
      const t = !r;
      i(t), e.change({ checked: t, value: e.value });
    }, children: /* @__PURE__ */ d("label", { class: s, children: [
      /* @__PURE__ */ a(
        "input",
        {
          type: "checkbox",
          role: "switch",
          checked: r,
          name: e.name,
          value: e.value,
          disabled: e.isDisabled,
          "aria-checked": r ? "true" : "false",
          onchange: (t) => t.stopPropagation()
        }
      ),
      /* @__PURE__ */ a("span", { class: n, "aria-hidden": "true", children: /* @__PURE__ */ a("span", { class: "knob" }) }),
      /* @__PURE__ */ a("slot", {})
    ] }) });
  },
  {
    props: {
      isChecked: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      isFullWidth: { type: Boolean, reflect: !0 },
      size: { type: String, reflect: !0 },
      accent: { type: String, reflect: !0 },
      name: String,
      value: String,
      change: c({ bubbles: !0, composed: !0 })
    },
    styles: b
  }
);
h("z-switch", g);
export {
  g as ZSwitch
};
