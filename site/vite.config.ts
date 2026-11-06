import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// The docs site is a React SPA. It consumes the COMPILED component library
// (@tasteee/zest, built to ../dist), so the library's Atomico JSX world never
// enters this React build graph and the two JSX runtimes can't collide.
//
//   pnpm dev  -> builds the library in --watch mode and runs this server
export default defineConfig({
	// GitHub Pages serves project sites from /<repo>/. Everywhere else is /.
	base: process.env.VITE_BASE_PATH ?? '/',
	root: __dirname,
	plugins: [react()],
	server: {
		port: 5173,
		// @tasteee/zest resolves through the workspace symlink, outside this root.
		fs: { allow: [resolve(__dirname, '..')] }
	},
	resolve: {
		// pnpm's symlinked layout can pre-bundle React along two paths, yielding
		// "more than one copy of React". Force a single instance.
		dedupe: ['react', 'react-dom'],
		alias: {
			'@app': resolve(__dirname, 'src')
		}
	},
	build: {
		outDir: resolve(__dirname, 'dist'),
		emptyOutDir: true
	}
})
