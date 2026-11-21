// @ts-self-types="./z-step.d.ts"
import { c as k, a as y, e as w, g as a, j as t, d as z } from "../chunks/define-element-BZUk-KLk.js";
import { i as B } from "../chunks/interaction-styles-C6mMacCu.js";
import { s as C } from "../chunks/accessible-NC1hpH4S.js";
import { o as d } from "../chunks/prop-types-CSJu2W-0.js";
import { u as S } from "../chunks/locale-BNhgEFKA.js";
const O = k`
	:host {
		--tone: var(--z-step-accent, var(--accent-primary));
		--z-step-marker: 1.75rem;
		--z-step-line: var(--border-default);
		display: flex;
		flex: 1 1 auto;
		min-width: 0;
	}

	:host([is-last]:not([is-vertical])) {
		flex: 0 0 auto;
	}

	:host([size='sm']) {
		--z-step-marker: 1.375rem;
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([is-error]) {
		--tone: var(--status-danger);
	}

	.step {
		position: relative;
		display: flex;
		align-items: center;
		gap: var(--space-3);
		width: 100%;
		min-width: 0;
	}

	.hit {
		all: unset;
		display: flex;
		align-items: center;
		gap: var(--space-3);
		min-width: 0;
		border-radius: var(--radius-md);
	}

	button.hit {
		cursor: pointer;
	}
	button.hit:hover .label {
		color: var(--text-strong);
	}
	button.hit:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 2px;
	}

	.marker {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		box-sizing: border-box;
		width: var(--z-step-marker);
		height: var(--z-step-marker);
		border: 1px solid var(--border-strong);
		border-radius: var(--radius-full);
		background: transparent;
		color: var(--text-secondary);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		font-variant-numeric: tabular-nums;
		line-height: var(--line-height-none);
		transition:
			background-color var(--motion-base) var(--ease-enter),
			border-color var(--motion-base) var(--ease-enter),
			color var(--motion-base) var(--ease-enter);
	}

	:host([size='sm']) .marker {
		font-size: var(--font-size-2xs);
	}

	:host([state='current']) .marker {
		border: 1.5px solid var(--tone);
		background: color-mix(in oklch, var(--tone) 14%, transparent);
		color: color-mix(in oklab, var(--tone) 70%, var(--text-strong));
	}

	:host([state='complete']) .marker {
		border-color: var(--tone);
		background: var(--tone);
		color: var(--on-accent);
	}

	:host([is-error]) .marker {
		border: 1.5px solid var(--status-danger);
		background: color-mix(in oklch, var(--status-danger) 14%, transparent);
		color: var(--status-danger);
	}

	:host([is-disabled]) {
		opacity: var(--control-disabled-opacity);
	}

	.marker svg {
		width: 55%;
		height: 55%;
		fill: none;
		stroke: currentColor;
		stroke-width: 3;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.marker ::slotted(svg) {
		width: 55%;
		height: 55%;
	}

	.text {
		display: flex;
		flex-direction: column;
		gap: var(--space-0-5);
		min-width: 0;
	}

	.label {
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-tight);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: color var(--motion-fast) var(--ease-enter);
	}

	:host([state='current']) .label,
	:host([state='complete']) .label {
		color: var(--text-primary);
	}

	:host([state='current']) .label {
		font-weight: var(--font-weight-semibold);
	}

	:host([is-error]) .label {
		color: var(--status-danger);
	}

	.description {
		color: var(--text-secondary);
		font-size: var(--font-size-xs);
		line-height: var(--line-height-snug);
	}

	.description[hidden] {
		display: none;
	}

	:host(:not([is-vertical])) .description {
		white-space: nowrap;
	}

	/* Horizontal: a line fills the space to the next step. */
	.connector {
		flex: 1 1 auto;
		min-width: var(--space-4);
		height: 1px;
		background: var(--z-step-line);
		transition: background-color var(--motion-base) var(--ease-enter);
	}

	/* The line is progress, not status: an errored step still hands on
	   in the stepper's accent. */
	:host([state='complete']) .connector {
		background: var(--z-step-accent, var(--accent-primary));
	}

	:host([is-last]) .connector {
		display: none;
	}

	.body {
		display: none;
	}

	/* Vertical: marker column on the start side, the line drops from it. */
	:host([is-vertical]) .step {
		display: grid;
		grid-template-columns: var(--z-step-marker) minmax(0, 1fr);
		column-gap: var(--space-3);
		align-items: start;
	}

	:host([is-vertical]) .hit {
		grid-column: 1 / -1;
		grid-row: 1;
		align-items: flex-start;
	}

	:host([is-vertical]) .text {
		padding-top: calc((var(--z-step-marker) - 1.2em) / 2);
	}

	:host([is-vertical]) .label {
		white-space: normal;
	}

	/* The line runs from under this marker to the bottom of the step,
	   so it meets the next marker whatever the step holds. */
	:host([is-vertical]) .connector {
		position: absolute;
		inset-inline-start: calc(var(--z-step-marker) / 2 - 0.5px);
		top: calc(var(--z-step-marker) + var(--space-1-5));
		bottom: var(--space-1-5);
		width: 1px;
		height: auto;
		min-width: 0;
	}

	:host([is-vertical]) .body {
		display: block;
		grid-column: 2;
		grid-row: 2;
		min-width: 0;
		padding-top: var(--space-2);
		padding-bottom: var(--space-6);
	}

	:host([is-vertical][is-last]) .body {
		padding-bottom: 0;
	}
`, T = () => /* @__PURE__ */ t("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ t("polyline", { points: "5 12.5 10 17.5 19 7" }) }), j = (e, o, r) => o ? r("stepError") : e === "complete" ? r("stepComplete") : e === "current" ? r("stepCurrent") : "", E = y(
  (e) => {
    const o = S(), r = e.index ?? 1, h = e.state === "complete", p = e.state === "current", s = !!e.isError, i = !!e.isNavigable && !e.isDisabled, m = !!e.description || !!e.isOptional, v = e.description || o("stepOptional"), u = j(e.state, s, o), g = e.isOptional ? o("stepOptional") : "", n = [u, g].filter(Boolean).join(", "), b = h && !s, f = s ? "!" : String(r), x = () => {
      i && e.select({ index: r });
    }, l = /* @__PURE__ */ t("span", { class: "marker", part: "marker", "aria-hidden": "true", children: /* @__PURE__ */ t("slot", { name: "icon", children: b ? /* @__PURE__ */ t(T, {}) : f }) }), c = /* @__PURE__ */ a("span", { class: "text", children: [
      /* @__PURE__ */ t("span", { class: "label", part: "label", children: e.label }),
      /* @__PURE__ */ t("span", { class: "description", hidden: !m, children: v }),
      n && /* @__PURE__ */ t("span", { class: "sr-only", children: `, ${n}` })
    ] });
    return /* @__PURE__ */ t("host", { shadowDom: !0, role: "listitem", "aria-current": p ? "step" : void 0, children: /* @__PURE__ */ a("div", { class: "step", children: [
      i ? /* @__PURE__ */ a("button", { class: "hit", type: "button", onclick: x, children: [
        l,
        c
      ] }) : /* @__PURE__ */ a("span", { class: "hit", children: [
        l,
        c
      ] }),
      /* @__PURE__ */ t("span", { class: "connector", "aria-hidden": "true" }),
      /* @__PURE__ */ t("div", { class: "body", children: /* @__PURE__ */ t("slot", {}) })
    ] }) });
  },
  {
    props: {
      label: String,
      description: String,
      state: { type: d("upcoming", "current", "complete"), reflect: !0 },
      index: { type: Number, reflect: !0 },
      size: { type: d("sm", "md"), reflect: !0 },
      isError: { type: Boolean, reflect: !0 },
      isOptional: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isNavigable: { type: Boolean, reflect: !0 },
      isVertical: { type: Boolean, reflect: !0 },
      isLast: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      select: w({ bubbles: !0, composed: !0 })
    },
    styles: [O, B, C]
  }
);
z("z-step", E);
export {
  E as ZStep
};
