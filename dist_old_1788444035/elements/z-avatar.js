import { c as i, a as n, g as o, j as r, d as c } from "../chunks/define-element-BWC3wEPr.js";
import { u as l } from "../chunks/hooks-D9_x-ckD.js";
const u = i`
	:host {
		display: inline-flex;
		vertical-align: middle;
		position: relative;
		--size: 2.5rem;
		--tone: var(--color-neutral-5);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([accent='dom']) {
		--tone: var(--purple);
	}
	:host([accent='sub']) {
		--tone: var(--pink);
	}
	:host([accent='neutral']) {
		--tone: var(--color-neutral-5);
	}
	:host([accent='success']) {
		--tone: var(--success);
	}
	:host([accent='warning']) {
		--tone: var(--warning);
	}
	:host([accent='error']) {
		--tone: var(--destructive);
	}

	:host([size='xs']) {
		--size: 1.5rem;
	}
	:host([size='sm']) {
		--size: 2rem;
	}
	:host([size='lg']) {
		--size: 3.25rem;
	}
	:host([size='xl']) {
		--size: 4rem;
	}

	.avatar {
		width: var(--size);
		height: var(--size);
		border-radius: 999px;
		overflow: hidden;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		border: 1px solid color-mix(in oklch, var(--foreground) 14%, transparent);
		/* srgb: mixing a chromatic tone with the hue-carrying --card in oklch
		   drifts the hue around the wheel. */
		background: color-mix(in srgb, var(--tone) 22%, var(--card));
		color: color-mix(in oklch, var(--tone) 85%, white);
		font-family: inherit;
		font-weight: 600;
		font-size: calc(var(--size) * 0.4);
		line-height: 1;
		user-select: none;
	}

	:host([is-square]) .avatar {
		border-radius: var(--radius-md);
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.status {
		position: absolute;
		right: 0;
		bottom: 0;
		width: calc(var(--size) * 0.28);
		height: calc(var(--size) * 0.28);
		border-radius: 999px;
		border: 2px solid var(--background);
		box-sizing: border-box;
	}
	.status.is-online {
		background: var(--success);
	}
	.status.is-busy {
		background: var(--destructive);
	}
	.status.is-away {
		background: var(--warning);
	}
	.status.is-offline {
		background: var(--color-neutral-5);
	}
`, d = (e) => {
  if (e.initials) return e.initials.slice(0, 2).toUpperCase();
  if (!e.name) return "?";
  const t = String(e.name).trim().split(/\s+/);
  return t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
}, h = n(
  (e) => {
    const [t, a] = l(!1), s = e.src && !t;
    return /* @__PURE__ */ o("host", { shadowDom: !0, children: [
      /* @__PURE__ */ r("span", { class: "avatar", "aria-label": e.name, children: s ? /* @__PURE__ */ r("img", { src: e.src, alt: e.name || "", onerror: () => a(!0) }) : /* @__PURE__ */ r("span", { "aria-hidden": "true", children: d(e) }) }),
      e.status && /* @__PURE__ */ r("span", { class: `status is-${e.status}`, "aria-hidden": "true" })
    ] });
  },
  {
    props: {
      src: String,
      name: String,
      initials: String,
      status: { type: String, reflect: !0 },
      size: { type: String, reflect: !0 },
      accent: { type: String, reflect: !0 },
      isSquare: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: u
  }
);
c("z-avatar", h);
export {
  h as ZAvatar
};
