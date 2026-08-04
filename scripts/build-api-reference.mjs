// Generates docs/element-api-reference.md — every element as a JSX-shaped
// signature.
//
// Tags, attributes and types come from custom-elements.json, which is built by
// build-cem.mjs off the TypeScript AST and is therefore authoritative. Two
// things the manifest does not carry have to be recovered from elsewhere:
//
//   Value unions — scraped from each component's own CSS attribute selectors
//   and prop comparisons, falling back to the curated markdown tables. A value
//   that resolves through a var() fallback rather than its own rule leaves no
//   trace in the source, which is why the defaults get merged in and why the
//   output says so.
//
//   Events — read from the `event<...>()` declarations in the props object.
//
// Run: node scripts/build-api-reference.mjs

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(scriptDirectory, '..')
const componentsDirectory = join(repoRoot, 'src', 'components')
const docsDirectory = join(repoRoot, 'docs')

// --- vocabularies -----------------------------------------------------------

// A scale read alphabetically is not a scale, so the library-wide vocabularies
// carry their own order.
const CANONICAL_ORDER = {
	accent: ['dom', 'sub', 'neutral', 'success', 'warning', 'error'],
	color: ['dom', 'sub', 'neutral', 'strong', 'muted', 'success', 'warning', 'error'],
	size: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
	kind: ['solid', 'outline', 'ghost', 'soft', 'plain'],
	direction: ['horizontal', 'vertical', 'both'],
	side: ['start', 'end', 'top', 'bottom', 'left', 'right'],
	align: ['start', 'center', 'end'],
	placement: ['top', 'bottom', 'start', 'end', 'left', 'right'],
	level: ['0', '1', '2', '3']
}

// A binary axis with one rule and one default state only ever scrapes half of
// itself: `[direction='vertical']` implies horizontal without ever saying so.
const BINARY_AXES = { direction: ['horizontal', 'vertical'] }

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

// --- inputs -----------------------------------------------------------------

const readManifest = () => {
	const manifestPath = join(repoRoot, 'custom-elements.json')
	const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))

	const elements = []
	for (const module of manifest.modules) {
		for (const declaration of module.declarations) {
			if (!declaration.customElement) continue
			elements.push(declaration)
		}
	}
	return elements
}

const readComponentSources = () => {
	const sources = new Map()
	for (const fileName of readdirSync(componentsDirectory)) {
		if (!fileName.endsWith('.tsx')) continue
		sources.set(fileName, readFileSync(join(componentsDirectory, fileName), 'utf8'))
	}
	return sources
}

// A tag's source file is not always named after it — z-text.tsx defines five.
const buildSourceIndex = (sources) => {
	const index = new Map()
	for (const [fileName, text] of sources) {
		for (const match of text.matchAll(/customElements\.define\('([\w-]+)'/g)) {
			index.set(match[1], text)
		}
	}
	return index
}

// --- markdown fallbacks -----------------------------------------------------

const readDocTables = () => {
	const values = new Map()
	const defaults = new Map()
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

			const tag = basename(fileName, '.md')
			categories.set(tag, categoryName)

			const text = readFileSync(join(categoryPath, fileName), 'utf8')
			const tagValues = {}
			const tagDefaults = {}
			let isInAttributeTable = false

			for (const line of text.split('\n')) {
				if (line.startsWith('## ')) {
					isInAttributeTable = /attribute|propert/i.test(line)
					continue
				}
				if (!isInAttributeTable) continue

				const row = line.match(/^\| `([a-z][\w-]*)`[^|]*\|([^|]*)\|([^|]*)\|/)
				if (!row) continue

				const tokens = [...row[2].matchAll(/`([A-Za-z0-9_.-]+)`/g)].map((match) => match[1])
				if (tokens.length > 1) tagValues[row[1]] = tokens

				const declaredDefault = row[3].match(/`([A-Za-z0-9_.-]+)`/)
				if (declaredDefault) tagDefaults[row[1]] = declaredDefault[1]
			}

			values.set(tag, tagValues)
			defaults.set(tag, tagDefaults)
		}
	}

	return { values, defaults, categories }
}

// --- scraping ---------------------------------------------------------------

const escapeForRegex = (text) => text.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&')

