/*
 * Syntax highlighting for z-code-block, backed by lowlight (the highlight.js
 * core that returns a hast tree instead of an HTML string). We flatten that
 * tree into a flat list of { className, value } tokens so they render as real
 * atomico nodes (no innerHTML) and split cleanly across lines for the gutter.
 *
 * Tokens keep their original `hljs-*` class names; z-code-block maps those onto
 * the zest `--syntax-*` palette (see tokens.css) for a theme that matches the
 * design system.
 */

import { createLowlight } from 'lowlight'
import type { Root, Element, RootContent } from 'hast'
import typescript from 'highlight.js/lib/languages/typescript'
import javascript from 'highlight.js/lib/languages/javascript'
import cssLanguage from 'highlight.js/lib/languages/css'
import type { HLJSApi, Language } from 'highlight.js'
import scss from 'highlight.js/lib/languages/scss'
import json from 'highlight.js/lib/languages/json'
import bash from 'highlight.js/lib/languages/bash'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'
import markdown from 'highlight.js/lib/languages/markdown'

// highlight.js knows the HTML tag names (`button`) but not custom elements, so
// `z-button { ... }` split into `z`, `-` and a tag called `button`. A custom
// element name always has a hyphen and is followed by what a selector is
// followed by: a block, a list, a pseudo, a combinator or another selector.
const CUSTOM_ELEMENT_SELECTOR = /\b[a-z][a-z0-9]*(?:-[a-z0-9]+)+\b(?=\s*[{,:>+~.[]|\s+[a-z*#])/

const css = (hljs: HLJSApi): Language => {
	const language = cssLanguage(hljs)
	const customElementRule = { className: 'selector-tag', begin: CUSTOM_ELEMENT_SELECTOR }
	const rules = language.contains ?? []
	// The rule goes right before the HTML tag names, after the property names:
	// at the same position the first rule wins, and `margin-block` is a property.
	const htmlTagIndex = rules.findIndex((rule) => typeof rule !== 'string' && rule.className === 'selector-tag')
	const insertAt = htmlTagIndex === -1 ? rules.length : htmlTagIndex
	return { ...language, contains: [...rules.slice(0, insertAt), customElementRule, ...rules.slice(insertAt)] }
}

// Only register the grammars the docs use, keeps the bundle small versus
// lowlight's full `common` set (~37 languages). Add more here as needed.
const lowlight = createLowlight({
	typescript,
	javascript,
	css,
	scss,
	json,
	bash,
	xml,
	yaml,
	markdown
})

export type Token = { className: string; value: string }

// Map the language tags the docs use onto highlight.js language names/aliases.
const LANG_ALIASES: Record<string, string> = {
	ts: 'typescript',
	tsx: 'typescript',
	mts: 'typescript',
	cts: 'typescript',
	js: 'javascript',
	jsx: 'javascript',
	mjs: 'javascript',
	cjs: 'javascript',
	sh: 'bash',
	shell: 'bash',
	zsh: 'bash',
	console: 'bash',
	html: 'xml',
	svg: 'xml',
	vue: 'xml',
	jsonc: 'json',
	yml: 'yaml'
}

const resolveLang = (language?: string): string | null => {
	const key = (language ?? '').trim().toLowerCase()
	if (!key) return null
	const name = LANG_ALIASES[key] ?? key
	return lowlight.registered(name) ? name : null
}

// True when `language` is a tag highlight() can color. The docs use this to
// fail a build that names a language we do not ship a grammar for.
export const canHighlight = (language: string): boolean => resolveLang(language) !== null

const JSX_LANGUAGE_TAGS = new Set(['tsx', 'jsx'])

// highlight.js only reads JSX inside an expression: after `return`, in an
// arrow body, on the right of `=`. A snippet that is JUST markup, such as
// `<z-button kind="outline" />`, is read as a less-than sign and plain text.
const isBareJsx = (code: string, language?: string): boolean => {
	const key = (language ?? '').trim().toLowerCase()
	const isJsxLanguage = JSX_LANGUAGE_TAGS.has(key)
	if (!isJsxLanguage) return false
	return /^\s*<[A-Za-z>]/.test(code)
}

// Wrapping the snippet in a fragment inside parentheses puts it in
// expression position. The wrapper is cut out of the result again, so the
// tokens always add up to exactly the source.
const JSX_WRAPPER_START = '(<>'
const JSX_WRAPPER_END = '</>)'

const cutTokenEdges = (tokens: Token[], startLength: number, endLength: number): Token[] => {
	const cut = tokens.map((token) => ({ className: token.className, value: token.value }))
	let startLeft = startLength
	for (const token of cut) {
		const removed = Math.min(startLeft, token.value.length)
		token.value = token.value.slice(removed)
		startLeft -= removed
		if (startLeft === 0) break
	}
	let endLeft = endLength
	for (const token of [...cut].reverse()) {
		const removed = Math.min(endLeft, token.value.length)
		token.value = token.value.slice(0, token.value.length - removed)
		endLeft -= removed
		if (endLeft === 0) break
	}
	return cut.filter((token) => token.value.length > 0)
}

const flatten = (node: Root | RootContent, inherited: string, out: Token[]) => {
	if (node.type === 'text') {
		if (node.value) out.push({ className: inherited, value: node.value })
		return
	}
	if (node.type === 'element') {
		const own = (node as Element).properties?.className
		const classes = Array.isArray(own) ? own.join(' ') : ''
		const next = inherited && classes ? `${inherited} ${classes}` : inherited || classes
		for (const child of node.children) flatten(child, next, out)
		return
	}
	if (node.type === 'root') {
		for (const child of node.children) flatten(child, inherited, out)
	}
}

/*
 * highlight.js leaves most punctuation/operators (parens, brackets, <>, dots,
 * commas, `=`, arrows, …) as unclassed text, so they'd render at full
 * foreground brightness. Split those runs out of plain tokens and tag them
 * `hljs-punctuation` so the theme can dim them. Only unclassed tokens are
 * touched, punctuation inside strings/comments keeps its own color.
 */
// A hyphen between two word characters is part of a name (z-sidebar,
// save-dev), not an operator, so only a hyphen at the edge of a word is dimmed.
const PUNCT_RE = /([(){}\[\]<>.,;:=+*\/%!&|^~?]+|(?<![A-Za-z0-9_])-+|-+(?![A-Za-z0-9_]))/g

const dimPunctuation = (tokens: Token[]): Token[] => {
	const out: Token[] = []
	for (const token of tokens) {
		if (token.className) {
			out.push(token)
			continue
		}
		let last = 0
		PUNCT_RE.lastIndex = 0
		for (let m = PUNCT_RE.exec(token.value); m; m = PUNCT_RE.exec(token.value)) {
			if (m.index > last) out.push({ className: '', value: token.value.slice(last, m.index) })
			out.push({ className: 'hljs-punctuation', value: m[0] })
			last = PUNCT_RE.lastIndex
		}
		if (last < token.value.length) out.push({ className: '', value: token.value.slice(last) })
	}
	return out
}

// highlightAuto gives up and returns an empty tree (relevance: 0) when the
// code doesn't confidently match any registered grammar, e.g. plain prose
// tagged ```txt. Detect that and fall back to rendering the text unhighlighted
// rather than silently dropping it.
export const highlight = (code: string, language?: string): Token[] => {
	if (!code) return []
	const lang = resolveLang(language)
	if (lang && isBareJsx(code, language)) {
		const wrapped: Token[] = []
		flatten(lowlight.highlight(lang, JSX_WRAPPER_START + code + JSX_WRAPPER_END), '', wrapped)
		return dimPunctuation(cutTokenEdges(wrapped, JSX_WRAPPER_START.length, JSX_WRAPPER_END.length))
	}
	if (lang) {
		const out: Token[] = []
		flatten(lowlight.highlight(lang, code), '', out)
		return dimPunctuation(out)
	}
	const auto = lowlight.highlightAuto(code)
	if (auto.children.length === 0) return [{ className: '', value: code }]
	const out: Token[] = []
	flatten(auto, '', out)
	return dimPunctuation(out)
}

/*
 * Split tokens into lines for the line-number gutter. A single token may span
 * multiple lines (block comments, template literals), so we break token values
 * on '\n' rather than splitting the raw source.
 */
export const splitTokenLines = (tokens: Token[]): Token[][] => {
	const lines: Token[][] = [[]]
	for (const token of tokens) {
		const parts = token.value.split('\n')
		parts.forEach((part, index) => {
			if (index > 0) lines.push([])
			if (part) lines[lines.length - 1].push({ className: token.className, value: part })
		})
	}
	return lines
}
