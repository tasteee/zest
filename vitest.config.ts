import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		environment: 'happy-dom',
		include: ['src/_tests/**/*.test.ts'],
		coverage: {
			provider: 'v8',
			include: ['src/components/**/*.tsx'],
			reporter: ['text', 'html'],
			thresholds: {
				statements: 25,
				branches: 15,
				functions: 20,
				lines: 28
			}
		}
	}
})
