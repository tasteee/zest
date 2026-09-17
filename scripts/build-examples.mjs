// Installs and builds every framework example against the current dist/.
// Run `npm run build` first; each example depends on the package by path.
import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const examplesRoot = join(here, '..', 'examples')
const requested = process.argv.slice(2)
const examples = readdirSync(examplesRoot, { withFileTypes: true })
	.filter((entry) => entry.isDirectory() && existsSync(join(examplesRoot, entry.name, 'package.json')))
	.map((entry) => entry.name)
	.filter((name) => requested.length === 0 || requested.includes(name))

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const run = (cwd, args) => {
	const result = spawnSync(npm, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' })
	if (result.status !== 0) throw new Error(`npm ${args.join(' ')} failed in ${cwd}`)
}

for (const example of examples) {
	const cwd = join(examplesRoot, example)
	console.log(`\n▸ examples/${example}`)
	run(cwd, [existsSync(join(cwd, 'package-lock.json')) ? 'ci' : 'install', '--no-audit', '--no-fund'])
	run(cwd, ['run', 'build'])
}
