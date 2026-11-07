import { c as u, a as m, f as l, b as f, j as e, g as h, d as g } from "../chunks/define-element-BZUk-KLk.js";
import { s as v, c as k } from "../chunks/layout-schema-CPCZ71fv.js";
import { o as y } from "../chunks/prop-types-B3Bpi956.js";
const b = u`
	:host {
		display: block;
		overflow: hidden;
		--duration: 40s;
		--gap: var(--spacing-6);
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

	:host([has-fade][direction='vertical']) .viewport {
		mask-image: linear-gradient(to bottom, transparent, black 8%, black 92%, transparent);
		-webkit-mask-image: linear-gradient(to bottom, transparent, black 8%, black 92%, transparent);
	}

	.track {
		display: flex;
		width: max-content;
		gap: var(--gap);
	}

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
`, w = m(
  (a) => {
    const r = l(), o = l(), n = () => {
      const i = r.current, c = o.current;
      if (!i || !c) return;
      const d = i.assignedElements();
      c.replaceChildren(...d.map((p) => p.cloneNode(!0)));
    };
    f(() => n());
    const t = {};
    a.duration && (t["--duration"] = `${a.duration}s`);
    const s = k(a.gap);
    return s && (t["--gap"] = s), /* @__PURE__ */ e("host", { shadowDom: !0, style: t, children: /* @__PURE__ */ e("div", { class: "viewport", children: /* @__PURE__ */ h("div", { class: "track", children: [
      /* @__PURE__ */ e("div", { class: "group", children: /* @__PURE__ */ e("slot", { ref: r, onslotchange: n }) }),
      /* @__PURE__ */ e("div", { ref: o, class: "group", "aria-hidden": "true", inert: !0, staticNode: !0 })
    ] }) }) });
  },
  {
    props: {
      duration: Number,
      gap: v,
      isReversed: { type: Boolean, reflect: !0 },
      direction: { type: y("horizontal", "vertical"), reflect: !0 },
      doesPauseOnHover: { type: Boolean, reflect: !0 },
      hasFade: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: b
  }
);
g("z-marquee", w);
export {
  w as ZMarquee
};
