export const examples = {
	quickPreview: `import { z } from '@tasteee/zest'

export function CheckboxDemo() {
  return (
    <z.checkbox
      id="terms"
      label="Accept terms and conditions"
    />
  )
}`,

	usageImport: `import { ZCheckbox } from '@tasteee/zest'`,

	usage: `<z.checkbox
  isChecked={isSubscribed}
  label="Subscribe to newsletter"
  onChange={(isNowChecked, event) => {
    setIsSubscribed(isNowChecked)
  }}
/>`,

	defaultChecked: `<Checkbox
  id="subscribed"
  isChecked
  label="Subscribe to newsletter"
/>`,

	disabled: `<div className="flex flex-col gap-4">
  <Checkbox id="disabled" isDisabled label="Disabled" />
  <Checkbox
    id="disabled-checked"
    isDisabled
    isChecked
    label="Disabled checked"
  />
</div>`,

	withDescription: `<Checkbox
  id="terms-desc"
  label="Accept terms and conditions"
  description="You agree to our Terms of Service and Privacy Policy."
/>`,

	checkboxGroup: `<div className="space-y-4">
  <h4 className="text-sm font-medium">Select your interests</h4>
  <div className="space-y-2">
    <Checkbox id="interest-1" label="Technology" />
    <Checkbox id="interest-2" isChecked label="Design" />
    <Checkbox id="interest-3" label="Business" />
    <Checkbox id="interest-4" isChecked label="Marketing" />
  </div>
</div>`,

	indeterminate: `// Controlled example
const [checked, setChecked] = useState(false)

<Checkbox 
  isChecked={checked} 
  label="Controlled checked state"
  onChange={(isNowChecked) => setChecked(isNowChecked)}
/>`
} as const
