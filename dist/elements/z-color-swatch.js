// @ts-self-types="./z-color-swatch.d.ts"
import { c as o, a as n, g as c, j as r, d as l } from "../chunks/define-element-BZUk-KLk.js";
import { o as h } from "../chunks/prop-types-CSJu2W-0.js";
const d = o`
	:host {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		min-width: 0;
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-none);
		--chip-size: 1.25rem;
		--chip-radius: var(--radius-sm);
	}

	:host([size='sm']) {
		gap: var(--space-1-5);
		font-size: var(--font-size-xs);
		--chip-size: 1rem;
		--chip-radius: var(--radius-xs);
	}

	:host([size='lg']) {
		gap: var(--space-2-5);
		font-size: var(--font-size-md);
		--chip-size: 1.75rem;
		--chip-radius: var(--radius-md);
	}

	:host([is-round]) {
		--chip-radius: var(--radius-full);
	}

	:host([is-hidden]) {
		display: none;
	}

	.color-swatch-chip {
		flex-shrink: 0;
		width: var(--chip-size);
		height: var(--chip-size);
		border-radius: var(--chip-radius);
		background:
			linear-gradient(var(--swatch-color), var(--swatch-color)),
			repeating-conic-gradient(var(--surface-strong) 0 25%, var(--surface-default) 0 50%) 0 0 / 0.5rem 0.5rem;
		outline: 1px solid color-mix(in oklch, var(--text-primary) 14%, transparent);
		outline-offset: -1px;
	}

	.color-swatch-value {
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`, p = n(
  (e) => {
    const t = e.value || "transparent", i = e.label || e.value || "", s = !e.isValueHidden && i !== "", a = i !== "" && !s;
    return /* @__PURE__ */ c("host", { shadowDom: !0, children: [
      /* @__PURE__ */ r(
        "span",
        {
          class: "color-swatch-chip",
          part: "chip",
          role: a ? "img" : void 0,
          "aria-label": a ? i : void 0,
          "aria-hidden": !a ? "true" : void 0,
          style: { "--swatch-color": t }
        }
      ),
      s && /* @__PURE__ */ r("span", { class: "color-swatch-value", part: "value", children: i })
    ] });
  },
  {
    props: {
      value: { type: String, reflect: !0 },
      label: String,
      size: { type: h("sm", "md", "lg"), reflect: !0 },
      isRound: { type: Boolean, reflect: !0 },
      isValueHidden: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: d
  }
);
l("z-color-swatch", p);
export {
  p as ZColorSwatch
};
