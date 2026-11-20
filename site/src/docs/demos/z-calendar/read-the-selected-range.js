const stay = document.querySelector('#stay')
const result = document.querySelector('#stay-result')

stay.addEventListener('input', (event) => {
  const hasEnd = event.detail.end !== null
  if (!hasEnd) result.textContent = `From ${event.detail.start}, pick an end`
})

stay.addEventListener('change', (event) => {
  result.textContent = `${event.detail.start} to ${event.detail.end}`
})
