import { c as s, a as n, j as a, d as i } from "../chunks/define-element-BZUk-KLk.js";
import { o as r } from "../chunks/prop-types-B3Bpi956.js";
import { d as l, i as d, e as c, p as u, f as h, k as p } from "../chunks/layout-schema-CPCZ71fv.js";
const v = s`
	:host {
		display: block;
		--tone: var(--color-neutral-6);
		background: transparent;
		color: var(--foreground);
		border: 1px solid transparent;
		border-radius: var(--z-surface-radius, var(--radius-lg));
		padding-top: var(--z-surface-pad-top, var(--space-md));
		padding-bottom: var(--z-surface-pad-bottom, var(--space-md));
		padding-inline-start: var(--z-surface-pad-left, var(--space-md));
		padding-inline-end: var(--z-surface-pad-right, var(--space-md));
	}

	:host([is-full-width]) {
		width: 100%;
	}

	/* tones set --tone */
	:host([tone='primary']) {
		--tone: var(--color-neutral-6);
	}
	:host([tone='secondary']) {
		--tone: var(--purple);
	}
	:host([tone='tertiary']) {
		--tone: var(--pink);
	}
	:host([tone='success']) {
		--tone: var(--success);
	}
	:host([tone='warning']) {
		--tone: var(--warning);
	}
	:host([tone='danger']) {
		--tone: var(--destructive);
	}

	/* kinds compose the tone */
	:host([kind='plain']) {
		background: var(--background-light);
	}
	:host([kind='solid']) {
		background: var(--tone);
		color: var(--primary-foreground);
	}
	/* purple/pink fills are light; dark text reads better on them */
	:host([kind='solid'][tone='secondary']),
	:host([kind='solid'][tone='tertiary']) {
		color: var(--color-neutral-8);
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
		border-color: color-mix(in srgb, var(--tone) 45%, var(--border));
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

	/* explicit toggles */
	:host([is-bordered]) {
		border-color: color-mix(in srgb, var(--tone) 45%, var(--border));
	}
	/* Shadowless elevation: this system uses borders over shadows, so "raised"
	   reads as a lighter surface lifted off the page plus a hairline ring. */
	:host([is-elevated]) {
		background: var(--color-neutral-2);
		border-color: color-mix(in srgb, var(--tone) 30%, var(--border));
	}
	:host([is-interactive]) {
		cursor: pointer;
		transition: border-color var(--motion-fast) var(--ease-enter);
	}
	:host([is-interactive]:hover),
	:host([is-interactive]:focus-within) {
		border-color: color-mix(in oklch, var(--foreground) 40%, transparent);
	}
`, g = (e) => {
  const o = { ...h(e, "--z-surface") }, t = p(e.radius);
  return t && (o["--z-surface-radius"] = t), o;
}, f = n(
  (e) => /* @__PURE__ */ a("host", { shadowDom: !0, style: g(e), children: /* @__PURE__ */ a("slot", {}) }),
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
