import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPublicElementEntries } from './public-element-entries.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const manifest = JSON.parse(readFileSync(join(root, 'custom-elements.json'), 'utf8'))
const declarations = manifest.modules.flatMap((module) => module.declarations ?? [])
const tags = declarations.filter((declaration) => declaration.customElement).map((declaration) => declaration.tagName)
const elementEntries = getPublicElementEntries()
const entryTags = elementEntries.map((entry) => entry.tag)

const heldBackTags = new Set([
	'z-post-meta', 'z-sources', 'z-chart', 'z-markdown', 'z-sandbox',
	'z-version-picker', 'z-reading-progress', 'z-prev-next', 'z-live-code',
	'z-do-dont', 'z-nav-tree', 'z-streaming-text', 'z-thinking', 'z-citation',
	'z-dock', 'z-dock-item', 'z-send-button', 'z-center', 'z-container',
	'z-section', 'z-virtual-list', 'z-row', 'z-column', 'z-grid',
	'z-chat-shell', 'z-chat-header', 'z-conversation-list', 'z-conversation-item',
	'z-message-list', 'z-message-group', 'z-message-bubble', 'z-message-actions',
	'z-reactions', 'z-emoji-picker', 'z-date-divider', 'z-unread-divider',
	'z-system-message', 'z-delivery-status', 'z-read-receipt', 'z-quoted-message',
	'z-image-message', 'z-typing-indicator', 'z-composer', 'z-tool-call',
	'z-model-picker', 'z-aura', 'z-progressive-blur'
])

const failures = []
const duplicates = tags.filter((tag, index) => tags.indexOf(tag) !== index)
if (duplicates.length) failures.push(`duplicate manifest tags: ${[...new Set(duplicates)].join(', ')}`)

const leakedTags = tags.filter((tag) => heldBackTags.has(tag))
if (leakedTags.length) failures.push(`held-back tags in manifest: ${leakedTags.join(', ')}`)

if (JSON.stringify(tags.slice().sort()) !== JSON.stringify(entryTags.slice().sort())) {
	failures.push('manifest tags and package element subpaths do not match')
}

for (const tag of entryTags) {
	if (!existsSync(join(root, 'dist', 'elements', `${tag}.js`))) failures.push(`missing JavaScript subpath for ${tag}`)
	if (!existsSync(join(root, 'dist', 'elements', `${tag}.d.ts`))) failures.push(`missing declaration subpath for ${tag}`)
}

for (const declaration of declarations) {
	for (const attribute of declaration.attributes ?? []) {
		const type = attribute.type?.text
		if (['object', 'array', 'function'].includes(type)) {
			failures.push(`${declaration.tagName}.${attribute.name} exposes property-only type ${type} as an attribute`)
		}
	}
	const eventNames = new Set((declaration.events ?? []).map((event) => event.name))
	for (const member of declaration.members ?? []) {
		if (eventNames.has(member.name)) failures.push(`${declaration.tagName}.${member.name} is both an event and a field`)
	}
}

const labelDeclaration = declarations.find((declaration) => declaration.tagName === 'z-label')
const forbiddenLabelApi = new Set(['size', 'color', 'weight', 'isItalic', 'isUnderlined', 'isStrikethrough'])
for (const member of labelDeclaration?.members ?? []) {
	if (forbiddenLabelApi.has(member.name)) failures.push(`z-label still exposes ${member.name}`)
}

for (const declaration of declarations) {
	const legacyBooleanNames = new Set([
		'isDisabled', 'isInvalid', 'isInline', 'isSelected', 'isSelectable', 'isRemovable'
	])
	for (const member of declaration.members ?? []) {
		if (legacyBooleanNames.has(member.name)) failures.push(`${declaration.tagName} still exposes ${member.name}`)
		if (member.name === 'tone') failures.push(`${declaration.tagName} exposes tone instead of accent`)
	}
}

const bundle = readFileSync(join(root, 'dist', 'zest.js'), 'utf8')
if (!bundle.includes('@tasteee/wired')) failures.push('root bundle does not re-export @tasteee/wired')
for (const tag of heldBackTags) {
	if (bundle.includes(`"${tag}"`) || bundle.includes(`'${tag}'`)) {
		failures.push(`${tag} leaked into dist/zest.js`)
	}
}

const componentDir = join(root, 'src', 'components')
for (const name of readdirSync(componentDir).filter((entry) => entry.endsWith('.tsx'))) {
	const source = readFileSync(join(componentDir, name), 'utf8')
	if (source.includes('customElements.define(')) failures.push(`${name} bypasses defineElement`)
}

const declarationDir = join(root, 'dist', 'components')
if (existsSync(declarationDir)) {
	const declarationNames = new Set(readdirSync(declarationDir).filter((name) => name.endsWith('.d.ts')).map((name) => name.slice(0, -5)))
	for (const tag of heldBackTags) {
		if (declarationNames.has(tag)) failures.push(`${tag}.d.ts leaked into the public declaration output`)
	}
}

const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
if (packageJson.version !== '0.8.0') failures.push(`package version is ${packageJson.version}, expected 0.8.0`)
if (!packageJson.dependencies?.atomico) failures.push('atomico must be a dependency because public declarations reference its types')
if (!packageJson.dependencies?.['@tasteee/wired']) failures.push('@tasteee/wired must provide the public layout primitives')
if (packageJson.exports?.['./*']?.import !== './dist/elements/*.js') failures.push('package element import wildcard is missing')
if (packageJson.exports?.['./*']?.types !== './dist/elements/*.d.ts') failures.push('package element types wildcard is missing')

if (failures.length) {
	console.error(failures.map((failure) => `- ${failure}`).join('\n'))
	process.exit(1)
}

console.log(`release surface: ${tags.length} public elements and individual subpaths, held-back elements absent`)
