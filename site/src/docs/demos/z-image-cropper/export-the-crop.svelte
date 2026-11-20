<script lang="ts">
  import '@tasteee/zest'
  import type { CropDetailT, ImageCropperMethodsT } from '@tasteee/zest'

  type CropperElementT = HTMLElement & ImageCropperMethodsT

  let previewSource = $state<string>()
  let cropText = $state('Drag or zoom to crop')

  // change fires when a drag, zoom or key press ends
  const handleChange = (event: CustomEvent<CropDetailT>) => {
    const cropper = event.currentTarget as CropperElementT
    previewSource = cropper.toDataURL('image/webp', 0.85) ?? undefined
    cropText = `${event.detail.width} × ${event.detail.height}`
  }
</script>

<z-row gap="5" does-wrap aligns-y="start">
  <z-image-cropper src="/media/dunes.jpg" alt="Cover image" aspect="16/9" style="width: min(100%, 24rem)" onchange={handleChange}></z-image-cropper>
  <z-column gap="2" style="width: 10rem">
    <z-text size="xs" color="muted">Preview</z-text>
    <z-image alt="Cropped cover" ratio="16/9" src={previewSource}></z-image>
    <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{cropText}</z-text>
  </z-column>
</z-row>
