export const examples = {
	quickPreview: `import { ZLabel, ZInput } from '@tasteee/zest'

export function LabelDemo() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <ZLabel htmlFor="email">Email</ZLabel>
      <ZInput type="email" id="email" placeholder="Email" />
    </div>
  )
}`,

	usageImport: `import { ZLabel } from '@tasteee/zest'`,

	usage: `<ZLabel htmlFor="email">Your email address</ZLabel>`,

	withInput: `<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="username">Username</Label>
  <Input id="username" placeholder="Enter username" />
</div>`,

	withCheckbox: `<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`,

	requiredField: `<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="name">
    Full Name <span className="text-destructive">*</span>
  </Label>
  <Input id="name" placeholder="John Doe" required />
</div>`,

	withDescription: `<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="password">Password</Label>
  <Input id="password" type="password" />
  <p className="text-xs text-muted-foreground">
    Must be at least 8 characters long
  </p>
</div>`,

	disabledState: `<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="disabled-input" className="peer-disabled:opacity-70">
    Disabled Field
  </Label>
  <Input id="disabled-input" disabled placeholder="Cannot edit" />
</div>`,

	formGroup: `<div className="space-y-4 w-full max-w-sm">
  <div className="grid items-center gap-1.5">
    <Label htmlFor="first-name">First Name</Label>
    <Input id="first-name" placeholder="John" />
  </div>
  <div className="grid items-center gap-1.5">
    <Label htmlFor="last-name">Last Name</Label>
    <Input id="last-name" placeholder="Doe" />
  </div>
  <div className="grid items-center gap-1.5">
    <Label htmlFor="email-form">Email</Label>
    <Input id="email-form" type="email" placeholder="john@example.com" />
  </div>
</div>`
} as const
