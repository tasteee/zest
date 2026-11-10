import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import '../../tokens.css'

/*
 * The token inheritance contract, checked against real computed styles.
 *
 * Derived tokens are substituted where they are declared, so a region only
 * sees a changed input if it re-derives. These tests pin which elements do:
 * `:root`, `[data-theme]` and `[data-zest-scope]`, and that values set on
 * `:root` survive each of those boundaries.
 */

const mounted: HTMLElement[] = []
const root = document.documentElement

const add = (html: string, parent: HTMLElement = document.body): HTMLElement => {
	const holder = document.createElement('div')
	holder.innerHTML = html.trim()
	const element = holder.firstElementChild as HTMLElement
	parent.append(element)
	mounted.push(element)
	return element
}

const read = (element: Element, property: string): string => {
	return getComputedStyle(element).getPropertyValue(property).trim()
}

// Resolve a token to pixels or an rgb colour the way the page would use it.
const probe = (element: HTMLElement, declaration: string): CSSStyleDeclaration => {
	const child = document.createElement('i')
	child.style.cssText = declaration
	element.append(child)
	return getComputedStyle(child)
}

beforeAll(() => {
	root.setAttribute('data-theme', 'dark')
})

afterEach(() => {
	for (const element of mounted.splice(0)) element.remove()
	root.removeAttribute('style')
	root.setAttribute('data-theme', 'dark')
})

describe('scale inputs', () => {
	it('a plain container that changes --base-radius keeps the inherited radius', () => {
		const plain = add('<div style="--base-radius: 0px"></div>')
		expect(read(plain, '--radius-lg')).not.toBe('0px')
	})

	it('a [data-zest-scope] container re-derives the radius scale', () => {
		const scoped = add('<div data-zest-scope style="--base-radius: 0px"></div>')
		const resolved = probe(scoped, 'border-radius: var(--radius-lg)')
		expect(resolved.borderTopLeftRadius).toBe('0px')
	})

	it('a [data-zest-scope] container re-derives the type scale from --base-font-size', () => {
		const scoped = add('<div data-zest-scope style="--base-font-size: 8px"></div>')
		expect(probe(scoped, 'font-size: var(--font-size-md)').fontSize).toBe('8px')
		expect(probe(scoped, 'font-size: var(--font-size-xl)').fontSize).toBe('10px')
	})

	it('the type scale is rem-based at the default size', () => {
		const sized = (token: string) => probe(root, `font-size: var(${token})`).fontSize
		expect(sized('--font-size-sm')).toBe('14px')
		expect(sized('--font-size-md')).toBe('16px')
		expect(sized('--font-size-xl')).toBe('20px')
	})
})

describe('theme boundaries', () => {
	it('keep scale values set on :root', () => {
		root.style.setProperty('--base-spacing', '0.5rem')
		const themed = add('<section data-theme="light"></section>')
		expect(probe(themed, 'padding-top: var(--space-1)').paddingTop).toBe('8px')
	})

	it('a light region swaps the palette and its role tokens', () => {
		const light = add('<section data-theme="light"></section>')
		expect(read(light, 'color-scheme')).toBe('light')
		const dark = probe(root, 'color: var(--text-primary)').color
		const themed = probe(light, 'color: var(--text-primary)').color
		expect(themed).not.toBe(dark)
	})

	it('a dark region nested in light gets the dark palette back', () => {
		const light = add('<section data-theme="light"></section>')
		const nested = add('<div data-theme="dark"></div>', light)
		const rootInk = probe(root, 'color: var(--text-primary)').color
		expect(probe(nested, 'color: var(--text-primary)').color).toBe(rootInk)
	})

	it('a scope inside a light region keeps the light palette and its on-accent', () => {
		const light = add('<section data-theme="light"></section>')
		const scoped = add('<div data-zest-scope></div>', light)
		expect(probe(scoped, 'color: var(--on-accent)').color).toBe('rgb(255, 255, 255)')
		expect(probe(scoped, 'color: var(--text-primary)').color).toBe(probe(light, 'color: var(--text-primary)').color)
	})

	it('an unknown theme inherits the surrounding palette instead of resetting to dark', () => {
		const light = add('<section data-theme="light"></section>')
		const custom = add('<div data-theme="custom"></div>', light)
		expect(probe(custom, 'color: var(--text-primary)').color).toBe(probe(light, 'color: var(--text-primary)').color)
	})
})

describe('tokens.css', () => {
	it('does not paint the host page', () => {
		expect(getComputedStyle(document.body).backgroundColor).toBe('rgba(0, 0, 0, 0)')
	})
})
