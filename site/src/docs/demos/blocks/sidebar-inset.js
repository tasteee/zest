const nav = document.querySelector('#nav')
const title = document.querySelector('#title')

nav.items = [
  { value: 'inbox', label: 'Inbox' },
  { value: 'sent', label: 'Sent' },
  { value: 'drafts', label: 'Drafts' },
  { value: 'trash', label: 'Trash' }
]

nav.addEventListener('select', (event) => {
  nav.value = event.detail.value
  title.textContent = nav.items.find((item) => item.value === event.detail.value).label
})
