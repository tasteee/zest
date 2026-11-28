const playButton = document.querySelector('#transport-play')
const playSymbol = document.querySelector('#transport-symbol')
let isPlaying = false

playButton.addEventListener('click', () => {
  isPlaying = !isPlaying
  playButton.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play')
  playSymbol.setAttribute('d', isPlaying ? 'M4 3h3v10H4zM9 3h3v10H9z' : 'M5 3v10l8-5z')
})

const gridMenu = document.querySelector('#grid-settings')
const gridLabel = document.querySelector('#grid-label')

gridMenu.addEventListener('select', ({ detail }) => {
  for (const item of gridMenu.querySelectorAll('z-menu-item')) {
    item.toggleAttribute('is-checked', item.getAttribute('value') === detail.value)
  }
  gridLabel.textContent = 'Grid ' + detail.value
})
