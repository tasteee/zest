// @ts-self-types="./z-image.d.ts"
import { c as R, a as F, e as h, f as H, b as P, j as t, g as m, d as W } from "../chunks/define-element-BZUk-KLk.js";
import { i as $ } from "../chunks/interaction-styles-C6mMacCu.js";
import { s as A } from "../chunks/accessible-D6muJfYC.js";
import { u as y } from "../chunks/hooks-DEFT8qqt.js";
import { o as b } from "../chunks/prop-types-CSJu2W-0.js";
import { u as I } from "../chunks/locale-BNhgEFKA.js";
const O = R`
	:host {
		display: block;
		min-width: 0;
		--z-image-radius: var(--radius-md);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([radius='none']) { --z-image-radius: 0; }
	:host([radius='sm']) { --z-image-radius: var(--radius-sm); }
	:host([radius='lg']) { --z-image-radius: var(--radius-lg); }
	:host([radius='xl']) { --z-image-radius: var(--radius-xl); }
	:host([radius='full']) { --z-image-radius: var(--radius-full); }

	figure {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		margin: 0;
	}

	.frame {
		position: relative;
		width: 100%;
		overflow: hidden;
		border-radius: var(--z-image-radius);
		background: var(--surface-subtle);
	}

	.frame.is-waiting {
		aspect-ratio: 16 / 9;
	}

	.frame.is-loaded {
		background: transparent;
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		opacity: 0;
		transition: opacity var(--motion-slow) var(--ease-enter);
	}

	.frame.has-ratio img,
	.frame.is-waiting img {
		position: absolute;
		inset: 0;
		height: 100%;
	}

	.frame.is-loaded img {
		opacity: 1;
	}

	.frame.is-failed img {
		display: none;
	}

	.shimmer {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			100deg,
			transparent 30%,
			color-mix(in oklch, var(--text-primary) 6%, transparent) 50%,
			transparent 70%
		);
		background-size: 200% 100%;
		animation: z-image-shimmer 1.6s linear infinite;
	}

	@keyframes z-image-shimmer {
		from { background-position: 150% 0; }
		to { background-position: -50% 0; }
	}

	.fallback {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-tertiary);
	}

	.fallback svg {
		width: 1.5rem;
		height: 1.5rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.5;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.frame.is-failed.is-waiting {
		aspect-ratio: 16 / 9;
	}

	figcaption {
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-snug);
	}

	figcaption[hidden] {
		display: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.shimmer {
			animation: none;
		}
	}
`, U = () => /* @__PURE__ */ m("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
  /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2.5" }),
  /* @__PURE__ */ t("circle", { cx: "9", cy: "10", r: "1.75" }),
  /* @__PURE__ */ t("path", { d: "M21 16l-5-5-9 9" })
] }), V = (e) => {
  if (!e) return;
  const i = e.replace(":", "/").trim();
  if (/^\d+(\.\d+)?(\s*\/\s*\d+(\.\d+)?)?$/.test(i))
    return i;
}, D = F(
  (e) => {
    const i = I(), s = H(), [g, o] = y("loading"), [p, v] = y(!1);
    P(() => {
      const a = s.current, d = !!(a != null && a.complete) && ((a == null ? void 0 : a.naturalWidth) ?? 0) > 0;
      o(d ? "loaded" : "loading");
    }, [e.src, e.srcset]);
    const k = () => {
      o("loaded");
      const a = s.current;
      e.load({ width: (a == null ? void 0 : a.naturalWidth) ?? 0, height: (a == null ? void 0 : a.naturalHeight) ?? 0 });
    }, x = () => {
      o("failed"), e.error({ src: e.src ?? "" });
    }, z = (a) => {
      const d = a.target;
      v(d.assignedNodes().length > 0);
    }, u = V(e.ratio), r = !!u, f = !!e.src || !!e.srcset, n = g === "loaded", l = g === "failed" || !f, S = !n && !l, w = !r && !n, j = ["frame"].concat(r ? ["has-ratio"] : []).concat(w ? ["is-waiting"] : []).concat(n ? ["is-loaded"] : []).concat(l ? ["is-failed"] : []).join(" "), B = r ? { aspectRatio: u } : {}, C = { objectFit: e.fit ?? "cover", objectPosition: e.focalPoint ?? "center" }, L = !!e.caption || p, c = e.alt ?? "", E = c ? `${c}. ${i("imageUnavailable")}` : i("imageUnavailable");
    return /* @__PURE__ */ t("host", { shadowDom: !0, children: /* @__PURE__ */ m("figure", { children: [
      /* @__PURE__ */ m("div", { class: j, part: "frame", style: B, children: [
        f && /* @__PURE__ */ t(
          "img",
          {
            ref: s,
            part: "image",
            src: e.src,
            srcset: e.srcset,
            sizes: e.sizes,
            alt: c,
            loading: e.isEager ? "eager" : "lazy",
            decoding: "async",
            style: C,
            onload: k,
            onerror: x
          }
        ),
        S && /* @__PURE__ */ t("span", { class: "shimmer", "aria-hidden": "true" }),
        l && /* @__PURE__ */ t("div", { class: "fallback", role: "img", "aria-label": E, children: /* @__PURE__ */ t("slot", { name: "fallback", children: /* @__PURE__ */ t(U, {}) }) })
      ] }),
      /* @__PURE__ */ t("figcaption", { part: "caption", hidden: !L, children: /* @__PURE__ */ t("slot", { name: "caption", onslotchange: z, children: e.caption }) })
    ] }) });
  },
  {
    props: {
      src: String,
      srcset: String,
      sizes: String,
      alt: String,
      ratio: String,
      caption: String,
      focalPoint: String,
      fit: { type: b("cover", "contain", "fill", "none", "scale-down"), reflect: !0 },
      radius: { type: b("none", "sm", "md", "lg", "xl", "full"), reflect: !0 },
      isEager: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      load: h({ bubbles: !0, composed: !0 }),
      error: h({ bubbles: !0, composed: !0 })
    },
    styles: [O, $, A]
  }
);
W("z-image", D);
export {
  D as ZImage
};
