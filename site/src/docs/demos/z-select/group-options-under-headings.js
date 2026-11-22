const sound = document.querySelector('#sound')
const log = document.querySelector('#log')

sound.options = [
  { value: 'midi', label: 'MIDI output' },
  { value: 'keys', label: 'Keys', isGroup: true, children: [
    { value: 'grand-piano', label: 'Grand Piano' },
    { value: 'electric-piano', label: 'Electric Piano' },
    { value: 'organ', label: 'Organ' }
  ] },
  { value: 'bass', label: 'Bass', isGroup: true, children: [
    { value: 'sub-bass', label: 'Sub Bass' },
    { value: '808', label: '808' }
  ] }
]

sound.addEventListener('change', (event) => (log.textContent = `change → ${event.detail.value}`))
