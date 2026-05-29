export const examples = {
	quickPreview: `import { Slider } from '@tasteee/zest'

export function SliderDemo() {
  return <Slider defaultValue={50} label="Volume" min={0} max={100} className="w-64" />
}`,

	usageImport: `import { Slider } from '@tasteee/zest'`,

	usage: `<Slider defaultValue={50} label="Intensity" min={0} max={100} />`,

	colors: `<div className="flex flex-col gap-6 w-64">
  <Slider defaultValue={50} isNeutral label="Neutral" />
  <Slider defaultValue={50} isPurple label="Purple" />
  <Slider defaultValue={50} isPink label="Pink" />
</div>`,

	withValue: `<Slider
  defaultValue={75}
  label="Opacity"
  formatValue={(value) => \`\${value}%\`}
  min={0}
  max={100}
  className="w-64"
/>`,

	range: `import { Slider } from '@tasteee/zest'

<Slider.Range
  defaultValues={[20, 80]}
  label="Price range"
  min={0}
  max={100}
  className="w-64"
/>`,

	rangeWithValue: `<Slider.Range
  defaultValues={[30, 70]}
  isPurple
  label="Budget"
  formatValue={([min, max]) => \`$\${min} – $\${max}\`}
  min={0}
  max={500}
  className="w-64"
/>`,

	controlled: `import { useState } from 'react'
import { Slider } from '@tasteee/zest'

export function ControlledSlider() {
  const [volume, setVolume] = useState(50)

  return (
    <Slider
      value={volume}
      onValueChange={setVolume}
      label="Volume"
      formatValue={(v) => \`\${v}%\`}
      min={0}
      max={100}
      className="w-64"
    />
  )
}`,

	disabled: `<Slider defaultValue={40} label="Disabled" isDisabled className="w-64" />`
} as const
