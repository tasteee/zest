export const examples = {
	quickPreview: `import { ZSwitch } from '@tasteee/zest'

export function SwitchDemo() {
  return <ZSwitch />
}`,

	usageImport: `import { ZSwitch } from '@tasteee/zest'`,

	usage: `<ZSwitch />`,

	withLabel: `<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>`,

	defaultChecked: `<div className="flex items-center space-x-2">
  <Switch id="notifications" defaultChecked />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>`,

	disabled: `<div className="flex flex-col gap-4">
  <div className="flex items-center space-x-2">
    <Switch id="disabled-off" disabled />
    <Label htmlFor="disabled-off" className="text-muted-foreground">
      Disabled (off)
    </Label>
  </div>
  <div className="flex items-center space-x-2">
    <Switch id="disabled-on" disabled defaultChecked />
    <Label htmlFor="disabled-on" className="text-muted-foreground">
      Disabled (on)
    </Label>
  </div>
</div>`,

	settingsList: `<div className="w-full max-w-sm space-y-4">
  <div className="flex items-center justify-between rounded-lg border p-4">
    <div className="space-y-0.5">
      <Label htmlFor="marketing">Marketing emails</Label>
      <p className="text-sm text-muted-foreground">
        Receive emails about new products and features.
      </p>
    </div>
    <Switch id="marketing" />
  </div>
  <div className="flex items-center justify-between rounded-lg border p-4">
    <div className="space-y-0.5">
      <Label htmlFor="security">Security emails</Label>
      <p className="text-sm text-muted-foreground">
        Receive emails about your account activity.
      </p>
    </div>
    <Switch id="security" defaultChecked />
  </div>
  <div className="flex items-center justify-between rounded-lg border p-4">
    <div className="space-y-0.5">
      <Label htmlFor="updates">Product updates</Label>
      <p className="text-sm text-muted-foreground">
        Receive emails about product updates.
      </p>
    </div>
    <Switch id="updates" defaultChecked />
  </div>
</div>`
} as const
