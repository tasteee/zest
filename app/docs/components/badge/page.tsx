"use client"

import Link from "next/link"
import { ZBadge } from "@/components/ui/badge"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable, type PropDefinition } from "@/components/docs/props-table"
import { CodeBlock } from "@/components/docs/code-block"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Check, Clock, Palette, Zap } from "lucide-react"

const badgeProps: PropDefinition[] = [
  {
    name: "kind",
    type: '"outline" | "ghost" | "solid"',
    defaultValue: '"outline"',
    description: "Controls the visual treatment of the badge container.",
  },
  {
    name: "color",
    type: '"white" | "green" | "purple" | "pink" | "orange"',
    defaultValue: '"white"',
    description: "Controls the color palette used by the badge.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: "Controls badge spacing and text size.",
  },
  {
    name: "asChild",
    type: "boolean",
    defaultValue: "false",
    description: "Renders the badge as a child component (e.g. anchor) using Radix Slot.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes to apply to the badge.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "The content to display inside the badge.",
  },
]

export default function BadgeDocsPage() {
  return (
    <div className="space-y-16">
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

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">ZBadge</h1>
          <ZBadge kind="solid" color="purple" size="sm">Component</ZBadge>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Small visual labels for categorizing content, displaying status, or drawing attention
          to specific elements. Badges are non-interactive by default.
        </p>
      </div>

      <ComponentPreview
        code={`import { ZBadge } from '@tasteee/zest'

export function BadgeDemo() {
  return <ZBadge>Badge</ZBadge>
}`}
      >
        <ZBadge>Badge</ZBadge>
      </ComponentPreview>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={`import { ZBadge } from '@tasteee/zest'`} language="tsx" />
        <CodeBlock code={`<ZBadge kind="outline" color="white" size="md">Badge</ZBadge>`} language="tsx" />
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Examples</h2>

        <ComponentPreview
          code={`<div className="flex flex-wrap gap-2">
  <ZBadge kind="outline" color="white">Outline White</ZBadge>
  <ZBadge kind="ghost" color="green">Ghost Green</ZBadge>
  <ZBadge kind="solid" color="purple">Solid Purple</ZBadge>
</div>`}
        >
          <div className="flex flex-wrap gap-2">
            <ZBadge kind="outline" color="white">Outline White</ZBadge>
            <ZBadge kind="ghost" color="green">Ghost Green</ZBadge>
            <ZBadge kind="solid" color="purple">Solid Purple</ZBadge>
          </div>
        </ComponentPreview>

        <ComponentPreview
          code={`<div className="flex flex-wrap gap-2 items-center">
  <ZBadge size="sm" kind="outline">Small</ZBadge>
  <ZBadge size="md" kind="outline">Medium</ZBadge>
  <ZBadge size="lg" kind="outline">Large</ZBadge>
</div>`}
        >
          <div className="flex flex-wrap gap-2 items-center">
            <ZBadge size="sm" kind="outline">Small</ZBadge>
            <ZBadge size="md" kind="outline">Medium</ZBadge>
            <ZBadge size="lg" kind="outline">Large</ZBadge>
          </div>
        </ComponentPreview>

        <ComponentPreview
          code={`<div className="flex flex-wrap gap-2">
  <ZBadge kind="solid" color="green">
    <Check className="h-3 w-3" />
    Verified
  </ZBadge>
  <ZBadge kind="ghost" color="orange">
    <Clock className="h-3 w-3" />
    Pending
  </ZBadge>
  <ZBadge kind="outline" color="pink">
    <Zap className="h-3 w-3" />
    Featured
  </ZBadge>
  <ZBadge kind="solid" color="white" asChild>
    <a href="#">Action</a>
  </ZBadge>
</div>`}
        >
          <div className="flex flex-wrap gap-2">
            <ZBadge kind="solid" color="green">
              <Check className="h-3 w-3" />
              Verified
            </ZBadge>
            <ZBadge kind="ghost" color="orange">
              <Clock className="h-3 w-3" />
              Pending
            </ZBadge>
            <ZBadge kind="outline" color="pink">
              <Zap className="h-3 w-3" />
              Featured
            </ZBadge>
            <ZBadge kind="solid" color="white" asChild>
              <a href="#">Action</a>
            </ZBadge>
          </div>
        </ComponentPreview>

        <ComponentPreview
          code={`<div className="grid grid-cols-2 gap-2 w-full max-w-xl">
  {['white', 'green', 'purple', 'pink', 'orange'].map((color) => (
    <ZBadge key={color} kind="outline" color={color as any}>
      <Palette className="h-3 w-3" />
      {color}
    </ZBadge>
  ))}
</div>`}
        >
          <div className="grid grid-cols-2 gap-2 w-full max-w-xl">
            <ZBadge kind="outline" color="white"><Palette className="h-3 w-3" />white</ZBadge>
            <ZBadge kind="outline" color="green"><Palette className="h-3 w-3" />green</ZBadge>
            <ZBadge kind="outline" color="purple"><Palette className="h-3 w-3" />purple</ZBadge>
            <ZBadge kind="outline" color="pink"><Palette className="h-3 w-3" />pink</ZBadge>
            <ZBadge kind="outline" color="orange"><Palette className="h-3 w-3" />orange</ZBadge>
          </div>
        </ComponentPreview>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <PropsTable title="ZBadge" props={badgeProps} />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Best Practices</h2>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Do</h3>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>Use badges sparingly to avoid visual clutter</li>
                <li>Keep badge text short and concise (1-2 words)</li>
                <li>Use consistent color semantics across your app</li>
                <li>Reserve solid badges for high emphasis and outline/ghost for lower emphasis</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
