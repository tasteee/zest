export const examples = {
	quickPreview: `import { Combobox } from '@tasteee/zest'

const FRUITS = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Mango', 'Orange', 'Strawberry']

export function ComboboxDemo() {
  return <Combobox options={FRUITS} placeholder="Search fruits..." />
}`,

	usageImport: `import { Combobox } from '@tasteee/zest'`,

	usage: `const OPTIONS = ['Apple', 'Banana', 'Blueberry']

<Combobox options={OPTIONS} placeholder="Search..." />`,

	controlled: `import { useState } from 'react'
import { Combobox } from '@tasteee/zest'

const LANGUAGES = ['TypeScript', 'JavaScript', 'Rust', 'Go', 'Python', 'Swift']

export function ControlledCombobox() {
  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <div className="flex flex-col gap-2">
      <Combobox
        value={value}
        onChange={handleChange}
        options={LANGUAGES}
        placeholder="Pick a language"
      />
      {value && (
        <p className="text-sm text-muted-foreground">Selected: {value}</p>
      )}
    </div>
  )
}`,

	withLabel: `<div className="flex flex-col gap-2">
  <label htmlFor="country" className="text-sm font-medium">Country</label>
  <Combobox
    id="country"
    options={['United States', 'Canada', 'United Kingdom', 'Australia']}
    placeholder="Search countries..."
  />
</div>`,

	disabled: `<Combobox
  options={['Option 1', 'Option 2']}
  placeholder="Disabled"
  disabled
/>`
} as const
