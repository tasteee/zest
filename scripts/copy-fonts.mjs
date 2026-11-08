// Plain stylesheets copied to dist verbatim.
//
//   fonts.css     nothing imports it from the bundle on purpose (loading fonts
//                 is the app's decision), so Vite would not emit it.
//   tokens.css    the custom properties alone, for apps that own their page
//   document.css  styles. ink.css (emitted by Vite) is the two together.
import { copyFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

for (const name of ['fonts.css', 'tokens.css', 'document.css']) {
	copyFileSync(join(root, 'src', name), join(root, 'dist', name))
	console.log(`dist/${name}: copied`)
}
