import { defineConfig } from 'vite'
import { resolve } from 'node:path'

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
	root: resolve(__dirname, 'site'),
	publicDir: resolve(__dirname, 'dist')
})
