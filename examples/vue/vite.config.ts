import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [
		vue({
			// Anything z-* is a custom element, not a missing Vue component.
			template: { compilerOptions: { isCustomElement: (tag) => tag.startsWith('z-') } }
		})
	]
})
