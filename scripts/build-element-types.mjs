import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { getPublicElementEntries, projectRoot } from './public-element-entries.mjs'

const distDir = join(projectRoot, 'dist')
const outputDir = join(distDir, 'elements')
mkdirSync(outputDir, { recursive: true })

const inlineComponentDts = (componentModule, targetClassName) => {
	const raw = readFileSync(join(distDir, 'components', `${componentModule}.d.ts`), 'utf8')
	return raw
		.replace(/^import\s+['"]\.\/z-(?:number-input|code-block)(?:\.d\.ts|\.js)?['"];?\r?\n/gm, '')
		.replace(
			/^import\s+type\s+\{\s*ThemePreferenceT\s*,\s*ThemeT\s*\}\s+from\s+['"]\.\.\/shared\/theme(?:\.d\.ts|\.js)?['"];?\r?\n/gm,
			'type ThemeT = "dark" | "light";\ntype ThemePreferenceT = "system" | "dark" | "light";\n'
		)
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
// ./elements/<tag>.js entry (which exists on disk
// alongside its .d.ts) and shared utilities are inlined.
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
