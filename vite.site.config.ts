import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import { resolve, join, extname } from 'node:path'
import { existsSync, readFileSync, statSync, cpSync } from 'node:fs'

const SITE_DIR = resolve(__dirname, 'site')
const SAMPLE_ASSETS_DIR = resolve(SITE_DIR, 'public')
const SITE_BUILD_DIR = resolve(SITE_DIR, 'dist')

const MIME_TYPE_BY_EXTENSION: Record<string, string> = {
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.webp': 'image/webp'
}

// Doc snippets reference sample media as plain root-absolute URLs — an
// <img src="/logos/acme.svg"> in z-marquee.md, /hero.svg in
// z-progressive-blur.md — so the fallback playground has something real to
// render instead of a broken image. Vite's own `publicDir` can't serve them
// because it is already pointed at dist/ (see below), so site/public/ gets
// mounted as a second static root: served in dev, copied on build.
const serveSampleAssets = (): Plugin => {
	const resolveSampleFilePath = (requestUrl: string): string | null => {
		const pathname = requestUrl.split('?')[0]
		const candidatePath = join(SAMPLE_ASSETS_DIR, pathname)

		const escapesSampleDir = !candidatePath.startsWith(SAMPLE_ASSETS_DIR)
		if (escapesSampleDir) return null
		if (!existsSync(candidatePath)) return null

		const isFile = statSync(candidatePath).isFile()
		if (!isFile) return null

		return candidatePath
	}

	return {
		name: 'zest-docs-sample-assets',

		configureServer: (server) => {
			server.middlewares.use((request, response, next) => {
				const isReadRequest = request.method === 'GET' || request.method === 'HEAD'
				if (!isReadRequest) return next()

				const sampleFilePath = resolveSampleFilePath(request.url ?? '')
				if (!sampleFilePath) return next()

				const mimeType = MIME_TYPE_BY_EXTENSION[extname(sampleFilePath)]
				if (mimeType) response.setHeader('Content-Type', mimeType)
				response.end(readFileSync(sampleFilePath))
			})
		},

		closeBundle: () => {
			const hasSampleAssets = existsSync(SAMPLE_ASSETS_DIR)
			if (!hasSampleAssets) return
			cpSync(SAMPLE_ASSETS_DIR, SITE_BUILD_DIR, { recursive: true })
		}
	}
}

// Serves the docs/playground site (site/). `publicDir` points at the built
// library output (dist/) so index.html can reference /zest.js and /ink.css
// as plain root-absolute URLs — the same files consumers get from
// `@tasteee/zest` and `@tasteee/zest/ink.css`.
//
// This exists because a relative "../dist/zest.js" in site/index.html does
// NOT reach the sibling dist/ folder: browsers resolve ".." against the
// page's own URL, and since the dev server's root is site/, that collapses
// to "/dist/zest.js" — a path that doesn't exist under site/, so Vite's SPA
// fallback quietly serves index.html instead (200 OK, wrong content, no
// error). `publicDir` sidesteps that by serving dist/'s contents at "/".
export default defineConfig({
	root: SITE_DIR,
	publicDir: resolve(__dirname, 'dist'),
	plugins: [serveSampleAssets()]
})
