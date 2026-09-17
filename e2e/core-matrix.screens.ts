import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { coreMatrix } from './core-matrix'
import type { MatrixEntryT } from './core-matrix'

const themes = ['dark', 'light', 'console', 'studio'] as const

// Puts one matrix entry on the stage: theme, direction, markup, then the
// entry's own setup, then a wait for the elements and fonts.
const stage = async (page: Page, entry: MatrixEntryT, theme: string, direction: 'ltr' | 'rtl' = 'ltr') => {
	if (entry.viewport) await page.setViewportSize(entry.viewport)
	await page.goto('/e2e/fixtures/stage.html')
	await page.waitForFunction(() => Boolean(customElements.get('z-button')))
	await page.evaluate(([nextTheme, nextDirection, rows]) => {
		document.documentElement.setAttribute('data-theme', nextTheme)
		const root = document.getElementById('stage')!
		root.setAttribute('dir', nextDirection)
		root.innerHTML = rows.map((row) => `<div class="state"><span class="name">${row.name}</span><div class="body">${row.markup}</div></div>`).join('')
	}, [theme, direction, entry.states] as const)
	await page.waitForFunction(() => [...document.querySelectorAll('#stage *')].filter((el) => el.localName.startsWith('z-')).every((el) => el.shadowRoot))
	if (entry.setup) await page.evaluate(entry.setup, await page.$('#stage') as never)
	for (const key of entry.keys ?? []) await page.keyboard.press(key)
	await page.evaluate(() => document.fonts.ready)
	// Give overlays a frame to position and any entrance to settle.
	await page.waitForTimeout(150)
}

const shot = (entry: MatrixEntryT, name: string, theme: string) => `${entry.tag}/${name}-${theme}.png`

for (const entry of coreMatrix) {
	test.describe(entry.tag, () => {
		for (const theme of themes) {
			test(`${theme} · rest`, async ({ page }) => {
				await stage(page, entry, theme)
				await expect(page).toHaveScreenshot(shot(entry, 'rest', theme), { fullPage: true })
			})

			if (entry.probe) {
				test(`${theme} · hover, focus, active`, async ({ page }) => {
					await stage(page, entry, theme)
					const probe = page.locator(entry.probe!).first()
					const focusProbe = page.locator(entry.focusProbe ?? entry.probe!).first()
					const host = page.locator('#probe')

					await probe.hover()
					await expect(host).toHaveScreenshot(shot(entry, 'hover', theme))

					await page.mouse.move(0, 0)
					await focusProbe.focus()
					// A real key press turns :focus-visible on for the focused element.
					await page.keyboard.press('Shift')
					await expect(host).toHaveScreenshot(shot(entry, 'focus', theme))

					const box = (await probe.boundingBox())!
					await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
					await page.mouse.down()
					await expect(host).toHaveScreenshot(shot(entry, 'active', theme))
					await page.mouse.up()
				})
			}
		}

		test('dark · rtl', async ({ page }) => {
			await stage(page, entry, 'dark', 'rtl')
			await expect(page).toHaveScreenshot(shot(entry, 'rtl', 'dark'), { fullPage: true })
		})

		test('forced colors', async ({ page }) => {
			await page.emulateMedia({ forcedColors: 'active' })
			await stage(page, entry, 'dark')
			await expect(page).toHaveScreenshot(shot(entry, 'forced', 'dark'), { fullPage: true })
		})
	})
}
