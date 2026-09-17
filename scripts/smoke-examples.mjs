// Drives each built framework example through the validated-form flow in a
// real browser, so the examples prove integration rather than just compiling.
//
//   node scripts/smoke-examples.mjs            # every example
//   node scripts/smoke-examples.mjs react vue  # a subset
//
// Each example's dist/ is served statically; the browser is the same one the
// Vitest browser project uses (Edge on Windows, Playwright's Chromium
// elsewhere, ZEST_BROWSER_CHANNEL to override).

import { createServer } from 'node:http'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const examples = process.argv.slice(2).length ? process.argv.slice(2) : ['react', 'vue', 'svelte']

const mimeTypes = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' }

const serve = (directory) => new Promise((resolve) => {
	const server = createServer((request, response) => {
		const url = new URL(request.url ?? '/', 'http://localhost')
		let file = join(directory, decodeURIComponent(url.pathname))
		if (!existsSync(file) || statSync(file).isDirectory()) file = join(directory, 'index.html')
		response.setHeader('content-type', mimeTypes[extname(file)] ?? 'application/octet-stream')
		response.end(readFileSync(file))
	})
	server.listen(0, '127.0.0.1', () => resolve({ server, url: `http://127.0.0.1:${server.address().port}/` }))
})

const edgePaths = ['C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe']
const hasEdge = process.platform === 'win32' && edgePaths.some((path) => existsSync(path))
const channel = process.env.ZEST_BROWSER_CHANNEL ?? (hasEdge ? 'msedge' : 'chromium')

const expect = (condition, message) => { if (!condition) throw new Error(message) }
const waitFor = async (page, label, predicate) => {
	try { await page.waitForFunction(predicate, undefined, { timeout: 10000 }) }
	catch { throw new Error(`timed out waiting for: ${label}`) }
}

const runFlow = async (page, example, errors) => {
	// Upgraded, and (for React) hydrated onto the server-rendered markup.
	await waitFor(page, 'z-input to upgrade', () => Boolean(customElements.get('z-input') && document.querySelector('z-input')?.shadowRoot))
	const submitted = page.getByTestId('submitted')
	const lastChange = page.getByTestId('last-change')
	// `type` is a non-reflected prop, so frameworks set it as a property and
	// an attribute selector would miss it.
	const submit = page.locator('form z-button button')

	// 1. Empty form: is-required blocks the submit.
	await submit.click()
	expect((await submitted.textContent()).includes('Not submitted yet'), `${example}: empty form submitted`)

	// 2. Typing then leaving the field fires zest's change event with detail.
	const email = page.locator('z-input input')
	await email.fill('ada@example.com')
	await email.press('Tab')
	await waitFor(page, 'the change event to reach the framework', () => document.querySelector('[data-testid="last-change"]')?.textContent?.includes('ada@example.com'))

	// 3. The options array reached z-select as a property; picking one sets its value.
	await page.locator('z-select button.trigger').click()
	await page.locator('z-select [role="option"]', { hasText: 'Pro' }).click()

	// 4. Check the terms box. The native input is visually hidden and the host
	// stretches across the grid, so the click goes to the label itself.
	await page.locator('z-checkbox label').click()

	// 5. Submit and read the FormData the framework's handler saw.
	await submit.click()
	await waitFor(page, 'the submit handler to see FormData', () => document.querySelector('[data-testid="submitted"]')?.textContent?.includes('"plan"'))
	const data = JSON.parse(await submitted.textContent())
	expect(data.email === 'ada@example.com', `${example}: email missing from FormData`)
	expect(data.plan === 'pro', `${example}: plan missing from FormData`)
	expect(data.terms === 'accepted', `${example}: terms missing from FormData`)

	expect(errors.length === 0, `${example}: page errors\n  ${errors.join('\n  ')}`)
}

const browser = await chromium.launch({ channel, headless: true })
let failed = false
for (const example of examples) {
	const directory = join(root, 'examples', example, 'dist')
	if (!existsSync(join(directory, 'index.html'))) {
		console.error(`✗ ${example}: no dist/index.html — build the example first`)
		failed = true
		continue
	}
	const { server, url } = await serve(directory)
	const page = await browser.newPage()
	const errors = []
	page.on('pageerror', (error) => errors.push(error.message))
	page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
	try {
		await page.goto(url)
		await runFlow(page, example, errors)
		console.log(`✓ ${example}: validated form, rich property, custom event`)
	} catch (error) {
		console.error(`✗ ${example}: ${error.message}`)
		if (errors.length) console.error(`  page errors:\n  ${errors.join('\n  ')}`)
		failed = true
	} finally {
		await page.close()
		server.close()
	}
}
await browser.close()
process.exit(failed ? 1 : 0)
