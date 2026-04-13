"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
            Button
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
        title="Default Button"
        description="The default form of the button component."
        code={`import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return <Button>Click me</Button>
}`}
      >
        <Button>Click me</Button>
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
              code="npx shadcn@latest add button" 
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
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }`}
              language="tsx"
              filename="components/ui/button.tsx"
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
          code={`import { Button } from "@/components/ui/button"`}
          language="tsx"
        />
        <CodeBlock
          code={`<Button variant="outline">Click me</Button>`}
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
          title="Variants"
          description="Different visual styles for different contexts and emphasis levels."
          code={`<div className="flex flex-wrap gap-4">
  <Button variant="default">Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
  <Button variant="destructive">Destructive</Button>
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
          title="Sizes"
          description="Different sizes to fit various UI contexts."
          code={`<div className="flex items-center gap-4">
  <Button size="sm">Small</Button>
  <Button size="default">Default</Button>
  <Button size="lg">Large</Button>
  <Button size="icon">
    <Plus className="h-4 w-4" />
  </Button>
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
          title="With Icons"
          description="Buttons can include icons for additional visual context."
          code={`<div className="flex flex-wrap gap-4">
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
          title="Loading State"
          description="Show a loading spinner when an action is in progress."
          code={`<Button disabled={isLoading} onClick={handleLoadingClick}>
  {isLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </>
  ) : (
    "Click me"
  )}
</Button>`}
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
          title="Disabled"
          description="Disabled buttons cannot be interacted with."
          code={`<div className="flex gap-4">
  <Button disabled>Disabled</Button>
  <Button variant="outline" disabled>Disabled Outline</Button>
  <Button variant="secondary" disabled>Disabled Secondary</Button>
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
          title="As Link"
          description="Use asChild to render the button as a different element, like a link."
          code={`import Link from "next/link"

<Button asChild>
  <Link href="/docs">
    Go to Docs
    <ArrowRight className="ml-2 h-4 w-4" />
  </Link>
</Button>`}
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
          title="Icon Buttons"
          description="Square buttons containing only an icon."
          code={`<div className="flex gap-2">
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
        <PropsTable title="Button" props={buttonProps} />
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
            { name: "Toggle", href: "/docs/components/toggle", description: "A two-state button that can be on or off" },
            { name: "Toggle Group", href: "/docs/components/toggle-group", description: "A set of two-state buttons" },
            { name: "Dropdown Menu", href: "/docs/components/dropdown-menu", description: "Menus triggered by buttons" },
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
