// Rewrites the component catalog inside README.md from custom-elements.json
// and the docs folder layout.
//
// The catalog was hand-maintained and drifted to 151 entries against an actual
// 184 — the kind of error nobody notices because nobody reads a list of tags
// looking for absences. Generating it between two markers means it cannot drift
// again.
//
// Run: node scripts/build-readme-catalog.mjs

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(scriptDirectory, '..')
const docsDirectory = join(repoRoot, 'docs')

const START_MARKER = '<!-- catalog:start -->'
const END_MARKER = '<!-- catalog:end -->'
const DEFAULT_TRUE_START = '<!-- default-true:start -->'
const DEFAULT_TRUE_END = '<!-- default-true:end -->'

const CATEGORY_LABELS = {
	foundation: 'Foundation',
	layout: 'Layout',
	'buttons-actions': 'Buttons & actions',
	forms: 'Forms',
	'navigation-disclosure': 'Navigation & disclosure',
	overlays: 'Overlays',
	'data-display': 'Data display',
	'canvas-panels': 'Canvas, panels & docs',
	'text-editor': 'Text editor',
	chat: 'Chat',
	attachments: 'Attachments',
	effects: 'Effects',
	music: 'Music',
	specialized: 'Specialized',
	uncategorised: 'Uncategorised'
}

const CATEGORY_ORDER = Object.keys(CATEGORY_LABELS)

const readTags = () => {
	const manifest = JSON.parse(readFileSync(join(repoRoot, 'custom-elements.json'), 'utf8'))

	const tags = []
	for (const module of manifest.modules) {
		for (const declaration of module.declarations) {
			if (declaration.customElement) tags.push(declaration.tagName)
		}
	}
	return tags
}

const readCategories = () => {
	const categories = new Map()

	for (const categoryName of readdirSync(docsDirectory)) {
		const categoryPath = join(docsDirectory, categoryName)
		if (!existsSync(categoryPath)) continue

		let fileNames = []
		try {
			fileNames = readdirSync(categoryPath)
		} catch {
			continue
		}

		for (const fileName of fileNames) {
			if (!fileName.endsWith('.md')) continue
			categories.set(basename(fileName, '.md'), categoryName)
		}
	}

	return categories
}

// A tag defined alongside others in one file is documented on that file's
// page — z-step lives in z-steps.tsx and is documented in z-steps.md. Without
// this they all fall into "uncategorised", which is true of the page but not
// of the element.
const readTagsByFile = () => {
	const componentsDirectory = join(repoRoot, 'src', 'components')
	const byFile = new Map()

	for (const fileName of readdirSync(componentsDirectory)) {
		if (!fileName.endsWith('.tsx')) continue

		const source = readFileSync(join(componentsDirectory, fileName), 'utf8')
		const defined = [...source.matchAll(/customElements\.define\('([\w-]+)'/g)].map((match) => match[1])
		if (defined.length > 0) byFile.set(fileName, defined)
	}

	return byFile
}

const resolveCategory = (tag, categories, tagsByFile) => {
	const direct = categories.get(tag)
	if (direct) return direct

	for (const [fileName, siblings] of tagsByFile) {
		if (!siblings.includes(tag)) continue

		// The page can be named after a sibling tag...
		for (const sibling of siblings) {
			const inherited = categories.get(sibling)
			if (inherited) return inherited
		}

		// ...or after the file, when no single tag carries its name.
		// z-drag-drop.md documents z-draggable and z-drop-target; there is no
		// z-drag-drop element at all.
		const byFileName = categories.get(basename(fileName, '.tsx'))
		if (byFileName) return byFileName
	}

	return 'uncategorised'
}

const tags = readTags()
const categories = readCategories()
const tagsByFile = readTagsByFile()

const byCategory = new Map()
for (const tag of tags) {
	const category = resolveCategory(tag, categories, tagsByFile)
	if (!byCategory.has(category)) byCategory.set(category, [])
	byCategory.get(category).push(tag)
}

const lines = []
lines.push(`**${tags.length} elements.** Generated from \`custom-elements.json\`.`)
lines.push('')
lines.push('Every element has a reference page under [`docs/`](./docs), and')
lines.push('[`docs/element-api-reference.md`](./docs/element-api-reference.md) lists all')
lines.push('of their attributes in one place.')

for (const category of CATEGORY_ORDER) {
	const group = byCategory.get(category)
	if (!group) continue

	group.sort((left, right) => left.localeCompare(right))

	lines.push('')
	lines.push(`#### ${CATEGORY_LABELS[category]}`)
	lines.push('')
	lines.push(group.map((tag) => `\`${tag}\``).join(' '))
}

// The README's rule is "absent is the default, and the default is false" —
// except for the booleans declared with `value: () => true`. Listing them by
// hand is how the rule ended up contradicted, so they are scanned from source.
const toKebab = (name) => name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
const publicTags = new Set(tags)
const defaultTrueLines = []
for (const file of readdirSync(join(repoRoot, 'src', 'components')).sort()) {
	const tag = basename(file, '.tsx')
	if (!publicTags.has(tag)) continue
	const source = readFileSync(join(repoRoot, 'src', 'components', file), 'utf8')
	const names = [...source.matchAll(/(\w+):\s*\{\s*type:\s*Boolean[^}]*value:\s*\(\)\s*=>\s*true/g)].map((match) => toKebab(match[1]))
	if (names.length) defaultTrueLines.push(`- \`${tag}\`: ${names.map((name) => `\`${name}\``).join(', ')}`)
}

const replaceBetween = (text, startMarker, endMarker, body) => {
	const start = text.indexOf(startMarker)
	const end = text.indexOf(endMarker)
	if (start < 0 || end <= start) {
		console.error(`README.md is missing ${startMarker} / ${endMarker}`)
		process.exit(1)
	}
	return `${text.slice(0, start + startMarker.length)}\n\n${body}\n\n${text.slice(end)}`
}

const readmePath = join(repoRoot, 'README.md')
let readme = readFileSync(readmePath, 'utf8')
readme = replaceBetween(readme, START_MARKER, END_MARKER, lines.join('\n'))
readme = replaceBetween(readme, DEFAULT_TRUE_START, DEFAULT_TRUE_END, defaultTrueLines.join('\n'))
writeFileSync(readmePath, readme)

console.log(`README catalog: ${tags.length} elements across ${byCategory.size} categories, ${defaultTrueLines.length} elements with default-true booleans`)
