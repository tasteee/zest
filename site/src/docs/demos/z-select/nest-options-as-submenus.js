const food = document.querySelector('#food')
const log = document.querySelector('#log')

food.options = [
  { value: 'fruit', label: 'Fruit', children: [
    { value: 'apple', label: 'Apple' },
    { value: 'citrus', label: 'Citrus', children: [
      { value: 'lemon', label: 'Lemon' },
      { value: 'orange', label: 'Orange' }
    ] }
  ] },
  { value: 'water', label: 'Water' }
]

food.addEventListener('change', (event) => (log.textContent = `change → ${event.detail.path.join(' › ')}`))
