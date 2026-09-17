// Renders the app on the server and writes the result into the client build,
// so `dist/index.html` is a server-rendered page that hydrates.
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const { render } = await import('./dist/server/entry-server.js')
const template = readFileSync(resolve('dist/index.html'), 'utf8')
const html = template.replace('<!--app-html-->', render())
if (!html.includes('<z-input')) throw new Error('SSR output does not contain the zest markup')
writeFileSync(resolve('dist/index.html'), html)
console.log('prerendered dist/index.html')
