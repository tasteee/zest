import { c as b, a as v, e as h, u as x, b as y, g as i, j as o, d as w } from "../chunks/define-element-BWC3wEPr.js";
import { u as k } from "../chunks/use-prop-DBBKVpkc.js";
import { u as A } from "../chunks/hooks-D9_x-ckD.js";
const F = b`
	:host {
		display: inline-flex;
		position: relative;
		--accent: var(--primary);
	}

	:host([accent='dom']) {
		--accent: var(--purple);
	}

	:host([accent='sub']) {
		--accent: var(--pink);
	}

	:host([is-hidden]) {
		display: none;
	}

	.trigger {
		display: inline-flex;
		align-items: center;
		gap: 0.625rem;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		height: var(--control-height-md);
		padding-inline: 0.625rem 0.875rem;
		color: var(--foreground);
		font-family: var(--font-mono);
		font-size: var(--font-size-small);
		cursor: pointer;
		transition: border-color 0.12s ease;
	}

	.trigger:hover {
		border-color: color-mix(in oklch, var(--foreground) 30%, transparent);
	}

	.trigger.is-open {
		border-color: var(--accent);
	}

	.trigger:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}

	.swatch {
		width: 1.25rem;
		height: 1.25rem;
		border-radius: var(--radius-sm);
		border: 1px solid color-mix(in oklch, var(--foreground) 25%, transparent);
		flex-shrink: 0;
	}

	.panel {
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		z-index: 50;
		width: 15rem;
		background: var(--popover);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.spectrum {
		width: 100%;
		height: 2.5rem;
		padding: 0;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		background: transparent;
		cursor: pointer;
	}
	.spectrum::-webkit-color-swatch-wrapper {
		padding: 3px;
	}
	.spectrum::-webkit-color-swatch {
		border: none;
		border-radius: 3px;
	}

	.hex-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		padding-inline: 0.5rem;
		height: 2.25rem;
	}
	.hex-row:focus-within {
		border-color: var(--accent);
	}
	.hash {
		color: var(--muted-foreground);
		font-family: var(--font-mono);
		font-size: var(--font-size-small);
	}
	.hex-input {
		flex: 1;
		min-width: 0;
		background: transparent;
		border: none;
		outline: none;
		color: var(--foreground);
		font-family: var(--font-mono);
		font-size: var(--font-size-small);
		text-transform: uppercase;
	}

	.presets {
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		gap: 0.375rem;
	}
	.preset {
		aspect-ratio: 1;
		border-radius: 999px;
		border: 1px solid color-mix(in oklch, var(--foreground) 20%, transparent);
		cursor: pointer;
		padding: 0;
		transition: transform 0.1s ease;
	}
	.preset:hover {
		transform: scale(1.15);
	}
	.preset.is-selected {
		outline: 2px solid var(--primary);
		outline-offset: 1px;
	}
`, z = [
  "#FAFAFA",
  "#BF40BF",
  "#FF1493",
  "#FF3B30",
  "#A0A0A0",
  "#707070",
  "#2A2F2A",
  "#0A0F0A"
], C = (r) => {
  let t = r.trim().replace(/^#/, "");
  return /^[0-9a-fA-F]{3}$/.test(t) && (t = t.split("").map((n) => n + n).join("")), `#${t.toUpperCase()}`;
}, U = v(
  (r) => {
    var c;
    const t = x(), [n, u] = k("value"), [a, d] = A(!1), s = n || "#BF40BF", m = Array.isArray(r.presets) ? r.presets : z;
    y(() => {
      if (!a) return;
      const e = (f) => {
        f.composedPath().includes(t.current) || d(!1);
      };
      return document.addEventListener("pointerdown", e), () => document.removeEventListener("pointerdown", e);
    }, [a]);
    const l = (e) => {
      u(e), r.change({ value: e });
    }, p = r.label || ((c = t.current) == null ? void 0 : c.getAttribute("aria-label")), g = p ? `${p}, ${s.toUpperCase()}` : void 0;
    return /* @__PURE__ */ i("host", { shadowDom: !0, children: [
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          class: a ? "trigger is-open" : "trigger",
          disabled: r.isDisabled,
          "aria-haspopup": "dialog",
          "aria-label": g,
          "aria-expanded": a ? "true" : "false",
          onclick: () => d(!a),
          children: [
            /* @__PURE__ */ o("span", { class: "swatch", style: { background: s } }),
            /* @__PURE__ */ o("span", { children: s.toUpperCase() })
          ]
        }
      ),
      a && /* @__PURE__ */ i("div", { class: "panel", role: "dialog", "aria-label": "Choose color", children: [
        /* @__PURE__ */ o(
          "input",
          {
            class: "spectrum",
            type: "color",
            value: s,
            oninput: (e) => l(e.target.value.toUpperCase())
          }
        ),
        /* @__PURE__ */ i("div", { class: "hex-row", children: [
          /* @__PURE__ */ o("span", { class: "hash", children: "#" }),
          /* @__PURE__ */ o(
            "input",
            {
              class: "hex-input",
              type: "text",
              value: s.replace(/^#/, ""),
              maxlength: 6,
              onchange: (e) => l(C(e.target.value))
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { class: "presets", children: m.map((e) => /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            class: e.toUpperCase() === s.toUpperCase() ? "preset is-selected" : "preset",
            style: { background: e },
            "aria-label": e,
            onclick: () => l(e.toUpperCase())
          },
          e
        )) })
      ] })
    ] });
  },
  {
    props: {
      value: { type: String, reflect: !0 },
      label: String,
      presets: { type: Array },
      accent: { type: String, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: h({ bubbles: !0, composed: !0 })
    },
    styles: F
  }
);
w("z-color-picker", U);
export {
  U as ZColorPicker
};
