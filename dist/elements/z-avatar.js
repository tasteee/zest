import { c as n, a as o, g as l, j as r, d as c } from "../chunks/define-element-BZUk-KLk.js";
import { u as d } from "../chunks/hooks-DEFT8qqt.js";
import { o as a } from "../chunks/prop-types-B3Bpi956.js";
const u = n`
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

	:host([tone='secondary']) {
		--tone: var(--purple);
	}
	:host([tone='tertiary']) {
		--tone: var(--pink);
	}
	:host([tone='primary']) {
		--tone: var(--color-neutral-5);
	}
	:host([tone='success']) {
		--tone: var(--success);
	}
	:host([tone='warning']) {
		--tone: var(--warning);
	}
	:host([tone='danger']) {
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
		/* Toward the theme's own text color, so the initials read in light and dark. */
		color: color-mix(in oklch, var(--tone) 55%, var(--foreground));
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
`, h = (e) => {
  if (e.initials) return e.initials.slice(0, 2).toUpperCase();
  if (!e.name) return "?";
  const t = String(e.name).trim().split(/\s+/);
  return t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
}, g = o(
  (e) => {
    const [t, s] = d(!1), i = e.src && !t;
    return /* @__PURE__ */ l("host", { shadowDom: !0, children: [
      /* @__PURE__ */ r("span", { class: "avatar", role: e.name ? "img" : void 0, "aria-label": e.name, children: i ? /* @__PURE__ */ r("img", { src: e.src, alt: e.name || "", onerror: () => s(!0) }) : /* @__PURE__ */ r("span", { "aria-hidden": "true", children: h(e) }) }),
      e.status && /* @__PURE__ */ r("span", { class: `status is-${e.status}`, "aria-hidden": "true" })
    ] });
  },
  {
    props: {
      src: String,
      name: String,
      initials: String,
      status: { type: a("online", "busy", "away", "offline"), reflect: !0 },
      size: { type: a("xs", "sm", "md", "lg", "xl"), reflect: !0 },
      tone: { type: a("primary", "secondary", "tertiary", "success", "warning", "danger"), reflect: !0 },
      isSquare: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: u
  }
);
c("z-avatar", g);
export {
  g as ZAvatar
};
