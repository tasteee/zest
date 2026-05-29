export const examples = {
	quickPreview: `import { RadioGroup, RadioGroupItem } from '@tasteee/zest'
import { Label } from '@tasteee/zest'

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" id="option-1" />
        <Label htmlFor="option-1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" id="option-2" />
        <Label htmlFor="option-2">Option 2</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-3" id="option-3" />
        <Label htmlFor="option-3">Option 3</Label>
      </div>
    </RadioGroup>
  )
}`,

	usageImport: `import { RadioGroup, RadioGroupItem } from '@tasteee/zest'
import { Label } from '@tasteee/zest'`,

	usage: `<RadioGroup defaultValue="comfortable">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="compact" id="r3" />
    <Label htmlFor="r3">Compact</Label>
  </div>
</RadioGroup>`,

	horizontal: `<RadioGroup defaultValue="card" className="flex gap-6">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="card" id="pay-card" />
    <Label htmlFor="pay-card">Card</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="paypal" id="pay-paypal" />
    <Label htmlFor="pay-paypal">PayPal</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="apple" id="pay-apple" />
    <Label htmlFor="pay-apple">Apple Pay</Label>
  </div>
</RadioGroup>`,

	controlled: `import { useState } from 'react'

const [plan, setPlan] = useState('pro')

<RadioGroup value={plan} onValueChange={setPlan}>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="free" id="plan-free" />
    <Label htmlFor="plan-free">Free</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="pro" id="plan-pro" />
    <Label htmlFor="plan-pro">Pro</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="enterprise" id="plan-enterprise" />
    <Label htmlFor="plan-enterprise">Enterprise</Label>
  </div>
</RadioGroup>`,

	disabled: `<RadioGroup defaultValue="option-1">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-1" id="d1" />
    <Label htmlFor="d1">Available</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-2" id="d2" disabled />
    <Label htmlFor="d2" className="opacity-50">Unavailable</Label>
  </div>
</RadioGroup>`
} as const
