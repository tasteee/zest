import { useState } from 'react'
import type { CropDetailT, ImageCropperMethodsT } from '@tasteee/zest'
import '@tasteee/zest'

type CropperElementT = HTMLElement & ImageCropperMethodsT

export const Example = () => {
  const [previewSource, setPreviewSource] = useState<string>()
  const [cropText, setCropText] = useState('Drag or zoom to crop')

  // change fires when a drag, zoom or key press ends
  const handleChange = (event: CustomEvent<CropDetailT>) => {
    const cropper = event.currentTarget as CropperElementT
    setPreviewSource(cropper.toDataURL('image/webp', 0.85) ?? undefined)
    setCropText(`${event.detail.width} × ${event.detail.height}`)
  }

  return (
    <z-row gap="5" doesWrap alignsY="start">
      <z-image-cropper src="/media/dunes.jpg" alt="Cover image" aspect="16/9" style={{ width: 'min(100%, 24rem)' }} onchange={handleChange} />
      <z-column gap="2" style={{ width: '10rem' }}>
        <z-text size="xs" color="muted">Preview</z-text>
        <z-image alt="Cropped cover" ratio="16/9" src={previewSource} />
        <z-text size="xs" color="muted" style={{ fontFamily: 'var(--font-mono)' }}>{cropText}</z-text>
      </z-column>
    </z-row>
  )
}
