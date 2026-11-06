const form = document.querySelector('#reset')
const password = document.querySelector('#password')
const confirm = document.querySelector('#confirm')

// show the mismatch after the second field is filled, not while typing
confirm.addEventListener('change', () => {
  const doesMatch = confirm.value === password.value
  confirm.isInvalid = !doesMatch
  confirm.error = doesMatch ? '' : 'Passwords don’t match.'
})

form.addEventListener('submit', (event) => event.preventDefault())
