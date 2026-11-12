// @ts-self-types="./z-surface.d.ts"
import { c as s, a as n, j as o, d as i } from "../chunks/define-element-BZUk-KLk.js";
import { o as r } from "../chunks/prop-types-B3Bpi956.js";
import { d as l, i as d, e as c, p as u, f as h, k as p } from "../chunks/layout-schema-CdiVYtzv.js";
const v = s`
	:host {
		display: block;
		--tone: var(--text-secondary);
		background: transparent;
		color: var(--text-primary);
		border: 1px solid transparent;
		border-radius: var(--z-surface-radius, var(--radius-lg));
		padding-top: var(--z-surface-pad-top, var(--space-3));
		padding-bottom: var(--z-surface-pad-bottom, var(--space-3));
		padding-inline-start: var(--z-surface-pad-left, var(--space-3));
		padding-inline-end: var(--z-surface-pad-right, var(--space-3));
	}

	:host([is-full-width]) {
		width: 100%;
	}

	/* tones set --tone */
	:host([tone='primary']) {
		--tone: var(--text-secondary);
	}
	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}
	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
	}
	:host([tone='success']) {
		--tone: var(--status-success);
	}
	:host([tone='warning']) {
		--tone: var(--status-warning);
	}
	:host([tone='danger']) {
		--tone: var(--status-danger);
	}

	/* kinds compose the tone */
	:host([kind='plain']) {
		background: var(--surface-subtle);
	}
	:host([kind='solid']) {
		background: var(--tone);
		color: var(--on-accent);
	}
	/* purple/pink fills are light; dark text reads better on them */
	:host([kind='solid'][tone='secondary']),
	:host([kind='solid'][tone='tertiary']) {
		color: var(--text-primary);
	}
	/* Tone tints are mixed with transparent, NOT the background: the neutral
	   background carries a faint green hue, and interpolating hue against it in
	   oklch drags the result around the colour wheel (purple → olive). Mixing
	   with transparent keeps the tone's hue and just lowers its alpha, the same
	   approach z-badge uses. */
	:host([kind='soft']) {
		background: color-mix(in oklch, var(--tone) 16%, transparent);
	}
	:host([kind='outline']) {
		background: transparent;
		border-color: color-mix(in srgb, var(--tone) 45%, var(--border-default));
	}
	:host([kind='ghost']) {
		background: transparent;
		border-color: transparent;
	}

	/* Neutral elevation levels, stepped straight from the theme's neutral ramp
	   (level 0 = page base … 3 = overlay). The everyday way to reach for a
	   surface, layering UI without touching tone/kind. Each gets a hairline
	   so it reads on its own. */
	:host([level]) {
		border-color: var(--border-default);
	}
	:host([level='0']) {
		background: var(--surface-page);
	}
	:host([level='1']) {
		background: var(--surface-default);
	}
	:host([level='2']) {
		background: var(--surface-subtle);
	}
	:host([level='3']) {
		background: var(--surface-strong);
	}

	/* explicit toggles */
	:host([is-bordered]) {
		border-color: color-mix(in srgb, var(--tone) 45%, var(--border-default));
	}
	/* Resting elevation is a surface step plus a hairline ring, never a shadow;
	   only floating overlays take one. */
	:host([is-elevated]) {
		background: var(--surface-subtle);
		border-color: color-mix(in srgb, var(--tone) 30%, var(--border-default));
	}
	:host([is-interactive]) {
		cursor: pointer;
		transition: border-color var(--motion-fast) var(--ease-enter);
	}
	:host([is-interactive]:hover),
	:host([is-interactive]:focus-within) {
		border-color: color-mix(in oklch, var(--text-primary) 40%, transparent);
	}
`, g = (e) => {
  const t = { ...h(e, "--z-surface") }, a = p(e.radius);
  return a && (t["--z-surface-radius"] = a), t;
}, f = n(
  (e) => /* @__PURE__ */ o("host", { shadowDom: !0, style: g(e), children: /* @__PURE__ */ o("slot", {}) }),
  {
    props: {
      level: { type: r("0", "1", "2", "3"), reflect: !0 },
      tone: { type: r("primary", "secondary", "tertiary", "success", "warning", "danger"), reflect: !0 },
      kind: { type: r("solid", "soft", "outline", "ghost", "plain"), reflect: !0 },
      radius: String,
      isBordered: { type: Boolean, reflect: !0 },
      isElevated: { type: Boolean, reflect: !0 },
      isInteractive: { type: Boolean, reflect: !0 },
      isFullWidth: { type: Boolean, reflect: !0 },
      ...d
    },
    styles: [l, c([...u("--z-surface"), "--z-surface-radius"]), v]
  }
);
i("z-surface", f);
export {
  f as ZSurface
};
