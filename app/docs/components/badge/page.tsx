"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable, type PropDefinition } from "@/components/docs/props-table"
import { CodeBlock } from "@/components/docs/code-block"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Check, X, Clock, Zap } from "lucide-react"

const badgeProps: PropDefinition[] = [
  {
    name: "variant",
    type: '"default" | "secondary" | "destructive" | "outline"',
    defaultValue: '"default"',
    description: "The visual style variant of the badge."
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes to apply to the badge."
  },
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "The content to display inside the badge."
  },
]

export default function BadgeDocsPage() {
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
        <span className="text-foreground">Badge</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            ZBadge
          </h1>
          <Badge variant="secondary">Component</Badge>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Small visual labels for categorizing content, displaying status, or drawing attention 
          to specific elements. Badges are non-interactive by default.
        </p>
      </div>

      {/* Quick Preview */}
      <ComponentPreview
        code={`import { ZBadge } from '@tasteee/zest'

export function BadgeDemo() {
  return <ZBadge>Badge</ZBadge>
}`}
      >
        <Badge>Badge</Badge>
      </ComponentPreview>

      {/* Usage */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          code={`import { ZBadge } from '@tasteee/zest'`}
          language="tsx"
        />
        <CodeBlock
          code={`<ZBadge variant="outline">Badge</ZBadge>`}
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
          code={`import { ZBadge } from '@tasteee/zest'

<div className="flex flex-wrap gap-2">
  <ZBadge>Default</ZBadge>
  <ZBadge variant="secondary">Secondary</ZBadge>
  <ZBadge variant="outline">Outline</ZBadge>
  <ZBadge variant="destructive">Destructive</ZBadge>
</div>`}
        >
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </ComponentPreview>

        {/* With Icons */}
        <ComponentPreview
          code={`import { ZBadge } from '@tasteee/zest'
import { Check, X, Clock, Zap } from 'lucide-react'

<div className="flex flex-wrap gap-2">
  <ZBadge>
    <Check className="mr-1 h-3 w-3" />
    Verified
  </ZBadge>
  <ZBadge variant="destructive">
    <X className="mr-1 h-3 w-3" />
    Rejected
  </ZBadge>
  <ZBadge variant="secondary">
    <Clock className="mr-1 h-3 w-3" />
    Pending
  </ZBadge>
  <ZBadge variant="outline">
    <Zap className="mr-1 h-3 w-3" />
    Pro
  </ZBadge>
</div>`}
        >
          <div className="flex flex-wrap gap-2">
            <Badge>
              <Check className="mr-1 h-3 w-3" />
              Verified
            </Badge>
            <Badge variant="destructive">
              <X className="mr-1 h-3 w-3" />
              Rejected
            </Badge>
            <Badge variant="secondary">
              <Clock className="mr-1 h-3 w-3" />
              Pending
            </Badge>
            <Badge variant="outline">
              <Zap className="mr-1 h-3 w-3" />
              Pro
            </Badge>
          </div>
        </ComponentPreview>

        {/* Status Badges */}
        <ComponentPreview
          code={`import { ZBadge } from '@tasteee/zest'

<div className="space-y-3 w-full max-w-md">
  <div className="flex items-center justify-between p-3 border rounded-lg">
    <span className="font-medium">Payment</span>
    <ZBadge className="bg-green-500 hover:bg-green-500/80">Completed</ZBadge>
  </div>
  <div className="flex items-center justify-between p-3 border rounded-lg">
    <span className="font-medium">Order</span>
    <ZBadge variant="secondary">Processing</ZBadge>
  </div>
  <div className="flex items-center justify-between p-3 border rounded-lg">
    <span className="font-medium">Delivery</span>
    <ZBadge variant="outline">Scheduled</ZBadge>
  </div>
  <div className="flex items-center justify-between p-3 border rounded-lg">
    <span className="font-medium">Refund</span>
    <ZBadge variant="destructive">Failed</ZBadge>
  </div>
</div>`}
        >
          <div className="space-y-3 w-full max-w-md">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="font-medium">Payment</span>
              <Badge className="bg-green-500 hover:bg-green-500/80">Completed</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="font-medium">Order</span>
              <Badge variant="secondary">Processing</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="font-medium">Delivery</span>
              <Badge variant="outline">Scheduled</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="font-medium">Refund</span>
              <Badge variant="destructive">Failed</Badge>
            </div>
          </div>
        </ComponentPreview>

        {/* Category Tags */}
        <ComponentPreview
          code={`import { ZBadge } from '@tasteee/zest'

<div className="flex flex-wrap gap-2">
  <ZBadge variant="outline">React</ZBadge>
  <ZBadge variant="outline">TypeScript</ZBadge>
  <ZBadge variant="outline">Tailwind CSS</ZBadge>
  <ZBadge variant="outline">Next.js</ZBadge>
  <ZBadge variant="outline">Radix UI</ZBadge>
</div>`}
        >
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">React</Badge>
            <Badge variant="outline">TypeScript</Badge>
            <Badge variant="outline">Tailwind CSS</Badge>
            <Badge variant="outline">Next.js</Badge>
            <Badge variant="outline">Radix UI</Badge>
          </div>
        </ComponentPreview>
      </section>

      {/* API Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <PropsTable title="ZBadge" props={badgeProps} />
      </section>

      {/* Best Practices */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Best Practices
        </h2>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Do</h3>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>Use badges sparingly to avoid visual clutter</li>
                <li>Keep badge text short and concise (1-2 words)</li>
                <li>Use consistent colors for similar statuses across your app</li>
                <li>Use the destructive variant for error states or critical information</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">{"Don't"}</h3>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>{"Don't"} use badges for actions - use buttons instead</li>
                <li>{"Don't"} put long text content inside badges</li>
                <li>{"Don't"} use too many badge colors that can confuse users</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
