import { afterEach, describe, expect, it, vi } from 'vitest'
import '../components/z-dialog'
import { waitForRender } from './test-helpers'

// The size ladder moved to sm/md/lg; the old words resolve for one minor
// and warn once per page load (SUPPORT.md, Deprecation).
describe('<z-dialog> size', () => {
	afterEach(() => vi.restoreAllMocks())

	const widthFor = async (size: string) => {
		const dialog = document.createElement('z-dialog')
		dialog.setAttribute('size', size)
		document.body.append(dialog)
		await waitForRender()
		return dialog.style.getPropertyValue('--z-dialog-width')
	}

	it('takes sm / md / lg', async () => {
		expect(await widthFor('sm')).toBe('24rem')
		expect(await widthFor('md')).toBe('30rem')
		expect(await widthFor('lg')).toBe('42rem')
	})

	it('still honours small / medium / large, warning once', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
		expect(await widthFor('large')).toBe('42rem')
		expect(await widthFor('large')).toBe('42rem')
		expect(warn).toHaveBeenCalledTimes(1)
		expect(warn.mock.calls[0][0]).toContain('size="lg"')
	})
})
