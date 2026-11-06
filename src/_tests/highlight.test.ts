import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { canHighlight, highlight, splitTokenLines } from '../shared/highlight'

const joinTokens = (code: string, language: string): string =>
	highlight(code, language)
		.map((token) => token.value)
		.join('')

const getClasses = (code: string, language: string): string[] => highlight(code, language).map((token) => token.className)

const hasClass = (code: string, language: string, className: string): boolean =>
	getClasses(code, language).some((value) => value.includes(className))

// One snippet per language the docs use. Each must keep every character and
// color at least one token.
const SAMPLES: Record<string, { code: string; expectedClass: string }> = {
	tsx: { code: 'const A = () => <z-button kind="outline">Save</z-button>\n', expectedClass: 'hljs-name' },
	ts: { code: 'const count: number = 3\nexport type PropsT = { id: string }\n', expectedClass: 'hljs-keyword' },
	js: { code: "document.querySelector('z-menu').addEventListener('select', () => {})\n", expectedClass: 'hljs-string' },
	html: { code: '<z-button kind="solid">Save</z-button>\n', expectedClass: 'hljs-name' },
	css: { code: 'z-button { --button-radius: 4px; }\n', expectedClass: 'hljs-selector-tag' },
	json: { code: '{ "name": "zest", "version": 1 }\n', expectedClass: 'hljs-attr' },
	bash: { code: 'cd app && pnpm dev # run\n', expectedClass: 'hljs-comment' }
}

describe('highlight', () => {
	it.each(Object.keys(SAMPLES))('%s: keeps every character and colors something', (language) => {
		const sample = SAMPLES[language]
		expect(joinTokens(sample.code, language)).toBe(sample.code)
		expect(hasClass(sample.code, language, sample.expectedClass)).toBe(true)
	})

	describe('bare JSX (a snippet that is only markup)', () => {
		const single = `<z-sidebar value={route} items={[{ value: 'inbox', label: 'Inbox' }]} />\n`
		const pair = `${single}<z-button kind="outline" isLoading={saving}>Save</z-button>\n`

		it.each(['tsx', 'jsx'])('%s: the first tag is a tag, not a less-than sign', (language) => {
			const tokens = highlight(single, language)
			const names = tokens.filter((token) => token.className.includes('hljs-name')).map((token) => token.value)
			expect(names).toEqual(['z-sidebar'])
		})

		it('colors every element when several follow each other', () => {
			const tokens = highlight(pair, 'tsx')
			const names = tokens.filter((token) => token.className.includes('hljs-name')).map((token) => token.value)
			expect(names).toEqual(['z-sidebar', 'z-button', 'z-button'])
		})

		it('does not add or lose a character', () => {
			expect(joinTokens(pair, 'tsx')).toBe(pair)
			expect(joinTokens(single, 'jsx')).toBe(single)
		})

		it('leaves code that is not markup alone', () => {
			const code = 'const total = a < b ? a : b\n'
			expect(joinTokens(code, 'tsx')).toBe(code)
		})
	})

	describe('custom elements in CSS', () => {
		const getSelectorTags = (code: string): string[] =>
			highlight(code, 'css')
				.filter((token) => token.className.includes('selector-tag'))
				.map((token) => token.value)

		it('colors a hyphenated name as one selector', () => {
			expect(getSelectorTags('z-button { color: red; }\n')).toEqual(['z-button'])
		})

		it('handles lists, pseudo-classes, parts and combinators', () => {
			const code = 'z-button, z-input { }\nz-button:hover { }\nz-card::part(thumb) { }\nz-row > z-card { }\n'
			expect(getSelectorTags(code)).toEqual(['z-button', 'z-input', 'z-button', 'z-card', 'z-row', 'z-card'])
		})

		it('does not color property names inside a rule', () => {
			expect(getSelectorTags('z-button { margin-block: 1px; --button-radius: 4px; }\n')).toEqual(['z-button'])
		})

		it('keeps every character', () => {
			const code = 'z-row > z-card:hover { padding-inline: 2px; }\n'
			expect(joinTokens(code, 'css')).toBe(code)
		})
	})

	describe('hyphens in names', () => {
		it('are not dimmed inside a word', () => {
			const tokens = highlight('pnpm add save-dev\n', 'bash')
			const dimmed = tokens.filter((token) => token.className === 'hljs-punctuation').map((token) => token.value)
			expect(dimmed).toEqual([])
		})

		it('are dimmed at the start of a flag', () => {
			const tokens = highlight('pnpm add --save-dev x\n', 'bash')
			const dimmed = tokens.filter((token) => token.className === 'hljs-punctuation').map((token) => token.value)
			expect(dimmed).toEqual(['--'])
		})
	})

	it('splits tokens into lines without losing text', () => {
		const code = 'const a = 1\nconst b = 2\n'
		const lines = splitTokenLines(highlight(code, 'ts'))
		const rebuilt = lines.map((line) => line.map((token) => token.value).join('')).join('\n')
		expect(rebuilt).toBe(code)
	})
})

// Every language the docs name must be one we ship a grammar for. A new tag
// like "python" would silently render as plain text, so it fails here.
const walk = (directory: string): string[] =>
	readdirSync(directory).flatMap((name) => {
		const path = join(directory, name)
		return statSync(path).isDirectory() ? walk(path) : [path]
	})

describe('the docs', () => {
	const sourceFiles = walk(join(__dirname, '..', '..', 'site', 'src')).filter((path) => /\.(tsx|ts)$/.test(path))
	const languagePattern = /language(?:=|:\s*)['"]([a-z]+)['"]/g
	const usedLanguages = new Set<string>()
	for (const path of sourceFiles) {
		const source = readFileSync(path, 'utf8')
		for (const match of source.matchAll(languagePattern)) usedLanguages.add(match[1])
	}

	it('names at least the languages we expect', () => {
		expect([...usedLanguages].sort()).toEqual(expect.arrayContaining(['tsx', 'html', 'js', 'css', 'json', 'bash', 'ts']))
	})

	it.each([...usedLanguages].sort())('can highlight "%s"', (language) => {
		expect(canHighlight(language)).toBe(true)
	})
})
