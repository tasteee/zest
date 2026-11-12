// @ts-self-types="./z-scroll-area.d.ts"
import { c as a, a as i, j as e, d as l } from "../chunks/define-element-BZUk-KLk.js";
import { d as s, i as n, e as h, p as d, f as c } from "../chunks/layout-schema-CdiVYtzv.js";
import { t as b } from "../chunks/scrollbar-styles-CaLPixBv.js";
import { o } from "../chunks/prop-types-B3Bpi956.js";
const w = a`
	:host {
		display: block;
		min-height: 0;
		/* A scroll container must not widen the grid or flex parent that holds it. */
		min-width: 0;
	}

	:host([is-hidden]) {
		display: none;
	}

	.viewport {
		box-sizing: border-box;
		/* Without a max-height the viewport grows with its content and never
		   scrolls inside a height-constrained parent (a flex or grid item).
		   100% resolves against the host: it caps a constrained host, and is
		   ignored (treated as none) when the host's height is auto. */
		height: var(--z-scroll-area-height, auto);
		max-height: var(--z-scroll-area-max-height, 100%);
		max-width: var(--z-scroll-area-max-width, none);
		padding-top: var(--z-scroll-area-pad-top, 0);
		padding-bottom: var(--z-scroll-area-pad-bottom, 0);
		padding-inline-start: var(--z-scroll-area-pad-left, 0);
		padding-inline-end: var(--z-scroll-area-pad-right, 0);
		overflow-x: hidden;
		overflow-y: auto;
	}

	/* Firefox only (no ::-webkit-scrollbar). Chromium must not get scrollbar-width
	   or it falls back to the OS bar with its stepper arrows; it uses the custom
	   ::-webkit-scrollbar rules below instead. */
	@supports not selector(::-webkit-scrollbar) {
		.viewport {
			scrollbar-width: thin;
			scrollbar-color: var(--border-default) transparent;
		}
	}

	:host([direction='horizontal']) .viewport {
		overflow-x: auto;
		overflow-y: hidden;
	}
	:host([direction='both']) .viewport {
		overflow: auto;
	}

	:host([scrollbar='auto']) .viewport {
		scrollbar-width: auto;
	}
	:host([scrollbar='hidden']) .viewport {
		scrollbar-width: none;
	}
	:host([scrollbar='hidden']) .viewport::-webkit-scrollbar {
		display: none;
	}

	:host([overscroll='auto']) .viewport {
		overscroll-behavior: auto;
	}
	:host([overscroll='contain']) .viewport {
		overscroll-behavior: contain;
	}
	:host([overscroll='none']) .viewport {
		overscroll-behavior: none;
	}

	/* WebKit / Chromium */
	.viewport::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}
	.viewport::-webkit-scrollbar-track {
		background: transparent;
	}
	.viewport::-webkit-scrollbar-thumb {
		background: var(--border-default);
		border-radius: var(--radius-full);
	}
	.viewport::-webkit-scrollbar-thumb:hover {
		background: var(--border-strong);
	}
	.viewport::-webkit-scrollbar-button {
		display: none;
		width: 0;
		height: 0;
	}
	.viewport::-webkit-scrollbar-corner {
		background: transparent;
	}
`, v = (r) => {
  const t = { ...c(r, "--z-scroll-area") };
  return r.height && (t["--z-scroll-area-height"] = r.height), r.maxHeight && (t["--z-scroll-area-max-height"] = r.maxHeight), r.maxWidth && (t["--z-scroll-area-max-width"] = r.maxWidth), t;
}, p = i(
  (r) => /* @__PURE__ */ e("host", { shadowDom: !0, style: v(r), children: /* @__PURE__ */ e("div", { class: "viewport", tabindex: "0", children: /* @__PURE__ */ e("slot", {}) }) }),
  {
    props: {
      direction: { type: o("vertical", "horizontal", "both"), reflect: !0 },
      maxHeight: String,
      height: String,
      isHidden: { type: Boolean, reflect: !0 },
      maxWidth: String,
      overscroll: { type: o("auto", "contain", "none"), reflect: !0 },
      scrollbar: { type: o("auto", "thin", "hidden"), reflect: !0 },
      ...n
    },
    styles: [
      s,
      h([...d("--z-scroll-area"), "--z-scroll-area-max-height", "--z-scroll-area-max-width", "--z-scroll-area-height"]),
      b,
      w
    ]
  }
);
l("z-scroll-area", p);
export {
  p as ZScrollArea
};
