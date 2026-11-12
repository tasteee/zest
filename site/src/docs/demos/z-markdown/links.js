const markdown = document.querySelector('#markdown')
const last = document.querySelector('#last')
markdown.content = 'Read the [docs](https://example.com/docs) or jump to [usage](#usage).'
markdown.addEventListener('linkclick', (event) => {
	last.textContent = 'linkclick: ' + event.detail.href
})
