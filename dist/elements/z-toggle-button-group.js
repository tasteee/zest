// @ts-self-types="./z-toggle-button-group.d.ts"
import { c as v, a as z, e as m, u as p, f, j as c } from "../chunks/define-element-BZUk-KLk.js";
import { i as y } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as x, d as w } from "../chunks/form-control-CZ1HzNxT.js";
import { u as k } from "../chunks/hooks-DEFT8qqt.js";
import { u as S } from "../chunks/use-listener-CmAx40Cx.js";
import { t as D } from "../chunks/toggle-schema-CTAgoSRR.js";
import { o as B } from "../chunks/prop-types-CSJu2W-0.js";
import { w as P } from "../chunks/deprecate-DrGNNffe.js";
const V = v`
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
	:host([is-vertical]),
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

	:host(:not([is-vertical]):not([direction='vertical'])) ::slotted(:first-child) {
		--z-toggle-button-radius: var(--radius-md) 0 0 var(--radius-md);
	}

	:host(:not([is-vertical]):not([direction='vertical'])) ::slotted(:last-child) {
		--z-toggle-button-radius: 0 var(--radius-md) var(--radius-md) 0;
	}

	:host(:not([is-vertical]):not([direction='vertical'])) ::slotted(:not(:first-child)) {
		margin-inline-start: -1px;
	}

	:host([is-vertical]) ::slotted(:first-child),
	:host([direction='vertical']) ::slotted(:first-child) {
		--z-toggle-button-radius: var(--radius-md) var(--radius-md) 0 0;
	}

	:host([is-vertical]) ::slotted(:last-child),
	:host([direction='vertical']) ::slotted(:last-child) {
		--z-toggle-button-radius: 0 0 var(--radius-md) var(--radius-md);
	}

	:host([is-vertical]) ::slotted(:not(:first-child)),
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
		--z-toggle-button-color: var(--accent-secondary);
		--z-toggle-button-accent: var(--accent-secondary);
		--z-toggle-button-accent-foreground: var(--on-accent);
	}

	:host([tone='tertiary']) {
		--z-toggle-button-color: var(--accent-tertiary);
		--z-toggle-button-accent: var(--accent-tertiary);
		--z-toggle-button-accent-foreground: var(--on-accent);
	}

	:host([tone='primary']) {
		--z-toggle-button-color: var(--text-primary);
		--z-toggle-button-accent: var(--accent-primary);
		--z-toggle-button-accent-foreground: var(--on-accent);
	}

	:host([tone='success']) {
		--z-toggle-button-color: var(--status-success);
		--z-toggle-button-accent: var(--status-success);
		--z-toggle-button-accent-foreground: var(--on-accent);
	}

	:host([tone='warning']) {
		--z-toggle-button-color: var(--status-warning);
		--z-toggle-button-accent: var(--status-warning);
		--z-toggle-button-accent-foreground: var(--on-accent);
	}

	:host([tone='danger']) {
		--z-toggle-button-color: var(--status-danger);
		--z-toggle-button-accent: var(--status-danger);
		--z-toggle-button-accent-foreground: var(--on-accent);
	}


	:host([size='xs']) {
		--z-toggle-button-height: 1.75rem;
		--z-toggle-button-padding-inline: 0.625rem;
		--z-toggle-button-min-width: 1.75rem;
		--z-toggle-button-font-size: var(--font-size-xs);
		--z-toggle-button-icon-size: 0.75rem;
	}

	:host([size='sm']) {
		--z-toggle-button-height: var(--control-height-sm);
		--z-toggle-button-padding-inline: 0.75rem;
		--z-toggle-button-min-width: var(--control-height-sm);
		--z-toggle-button-font-size: var(--font-size-sm);
		--z-toggle-button-icon-size: 0.875rem;
	}

	:host([size='lg']) {
		--z-toggle-button-height: var(--control-height-lg);
		--z-toggle-button-padding-inline: 1.25rem;
		--z-toggle-button-min-width: var(--control-height-lg);
		--z-toggle-button-font-size: var(--font-size-md);
		--z-toggle-button-icon-size: 1.125rem;
	}

	:host([kind='ghost']) {
		--z-toggle-button-border: transparent;
		--z-toggle-button-hover-bg: color-mix(in oklch, var(--z-toggle-button-accent, var(--text-primary)) 10%, transparent);
		--z-toggle-button-on-bg: var(--z-toggle-button-accent, var(--text-primary));
		--z-toggle-button-on-color: var(--z-toggle-button-accent-foreground, var(--on-accent));
		--z-toggle-button-on-border: transparent;
	}

	/* off: tone-colored text + a dimmed tone border (mixed toward transparent so
	   the hue never rotates). on: solid tone fill with dark on-foreground text. */
	:host([kind='outline']) {
		--z-toggle-button-border: color-mix(in oklch, var(--z-toggle-button-accent, var(--text-primary)) 50%, transparent);
		--z-toggle-button-hover-bg: color-mix(in oklch, var(--z-toggle-button-accent, var(--text-primary)) 10%, transparent);
		--z-toggle-button-on-bg: var(--z-toggle-button-accent, var(--text-primary));
		--z-toggle-button-on-color: var(--z-toggle-button-accent-foreground, var(--on-accent));
		--z-toggle-button-on-border: var(--z-toggle-button-accent, var(--text-primary));
	}

	/* solid: filled at rest, not just on press, so the segment reads as an
	   object even before it is selected. */
	:host([kind='solid']) {
		--z-toggle-button-border: transparent;
		--z-toggle-button-bg: color-mix(in oklch, var(--z-toggle-button-accent, var(--text-primary)) 12%, var(--z-toggle-button-surface, transparent));
		--z-toggle-button-hover-bg: color-mix(in oklch, var(--z-toggle-button-accent, var(--text-primary)) 20%, var(--z-toggle-button-surface, transparent));
		--z-toggle-button-on-bg: var(--z-toggle-button-accent, var(--text-primary));
		--z-toggle-button-on-color: var(--z-toggle-button-accent-foreground, var(--on-accent));
		--z-toggle-button-on-border: transparent;
	}

	:host([kind='soft']) {
		--z-toggle-button-border: transparent;
		--z-toggle-button-bg: color-mix(in oklch, var(--z-toggle-button-accent, var(--text-primary)) 15%, transparent);
		--z-toggle-button-color: var(--z-toggle-button-accent, var(--text-primary));
		--z-toggle-button-hover-bg: color-mix(in oklch, var(--z-toggle-button-accent, var(--text-primary)) 24%, transparent);
		--z-toggle-button-on-bg: var(--z-toggle-button-accent, var(--text-primary));
		--z-toggle-button-on-color: var(--z-toggle-button-accent-foreground, var(--on-accent));
		--z-toggle-button-on-border: transparent;
	}

	/* plain: text only at rest, underline is the only affordance until pressed. */
	:host([kind='plain']) {
		--z-toggle-button-border: transparent;
		--z-toggle-button-hover-bg: transparent;
		--z-toggle-button-on-bg: var(--z-toggle-button-accent, var(--text-primary));
		--z-toggle-button-on-color: var(--z-toggle-button-accent-foreground, var(--on-accent));
		--z-toggle-button-on-border: transparent;
	}

	:host([is-hidden]) {
		display: none;
	}
`, j = z(
  (t) => {
    P({ tag: "z-toggle-button-group", attribute: "direction", value: t.direction, flag: "is-vertical", flagValue: "vertical" });
    const e = p(), [r, a] = k([]), i = f(null), s = () => {
      const o = u(e.current);
      i.current === null && e.current.querySelector("z-toggle-button-group-item") && (i.current = o), a(o);
    }, d = () => {
      if (r.length === 0) return null;
      if (!t.isMultiple) return r[0];
      const o = new FormData(), n = e.current.getAttribute("name") ?? "";
      for (const l of r) o.append(n, l);
      return o;
    }, { isFormDisabled: b } = x({
      value: d(),
      isDisabled: t.isDisabled,
      onReset: () => {
        const o = new Set(i.current ?? []);
        for (const n of e.current.querySelectorAll("z-toggle-button-group-item"))
          n.isPressed = o.has(n.value ?? "");
        s();
      }
    }), h = !!t.isDisabled || b;
    return S(
      e,
      "press",
      (o) => {
        const n = o;
        if (t.isMultiple) {
          t.change({ value: u(e.current) }), s();
          return;
        }
        const l = n.target;
        for (const g of e.current.querySelectorAll("z-toggle-button-group-item"))
          g !== l && (g.isPressed = !1);
        t.change({ value: n.detail.pressed ? n.detail.value : void 0 }), s();
      },
      { passive: !0 }
    ), /* @__PURE__ */ c("host", { shadowDom: !0, role: "group", "aria-disabled": h ? "true" : void 0, children: /* @__PURE__ */ c("slot", { onslotchange: s }) });
  },
  {
    props: {
      ...D,
      name: { type: String, reflect: !0 },
      isVertical: { type: Boolean, reflect: !0 },
      /** @deprecated use is-vertical */
      direction: { type: B("horizontal", "vertical"), reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      isMultiple: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      change: m({ bubbles: !0, composed: !0 })
    },
    styles: [V, y],
    form: !0
  }
), u = (t) => {
  const e = t.querySelectorAll("z-toggle-button-group-item"), r = [];
  for (const a of e)
    a.isPressed && a.value && r.push(a.value);
  return r;
};
w("z-toggle-button-group", j);
export {
  j as ZToggleButtonGroup
};
