"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable, type PropDefinition } from "@/components/docs/props-table"
import { CodeBlock } from "@/components/docs/code-block"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

const checkboxProps: PropDefinition[] = [
  {
    name: "checked",
    type: 'boolean | "indeterminate"',
    description: "The controlled state of the checkbox."
  },
  {
    name: "defaultChecked",
    type: "boolean",
    defaultValue: "false",
    description: "The state of the checkbox when initially rendered."
  },
  {
    name: "onCheckedChange",
    type: '(checked: boolean | "indeterminate") => void',
    description: "Event handler called when the state changes."
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "When true, prevents the user from interacting with the checkbox."
  },
  {
    name: "required",
    type: "boolean",
    defaultValue: "false",
    description: "When true, the checkbox is required for form submission."
  },
  {
    name: "name",
    type: "string",
    description: "The name of the checkbox for form submission."
  },
  {
    name: "value",
    type: "string",
    defaultValue: '"on"',
    description: "The value submitted with the form when checked."
  },
]

export default function CheckboxDocsPage() {
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
        <span className="text-foreground">Checkbox</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            ZCheckbox
          </h1>
          <Badge variant="secondary">Component</Badge>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          A control that allows the user to toggle between checked, unchecked, and 
          indeterminate states. Built on Radix UI Checkbox primitive.
        </p>
      </div>

      {/* Quick Preview */}
      <ComponentPreview
        title="Default Checkbox"
        description="A basic checkbox with label."
        code={`import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function CheckboxDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}`}
      >
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      </ComponentPreview>

      {/* Installation */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <Tabs defaultValue="cli" className="w-full">
          <TabsList>
            <TabsTrigger value="cli">CLI</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>
          <TabsContent value="cli" className="mt-4">
            <CodeBlock 
              code="npx zest-ui add checkbox" 
              language="bash"
              filename="Terminal"
            />
          </TabsContent>
          <TabsContent value="manual" className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              Install the required dependencies:
            </p>
            <CodeBlock
              code="npm install @radix-ui/react-checkbox"
              language="bash"
              filename="Terminal"
            />
          </TabsContent>
        </Tabs>
      </section>

      {/* Usage */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          code={`import { Checkbox } from "@/components/ui/checkbox"`}
          language="tsx"
        />
        <CodeBlock
          code={`<Checkbox />`}
          language="tsx"
        />
      </section>

      {/* Examples */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        {/* Default Checked */}
        <ComponentPreview
          title="Default Checked"
          description="A checkbox that starts checked."
          code={`<div className="flex items-center space-x-2">
  <Checkbox id="subscribed" defaultChecked />
  <Label htmlFor="subscribed">Subscribe to newsletter</Label>
</div>`}
        >
          <div className="flex items-center space-x-2">
            <Checkbox id="subscribed" defaultChecked />
            <Label htmlFor="subscribed">Subscribe to newsletter</Label>
          </div>
        </ComponentPreview>

        {/* Disabled */}
        <ComponentPreview
          title="Disabled"
          description="Disabled checkboxes cannot be toggled."
          code={`<div className="flex flex-col gap-4">
  <div className="flex items-center space-x-2">
    <Checkbox id="disabled" disabled />
    <Label htmlFor="disabled" className="text-muted-foreground">
      Disabled
    </Label>
  </div>
  <div className="flex items-center space-x-2">
    <Checkbox id="disabled-checked" disabled defaultChecked />
    <Label htmlFor="disabled-checked" className="text-muted-foreground">
      Disabled checked
    </Label>
  </div>
</div>`}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="disabled" disabled />
              <Label htmlFor="disabled" className="text-muted-foreground">
                Disabled
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="disabled-checked" disabled defaultChecked />
              <Label htmlFor="disabled-checked" className="text-muted-foreground">
                Disabled checked
              </Label>
            </div>
          </div>
        </ComponentPreview>

        {/* With Description */}
        <ComponentPreview
          title="With Description"
          description="A checkbox with additional descriptive text."
          code={`<div className="items-top flex space-x-2">
  <Checkbox id="terms-desc" />
  <div className="grid gap-1.5 leading-none">
    <Label htmlFor="terms-desc">
      Accept terms and conditions
    </Label>
    <p className="text-sm text-muted-foreground">
      You agree to our Terms of Service and Privacy Policy.
    </p>
  </div>
</div>`}
        >
          <div className="items-top flex space-x-2">
            <Checkbox id="terms-desc" />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="terms-desc">
                Accept terms and conditions
              </Label>
              <p className="text-sm text-muted-foreground">
                You agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </ComponentPreview>

        {/* Checkbox Group */}
        <ComponentPreview
          title="Checkbox Group"
          description="Multiple checkboxes for selecting multiple options."
          code={`<div className="space-y-4">
  <h4 className="text-sm font-medium">Select your interests</h4>
  <div className="space-y-2">
    <div className="flex items-center space-x-2">
      <Checkbox id="interest-1" />
      <Label htmlFor="interest-1">Technology</Label>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="interest-2" defaultChecked />
      <Label htmlFor="interest-2">Design</Label>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="interest-3" />
      <Label htmlFor="interest-3">Business</Label>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="interest-4" defaultChecked />
      <Label htmlFor="interest-4">Marketing</Label>
    </div>
  </div>
</div>`}
        >
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Select your interests</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="interest-1" />
                <Label htmlFor="interest-1">Technology</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="interest-2" defaultChecked />
                <Label htmlFor="interest-2">Design</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="interest-3" />
                <Label htmlFor="interest-3">Business</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="interest-4" defaultChecked />
                <Label htmlFor="interest-4">Marketing</Label>
              </div>
            </div>
          </div>
        </ComponentPreview>

        {/* Indeterminate */}
        <ComponentPreview
          title="Indeterminate State"
          description="A checkbox can have an indeterminate state for partial selections."
          code={`// Controlled example
const [checked, setChecked] = useState<boolean | "indeterminate">("indeterminate")

<Checkbox 
  checked={checked} 
  onCheckedChange={setChecked} 
/>`}
        >
          <div className="flex items-center space-x-2">
            <Checkbox id="indeterminate" checked="indeterminate" />
            <Label htmlFor="indeterminate">Indeterminate state</Label>
          </div>
        </ComponentPreview>
      </section>

      {/* API Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <PropsTable title="Checkbox" props={checkboxProps} />
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
                  <span className="text-muted-foreground">Toggle the checkbox</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Best Practices</h3>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>Always pair checkboxes with visible labels</li>
                <li>Use checkboxes for yes/no choices that require submission</li>
                <li>Use switches instead for settings that take immediate effect</li>
                <li>Group related checkboxes together</li>
                <li>Use indeterminate state for parent checkboxes with partial child selections</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
