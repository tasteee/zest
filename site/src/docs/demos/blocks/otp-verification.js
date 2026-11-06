const code = document.querySelector('#code')
const verify = document.querySelector('#verify')

// the button unlocks only once every digit is in
code.addEventListener('change', (event) => {
  const digits = String(event.detail.value ?? '')
  verify.isDisabled = digits.length < 6
})
