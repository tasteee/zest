// Checks the docs' per-framework demo files (site/src/docs/demos):
//
//   node scripts/check-framework-demos.mjs
//
// 1. Coverage: a demo with a script (<name>.js) can't be converted from its
//    HTML, so it needs a hand-written version for every framework:
//    <name>.react.tsx, <name>.vue, <name>.svelte, <name>.solid.tsx.
// 2. Patterns: mistakes that compile fine but break against a custom element.
//      React   onChange / onSelect / onInput on a z element go through React's
//              own synthetic events; zest events need lowercase onchange.
//      Vue     a kebab-case dynamic binding (:is-open) is written as an
//              attribute, so arrays and objects arrive as text.
//      Solid   attr: and on: were removed in Solid 2.
// 3. Compiles: each file through its framework's real compiler (Vue SFC,
//    Svelte 5 runes, Solid's JSX), plus a Solid 1 check that camelCase
//    props go through prop: (Solid 1 lowercases them otherwise). This step
//    needs the compilers installed and is skipped, with a note, without them:
//      pnpm add -D @vue/compiler-sfc svelte @babel/core babel-preset-solid
//
// React files aren't compiled here: `pnpm typecheck:site` already checks
// them against the generated JSX types.

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const demosDir = join(here, '..', 'site', 'src', 'docs', 'demos')

const FRAMEWORK_SUFFIXES = ['.react.tsx', '.vue', '.svelte', '.solid.tsx']

// Lowercase properties Solid 1 may set directly: real lowercase names on
// z elements and native elements, written with or without prop:.
const LOWERCASE_PROPERTIES = new Set([
	'textcontent',
	'innerhtml',
	'hidden',
	'value',
	'items',
	'options',
	'code',
	'content',
	'rows',
	'columns',
	'files',
	'lines',
	'handles',
	'presets',
	'data',
	'datetime'
])

const failures = []

const fail = (filePath, message) => {
	const relativePath = relative(demosDir, filePath)
	failures.push(`${relativePath}: ${message}`)
}

const listFiles = (directory) => {
	const entries = readdirSync(directory)
	const files = []

	for (const entry of entries) {
		const entryPath = join(directory, entry)
		const isDirectory = statSync(entryPath).isDirectory()
		if (isDirectory) files.push(...listFiles(entryPath))
		if (!isDirectory) files.push(entryPath)
	}

	return files
}

const getFrameworkFiles = (files) => {
	return files.filter((filePath) => FRAMEWORK_SUFFIXES.some((suffix) => filePath.endsWith(suffix)))
}

// ── 1. coverage ───────────────────────────────────────────────

const checkCoverage = (files) => {
	const scriptDemos = files.filter((filePath) => filePath.endsWith('.js'))

	for (const scriptPath of scriptDemos) {
		const demoBase = scriptPath.slice(0, -'.js'.length)
		const missingSuffixes = FRAMEWORK_SUFFIXES.filter((suffix) => !existsSync(demoBase + suffix))
		const isComplete = missingSuffixes.length === 0
		if (isComplete) continue
		fail(scriptPath, `has a script but no ${missingSuffixes.join(', ')}`)
	}

	return scriptDemos.length
}

// ── 2. patterns ───────────────────────────────────────────────

const REACT_SYNTHETIC_HANDLER = /<z-[a-z-]+\b[^>]*\son(Change|Select|Input|Toggle)=/s
const VUE_KEBAB_BINDING = /\s:[a-z]+-[a-z-]+="/
const SOLID_REMOVED_PREFIX = /\s(attr|on):[a-zA-Z]/

const stripComments = (source) => source.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '')

const checkPatterns = (filePath, source) => {
	const code = stripComments(source)

	const isReact = filePath.endsWith('.react.tsx')
	const hasSyntheticHandler = isReact && REACT_SYNTHETIC_HANDLER.test(code)
	if (hasSyntheticHandler) fail(filePath, 'uses a camelCase React handler on a z element; use lowercase (onchange)')

	const isVue = filePath.endsWith('.vue')
	const hasKebabBinding = isVue && VUE_KEBAB_BINDING.test(code)
	if (hasKebabBinding) fail(filePath, 'binds a kebab-case name; bind the camelCase property (:isOpen)')

	const isSolid = filePath.endsWith('.solid.tsx')
	const hasRemovedPrefix = isSolid && SOLID_REMOVED_PREFIX.test(code)
	if (hasRemovedPrefix) fail(filePath, 'uses attr: or on:, which Solid 2 removed')
}

// ── 3. compiles ───────────────────────────────────────────────

const importOptional = async (specifier) => {
	try {
		return await import(specifier)
	} catch {
		return null
	}
}

