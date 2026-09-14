import { c as u, a as m, f as l, b as h, j as e, g as f, d as g } from "../chunks/define-element-BWC3wEPr.js";
import { s as v, c as k } from "../chunks/layout-schema-SeDcUpZQ.js";
const y = u`
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
`, b = m(
  (a) => {
    const r = l(), n = l(), o = () => {
      const i = r.current, c = n.current;
      if (!i || !c) return;
      const d = i.assignedElements();
      c.replaceChildren(...d.map((p) => p.cloneNode(!0)));
    };
    h(() => o());
    const t = {};
    a.duration && (t["--duration"] = `${a.duration}s`);
    const s = k(a.gap);
    return s && (t["--gap"] = s), /* @__PURE__ */ e("host", { shadowDom: !0, style: t, children: /* @__PURE__ */ e("div", { class: "viewport", children: /* @__PURE__ */ f("div", { class: "track", children: [
      /* @__PURE__ */ e("div", { class: "group", children: /* @__PURE__ */ e("slot", { ref: r, onslotchange: o }) }),
      /* @__PURE__ */ e("div", { ref: n, class: "group", "aria-hidden": "true", inert: !0 })
    ] }) }) });
  },
  {
    props: {
      duration: Number,
      gap: v,
      isReversed: { type: Boolean, reflect: !0 },
      direction: { type: String, reflect: !0 },
      doesPauseOnHover: { type: Boolean, reflect: !0 },
      hasFade: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: y
  }
);
g("z-marquee", b);
export {
  b as ZMarquee
};
