import { c as o, a as e, j as r, d as i } from "../chunks/define-element-BWC3wEPr.js";
import { t as l } from "../chunks/scrollbar-styles-DNEW5KBr.js";
const a = o`
	:host {
		display: block;
		min-height: 0;
	}

	:host([is-hidden]) {
		display: none;
	}

	.viewport {
		box-sizing: border-box;
		max-height: var(--z-scroll-max-height, none);
		height: var(--z-scroll-height, auto);
		overflow: auto;
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

	:host([direction='vertical']) .viewport {
		overflow-x: hidden;
		overflow-y: auto;
	}

	:host([direction='horizontal']) .viewport {
		overflow-x: auto;
		overflow-y: hidden;
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
`, s = e(
  (t) => /* @__PURE__ */ r(
    "host",
    {
      shadowDom: !0,
      style: {
        "--z-scroll-max-height": t.maxHeight || "",
        "--z-scroll-height": t.height || ""
      },
      children: /* @__PURE__ */ r("div", { class: "viewport", tabindex: "0", children: /* @__PURE__ */ r("slot", {}) })
    }
  ),
  {
    props: {
      maxHeight: String,
      height: String,
      direction: { type: String, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: [l, a]
  }
);
i("z-scroll-area", s);
export {
  s as ZScrollArea
};