const loadCompilers = async () => {
	const vue = await importOptional('@vue/compiler-sfc')
	const svelte = await importOptional('svelte/compiler')
	const babelModule = await importOptional('@babel/core')
	const solidPreset = await importOptional('babel-preset-solid')
	const typescriptModule = await importOptional('typescript')
	const babel = babelModule?.default ?? babelModule
	const typescript = typescriptModule?.default ?? typescriptModule
	return { vue, svelte, babel, solidPreset, typescript }
}

const compileVue = (compilers, filePath, source) => {
	const parsed = compilers.vue.parse(source, { filename: filePath })
	const hasParseError = parsed.errors.length > 0
	if (hasParseError) return fail(filePath, `Vue: ${parsed.errors[0].message}`)

	const script = compilers.vue.compileScript(parsed.descriptor, { id: 'demo' })
	const isCustomElement = (tag) => tag.startsWith('z-')

	const template = compilers.vue.compileTemplate({
		source: parsed.descriptor.template.content,
		filename: filePath,
		id: 'demo',
		compilerOptions: { isCustomElement, bindingMetadata: script.bindings, isTS: true }
	})

	const hasTemplateError = template.errors.length > 0
	if (hasTemplateError) fail(filePath, `Vue: ${template.errors[0].message ?? template.errors[0]}`)
}

const compileSvelte = (compilers, filePath, source) => {
	const output = compilers.svelte.compile(source, { filename: filePath, runes: true })
	const warnings = output.warnings.filter((warning) => !warning.code.startsWith('a11y'))

	for (const warning of warnings) fail(filePath, `Svelte: ${warning.code}`)
}

const findLowercasedProperties = (compiledCode, sourceCode) => {
	const assignments = [...compiledCode.matchAll(/_el\$\d*\.([a-z]+) = /g)]
	const names = assignments.map((match) => match[1])
	const isUnexpected = (name) => !LOWERCASE_PROPERTIES.has(name) && !sourceCode.includes(`prop:${name}=`)
	return names.filter(isUnexpected)
}

// strip the types, keep the JSX for Solid's own compiler
const stripTypes = (compilers, source) => {
	const typescript = compilers.typescript
	const compilerOptions = { jsx: typescript.JsxEmit.Preserve, target: typescript.ScriptTarget.ESNext }
	const output = typescript.transpileModule(source, { compilerOptions, fileName: 'demo.tsx' })
	return output.outputText
}

const compileSolid = (compilers, filePath, source) => {
	const strippedCode = stripTypes(compilers, source)
	const presetPath = compilers.solidPreset.default ?? compilers.solidPreset
	const output = compilers.babel.transformSync(strippedCode, { filename: 'demo.jsx', presets: [presetPath] })
	const lowercased = findLowercasedProperties(output.code, strippedCode)
	const hasLowercased = lowercased.length > 0
	if (hasLowercased) fail(filePath, `Solid 1 lowercases ${lowercased.join(', ')}; pass it with prop:`)
}

const compileFile = async (compilers, filePath, source) => {
	try {
		const isVue = filePath.endsWith('.vue')
		if (isVue) return compileVue(compilers, filePath, source)
		const isSvelte = filePath.endsWith('.svelte')
		if (isSvelte) return compileSvelte(compilers, filePath, source)
		const isSolid = filePath.endsWith('.solid.tsx')
		if (isSolid) return compileSolid(compilers, filePath, source)
	} catch (error) {
		const message = String(error.message ?? error).split('\n')[0]
		fail(filePath, `does not compile: ${message}`)
	}
}

const getMissingCompilers = (compilers) => {
	const missing = []
	if (!compilers.vue) missing.push('@vue/compiler-sfc')
	if (!compilers.svelte) missing.push('svelte')
	if (!compilers.babel) missing.push('@babel/core')
	if (!compilers.solidPreset) missing.push('babel-preset-solid')
	if (!compilers.typescript) missing.push('typescript')
	return missing
}

// ── run ───────────────────────────────────────────────────────

const allFiles = listFiles(demosDir)
const frameworkFiles = getFrameworkFiles(allFiles)
const scriptDemoCount = checkCoverage(allFiles)

for (const filePath of frameworkFiles) {
	const source = readFileSync(filePath, 'utf8')
	checkPatterns(filePath, source)
}

const compilers = await loadCompilers()
const missingCompilers = getMissingCompilers(compilers)
const canCompile = missingCompilers.length === 0

if (canCompile) {
	const compiledFiles = frameworkFiles.filter((filePath) => !filePath.endsWith('.react.tsx'))

	for (const filePath of compiledFiles) {
		const source = readFileSync(filePath, 'utf8')
		await compileFile(compilers, filePath, source)
	}
}

console.log(`${scriptDemoCount} script demos, ${frameworkFiles.length} framework files checked.`)

if (!canCompile) {
	console.log(`Compile step skipped. Install ${missingCompilers.join(', ')} to run it.`)
}

const hasFailures = failures.length > 0

if (hasFailures) {
	for (const failure of failures) console.error(`✗ ${failure}`)
	process.exit(1)
}

console.log('All framework demos pass.')
