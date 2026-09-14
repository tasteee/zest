import { c as h, a as b, u as x, f as c, b as v, g as p, j as u, d as w } from "../chunks/define-element-BWC3wEPr.js";
import { u as y } from "../chunks/hooks-D9_x-ckD.js";
import { f as k } from "../chunks/overlay-styles-DmJDaq8Z.js";
import { o as A, h as f, s as D, a as P, c as S, b as E, d as O } from "../chunks/overlay-BJ9Mg5BD.js";
const R = 8, T = h`
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
		background: var(--tooltip-surface);
		color: var(--background);
		border: 1px solid var(--tooltip-edge);
		border-radius: var(--radius-sm);
		box-shadow: none;
	}

	/* A square rotated onto its corner, centred exactly on the surface edge:
	   the outer half is the point, and the inner half's own background covers
	   the 1px border it straddles, so the two read as one shape. Only two of
	   its borders are drawn — the pair that meets at the leading corner. */
	.arrow {
		position: absolute;
		width: 8px;
		height: 8px;
		background: var(--tooltip-surface);
		rotate: 45deg;
	}

	.surface[data-side='top'] .arrow {
		bottom: -4px;
		left: var(--arrow-x, 50%);
		margin-left: -4px;
		border-right: 1px solid var(--tooltip-edge);
		border-bottom: 1px solid var(--tooltip-edge);
	}

	.surface[data-side='bottom'] .arrow {
		top: -4px;
		left: var(--arrow-x, 50%);
		margin-left: -4px;
		border-left: 1px solid var(--tooltip-edge);
		border-top: 1px solid var(--tooltip-edge);
	}

	.surface[data-side='left'] .arrow {
		right: -4px;
		top: var(--arrow-y, 50%);
		margin-top: -4px;
		border-top: 1px solid var(--tooltip-edge);
		border-right: 1px solid var(--tooltip-edge);
	}

	.surface[data-side='right'] .arrow {
		left: -4px;
		top: var(--arrow-y, 50%);
		margin-top: -4px;
		border-bottom: 1px solid var(--tooltip-edge);
		border-left: 1px solid var(--tooltip-edge);
	}
`, j = b(
  (o) => {
    const t = x(), s = c(), r = c(), [n, i] = y(!1);
    v(() => {
      const e = s.current;
      if (!e || !n) {
        e && f(e);
        return;
      }
      D(e);
      const g = () => {
        const l = S(t.current, e, {
          placement: o.placement || "top",
          offset: o.offset ?? 8
        });
        E(e, l), O(e, t.current, l, R);
      }, m = P(t.current, e, g);
      return () => {
        m(), f(e);
      };
    }, [n, o.placement, o.offset]);
    const d = () => {
      o.isDisabled || !o.content || (clearTimeout(r.current), r.current = setTimeout(() => i(!0), o.openDelay ?? 150));
    }, a = () => {
      clearTimeout(r.current), i(!1);
    };
    return /* @__PURE__ */ p(
      "host",
      {
        shadowDom: !0,
        onpointerenter: d,
        onpointerleave: a,
        onfocusin: d,
        onfocusout: a,
        onkeydown: (e) => e.key === "Escape" && a(),
        children: [
          /* @__PURE__ */ u("slot", {}),
          /* @__PURE__ */ p("div", { ref: s, class: "surface", popover: "manual", role: "tooltip", children: [
            o.content,
            !o.doesHideArrow && /* @__PURE__ */ u("span", { class: "arrow", "aria-hidden": "true" })
          ] })
        ]
      }
    );
  },
  {
    props: {
      ...A,
      content: String,
      openDelay: { type: Number },
      doesHideArrow: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 }
    },
    styles: [k, T]
  }
);
w("z-tooltip", j);
export {
  j as ZTooltip
};
