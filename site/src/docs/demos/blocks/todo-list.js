const tasks = document.querySelector('#tasks')
const remaining = document.querySelector('#remaining')

const update = () => {
  const boxes = [...tasks.querySelectorAll('z-checkbox')]
  const openCount = boxes.filter((box) => !box.isChecked).length
  remaining.textContent = `${openCount} left`
}

tasks.addEventListener('change', update)
update()
