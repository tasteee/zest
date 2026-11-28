// @ts-self-types="./z-toggle-button-group.d.ts"
import { c as B, a as P, e as T, u as C, f as W, b as A, j as L } from "../chunks/define-element-BZUk-KLk.js";
import { i as j } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as M, d as R } from "../chunks/form-control-B69z9f8A.js";
import { u as H } from "../chunks/hooks-DEFT8qqt.js";
import { u as q } from "../chunks/use-listener-CmAx40Cx.js";
import { t as G } from "../chunks/toggle-schema-CTAgoSRR.js";
import { o as N } from "../chunks/prop-types-CSJu2W-0.js";
import { w as U } from "../chunks/deprecate-DrGNNffe.js";
import { r as K } from "../chunks/misuse-BkfjLjP6.js";
const Z = B`
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

	:host(:not([is-vertical]):not([direction='vertical']):not([columns])) ::slotted(:first-child) {
		--z-toggle-button-radius: var(--radius-md) 0 0 var(--radius-md);
	}

	:host(:not([is-vertical]):not([direction='vertical']):not([columns])) ::slotted(:last-child) {
		--z-toggle-button-radius: 0 var(--radius-md) var(--radius-md) 0;
	}

	:host(:not([is-vertical]):not([direction='vertical']):not([columns])) ::slotted(:not(:first-child)) {
		margin-inline-start: -1px;
	}

	:host([is-vertical]:not([columns])) ::slotted(:first-child),
	:host([direction='vertical']:not([columns])) ::slotted(:first-child) {
		--z-toggle-button-radius: var(--radius-md) var(--radius-md) 0 0;
	}

	:host([is-vertical]:not([columns])) ::slotted(:last-child),
	:host([direction='vertical']:not([columns])) ::slotted(:last-child) {
		--z-toggle-button-radius: 0 0 var(--radius-md) var(--radius-md);
	}

	:host([is-vertical]:not([columns])) ::slotted(:not(:first-child)),
	:host([direction='vertical']:not([columns])) ::slotted(:not(:first-child)) {
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
		--z-toggle-button-height: var(--control-height-xs);
		--z-toggle-button-padding-inline: 0.625rem;
		--z-toggle-button-min-width: var(--control-height-xs);
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
		--z-toggle-button-bg: color-mix(in oklab, var(--z-toggle-button-accent, var(--text-primary)) 12%, var(--z-toggle-button-surface, transparent));
		--z-toggle-button-hover-bg: color-mix(in oklab, var(--z-toggle-button-accent, var(--text-primary)) 20%, var(--z-toggle-button-surface, transparent));
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

	/* columns: a grid of separate items instead of one joined strip. Seams
	   only make sense along a single line, so every item keeps its own full
	   radius and the grid gap separates them. Overrides is-vertical. */
	:host([columns]) {
		display: grid;
		grid-template-columns: repeat(var(--columns, 1), minmax(0, 1fr));
		gap: var(--space-1);
		align-items: stretch;
	}

	:host([columns]) ::slotted(*) {
		--z-toggle-button-radius: var(--radius-md);
		margin: 0;
	}

	:host([is-hidden]) {
		display: none;
	}
`, _ = P(
  (r) => {
    U({ tag: "z-toggle-button-group", attribute: "direction", value: r.direction, flag: "is-vertical", flagValue: "vertical" });
    const e = C(), [o, h] = H([]), d = W(null), l = () => {
      const s = D(e.current);
      d.current === null && e.current.querySelector("z-toggle-button-group-item") && (d.current = s), h(s);
    }, m = () => {
      if (o.length === 0) return null;
      if (!r.isMultiple) return o[0];
      const s = new FormData(), a = e.current.getAttribute("name") ?? "";
      for (const f of o) s.append(a, f);
      return s;
    }, { isFormDisabled: p } = M({
      value: m(),
      isDisabled: r.isDisabled,
      onReset: () => {
        const s = new Set(d.current ?? []);
        for (const a of e.current.querySelectorAll("z-toggle-button-group-item"))
          a.isPressed = s.has(a.value ?? "");
        l();
      }
    }), w = !!r.isDisabled || p;
    q(
      e,
      "press",
      (s) => {
        const a = s;
        if (r.isMultiple) {
          r.change({ value: D(e.current) }), l();
          return;
        }
        const f = a.target;
        for (const x of e.current.querySelectorAll("z-toggle-button-group-item"))
          x !== f && (x.isPressed = !1);
        r.change({ value: a.detail.pressed ? a.detail.value : void 0 }), l();
      },
      { passive: !0 }
    );
    const v = J(r.columns), y = !!r.isVertical || r.direction === "vertical", c = v > 0;
    return A(() => {
      c && y && K(e.current, "columns-vertical", "z-toggle-button-group: columns and is-vertical are both set. columns wins; remove one.");
    }, [c, y]), Q(e, { columns: v, isVertical: y, pressed: o }), A(() => {
      const s = e.current.style;
      c && s.setProperty("--columns", String(v)), c || s.removeProperty("--columns");
    }, [v, c]), /* @__PURE__ */ L("host", { shadowDom: !0, role: "group", "aria-disabled": w ? "true" : void 0, children: /* @__PURE__ */ L("slot", { onslotchange: l }) });
  },
  {
    props: {
      ...G,
      name: { type: String, reflect: !0 },
      isVertical: { type: Boolean, reflect: !0 },
      columns: { type: Number, reflect: !0 },
      /** @deprecated use is-vertical */
      direction: { type: N("horizontal", "vertical"), reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      isMultiple: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      change: T({ bubbles: !0, composed: !0 })
    },
    styles: [Z, j],
    form: !0
  }
), J = (r) => {
  const e = Math.floor(Number(r));
  return Number.isFinite(e) && e >= 1 ? e : 0;
}, S = "z-toggle-button-group-item", Q = (r, e) => {
  A(() => {
    var x;
    const o = r.current;
    if (!!((x = o.parentElement) != null && x.closest("z-toolbar"))) return;
    const d = () => [...o.querySelectorAll(S)], l = (t) => !t.isDisabled && !t.hasAttribute("is-hidden"), m = (t) => {
      for (const n of d()) n.tabIndex = n === t ? 0 : -1;
    }, p = () => {
      const t = d(), n = t.find((u) => u.isPressed && l(u)), i = t.find(l);
      return n ?? i;
    }, w = () => getComputedStyle(o).direction === "rtl", v = (t, n, i, u) => {
      for (const b of t.keys()) {
        const g = n + i * (b + 1);
        if ((g < 0 || g >= t.length) && !u) return;
        const z = (g % t.length + t.length) % t.length, I = t[z];
        if (l(I)) return I;
      }
    }, y = (t) => {
      const n = w() ? "ArrowLeft" : "ArrowRight", i = w() ? "ArrowRight" : "ArrowLeft";
      if (e.columns > 0)
        return t === n ? { step: 1, shouldWrap: !0 } : t === i ? { step: -1, shouldWrap: !0 } : t === "ArrowDown" ? { step: e.columns, shouldWrap: !1 } : t === "ArrowUp" ? { step: -e.columns, shouldWrap: !1 } : void 0;
      const b = e.isVertical ? "ArrowDown" : n, g = e.isVertical ? "ArrowUp" : i;
      if (t === b) return { step: 1, shouldWrap: !0 };
      if (t === g) return { step: -1, shouldWrap: !0 };
    }, c = (t) => {
      const n = d(), i = t.target.closest(S), u = i ? n.indexOf(i) : -1;
      if (u < 0) return;
      const b = n.filter(l), g = t.key === "Home", k = t.key === "End", z = y(t.key);
      if (!(g || k || !!z)) return;
      t.preventDefault();
      const O = b[0], F = b[b.length - 1], V = z ? v(n, u, z.step, z.shouldWrap) : void 0, E = g ? O : k ? F : V;
      E && (m(E), E.focus());
    }, s = (t) => {
      const n = t.target.closest(S);
      !!n && n.parentElement === o && m(n);
    }, a = (t) => {
      const n = t.relatedTarget;
      (!n || !o.contains(n)) && m(p());
    };
    m(p()), o.addEventListener("keydown", c), o.addEventListener("focusin", s), o.addEventListener("focusout", a);
    const f = new MutationObserver(() => {
      o.contains(document.activeElement) || m(p());
    });
    return f.observe(o, { childList: !0, subtree: !0, attributes: !0, attributeFilter: ["is-disabled", "is-hidden", "is-pressed"] }), () => {
      o.removeEventListener("keydown", c), o.removeEventListener("focusin", s), o.removeEventListener("focusout", a), f.disconnect();
    };
  }, [e.columns, e.isVertical, e.pressed.join("\0")]);
}, D = (r) => {
  const e = r.querySelectorAll("z-toggle-button-group-item"), o = [];
  for (const h of e)
    h.isPressed && h.value && o.push(h.value);
  return o;
};
R("z-toggle-button-group", _);
export {
  _ as ZToggleButtonGroup
};
