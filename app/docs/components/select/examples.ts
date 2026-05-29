export const examples = {
	quickPreview: `import {
  ZSelect,
  ZSelectContent,
  ZSelectItem,
  ZSelectTrigger,
  ZSelectValue,
} from '@tasteee/zest'

export function SelectDemo() {
  return (
    <ZSelect>
      <ZSelectTrigger className="w-45">
        <ZSelectValue placeholder="Select a fruit" />
      </ZSelectTrigger>
      <ZSelectContent>
        <ZSelectItem value="apple">Apple</ZSelectItem>
        <ZSelectItem value="banana">Banana</ZSelectItem>
        <ZSelectItem value="pink">Pink</ZSelectItem>
        <ZSelectItem value="grape">Grape</ZSelectItem>
      </ZSelectContent>
    </ZSelect>
  )
}`,
	usageImport: `import {
  ZSelect,
  ZSelectContent,
  ZSelectItem,
  ZSelectTrigger,
  ZSelectValue,
} from '@tasteee/zest'`,
	usage: `<ZSelect>
  <ZSelectTrigger className="w-45">
    <ZSelectValue placeholder="Theme" />
  </ZSelectTrigger>
  <ZSelectContent>
    <ZSelectItem value="light">Light</ZSelectItem>
    <ZSelectItem value="dark">Dark</ZSelectItem>
    <ZSelectItem value="system">System</ZSelectItem>
  </ZSelectContent>
</ZSelect>`,
	withLabel: `<div className="grid gap-2">
  <Label htmlFor="timezone">Timezone</Label>
  <z.select>
    <z.select.trigger id="timezone" className="w-70">
      <z.select.value placeholder="Select your timezone" />
    </z.select.trigger>
    <z.select.content>
      <z.select.item value="pst">Pacific Time (PST)</z.select.item>
      <z.select.item value="mst">Mountain Time (MST)</z.select.item>
      <z.select.item value="cst">Central Time (CST)</z.select.item>
      <z.select.item value="est">Eastern Time (EST)</z.select.item>
    </z.select.content>
  </z.select>
</div>`,
	withGroups: `<z.select>
  <z.select.trigger className="w-70">
    <z.select.value placeholder="Select a framework" />
  </z.select.trigger>
  <z.select.content>
    <z.select.group>
      <z.select.label>Frontend</z.select.label>
      <z.select.item value="react">React</z.select.item>
      <z.select.item value="vue">Vue</z.select.item>
      <z.select.item value="angular">Angular</z.select.item>
      <z.select.item value="svelte">Svelte</z.select.item>
    </z.select.group>
    <z.select.group>
      <z.select.label>Backend</z.select.label>
      <z.select.item value="express">Express</z.select.item>
      <z.select.item value="fastify">Fastify</z.select.item>
      <z.select.item value="hono">Hono</z.select.item>
    </z.select.group>
  </z.select.content>
</z.select>`,
	disabled: `<div className="flex flex-col gap-4">
  <z.select disabled>
    <z.select.trigger className="w-45">
      <z.select.value placeholder="Disabled select" />
    </z.select.trigger>
    <z.select.content>
      <z.select.item value="option">Option</z.select.item>
    </z.select.content>
  </z.select>
  
  <z.select>
    <z.select.trigger className="w-45">
      <z.select.value placeholder="Select an option" />
    </z.select.trigger>
    <z.select.content>
      <z.select.item value="available">Available</z.select.item>
      <z.select.item value="disabled" disabled>Disabled Option</z.select.item>
      <z.select.item value="another">Another</z.select.item>
    </z.select.content>
  </z.select>
</div>`,
	defaultValue: `<z.select defaultValue="medium">
  <z.select.trigger className="w-45">
    <z.select.value />
  </z.select.trigger>
  <z.select.content>
    <z.select.item value="small">Small</z.select.item>
    <z.select.item value="medium">Medium</z.select.item>
    <z.select.item value="large">Large</z.select.item>
  </z.select.content>
</z.select>`,
} as const
