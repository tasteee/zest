import { expect, it, vi } from 'vitest'
import { mount } from './form-helpers'

const render = async (markup: string, content: string) => {
	const wrapper = await mount(markup)
	const element = wrapper.querySelector('z-markdown') as any
	element.content = content
	await new Promise((resolve) => setTimeout(resolve, 30))
	return { wrapper, root: element.shadowRoot!.querySelector('.md') as HTMLElement }
}

it('z-markdown renders GFM and turns fences into z-code-block', async () => {
	const { wrapper, root } = await render('<z-markdown></z-markdown>', '# Hi\n\n| a | b |\n|---|---|\n| 1 | 2 |\n\n```ts\nconst a = 1\n```')
	expect(root.querySelector('h1')?.textContent).toBe('Hi')
	expect(root.querySelector('table')).not.toBeNull()
	expect(root.querySelector('z-code-block')?.getAttribute('language')).toBe('ts')
	wrapper.remove()
})

it('z-markdown removes script tags, handlers and obfuscated javascript: URLs', async () => {
	const evil = [
		'<script>window.__pwned = 1</script>',
		'<img src="x" onerror="window.__pwned = 1">',
		'<a href="java&#9;script:window.__pwned=1">tab</a>',
		'<a href="  JavaScript:window.__pwned=1">space</a>',
		'<iframe srcdoc="<script>1</script>"></iframe>'
	].join('\n\n')
	const { wrapper, root } = await render('<z-markdown></z-markdown>', evil)
	expect(root.querySelector('script, iframe')).toBeNull()
	expect(root.querySelector('[onerror]')).toBeNull()
	for (const link of root.querySelectorAll('a')) expect(link.getAttribute('href') ?? '').not.toMatch(/script/i)
	expect((window as any).__pwned).toBeUndefined()
	wrapper.remove()
})

it('z-markdown anchors headings and reports link clicks', async () => {
	const { wrapper, root } = await render('<z-markdown has-heading-anchors></z-markdown>', '## Usage\n\n[go](#usage)')
	expect(root.querySelector('h2')?.id).toBe('usage')
	expect(root.querySelector('.heading-anchor')?.getAttribute('aria-label')).toBe('Link to "Usage"')
	const element = wrapper.querySelector('z-markdown')!
	const onLink = vi.fn()
	element.addEventListener('linkclick', onLink)
	;(root.querySelector('p a') as HTMLElement).click()
	expect(onLink).toHaveBeenCalledOnce()
	expect((onLink.mock.calls[0][0] as CustomEvent).detail.href).toBe('#usage')
	wrapper.remove()
})

it('z-terminal marks commands copyable and copies without the prompt', async () => {
	const writeText = vi.fn().mockResolvedValue(undefined)
	Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
	const wrapper = await mount('<z-terminal></z-terminal>')
	const terminal = wrapper.querySelector('z-terminal') as any
	terminal.code = '$ pnpm install\nDone'
	await new Promise((resolve) => setTimeout(resolve, 30))
	const root = terminal.shadowRoot!
	expect(root.querySelectorAll('.line.copyable').length).toBe(1)
	const copied = vi.fn()
	terminal.addEventListener('copy', copied)
	;(root.querySelector('button.copy') as HTMLElement).click()
	await new Promise((resolve) => setTimeout(resolve, 30))
	expect(writeText).toHaveBeenCalledWith('pnpm install')
	expect((copied.mock.calls[0][0] as CustomEvent).detail).toBe('pnpm install')
	wrapper.remove()
})

it('z-terminal offers to copy a selected snippet', async () => {
	const writeText = vi.fn().mockResolvedValue(undefined)
	Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
	const wrapper = await mount('<z-terminal></z-terminal>')
	const terminal = wrapper.querySelector('z-terminal') as any
	terminal.code = '$ git status\nnothing to commit'
	await new Promise((resolve) => setTimeout(resolve, 30))
	const root = terminal.shadowRoot!
	expect(root.querySelector('.copy-selection')).toBeNull()
	const output = root.querySelector('.output') as HTMLElement
	const range = document.createRange()
	range.selectNodeContents(output)
	const selection = (root.getSelection?.() ?? document.getSelection())!
	selection.removeAllRanges()
	selection.addRange(range)
	document.dispatchEvent(new Event('selectionchange'))
	await new Promise((resolve) => setTimeout(resolve, 50))
	const button = root.querySelector('.copy-selection') as HTMLElement
	expect(button).not.toBeNull()
	button.click()
	await new Promise((resolve) => setTimeout(resolve, 30))
	expect(writeText).toHaveBeenCalledWith('nothing to commit')
	wrapper.remove()
})
