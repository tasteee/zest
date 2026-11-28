// @ts-self-types="./z-slider.d.ts"
import { c as M, a as P, e as x, f as c, g as d, j as i } from "../chunks/define-element-BZUk-KLk.js";
import { i as j } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as T, d as W } from "../chunks/form-control-B69z9f8A.js";
import { u as q } from "../chunks/accessible-D6muJfYC.js";
import { u as A } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as m } from "../chunks/hooks-DEFT8qqt.js";
import { o as E } from "../chunks/prop-types-CSJu2W-0.js";
const K = M`
	:host {
		display: block;
		width: 100%;
		--tone: var(--accent-primary);
	}

	/* Header row: label left, center slot in the middle, value pill right. */
	.header {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		margin-bottom: var(--space-2);
	}

	.header[hidden] {
		display: none;
	}

	.start {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.start:not(.hasContent) {
		display: none;
	}

	.value-slot {
		display: contents;
	}

	.center {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		flex: 1;
		min-width: 0;
	}

	:host([can-reset]) .label {
		-webkit-user-select: none;
		user-select: none;
	}

	.label {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-primary);
		line-height: var(--line-height-tight);
	}

	.value {
		/* margin-left keeps the value flush-right even when there's no label. */
		margin-inline-start: auto;
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		font-variant-numeric: tabular-nums;
		color: var(--tone);
		background: color-mix(in oklch, var(--tone) 12%, transparent);
		padding: var(--space-0-5) var(--space-2);
		border-radius: var(--radius-full);
		line-height: var(--line-height-snug);
		white-space: nowrap;
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
		border-radius: var(--radius-full);
		background: linear-gradient(
			to right,
			var(--tone) 0%,
			var(--tone) var(--fill, 0%),
			var(--border-default) var(--fill, 0%),
			var(--border-default) 100%
		);
	}

	/* Firefox track + progress */
	input::-moz-range-track {
		height: 4px;
		border-radius: var(--radius-full);
		background: var(--border-default);
	}
	input::-moz-range-progress {
		height: 4px;
		border-radius: var(--radius-full);
		background: var(--tone);
	}

	input::-webkit-slider-thumb {
		appearance: none;
		width: 1rem;
		height: 1rem;
		margin-top: -6px;
		border-radius: var(--radius-full);
		background: var(--tone);
		border: 2px solid var(--surface-page);
		transition: transform var(--motion-instant) var(--ease-enter);
	}
	input::-webkit-slider-thumb:active {
		transform: scale(1.15);
	}

	/* Firefox thumb */
	input::-moz-range-thumb {
		width: 1rem;
		height: 1rem;
		border-radius: var(--radius-full);
		background: var(--tone);
		border: 2px solid var(--surface-page);
	}

	input:focus-visible::-webkit-slider-thumb {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}
	input:focus-visible::-moz-range-thumb {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}
`, O = P(
  (t) => {
    const [h, o] = A("value"), f = c(), b = c(h), [w, k] = m(!1), [g, S] = m(!1), [N, z] = m(!1), l = c({ at: 0, fill: 0 }), R = q(t.label), a = t.min ?? 0, n = t.max ?? 100, s = Math.min(n, Math.max(a, h ?? a)), { isFormDisabled: D } = T({
      value: String(s),
      isDisabled: t.isDisabled,
      control: f,
      onReset: () => o(b.current),
      onRestore: (e) => {
        typeof e == "string" && e !== "" && o(Number(e));
      }
    }), v = t.isDisabled || D, p = n > a ? (s - a) / (n - a) * 100 : 0, F = !!t.label || t.doesShowValue || w || g || N, V = g ? "start hasContent" : "start", y = () => {
      if (!t.canReset || v) return;
      const e = Math.min(n, Math.max(a, b.current ?? a));
      e !== s && (o(e), t.input({ value: e }), t.change({ value: e }));
    }, C = (e) => {
      const r = e.timeStamp - l.current.at > 600;
      l.current = { at: e.timeStamp, fill: r ? p : l.current.fill };
    }, H = (e) => {
      const r = e.currentTarget, u = 16, B = u / 2 + (r.clientWidth - u) * l.current.fill / 100;
      Math.abs(e.offsetX - B) <= u && y();
    };
    return /* @__PURE__ */ d("host", { shadowDom: { delegatesFocus: !0 }, style: { "--fill": `${p}%` }, children: [
      /* @__PURE__ */ d("div", { class: "header", hidden: !F, children: [
        /* @__PURE__ */ i(
          "slot",
          {
            name: "start",
            class: V,
            onslotchange: (e) => S(e.target.assignedNodes().length > 0)
          }
        ),
        t.label && /* @__PURE__ */ i("span", { class: "label", ondblclick: y, children: t.label }),
        /* @__PURE__ */ i(
          "slot",
          {
            name: "center",
            class: "center",
            onslotchange: (e) => k(e.target.assignedNodes().length > 0)
          }
        ),
        /* @__PURE__ */ i(
          "slot",
          {
            name: "value",
            class: "value-slot",
            onslotchange: (e) => z(e.target.assignedNodes().length > 0),
            children: t.doesShowValue && /* @__PURE__ */ d("span", { class: "value", children: [
              t.valuePrefix,
              s,
              t.valueSuffix
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ i(
        "input",
        {
          ref: f,
          type: "range",
          min: a,
          max: n,
          step: t.step ?? 1,
          value: s,
          disabled: v,
          "aria-label": R,
          onpointerdown: t.canReset ? C : void 0,
          ondblclick: t.canReset ? H : void 0,
          oninput: (e) => {
            e.stopPropagation();
            const r = Number(e.target.value);
            o(r), t.input({ value: r });
          },
          onchange: (e) => {
            e.stopPropagation(), t.change({ value: Number(e.target.value) });
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
      canReset: { type: Boolean, reflect: !0 },
      valuePrefix: String,
      valueSuffix: String,
      tone: { type: E("primary", "secondary", "tertiary"), reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      input: x({ bubbles: !0, composed: !0 }),
      change: x({ bubbles: !0, composed: !0 })
    },
    styles: [K, j],
    form: !0
  }
);
W("z-slider", O);
export {
  O as ZSlider
};
