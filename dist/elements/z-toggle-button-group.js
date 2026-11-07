import { c as v, a as z, e as m, u as f, f as p, j as c } from "../chunks/define-element-BZUk-KLk.js";
import { i as y } from "../chunks/interaction-styles-XiKFAbWA.js";
import { u as x, d as w } from "../chunks/form-control-D_UwalCr.js";
import { u as k } from "../chunks/hooks-DEFT8qqt.js";
import { u as S } from "../chunks/use-listener-CmAx40Cx.js";
import { t as D } from "../chunks/toggle-schema-BLxjiLhp.js";
import { o as P } from "../chunks/prop-types-B3Bpi956.js";
const B = v`
	:host {
		display: flex;
		width: fit-content;
		align-items: center;
		user-select: none;
		-webkit-user-select: none;
	}

	/* align-items: center on the base :host cross-aligns by height in
	   horizontal mode, which is fine since every item shares one height. In
	   vertical mode the cross axis becomes width, and centering there lets
	   each item sit at its own fit-content width — shorter labels end up
	   narrower than longer ones, staircasing instead of stacking flush. */
	:host([direction='vertical']) {
		flex-direction: column;
		align-items: stretch;
	}

	::slotted(*) {
		--z-toggle-button-radius: 0;
		flex-shrink: 0;
		min-width: 0;
	}

	::slotted(:only-child) {
		--z-toggle-button-radius: var(--radius-md);
	}

	:host(:not([direction='vertical'])) ::slotted(:first-child) {
		--z-toggle-button-radius: var(--radius-md) 0 0 var(--radius-md);
	}

	:host(:not([direction='vertical'])) ::slotted(:last-child) {
		--z-toggle-button-radius: 0 var(--radius-md) var(--radius-md) 0;
	}

	:host(:not([direction='vertical'])) ::slotted(:not(:first-child)) {
		margin-inline-start: -1px;
	}

	:host([direction='vertical']) ::slotted(:first-child) {
		--z-toggle-button-radius: var(--radius-md) var(--radius-md) 0 0;
	}

	:host([direction='vertical']) ::slotted(:last-child) {
		--z-toggle-button-radius: 0 0 var(--radius-md) var(--radius-md);
	}

	:host([direction='vertical']) ::slotted(:not(:first-child)) {
		margin-top: -1px;
	}

	/* Stacking ladder: items overlap by 1px (above) so neighbouring borders
	   collapse into a single seam. Earlier items are laid ABOVE later ones so
	   each item paints its OWN right/bottom border at the seam rather than being
	   covered by the next item's leading border. The hovered/focused/selected
	   item jumps above everything so its full (tone) border is never clipped. */
	::slotted(*) {
		position: relative;
		z-index: 1;
	}
	::slotted(:nth-child(1)) {
		z-index: 9;
	}
	::slotted(:nth-child(2)) {
		z-index: 8;
	}
	::slotted(:nth-child(3)) {
		z-index: 7;
	}
	::slotted(:nth-child(4)) {
		z-index: 6;
	}
	::slotted(:nth-child(5)) {
		z-index: 5;
	}
	::slotted(:nth-child(6)) {
		z-index: 4;
	}
	::slotted(:nth-child(7)) {
		z-index: 3;
	}
	::slotted(:nth-child(8)) {
		z-index: 2;
	}
	::slotted(:hover),
	::slotted([data-state='on']),
	::slotted(:focus-visible) {
		z-index: 20;
	}

	/* Group-level variants work by inheritance: these custom properties cross
	   into the slotted items and their shadow buttons, and an item that sets
	   its own accent/size/kind overrides them locally. That only holds because
	   an unset variant resolves to no class at all — see toggle-schema.ts. */
	:host([tone='secondary']) {
		--z-toggle-button-color: var(--neon-purple);
		--z-toggle-button-accent: var(--neon-purple);
		--z-toggle-button-accent-foreground: var(--on-accent);
	}

	:host([tone='tertiary']) {
		--z-toggle-button-color: var(--neon-pink);
		--z-toggle-button-accent: var(--neon-pink);
		--z-toggle-button-accent-foreground: var(--on-accent);
	}

	:host([tone='primary']) {
		--z-toggle-button-color: var(--foreground);
		--z-toggle-button-accent: var(--primary);
		--z-toggle-button-accent-foreground: var(--primary-foreground);
	}

	:host([tone='success']) {
		--z-toggle-button-color: var(--success);
		--z-toggle-button-accent: var(--success);
		--z-toggle-button-accent-foreground: var(--on-accent);
	}

	:host([tone='warning']) {
		--z-toggle-button-color: var(--warning);
		--z-toggle-button-accent: var(--warning);
		--z-toggle-button-accent-foreground: var(--on-accent);
	}

	:host([tone='danger']) {
		--z-toggle-button-color: var(--destructive);
		--z-toggle-button-accent: var(--destructive);
		--z-toggle-button-accent-foreground: var(--on-accent);
	}


	:host([size='xs']) {
		--z-toggle-button-height: 1.75rem;
		--z-toggle-button-padding-inline: 0.625rem;
		--z-toggle-button-min-width: 1.75rem;
		--z-toggle-button-font-size: 0.75rem;
		--z-toggle-button-icon-size: 0.75rem;
	}

	:host([size='sm']) {
		--z-toggle-button-height: var(--control-height-sm);
		--z-toggle-button-padding-inline: 0.75rem;
		--z-toggle-button-min-width: var(--control-height-sm);
		--z-toggle-button-font-size: 0.8125rem;
		--z-toggle-button-icon-size: 0.875rem;
	}

	:host([size='lg']) {
		--z-toggle-button-height: var(--control-height-lg);
		--z-toggle-button-padding-inline: 1.25rem;
		--z-toggle-button-min-width: var(--control-height-lg);
		--z-toggle-button-font-size: 1rem;
		--z-toggle-button-icon-size: 1.125rem;
	}

	:host([kind='ghost']) {
		--z-toggle-button-border: transparent;
		--z-toggle-button-hover-bg: color-mix(in oklch, var(--z-toggle-button-accent, var(--foreground)) 10%, transparent);
		--z-toggle-button-on-bg: var(--z-toggle-button-accent, var(--primary));
		--z-toggle-button-on-color: var(--z-toggle-button-accent-foreground, var(--primary-foreground));
		--z-toggle-button-on-border: transparent;
	}

	/* off: tone-colored text + a dimmed tone border (mixed toward transparent so
	   the hue never rotates). on: solid tone fill with dark on-foreground text. */
	:host([kind='outline']) {
		--z-toggle-button-border: color-mix(in oklch, var(--z-toggle-button-accent, var(--foreground)) 50%, transparent);
		--z-toggle-button-hover-bg: color-mix(in oklch, var(--z-toggle-button-accent, var(--foreground)) 10%, transparent);
		--z-toggle-button-on-bg: var(--z-toggle-button-accent, var(--primary));
		--z-toggle-button-on-color: var(--z-toggle-button-accent-foreground, var(--primary-foreground));
		--z-toggle-button-on-border: var(--z-toggle-button-accent, var(--primary));
	}

	/* solid: filled at rest, not just on press, so the segment reads as an
	   object even before it is selected. */
	:host([kind='solid']) {
		--z-toggle-button-border: transparent;
		--z-toggle-button-bg: color-mix(in oklch, var(--z-toggle-button-accent, var(--foreground)) 12%, var(--surface, transparent));
		--z-toggle-button-hover-bg: color-mix(in oklch, var(--z-toggle-button-accent, var(--foreground)) 20%, var(--surface, transparent));
		--z-toggle-button-on-bg: var(--z-toggle-button-accent, var(--primary));
		--z-toggle-button-on-color: var(--z-toggle-button-accent-foreground, var(--primary-foreground));
		--z-toggle-button-on-border: transparent;
	}

	:host([kind='soft']) {
		--z-toggle-button-border: transparent;
		--z-toggle-button-bg: color-mix(in oklch, var(--z-toggle-button-accent, var(--foreground)) 15%, transparent);
		--z-toggle-button-color: var(--z-toggle-button-accent, var(--foreground));
		--z-toggle-button-hover-bg: color-mix(in oklch, var(--z-toggle-button-accent, var(--foreground)) 24%, transparent);
		--z-toggle-button-on-bg: var(--z-toggle-button-accent, var(--primary));
		--z-toggle-button-on-color: var(--z-toggle-button-accent-foreground, var(--primary-foreground));
		--z-toggle-button-on-border: transparent;
	}

	/* plain: text only at rest, underline is the only affordance until pressed. */
	:host([kind='plain']) {
		--z-toggle-button-border: transparent;
		--z-toggle-button-hover-bg: transparent;
		--z-toggle-button-on-bg: var(--z-toggle-button-accent, var(--primary));
		--z-toggle-button-on-color: var(--z-toggle-button-accent-foreground, var(--primary-foreground));
		--z-toggle-button-on-border: transparent;
	}

	:host([is-hidden]) {
		display: none;
	}
`, j = z(
  (o) => {
    const t = f(), [n, a] = k([]), l = p(null), s = () => {
      const e = u(t.current);
      l.current === null && t.current.querySelector("z-toggle-button-group-item") && (l.current = e), a(e);
    }, d = () => {
      if (n.length === 0) return null;
      if (!o.isMultiple) return n[0];
      const e = new FormData(), r = t.current.getAttribute("name") ?? "";
      for (const i of n) e.append(r, i);
      return e;
    }, { isFormDisabled: b } = x({
      value: d(),
      isDisabled: o.isDisabled,
      onReset: () => {
        const e = new Set(l.current ?? []);
        for (const r of t.current.querySelectorAll("z-toggle-button-group-item"))
          r.isPressed = e.has(r.value ?? "");
        s();
      }
    }), h = !!o.isDisabled || b;
    return S(
      t,
      "press",
      (e) => {
        const r = e;
        if (o.isMultiple) {
          o.change({ value: u(t.current) }), s();
          return;
        }
        const i = r.target;
        for (const g of t.current.querySelectorAll("z-toggle-button-group-item"))
          g !== i && (g.isPressed = !1);
        o.change({ value: r.detail.pressed ? r.detail.value : void 0 }), s();
      },
      { passive: !0 }
    ), /* @__PURE__ */ c("host", { shadowDom: !0, role: "group", "aria-disabled": h ? "true" : void 0, children: /* @__PURE__ */ c("slot", { onslotchange: s }) });
  },
  {
    props: {
      ...D,
      name: { type: String, reflect: !0 },
      direction: { type: P("horizontal", "vertical"), reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      isMultiple: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      change: m({ bubbles: !0, composed: !0 })
    },
    styles: [B, y],
    form: !0
  }
), u = (o) => {
  const t = o.querySelectorAll("z-toggle-button-group-item"), n = [];
  for (const a of t)
    a.isPressed && a.value && n.push(a.value);
  return n;
};
w("z-toggle-button-group", j);
export {
  j as ZToggleButtonGroup
};
