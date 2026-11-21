const slider = document.querySelector('#brightness-slider')
const valueText = document.querySelector('#brightness-value')

slider.addEventListener('input', (event) => {
  valueText.textContent = `${event.detail.value}%`
})
