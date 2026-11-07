import { c as y, a as k, u as A, f as a, b, g, j as x, d as D } from "../chunks/define-element-BZUk-KLk.js";
import { i as S } from "../chunks/interaction-styles-XiKFAbWA.js";
import { u as E } from "../chunks/hooks-DEFT8qqt.js";
import { f as P } from "../chunks/overlay-styles-BRIbX03i.js";
import { o as R, h as w, s as I, a as O, c as T, b as j, d as z } from "../chunks/overlay-BZjDggFA.js";
const H = 8, B = y`
	.surface {
		--tooltip-surface: var(--foreground);
		--tooltip-edge: color-mix(in srgb, var(--foreground) 78%, var(--background));
		padding: 0.4375rem 0.625rem;
		max-width: 16rem;
		font-size: var(--font-size-caption);
		font-weight: 500;
		line-height: 1.35;
		pointer-events: none;
		width: max-content;
		user-select: none;
		-webkit-user-select: none;
		font-weight: var(--font-weight-medium);
		/* inverse surface: reads at a glance as "not part of the page" */
		background: var(--inverse);
		color: var(--inverse-foreground);
		border: 1px solid var(--inverse);
		box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.6);
	}

	/* A square rotated onto its corner, centred exactly on the surface edge:
	   the outer half is the point, and the inner half's own background covers
	   the 1px border it straddles, so the two read as one shape. Only two of
	   its borders are drawn, the pair that meets at the leading corner. */
	.arrow {
		position: absolute;
		width: 8px;
		height: 8px;
		background: var(--inverse);
		rotate: 45deg;
	}

	/* physical: the arrow follows the side the overlay engine measured */
	.surface[data-side='top'] .arrow {
		bottom: -4px;
		left: var(--arrow-x, 50%); /* physical */
		margin-inline-start: -4px;
		border-inline-end: 1px solid var(--inverse);
		border-bottom: 1px solid var(--inverse);
	}

	.surface[data-side='bottom'] .arrow {
		top: -4px;
		left: var(--arrow-x, 50%); /* physical */
		margin-inline-start: -4px;
		border-inline-start: 1px solid var(--inverse);
		border-top: 1px solid var(--inverse);
	}

	.surface[data-side='left'] .arrow {
		right: -4px; /* physical */
		top: var(--arrow-y, 50%);
		margin-top: -4px;
		border-top: 1px solid var(--inverse);
		border-inline-end: 1px solid var(--inverse);
	}

	.surface[data-side='right'] .arrow {
		left: -4px; /* physical */
		top: var(--arrow-y, 50%);
		margin-top: -4px;
		border-bottom: 1px solid var(--inverse);
		border-inline-start: 1px solid var(--inverse);
	}

	/* a tone tints the inverse surface rather than replacing it */
	:host([tone='secondary']) .surface {
		background: color-mix(in oklab, var(--inverse) 82%, var(--purple));
		border-color: transparent;
	}

	:host([tone='tertiary']) .surface {
		background: color-mix(in oklab, var(--inverse) 82%, var(--pink));
		border-color: transparent;
	}
`, F = k(
  (t) => {
    const s = A(), l = a(), d = a(), i = a(), [u, p] = E(!1), n = a(), f = () => {
      var o, m;
      const e = (o = d.current) == null ? void 0 : o.assignedElements({ flatten: !0 })[0], r = n.current;
      r && (r.element !== e || !t.content) && (r.element.getAttribute("aria-description") === r.text && r.element.removeAttribute("aria-description"), n.current = void 0), !(!e || !t.content || !(((m = n.current) == null ? void 0 : m.element) === e) && e.hasAttribute("aria-description")) && (e.setAttribute("aria-description", t.content), n.current = { element: e, text: t.content });
    };
    b(f, [t.content]), b(() => {
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
      t.isDisabled || !t.content || (clearTimeout(i.current), i.current = setTimeout(() => p(!0), t.openDelay ?? 150));
    }, c = () => {
      clearTimeout(i.current), p(!1);
    };
    return /* @__PURE__ */ g(
      "host",
      {
        shadowDom: !0,
        onpointerenter: v,
        onpointerleave: c,
        onfocusin: v,
        onfocusout: c,
        onkeydown: (e) => e.key === "Escape" && c(),
        children: [
          /* @__PURE__ */ x("slot", { ref: d, onslotchange: f }),
          /* @__PURE__ */ g("div", { ref: l, class: "surface", popover: "manual", role: "tooltip", children: [
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
