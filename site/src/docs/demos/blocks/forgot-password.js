import { toaster } from '@tasteee/zest'

const form = document.querySelector('#forgot')
const send = document.querySelector('#send')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  send.isLoading = true

  // stand-in for a real request
  setTimeout(() => {
    send.isLoading = false
    toaster.show({ id: 'forgot', title: 'Check your email', description: 'The link expires in one hour.', tone: 'success' })
  }, 800)
})
