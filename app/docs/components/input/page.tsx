"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable, type PropDefinition } from "@/components/docs/props-table"
import { CodeBlock } from "@/components/docs/code-block"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Search, Mail, Eye, EyeOff, Lock } from "lucide-react"
import { useState } from "react"

const inputProps: PropDefinition[] = [
  {
    name: "type",
    type: '"text" | "password" | "email" | "number" | "search" | "tel" | "url" | ...',
    defaultValue: '"text"',
    description: "The type of input. Supports all standard HTML input types."
  },
  {
    name: "placeholder",
    type: "string",
    description: "Placeholder text displayed when the input is empty."
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "When true, prevents the user from interacting with the input."
  },
  {
    name: "value",
    type: "string",
    description: "The controlled value of the input."
  },
  {
    name: "defaultValue",
    type: "string",
    description: "The default value for an uncontrolled input."
  },
  {
    name: "onChange",
    type: "(event: ChangeEvent<HTMLInputElement>) => void",
    description: "Callback fired when the input value changes."
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes to apply to the input."
  },
]

export default function InputDocsPage() {
  const [showPassword, setShowPassword] = useState(false)

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
        <span className="text-foreground">Input</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Input
          </h1>
          <Badge variant="secondary">Component</Badge>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          A text input field that allows users to enter single-line text. Built with 
          native input semantics and full accessibility support.
        </p>
      </div>

      {/* Quick Preview */}
      <ComponentPreview
        title="Default Input"
        description="The default form of the input component."
        code={`import { Input } from "@/components/ui/input"

export function InputDemo() {
  return <Input placeholder="Enter your email" />
}`}
      >
        <Input placeholder="Enter your email" className="max-w-sm" />
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
              code="npx shadcn@latest add input" 
              language="bash"
              filename="Terminal"
            />
          </TabsContent>
          <TabsContent value="manual" className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              Copy and paste the following code into your project.
            </p>
            <CodeBlock
              code={`import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }`}
              language="tsx"
              filename="components/ui/input.tsx"
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
          code={`import { Input } from "@/components/ui/input"`}
          language="tsx"
        />
        <CodeBlock
          code={`<Input type="email" placeholder="Email" />`}
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
          description="Pair inputs with labels for better accessibility."
          code={`<div className="grid w-full max-w-sm gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Enter your email" />
</div>`}
        >
          <div className="grid w-full max-w-sm gap-1.5">
            <Label htmlFor="email-demo">Email</Label>
            <Input type="email" id="email-demo" placeholder="Enter your email" />
          </div>
        </ComponentPreview>

        {/* Input Types */}
        <ComponentPreview
          title="Input Types"
          description="Different input types for different data formats."
          code={`<div className="grid gap-4 max-w-sm">
  <Input type="text" placeholder="Text input" />
  <Input type="email" placeholder="Email input" />
  <Input type="number" placeholder="Number input" />
  <Input type="search" placeholder="Search input" />
  <Input type="tel" placeholder="Phone input" />
  <Input type="url" placeholder="URL input" />
</div>`}
        >
          <div className="grid gap-4 max-w-sm">
            <Input type="text" placeholder="Text input" />
            <Input type="email" placeholder="Email input" />
            <Input type="number" placeholder="Number input" />
            <Input type="search" placeholder="Search input" />
            <Input type="tel" placeholder="Phone input" />
            <Input type="url" placeholder="URL input" />
          </div>
        </ComponentPreview>

        {/* With Icon */}
        <ComponentPreview
          title="With Icon"
          description="Add icons inside the input for visual context."
          code={`<div className="relative max-w-sm">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <Input placeholder="Search..." className="pl-10" />
</div>`}
        >
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-10" />
          </div>
        </ComponentPreview>

        {/* Password Toggle */}
        <ComponentPreview
          title="Password with Toggle"
          description="A password input with visibility toggle."
          code={`const [showPassword, setShowPassword] = useState(false)

<div className="relative max-w-sm">
  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <Input 
    type={showPassword ? "text" : "password"} 
    placeholder="Enter password" 
    className="pl-10 pr-10" 
  />
  <Button
    type="button"
    variant="ghost"
    size="icon"
    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
  </Button>
</div>`}
        >
          <div className="relative max-w-sm">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter password" 
              className="pl-10 pr-10" 
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
            </Button>
          </div>
        </ComponentPreview>

        {/* With Button */}
        <ComponentPreview
          title="With Button"
          description="Combine input with a button for actions like search or subscribe."
          code={`<div className="flex max-w-sm gap-2">
  <Input type="email" placeholder="Enter your email" />
  <Button type="submit">Subscribe</Button>
</div>`}
        >
          <div className="flex max-w-sm gap-2">
            <Input type="email" placeholder="Enter your email" />
            <Button type="submit">Subscribe</Button>
          </div>
        </ComponentPreview>

        {/* Disabled */}
        <ComponentPreview
          title="Disabled"
          description="Disabled inputs cannot be interacted with."
          code={`<Input disabled placeholder="Disabled input" />`}
        >
          <Input disabled placeholder="Disabled input" className="max-w-sm" />
        </ComponentPreview>

        {/* File Input */}
        <ComponentPreview
          title="File Input"
          description="A styled file input for file uploads."
          code={`<div className="grid w-full max-w-sm gap-1.5">
  <Label htmlFor="file">Upload file</Label>
  <Input id="file" type="file" />
</div>`}
        >
          <div className="grid w-full max-w-sm gap-1.5">
            <Label htmlFor="file-demo">Upload file</Label>
            <Input id="file-demo" type="file" />
          </div>
        </ComponentPreview>

        {/* Form Example */}
        <ComponentPreview
          title="Form Example"
          description="A complete form example with validation styling."
          code={`<form className="grid gap-4 max-w-sm">
  <div className="grid gap-1.5">
    <Label htmlFor="name">Name</Label>
    <Input id="name" placeholder="John Doe" />
  </div>
  <div className="grid gap-1.5">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="john@example.com" />
  </div>
  <div className="grid gap-1.5">
    <Label htmlFor="message">Message</Label>
    <Input id="message" placeholder="Your message..." />
  </div>
  <Button type="submit">Submit</Button>
</form>`}
        >
          <form className="grid gap-4 max-w-sm">
            <div className="grid gap-1.5">
              <Label htmlFor="name-demo">Name</Label>
              <Input id="name-demo" placeholder="John Doe" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="email-demo-2">Email</Label>
              <Input id="email-demo-2" type="email" placeholder="john@example.com" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="message-demo">Message</Label>
              <Input id="message-demo" placeholder="Your message..." />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </ComponentPreview>
      </section>

      {/* API Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <p className="text-muted-foreground">
          The Input component extends the native HTML input element and accepts all 
          standard input attributes.
        </p>
        <PropsTable title="Input" props={inputProps} />
      </section>

      {/* Accessibility */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Accessibility
        </h2>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Best Practices</h3>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>Always pair inputs with visible labels using the Label component</li>
                <li>Use the htmlFor attribute on labels to associate them with inputs</li>
                <li>Provide clear placeholder text that describes expected input</li>
                <li>Use appropriate input types (email, tel, etc.) for better mobile keyboards</li>
                <li>Include aria-describedby for error messages and help text</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Keyboard Navigation</h3>
              <div className="grid gap-2">
                <div className="flex items-center gap-4 text-sm">
                  <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Tab</kbd>
                  <span className="text-muted-foreground">Move focus to the input</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
