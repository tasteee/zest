import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// Serves the full-app demos (demo/). Same reasoning as vite.site.config.ts:
// `publicDir` points at the built library output (dist/) so each demo's
// "/zest.js" / "/ink.css" resolve to real files instead of silently falling
// back to index.html.
export default defineConfig({
	root: resolve(__dirname, 'demo'),
	publicDir: resolve(__dirname, 'dist')
})
