// @ts-self-types="./z-slider.d.ts"
import { c as D, a as F, e as p, f as u, g as c, j as d } from "../chunks/define-element-BZUk-KLk.js";
import { i as B } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as M, d as P } from "../chunks/form-control-CrK-0rhn.js";
import { u as V } from "../chunks/accessible-NC1hpH4S.js";
import { u as H } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as j } from "../chunks/hooks-DEFT8qqt.js";
import { o as C } from "../chunks/prop-types-B3Bpi956.js";
const T = D`
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
`, W = F(
  (t) => {
    const [m, o] = H("value"), f = u(), h = u(m), [y, x] = j(!1), s = u({ at: 0, fill: 0 }), w = V(t.label), r = t.min ?? 0, n = t.max ?? 100, i = Math.min(n, Math.max(r, m ?? r)), { isFormDisabled: k } = M({
      value: String(i),
      isDisabled: t.isDisabled,
      control: f,
      onReset: () => o(h.current),
      onRestore: (e) => {
        typeof e == "string" && e !== "" && o(Number(e));
      }
    }), b = t.isDisabled || k, g = n > r ? (i - r) / (n - r) * 100 : 0, S = !!t.label || t.doesShowValue || y, v = () => {
      if (!t.canReset || b) return;
      const e = Math.min(n, Math.max(r, h.current ?? r));
      e !== i && (o(e), t.input({ value: e }), t.change({ value: e }));
    }, N = (e) => {
      const a = e.timeStamp - s.current.at > 600;
      s.current = { at: e.timeStamp, fill: a ? g : s.current.fill };
    }, z = (e) => {
      const a = e.currentTarget, l = 16, R = l / 2 + (a.clientWidth - l) * s.current.fill / 100;
      Math.abs(e.offsetX - R) <= l && v();
    };
    return /* @__PURE__ */ c("host", { shadowDom: { delegatesFocus: !0 }, style: { "--fill": `${g}%` }, children: [
      /* @__PURE__ */ c("div", { class: "header", hidden: !S, children: [
        t.label && /* @__PURE__ */ d("span", { class: "label", ondblclick: v, children: t.label }),
        /* @__PURE__ */ d(
          "slot",
          {
            name: "center",
            class: "center",
            onslotchange: (e) => x(e.target.assignedNodes().length > 0)
          }
        ),
        t.doesShowValue && /* @__PURE__ */ c("span", { class: "value", children: [
          t.valuePrefix,
          i,
          t.valueSuffix
        ] })
      ] }),
      /* @__PURE__ */ d(
        "input",
        {
          ref: f,
          type: "range",
          min: r,
          max: n,
          step: t.step ?? 1,
          value: i,
          disabled: b,
          "aria-label": w,
          onpointerdown: t.canReset ? N : void 0,
          ondblclick: t.canReset ? z : void 0,
          oninput: (e) => {
            e.stopPropagation();
            const a = Number(e.target.value);
            o(a), t.input({ value: a });
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
      tone: { type: C("primary", "secondary", "tertiary"), reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      input: p({ bubbles: !0, composed: !0 }),
      change: p({ bubbles: !0, composed: !0 })
    },
    styles: [T, B],
    form: !0
  }
);
P("z-slider", W);
export {
  W as ZSlider
};
