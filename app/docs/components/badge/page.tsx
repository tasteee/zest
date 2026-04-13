"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable, type PropDefinition } from "@/components/docs/props-table"
import { CodeBlock } from "@/components/docs/code-block"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Check, X, AlertCircle, Clock, Zap } from "lucide-react"

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
            Badge
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
        title="Default Badge"
        description="The default badge style with primary colors."
        code={`import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return <Badge>Badge</Badge>
}`}
      >
        <Badge>Badge</Badge>
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
              code="npx shadcn@latest add badge" 
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
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }`}
              language="tsx"
              filename="components/ui/badge.tsx"
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
          code={`import { Badge } from "@/components/ui/badge"`}
          language="tsx"
        />
        <CodeBlock
          code={`<Badge variant="outline">Badge</Badge>`}
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
          description="Different visual styles for different contexts."
          code={`<div className="flex flex-wrap gap-2">
  <Badge>Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="outline">Outline</Badge>
  <Badge variant="destructive">Destructive</Badge>
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
          title="With Icons"
          description="Badges can include icons for additional visual context."
          code={`<div className="flex flex-wrap gap-2">
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
          title="Status Badges"
          description="Using badges to indicate status in a list."
          code={`<div className="space-y-3 w-full max-w-md">
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

        {/* Notification Count */}
        <ComponentPreview
          title="Notification Count"
          description="Using badges as notification counters."
          code={`<div className="flex gap-6">
  <div className="relative">
    <span className="text-sm font-medium">Messages</span>
    <Badge className="absolute -top-2 -right-6 h-5 w-5 rounded-full p-0 flex items-center justify-center">
      3
    </Badge>
  </div>
  <div className="relative">
    <span className="text-sm font-medium">Notifications</span>
    <Badge variant="destructive" className="absolute -top-2 -right-6 h-5 w-5 rounded-full p-0 flex items-center justify-center">
      9+
    </Badge>
  </div>
</div>`}
        >
          <div className="flex gap-12">
            <div className="relative">
              <span className="text-sm font-medium">Messages</span>
              <Badge className="absolute -top-2 -right-6 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                3
              </Badge>
            </div>
            <div className="relative">
              <span className="text-sm font-medium">Notifications</span>
              <Badge variant="destructive" className="absolute -top-2 -right-6 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                9+
              </Badge>
            </div>
          </div>
        </ComponentPreview>

        {/* Category Tags */}
        <ComponentPreview
          title="Category Tags"
          description="Using badges as category tags or filters."
          code={`<div className="flex flex-wrap gap-2">
  <Badge variant="outline">React</Badge>
  <Badge variant="outline">TypeScript</Badge>
  <Badge variant="outline">Tailwind CSS</Badge>
  <Badge variant="outline">Next.js</Badge>
  <Badge variant="outline">Radix UI</Badge>
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
        <PropsTable title="Badge" props={badgeProps} />
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
