import { c as i, a, j as r, d as l } from "../chunks/define-element-BZUk-KLk.js";
import { d as s, i as n, e as h, p as c, f as d } from "../chunks/layout-schema-CPCZ71fv.js";
import { t as b } from "../chunks/scrollbar-styles-Csqxxw2V.js";
import { o as e } from "../chunks/prop-types-B3Bpi956.js";
const w = i`
	:host {
		display: block;
		min-height: 0;
		/* A scroll container must not widen the grid or flex parent that holds it. */
		min-width: 0;
	}

	.viewport {
		box-sizing: border-box;
		/* Without a max-height the viewport grows with its content and never
		   scrolls inside a height-constrained parent (a flex or grid item).
		   100% resolves against the host: it caps a constrained host, and is
		   ignored (treated as none) when the host's height is auto. */
		max-height: var(--z-scroll-max-height, 100%);
		max-width: var(--z-scroll-max-width, none);
		padding-top: var(--z-scroll-pad-top, 0);
		padding-bottom: var(--z-scroll-pad-bottom, 0);
		padding-inline-start: var(--z-scroll-pad-left, 0);
		padding-inline-end: var(--z-scroll-pad-right, 0);
		overflow-x: hidden;
		overflow-y: auto;
	}

	/* Firefox only (no ::-webkit-scrollbar). Chromium must not get scrollbar-width
	   or it falls back to the OS bar with its stepper arrows; it uses the custom
	   ::-webkit-scrollbar rules below instead. */
	@supports not selector(::-webkit-scrollbar) {
		.viewport {
			scrollbar-width: thin;
			scrollbar-color: var(--color-neutral-3) transparent;
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
		background: var(--color-neutral-3);
		border-radius: 999px;
	}
	.viewport::-webkit-scrollbar-thumb:hover {
		background: var(--color-neutral-4);
	}
	.viewport::-webkit-scrollbar-button {
		display: none;
		width: 0;
		height: 0;
	}
	.viewport::-webkit-scrollbar-corner {
		background: transparent;
	}
`, p = (t) => {
  const o = { ...d(t, "--z-scroll") };
  return t.maxHeight && (o["--z-scroll-max-height"] = t.maxHeight), t.maxWidth && (o["--z-scroll-max-width"] = t.maxWidth), o;
}, v = a(
  (t) => /* @__PURE__ */ r("host", { shadowDom: !0, style: p(t), children: /* @__PURE__ */ r("div", { class: "viewport", tabindex: "0", children: /* @__PURE__ */ r("slot", {}) }) }),
  {
    props: {
      direction: { type: e("vertical", "horizontal", "both"), reflect: !0 },
      maxHeight: String,
      maxWidth: String,
      overscroll: { type: e("auto", "contain", "none"), reflect: !0 },
      scrollbar: { type: e("auto", "thin", "hidden"), reflect: !0 },
      ...n
    },
    styles: [
      s,
      h([...c("--z-scroll"), "--z-scroll-max-height", "--z-scroll-max-width"]),
      b,
      w
    ]
  }
);
l("z-scroll", v);
export {
  v as ZScroll
};
