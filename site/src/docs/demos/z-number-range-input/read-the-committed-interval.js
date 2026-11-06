const guests = document.querySelector('#guests')
const result = document.querySelector('#guests-result')

guests.addEventListener('change', (event) => {
  const lower = event.detail.value[0] ?? 'any'
  const upper = event.detail.value[1] ?? 'any'
  result.textContent = `${lower} to ${upper} guests`
})
