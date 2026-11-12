import { describe, expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'
import { innerOf, mount, settle } from './form-helpers'

type HostT = HTMLElement & Record<string, any>

const thumbPoint = (host: HTMLElement) => {
	const input = innerOf<HTMLInputElement>(host, 'input')
	const box = input.getBoundingClientRect()
	return { box, input }
}

// Double click at a horizontal fraction of the input, vertically centred.
const doubleClickAt = async (host: HTMLElement, fraction: number) => {
	const { box, input } = thumbPoint(host)
	const x = 8 + (box.width - 16) * fraction
	await userEvent.dblClick(input, { position: { x, y: box.height / 2 } })
}

const events = (host: HTMLElement, name: string) => {
	const seen: number[] = []
	host.addEventListener(name, (event) => seen.push((event as CustomEvent).detail.value))
	return seen
}

describe('<z-slider can-reset>', () => {
	it('double clicking the thumb restores the starting value and announces it', async () => {
		const wrapper = await mount('<z-slider can-reset label="Volume" min="0" max="100" value="30"></z-slider>')
		const host = wrapper.querySelector<HostT>('z-slider')!
		host.value = 80
		await settle(wrapper)
		const inputs = events(host, 'input')
		const changes = events(host, 'change')
		await doubleClickAt(host, 0.8)
		await settle(wrapper)
		expect(host.value).toBe(30)
		expect(inputs).toEqual([30])
		expect(changes).toEqual([30])
	})

	it('double clicking the label restores the starting value', async () => {
		const wrapper = await mount('<z-slider can-reset label="Volume" min="0" max="100" value="30"></z-slider>')
		const host = wrapper.querySelector<HostT>('z-slider')!
		host.value = 55
		await settle(wrapper)
		await userEvent.dblClick(innerOf(host, '.label'))
		await settle(wrapper)
		expect(host.value).toBe(30)
	})

	it('double clicking the empty track does not reset', async () => {
		const wrapper = await mount('<z-slider can-reset label="Volume" min="0" max="100" value="10"></z-slider>')
		const host = wrapper.querySelector<HostT>('z-slider')!
		host.value = 20
		await settle(wrapper)
		await doubleClickAt(host, 1)
		await settle(wrapper)
		expect(host.value).not.toBe(10)
	})

	it('does nothing without can-reset', async () => {
		const wrapper = await mount('<z-slider label="Volume" min="0" max="100" value="30"></z-slider>')
		const host = wrapper.querySelector<HostT>('z-slider')!
		host.value = 55
		await settle(wrapper)
		await userEvent.dblClick(innerOf(host, '.label'))
		await settle(wrapper)
		expect(host.value).toBe(55)
	})
})

describe('<z-slider> header', () => {
	it('shows the value on the right, after the label and the center slot', async () => {
		const wrapper = await mount(
			'<z-slider label="Brightness" does-show-value value-suffix="%" value="64"><span slot="center" id="mid">auto</span></z-slider>'
		)
		const host = wrapper.querySelector<HostT>('z-slider')!
		await settle(wrapper)
		const label = innerOf(host, '.label').getBoundingClientRect()
		const middle = host.querySelector('#mid')!.getBoundingClientRect()
		const value = innerOf(host, '.value').getBoundingClientRect()
		const hostBox = host.getBoundingClientRect()
		expect(innerOf(host, '.value').textContent).toContain('64%')
		expect(label.right).toBeLessThanOrEqual(middle.left + 1)
		expect(middle.right).toBeLessThanOrEqual(value.left + 1)
		expect(hostBox.right - value.right).toBeLessThan(2)
	})

	it('shows the header for slotted content alone', async () => {
		const wrapper = await mount('<z-slider value="10"><span slot="center" id="mid">hint</span></z-slider>')
		const host = wrapper.querySelector<HostT>('z-slider')!
		await settle(wrapper)
		await new Promise((resolve) => requestAnimationFrame(() => resolve(null)))
		expect(host.querySelector('#mid')!.getBoundingClientRect().height).toBeGreaterThan(0)
	})
})
