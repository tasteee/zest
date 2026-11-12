// @ts-self-types="./z-chassis.d.ts"
import { c as n, a as c, u as h, f, b as p, g as o, j as a, d as u } from "../chunks/define-element-BZUk-KLk.js";
import { t as v } from "../chunks/scrollbar-styles-CaLPixBv.js";
import { o as b } from "../chunks/prop-types-B3Bpi956.js";
const m = n`
	:host {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		gap: var(--chassis-bezel, 0.75rem);
		padding-top: var(--chassis-frame, 0.375rem);
		padding-inline-end: var(--chassis-frame, 0.375rem);
		padding-bottom: var(--chassis-frame, 0.375rem);
		padding-inline-start: var(--chassis-bezel, 0.75rem);
		background: var(--chassis-body, var(--surface-default));
		border: 1px solid var(--chassis-border, var(--border-default));
		border-radius: var(--chassis-radius, var(--radius-xl));
		color: var(--text-primary);
	}
	:host([rail-side='right']) {
		flex-direction: row-reverse;
		padding-inline-start: var(--chassis-frame, 0.375rem);
		padding-inline-end: var(--chassis-bezel, 0.75rem);
	}
	:host([is-hidden]) {
		display: none;
	}

	/* the rail is part of the lighter body, no surface of its own */
	.rail {
		flex: 0 0 var(--chassis-rail-width, 4.25rem);
		width: var(--chassis-rail-width, 4.25rem);
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		min-height: 0;
		box-sizing: border-box;
		padding: var(--space-0-5);
		overflow: hidden;
		/* the fluid part: expand/collapse the rail and, via flex, the screen,
		   on a long premium easing (easeOutQuint). */
		transition:
			flex-basis var(--chassis-duration, 420ms) var(--chassis-ease, var(--ease-enter)),
			width var(--chassis-duration, 420ms) var(--chassis-ease, var(--ease-enter));
	}
	:host([does-expand-on-hover]) .rail {
		flex-basis: var(--chassis-rail-collapsed, 3.5rem);
		width: var(--chassis-rail-collapsed, 3.5rem);
		--chassis-label-opacity: 0;
	}
	:host([does-expand-on-hover]) .rail:hover,
	:host([does-expand-on-hover]) .rail:focus-within {
		flex-basis: var(--chassis-rail-width, 4.25rem);
		width: var(--chassis-rail-width, 4.25rem);
		--chassis-label-opacity: 1;
	}

	/* Pinned above the scrolling rail body — a logo or workspace switcher
	   should not scroll away with the nav beneath it. */
	.rail-head {
		flex: 0 0 auto;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: var(--space-2);
		padding-top: 8px;
		overflow: hidden;
	}

	.rail-main {
		flex: 1 1 auto;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: var(--space-2);
		min-height: 0;
		padding-top: 8px;
		overflow-y: auto;
		overflow-x: hidden;
		/* Keeps a flick past the last nav row from chaining out to the
		   page or the document beneath it. */
		overscroll-behavior: contain;
	}
	.rail-foot {
		flex: 0 0 auto;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: var(--space-2);
		padding-bottom: 8px;
		overflow: hidden;
	}

	/* the screen, the darker, inset display */
	.screen {
		flex: 1 1 auto;
		min-width: 0;
		min-height: 0;
		overflow: auto;
		/* Same reason as .rail-main: a page that runs to the end of its
		   scroll shouldn't drag whatever's outside the chassis up with it. */
		overscroll-behavior: contain;
		position: relative;
		background: var(--chassis-screen, var(--surface-page));
		border: 1px solid var(--chassis-screen-border, var(--border-default));
		border-radius: var(--chassis-screen-radius, var(--radius-lg));
	}
	.screen::-webkit-scrollbar {
		width: 10px;
		height: 10px;
	}
	.screen::-webkit-scrollbar-track {
		background: transparent;
	}
	.screen::-webkit-scrollbar-thumb {
		background: var(--border-default);
		border: 2px solid transparent;
		border-radius: var(--radius-full);
		background-clip: padding-box;
	}
	.screen::-webkit-scrollbar-thumb:hover {
		background: var(--border-strong);
		background-clip: padding-box;
	}

	@media (prefers-reduced-motion: reduce) {
		.rail {
			transition: none;
		}
	}
`, g = c(
  (e) => {
    const l = h(), s = f(), r = {};
    return e.railWidth && (r["--chassis-rail-width"] = e.railWidth), e.railCollapsedWidth && (r["--chassis-rail-collapsed"] = e.railCollapsedWidth), e.bezel && (r["--chassis-bezel"] = e.bezel), e.frame && (r["--chassis-frame"] = e.frame), p(() => {
      const i = l.current;
      i.scrollScreenTo = (d) => {
        var t;
        return (t = s.current) == null ? void 0 : t.scrollTo(d);
      }, i.getScreen = () => s.current ?? null;
    }, []), /* @__PURE__ */ o("host", { shadowDom: !0, style: r, children: [
      /* @__PURE__ */ o("div", { class: "rail", part: "rail", children: [
        /* @__PURE__ */ a("div", { class: "rail-head", children: /* @__PURE__ */ a("slot", { name: "sidebar-header" }) }),
        /* @__PURE__ */ a("div", { class: "rail-main", children: /* @__PURE__ */ a("slot", { name: "sidebar" }) }),
        /* @__PURE__ */ a("div", { class: "rail-foot", children: /* @__PURE__ */ a("slot", { name: "sidebar-footer" }) })
      ] }),
      /* @__PURE__ */ a("div", { class: "screen", part: "screen", ref: s, children: /* @__PURE__ */ a("slot", {}) })
    ] });
  },
  {
    props: {
      railWidth: { type: String, reflect: !0 },
      railCollapsedWidth: { type: String, reflect: !0 },
      bezel: { type: String, reflect: !0 },
      frame: { type: String, reflect: !0 },
      railSide: { type: b("left", "right"), reflect: !0 },
      doesExpandOnHover: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: [v, m]
  }
);
u("z-chassis", g);
export {
  g as ZChassis
};
