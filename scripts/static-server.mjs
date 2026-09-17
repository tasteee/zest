// A dependency-free static file server for the screenshot and example
// harnesses: `node scripts/static-server.mjs <directory> [port]`. Exports
// `serve` for scripts that want a random port.
import { createServer } from 'node:http'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { extname, join, normalize, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const mimeTypes = {
	'.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css',
	'.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff'
}

export const serve = (directory, port = 0) => new Promise((resolvePromise) => {
	const base = resolve(directory)
	const server = createServer((request, response) => {
		const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname)
		let file = normalize(join(base, pathname))
		if (!file.startsWith(base)) { response.statusCode = 403; response.end(); return }
		if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html')
		if (!existsSync(file)) { response.statusCode = 404; response.end('not found'); return }
		response.setHeader('content-type', mimeTypes[extname(file)] ?? 'application/octet-stream')
		response.end(readFileSync(file))
	})
	server.listen(port, '127.0.0.1', () => resolvePromise({ server, url: `http://127.0.0.1:${server.address().port}/` }))
})

const isMain = process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url
if (isMain) {
	const [directory = '.', port = '0'] = process.argv.slice(2)
	const { url } = await serve(directory, Number(port))
	console.log(`serving ${resolve(directory)} at ${url}`)
}
