import { c as d, a as c, e as l, u, j as r, g as a, d as m } from "../chunks/define-element-BWC3wEPr.js";
const h = d`
	:host {
		display: block;
	}
	:host([is-hidden]) {
		display: none;
	}
	z-dropzone {
		--pad: 0.5rem;
	}
	.tray {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
	}
	.add {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.8125rem;
		color: var(--muted-foreground);
	}
	.add svg {
		width: 1rem;
		height: 1rem;
		stroke: currentColor;
		fill: none;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
`, p = c(
  (e) => {
    const o = u(), n = () => o.current.querySelector("z-attachment-chip") != null;
    return /* @__PURE__ */ r("host", { shadowDom: !0, children: /* @__PURE__ */ r(
      "z-dropzone",
      {
        accept: e.accept,
        multiple: e.isMultiple,
        "max-size": e.maxSize,
        "max-files": e.maxFiles,
        ondrop: (s) => {
          var t;
          return e.files({ files: ((t = s.detail) == null ? void 0 : t.files) ?? [] });
        },
        onreject: (s) => {
          var t, i;
          return e.reject({ files: ((t = s.detail) == null ? void 0 : t.files) ?? [], reason: (i = s.detail) == null ? void 0 : i.reason });
        },
        children: /* @__PURE__ */ a("div", { class: "tray", children: [
          /* @__PURE__ */ r("slot", {}),
          /* @__PURE__ */ a("span", { class: "add", children: [
            /* @__PURE__ */ r("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ r("path", { d: "M12 5v14M5 12h14" }) }),
            n() ? "Add more" : "Add files or drop here"
          ] })
        ] })
      }
    ) });
  },
  {
    props: {
      accept: { type: String, reflect: !0 },
      isMultiple: { type: Boolean, reflect: !0 },
      maxSize: { type: Number, reflect: !0 },
      maxFiles: { type: Number, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      files: l({ bubbles: !0, composed: !0 }),
      reject: l({ bubbles: !0, composed: !0 })
    },
    styles: h
  }
);
m("z-attachment-tray", p);
export {
  p as ZAttachmentTray
};
