import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { getPublicElementEntries, projectRoot } from './public-element-entries.mjs'

const packageJson = JSON.parse(readFileSync(join(projectRoot, 'package.json'), 'utf8'))
const entries = getPublicElementEntries()

// 1. Add // @ts-self-types pragmas to built JS entrypoints so JSR associates
//    each .js module with its companion .d.ts declaration file.
const attachSelfTypes = (jsPath, dtsRelativePath) => {
	const directive = `// @ts-self-types="${dtsRelativePath}"\n`
	const content = readFileSync(jsPath, 'utf8')
	if (!content.startsWith('// @ts-self-types=')) {
		writeFileSync(jsPath, directive + content)
	}
}

attachSelfTypes(join(projectRoot, 'dist', 'zest.js'), './index.d.ts')
attachSelfTypes(join(projectRoot, 'dist', 'languages.js'), './languages.d.ts')
for (const { tag } of entries) {
	attachSelfTypes(join(projectRoot, 'dist', 'elements', `${tag}.js`), `./${tag}.d.ts`)
}

// 2. Bundled third-party chunks (atomico, highlight.js) contain JSDoc comments
//    with relative `import("./html_renderer")` or bare `import("dom")` specifiers
//    that no longer exist after bundling and trip JSR's module graph analyzer.
const chunksDir = join(projectRoot, 'dist', 'chunks')
for (const name of readdirSync(chunksDir).filter((entry) => entry.endsWith('.js'))) {
	const chunkPath = join(chunksDir, name)
	const original = readFileSync(chunkPath, 'utf8')
	const cleaned = original.replace(/\/\*\*[\s\S]*?\*\//g, (comment) => (comment.includes('import(') ? '' : comment))
	if (cleaned !== original) writeFileSync(chunkPath, cleaned)
}

// 3. Write jsr.json from package.json metadata and the public element inventory.
const exportsMap = {
	'.': './dist/zest.js',
	'./languages': './dist/languages.js',
	...Object.fromEntries(entries.map(({ tag }) => [`./${tag}`, `./dist/elements/${tag}.js`])),
	'./react': './dist/react.d.ts'
}

const jsrConfig = {
	name: '@tasteink/zest',
	version: packageJson.version,
	license: packageJson.license,
	exports: exportsMap,
	publish: {
		include: [
			'dist/zest.js',
			'dist/languages.js',
			'dist/languages.d.ts',
			'dist/index.d.ts',
			'dist/react.d.ts',
			'dist/ink.css',
			'dist/fonts.css',
			'dist/tokens.css',
			'dist/document.css',
			'dist/chunks',
			'dist/elements',
			'custom-elements.json',
			'README.md',
			'CHANGELOG.md',
			'SUPPORT.md',
			'LICENSE',
			'package.json',
			'jsr.json'
		]
	}
}

writeFileSync(join(projectRoot, 'jsr.json'), JSON.stringify(jsrConfig, null, '\t') + '\n')
console.log(`jsr.json: ${Object.keys(exportsMap).length} exports`)
