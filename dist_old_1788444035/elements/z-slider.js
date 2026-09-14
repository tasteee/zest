import { c as m, a as b, e as l, g as n, j as s, d as v } from "../chunks/define-element-BWC3wEPr.js";
import { u as g } from "../chunks/use-prop-DBBKVpkc.js";
const p = m`
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
		margin-left: auto;
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

	:host([accent='dom']) {
		--accent: var(--purple);
	}

	:host([accent='sub']) {
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
		transition: transform 0.1s ease;
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
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}
	input:focus-visible::-moz-range-thumb {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}
`, f = b(
  (e) => {
    const [c, u] = g("value"), a = e.min ?? 0, r = e.max ?? 100, t = c ?? a, d = r > a ? (t - a) / (r - a) * 100 : 0, h = !!e.label || e.doesShowValue;
    return /* @__PURE__ */ n("host", { shadowDom: !0, style: { "--fill": `${d}%` }, children: [
      h && /* @__PURE__ */ n("div", { class: "header", children: [
        e.label && /* @__PURE__ */ s("span", { class: "label", children: e.label }),
        e.doesShowValue && /* @__PURE__ */ n("span", { class: "value", children: [
          e.valuePrefix,
          t,
          e.valueSuffix
        ] })
      ] }),
      /* @__PURE__ */ s(
        "input",
        {
          type: "range",
          min: a,
          max: r,
          step: e.step ?? 1,
          value: t,
          name: e.name,
          disabled: e.isDisabled,
          "aria-label": e.label,
          oninput: (i) => {
            const o = Number(i.target.value);
            u(o), e.input({ value: o });
          },
          onchange: (i) => {
            e.change({ value: Number(i.target.value) });
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
      name: String,
      label: String,
      doesShowValue: { type: Boolean, reflect: !0 },
      valuePrefix: String,
      valueSuffix: String,
      accent: { type: String, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      input: l({ bubbles: !0, composed: !0 }),
      change: l({ bubbles: !0, composed: !0 })
    },
    styles: p
  }
);
v("z-slider", f);
export {
  f as ZSlider
};
