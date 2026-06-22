import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// The blog is a React SPA. It is intentionally a SEPARATE Vite project from the
// component library (vite.config.ts), so the React JSX world never collides with
// the Atomico JSX world. The blog consumes the COMPILED library from ../dist, so
// no Atomico source is ever pulled into this React build graph.
//
//   pnpm dev       -> library + showcase pages (Atomico)
//   pnpm dev:blog  -> this React SPA
export default defineConfig({
	root: resolve(__dirname, 'blog'),
	// .env.local lives in wc/ (created by `npx convex dev`), but the Vite root is
	// wc/blog/, so point envDir back at wc/ to pick up VITE_CONVEX_URL.
	envDir: resolve(__dirname),
	plugins: [react()],
	server: {
		port: 5174,
		// blog/ imports the built ../dist/zesty-wc.{js,css}, which lives outside root.
		fs: { allow: [resolve(__dirname)] }
	},
	resolve: {
		// pnpm's symlinked layout + the non-default root can pre-bundle React along
		// two paths, yielding "more than one copy of React" / null useContext.
		// Force a single instance.
		dedupe: ['react', 'react-dom'],
		alias: {
			'@blog': resolve(__dirname, 'blog/src'),
			'@zest': resolve(__dirname, 'dist'),
			'@convex': resolve(__dirname, 'convex')
		}
	},
	build: {
		outDir: resolve(__dirname, 'dist-blog'),
		emptyOutDir: true
	}
})
