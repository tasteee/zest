import { c as n, a as c, u as h, f, b as p, g as o, j as r, d as b } from "../chunks/define-element-BWC3wEPr.js";
import { t as u } from "../chunks/scrollbar-styles-DNEW5KBr.js";
const m = n`
	:host {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		gap: var(--chassis-bezel, 0.75rem);
		padding-top: var(--chassis-frame, 0.375rem);
		padding-right: var(--chassis-frame, 0.375rem);
		padding-bottom: var(--chassis-frame, 0.375rem);
		padding-left: var(--chassis-bezel, 0.75rem);
		background: var(--chassis-body, var(--paper));
		border: 1px solid var(--chassis-border, var(--color-neutral-3));
		border-radius: var(--chassis-radius, var(--radius-xl));
		color: var(--foreground);
	}
	:host([rail-side='right']) {
		flex-direction: row-reverse;
		padding-left: var(--chassis-frame, 0.375rem);
		padding-right: var(--chassis-bezel, 0.75rem);
	}
	:host([is-hidden]) {
		display: none;
	}

	/* the rail is part of the lighter body — no surface of its own */
	.rail {
		flex: 0 0 var(--chassis-rail-width, 4.25rem);
		width: var(--chassis-rail-width, 4.25rem);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		min-height: 0;
		box-sizing: border-box;
		padding: 0.125rem;
		overflow: hidden;
		/* the fluid part: expand/collapse the rail — and, via flex, the screen —
		   on a long premium easing (easeOutQuint). */
		transition:
			flex-basis var(--chassis-duration, 420ms) var(--chassis-ease, cubic-bezier(0.22, 1, 0.36, 1)),
			width var(--chassis-duration, 420ms) var(--chassis-ease, cubic-bezier(0.22, 1, 0.36, 1));
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
		gap: 0.5rem;
		padding-top: 8px;
		overflow: hidden;
	}

	.rail-main {
		flex: 1 1 auto;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 0.5rem;
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
		gap: 0.5rem;
		padding-bottom: 8px;
		overflow: hidden;
	}

	/* the screen — the darker, inset display */
	.screen {
		flex: 1 1 auto;
		min-width: 0;
		min-height: 0;
		overflow: auto;
		/* Same reason as .rail-main: a page that runs to the end of its
		   scroll shouldn't drag whatever's outside the chassis up with it. */
		overscroll-behavior: contain;
		position: relative;
		background: var(--chassis-screen, var(--bg));
		border: 1px solid var(--chassis-screen-border, var(--border));
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
		background: var(--color-neutral-3);
		border: 2px solid transparent;
		border-radius: 999px;
		background-clip: padding-box;
	}
	.screen::-webkit-scrollbar-thumb:hover {
		background: var(--color-neutral-4);
		background-clip: padding-box;
	}

	@media (prefers-reduced-motion: reduce) {
		.rail {
			transition: none;
		}
	}
`, v = c(
  (e) => {
    const l = h(), s = f(), a = {};
    return e.railWidth && (a["--chassis-rail-width"] = e.railWidth), e.railCollapsedWidth && (a["--chassis-rail-collapsed"] = e.railCollapsedWidth), e.bezel && (a["--chassis-bezel"] = e.bezel), e.frame && (a["--chassis-frame"] = e.frame), p(() => {
      const i = l.current;
      i.scrollScreenTo = (d) => {
        var t;
        return (t = s.current) == null ? void 0 : t.scrollTo(d);
      }, i.getScreen = () => s.current ?? null;
    }, []), /* @__PURE__ */ o("host", { shadowDom: !0, style: a, children: [
      /* @__PURE__ */ o("div", { class: "rail", part: "rail", children: [
        /* @__PURE__ */ r("div", { class: "rail-head", children: /* @__PURE__ */ r("slot", { name: "sidebar-header" }) }),
        /* @__PURE__ */ r("div", { class: "rail-main", children: /* @__PURE__ */ r("slot", { name: "sidebar" }) }),
        /* @__PURE__ */ r("div", { class: "rail-foot", children: /* @__PURE__ */ r("slot", { name: "sidebar-footer" }) })
      ] }),
      /* @__PURE__ */ r("div", { class: "screen", part: "screen", ref: s, children: /* @__PURE__ */ r("slot", {}) })
    ] });
  },
  {
    props: {
      railWidth: { type: String, reflect: !0 },
      railCollapsedWidth: { type: String, reflect: !0 },
      bezel: { type: String, reflect: !0 },
      frame: { type: String, reflect: !0 },
      railSide: { type: String, reflect: !0 },
      doesExpandOnHover: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: [u, m]
  }
);
b("z-chassis", v);
export {
  v as ZChassis
};
