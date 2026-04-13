"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable, type PropDefinition } from "@/components/docs/props-table"
import { CodeBlock } from "@/components/docs/code-block"
import { Card, CardContent } from "@/components/ui/card"
import { 
  ChevronRight, 
  Loader2, 
  Mail, 
  Plus, 
  ArrowRight,
  Download,
  ExternalLink,
  Check,
  X
} from "lucide-react"

const buttonProps: PropDefinition[] = [
  {
    name: "variant",
    type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
    defaultValue: '"default"',
    description: "The visual style variant of the button."
  },
  {
    name: "size",
    type: '"default" | "sm" | "lg" | "icon"',
    defaultValue: '"default"',
    description: "The size of the button."
  },
  {
    name: "asChild",
    type: "boolean",
    defaultValue: "false",
    description: "Change the default rendered element for the one passed as a child, merging their props and behavior."
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "When true, prevents the user from interacting with the button."
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes to apply to the button."
  },
]

export default function ButtonDocsPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLoadingClick = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

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
        <span className="text-foreground">Button</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            ZButton
          </h1>
          <Badge variant="secondary">Component</Badge>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Displays a button or a component that looks like a button. Supports multiple 
          variants, sizes, and states for different use cases.
        </p>
      </div>

      {/* Quick Preview */}
      <ComponentPreview
        code={`import { ZButton } from '@tasteee/zest'

export function ButtonDemo() {
  return <ZButton>Click me</ZButton>
}`}
      >
        <Button>Click me</Button>
      </ComponentPreview>

      {/* Usage */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          code={`import { ZButton } from '@tasteee/zest'`}
          language="tsx"
        />
        <CodeBlock
          code={`<ZButton variant="outline">Click me</ZButton>`}
          language="tsx"
        />
      </section>

      {/* Examples */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        {/* Variants */}
        <ComponentPreview
          code={`import { ZButton } from '@tasteee/zest'

<div className="flex flex-wrap gap-4">
  <ZButton variant="default">Default</ZButton>
  <ZButton variant="secondary">Secondary</ZButton>
  <ZButton variant="outline">Outline</ZButton>
  <ZButton variant="ghost">Ghost</ZButton>
  <ZButton variant="link">Link</ZButton>
  <ZButton variant="destructive">Destructive</ZButton>
</div>`}
        >
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </ComponentPreview>

        {/* Sizes */}
        <ComponentPreview
          code={`import { ZButton } from '@tasteee/zest'
import { Plus } from 'lucide-react'

<div className="flex items-center gap-4">
  <ZButton size="sm">Small</ZButton>
  <ZButton size="default">Default</ZButton>
  <ZButton size="lg">Large</ZButton>
  <ZButton size="icon">
    <Plus className="h-4 w-4" />
  </ZButton>
</div>`}
        >
          <div className="flex items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </ComponentPreview>

        {/* With Icons */}
        <ComponentPreview
          code={`import { ZButton } from '@tasteee/zest'
import { Mail, Download, ExternalLink } from 'lucide-react'

<div className="flex flex-wrap gap-4">
  <ZButton>
    <Mail className="mr-2 h-4 w-4" />
    Login with Email
  </ZButton>
  <ZButton variant="outline">
    Download
    <Download className="ml-2 h-4 w-4" />
  </ZButton>
  <ZButton variant="secondary">
    <ExternalLink className="mr-2 h-4 w-4" />
    Open Link
  </ZButton>
</div>`}
        >
          <div className="flex flex-wrap gap-4">
            <Button>
              <Mail className="mr-2 h-4 w-4" />
              Login with Email
            </Button>
            <Button variant="outline">
              Download
              <Download className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="secondary">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Link
            </Button>
          </div>
        </ComponentPreview>

        {/* Loading State */}
        <ComponentPreview
          code={`import { ZButton } from '@tasteee/zest'
import { Loader2 } from 'lucide-react'

<ZButton disabled={isLoading} onClick={handleLoadingClick}>
  {isLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </>
  ) : (
    "Click me"
  )}
</ZButton>`}
        >
          <Button disabled={isLoading} onClick={handleLoadingClick}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Click me"
            )}
          </Button>
        </ComponentPreview>

        {/* Disabled */}
        <ComponentPreview
          code={`import { ZButton } from '@tasteee/zest'

<div className="flex gap-4">
  <ZButton disabled>Disabled</ZButton>
  <ZButton variant="outline" disabled>Disabled Outline</ZButton>
  <ZButton variant="secondary" disabled>Disabled Secondary</ZButton>
</div>`}
        >
          <div className="flex gap-4">
            <Button disabled>Disabled</Button>
            <Button variant="outline" disabled>Disabled Outline</Button>
            <Button variant="secondary" disabled>Disabled Secondary</Button>
          </div>
        </ComponentPreview>

        {/* As Child */}
        <ComponentPreview
          code={`import { ZButton } from '@tasteee/zest'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

<ZButton asChild>
  <Link href="/docs">
    Go to Docs
    <ArrowRight className="ml-2 h-4 w-4" />
  </Link>
</ZButton>`}
        >
          <Button asChild>
            <Link href="/docs">
              Go to Docs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </ComponentPreview>

        {/* Icon Buttons */}
        <ComponentPreview
          code={`import { ZButton } from '@tasteee/zest'
import { Check, X, Plus } from 'lucide-react'

<div className="flex gap-2">
  <ZButton size="icon" variant="outline">
    <Check className="h-4 w-4" />
  </ZButton>
  <ZButton size="icon" variant="outline">
    <X className="h-4 w-4" />
  </ZButton>
  <ZButton size="icon">
    <Plus className="h-4 w-4" />
  </ZButton>
  <ZButton size="icon" variant="destructive">
    <X className="h-4 w-4" />
  </ZButton>
</div>`}
        >
          <div className="flex gap-2">
            <Button size="icon" variant="outline">
              <Check className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline">
              <X className="h-4 w-4" />
            </Button>
            <Button size="icon">
              <Plus className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="destructive">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </ComponentPreview>
      </section>

      {/* API Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <PropsTable title="ZButton" props={buttonProps} />
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
                  <span className="text-muted-foreground">Activates the button</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Enter</kbd>
                  <span className="text-muted-foreground">Activates the button</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Screen Readers</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Uses native button semantics for proper accessibility</li>
                <li>Disabled state is communicated via aria-disabled</li>
                <li>Focus ring is visible for keyboard navigation</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Related Components */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Related Components
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "ZDropdownMenu", href: "/docs/components/dropdown-menu", description: "Menus triggered by buttons" },
            { name: "ZDialog", href: "/docs/components/dialog", description: "Modal dialogs triggered by buttons" },
            { name: "ZTooltip", href: "/docs/components/tooltip", description: "Tooltips for button hints" },
          ].map((component) => (
            <Link key={component.name} href={component.href}>
              <Card className="h-full transition-colors hover:border-primary/50">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground">{component.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{component.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
