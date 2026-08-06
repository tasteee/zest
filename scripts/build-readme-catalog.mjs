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

const readmePath = join(repoRoot, 'README.md')
const readme = readFileSync(readmePath, 'utf8')

const start = readme.indexOf(START_MARKER)
const end = readme.indexOf(END_MARKER)

const hasMarkers = start >= 0 && end > start
if (!hasMarkers) {
	console.error(`README.md is missing ${START_MARKER} / ${END_MARKER}`)
	process.exit(1)
}

const before = readme.slice(0, start + START_MARKER.length)
const after = readme.slice(end)
writeFileSync(readmePath, `${before}\n\n${lines.join('\n')}\n\n${after}`)

console.log(`README catalog: ${tags.length} elements across ${byCategory.size} categories`)
