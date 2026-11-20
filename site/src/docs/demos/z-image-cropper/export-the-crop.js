const cropper = document.querySelector('#cropper')
const preview = document.querySelector('#preview')
const crop = document.querySelector('#crop')

// change fires when a drag, zoom or key press ends
cropper.addEventListener('change', (event) => {
  preview.src = cropper.toDataURL('image/webp', 0.85)
  crop.textContent = `${event.detail.width} × ${event.detail.height}`
})
