import { c as a, a as s, j as o, d as n } from "../chunks/define-element-BWC3wEPr.js";
import { d as l, f as i } from "../chunks/layout-schema-SeDcUpZQ.js";
const d = a`
	:host {
		display: block;
		background: transparent;
		color: var(--foreground);
		border: 1px solid transparent;
		border-radius: var(--z-surface-radius, var(--radius-lg));
		padding: var(--space-md);
	}

	:host([is-full-width]) {
		width: 100%;
	}

	/* Neutral variants define the surface treatment. */
	:host([kind='plain']) {
		background: var(--background-light);
	}
	:host([kind='filled']) {
		background: var(--color-neutral-3);
		color: var(--foreground);
	}
	:host([kind='soft']) {
		background: color-mix(in oklch, var(--foreground) 6%, transparent);
	}
	:host([kind='outline']) {
		background: transparent;
		border-color: var(--border);
	}
	:host([kind='ghost']) {
		background: transparent;
		border-color: transparent;
	}

	/* Neutral surface levels, stepped straight from the theme's neutral ramp
	   (level 0 = page base … 3 = overlay). The everyday way to layer UI without
	   selecting a separate kind. Each gets a hairline so it reads on its own. */
	:host([level]) {
		border-color: var(--border);
	}
	:host([level='0']) {
		background: var(--color-neutral-0);
	}
	:host([level='1']) {
		background: var(--color-neutral-1);
	}
	:host([level='2']) {
		background: var(--color-neutral-2);
	}
	:host([level='3']) {
		background: var(--color-neutral-3);
	}

	:host([interactive]) {
		cursor: pointer;
		transition: border-color var(--duration-fast) var(--easing-standard);
	}
	:host([interactive]:hover),
	:host([interactive]:focus-within) {
		border-color: color-mix(in oklch, var(--foreground) 40%, transparent);
	}
`, c = (r) => {
  const e = {}, t = i(r.radius);
  return t && (e["--z-surface-radius"] = t), e;
}, u = s(
  (r) => /* @__PURE__ */ o("host", { shadowDom: !0, style: c(r), children: /* @__PURE__ */ o("slot", {}) }),
  {
    props: {
      level: { type: String, reflect: !0 },
      kind: { type: String, reflect: !0 },
      radius: String,
      interactive: { type: Boolean, reflect: !0 },
      isFullWidth: { type: Boolean, reflect: !0 }
    },
    styles: [l, d]
  }
);
n("z-surface", u);
export {
  u as ZSurface
};
