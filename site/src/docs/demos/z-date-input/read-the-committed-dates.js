const trip = document.querySelector('#trip')
const result = document.querySelector('#trip-result')

trip.addEventListener('change', (event) => {
  const start = event.detail.start ?? 'any day'
  const end = event.detail.end ?? 'any day'
  result.textContent = `Leaving ${start}, returning ${end}`
})
