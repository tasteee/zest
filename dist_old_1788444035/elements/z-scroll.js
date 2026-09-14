import { c as e, a as l, j as t, d as i } from "../chunks/define-element-BWC3wEPr.js";
import { d as a, i as s, e as c } from "../chunks/layout-schema-SeDcUpZQ.js";
import { t as n } from "../chunks/scrollbar-styles-DNEW5KBr.js";
const h = e`
	:host {
		display: block;
		min-height: 0;
	}

	.viewport {
		box-sizing: border-box;
		max-height: var(--z-scroll-max-height, none);
		max-width: var(--z-scroll-max-width, none);
		padding-top: var(--z-scroll-pad-top, 0);
		padding-bottom: var(--z-scroll-pad-bottom, 0);
		padding-left: var(--z-scroll-pad-left, 0);
		padding-right: var(--z-scroll-pad-right, 0);
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
`, d = (r) => {
  const o = { ...c(r, "--z-scroll") };
  return r.maxHeight && (o["--z-scroll-max-height"] = r.maxHeight), r.maxWidth && (o["--z-scroll-max-width"] = r.maxWidth), o;
}, b = l(
  (r) => /* @__PURE__ */ t("host", { shadowDom: !0, style: d(r), children: /* @__PURE__ */ t("div", { class: "viewport", tabindex: "0", children: /* @__PURE__ */ t("slot", {}) }) }),
  {
    props: {
      direction: { type: String, reflect: !0 },
      maxHeight: String,
      maxWidth: String,
      overscroll: { type: String, reflect: !0 },
      scrollbar: { type: String, reflect: !0 },
      ...s
    },
    styles: [a, n, h]
  }
);
i("z-scroll", b);
export {
  b as ZScroll
};
