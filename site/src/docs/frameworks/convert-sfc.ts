// HTML → Vue and Svelte. Both render z elements as plain DOM with HTML's own
// attribute names, so the demo's markup is used exactly as written. Only
// the component file around it, and each template's own syntax for a
// literal brace, differ.

const indentLines = (text: string, indent: string): string => {
	const lines = text.trimEnd().split('\n')
	const trimmedLines = lines.map((line) => line.trimEnd())
	const indentedLines = trimmedLines.map((line) => (line === '' ? line : indent + line))
	return indentedLines.join('\n')
}

// `{{` opens an interpolation in a Vue template
const escapeVueMarkup = (html: string): string => html.replace(/\{\{/g, '&#123;&#123;')

// any `{` opens an expression in Svelte markup, text and attributes alike
const escapeSvelteMarkup = (html: string): string => html.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;')

export const convertToVue = (html: string, hasStyles: boolean): string => {
	const styleImport = hasStyles ? "\nimport './styles.css'" : ''
	const script = `<script setup lang="ts">\nimport '@tasteee/zest'${styleImport}\n</script>`
	const template = `<template>\n${indentLines(escapeVueMarkup(html), '  ')}\n</template>`
	return `${script}\n\n${template}\n`
}

export const convertToSvelte = (html: string, hasStyles: boolean): string => {
	const styleImport = hasStyles ? "\n  import './styles.css'" : ''
	const script = `<script lang="ts">\n  import '@tasteee/zest'${styleImport}\n</script>`
	const trimmedLines = html.trimEnd().split('\n').map((line) => line.trimEnd())
	const markup = escapeSvelteMarkup(trimmedLines.join('\n'))
	return `${script}\n\n${markup}\n`
}
