"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable, type PropDefinition } from "@/components/docs/props-table"
import { CodeBlock } from "@/components/docs/code-block"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

const selectProps: PropDefinition[] = [
  {
    name: "defaultValue",
    type: "string",
    description: "The value of the select when initially rendered."
  },
  {
    name: "value",
    type: "string",
    description: "The controlled value of the select."
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    description: "Event handler called when the value changes."
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "When true, prevents the user from interacting with the select."
  },
  {
    name: "required",
    type: "boolean",
    defaultValue: "false",
    description: "When true, the select is required for form submission."
  },
  {
    name: "name",
    type: "string",
    description: "The name of the select for form submission."
  },
]

const selectItemProps: PropDefinition[] = [
  {
    name: "value",
    type: "string",
    required: true,
    description: "The value of the item."
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "When true, prevents the user from selecting the item."
  },
  {
    name: "textValue",
    type: "string",
    description: "Optional text used for typeahead purposes."
  },
]

export default function SelectDocsPage() {
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
        <span className="text-foreground">Select</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            ZSelect
          </h1>
          <Badge variant="secondary">Component</Badge>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          A dropdown menu for selecting a single value from a list of options. 
          Built on Radix UI Select primitive with full keyboard support.
        </p>
      </div>

      {/* Quick Preview */}
      <ComponentPreview
        title="Default Select"
        description="A basic select with placeholder and options."
        code={`import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
      </SelectContent>
    </Select>
  )
}`}
      >
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
            <SelectItem value="grape">Grape</SelectItem>
          </SelectContent>
        </Select>
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
              code="npx zest-ui add select" 
              language="bash"
              filename="Terminal"
            />
          </TabsContent>
          <TabsContent value="manual" className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              Install the required dependencies:
            </p>
            <CodeBlock
              code="npm install @radix-ui/react-select"
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
          code={`import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"`}
          language="tsx"
        />
        <CodeBlock
          code={`<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>`}
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
          description="A select paired with a label for better accessibility."
          code={`<div className="grid gap-2">
  <Label htmlFor="timezone">Timezone</Label>
  <Select>
    <SelectTrigger id="timezone" className="w-[280px]">
      <SelectValue placeholder="Select your timezone" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="pst">Pacific Time (PST)</SelectItem>
      <SelectItem value="mst">Mountain Time (MST)</SelectItem>
      <SelectItem value="cst">Central Time (CST)</SelectItem>
      <SelectItem value="est">Eastern Time (EST)</SelectItem>
    </SelectContent>
  </Select>
</div>`}
        >
          <div className="grid gap-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select>
              <SelectTrigger id="timezone" className="w-[280px]">
                <SelectValue placeholder="Select your timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                <SelectItem value="cst">Central Time (CST)</SelectItem>
                <SelectItem value="est">Eastern Time (EST)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </ComponentPreview>

        {/* With Groups */}
        <ComponentPreview
          title="With Groups"
          description="Organize options into labeled groups."
          code={`<Select>
  <SelectTrigger className="w-[280px]">
    <SelectValue placeholder="Select a framework" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Frontend</SelectLabel>
      <SelectItem value="react">React</SelectItem>
      <SelectItem value="vue">Vue</SelectItem>
      <SelectItem value="angular">Angular</SelectItem>
      <SelectItem value="svelte">Svelte</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Backend</SelectLabel>
      <SelectItem value="express">Express</SelectItem>
      <SelectItem value="fastify">Fastify</SelectItem>
      <SelectItem value="hono">Hono</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`}
        >
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Frontend</SelectLabel>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="vue">Vue</SelectItem>
                <SelectItem value="angular">Angular</SelectItem>
                <SelectItem value="svelte">Svelte</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Backend</SelectLabel>
                <SelectItem value="express">Express</SelectItem>
                <SelectItem value="fastify">Fastify</SelectItem>
                <SelectItem value="hono">Hono</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </ComponentPreview>

        {/* Disabled */}
        <ComponentPreview
          title="Disabled"
          description="A disabled select and individual disabled items."
          code={`<div className="flex flex-col gap-4">
  <Select disabled>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Disabled select" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="option">Option</SelectItem>
    </SelectContent>
  </Select>
  
  <Select>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Select an option" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="available">Available</SelectItem>
      <SelectItem value="disabled" disabled>Disabled Option</SelectItem>
      <SelectItem value="another">Another</SelectItem>
    </SelectContent>
  </Select>
</div>`}
        >
          <div className="flex flex-col gap-4">
            <Select disabled>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Disabled select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option">Option</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="disabled" disabled>Disabled Option</SelectItem>
                <SelectItem value="another">Another</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </ComponentPreview>

        {/* Default Value */}
        <ComponentPreview
          title="Default Value"
          description="A select with a default value set."
          code={`<Select defaultValue="medium">
  <SelectTrigger className="w-[180px]">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="small">Small</SelectItem>
    <SelectItem value="medium">Medium</SelectItem>
    <SelectItem value="large">Large</SelectItem>
  </SelectContent>
</Select>`}
        >
          <Select defaultValue="medium">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </ComponentPreview>
      </section>

      {/* API Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <PropsTable title="Select" props={selectProps} />
        <PropsTable title="SelectItem" props={selectItemProps} />
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
                  <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Space / Enter</kbd>
                  <span className="text-muted-foreground">Open the select and select the focused item</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Arrow Up/Down</kbd>
                  <span className="text-muted-foreground">Move focus between items</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Home / End</kbd>
                  <span className="text-muted-foreground">Jump to first or last item</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Escape</kbd>
                  <span className="text-muted-foreground">Close the select</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">A-Z</kbd>
                  <span className="text-muted-foreground">Jump to items starting with that letter</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
