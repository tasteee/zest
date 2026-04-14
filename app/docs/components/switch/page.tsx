"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable, type PropDefinition } from "@/components/docs/props-table"
import { CodeBlock } from "@/components/docs/code-block"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

const switchProps: PropDefinition[] = [
  {
    name: "checked",
    type: "boolean",
    description: "The controlled state of the switch."
  },
  {
    name: "defaultChecked",
    type: "boolean",
    defaultValue: "false",
    description: "The state of the switch when initially rendered."
  },
  {
    name: "onCheckedChange",
    type: "(checked: boolean) => void",
    description: "Event handler called when the state changes."
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "When true, prevents the user from interacting with the switch."
  },
  {
    name: "required",
    type: "boolean",
    defaultValue: "false",
    description: "When true, the switch is required for form submission."
  },
  {
    name: "name",
    type: "string",
    description: "The name of the switch for form submission."
  },
  {
    name: "value",
    type: "string",
    defaultValue: '"on"',
    description: "The value submitted with the form when checked."
  },
]

export default function SwitchDocsPage() {
  return (
    <div className="space-y-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/docs" className="hover:text-foreground transition-colors">
          Docs
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/docs/components" className="hover:text-foreground transition-colors">
          Components
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Switch</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            ZSwitch
          </h1>
          <Badge variant="secondary">Component</Badge>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          A control that allows the user to toggle between checked and unchecked states. 
          Built on Radix UI Switch primitive.
        </p>
      </div>

      {/* Quick Preview */}
      <ComponentPreview
        title="Default Switch"
        description="A basic toggle switch."
        code={`import { ZSwitch } from '@tasteee/zest'

export function SwitchDemo() {
  return <ZSwitch />
}`}
      >
        <Switch />
      </ComponentPreview>

      {/* Usage */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          code={`import { ZSwitch } from '@tasteee/zest'`}
          language="tsx"
        />
        <CodeBlock
          code={`<ZSwitch />`}
          language="tsx"
        />
      </section>

      {/* Examples */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        {/* With Label */}
        <ComponentPreview
          title="With Label"
          description="A switch paired with a clickable label."
          code={`<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>`}
        >
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Airplane Mode</Label>
          </div>
        </ComponentPreview>

        {/* Default Checked */}
        <ComponentPreview
          title="Default Checked"
          description="A switch that starts in the checked state."
          code={`<div className="flex items-center space-x-2">
  <Switch id="notifications" defaultChecked />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>`}
        >
          <div className="flex items-center space-x-2">
            <Switch id="notifications" defaultChecked />
            <Label htmlFor="notifications">Enable notifications</Label>
          </div>
        </ComponentPreview>

        {/* Disabled */}
        <ComponentPreview
          title="Disabled"
          description="Disabled switches cannot be toggled."
          code={`<div className="flex flex-col gap-4">
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
</div>`}
        >
          <div className="flex flex-col gap-4">
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
          </div>
        </ComponentPreview>

        {/* Settings List */}
        <ComponentPreview
          title="Settings List"
          description="A list of toggleable settings using switches."
          code={`<div className="w-full max-w-sm space-y-4">
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
</div>`}
        >
          <div className="w-full max-w-sm space-y-4">
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
          </div>
        </ComponentPreview>
      </section>

      {/* API Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <PropsTable title="Switch" props={switchProps} />
      </section>

      {/* Accessibility */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Accessibility
        </h2>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Keyboard Interactions</h3>
              <div className="grid gap-2">
                <div className="flex items-center gap-4 text-sm">
                  <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Space</kbd>
                  <span className="text-muted-foreground">Toggle the switch</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Best Practices</h3>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>Always pair switches with visible labels</li>
                <li>Use switches for binary on/off settings</li>
                <li>Provide immediate feedback - changes should take effect instantly</li>
                <li>Use checkboxes instead if the change requires a submit action</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
