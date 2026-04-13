"use client"

import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable, type PropDefinition } from "@/components/docs/props-table"
import { CodeBlock } from "@/components/docs/code-block"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

const labelProps: PropDefinition[] = [
  {
    name: "htmlFor",
    type: "string",
    description: "The id of the form element the label is associated with."
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes to apply."
  },
]

export default function LabelDocsPage() {
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
        <span className="text-foreground">Label</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            ZLabel
          </h1>
          <Badge variant="secondary">Component</Badge>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Renders an accessible label associated with controls. Labels provide 
          context for form inputs and improve accessibility.
        </p>
      </div>

      {/* Quick Preview */}
      <ComponentPreview
        title="Default Label"
        description="A basic label associated with an input."
        code={`import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function LabelDemo() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  )
}`}
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Enter your email" />
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
              code="npx zest-ui add label" 
              language="bash"
              filename="Terminal"
            />
          </TabsContent>
          <TabsContent value="manual" className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              Copy and paste the following code into your project.
            </p>
            <CodeBlock
              code={`'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@/lib/utils'

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  )
}

export { Label }`}
              language="tsx"
              filename="components/ui/label.tsx"
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
          code={`import { Label } from "@/components/ui/label"`}
          language="tsx"
        />
        <CodeBlock
          code={`<Label htmlFor="email">Your email address</Label>`}
          language="tsx"
        />
      </section>

      {/* Examples */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        {/* With Input */}
        <ComponentPreview
          title="With Input"
          description="Label paired with an input field."
          code={`<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="username">Username</Label>
  <Input id="username" placeholder="Enter username" />
</div>`}
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Enter username" />
          </div>
        </ComponentPreview>

        {/* With Checkbox */}
        <ComponentPreview
          title="With Checkbox"
          description="Label paired with a checkbox for click-to-toggle behavior."
          code={`<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`}
        >
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
        </ComponentPreview>

        {/* With Required Indicator */}
        <ComponentPreview
          title="Required Field"
          description="Indicate required fields with an asterisk."
          code={`<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="name">
    Full Name <span className="text-destructive">*</span>
  </Label>
  <Input id="name" placeholder="John Doe" required />
</div>`}
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
        </ComponentPreview>

        {/* With Description */}
        <ComponentPreview
          title="With Description"
          description="Add helper text below the input."
          code={`<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="password">Password</Label>
  <Input id="password" type="password" />
  <p className="text-xs text-muted-foreground">
    Must be at least 8 characters long
  </p>
</div>`}
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter password" />
            <p className="text-xs text-muted-foreground">
              Must be at least 8 characters long
            </p>
          </div>
        </ComponentPreview>

        {/* Disabled State */}
        <ComponentPreview
          title="Disabled State"
          description="Labels automatically style when their associated input is disabled."
          code={`<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="disabled-input" className="peer-disabled:opacity-70">
    Disabled Field
  </Label>
  <Input id="disabled-input" disabled placeholder="Cannot edit" />
</div>`}
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="disabled-input">Disabled Field</Label>
            <Input id="disabled-input" disabled placeholder="Cannot edit" />
          </div>
        </ComponentPreview>

        {/* Form Group */}
        <ComponentPreview
          title="Form Group"
          description="Multiple labeled inputs in a form layout."
          code={`<div className="space-y-4 w-full max-w-sm">
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
</div>`}
        >
          <div className="space-y-4 w-full max-w-sm">
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
          </div>
        </ComponentPreview>
      </section>

      {/* API Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <PropsTable title="Label" props={labelProps} />
      </section>

      {/* Accessibility */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Accessibility
        </h2>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Association</h3>
              <p className="text-sm text-muted-foreground">
                Always use <code className="text-xs bg-muted px-1 py-0.5 rounded">htmlFor</code> to 
                associate the label with its form control. This allows clicking 
                the label to focus the input.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Screen Readers</h3>
              <p className="text-sm text-muted-foreground">
                Screen readers announce the label when the associated input 
                receives focus, providing context for the user.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Required Fields</h3>
              <p className="text-sm text-muted-foreground">
                When marking required fields, use both visual indicators (like an 
                asterisk) and the <code className="text-xs bg-muted px-1 py-0.5 rounded">required</code> attribute 
                on the input.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
