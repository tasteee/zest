// @ts-self-types="./z-marquee.d.ts"
import { c as u, a as m, f as l, b as f, j as e, g as h, d as g } from "../chunks/define-element-BZUk-KLk.js";
import { s as v, c as k } from "../chunks/layout-schema-CdiVYtzv.js";
import { o as y } from "../chunks/prop-types-CSJu2W-0.js";
import { w as b } from "../chunks/deprecate-DrGNNffe.js";
const w = u`
	:host {
		display: block;
		overflow: hidden;
		--duration: 40s;
		--gap: var(--space-6);
	}

	:host([is-hidden]) {
		display: none;
	}

	.viewport {
		overflow: hidden;
	}

	:host([has-fade]) .viewport {
		mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
		-webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
	}

	:host([has-fade][is-vertical]) .viewport,
	:host([has-fade][direction='vertical']) .viewport {
		mask-image: linear-gradient(to bottom, transparent, black 8%, black 92%, transparent);
		-webkit-mask-image: linear-gradient(to bottom, transparent, black 8%, black 92%, transparent);
	}

	.track {
		display: flex;
		width: max-content;
		gap: var(--gap);
	}

	:host([is-vertical]) .track,
	:host([direction='vertical']) .track {
		flex-direction: column;
		width: auto;
		height: max-content;
	}

	.group {
		display: flex;
		flex-shrink: 0;
		gap: var(--gap);
		animation: marquee-x var(--duration) linear infinite;
	}

	:host([is-vertical]) .group,
	:host([direction='vertical']) .group {
		flex-direction: column;
		animation-name: marquee-y;
	}

	:host([is-reversed]) .group {
		animation-direction: reverse;
	}

	:host([does-pause-on-hover]:hover) .group,
	:host([does-pause-on-hover]:focus-within) .group {
		animation-play-state: paused;
	}

	@keyframes marquee-x {
		to {
			transform: translateX(calc(-100% - var(--gap)));
		}
	}

	@keyframes marquee-y {
		to {
			transform: translateY(calc(-100% - var(--gap)));
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.group {
			animation: none;
		}
	}
`, x = m(
  (t) => {
    b({ tag: "z-marquee", attribute: "direction", value: t.direction, flag: "is-vertical", flagValue: "vertical" });
    const r = l(), o = l(), i = () => {
      const s = r.current, c = o.current;
      if (!s || !c) return;
      const d = s.assignedElements();
      c.replaceChildren(...d.map((p) => p.cloneNode(!0)));
    };
    f(() => i());
    const a = {};
    t.duration && (a["--duration"] = `${t.duration}s`);
    const n = k(t.gap);
    return n && (a["--gap"] = n), /* @__PURE__ */ e("host", { shadowDom: !0, style: a, children: /* @__PURE__ */ e("div", { class: "viewport", children: /* @__PURE__ */ h("div", { class: "track", children: [
      /* @__PURE__ */ e("div", { class: "group", children: /* @__PURE__ */ e("slot", { ref: r, onslotchange: i }) }),
      /* @__PURE__ */ e("div", { ref: o, class: "group", "aria-hidden": "true", inert: !0, staticNode: !0 })
    ] }) }) });
  },
  {
    props: {
      duration: Number,
      gap: v,
      isReversed: { type: Boolean, reflect: !0 },
      isVertical: { type: Boolean, reflect: !0 },
      /** @deprecated use is-vertical */
      direction: { type: y("horizontal", "vertical"), reflect: !0 },
      doesPauseOnHover: { type: Boolean, reflect: !0 },
      hasFade: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: w
  }
);
g("z-marquee", x);
export {
  x as ZMarquee
};
