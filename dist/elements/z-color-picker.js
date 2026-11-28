// @ts-self-types="./z-color-picker.d.ts"
import { c as L, a as S, e as a, u as j, f, b as T, j as s, g as V } from "../chunks/define-element-BZUk-KLk.js";
import { u as n } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as I, d as $ } from "../chunks/form-control-B69z9f8A.js";
import { i as Z } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as q } from "../chunks/locale-BNhgEFKA.js";
import { o as G } from "../chunks/prop-types-CSJu2W-0.js";
import { o as J } from "../chunks/overlay-DCHYaOiA.js";
import { r as K, a as M } from "../chunks/z-color-panel-DCwiC6dj.js";
import "./z-popover.js";
import "./z-color-swatch.js";
const N = L`
	:host {
		display: inline-flex;
		--tone: var(--accent-primary);
	}

	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}

	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
	}

	:host([is-hidden]) {
		display: none;
	}

	z-popover {
		--z-overlay-padding: var(--space-3);
		--z-overlay-max-width: none;
	}

	.color-picker-trigger {
		display: inline-flex;
		align-items: center;
		height: var(--control-height-md);
		max-width: 100%;
		padding-inline: var(--space-2-5) var(--space-3-5);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		background: transparent;
		cursor: pointer;
		transition: border-color var(--motion-fast) var(--ease-enter);
	}

	.color-picker-trigger:hover {
		border-color: var(--border-strong);
	}

	.color-picker-trigger.isOpen {
		border-color: var(--tone);
	}

	.color-picker-trigger:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	.color-picker-trigger:disabled {
		opacity: var(--control-disabled-opacity);
		cursor: not-allowed;
	}

	/* The value text is monospace, so a fixed width in characters
	   keeps the trigger still while the color moves. The widths are
	   the longest string each format can print, with alpha. */
	.color-picker-trigger z-color-swatch::part(value) {
		width: 28ch;
	}
	.color-picker-trigger[data-format='hex'] z-color-swatch::part(value) {
		width: 9ch;
	}
	.color-picker-trigger[data-format='rgb'] z-color-swatch::part(value),
	.color-picker-trigger[data-format='hsl'] z-color-swatch::part(value),
	.color-picker-trigger[data-format='hsb'] z-color-swatch::part(value),
	.color-picker-trigger[data-format='hwb'] z-color-swatch::part(value) {
		width: 24ch;
	}

	.color-picker-panel {
		width: 16rem;
	}
`, Q = S(
  (t) => {
    var p;
    const b = q(), c = j(), [d, r] = n("value"), [y, v] = n("format"), [h, w] = n("isOpen"), k = f(d), u = f(), P = K(t.formats), l = M(d, y, P), o = l.text, { isFormDisabled: C } = I({
      value: o,
      isDisabled: t.isDisabled,
      control: u,
      onReset: () => r(k.current),
      onRestore: (e) => {
        typeof e == "string" && e !== "" && r(e);
      }
    }), i = !!(t.isDisabled || C), x = Array.isArray(t.presets) ? t.presets : t.swatches;
    T(() => {
      c.current.style.setProperty("--z-color-value", o);
    }, [o]);
    const z = (e) => {
      e instanceof CustomEvent && (e.stopPropagation(), r(e.detail.value), t.input(e.detail));
    }, A = (e) => {
      e.stopPropagation(), r(e.detail.value), t.change(e.detail);
    }, B = (e) => {
      e.stopPropagation(), v(e.detail.format), r(e.detail.value), t.formatchange(e.detail);
    }, F = (e) => {
      e instanceof CustomEvent && (e.stopPropagation(), t.copy(e.detail));
    }, O = (e) => {
      e.stopPropagation(), w(e.detail.open), t.toggle(e.detail);
    }, g = t.label || ((p = c.current) == null ? void 0 : p.getAttribute("aria-label")), D = g ? `${g}, ${o}` : void 0, H = h ? "color-picker-trigger isOpen" : "color-picker-trigger", R = t.placement || "bottom-start";
    return /* @__PURE__ */ s("host", { shadowDom: { delegatesFocus: !0 }, children: /* @__PURE__ */ V(
      "z-popover",
      {
        placement: R,
        offset: t.offset ?? 6,
        label: b("chooseColor"),
        isOpen: !!h,
        isDisabled: i,
        tone: t.tone,
        ontoggle: O,
        children: [
          /* @__PURE__ */ s("slot", { name: "trigger", slot: "trigger", children: /* @__PURE__ */ s("button", { ref: u, type: "button", class: H, "data-format": l.format, disabled: i, "aria-label": D, children: /* @__PURE__ */ s("z-color-swatch", { value: o }) }) }),
          /* @__PURE__ */ s(
            "z-color-panel",
            {
              class: "color-picker-panel",
              value: o,
              format: l.format,
              formats: t.formats,
              swatches: x,
              tone: t.tone,
              hasAlpha: t.hasAlpha,
              hasEyedropper: t.hasEyedropper,
              isChannelsHidden: t.isChannelsHidden,
              isCopyHidden: t.isCopyHidden,
              isDisabled: i,
              oninput: z,
              onchange: A,
              onformatchange: B,
              oncopy: F
            }
          )
        ]
      }
    ) });
  },
  {
    props: {
      ...J,
      value: { type: String, reflect: !0 },
      format: { type: G("hex", "rgb", "hsl", "hsb", "hwb", "oklch", "oklab", "lch", "lab", "p3"), reflect: !0 },
      formats: { type: Array },
      swatches: { type: Array },
      presets: { type: Array },
      name: { type: String, reflect: !0 },
      label: String,
      hasAlpha: { type: Boolean, reflect: !0 },
      hasEyedropper: { type: Boolean, reflect: !0 },
      isChannelsHidden: { type: Boolean, reflect: !0 },
      isCopyHidden: { type: Boolean, reflect: !0 },
      isOpen: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      input: a({ bubbles: !0, composed: !0 }),
      change: a({ bubbles: !0, composed: !0 }),
      formatchange: a({ bubbles: !0, composed: !0 }),
      copy: a({ bubbles: !0, composed: !0 }),
      toggle: a({ bubbles: !0, composed: !0 })
    },
    styles: [N, Z],
    form: !0
  }
);
$("z-color-picker", Q);
export {
  Q as ZColorPicker
};
