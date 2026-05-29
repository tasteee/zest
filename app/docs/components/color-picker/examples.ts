export const examples = {
	quickPreview: `import { ColorPicker } from '@tasteee/zest'

export function ColorPickerDemo() {
  return <ColorPicker defaultValue="#7c3aed" />
}`,

	usageImport: `import { ColorPicker } from '@tasteee/zest'`,

	usage: `<ColorPicker defaultValue="#7c3aed" />`,

	defaultColor: `<ColorPicker defaultValue="#7c3aed" />`,

	controlled: `import { useState } from 'react'
import { ColorPicker } from '@tasteee/zest'

export function ControlledColorPicker() {
  const [color, setColor] = useState('#7c3aed')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value)
  }

  return (
    <div className="flex items-center gap-4">
      <ColorPicker value={color} onChange={handleChange} />
      <span className="text-sm font-mono text-muted-foreground">{color}</span>
    </div>
  )
}`,

	withLabel: `<div className="flex flex-col gap-2">
  <label htmlFor="brand-color" className="text-sm font-medium">
    Brand Color
  </label>
  <ColorPicker id="brand-color" defaultValue="#ec4899" />
</div>`,

	multipleColors: `<div className="flex items-center gap-4">
  <div className="flex flex-col gap-2 items-center">
    <ColorPicker defaultValue="#7c3aed" />
    <span className="text-xs text-muted-foreground">Primary</span>
  </div>
  <div className="flex flex-col gap-2 items-center">
    <ColorPicker defaultValue="#ec4899" />
    <span className="text-xs text-muted-foreground">Secondary</span>
  </div>
  <div className="flex flex-col gap-2 items-center">
    <ColorPicker defaultValue="#0ea5e9" />
    <span className="text-xs text-muted-foreground">Accent</span>
  </div>
</div>`
} as const
