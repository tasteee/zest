// @ts-self-types="./z-tooltip.d.ts"
import { c as y, a as k, u as A, f as n, b as g, g as b, j as x, d as D } from "../chunks/define-element-BZUk-KLk.js";
import { i as S } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as E } from "../chunks/hooks-DEFT8qqt.js";
import { f as P } from "../chunks/overlay-styles-BeWhjeXT.js";
import { o as R, h as w, s as I, a as O, c as T, b as j, d as z } from "../chunks/overlay-CFiufx65.js";
const H = 8, B = y`
	.surface {
		--tooltip-surface: var(--text-primary);
		--tooltip-edge: color-mix(in srgb, var(--text-primary) 78%, var(--surface-page));
		padding: var(--space-2) var(--space-2-5);
		max-width: 16rem;
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-snug);
		pointer-events: none;
		width: max-content;
		user-select: none;
		-webkit-user-select: none;
		font-weight: var(--font-weight-medium);
		/* inverse surface: reads at a glance as "not part of the page" */
		background: var(--surface-inverse);
		color: var(--text-inverse);
		border: 1px solid var(--surface-inverse);
		box-shadow: var(--shadow-overlay);
	}

	/* A square rotated onto its corner, centred exactly on the surface edge:
	   the outer half is the point, and the inner half's own background covers
	   the 1px border it straddles, so the two read as one shape. Only two of
	   its borders are drawn, the pair that meets at the leading corner. */
	.arrow {
		position: absolute;
		width: 8px;
		height: 8px;
		background: var(--surface-inverse);
		rotate: 45deg;
	}

	/* physical: the arrow follows the side the overlay engine measured */
	.surface[data-side='top'] .arrow {
		bottom: -4px;
		left: var(--arrow-x, 50%); /* physical */
		margin-inline-start: -4px;
		border-inline-end: 1px solid var(--surface-inverse);
		border-bottom: 1px solid var(--surface-inverse);
	}

	.surface[data-side='bottom'] .arrow {
		top: -4px;
		left: var(--arrow-x, 50%); /* physical */
		margin-inline-start: -4px;
		border-inline-start: 1px solid var(--surface-inverse);
		border-top: 1px solid var(--surface-inverse);
	}

	.surface[data-side='left'] .arrow {
		right: -4px; /* physical */
		top: var(--arrow-y, 50%);
		margin-top: -4px;
		border-top: 1px solid var(--surface-inverse);
		border-inline-end: 1px solid var(--surface-inverse);
	}

	.surface[data-side='right'] .arrow {
		left: -4px; /* physical */
		top: var(--arrow-y, 50%);
		margin-top: -4px;
		border-bottom: 1px solid var(--surface-inverse);
		border-inline-start: 1px solid var(--surface-inverse);
	}

	/* a tone tints the inverse surface rather than replacing it */
	:host([tone='secondary']) .surface {
		background: color-mix(in oklab, var(--surface-inverse) 82%, var(--accent-secondary));
		border-color: transparent;
	}

	:host([tone='tertiary']) .surface {
		background: color-mix(in oklab, var(--surface-inverse) 82%, var(--accent-tertiary));
		border-color: transparent;
	}
`, F = k(
  (t) => {
    const s = A(), l = n(), d = n(), i = n(), [u, f] = E(!1), a = n(), p = () => {
      var o, m;
      const e = (o = d.current) == null ? void 0 : o.assignedElements({ flatten: !0 })[0], r = a.current;
      r && (r.element !== e || !t.content) && (r.element.getAttribute("aria-description") === r.text && r.element.removeAttribute("aria-description"), a.current = void 0), !(!e || !t.content || !(((m = a.current) == null ? void 0 : m.element) === e) && e.hasAttribute("aria-description")) && (e.setAttribute("aria-description", t.content), a.current = { element: e, text: t.content });
    };
    g(p, [t.content]), g(() => {
      const e = l.current;
      if (!e || !u) {
        e && w(e);
        return;
      }
      I(e);
      const r = () => {
        const o = T(s.current, e, {
          placement: t.placement || "top",
          offset: t.offset ?? 8
        });
        j(e, o), z(e, s.current, o, H);
      }, h = O(s.current, e, r);
      return () => {
        h(), w(e);
      };
    }, [u, t.placement, t.offset]);
    const v = () => {
      t.isDisabled || !t.content || (clearTimeout(i.current), i.current = setTimeout(() => f(!0), t.openDelay ?? 150));
    }, c = () => {
      clearTimeout(i.current), f(!1);
    };
    return /* @__PURE__ */ b(
      "host",
      {
        shadowDom: !0,
        onpointerenter: v,
        onpointerleave: c,
        onfocusin: v,
        onfocusout: c,
        onkeydown: (e) => e.key === "Escape" && c(),
        children: [
          /* @__PURE__ */ x("slot", { ref: d, onslotchange: p }),
          /* @__PURE__ */ b("div", { ref: l, class: "surface", popover: "manual", role: "tooltip", children: [
            t.content,
            !t.doesHideArrow && /* @__PURE__ */ x("span", { class: "arrow", "aria-hidden": "true" })
          ] })
        ]
      }
    );
  },
  {
    props: {
      ...R,
      content: String,
      openDelay: { type: Number },
      doesHideArrow: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 }
    },
    styles: [P, B, S]
  }
);
D("z-tooltip", F);
export {
  F as ZTooltip
};