const scrapeValues = (source, attributeName, fieldName) => {
	if (!source) return []

	const attribute = escapeForRegex(attributeName)
	const field = escapeForRegex(fieldName)
	const pattern = new RegExp(`\\[${attribute}='([A-Za-z0-9_.-]+)'\\]|props\\.${field} === '([A-Za-z0-9_.-]+)'|\\b${field} === '([A-Za-z0-9_.-]+)'`, 'g')

	const found = []
	for (const match of source.matchAll(pattern)) {
		const value = match[1] || match[2] || match[3]
		if (value && !found.includes(value)) found.push(value)
	}
	return found
}

const scrapeEvents = (source, className) => {
	if (!source) return []

	// Only the props object belonging to this element, so a file defining five
	// does not hand all five the same events.
	const declarationIndex = source.indexOf(`const ${className} = c(`)
	const segment = declarationIndex >= 0 ? source.slice(declarationIndex) : source

	const events = []
	// The type parameter is optional — `select: event({ ... })` declares an
	// event with no detail at all.
	for (const match of segment.matchAll(/(\w+): event(?:<([^>]*)>)?\(/g)) {
		if (events.some((entry) => entry.name === match[1])) continue
		events.push({ name: match[1], detail: (match[2] || '').trim() })
	}
	return events
}

// --- rendering --------------------------------------------------------------

const orderValues = (attributeName, scraped, declaredDefault) => {
	const merged = [...scraped]

	const binaryPair = BINARY_AXES[attributeName]
	const isBinary = binaryPair && merged.length > 0 && merged.every((value) => binaryPair.includes(value))
	if (isBinary) return binaryPair

	// The default usually has no rule of its own — it is what the var() falls
	// back to — so it never turns up in the scrape.
	if (declaredDefault && !merged.includes(declaredDefault)) merged.push(declaredDefault)

	// md is the library-wide default step and likewise carries no rule.
	const isSizeScale = attributeName === 'size' && merged.some((value) => ['xs', 'sm', 'lg', 'xl'].includes(value))
	if (isSizeScale && !merged.includes('md')) merged.push('md')

	const canonical = CANONICAL_ORDER[attributeName]
	if (!canonical) {
		// No canonical scale, so lead with the default — it is the one value a
		// reader wants to spot first.
		const rest = merged.filter((value) => value !== declaredDefault)
		return declaredDefault ? [declaredDefault, ...rest] : merged
	}

	const ranked = canonical.filter((value) => merged.includes(value))
	const extra = merged.filter((value) => !canonical.includes(value))
	return [...ranked, ...extra]
}

const renderAttributeValue = (attribute, scraped, docValues, declaredDefault) => {
	const type = attribute.type ? attribute.type.text : 'string'

	if (type === 'boolean') return null
	if (type === 'number') return '{number}'
	if (type === 'array') return '{Array}'
	if (type === 'object') return '{Object}'

	const source = scraped.length > 0 ? scraped : docValues || []
	const values = orderValues(attribute.name, source, declaredDefault)

	if (values.length > 1) return `"${values.join(' | ')}"`
	return '{string}'
}

const buildSignature = (element, context) => {
	const source = context.sourceByTag.get(element.tagName)
	const docValues = context.docValues.get(element.tagName) || {}
	const docDefaults = context.docDefaults.get(element.tagName) || {}

	// The manifest lists event declarations as attributes, because in Atomico
	// they live in the same props object. They are not attributes.
	const events = scrapeEvents(source, element.name)
	const eventNames = new Set(events.map((event) => event.name))

	const valueLines = []
	const booleanLines = []

	for (const attribute of element.attributes || []) {
		if (eventNames.has(attribute.fieldName || attribute.name)) continue
		const type = attribute.type ? attribute.type.text : 'string'

		if (type === 'boolean') {
			booleanLines.push({ name: attribute.name, isHidden: attribute.name === 'is-hidden' })
			continue
		}

		const scraped = scrapeValues(source, attribute.name, attribute.fieldName || attribute.name)
		const declaredDefault = docDefaults[attribute.name]
		const rendered = renderAttributeValue(attribute, scraped, docValues[attribute.name], declaredDefault)
		const comment = declaredDefault ? `   // default: ${declaredDefault}` : ''
		valueLines.push(`  ${attribute.name}=${rendered}${comment}`)
	}

	// is-hidden is on nearly everything and says nothing about the element, so
	// it sorts to the bottom of its group rather than alphabetically into it.
	booleanLines.sort((left, right) => Number(left.isHidden) - Number(right.isHidden))

	const eventLines = events.map((event) => {
		const shape = event.detail && event.detail !== 'void' ? event.detail : '—'
		return `  on${event.name}={(event) => event.detail}   // ${shape}`
	})

	const bodyLines = [...valueLines, ...booleanLines.map((entry) => `  ${entry.name}`), ...eventLines]

	if (bodyLines.length === 0) return `<${element.tagName} />`
	return [`<${element.tagName}`, ...bodyLines, '/>'].join('\n')
}

// --- assembly ---------------------------------------------------------------

const buildAnchor = (label) => label.toLowerCase().replace(/ & /g, '--').replace(/[^a-z0-9-]+/g, '-')

const buildDocument = (elements, context) => {
	const byCategory = new Map()
	for (const element of elements) {
		const category = context.categories.get(element.tagName) || 'uncategorised'
		if (!byCategory.has(category)) byCategory.set(category, [])
		byCategory.get(category).push(element)
	}

	const lines = []
	lines.push('# Zest element API reference')
	lines.push('')
	lines.push(`**${elements.length} elements.** Every one, as you would write it. Generated from`)
	lines.push('source by `scripts/build-api-reference.mjs`, so it is current by')
	lines.push('construction rather than by discipline.')
	lines.push('')
	lines.push('**How to read these.**')
	lines.push('')
	lines.push('- `prop="a | b | c"` — a string attribute with a fixed set of values.')
	lines.push('- `prop={string}` — a string attribute, free-form.')
	lines.push('- `prop={number}` — a numeric attribute.')
	lines.push('- `prop={Array}` / `prop={Object}` — **property only**. Assign it from JS')
	lines.push('  (`el.items = [...]`); an attribute cannot carry it.')
	lines.push('- `is-thing` — a boolean attribute. Present is true, absent is false.')
	lines.push('- `onthing` — an event, with the shape of its `detail`.')
	lines.push('')
	lines.push('Attributes are kebab-case in markup and camelCase as JS properties:')
	lines.push('`is-full-width` is `el.isFullWidth`.')
	lines.push('')
	lines.push('**One caveat on the value unions.** Tags, attributes and types come from')
	lines.push('`custom-elements.json` and are authoritative. The unions do not: they are')
	lines.push('scraped from each component\'s own CSS and comparisons, so a value that')
	lines.push('resolves through a `var()` fallback rather than its own rule leaves no')
	lines.push('trace to find. Documented defaults are merged back in. If a union looks')
	lines.push('short, that is the first place to check.')
	lines.push('')
	lines.push('## Contents')
	lines.push('')

	for (const category of CATEGORY_ORDER) {
		const group = byCategory.get(category)
		if (!group) continue
		const label = CATEGORY_LABELS[category]
		lines.push(`- [${label}](#${buildAnchor(label)}) — ${group.length}`)
	}
	lines.push('')

	for (const category of CATEGORY_ORDER) {
		const group = byCategory.get(category)
		if (!group) continue

		group.sort((left, right) => left.tagName.localeCompare(right.tagName))

		lines.push('---')
		lines.push('')
		lines.push(`## ${CATEGORY_LABELS[category]}`)
		lines.push('')

		for (const element of group) {
			lines.push(`### \`${element.tagName}\``)
			lines.push('')
			lines.push('```jsx')
			lines.push(buildSignature(element, context))
			lines.push('```')
			lines.push('')
		}
	}

	return lines.join('\n')
}

const elements = readManifest()
const sources = readComponentSources()
const sourceByTag = buildSourceIndex(sources)
const { values: docValues, defaults: docDefaults, categories } = readDocTables()

const document = buildDocument(elements, { sourceByTag, docValues, docDefaults, categories })
writeFileSync(join(docsDirectory, 'element-api-reference.md'), document)

console.log(`element-api-reference.md: ${elements.length} elements`)
