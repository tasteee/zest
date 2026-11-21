// @ts-self-types="./z-chip.d.ts"
import { c as p, a as g, e as c, u as C, f as x, j as s, g as r, d as D } from "../chunks/define-element-BZUk-KLk.js";
import { i as R } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as S } from "../chunks/use-prop-C0_HeSQ9.js";
import { o } from "../chunks/prop-types-CSJu2W-0.js";
import { u as k } from "../chunks/locale-BNhgEFKA.js";
import { c as w, r as B, a as j, b as K, C as z, R as I } from "../chunks/chip-styles-Rr3rYEMP.js";
const T = p`
	:host {
		display: inline-flex;
		max-width: 100%;
		vertical-align: middle;
	}

	:host([is-hidden]) {
		display: none;
	}

	::slotted(svg) {
		width: 1em;
		height: 1em;
	}

	::slotted(img) {
		width: 1.25em;
		height: 1.25em;
		margin-inline-start: calc(var(--space-1-5) * -1);
		border-radius: var(--radius-full);
		object-fit: cover;
	}
`, H = (e, a) => {
  var i;
  return a || (((i = e.textContent) == null ? void 0 : i.trim()) ?? "");
}, L = g(
  (e) => {
    const a = k(), i = C(), d = x(), [u, m] = S("isSelected"), l = !!e.isDisabled, n = !!u, h = H(i.current, e.label), b = a("removeItem", { label: h }), f = [
      "chip",
      "is-interactive",
      B(e.size),
      j(e.tone),
      K(e.kind)
    ].concat(n ? ["is-selected"] : []).concat(l ? ["is-disabled"] : []).filter(Boolean).join(" "), v = () => {
      if (l) return;
      const t = !n;
      m(t), e.select({ value: e.value, selected: t });
    }, y = (t) => {
      t.stopPropagation(), !l && e.remove({ value: e.value });
    };
    return /* @__PURE__ */ s("host", { shadowDom: { delegatesFocus: !0 }, children: /* @__PURE__ */ r("span", { class: f, part: "chip", children: [
      /* @__PURE__ */ s(
        "button",
        {
          ref: d,
          class: "main",
          type: "button",
          disabled: l,
          "aria-pressed": n ? "true" : "false",
          "aria-labelledby": "label",
          onclick: v,
          onkeydown: (t) => {
            (t.key === "Delete" || t.key === "Backspace") && e.isRemovable && !l && (t.preventDefault(), e.remove({ value: e.value }));
          }
        }
      ),
      /* @__PURE__ */ r("span", { class: "content", children: [
        /* @__PURE__ */ s(z, {}),
        /* @__PURE__ */ s("slot", { name: "prefix" }),
        /* @__PURE__ */ s("span", { class: "label", id: "label", children: /* @__PURE__ */ s("slot", { children: e.label }) })
      ] }),
      e.isRemovable && /* @__PURE__ */ s(
        "button",
        {
          class: "remove",
          type: "button",
          tabindex: "-1",
          disabled: l,
          "aria-label": b,
          onclick: y,
          children: /* @__PURE__ */ s(I, {})
        }
      )
    ] }) });
  },
  {
    props: {
      label: String,
      value: { type: String, reflect: !0 },
      tone: { type: o("primary", "secondary", "tertiary", "success", "warning", "danger"), reflect: !0 },
      size: { type: o("sm", "md", "lg"), reflect: !0 },
      kind: { type: o("outline", "soft"), reflect: !0 },
      isSelected: { type: Boolean, reflect: !0 },
      isRemovable: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      select: c({ bubbles: !0, composed: !0 }),
      remove: c({ bubbles: !0, composed: !0 })
    },
    styles: [w, T, R]
  }
);
D("z-chip", L);
export {
  L as ZChip
};
