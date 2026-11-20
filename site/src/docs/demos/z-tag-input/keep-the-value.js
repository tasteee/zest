const recipients = document.querySelector('#recipients')
const log = document.querySelector('#log')

recipients.addEventListener('change', (event) => {
  log.textContent = `value → ${JSON.stringify(event.detail.value)}`
})
