import { existsSync } from 'node:fs'
import { defineConfig, devices } from '@playwright/test'

// Screenshot regression for the core set. Fixture pages under e2e/fixtures
// load the built library from dist/, so `npm run build` comes first.
//
// Baselines are per platform (Playwright suffixes them with the OS), because
// text rasterisation differs between Windows and Linux. Local runs on
// Windows compare against *-win32 files; CI compares against *-linux ones.
// Regenerate deliberately with `npm run test:screens -- --update-snapshots`
// and commit the diff alongside the change that caused it.

const edgePaths = [
	'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
	'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
]
const hasEdge = process.platform === 'win32' && edgePaths.some((path) => existsSync(path))
const channel = process.env.ZEST_BROWSER_CHANNEL ?? (hasEdge ? 'msedge' : 'chromium')

export default defineConfig({
	testDir: '.',
	testMatch: '**/*.screens.ts',
	fullyParallel: true,
	// Two browsers at a time: four made page.goto time out on a loaded machine.
	workers: 2,
	forbidOnly: Boolean(process.env.CI),
	retries: 0,
	reporter: process.env.CI ? [['list'], ['html', { open: 'never', outputFolder: 'report' }]] : 'list',
	outputDir: 'results',
	snapshotPathTemplate: '{testDir}/__screenshots__/{arg}-{platform}{ext}',
	expect: {
		toHaveScreenshot: {
			animations: 'disabled',
			caret: 'hide',
			// Tight on purpose: a colour shift on one button's text is a few
			// hundred pixels, and a ratio-based tolerance let exactly that slip
			// through once. Anti-aliasing on one machine is deterministic; this
			// allows a handful of pixels, not a feature.
			maxDiffPixels: 24,
			threshold: 0.15
		}
	},
	use: {
		...devices['Desktop Chrome'],
		channel,
		baseURL: 'http://127.0.0.1:4177/',
		colorScheme: 'dark',
		reducedMotion: 'reduce',
		viewport: { width: 960, height: 720 }
	},
	webServer: {
		command: 'node scripts/static-server.mjs . 4177',
		cwd: '..',
		url: 'http://127.0.0.1:4177/dist/zest.js',
		reuseExistingServer: !process.env.CI
	}
})
