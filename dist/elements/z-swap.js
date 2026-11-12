// @ts-self-types="./z-swap.d.ts"
import { c, a as l, e as f, j as t, g as i, d } from "../chunks/define-element-BZUk-KLk.js";
import { u as p } from "../chunks/use-prop-C0_HeSQ9.js";
import { o as h } from "../chunks/prop-types-B3Bpi956.js";
const g = c`
	:host {
		display: inline-flex;
		--swap-duration: 0.2s;
		--swap-gap: 0.5rem;
		--swap-ghost-opacity: 0.4;
	}

	:host([is-hidden]) {
		display: none;
	}

	label {
		position: relative;
		display: inline-flex;
		align-items: center;
		cursor: pointer;
		user-select: none;
		-webkit-user-select: none;
	}

	label.is-disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	input {
		position: absolute;
		width: 0;
		height: 0;
		opacity: 0;
		margin: 0;
	}

	.face {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		transition:
			opacity var(--swap-duration) ease,
			transform var(--swap-duration) ease,
			filter var(--swap-duration) ease;
	}

	/* ── stack: both faces overlap in one cell, only one shown at a time ──────── */
	.swap.is-stack {
		display: inline-grid;
		place-items: center;
	}
	.swap.is-stack .face {
		grid-area: 1 / 1;
	}

	/* ── beside: faces sit next to each other, each keeping its own space ─────── */
	.swap.is-beside {
		display: inline-flex;
		align-items: center;
		gap: var(--swap-gap);
	}

	/* ── fade (default) ──────────────────────────────────────────────────────── */
	.on {
		opacity: 0;
	}
	.off {
		opacity: 1;
	}
	.is-active .on {
		opacity: 1;
	}
	.is-active .off {
		opacity: 0;
	}

	/* ── ghost: inactive face lingers as a faint grey silhouette (beside only) ── */
	.swap.is-beside.has-ghost .off {
		opacity: 1;
		filter: none;
	}
	.swap.is-beside.has-ghost .on {
		opacity: var(--swap-ghost-opacity);
		filter: grayscale(1);
	}
	.swap.is-beside.has-ghost.is-active .off {
		opacity: var(--swap-ghost-opacity);
		filter: grayscale(1);
	}
	.swap.is-beside.has-ghost.is-active .on {
		opacity: 1;
		filter: none;
	}

	/* ── rotate ──────────────────────────────────────────────────────────────── */
	.is-rotate .on {
		transform: rotate(-45deg);
	}
	.is-rotate .off {
		transform: rotate(0deg);
	}
	.is-rotate.is-active .on {
		transform: rotate(0deg);
	}
	.is-rotate.is-active .off {
		transform: rotate(45deg);
	}

	/* ── flip (3D) ───────────────────────────────────────────────────────────── */
	.is-flip {
		transform-style: preserve-3d;
		perspective: 1000px;
	}
	.is-flip .face {
		backface-visibility: hidden;
		transition: transform var(--swap-duration) ease;
	}
	.is-flip .on {
		transform: rotateY(180deg);
		opacity: 1;
	}
	.is-flip .off {
		transform: rotateY(0deg);
		opacity: 1;
	}
	.is-flip.is-active .on {
		transform: rotateY(360deg);
	}
	.is-flip.is-active .off {
		transform: rotateY(180deg);
	}

	input:focus-visible + .swap {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
		border-radius: var(--radius-sm);
	}

	::slotted(svg) {
		width: 1.25rem;
		height: 1.25rem;
	}
`, u = (e) => e.hasGhost || e.kind === "beside" ? "is-beside" : "is-stack", y = (e) => e.effect === "rotate" ? "is-rotate" : e.effect === "flip" ? "is-flip" : "is-fade", b = l(
  (e) => {
    const [s, o] = p("isActive"), n = ["label"].concat(e.isDisabled ? ["is-disabled"] : []).join(" "), r = ["swap", u(e), y(e)].concat(e.hasGhost ? ["has-ghost"] : []).concat(s ? ["is-active"] : []).join(" ");
    return /* @__PURE__ */ t("host", { shadowDom: !0, children: /* @__PURE__ */ i("label", { class: n, title: e.label, children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "checkbox",
          checked: s,
          disabled: e.isDisabled,
          "aria-label": e.label,
          onchange: () => {
            const a = !s;
            o(a), e.change({ active: a });
          }
        }
      ),
      /* @__PURE__ */ i("span", { class: r, "aria-hidden": "true", children: [
        /* @__PURE__ */ t("span", { class: "face off", children: /* @__PURE__ */ t("slot", { name: "off" }) }),
        /* @__PURE__ */ t("span", { class: "face on", children: /* @__PURE__ */ t("slot", { name: "on" }) })
      ] })
    ] }) });
  },
  {
    props: {
      kind: { type: h("stack", "beside"), reflect: !0 },
      effect: { type: String, reflect: !0 },
      hasGhost: { type: Boolean, reflect: !0 },
      isActive: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      label: String,
      change: f({ bubbles: !0, composed: !0 })
    },
    styles: g
  }
);
d("z-swap", b);
export {
  b as ZSwap
};
