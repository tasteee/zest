"use client"

import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable, type PropDefinition } from "@/components/docs/props-table"
import { CodeBlock } from "@/components/docs/code-block"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

const skeletonProps: PropDefinition[] = [
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes to apply to the skeleton element. Use this to control size and shape."
  },
]

export default function SkeletonDocsPage() {
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
        <span className="text-foreground">Skeleton</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Skeleton
          </h1>
          <Badge variant="secondary">Component</Badge>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Use to show a placeholder while content is loading. Skeletons provide a 
          low-fidelity preview of the content that will eventually appear.
        </p>
      </div>

      {/* Quick Preview */}
      <ComponentPreview
        title="Default Skeleton"
        description="A basic skeleton loading placeholder."
        code={`import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonDemo() {
  return <Skeleton className="h-4 w-[250px]" />
}`}
      >
        <Skeleton className="h-4 w-[250px]" />
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
              code="npx shadcn@latest add skeleton" 
              language="bash"
              filename="Terminal"
            />
          </TabsContent>
          <TabsContent value="manual" className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              Copy and paste the following code into your project.
            </p>
            <CodeBlock
              code={`import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  )
}

export { Skeleton }`}
              language="tsx"
              filename="components/ui/skeleton.tsx"
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
          code={`import { Skeleton } from "@/components/ui/skeleton"`}
          language="tsx"
        />
        <CodeBlock
          code={`<Skeleton className="h-4 w-[200px]" />`}
          language="tsx"
        />
      </section>

      {/* Examples */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        {/* Card Skeleton */}
        <ComponentPreview
          title="Card Skeleton"
          description="A skeleton placeholder for a card component."
          code={`<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>`}
        >
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </ComponentPreview>

        {/* Article Skeleton */}
        <ComponentPreview
          title="Article Skeleton"
          description="A skeleton for article or blog post content."
          code={`<div className="space-y-6 w-full max-w-md">
  <Skeleton className="h-48 w-full rounded-lg" />
  <div className="space-y-3">
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-2/3" />
  </div>
</div>`}
        >
          <div className="space-y-6 w-full max-w-md">
            <Skeleton className="h-48 w-full rounded-lg" />
            <div className="space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </ComponentPreview>

        {/* List Skeleton */}
        <ComponentPreview
          title="List Skeleton"
          description="A skeleton for a list of items."
          code={`<div className="space-y-4 w-full max-w-sm">
  {[1, 2, 3].map((i) => (
    <div key={i} className="flex items-center gap-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  ))}
</div>`}
        >
          <div className="space-y-4 w-full max-w-sm">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </ComponentPreview>

        {/* Table Skeleton */}
        <ComponentPreview
          title="Table Skeleton"
          description="A skeleton for tabular data."
          code={`<div className="w-full space-y-3">
  <div className="flex gap-4 pb-2 border-b border-border">
    <Skeleton className="h-4 w-1/4" />
    <Skeleton className="h-4 w-1/4" />
    <Skeleton className="h-4 w-1/4" />
    <Skeleton className="h-4 w-1/4" />
  </div>
  {[1, 2, 3, 4].map((row) => (
    <div key={row} className="flex gap-4 py-2">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  ))}
</div>`}
        >
          <div className="w-full space-y-3">
            <div className="flex gap-4 pb-2 border-b border-border">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            {[1, 2, 3, 4].map((row) => (
              <div key={row} className="flex gap-4 py-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ))}
          </div>
        </ComponentPreview>

        {/* Form Skeleton */}
        <ComponentPreview
          title="Form Skeleton"
          description="A skeleton for form inputs."
          code={`<div className="w-full max-w-sm space-y-4">
  <div className="space-y-2">
    <Skeleton className="h-4 w-16" />
    <Skeleton className="h-10 w-full rounded-md" />
  </div>
  <div className="space-y-2">
    <Skeleton className="h-4 w-20" />
    <Skeleton className="h-10 w-full rounded-md" />
  </div>
  <div className="space-y-2">
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-24 w-full rounded-md" />
  </div>
  <Skeleton className="h-10 w-full rounded-md" />
</div>`}
        >
          <div className="w-full max-w-sm space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-24 w-full rounded-md" />
            </div>
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </ComponentPreview>
      </section>

      {/* API Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <PropsTable title="Skeleton" props={skeletonProps} />
      </section>

      {/* Best Practices */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Best Practices
        </h2>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Match Content Dimensions</h3>
              <p className="text-sm text-muted-foreground">
                Size your skeletons to match the expected dimensions of the content 
                they&apos;re replacing. This prevents layout shifts when content loads.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Use Realistic Shapes</h3>
              <p className="text-sm text-muted-foreground">
                Use <code className="text-xs bg-muted px-1 py-0.5 rounded">rounded-full</code> for 
                avatars, <code className="text-xs bg-muted px-1 py-0.5 rounded">rounded-md</code> for 
                cards, and appropriate widths for text to give users a preview of the layout.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Avoid Overuse</h3>
              <p className="text-sm text-muted-foreground">
                Too many skeleton elements can be as distracting as a spinner. 
                Focus on the main content areas that users will be looking at.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Accessibility */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Accessibility
        </h2>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Animation</h3>
              <p className="text-sm text-muted-foreground">
                The pulse animation respects the <code className="text-xs bg-muted px-1 py-0.5 rounded">prefers-reduced-motion</code> media 
                query. Users who have reduced motion preferences will see a static skeleton.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Loading State</h3>
              <p className="text-sm text-muted-foreground">
                Consider adding <code className="text-xs bg-muted px-1 py-0.5 rounded">aria-busy=&quot;true&quot;</code> to 
                the container element and <code className="text-xs bg-muted px-1 py-0.5 rounded">aria-live=&quot;polite&quot;</code> to 
                announce when content has loaded.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
