// A backtick inside a css`` template terminates the template, and the failure
// surfaces as an unrelated syntax error dozens of lines away. Writing prose
// comments in a stylesheet makes it easy to reach for one out of habit, so
// this catches it directly.
//
// Run: node scripts/check-css-templates.mjs

import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const sourceDirectory = join(scriptDirectory, '..', 'src')

const sourceFiles = []
const walk = (directory) => {
	for (const entry of readdirSync(directory, { withFileTypes: true })) {
		const path = join(directory, entry.name)
		if (entry.isDirectory()) walk(path)
		else if (/\.tsx?$/.test(entry.name)) sourceFiles.push(path)
	}
}
walk(sourceDirectory)

const problems = []

for (const file of sourceFiles) {
	const lines = readFileSync(file, 'utf8').split('\n')
	let isInsideTemplate = false

	for (const [index, line] of lines.entries()) {
		if (!isInsideTemplate) {
			if (/(?:css|keyframes)`/.test(line)) isInsideTemplate = true
			continue
		}

		// The closing line of a css template is a lone backtick.
		if (line.trim() === '`') {
			isInsideTemplate = false
			continue
		}

		if (line.includes('`')) {
			problems.push({ file, line: index + 1, text: line.trim() })
		}
	}
}

if (problems.length === 0) {
	console.log(`css templates: clean (${sourceFiles.length} files)`)
	process.exit(0)
}

console.error('Backtick inside a css`` template — this silently ends the template:')
for (const problem of problems) {
	console.error(`  ${problem.file}:${problem.line}  ${problem.text}`)
}
process.exit(1)
