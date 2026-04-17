"use client"

import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable, type PropDefinition } from "@/components/docs/props-table"
import { CodeBlock } from "@/components/docs/code-block"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

const separatorProps: PropDefinition[] = [
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    defaultValue: '"horizontal"',
    description: "The orientation of the separator."
  },
  {
    name: "decorative",
    type: "boolean",
    defaultValue: "true",
    description: "When true, the separator is purely visual and has no semantic meaning."
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes to apply."
  },
]

export default function SeparatorDocsPage() {
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
        <span className="text-foreground">Separator</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            ZSeparator
          </h1>
          <Badge kind="ghost" color="white">Component</Badge>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Visually or semantically separates content. A simple line that can be 
          horizontal or vertical.
        </p>
      </div>

      {/* Quick Preview */}
      <ComponentPreview
        title="Default Separator"
        description="A horizontal line that separates content."
        code={`import { ZSeparator } from '@tasteee/zest'

export function SeparatorDemo() {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">tasteink Design System</h4>
        <p className="text-sm text-muted-foreground">
          A comprehensive component library.
        </p>
      </div>
      <ZSeparator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <ZSeparator orientation="vertical" />
        <div>Docs</div>
        <ZSeparator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  )
}`}
      >
        <div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium leading-none">tasteink Design System</h4>
            <p className="text-sm text-muted-foreground">
              A comprehensive component library.
            </p>
          </div>
          <Separator className="my-4" />
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Blog</div>
            <Separator orientation="vertical" />
            <div>Docs</div>
            <Separator orientation="vertical" />
            <div>Source</div>
          </div>
        </div>
      </ComponentPreview>

      {/* Usage */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          code={`import { ZSeparator } from '@tasteee/zest'`}
          language="tsx"
        />
        <CodeBlock
          code={`<ZSeparator />`}
          language="tsx"
        />
      </section>

      {/* Examples */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        {/* Horizontal */}
        <ComponentPreview
          title="Horizontal Separator"
          description="The default horizontal separator."
          code={`<div className="space-y-4">
  <p className="text-sm">Section One Content</p>
  <Separator />
  <p className="text-sm">Section Two Content</p>
</div>`}
        >
          <div className="space-y-4 w-full">
            <p className="text-sm">Section One Content</p>
            <Separator />
            <p className="text-sm">Section Two Content</p>
          </div>
        </ComponentPreview>

        {/* Vertical */}
        <ComponentPreview
          title="Vertical Separator"
          description="A vertical separator for inline content."
          code={`<div className="flex h-5 items-center space-x-4 text-sm">
  <span>Home</span>
  <Separator orientation="vertical" />
  <span>Products</span>
  <Separator orientation="vertical" />
  <span>About</span>
  <Separator orientation="vertical" />
  <span>Contact</span>
</div>`}
        >
          <div className="flex h-5 items-center space-x-4 text-sm">
            <span>Home</span>
            <Separator orientation="vertical" />
            <span>Products</span>
            <Separator orientation="vertical" />
            <span>About</span>
            <Separator orientation="vertical" />
            <span>Contact</span>
          </div>
        </ComponentPreview>

        {/* In a Card */}
        <ComponentPreview
          title="In a Card"
          description="Separating content sections within a card."
          code={`<Card className="w-full max-w-sm">
  <CardContent className="p-6">
    <div className="space-y-1">
      <h3 className="font-semibold">Account Settings</h3>
      <p className="text-sm text-muted-foreground">
        Manage your account preferences
      </p>
    </div>
    <Separator className="my-4" />
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Email Notifications</span>
        <span className="text-muted-foreground">Enabled</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Two-Factor Auth</span>
        <span className="text-muted-foreground">Active</span>
      </div>
    </div>
    <Separator className="my-4" />
    <p className="text-xs text-muted-foreground">
      Last updated: 2 days ago
    </p>
  </CardContent>
</Card>`}
        >
          <Card className="w-full max-w-sm">
            <CardContent className="p-6">
              <div className="space-y-1">
                <h3 className="font-semibold">Account Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your account preferences
                </p>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Email Notifications</span>
                  <span className="text-muted-foreground">Enabled</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Two-Factor Auth</span>
                  <span className="text-muted-foreground">Active</span>
                </div>
              </div>
              <Separator className="my-4" />
              <p className="text-xs text-muted-foreground">
                Last updated: 2 days ago
              </p>
            </CardContent>
          </Card>
        </ComponentPreview>
      </section>

      {/* API Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <PropsTable title="Separator" props={separatorProps} />
      </section>

      {/* Accessibility */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Accessibility
        </h2>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Decorative vs Semantic</h3>
              <p className="text-sm text-muted-foreground">
                By default, the separator is decorative and has no semantic meaning. 
                Set <code className="text-xs bg-muted px-1 py-0.5 rounded">decorative=false</code> when 
                the separator has semantic meaning (e.g., separating sections of content).
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">ARIA Role</h3>
              <p className="text-sm text-muted-foreground">
                When <code className="text-xs bg-muted px-1 py-0.5 rounded">decorative</code> is 
                false, the separator uses <code className="text-xs bg-muted px-1 py-0.5 rounded">role=&quot;separator&quot;</code> for 
                assistive technologies.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
