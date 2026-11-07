import { c as x, a as y, e as c, f as d, g as o, j as m } from "../chunks/define-element-BZUk-KLk.js";
import { i as k } from "../chunks/interaction-styles-XiKFAbWA.js";
import { u as w, d as S } from "../chunks/form-control-D_UwalCr.js";
import { u as z } from "../chunks/accessible-NC1hpH4S.js";
import { u as N } from "../chunks/use-prop-C0_HeSQ9.js";
import { o as D } from "../chunks/prop-types-B3Bpi956.js";
const F = x`
	:host {
		display: block;
		width: 100%;
		--accent: var(--primary);
	}

	/* Header row: label left, value pill right. */
	.header {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		margin-bottom: 0.5rem;
	}

	.label {
		font-size: var(--font-size-small);
		font-weight: var(--font-weight-medium);
		color: var(--foreground);
		line-height: 1.2;
	}

	.value {
		/* margin-left keeps the value flush-right even when there's no label. */
		margin-inline-start: auto;
		font-size: var(--font-size-caption);
		font-weight: var(--font-weight-semibold);
		font-variant-numeric: tabular-nums;
		color: var(--accent);
		background: color-mix(in oklch, var(--accent) 12%, transparent);
		padding: 0.125rem 0.5rem;
		border-radius: 999px;
		line-height: 1.4;
		white-space: nowrap;
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

	:host([is-disabled]) {
		opacity: 0.5;
		pointer-events: none;
	}

	input {
		appearance: none;
		width: 100%;
		height: 1rem;
		margin: 0;
		background: transparent;
		cursor: pointer;
	}

	/* WebKit track */
	input::-webkit-slider-runnable-track {
		height: 4px;
		border-radius: 999px;
		background: linear-gradient(
			to right,
			var(--accent) 0%,
			var(--accent) var(--fill, 0%),
			var(--border) var(--fill, 0%),
			var(--border) 100%
		);
	}

	/* Firefox track + progress */
	input::-moz-range-track {
		height: 4px;
		border-radius: 999px;
		background: var(--border);
	}
	input::-moz-range-progress {
		height: 4px;
		border-radius: 999px;
		background: var(--accent);
	}

	/* WebKit thumb. A fader cap: raised off the track, and lit in the accent
	   so it reads as the live part of the control. Both tokens are inert in
	   the flat themes. */
	input::-webkit-slider-thumb {
		appearance: none;
		width: 1rem;
		height: 1rem;
		margin-top: -6px;
		border-radius: 999px;
		--emissive-color: var(--accent);
		background: var(--material-raised), var(--accent);
		box-shadow: var(--elevation-raised), var(--emissive-tone);
		border: 2px solid var(--background);
		transition: transform var(--motion-instant) var(--ease-enter);
	}
	input::-webkit-slider-thumb:active {
		transform: scale(1.15);
	}

	/* Firefox thumb */
	input::-moz-range-thumb {
		width: 1rem;
		height: 1rem;
		border-radius: 999px;
		--emissive-color: var(--accent);
		background: var(--material-raised), var(--accent);
		box-shadow: var(--elevation-raised), var(--emissive-tone);
		border: 2px solid var(--background);
	}

	input:focus-visible::-webkit-slider-thumb {
		outline: 3px solid var(--focus-ring);
		outline-offset: 2px;
	}
	input:focus-visible::-moz-range-thumb {
		outline: 3px solid var(--focus-ring);
		outline-offset: 2px;
	}
`, B = y(
  (e) => {
    const [s, n] = N("value"), l = d(), b = d(s), h = z(e.label), t = e.min ?? 0, a = e.max ?? 100, i = Math.min(a, Math.max(t, s ?? t)), { isFormDisabled: v } = w({
      value: String(i),
      isDisabled: e.isDisabled,
      control: l,
      onReset: () => n(b.current),
      onRestore: (r) => {
        typeof r == "string" && r !== "" && n(Number(r));
      }
    }), f = e.isDisabled || v, p = a > t ? (i - t) / (a - t) * 100 : 0, g = !!e.label || e.doesShowValue;
    return /* @__PURE__ */ o("host", { shadowDom: { delegatesFocus: !0 }, style: { "--fill": `${p}%` }, children: [
      g && /* @__PURE__ */ o("div", { class: "header", children: [
        e.label && /* @__PURE__ */ m("span", { class: "label", children: e.label }),
        e.doesShowValue && /* @__PURE__ */ o("span", { class: "value", children: [
          e.valuePrefix,
          i,
          e.valueSuffix
        ] })
      ] }),
      /* @__PURE__ */ m(
        "input",
        {
          ref: l,
          type: "range",
          min: t,
          max: a,
          step: e.step ?? 1,
          value: i,
          disabled: f,
          "aria-label": h,
          oninput: (r) => {
            r.stopPropagation();
            const u = Number(r.target.value);
            n(u), e.input({ value: u });
          },
          onchange: (r) => {
            r.stopPropagation(), e.change({ value: Number(r.target.value) });
          }
        }
      )
    ] });
  },
  {
    props: {
      value: { type: Number, reflect: !0 },
      min: { type: Number, reflect: !0 },
      max: { type: Number, reflect: !0 },
      step: { type: Number, reflect: !0 },
      name: { type: String, reflect: !0 },
      label: String,
      doesShowValue: { type: Boolean, reflect: !0 },
      valuePrefix: String,
      valueSuffix: String,
      tone: { type: D("primary", "secondary", "tertiary"), reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      input: c({ bubbles: !0, composed: !0 }),
      change: c({ bubbles: !0, composed: !0 })
    },
    styles: [F, k],
    form: !0
  }
);
S("z-slider", B);
export {
  B as ZSlider
};
