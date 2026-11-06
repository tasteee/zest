import { toaster } from '@tasteee/zest'

document.querySelector('#topic').options = [
  { value: 'sales', label: 'Sales' },
  { value: 'support', label: 'Support' },
  { value: 'other', label: 'Something else' }
]

const form = document.querySelector('#contact')
const send = document.querySelector('#send')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  send.isLoading = true

  // stand-in for a real request
  setTimeout(() => {
    send.isLoading = false
    toaster.show({ id: 'contact', title: 'Message sent', description: 'We’ll be in touch soon.', tone: 'success' })
  }, 800)
})
