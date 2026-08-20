// Tiny, shared DOM-building helpers used across the site's render code.

export const createElement = (tagName: string, className?: string): HTMLElement => {
	const element = document.createElement(tagName)
	if (className) element.className = className
	return element
}

// Doc snippets reference sample media as root-absolute URLs — the
// `<img src="/logos/acme.svg">` in z-marquee.md, `/slides/1.svg` in
// z-carousel.md — which only resolve while the site is served from a domain
// root. GitHub Pages serves it out of /zest/ instead, so those URLs have to
// be rebased before the node goes live or every sample image 404s.
//
// Vite substitutes BASE_URL at build time: "/" for the dev server, "/zest/"
// for the deployed build (see DEPLOYED_BASE_PATH in vite.site.config.ts).
const REBASED_URL_ATTRIBUTES = ['src', 'href', 'poster']

export const applySiteBaseUrl = (root: Element): void => {
	const baseUrl = import.meta.env.BASE_URL
	const isServedFromDomainRoot = baseUrl === '/'
	if (isServedFromDomainRoot) return

	const elements = [root, ...root.querySelectorAll('*')]

	for (const element of elements) {
		for (const attributeName of REBASED_URL_ATTRIBUTES) {
			const url = element.getAttribute(attributeName)
			if (!url) continue

			// Only root-absolute paths belong to this site. "//cdn.example"
			// is protocol-relative, "#anchor" and "https://..." already
			// resolve on their own, and an already-rebased URL must not get
			// the prefix a second time.
			const isRootAbsolute = url.startsWith('/') && !url.startsWith('//')
			if (!isRootAbsolute) continue
			if (url.startsWith(baseUrl)) continue

			element.setAttribute(attributeName, baseUrl + url.slice(1))
		}
	}
}
