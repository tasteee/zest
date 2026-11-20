import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { getPublicElementEntries, projectRoot } from './public-element-entries.mjs'

const distDir = join(projectRoot, 'dist')
const outputDir = join(distDir, 'elements')
const sharedOutputDir = join(outputDir, 'shared')
mkdirSync(sharedOutputDir, { recursive: true })

// A side-effect import (`import './z-slider'`) registers an element the
// component renders. It carries no types, and JSR's check cannot resolve
// an extensionless path, so every one is dropped from the declarations.
const SIDE_EFFECT_IMPORT = /^import\s+['"]\.\/z-[\w-]+(?:\.d\.ts|\.js)?['"];?\r?\n/gm

// dist/shared is not published to JSR. A type imported from it is
// shipped next to the element declarations instead, with an explicit
// extension so Deno resolves it. A .d.ts path must be imported with
// `import type` (TypeScript rejects `import { type A }` from one), so the
// whole statement is rewritten, not only its path.
const SHARED_TYPE_IMPORT = /^import\s+(?:type\s+)?\{([^}]*)\}\s+from\s+['"]\.\.\/shared\/([\w-]+)(?:\.d\.ts|\.js)?['"];?/gm

const readImportedNames = (namesText) => {
	const names = namesText.split(',').map((name) => name.replace(/^\s*type\s+/, '').trim())
	return names.filter(Boolean).join(', ')
}

const copySharedDeclaration = (namesText, sharedName) => {
	const source = join(distDir, 'shared', `${sharedName}.d.ts`)
	const target = join(sharedOutputDir, `${sharedName}.d.ts`)
	copyFileSync(source, target)
	const importedNames = readImportedNames(namesText)
	return `import type { ${importedNames} } from './shared/${sharedName}.d.ts';`
}

const inlineComponentDts = (componentModule, targetClassName) => {
	const raw = readFileSync(join(distDir, 'components', `${componentModule}.d.ts`), 'utf8')
	return raw
		.replace(SIDE_EFFECT_IMPORT, '')
		.replace(
			/^import\s+type\s+\{\s*ThemePreferenceT\s*,\s*ThemeT\s*\}\s+from\s+['"]\.\.\/shared\/theme(?:\.d\.ts|\.js)?['"];?\r?\n/gm,
			'type ThemeT = "dark" | "light";\ntype ThemePreferenceT = "system" | "dark" | "light";\n'
		)
		.replace(SHARED_TYPE_IMPORT, (_match, namesText, sharedName) => copySharedDeclaration(namesText, sharedName))
		.replace(
			/^export declare const (Z\w+): import\("atomico\/types\/dom"\)\.Atomico<\{[\s\S]*?^\}>;\r?\n?/gm,
			(match, name) => (name === targetClassName ? match : '')
		)
		.replace(/\bCSSStyleSheet\b/g, 'import("atomico").Sheet')
}

const entries = getPublicElementEntries()
for (const { tag, className, sourceFile } of entries) {
	const componentModule = basename(sourceFile, '.tsx')
	writeFileSync(join(outputDir, `${tag}.d.ts`), inlineComponentDts(componentModule, className))
}

// Build dist/index.d.ts so every element is re-exported through its
// ./elements/<tag>.js entry (which exists on disk alongside its .d.ts,
// satisfying both TypeScript and Deno/JSR) and shared utilities are inlined.
const themeDts = readFileSync(join(distDir, 'shared', 'theme.d.ts'), 'utf8').trim()
const clipboardDts = readFileSync(join(distDir, 'shared', 'clipboard.d.ts'), 'utf8').trim()
const localeDts = readFileSync(join(distDir, 'shared', 'locale.d.ts'), 'utf8')
	.replace(/^export type LocaleParamsT[\s\S]*$/m, '')
	.trim()

const indexLines = [
	...entries.map(({ tag }) => `export * from './elements/${tag}.js';`),
	themeDts,
	clipboardDts,
	localeDts,
	'export declare const setLocale: (strings: Partial<LocaleStringsT>) => void;',
	'export declare const getLocale: () => LocaleStringsT;'
]

writeFileSync(join(distDir, 'index.d.ts'), indexLines.join('\n') + '\n')

console.log(`element declarations: ${entries.length} subpaths`)
