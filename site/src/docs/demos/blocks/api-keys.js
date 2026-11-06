for (const button of document.querySelectorAll('.copy')) {
  button.addEventListener('click', async () => {
    await navigator.clipboard.writeText(button.dataset.key)
    button.textContent = 'Copied'
    setTimeout(() => (button.textContent = 'Copy'), 1500)
  })
}
